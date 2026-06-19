// src/components/TrackOrderModal.jsx
import { useApp } from '../hooks/useApp';
import { X, ChefHat, UtensilsCrossed, MapPin, Clock } from 'lucide-react';

const STATUS_STEPS = [
  { key: 'kitchen', label: 'Kitchen', icon: ChefHat },
  { key: 'route', label: 'On Route', icon: UtensilsCrossed },
  { key: 'delivered', label: 'Delivered', icon: MapPin },
];

export default function TrackOrderModal() {
  const { isTrackingOpen, closeTracking, currentOrder } = useApp();

  if (!isTrackingOpen) return null;

  const currentStatus = currentOrder?.status || 'kitchen';
  const statusIndex = STATUS_STEPS.findIndex(s => s.key === currentStatus);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeTracking} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in-95">
        <button onClick={closeTracking} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#faf7f2] flex items-center justify-center text-[#6b5b4f] hover:bg-[#e8ddd4]">
          <X className="w-4 h-4" />
        </button>

        {!currentOrder ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 mx-auto text-[#8e4a0e]/30 mb-4" />
            <h3 className="font-playfair text-xl text-[#2d2420] mb-2">No Active Order</h3>
            <p className="text-[#6b5b4f] text-sm font-dm">Place an order to track its status here.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#8e4a0e] font-dm font-medium">Order #{currentOrder.number}</span>
              <h2 className="font-playfair text-2xl text-[#2d2420] mt-1">Track Your Order</h2>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-between items-center mb-8 relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#e8ddd4] -translate-y-1/2" />
              <div 
                className="absolute top-1/2 left-0 h-0.5 bg-[#8e4a0e] -translate-y-1/2 transition-all duration-500"
                style={{ width: `${(statusIndex / (STATUS_STEPS.length - 1)) * 100}%` }}
              />
              
              {STATUS_STEPS.map((step, idx) => {
                const isActive = idx <= statusIndex;
                const StepIcon = step.icon;
                return (
                  <div key={step.key} className="relative z-10 flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isActive ? 'bg-[#8e4a0e] text-white' : 'bg-[#faf7f2] text-[#6b5b4f] border border-[#e8ddd4]'
                    }`}>
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] uppercase tracking-[0.15em] font-dm mt-2 ${
                      isActive ? 'text-[#8e4a0e] font-medium' : 'text-[#6b5b4f]'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Order Details */}
            <div className="bg-[#faf7f2] rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm font-dm">
                <span className="text-[#6b5b4f]">Estimated Arrival</span>
                <span className="text-[#2d2420] font-medium">{currentOrder.estimatedTime}</span>
              </div>
              <div className="flex justify-between text-sm font-dm">
                <span className="text-[#6b5b4f]">Items</span>
                <span className="text-[#2d2420] font-medium">{currentOrder.items} items</span>
              </div>
              <div className="flex justify-between text-sm font-dm">
                <span className="text-[#6b5b4f]">Total</span>
                <span className="text-[#8e4a0e] font-medium">${currentOrder.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Status Message */}
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
              <p className="text-green-700 text-xs font-dm text-center">
                {currentStatus === 'kitchen' && "Our chefs are preparing your meal with care."}
                {currentStatus === 'route' && "Your order is on the way! Estimated arrival updated."}
                {currentStatus === 'delivered' && "Your order has been delivered. Enjoy!"}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}