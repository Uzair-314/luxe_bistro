// src/components/CheckoutModal.jsx
import { useState } from 'react';
import { useApp } from '../hooks/useApp';
import { supabase } from '../lib/supabaseClient';
import { X, Truck, Package, Check, User, Phone, Mail, Home, Building, ChefHat, UtensilsCrossed, MapPin, Loader2 } from 'lucide-react';

export default function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, orderType, setOrderType, cart, cartTotal, setOrder, clearCart, openTracking, openLogin } = useApp();
  const [step, setStep] = useState('selection');
  const [orderReceipt, setOrderReceipt] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  });

  if (!isCheckoutOpen) return null;

  const handleSelectType = (type) => {
    setOrderType(type);
    setStep('form');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setSubmitError('Please fill in all required fields.');
      return;
    }

    // Phone validation — international format (e.g., +1 (555) 000-0000, +92 300 1234567)
    const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      setSubmitError('Please enter a valid phone number (e.g., +1 (555) 000-0000).');
      return;
    }

    if (orderType === 'delivery' && (!formData.address.trim() || !formData.city.trim())) {
      setSubmitError('Please enter your full delivery address.');
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      closeCheckout();
      openLogin();
      return;
    }

    setIsSubmitting(true);

    const orderNumber = `LB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const estimatedTime = new Date(Date.now() + 45 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const tax = cartTotal * 0.08;
    const gratuity = cartTotal * 0.18;
    const finalTotal = cartTotal + tax + gratuity;

    const customerAddress = orderType === 'delivery'
      ? `${formData.address}, ${formData.city}${formData.notes ? ' — ' + formData.notes : ''}`
      : `Takeaway — ${formData.notes || 'Pickup at restaurant'}`;

    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          customer_address: customerAddress,
          items: cart,
          total: parseFloat(finalTotal.toFixed(2)),
          status: 'pending',
          payment_method: 'Cash on Delivery',
          user_id: user.id
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Order insert error:', error);
      setSubmitError('Failed to place order. Please try again.');
      setIsSubmitting(false);
      return;
    }

    const newOrder = {
      number: orderNumber,
      status: 'kitchen',
      estimatedTime,
      items: cart.reduce((sum, item) => sum + item.quantity, 0),
      total: finalTotal,
      customerName: formData.name,
      orderType
    };

    setOrder(newOrder);
    setOrderReceipt({
      number: orderNumber,
      estimatedTime,
      items: [...cart],
      subtotal: cartTotal,
      gratuity,
      tax,
      total: finalTotal
    });
    clearCart();
    setIsSubmitting(false);
    setStep('success');
  };

  const handleClose = () => {
    closeCheckout();
    setStep('selection');
    setOrderReceipt(null);
    setSubmitError(null);
    setFormData({ name: '', email: '', phone: '', address: '', city: '', notes: '' });
  };

  const tax = cartTotal * 0.08;
  const gratuity = cartTotal * 0.18;
  const finalTotal = cartTotal + tax + gratuity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button onClick={handleClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#faf7f2] flex items-center justify-center text-[#6b5b4f] hover:bg-[#e8ddd4]">
          <X className="w-4 h-4" />
        </button>

        {step === 'selection' && (
          <div className="p-8">
            <h2 className="text-2xl font-playfair text-[#2d2420] text-center mb-8">How would you like to enjoy your meal?</h2>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleSelectType('delivery')} className="group p-6 rounded-xl border-2 border-[#e8ddd4] hover:border-[#8e4a0e] hover:bg-[#faf7f2] transition-all flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#8e4a0e]/10 flex items-center justify-center group-hover:bg-[#8e4a0e]/20">
                  <Truck className="w-6 h-6 text-[#8e4a0e]" />
                </div>
                <div className="text-center">
                  <h3 className="font-playfair text-lg text-[#2d2420] mb-1">Delivery</h3>
                  <p className="text-sm text-[#6b5b4f]">The Luxe experience brought to your doorstep.</p>
                </div>
              </button>
              <button onClick={() => handleSelectType('takeaway')} className="group p-6 rounded-xl border-2 border-[#e8ddd4] hover:border-[#8e4a0e] hover:bg-[#faf7f2] transition-all flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#8e4a0e]/10 flex items-center justify-center group-hover:bg-[#8e4a0e]/20">
                  <Package className="w-6 h-6 text-[#8e4a0e]" />
                </div>
                <div className="text-center">
                  <h3 className="font-playfair text-lg text-[#2d2420] mb-1">Takeaway</h3>
                  <p className="text-sm text-[#6b5b4f]">Carefully packed for you to enjoy on the go.</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {step === 'form' && (
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#8e4a0e]/10 flex items-center justify-center">
                {orderType === 'delivery' ? <Truck className="w-5 h-5 text-[#8e4a0e]" /> : <Package className="w-5 h-5 text-[#8e4a0e]" />}
              </div>
              <div>
                <h2 className="text-xl font-playfair text-[#2d2420]">{orderType === 'delivery' ? 'Delivery Details' : 'Takeaway Details'}</h2>
                <p className="text-sm text-[#6b5b4f]">{orderType === 'delivery' ? 'Enter your delivery information' : 'Enter your pickup information'}</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2d2420] mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b5b4f]" />
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#e8ddd4] focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none" placeholder="John Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2d2420] mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b5b4f]" />
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#e8ddd4] focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2d2420] mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b5b4f]" />
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#e8ddd4] focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              {orderType === 'delivery' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#2d2420] mb-1.5">Delivery Address</label>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b5b4f]" />
                      <input type="text" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#e8ddd4] focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none" placeholder="123 Main Street" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2d2420] mb-1.5">City</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b5b4f]" />
                      <input type="text" required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#e8ddd4] focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none" placeholder="New York" />
                    </div>
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium text-[#2d2420] mb-1.5">Order Notes <span className="text-[#6b5b4f] font-normal">(optional)</span></label>
                <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-[#e8ddd4] focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none resize-none" placeholder="Any special instructions..." />
              </div>
              {submitError && (
                <div className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-lg">
                  {submitError}
                </div>
              )}
              <div className="pt-4 border-t border-[#e8ddd4]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#6b5b4f]">Total Amount</span>
                  <span className="text-xl font-playfair text-[#8e4a0e]">${finalTotal.toFixed(2)}</span>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-[#8e4a0e] text-white py-3 rounded-lg font-medium hover:bg-[#6d3a0b] transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Placing Order...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" /> Place Order
                    </>
                  )}
                </button>
              </div>
            </form>
            <button onClick={() => setStep('selection')} className="w-full mt-3 text-[#6b5b4f] text-sm hover:text-[#8e4a0e]">← Back to options</button>
          </div>
        )}

        {step === 'success' && (
          <div className="p-8 animate-slide-up">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full border-2 border-[#8e4a0e]/30 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-[#8e4a0e]" strokeWidth={1.5} />
              </div>
              <h2 className="font-playfair text-3xl text-[#2d2420] mb-2">Order Confirmed!</h2>
              <p className="text-[#6b5b4f] text-sm font-dm max-w-sm mx-auto">Thank you for choosing Luxe Bistro. Your table is being set and our chefs are preparing your selections.</p>
            </div>

            <div className="bg-[#faf7f2] rounded-xl p-6 mb-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#6b5b4f] font-dm font-medium">Order Number</span>
                  <p className="font-playfair text-lg text-[#8e4a0e] mt-1">{orderReceipt?.number}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#6b5b4f] font-dm font-medium">Estimated Arrival</span>
                  <p className="font-playfair text-lg text-[#2d2420] mt-1">{orderReceipt?.estimatedTime}</p>
                </div>
              </div>
              <div className="w-full h-px bg-[#e8ddd4] mb-6" />
              <div className="flex justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-[#8e4a0e]/10 flex items-center justify-center mx-auto mb-2">
                    <ChefHat className="w-5 h-5 text-[#8e4a0e]" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#6b5b4f] font-dm">Kitchen</span>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-[#8e4a0e]/10 flex items-center justify-center mx-auto mb-2">
                    <UtensilsCrossed className="w-5 h-5 text-[#8e4a0e]" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#6b5b4f] font-dm">On Route</span>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-[#8e4a0e]/10 flex items-center justify-center mx-auto mb-2">
                    <MapPin className="w-5 h-5 text-[#8e4a0e]" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#6b5b4f] font-dm">Delivered</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => {
                    openTracking();
                    handleClose();
                  }}
                  className="bg-[#8e4a0e] text-white py-3 rounded-lg text-xs uppercase tracking-[0.15em] font-dm font-medium hover:bg-[#6d3a0b]"
                >
                  Track Your Order
                </button>
                <button className="border border-[#e8ddd4] text-[#2d2420] py-3 rounded-lg text-xs uppercase tracking-[0.15em] font-dm font-medium hover:border-[#8e4a0e] hover:text-[#8e4a0e]">Modify Order</button>
              </div>
            </div>

            {orderReceipt && (
              <div className="bg-[#faf7f2] rounded-xl p-6">
                <h3 className="font-playfair text-lg text-[#2d2420] mb-4">Summary</h3>
                <div className="space-y-3 mb-4">
                  {orderReceipt.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm font-dm">
                      <div><span className="text-[#2d2420]">{item.name}</span><span className="text-[#6b5b4f] text-xs ml-1">x{item.quantity}</span></div>
                      <span className="text-[#2d2420]">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="w-full h-px bg-[#e8ddd4]" />
                  <div className="flex justify-between text-sm font-dm"><span className="text-[#6b5b4f]">Subtotal</span><span className="text-[#2d2420]">${orderReceipt.subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-sm font-dm"><span className="text-[#6b5b4f]">Gratuity (18%)</span><span className="text-[#2d2420]">${orderReceipt.gratuity.toFixed(2)}</span></div>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-[#e8ddd4]">
                  <span className="font-playfair text-lg text-[#2d2420]">Total</span>
                  <span className="font-playfair text-xl text-[#8e4a0e]">${orderReceipt.total.toFixed(2)}</span>
                </div>
              </div>
            )}

            <div className="mt-6 relative rounded-xl overflow-hidden h-32">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=200&fit=crop" alt="Restaurant ambiance" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <p className="text-white font-dm italic text-sm tracking-wide">"The art of flavor, brought to your door."</p>
              </div>
            </div>

            <button onClick={handleClose} className="w-full mt-6 bg-[#8e4a0e] text-white py-3 rounded-lg font-dm text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#6d3a0b]">Done</button>
          </div>
        )}
      </div>
    </div>
  );
}