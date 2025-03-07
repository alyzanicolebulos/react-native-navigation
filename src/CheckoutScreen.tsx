// src/CheckoutScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import { useCart } from './CartContext';
import { CheckoutScreenNavigationProp } from './types';

interface CheckoutScreenProps {
  navigation: CheckoutScreenNavigationProp;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ navigation }) => {
  const { state } = useCart();

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    Alert.alert('Checkout successful', 'Thank you for your purchase!', [
      { text: 'OK', onPress: () => navigation.navigate('Home') },
    ]);
  };

  return (
    <View style={styles.container}>
      {state.items.map((item) => (
        <View key={item.product.id} style={styles.item}>
          <Text>{item.product.name}</Text>
          <Text>₱{item.product.price * item.quantity}</Text>
        </View>
      ))}
      <Text style={styles.totalText}>Total: ₱{getTotalPrice()}</Text>
      {/* Replace Button with TouchableOpacity */}
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={handleCheckout}
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
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'right',
    color: '#333',
  },
  checkoutButton: {
    marginTop: 16,
    backgroundColor: '#ff2f9f', // Purple background
    borderRadius: 8, // Rounded corners
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 24, // Horizontal padding
    alignItems: 'center', // Center text horizontally
  },
  buttonText: {
    color: '#fff', // White text
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;