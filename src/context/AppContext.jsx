// src/context/AppContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('luxeCart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [orderType, setOrderType] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('luxeCart', JSON.stringify(cart));
  }, [cart]);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);
  
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  
  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    setOrderType(null);
  };

  const openTracking = () => setIsTrackingOpen(true);
  const closeTracking = () => setIsTrackingOpen(false);
  const setOrder = (order) => setCurrentOrder(order);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => 
      prev.map(i => i.id === id ? { ...i, quantity } : i)
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      cartTotal, cartItemCount,
      isLoginOpen, openLogin, closeLogin,
      isCartOpen, openCart, closeCart,
      isCheckoutOpen, openCheckout, closeCheckout,
      isTrackingOpen, openTracking, closeTracking,
      orderType, setOrderType,
      currentOrder, setOrder
    }}>
      {children}
    </AppContext.Provider>
  );
}
export const useApp = () => useContext(AppContext);