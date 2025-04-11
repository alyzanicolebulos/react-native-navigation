// src/HomeScreen.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'; // Import Dimensions
import { useCart } from './CartContext';
import ProductItem from './ProductItem'; // Import the updated ProductItem
import { HomeScreenNavigationProp } from './types';
import Toast from 'react-native-simple-toast'; // Import Toast

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const products = [
  {
    id: 1,
    name: 'Hinata Crochet',
    price: 100,
    image: require('../assets/hinata_crochet.png'), // Add image path
  },
  {
    id: 2,
    name: 'Kageyama Crochet',
    price: 100,
    image: require('../assets/kageyama_crochet.png'), // Add image path
  },
  {
    id: 3,
    name: 'Purple Cat',
    price: 100,
    image: require('../purple_cat.png'), // Add image path
  },
  {
    id: 4,
    name: 'Strawberry Capybara',
    price: 200,
    image: require('../assets/strawberry_capybara.png'), // Add image path
  },
  {
    id: 5,
    name: 'Luffy Hat',
    price: 50,
    image: require('../assets/luffy_hat.png'), 
  },
];

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { dispatch } = useCart();

  const handleAddToCart = (product: { id: number; name: string; price: number }) => {
    dispatch({ type: 'ADD_TO_CART', product });

    // Show a toast notification when a product is added to the cart
    Toast.show(`${product.name} has been added to your cart.`, Toast.SHORT);
  };

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/crochetbyalyheader.png')} 
          style={styles.headerImage}
          resizeMode="contain" // Ensures the image fits within the specified dimensions
          onError={(e) => console.log('Image failed to load:', e.nativeEvent.error)} // Debugging
        />
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductItem product={item} onAddToCart={handleAddToCart} />
        )}
      />

      {/* Go to Cart Button */}
      <TouchableOpacity
        style={styles.goToCartButton}
        onPress={() => navigation.navigate('Cart')}
      >
        <Text style={styles.buttonText}>Go to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

// Get the screen width
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    alignItems: 'center', // Center the image horizontally
    marginBottom: 8, // Reduced space below the header
  },
  headerImage: {
    width: screenWidth - 32, // Fit the screen width with 16px space on each side
    height: (screenWidth - 32) * 0.3, // Adjust height based on aspect ratio (example: 30% of width)
  },
  goToCartButton: {
    marginTop: 10,
    backgroundColor: '#ff2f9f',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;