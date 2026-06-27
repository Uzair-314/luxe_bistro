// src/pages/Reservations.jsx
import { useState, useEffect, useRef } from 'react';
import { submitReservation } from '../hooks/useSupabase';
import { supabase } from '../lib/supabaseClient';
import { useApp } from '../hooks/useApp';
import { Calendar, Clock, Users, Phone, User, AtSign, MessageSquare, Check, AlertCircle } from 'lucide-react';
import { ImageSkeleton, LoadingButton } from '../components/LoadingComponents.jsx';

export default function Reservations() {
  const { openLogin } = useApp();
  const formContainerRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    phone: '',
    name: '',
    email: '',
    requests: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [leftImageLoaded, setLeftImageLoaded] = useState(false);

  // Trigger slide-up animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll to form section when success message appears
  useEffect(() => {
    if (submitted && formContainerRef.current) {
      formContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [submitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = 'Please enter a valid phone number (e.g., +1 (555) 000-0000).';
      }
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Date cannot be in the past';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }

    const guestsNum = parseInt(formData.guests, 10);
    if (!guestsNum || guestsNum < 1) {
      newErrors.guests = 'Party size must be at least 1';
    } else if (guestsNum > 20) {
      newErrors.guests = 'Party size cannot exceed 20';
    }

    if (formData.requests && formData.requests.length > 500) {
      newErrors.requests = 'Special requests cannot exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      openLogin();
      return;
    }

    setIsSubmitting(true);

    try {
      await submitReservation({
        date: formData.date,
        time: formData.time,
        guests: parseInt(formData.guests, 10),
        phone: formData.phone,
        name: formData.name,
        email: formData.email,
        special_requests: formData.requests
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("Failed to submit reservation:", err);
      setErrors({ submit: 'Failed to submit reservation. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '5:00 PM',
    '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM',
    '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
  ];

  const ErrorMessage = ({ field }) => {
    if (!errors[field]) return null;
    return (
      <div className="flex items-center gap-1 mt-1.5 text-red-600 text-xs font-dm">
        <AlertCircle className="w-3 h-3" />
        <span>{errors[field]}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {!heroLoaded && <div className="absolute inset-0 bg-[#2d2420] animate-pulse z-[5]" />}
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ${heroLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop")' 
          }}
        />
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
          className="hidden"
          onLoad={() => setHeroLoaded(true)}
          onError={() => setHeroLoaded(true)}
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto animate-slide-up">
          <span className="inline-block px-4 py-1.5 border border-bistro-terracotta/60 text-bistro-terracotta text-[10px] uppercase tracking-[0.3em] font-dm font-medium rounded-full mb-6">
            The Hearth & Harvest
          </span>
          <h1 className="font-playfair text-5xl md:text-6xl text-bistro-cream mb-4">
            Reserve a Table
          </h1>
          <p className="text-bistro-cream/70 font-dm text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Experience the intersection of tradition and terroir. Secure your place at our table for an unforgettable culinary journey.
          </p>
        </div>
      </div>

      {/* Form Section with slide-up animation */}
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-24 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Image Panel */}
          <div className="lg:w-2/5 relative min-h-[300px] lg:min-h-full">
            {!leftImageLoaded && <ImageSkeleton className="absolute inset-0 w-full h-full z-[5]" />}
            <img 
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
              alt="Restaurant interior"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${leftImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setLeftImageLoaded(true)}
              onError={() => setLeftImageLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="font-playfair text-2xl text-white mb-2">
                Hospitality Rooted<br />in Nature
              </h3>
              <p className="text-white/70 text-sm font-dm italic">
                "Our table is a canvas for the seasons finest harvest."
              </p>
            </div>
          </div>

          {/* Right Form Panel */}
          <div ref={formContainerRef} className="lg:w-3/5 p-8 md:p-12">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-slide-up">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="font-playfair text-2xl text-[#2d2420] mb-2">Reservation Confirmed</h2>
                <p className="text-[#6b5b4f] font-dm max-w-md">
                  Thank you, {formData.name}. We've received your reservation for {formData.guests} guests on {formData.date} at {formData.time}. A confirmation will be sent to your phone.
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-playfair text-2xl text-[#2d2420] mb-8">
                  Details of Your Visit
                </h2>

                {/* Submit error */}
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-2 text-red-600 text-sm font-dm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.submit}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: Date & Time */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b5b4f] font-dm font-medium mb-2">
                        Arrival Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e4a0e]" />
                        <input
                          type="date"
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className={`w-full pl-10 pr-4 py-3 bg-[#faf7f2] border rounded-lg text-sm text-[#2d2420] font-dm focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none transition-all ${
                            errors.date ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-[#e8ddd4]'
                          }`}
                        />
                      </div>
                      <ErrorMessage field="date" />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b5b4f] font-dm font-medium mb-2">
                        Preferred Time
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e4a0e]" />
                        <select
                          name="time"
                          required
                          value={formData.time}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-[#faf7f2] border rounded-lg text-sm text-[#2d2420] font-dm focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none transition-all appearance-none cursor-pointer ${
                            errors.time ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-[#e8ddd4]'
                          }`}
                        >
                          <option value="">Select a time</option>
                          {timeSlots.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                      <ErrorMessage field="time" />
                    </div>
                  </div>

                  {/* Row 2: Party Size & Phone */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b5b4f] font-dm font-medium mb-2">
                        Party Size
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e4a0e]" />
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-[#faf7f2] border rounded-lg text-sm text-[#2d2420] font-dm focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none transition-all appearance-none cursor-pointer ${
                            errors.guests ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-[#e8ddd4]'
                          }`}
                        >
                          {[1,2,3,4,5,6,7,8,10,12].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                      </div>
                      <ErrorMessage field="guests" />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b5b4f] font-dm font-medium mb-2">
                        Contact Phone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e4a0e]" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className={`w-full pl-10 pr-4 py-3 bg-[#faf7f2] border rounded-lg text-sm text-[#2d2420] font-dm placeholder:text-[#6b5b4f]/50 focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none transition-all ${
                            errors.phone ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-[#e8ddd4]'
                          }`}
                        />
                      </div>
                      <ErrorMessage field="phone" />
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b5b4f] font-dm font-medium mb-2">
                      Reservation Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e4a0e]" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className={`w-full pl-10 pr-4 py-3 bg-[#faf7f2] border rounded-lg text-sm text-[#2d2420] font-dm placeholder:text-[#6b5b4f]/50 focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none transition-all ${
                          errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-[#e8ddd4]'
                        }`}
                      />
                    </div>
                    <ErrorMessage field="name" />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b5b4f] font-dm font-medium mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e4a0e]" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="hello@example.com"
                        className={`w-full pl-10 pr-4 py-3 bg-[#faf7f2] border rounded-lg text-sm text-[#2d2420] font-dm placeholder:text-[#6b5b4f]/50 focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none transition-all ${
                          errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-[#e8ddd4]'
                        }`}
                      />
                    </div>
                    <ErrorMessage field="email" />
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b5b4f] font-dm font-medium mb-2">
                      Special Requests & Allergies
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[#8e4a0e]" />
                      <textarea
                        name="requests"
                        rows={3}
                        value={formData.requests}
                        onChange={handleChange}
                        placeholder="Dietary preferences, occasions, or seating requests..."
                        className={`w-full pl-10 pr-4 py-3 bg-[#faf7f2] border rounded-lg text-sm text-[#2d2420] font-dm placeholder:text-[#6b5b4f]/50 focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none transition-all resize-none ${
                          errors.requests ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-[#e8ddd4]'
                        }`}
                      />
                    </div>
                    <ErrorMessage field="requests" />
                    <div className="text-right text-[10px] text-[#6b5b4f]/50 font-dm mt-1">
                      {formData.requests.length}/500
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-4">
                    <LoadingButton
                      type="submit"
                      loading={isSubmitting}
                      className="w-full py-4 shadow-lg shadow-[#8e4a0e]/20"
                    >
                      {isSubmitting ? 'Submitting...' : 'Confirm Reservation'}
                      {!isSubmitting && <Check className="w-4 h-4" />}
                    </LoadingButton>
                    <p className="text-center text-[11px] text-[#6b5b4f]/60 font-dm mt-4">
                      A confirmation will be sent via SMS and Email
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}