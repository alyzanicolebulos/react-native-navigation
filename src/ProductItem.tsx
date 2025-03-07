// src/components/ProductItem.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface ProductItemProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: any; // Add image property
  };
  onAddToCart: (product: any) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => {
  return (
    <View style={styles.container}>
      {/* Product Image */}
      <Image
        source={product.image} // Use the image from the product data
        style={styles.productImage}
        resizeMode="cover" // Ensure the image covers the area
      />

      {/* Product Name and Price */}
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>₱{product.price}</Text>
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => onAddToCart(product)}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: 80, // Fixed width for the image
    height: 80, // Fixed height for the image
    borderRadius: 8, // Rounded corners for the image
    marginRight: 16, // Space between the image and the details
  },
  detailsContainer: {
    flex: 1, // Take up remaining space
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Dark gray text color
  },
  productPrice: {
    fontSize: 14,
    color: '#666', // Light gray text color
    marginTop: 4, // Space between name and price
  },
  addToCartButton: {
    backgroundColor: '#ff2f9f', // Purple background
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProductItem;