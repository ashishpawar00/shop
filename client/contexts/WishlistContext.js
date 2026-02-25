// client/contexts/WishlistContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem('lkk_wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (wishlistItems.length > 0) {
      localStorage.setItem('lkk_wishlist', JSON.stringify(wishlistItems));
    } else {
      localStorage.removeItem('lkk_wishlist');
    }
  }, [wishlistItems]);

  // Add item to wishlist
  const addToWishlist = (product) => {
    const existingItem = wishlistItems.find(item => item._id === product._id);
    
    if (existingItem) {
      // If item already exists, update quantity
      setWishlistItems(wishlistItems.map(item =>
        item._id === product._id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // Add new item to wishlist
      const newItem = {
        ...product,
        quantity: 1,
        addedDate: new Date().toISOString()
      };
      setWishlistItems([...wishlistItems, newItem]);
    }
    
    // Return success message
    return true;
  };

  // Remove item from wishlist
  const removeFromWishlist = (productId) => {
    setWishlistItems(wishlistItems.filter(item => item._id !== productId));
  };

  // Update item quantity in wishlist
  const updateWishlistItemQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromWishlist(productId);
      return;
    }
    
    setWishlistItems(wishlistItems.map(item =>
      item._id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item._id === productId);
  };

  // Clear entire wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
  };

  // Get total items count
  const getTotalItems = () => {
    return wishlistItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price
  const getTotalPrice = () => {
    return wishlistItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Toggle wishlist sidebar
  const toggleWishlist = () => {
    setIsWishlistOpen(!isWishlistOpen);
  };

  const value = {
    wishlistItems,
    isWishlistOpen,
    addToWishlist,
    removeFromWishlist,
    updateWishlistItemQuantity,
    isInWishlist,
    clearWishlist,
    getTotalItems,
    getTotalPrice,
    toggleWishlist,
    setIsWishlistOpen
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};