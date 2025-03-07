import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useCart } from './CartContext';
import { CartScreenNavigationProp } from './types';

interface CartScreenProps {
  navigation: CartScreenNavigationProp;
}

const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const { state, dispatch } = useCart();

  const handleIncrement = (productId: number) => {
    dispatch({ type: 'INCREMENT_QUANTITY', productId });
  };

  const handleDecrement = (productId: number) => {
    const item = state.items.find((item) => item.product.id === productId);
    if (item && item.quantity === 1) {
      Alert.alert(
        'Remove Product',
        'Do you want to remove this product from the cart?',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => dispatch({ type: 'REMOVE_FROM_CART', productId }),
          },
        ],
      );
    } else {
      dispatch({ type: 'DECREMENT_QUANTITY', productId });
    }
  };

  const handleRemove = (productId: number) => {
    Alert.alert(
      'Remove Product',
      'Do you want to remove this product from the cart?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => dispatch({ type: 'REMOVE_FROM_CART', productId }),
        },
      ],
    );
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <View style={styles.container}>
      {state.items.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={state.items}
            keyExtractor={(item) => item.product.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                {/* Product Image */}
                <Image
                  source={item.product.image}
                  style={styles.productImage}
                  resizeMode="cover"
                />

                {/* Product Name and Price */}
                <View style={styles.detailsContainer}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {item.product.name}
                  </Text>
                  <Text style={styles.productPrice}>₱{item.product.price * item.quantity}</Text>
                </View>

                {/* Quantity Controls */}
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleDecrement(item.product.id)}
                  >
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleIncrement(item.product.id)}
                  >
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>

                {/* Remove Button */}
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemove(item.product.id)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <Text style={styles.totalText}>Total: ₱{getTotalPrice()}</Text>
        </>
      )}

      {/* Checkout Button */}
      <TouchableOpacity
        style={[styles.checkoutButton, state.items.length === 0 && styles.disabledButton]}
        onPress={() => navigation.navigate('Checkout')}
        disabled={state.items.length === 0}
      >
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12, // Reduced padding
    marginBottom: 12, // Reduced margin
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: 50, // Smaller image
    height: 50, // Smaller image
    borderRadius: 8,
    marginRight: 12, // Reduced margin
  },
  detailsContainer: {
    flex: 1,
    marginRight: 12, // Reduced margin
  },
  productName: {
    fontSize: 14, // Smaller font size
    fontWeight: 'bold',
    color: '#333',
    flexShrink: 1, // Allow text to shrink and wrap
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12, // Reduced margin
  },
  quantityButton: {
    backgroundColor: '#ff2f9f',
    borderRadius: 16, // Smaller buttons
    width: 24, // Smaller width
    height: 24, // Smaller height
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 14,
    marginHorizontal: 8,
  },
  removeButton: {
    backgroundColor: '#ff4444',
    borderRadius: 8,
    paddingVertical: 6, // Smaller padding
    paddingHorizontal: 12, // Smaller padding
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12, // Smaller font size
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'right',
    color: '#333',
  },
  checkoutButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#ff2f9f',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;