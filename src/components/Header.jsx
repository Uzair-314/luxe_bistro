// src/components/Header.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { MapPin, User, Settings } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { cartItemCount, user, openLogin, openCart, openTracking, currentOrder, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FIX: Close mobile menu ONLY when location changes, NOT when isMobileMenuOpen changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.user-dropdown')) {
        setIsUserMenuOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
  };

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
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${getNavClasses()}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          
          <Link to="/" className="flex flex-col">
            <span className="font-playfair text-lg sm:text-xl tracking-wider text-bistro-cream font-bold">LUXE BISTRO</span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.3em] text-bistro-terracotta uppercase font-medium font-dm">Hearth & Harvest</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-[11px] uppercase tracking-[0.2em] text-bistro-cream/90 font-medium font-dm">
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

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {user ? (
              <div className="user-dropdown relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 text-bistro-cream/90 hover:text-bistro-terracotta transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-bistro-terracotta/20 flex items-center justify-center border border-bistro-terracotta/30">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.2em] font-dm hidden lg:inline">
                    {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                  </span>
                  <svg 
                    className={`w-3 h-3 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-bistro-darkCream py-2 animate-[fadeIn_0.15s_ease-out]">
                    <div className="px-4 py-2 border-b border-bistro-darkCream">
                      <p className="font-playfair text-sm text-bistro-espresso">
                        {user.user_metadata?.full_name || user.email?.split('@')[0]}
                      </p>
                      <p className="font-dm text-[10px] text-bistro-sage truncate">{user.email}</p>
                    </div>
                    <button 
                      onClick={() => { setIsUserMenuOpen(false); navigate('/profile'); }}
                      className="w-full text-left px-4 py-2 font-dm text-xs text-[#2d2420] hover:bg-[#faf7f2] transition-colors flex items-center gap-2"
                    >
                      <Settings className="w-3.5 h-3.5 text-[#6b5b4f]" />
                      Settings
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={openLogin}
                className="text-[11px] uppercase tracking-[0.2em] text-bistro-cream/90 hover:text-bistro-terracotta transition-colors font-dm"
              >
                Login
              </button>
            )}
            
            <button 
              onClick={openTracking}
              className="relative text-bistro-cream hover:text-bistro-terracotta transition-colors"
            >
              <MapPin className="w-5 h-5" />
              {currentOrder && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              )}
            </button>
            
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

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden text-bistro-cream p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
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
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-bistro-espresso/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Mobile Menu Panel */}
          <div className="fixed top-[60px] left-0 right-0 bottom-0 bg-bistro-espresso z-40 md:hidden overflow-y-auto animate-[slideDown_0.2s_ease-out]">
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm uppercase tracking-[0.2em] text-bistro-cream/90 hover:text-bistro-terracotta transition-colors font-dm py-2 ${
                    location.pathname === link.path ? 'text-bistro-terracotta' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="border-t border-bistro-cream/10 pt-4 flex flex-col gap-3">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 pb-2 border-b border-bistro-cream/10">
                      <div className="w-8 h-8 rounded-full bg-bistro-terracotta/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-bistro-cream" />
                      </div>
                      <div>
                        <p className="text-bistro-cream text-sm font-dm">{user.user_metadata?.full_name || user.email?.split('@')[0]}</p>
                        <p className="text-bistro-cream/50 text-[10px] font-dm">{user.email}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); navigate('/profile'); }}
                      className="text-left text-sm text-bistro-cream/90 hover:text-bistro-terracotta font-dm flex items-center gap-2 py-2"
                    >
                      <Settings className="w-4 h-4" /> Settings
                    </button>
                    <button onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }} className="text-left text-sm text-bistro-terracotta font-dm py-2">
                      Logout
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); openLogin(); }}
                    className="text-sm uppercase tracking-[0.2em] text-bistro-cream/90 hover:text-bistro-terracotta font-dm py-2 text-left"
                  >
                    Login
                  </button>
                )}
                
                <div className="flex items-center gap-6 pt-4 border-t border-bistro-cream/10">
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); openTracking(); }}
                    className="text-bistro-cream hover:text-bistro-terracotta relative flex items-center gap-2"
                  >
                    <MapPin className="w-5 h-5" />
                    <span className="text-sm font-dm">Track Order</span>
                    {currentOrder && (
                      <span className="absolute top-0 left-4 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                    )}
                  </button>
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); openCart(); }}
                    className="text-bistro-cream hover:text-bistro-terracotta relative flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <span className="text-sm font-dm">Cart</span>
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 left-4 bg-bistro-terracotta text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-dm font-bold">
                        {cartItemCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-bistro-espresso/60 backdrop-blur-sm" 
            onClick={() => setShowLogoutConfirm(false)}
          />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm p-8 border border-bistro-darkCream text-center animate-[fadeIn_0.2s_ease-out]">
            <div className="w-12 h-12 bg-bistro-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-bistro-terracotta">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
              </svg>
            </div>
            <h3 className="font-playfair text-xl text-bistro-espresso mb-2">Sign Out?</h3>
            <p className="font-dm text-sm text-bistro-sage mb-6">Are you sure you want to sign out of your account?</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 border-2 border-bistro-espresso text-bistro-espresso py-3 rounded-lg font-dm text-[12px] uppercase tracking-[0.15em] hover:bg-bistro-espresso hover:text-bistro-cream transition-all duration-300"
              >
                Cancel
              </button>
              <button 
                onClick={confirmLogout}
                className="flex-1 bg-bistro-terracotta text-bistro-cream py-3 rounded-lg font-dm text-[12px] uppercase tracking-[0.15em] hover:bg-bistro-terracotta/90 transition-all duration-300"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}