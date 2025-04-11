import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import { CartProvider } from './src/CartContext';
import AppNavigator from './src/AppNavigator';

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer> {/* Wrap AppNavigator with NavigationContainer */}
        <AppNavigator />
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;