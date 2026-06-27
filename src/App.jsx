import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import LoginModal from './components/LoginModal';
import CheckoutModal from './components/CheckoutModal';
import TrackOrderModal from './components/TrackOrderModal';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Reservations from './pages/Reservations';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Profile from './pages/Profile';

function RedirectToHome() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, []);

  return null;
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <RedirectToHome />
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
        <CartDrawer />
        <LoginModal />
        <CheckoutModal />
        <TrackOrderModal />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;