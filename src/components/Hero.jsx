import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center text-center px-5 bg-bistro-espresso">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Luxe Bistro Fine Dining" 
          className="w-full h-full object-cover object-center opacity-100 select-none pointer-events-none animate-kenburns" 
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop"
        />
        <div className="absolute inset-0 bg-bistro-espresso/50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bistro-espresso"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-4 mt-16">
        <span className="block font-dm text-xs sm:text-sm tracking-[0.4em] text-bistro-terracotta uppercase mb-5 font-semibold">
          A Culinary Journey Awaits
        </span>

        <h1 className="font-playfair text-[48px] md:text-[76px] leading-[1.1] font-bold text-bistro-cream tracking-tight mb-10 drop-shadow-sm">
          Where Every Meal <br className="hidden sm:inline" /> Tells a Story
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link 
            to="/menu" 
            className="w-full sm:w-auto text-center bg-bistro-terracotta text-bistro-cream px-10 py-4 rounded-lg font-dm text-[12px] font-medium uppercase tracking-[0.15em] hover:bg-bistro-terracotta/90 transition-all duration-300 shadow-xl"
          >
            Order Now
          </Link>
          <Link 
            to="/menu" 
            className="w-full sm:w-auto text-center border-2 border-bistro-cream/60 text-bistro-cream px-10 py-4 rounded-lg font-dm text-[12px] font-medium uppercase tracking-[0.15em] hover:bg-bistro-cream hover:text-bistro-espresso hover:border-bistro-cream transition-all duration-300"
          >
            View Menu
          </Link>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-bistro-cream opacity-70 hover:opacity-100 transition-opacity duration-300">
        <a href="#menu-preview" aria-label="Scroll down">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </a>
      </div>

    </section>
  );
}