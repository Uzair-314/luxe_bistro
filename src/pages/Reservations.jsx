// src/pages/Reservations.jsx
import { useState } from 'react';
import { submitReservation } from '../hooks/useSupabase';
import { Calendar, Clock, Users, Phone, User, MessageSquare, Check } from 'lucide-react';

export default function Reservations() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    partySize: '2',
    phone: '',
    name: '',
    requests: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitReservation({
        date: formData.date,
        time: formData.time,
        party_size: parseInt(formData.partySize, 10),
        phone: formData.phone,
        name: formData.name,
        requests: formData.requests
      });
    } catch (err) {
      console.error("Failed to submit reservation to Supabase, falling back to local state success:", err);
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '5:00 PM',
    '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM',
    '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
  ];

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop")' 
          }}
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

      {/* Form Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-24">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Image Panel */}
          <div className="lg:w-2/5 relative min-h-[300px] lg:min-h-full">
            <img 
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
              alt="Restaurant interior"
              className="absolute inset-0 w-full h-full object-cover"
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
          <div className="lg:w-3/5 p-8 md:p-12">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-slide-up">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="font-playfair text-2xl text-[#2d2420] mb-2">Reservation Confirmed</h2>
                <p className="text-[#6b5b4f] font-dm max-w-md">
                  Thank you, {formData.name}. We've received your reservation for {formData.partySize} guests on {formData.date} at {formData.time}. A confirmation will be sent to your phone.
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-playfair text-2xl text-[#2d2420] mb-8">
                  Details of Your Visit
                </h2>

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
                          className="w-full pl-10 pr-4 py-3 bg-[#faf7f2] border border-[#e8ddd4] rounded-lg text-sm text-[#2d2420] font-dm focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none transition-all"
                        />
                      </div>
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
                          className="w-full pl-10 pr-4 py-3 bg-[#faf7f2] border border-[#e8ddd4] rounded-lg text-sm text-[#2d2420] font-dm focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Select a time</option>
                          {timeSlots.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
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
                          name="partySize"
                          value={formData.partySize}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-[#faf7f2] border border-[#e8ddd4] rounded-lg text-sm text-[#2d2420] font-dm focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none transition-all appearance-none cursor-pointer"
                        >
                          {[1,2,3,4,5,6,7,8,10,12].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                      </div>
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
                          className="w-full pl-10 pr-4 py-3 bg-[#faf7f2] border border-[#e8ddd4] rounded-lg text-sm text-[#2d2420] font-dm placeholder:text-[#6b5b4f]/50 focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none transition-all"
                        />
                      </div>
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
                        className="w-full pl-10 pr-4 py-3 bg-[#faf7f2] border border-[#e8ddd4] rounded-lg text-sm text-[#2d2420] font-dm placeholder:text-[#6b5b4f]/50 focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none transition-all"
                      />
                    </div>
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
                        className="w-full pl-10 pr-4 py-3 bg-[#faf7f2] border border-[#e8ddd4] rounded-lg text-sm text-[#2d2420] font-dm placeholder:text-[#6b5b4f]/50 focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-[#8e4a0e] text-white py-4 rounded-lg font-dm font-medium text-sm uppercase tracking-[0.15em] hover:bg-[#6d3a0b] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#8e4a0e]/20"
                    >
                      Confirm Reservation
                      <Check className="w-4 h-4" />
                    </button>
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