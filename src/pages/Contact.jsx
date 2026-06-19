// src/pages/Contact.jsx
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, User, AtSign, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const infoCards = [
    {
      icon: MapPin,
      title: 'Our Sanctuary',
      lines: ['1234 Alpine Meadow Road', 'Aspen Ridge, Colorado 81611']
    },
    {
      icon: Phone,
      title: 'Conversations',
      lines: ['Reservations: (555) 234-8890', 'Private Events: (555) 234-8891']
    },
    {
      icon: Mail,
      title: 'Write To Us',
      lines: ['hello@luxebistro.com', 'events@luxebistro.com']
    },
    {
      icon: null,
      title: 'Follow the Harvest',
      social: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      {/* Hero */}
      <div className="pt-32 pb-16 px-4 text-center max-w-3xl mx-auto animate-slide-up">
        <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-[#8e4a0e] font-dm font-medium mb-4">
          Get In Touch
        </span>
        <h1 className="font-playfair text-4xl md:text-5xl text-[#2d2420] mb-4 leading-tight">
          The Hearth & Harvest<br />Experience Awaits
        </h1>
        <p className="text-[#6b5b4f] font-dm text-sm md:text-base leading-relaxed max-w-xl mx-auto">
          From intimate dinners to grand celebrations, we are here to curate your perfect culinary journey. Reach out to our concierge team.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-5 gap-8">
          
          {/* Left Column: Info Cards + Form */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Info Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {infoCards.map((card, idx) => (
                <div 
                  key={idx}
                  className="group bg-white rounded-xl p-6 shadow-sm border border-[#e8ddd4]/50 
                    hover:shadow-xl hover:-translate-y-1 hover:border-[#8e4a0e]/30 
                    transition-all duration-500 ease-out cursor-default"
                >
                  {card.social ? (
                    <>
                      <div className="w-10 h-10 rounded-full bg-[#8e4a0e]/10 flex items-center justify-center mb-4 
                        group-hover:bg-[#8e4a0e] group-hover:scale-110 transition-all duration-500">
                        <svg className="w-4 h-4 text-[#8e4a0e] group-hover:text-white transition-colors duration-500" 
                          fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" 
                            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.287.696.287 1.093m0-1.093c-.18.324-.287.696-.287 1.093m0-1.093a2.25 2.25 0 012.186-2.186m-2.186 2.186a2.25 2.25 0 012.186 2.186m-2.186-2.186c.324-.18.696-.287 1.093-.287m-1.093.287c.324.18.696.287 1.093.287m0 0a2.25 2.25 0 012.186 2.186m-2.186-2.186a2.25 2.25 0 01-2.186 2.186m2.186-2.186c-.18-.324-.287-.696-.287-1.093m0 1.093c-.18.324-.287.696-.287 1.093m0-1.093a2.25 2.25 0 01-2.186-2.186m2.186 2.186a2.25 2.25 0 01-2.186-2.186" />
                        </svg>
                      </div>
                      <h3 className="font-playfair text-lg text-[#2d2420] mb-3 group-hover:text-[#8e4a0e] transition-colors duration-500">
                        {card.title}
                      </h3>
                      <div className="flex gap-3">
                        <a href="#" className="w-8 h-8 rounded-full bg-[#faf7f2] flex items-center justify-center text-[#6b5b4f] 
                          hover:bg-[#8e4a0e] hover:text-white hover:scale-110 transition-all duration-300">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                          </svg>
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-[#faf7f2] flex items-center justify-center text-[#6b5b4f] 
                          hover:bg-[#8e4a0e] hover:text-white hover:scale-110 transition-all duration-300">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-[#faf7f2] flex items-center justify-center text-[#6b5b4f] 
                          hover:bg-[#8e4a0e] hover:text-white hover:scale-110 transition-all duration-300">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                        </a>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-full bg-[#8e4a0e]/10 flex items-center justify-center mb-4 
                        group-hover:bg-[#8e4a0e] group-hover:scale-110 transition-all duration-500">
                        <card.icon className="w-4 h-4 text-[#8e4a0e] group-hover:text-white transition-colors duration-500" />
                      </div>
                      <h3 className="font-playfair text-lg text-[#2d2420] mb-2 group-hover:text-[#8e4a0e] transition-colors duration-500">
                        {card.title}
                      </h3>
                      {card.lines.map((line, i) => (
                        <p key={i} className="text-[#6b5b4f] text-sm font-dm group-hover:text-[#2d2420] transition-colors duration-500">
                          {line}
                        </p>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e8ddd4]/50">
              {submitted ? (
                <div className="text-center py-8 animate-slide-up">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-playfair text-xl text-[#2d2420] mb-2">Message Dispatched</h3>
                  <p className="text-[#6b5b4f] text-sm font-dm">Thank you for reaching out. Our concierge will respond shortly.</p>
                </div>
              ) : (
                <>
                  <h3 className="font-playfair text-2xl text-[#2d2420] mb-6">Send a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b5b4f] font-dm font-medium mb-2">
                          Your Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e4a0e]" />
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Julian Vane"
                            className="w-full pl-10 pr-4 py-3 bg-[#faf7f2] border border-[#e8ddd4] rounded-lg text-sm text-[#2d2420] font-dm placeholder:text-[#6b5b4f]/40 focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none transition-all"
                          />
                        </div>
                      </div>
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
                            placeholder="julian@example.com"
                            className="w-full pl-10 pr-4 py-3 bg-[#faf7f2] border border-[#e8ddd4] rounded-lg text-sm text-[#2d2420] font-dm placeholder:text-[#6b5b4f]/40 focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b5b4f] font-dm font-medium mb-2">
                        Your Message
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[#8e4a0e]" />
                        <textarea
                          name="message"
                          rows={4}
                          required
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your upcoming visit or inquiry..."
                          className="w-full pl-10 pr-4 py-3 bg-[#faf7f2] border border-[#e8ddd4] rounded-lg text-sm text-[#2d2420] font-dm placeholder:text-[#6b5b4f]/40 focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none transition-all resize-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-[#8e4a0e] text-white px-8 py-3 rounded-lg font-dm font-medium text-sm uppercase tracking-[0.15em] hover:bg-[#6d3a0b] transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#8e4a0e]/20"
                    >
                      Dispatch Message
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Map + Hours */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Map Embed */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#e8ddd4]/50 h-[300px] lg:h-[340px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153!2d-106.82!3d39.19!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDExJzI0LjAiTiAxMDbCsDQ5JzEyLjAiVw!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(20%) sepia(10%)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Luxe Bistro Location"
                className="absolute inset-0"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#8e4a0e]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#8e4a0e]" />
                  </div>
                  <div>
                    <p className="text-xs font-dm font-medium text-[#2d2420]">Aspen Ridge, Colorado</p>
                    <p className="text-[10px] text-[#6b5b4f] font-dm">Get Directions on Google Maps</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-[#f5efe8] rounded-xl p-6 border border-[#e8ddd4]/50">
              <div className="flex items-center gap-2 mb-5">
                <Clock className="w-4 h-4 text-[#8e4a0e]" />
                <h3 className="font-playfair text-lg text-[#2d2420]">Opening Hours</h3>
              </div>
              
              <div className="space-y-3">
                {[
                  { day: 'Monday — Tuesday', hours: 'Closed' },
                  { day: 'Wednesday — Thursday', hours: '17:00 — 22:00' },
                  { day: 'Friday — Saturday', hours: '17:00 — 23:30' },
                  { day: 'Sunday Brunch', hours: '10:30 — 15:00' },
                ].map((slot, i) => (
                  <div key={i} className="flex justify-between items-center text-sm font-dm">
                    <span className="text-[#6b5b4f]">{slot.day}</span>
                    <span className={`font-medium ${slot.hours === 'Closed' ? 'text-[#8e4a0e]' : 'text-[#2d2420]'}`}>
                      {slot.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-[#e8ddd4]">
                <p className="text-[11px] text-[#6b5b4f]/70 font-dm italic text-center">
                  "The table is a place of hospitality, the soul of the home."
                </p>
                <button className="w-full mt-3 text-[11px] uppercase tracking-[0.2em] text-[#8e4a0e] font-dm font-medium hover:underline transition-all">
                  Private Booking Inquiry →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}