import { useState, useEffect } from 'react';
import { AppContext } from './AppContextObject';
import { supabase } from '../lib/supabaseClient';

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
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('luxeCart', JSON.stringify(cart));
  }, [cart]);

  // Check auth session on load
  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setIsAuthLoading(false);
    }
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // NEW: Fetch active order from Supabase on load (keeps green dot after refresh)
  useEffect(() => {
    if (isAuthLoading) return;
    
    if (!user) {
      setCurrentOrder(null);
      return;
    }

    async function fetchActiveOrder() {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .neq('status', 'delivered')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error || !data) {
        setCurrentOrder(null);
        return;
      }

      const mapDbStatus = (dbStatus) => {
        if (dbStatus === 'pending' || dbStatus === 'preparing') return 'kitchen';
        if (dbStatus === 'on the way' || dbStatus === 'shipped' || dbStatus === 'out for delivery') return 'route';
        return 'kitchen';
      };

      const orderNumber = `LB-${data.id.slice(0, 4).toUpperCase()}`;
      const estimatedTime = new Date(new Date(data.created_at).getTime() + 45 * 60000)
        .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setCurrentOrder({
        id: data.id,
        number: orderNumber,
        status: mapDbStatus(data.status),
        estimatedTime,
        items: Array.isArray(data.items) ? data.items.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0,
        total: data.total,
        customerName: data.customer_name,
        orderType: data.customer_address?.startsWith('Takeaway') ? 'takeaway' : 'delivery'
      });
    }

    fetchActiveOrder();
  }, [user, isAuthLoading]);

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

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

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
      currentOrder, setOrder,
      user, isAuthLoading, logout
    }}>
      {children}
    </AppContext.Provider>
  );
}