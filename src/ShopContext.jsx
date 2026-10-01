import React, { createContext, useState, useEffect } from 'react';

// 1. Tanki (Context) ban rahi hai
export const ShopContext = createContext();

// 2. Main Manager Component
export const ShopProvider = ({ children }) => {
  // ============================================
  // 👤 USER STATE
  // ============================================
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('satrashe60_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('satrashe60_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('satrashe60_user');
    }
  }, [currentUser]);

  // ============================================
  // 🛍️ CART STATE & FUNCTIONS
  // ============================================
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('satrashe60_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('satrashe60_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (item, triggerToast) => {
    const safeItem = {
      ...item,
      id: item._id || item.id || Math.random().toString(),
      quantity: item.quantity || 1,
      selectedSize: item.selectedSize || "Free Size"
    };
    setCartItems(prev => [...prev, safeItem]);
    if (triggerToast) triggerToast(`✓ Added to Bag (${safeItem.name || 'Item'})`);
  };

  const handleRemoveFromCart = (indexToRemove, triggerToast) => {
    setCartItems(prev => prev.filter((_, idx) => idx !== indexToRemove));
    if (triggerToast) triggerToast("Item removed from Bag");
  };

  const handleUpdateCartQuantity = (itemId, selectedSize, newQuantity) => {
    setCartItems(prev => prev.map(item => 
      (item.id === itemId && item.selectedSize === selectedSize) 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };

  const clearCart = () => setCartItems([]);

  // ============================================
  // ❤️ WISHLIST STATE & FUNCTIONS
  // ============================================
  const [wishlist, setWishlist] = useState(() => {
    const savedWish = localStorage.getItem('satrashe60_wishlist');
    return savedWish ? JSON.parse(savedWish) : [];
  });

  useEffect(() => {
    localStorage.setItem('satrashe60_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleToggleWishlist = (id, triggerToast) => {
    if (wishlist.includes(id)) {
      setWishlist(prev => prev.filter(item => item !== id));
      if (triggerToast) triggerToast("Removed from Wishlist 🤍");
    } else {
      setWishlist(prev => [...prev, id]);
      if (triggerToast) triggerToast("Added to Wishlist ❤️");
    }
  };

  // ============================================
  // 📦 ORDERS STATE
  // ============================================
  const [placedOrders, setPlacedOrders] = useState(() => {
    const savedOrders = localStorage.getItem('satrashe60_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('satrashe60_orders', JSON.stringify(placedOrders));
  }, [placedOrders]);

  const addOrder = (newOrder) => {
    setPlacedOrders(prev => [newOrder, ...prev]);
  };

  // 3. Tanki se saara data return karna taaki baaki files isko use kar sakein
  return (
    <ShopContext.Provider value={{
      currentUser, setCurrentUser,
      cartItems, handleAddToCart, handleRemoveFromCart, handleUpdateCartQuantity, clearCart,
      wishlist, handleToggleWishlist,
      placedOrders, addOrder
    }}>
      {children}
    </ShopContext.Provider>
  );
};