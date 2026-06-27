import { useState, useEffect } from 'react';
import { useApp } from '../hooks/useApp';
import { signUp, signIn } from '../hooks/useSupabase';

export default function LoginModal() {
  const { isLoginOpen, closeLogin, user, logout } = useApp();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeLogin();
    };
    if (isLoginOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isLoginOpen, closeLogin]);

  if (!isLoginOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignup) {
        await signUp(formData.email, formData.password, formData.name);
        setError('Check your email to confirm your account!');
      } else {
        await signIn(formData.email, formData.password);
        closeLogin();
      }
      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Logged-in view inside modal
  if (user) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
        <div 
          className="absolute inset-0 bg-bistro-espresso/60 backdrop-blur-sm transition-opacity" 
          onClick={closeLogin}
        />
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-8 sm:p-10 border border-bistro-darkCream animate-[fadeIn_0.2s_ease-out]">
          <button 
            onClick={closeLogin}
            className="absolute top-4 right-4 text-bistro-sage hover:text-bistro-terracotta transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-center">
            <div className="w-16 h-16 bg-bistro-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-bistro-terracotta">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <span className="font-dm text-xs tracking-[0.4em] text-bistro-terracotta uppercase block mb-2 font-semibold">
              Welcome Back
            </span>
            <h2 className="font-playfair text-2xl text-bistro-espresso mb-1">
              Hello, {user.user_metadata?.full_name || user.email?.split('@')[0]}
            </h2>
            <p className="font-dm text-sm text-bistro-sage mb-8">{user.email}</p>
            
            <button 
              onClick={() => { logout(); closeLogin(); }}
              className="w-full border-2 border-bistro-espresso text-bistro-espresso py-3.5 rounded-lg font-dm text-[12px] uppercase tracking-[0.15em] hover:bg-bistro-espresso hover:text-bistro-cream transition-all duration-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Login/Signup form
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-bistro-espresso/60 backdrop-blur-sm transition-opacity" 
        onClick={closeLogin}
      />
      
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-8 sm:p-10 border border-bistro-darkCream animate-[fadeIn_0.2s_ease-out]">
        <button 
          onClick={closeLogin}
          className="absolute top-4 right-4 text-bistro-sage hover:text-bistro-terracotta transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <span className="font-dm text-xs tracking-[0.4em] text-bistro-terracotta uppercase block mb-2 font-semibold">
            {isSignup ? 'Join Us' : 'Welcome Back'}
          </span>
          <h2 className="font-playfair text-2xl sm:text-3xl text-bistro-espresso tracking-wide">
            {isSignup ? 'Create Account' : 'Sign In'}
          </h2>
          <p className="font-dm text-sm text-bistro-sage mt-2">
            {isSignup ? 'Start your culinary journey with us' : 'Access your reservations and orders'}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="font-dm text-sm text-red-600 text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block font-dm text-[11px] uppercase tracking-wider text-bistro-espresso mb-1.5 font-medium">
                Full Name
              </label>
              <input 
                type="text" 
                name="name" 
                placeholder="John Doe"
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required={isSignup}
                className="w-full px-4 py-3 rounded-lg bg-bistro-cream border border-bistro-darkCream focus:border-bistro-terracotta focus:ring-1 focus:ring-bistro-terracotta/20 focus:outline-none font-dm text-bistro-espresso placeholder:text-bistro-sage/50 text-sm transition-all"
              />
            </div>
          )}
          
          <div>
            <label className="block font-dm text-[11px] uppercase tracking-wider text-bistro-espresso mb-1.5 font-medium">
              Email Address
            </label>
            <input 
              type="email" 
              name="email" 
              placeholder="hello@example.com" 
              required
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 rounded-lg bg-bistro-cream border border-bistro-darkCream focus:border-bistro-terracotta focus:ring-1 focus:ring-bistro-terracotta/20 focus:outline-none font-dm text-bistro-espresso placeholder:text-bistro-sage/50 text-sm transition-all"
            />
          </div>
          
          <div>
            <label className="block font-dm text-[11px] uppercase tracking-wider text-bistro-espresso mb-1.5 font-medium">
              Password
            </label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••" 
              required
              minLength={6}
              value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 rounded-lg bg-bistro-cream border border-bistro-darkCream focus:border-bistro-terracotta focus:ring-1 focus:ring-bistro-terracotta/20 focus:outline-none font-dm text-bistro-espresso placeholder:text-bistro-sage/50 text-sm transition-all"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-bistro-terracotta text-bistro-cream py-3.5 rounded-lg font-dm text-[12px] uppercase tracking-[0.15em] font-medium hover:bg-bistro-terracotta/90 transition-all duration-300 shadow-md mt-2 disabled:opacity-50"
          >
            {loading ? 'Please wait...' : (isSignup ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-bistro-darkCream text-center">
          <p className="font-dm text-sm text-bistro-sage">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button 
              onClick={() => { setIsSignup(!isSignup); setError(''); }}
              className="text-bistro-terracotta font-medium hover:underline transition-all"
            >
              {isSignup ? 'Sign In' : 'Create Account'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}