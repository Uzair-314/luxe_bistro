// src/components/Header.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { MapPin } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItemCount, user, openLogin, openCart, openTracking, currentOrder } = useApp();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [location, isMobileMenuOpen]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/about', label: 'Our Story' },
    { path: '/reservations', label: 'Reservations' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
  ];

  const getNavClasses = () => {
    if (!isHomePage) {
      return 'bg-bistro-espresso shadow-xl py-3';
    }
    return isScrolled 
      ? 'bg-bistro-espresso shadow-xl py-3' 
      : 'bg-transparent py-5';
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${getNavClasses()}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        <Link to="/" className="flex flex-col">
          <span className="font-playfair text-xl tracking-wider text-bistro-cream font-bold">LUXE BISTRO</span>
          <span className="text-[9px] tracking-[0.3em] text-bistro-terracotta uppercase font-medium font-dm">Hearth & Harvest</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] text-bistro-cream/90 font-medium font-dm">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`hover:text-bistro-terracotta transition-colors duration-300 ${
                location.pathname === link.path ? 'text-bistro-terracotta' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-bistro-cream/80 text-xs font-dm">{user.name}</span>
              <button 
                onClick={openLogin}
                className="text-[11px] uppercase tracking-[0.2em] text-bistro-cream/90 hover:text-bistro-terracotta transition-colors font-dm"
              >
                Account
              </button>
            </div>
          ) : (
            <button 
              onClick={openLogin}
              className="text-[11px] uppercase tracking-[0.2em] text-bistro-cream/90 hover:text-bistro-terracotta transition-colors font-dm"
            >
              Login
            </button>
          )}
          
          {/* Track Order Button */}
          <button 
            onClick={openTracking}
            className="relative text-bistro-cream hover:text-bistro-terracotta transition-colors"
          >
            <MapPin className="w-5 h-5" />
            {currentOrder && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
            )}
          </button>
          
          {/* Cart Button */}
          <button 
            onClick={openCart}
            className="relative text-bistro-cream hover:text-bistro-terracotta transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-bistro-terracotta text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-dm font-bold animate-pulse">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        <button 
          className="md:hidden text-bistro-cream"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>

      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-bistro-espresso border-t border-bistro-cream/10">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-sm uppercase tracking-[0.2em] text-bistro-cream/90 hover:text-bistro-terracotta transition-colors font-dm ${
                  location.pathname === link.path ? 'text-bistro-terracotta' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-bistro-cream/10 pt-4 flex items-center justify-between">
              {user ? (
                <button onClick={openLogin} className="text-bistro-cream/80 text-sm font-dm">
                  {user.name}
                </button>
              ) : (
                <button onClick={openLogin} className="text-sm uppercase tracking-[0.2em] text-bistro-cream/90 hover:text-bistro-terracotta font-dm">
                  Login
                </button>
              )}
              <button onClick={openCart} className="text-bistro-cream hover:text-bistro-terracotta relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-bistro-terracotta text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-dm font-bold">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}