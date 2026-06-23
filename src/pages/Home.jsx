// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal.jsx';
import HeroSection from '../components/Hero.jsx';
import MenuDisplay from '../components/MenuDisplay.jsx';

// Single Home component — ensure scroll to top on mount
// (behavior uses 'auto' for compatibility)

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.048 8.287 8.287 0 0 0 9 9.6a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925 3.546 5.974 5.974 0 0 1-2.133-1A3.75 3.75 0 0 0 12 18Z" />
      </svg>
    ),
    title: "Fresh Ingredients",
    description: "Sourced daily from local organic farms to ensure peak flavor and nutrition."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: "Fast Delivery",
    description: "Our specialized couriers ensure your meal arrives at the perfect temperature."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    ),
    title: "Easy Takeaway",
    description: "Effortless pickup experience with dedicated parking spots for to-go orders."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
    title: "Dine With Us",
    description: "A cozy, rustic atmosphere designed for slow evenings and good company."
  }
];

export default function Home() {
  return (    <main className="bg-bistro-cream min-h-screen">
      {/* 1. Hero */}
      <HeroSection />
      
      {/* 2. Features / Promise Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-bistro-cream overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="font-playfair text-4xl sm:text-5xl text-bistro-espresso tracking-wide mb-4">
                The Hearth & Harvest Promise
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <div className="w-16 h-[2px] bg-bistro-terracotta mx-auto mb-6"></div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.3}>
              <p className="font-dm text-bistro-sage max-w-2xl mx-auto text-lg leading-relaxed">
                From farm to fork, we prioritize craftsmanship in every step of your dining experience.
              </p>
            </ScrollReveal>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <ScrollReveal key={index} direction="up" delay={0.1 * (index + 1)}>
                <div className="group relative bg-bistro-darkCream/40 hover:bg-bistro-darkCream rounded-xl p-8 text-center transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-xl border border-transparent hover:border-bistro-terracotta/20">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bistro-terracotta/10 text-bistro-terracotta mb-6 group-hover:bg-bistro-terracotta group-hover:text-bistro-cream transition-all duration-500">
                    {feature.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-playfair text-2xl text-bistro-espresso mb-3 group-hover:text-bistro-terracotta transition-colors duration-500">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="font-dm text-sm text-bistro-sage leading-relaxed group-hover:text-bistro-espresso/80 transition-colors duration-500">
                    {feature.description}
                  </p>

                  {/* Hover accent line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-bistro-terracotta group-hover:w-1/2 transition-all duration-500 rounded-full"></div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Menu Preview */}
      <MenuDisplay />
      
      {/* 4. About / Story Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-bistro-darkCream overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <ScrollReveal direction="left" delay={0.1}>
              <span className="font-dm text-xs tracking-[0.4em] text-bistro-terracotta uppercase block mb-3 font-semibold">
                Our Story
              </span>
            </ScrollReveal>
            
            <ScrollReveal direction="left" delay={0.2}>
              <h2 className="font-playfair text-4xl sm:text-5xl text-bistro-espresso tracking-wide mb-6">
                Rooted in Tradition, <br/>Elevated by Craft
              </h2>
            </ScrollReveal>
            
            <ScrollReveal direction="left" delay={0.3}>
              <p className="font-dm text-bistro-sage leading-relaxed mb-6">
                Founded in 2018, Luxe Bistro began as a humble farm-to-table vision. Today, we honor that legacy by sourcing ingredients from local artisans and transforming them into dishes that tell the story of our land.
              </p>
            </ScrollReveal>
            
            <ScrollReveal direction="left" delay={0.4}>
              <p className="font-dm text-bistro-sage leading-relaxed mb-8">
                Every plate is a conversation between tradition and innovation — where rustic techniques meet modern refinement.
              </p>
            </ScrollReveal>
            
            <ScrollReveal direction="left" delay={0.5}>
              <Link 
                to="/about"
                className="inline-block bg-bistro-terracotta text-bistro-cream px-8 py-3 rounded-lg font-dm text-[12px] font-medium uppercase tracking-[0.15em] hover:bg-bistro-terracotta/90 transition-all duration-300"
              >
                Read Our Story
              </Link>
            </ScrollReveal>
          </div>
          
          <div className="order-1 lg:order-2">
            <ScrollReveal direction="right" delay={0.2}>
              <div className="aspect-[4/5] rounded-lg bg-bistro-espresso/10 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&h=1000&fit=crop" 
                  alt="Luxe Bistro Chef"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.parentElement.classList.add('bg-bistro-espresso/20'); }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. Reservation CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-bistro-espresso text-center overflow-hidden">
        <ScrollReveal direction="up" delay={0.1}>
          <span className="font-dm text-xs tracking-[0.4em] text-bistro-terracotta uppercase block mb-3 font-semibold">
            Reserve Your Table
          </span>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={0.2}>
          <h2 className="font-playfair text-4xl sm:text-5xl text-bistro-cream tracking-wide mb-6">
            An Evening Awaits
          </h2>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={0.3}>
          <p className="font-dm text-bistro-cream/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether it's an intimate dinner for two or a celebration with friends, we curate every detail to make your evening unforgettable.
          </p>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={0.4}>
          <Link 
            to="/reservations"
            className="inline-block border-2 border-bistro-cream/60 text-bistro-cream px-10 py-4 rounded-lg font-dm text-[12px] font-medium uppercase tracking-[0.15em] hover:bg-bistro-cream hover:text-bistro-espresso hover:border-bistro-cream transition-all duration-300"
          >
            Book Now
          </Link>
        </ScrollReveal>
      </section>

      {/* 6. Gallery Preview */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-bistro-cream overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <ScrollReveal direction="up" delay={0.1}>
              <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-bistro-terracotta font-dm font-medium mb-3">
                The Atmosphere
              </span>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.2}>
              <h2 className="font-playfair text-4xl md:text-5xl text-bistro-espresso tracking-wide">
                Gallery
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=600&fit=crop',
                alt: 'Luxe Bistro interior 1'
              },
              {
                src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=600&fit=crop',
                alt: 'Luxe Bistro interior 2'
              },
              {
                src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=600&fit=crop',
                alt: 'Luxe Bistro interior 3'
              },
              {
                src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=600&fit=crop',
                alt: 'Luxe Bistro interior 4'
              }
            ].map((img, i) => (
              <ScrollReveal key={i} direction="up" delay={0.1 * (i + 1)}>
                <Link to="/gallery" className="group block relative aspect-square rounded-xl overflow-hidden bg-bistro-espresso/10">
                  <img 
                    src={img.src} 
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <span className="text-white text-xs uppercase tracking-[0.2em] font-dm font-medium">View</span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-10">
            <ScrollReveal direction="up" delay={0.5}>
              <Link 
                to="/gallery"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-bistro-terracotta font-dm font-medium hover:underline transition-all"
              >
                View Full Gallery
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}