"use client"
import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const CartContext = createContext();

// Context provider component
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  
  // Initialize cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      // Reset cart if there's an error
      setCart([]);
      localStorage.removeItem('cart');
    }
  }, []);
  
  // Update localStorage and totals whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Calculate totals
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      const price = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      setCartCount(count);
      setCartTotal(price);
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);
  
  // Add to cart function
  const addToCart = (product, quantity = 1, size = '50ml') => {
    setCart(prevCart => {
      // Check if item already exists in cart with same size
      const existingItemIndex = prevCart.findIndex(
        item => item.id === product.id && item.size === size
      );
      
      // If item exists, update quantity
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      }
      
      // Otherwise, add new item
      return [...prevCart, {
        ...product,
        quantity,
        size
      }];
    });
  };
  
  // Update cart item quantity
  const updateCartItemQuantity = (id, size, quantity) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id && item.size === size) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };
  
  // Remove from cart
  const removeFromCart = (id, size) => {
    setCart(prevCart => {
      return prevCart.filter(item => !(item.id === id && item.size === size));
    });
  };
  
  // Clear cart
  const clearCart = () => {
    setCart([]);
  };
  
  // Context value
  const value = {
    cart,
    cartCount,
    cartTotal,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for using the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 