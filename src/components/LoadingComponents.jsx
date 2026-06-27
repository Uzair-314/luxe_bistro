// src/components/LoadingComponents.jsx
import { Loader2 } from 'lucide-react';

// ========== SPINNERS ==========

export function Spinner({ size = 16, className = '' }) {
  return (
    <Loader2 className={`animate-spin ${className}`} size={size} />
  );
}

// ========== BUTTONS ==========

export function LoadingButton({ 
  children, 
  loading, 
  disabled, 
  variant = 'primary',
  className = '',
  ...props 
}) {
  const baseStyles = 'flex items-center justify-center gap-2 font-dm uppercase tracking-[0.15em] text-[12px] py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-bistro-terracotta text-bistro-cream hover:bg-bistro-terracotta/90',
    outline: 'border-2 border-bistro-espresso text-bistro-espresso hover:bg-bistro-espresso hover:text-bistro-cream',
    ghost: 'text-bistro-espresso hover:bg-bistro-darkCream',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner size={16} />}
      {children}
    </button>
  );
}

// ========== SKELETONS ==========

export function MenuItemSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-bistro-darkCream animate-pulse">
      <div className="h-48 bg-bistro-darkCream" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-bistro-darkCream rounded w-3/4" />
        <div className="h-3 bg-bistro-darkCream rounded w-full" />
        <div className="h-3 bg-bistro-darkCream rounded w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-5 bg-bistro-darkCream rounded w-16" />
          <div className="h-8 bg-bistro-darkCream rounded w-24" />
        </div>
      </div>
    </div>
  );
}

export function MenuGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <MenuItemSkeleton key={i} />
      ))}
    </div>
  );
}

// Menu row skeleton (horizontal card — matches MenuDisplay layout)
export function MenuRowSkeleton() {
  return (
    <div className="group p-6 rounded-lg bg-bistro-darkCream/30 border border-bistro-darkCream flex gap-5 h-full animate-pulse">
      <div className="w-24 h-24 rounded-lg bg-bistro-darkCream flex-shrink-0" />
      <div className="flex-1 flex flex-col justify-between space-y-3">
        <div className="flex items-baseline justify-between">
          <div className="h-5 bg-bistro-darkCream rounded w-1/2" />
          <div className="h-5 bg-bistro-darkCream rounded w-12" />
        </div>
        <div className="h-3 bg-bistro-darkCream rounded w-full" />
        <div className="h-3 bg-bistro-darkCream rounded w-2/3" />
        <div className="h-4 bg-bistro-darkCream rounded w-24" />
      </div>
    </div>
  );
}

export function MenuRowGridSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
      {Array.from({ length: count }).map((_, i) => (
        <MenuRowSkeleton key={i} />
      ))}
    </div>
  );
}

export function TextSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className="h-3 bg-bistro-darkCream rounded animate-pulse"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  );
}

export function OrderItemSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-bistro-darkCream p-5 animate-pulse space-y-3">
      <div className="flex justify-between">
        <div className="h-4 bg-bistro-darkCream rounded w-24" />
        <div className="h-4 bg-bistro-darkCream rounded w-20" />
      </div>
      <div className="h-3 bg-bistro-darkCream rounded w-3/4" />
      <div className="h-3 bg-bistro-darkCream rounded w-1/2" />
      <div className="h-8 bg-bistro-darkCream rounded w-full" />
    </div>
  );
}

export function ReservationCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-bistro-darkCream p-5 animate-pulse space-y-3">
      <div className="flex justify-between">
        <div className="h-4 bg-bistro-darkCream rounded w-32" />
        <div className="h-4 bg-bistro-darkCream rounded w-20" />
      </div>
      <div className="h-3 bg-bistro-darkCream rounded w-full" />
      <div className="h-3 bg-bistro-darkCream rounded w-2/3" />
      <div className="h-3 bg-bistro-darkCream rounded w-1/2" />
    </div>
  );
}

export function ImageSkeleton({ className = '' }) {
  return (
    <div className={`bg-bistro-darkCream animate-pulse flex items-center justify-center ${className}`}>
      <svg className="w-8 h-8 text-bistro-sage/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 6v12a2.25 2.25 0 002.25 2.25zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    </div>
  );
}

export function GalleryImageSkeleton() {
  return (
    <div className="bg-bistro-darkCream animate-pulse rounded-lg aspect-square" />
  );
}

// ========== FULL LOADERS ==========

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-bistro-cream z-[100] flex flex-col items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="font-playfair text-3xl text-bistro-espresso tracking-wider animate-pulse">
          LUXE BISTRO
        </h1>
        <div className="flex items-center justify-center gap-2">
          <Spinner size={20} className="text-bistro-terracotta" />
          <span className="font-dm text-sm text-bistro-sage uppercase tracking-widest">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
}

export function SectionLoader({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <Spinner size={24} className="text-bistro-terracotta" />
      <span className="font-dm text-sm text-bistro-sage uppercase tracking-widest">
        {text}
      </span>
    </div>
  );
}

export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {icon && <div className="mb-4 text-bistro-sage/50">{icon}</div>}
      <h3 className="font-playfair text-lg text-bistro-espresso mb-2">{title}</h3>
      <p className="font-dm text-sm text-bistro-sage max-w-xs">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}