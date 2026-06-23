import ScrollReveal from '../components/ScrollReveal.jsx';
import MenuDisplay from '../components/MenuDisplay.jsx';

export default function Menu() {
  return (
    <main className="bg-bistro-cream min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden flex items-center justify-center text-center px-5">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            alt="Menu background" 
            className="w-full h-full object-cover object-center"
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop"
          />
          <div className="absolute inset-0 bg-bistro-espresso/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl px-4">
          <ScrollReveal direction="up" delay={0.1}>
            <h1 className="font-playfair text-5xl sm:text-7xl md:text-8xl text-bistro-cream font-bold tracking-tight mb-6">
              Our Menu
            </h1>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.2}>
            <div className="w-16 h-[2px] bg-bistro-terracotta mx-auto mb-6"></div>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.3}>
            <p className="font-dm text-bistro-cream/80 text-lg sm:text-xl italic max-w-2xl mx-auto leading-relaxed">
              Crafted from earth, refined by fire. A seasonal journey through local terroir.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Menu Content */}
      <MenuDisplay />
    </main>
  );
}