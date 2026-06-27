// src/components/TrackOrderModal.jsx
import { useState, useEffect } from 'react';
import { useApp } from '../hooks/useApp';
import { supabase } from '../lib/supabaseClient';
import { X, ChefHat, UtensilsCrossed, MapPin, Clock, ChevronLeft, Star, Check, AlertCircle } from 'lucide-react';

const STATUS_STEPS = [
  { key: 'kitchen', label: 'Kitchen', icon: ChefHat },
  { key: 'route', label: 'On Route', icon: UtensilsCrossed },
  { key: 'delivered', label: 'Delivered', icon: MapPin },
];

const mapStatus = (dbStatus) => {
  if (dbStatus === 'pending' || dbStatus === 'preparing') return 'kitchen';
  if (dbStatus === 'on the way' || dbStatus === 'shipped' || dbStatus === 'out for delivery') return 'route';
  if (dbStatus === 'delivered' || dbStatus === 'completed') return 'delivered';
  return 'kitchen';
};

export default function TrackOrderModal() {
  const { isTrackingOpen, closeTracking } = useApp();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewOrder, setReviewOrder] = useState(null);

  useEffect(() => {
    if (!isTrackingOpen) {
      setSelectedOrder(null);
      setShowReviewModal(false);
      return;
    }

    async function fetchOrders() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Fetch orders error:', error);
        setOrders([]);
      } else {
        // Fetch review status for each delivered order
        const orderIds = (data || []).map(o => o.id);
        const { data: reviewsData } = await supabase
          .from('reviews')
          .select('order_id, status')
          .in('order_id', orderIds);

        const reviewMap = {};
        (reviewsData || []).forEach(r => {
          reviewMap[r.order_id] = r.status;
        });

        const formatted = (data || []).map(order => ({
          id: order.id,
          number: `LB-${order.id.slice(0, 4).toUpperCase()}`,
          status: mapStatus(order.status),
          rawStatus: order.status,
          reviewStatus: reviewMap[order.id] || null,
          estimatedTime: new Date(new Date(order.created_at).getTime() + 45 * 60000)
            .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          items: Array.isArray(order.items)
            ? order.items.reduce((sum, item) => sum + (item.quantity || 1), 0)
            : 0,
          total: order.total,
          created_at: order.created_at,
        }));
        setOrders(formatted);
      }
      setLoading(false);
    }

    fetchOrders();
  }, [isTrackingOpen]);

  const handleOpenReview = (order) => {
    setReviewOrder(order);
    setShowReviewModal(true);
  };

  const handleReviewSubmitted = () => {
    setShowReviewModal(false);
    setReviewOrder(null);
    setSelectedOrder(null);
  };

  if (!isTrackingOpen) return null;

  // ─── REVIEW MODAL ───
  if (showReviewModal && reviewOrder) {
    return (
      <ReviewModal
        order={reviewOrder}
        onClose={() => setShowReviewModal(false)}
        onSubmitted={handleReviewSubmitted}
      />
    );
  }

  // ─── DETAIL VIEW ───
  if (selectedOrder) {
    const currentStatus = selectedOrder.status || 'kitchen';
    const statusIndex = STATUS_STEPS.findIndex(s => s.key === currentStatus);
    const isDelivered = currentStatus === 'delivered';
    const reviewStatus = selectedOrder.reviewStatus;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeTracking} />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in-95">
          <button onClick={() => setSelectedOrder(null)} className="absolute top-4 left-4 w-8 h-8 rounded-full bg-[#faf7f2] flex items-center justify-center text-[#6b5b4f] hover:bg-[#e8ddd4]">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={closeTracking} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#faf7f2] flex items-center justify-center text-[#6b5b4f] hover:bg-[#e8ddd4]">
            <X className="w-4 h-4" />
          </button>

          <div className="text-center mb-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#8e4a0e] font-dm font-medium">Order #{selectedOrder.number}</span>
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
              <span className="text-[#2d2420] font-medium">{selectedOrder.estimatedTime}</span>
            </div>
            <div className="flex justify-between text-sm font-dm">
              <span className="text-[#6b5b4f]">Items</span>
              <span className="text-[#2d2420] font-medium">{selectedOrder.items} items</span>
            </div>
            <div className="flex justify-between text-sm font-dm">
              <span className="text-[#6b5b4f]">Total</span>
              <span className="text-[#8e4a0e] font-medium">${selectedOrder.total.toFixed(2)}</span>
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

          {/* Review Section (only when delivered) */}
          {isDelivered && (
            <div className="mt-4">
              {!reviewStatus ? (
                <button
                  onClick={() => handleOpenReview(selectedOrder)}
                  className="w-full bg-bistro-terracotta text-bistro-cream py-3 rounded-lg font-dm text-sm uppercase tracking-[0.15em] font-medium hover:bg-bistro-terracotta/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-bistro-terracotta/20"
                >
                  <Star className="w-4 h-4" />
                  Leave a Review
                </button>
              ) : reviewStatus === 'draft' ? (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                  <Clock className="w-5 h-5 mx-auto text-orange-500 mb-2" />
                  <p className="font-dm text-sm text-orange-700 font-medium">Review Pending Approval</p>
                  <p className="font-dm text-xs text-orange-600 mt-1">Your review is being reviewed by our team.</p>
                </div>
              ) : reviewStatus === 'approved' ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <Check className="w-5 h-5 mx-auto text-green-600 mb-2" />
                  <p className="font-dm text-sm text-green-700 font-medium">Review Approved</p>
                  <p className="font-dm text-xs text-green-600 mt-1">Thank you for your feedback!</p>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <X className="w-5 h-5 mx-auto text-red-500 mb-2" />
                  <p className="font-dm text-sm text-red-700 font-medium">Review Not Approved</p>
                  <p className="font-dm text-xs text-red-600 mt-1">Your review didn't meet our guidelines.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── LIST VIEW ───
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeTracking} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in-95">
        <button onClick={closeTracking} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#faf7f2] flex items-center justify-center text-[#6b5b4f] hover:bg-[#e8ddd4]">
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <h2 className="font-playfair text-2xl text-[#2d2420]">Your Orders</h2>
          <p className="text-[#6b5b4f] text-sm font-dm mt-1">Select an order to track</p>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <Clock className="w-8 h-8 mx-auto text-[#8e4a0e] animate-spin mb-3" />
            <p className="text-[#6b5b4f] text-sm font-dm">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 mx-auto text-[#8e4a0e]/30 mb-4" />
            <h3 className="font-playfair text-xl text-[#2d2420] mb-2">No Active Orders</h3>
            <p className="text-[#6b5b4f] text-sm font-dm">Place an order to track its status here.</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            {orders.map((order) => (
              <button
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="w-full text-left bg-[#faf7f2] rounded-xl p-4 hover:bg-[#e8ddd4]/50 transition-colors flex items-center justify-between group"
              >
                <div>
                  <p className="font-playfair text-sm text-[#2d2420] group-hover:text-[#8e4a0e]">Order #{order.number}</p>
                  <p className="text-[10px] text-[#6b5b4f] font-dm mt-0.5">
                    {new Date(order.created_at).toLocaleDateString()} • {order.items} items
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-playfair text-sm text-[#8e4a0e]">${order.total.toFixed(2)}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-dm font-medium ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'route' ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {order.status === 'kitchen' ? 'Preparing' : order.status === 'route' ? 'On Route' : 'Delivered'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── REVIEW MODAL COMPONENT ───
function ReviewModal({ order, onClose, onSubmitted }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (rating === 0) {
      setError('Please select a star rating');
      return;
    }
    if (reviewText.trim().length < 5) {
      setError('Review must be at least 5 characters');
      return;
    }

    setIsSubmitting(true);

    const { error: submitError } = await supabase
      .from('reviews')
      .insert({
        name: name.trim() || 'Anonymous',
        rating,
        review: reviewText.trim(),
        order_id: order.id,
        status: 'draft',
      });

    if (submitError) {
      setError(submitError.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        onSubmitted();
      }, 2000);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in-95">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#faf7f2] flex items-center justify-center text-[#6b5b4f] hover:bg-[#e8ddd4]">
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-bistro-terracotta/10 flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6 text-bistro-terracotta" />
          </div>
          <h2 className="font-playfair text-2xl text-[#2d2420]">How Was Your Meal?</h2>
          <p className="text-[#6b5b4f] text-sm font-dm mt-1">Order #{order.number}</p>
        </div>

        {success ? (
          <div className="text-center py-8 animate-slide-up">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="font-playfair text-xl text-[#2d2420] mb-2">Thank You!</h3>
            <p className="text-[#6b5b4f] text-sm font-dm">Your review has been submitted for approval.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-600 text-sm font-dm">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}

            {/* Star Rating */}
            <div className="text-center">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b5b4f] font-dm font-medium mb-3">
                Your Rating
              </label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors duration-200 ${
                        star <= (hoverRating || rating)
                          ? 'text-bistro-terracotta fill-bistro-terracotta'
                          : 'text-bistro-darkCream'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs text-bistro-sage font-dm mt-2">
                {rating > 0 && ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
              </p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b5b4f] font-dm font-medium mb-2">
                Your Name (optional)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Anonymous"
                className="w-full px-4 py-2.5 rounded-lg border border-[#e8ddd4] focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none text-sm text-[#2d2420] font-dm"
              />
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b5b4f] font-dm font-medium mb-2">
                Your Review
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                placeholder="Tell us about your experience..."
                className="w-full px-4 py-2.5 rounded-lg border border-[#e8ddd4] focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none text-sm text-[#2d2420] font-dm resize-none"
              />
              <div className="text-right text-[10px] text-[#6b5b4f]/50 font-dm mt-1">
                {reviewText.length} chars
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#8e4a0e] text-white py-3 rounded-lg font-dm text-sm uppercase tracking-[0.15em] font-medium hover:bg-[#6d3a0b] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
              {!isSubmitting && <Star className="w-4 h-4" />}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}