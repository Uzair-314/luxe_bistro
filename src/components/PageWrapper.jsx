import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageWrapper({ children }) {
  const location = useLocation();
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.classList.remove('animate-slide-up');
      // Force reflow to restart animation
      void wrapperRef.current.offsetWidth;
      wrapperRef.current.classList.add('animate-slide-up');
    }
  }, [location.pathname]);

  return (
    <div ref={wrapperRef} className="animate-slide-up">
      {children}
    </div>
  );
}