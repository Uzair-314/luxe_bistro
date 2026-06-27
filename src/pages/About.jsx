// src/pages/About.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Hammer, Flame, MapPin, ArrowRight } from 'lucide-react';
import { ImageSkeleton } from '../components/LoadingComponents.jsx';

export default function About() {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [heroLoaded, setHeroLoaded] = useState(false);

  const handleImageLoad = (key) => {
    setLoadedImages(prev => new Set(prev).add(key));
  };

  const values = [
    {
      icon: Leaf,
      title: 'Sustainably Sourced',
      desc: 'We partner exclusively with local farms, fisheries, and foragers who share our commitment to regenerative agriculture.'
    },
    {
      icon: Hammer,
      title: 'Artisanal Craft',
      desc: 'From house-cured meats to hand-rolled pastas, everything is made from scratch in our kitchen each morning.'
    },
    {
      icon: Flame,
      title: 'Earth & Hearth',
      desc: 'We believe hospitality is an extension of the earth itself. Every guest is treated as a welcome friend.'
    },
    {
      icon: MapPin,
      title: 'Provenance',
      desc: 'Knowing where our food comes from is the first step in honoring it. We trace every ingredient to its origin.'
    }
  ];

  const milestones = [
    {
      year: '1994',
      title: 'The Seedling',
      desc: 'Founder Julian Vane opens the first farm-to-table organic herb farm and hand-baked sourdough.',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop'
    },
    {
      year: '2008',
      title: 'The First Hearth',
      desc: 'The first brick-and-mortar Luxe Bistro opens, introducing the farm-to-table movement to the city.',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop'
    },
    {
      year: '2020',
      title: 'Culinary Evolution',
      desc: 'Chef Julian Vane takes the helm, steering the bistro toward international acclaim with a redefined modern-rustic menu.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
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
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 animate-slide-up">
          <h1 className="font-playfair text-5xl md:text-6xl text-white mb-4">
            The Hearth & Harvest
          </h1>
          <p className="text-white/80 font-dm text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Where rural craft meets contemporary culinary mastery. A sanctuary for the senses in the heart of the city.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl bg-[#2d2420]/10 relative">
              {!loadedImages.has('story') && <ImageSkeleton className="absolute inset-0 w-full h-full rounded-2xl" />}
              <img 
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop"
                alt="Fresh harvest vegetables"
                className={`w-full h-full object-cover transition-opacity duration-500 ${loadedImages.has('story') ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => handleImageLoad('story')}
                onError={() => handleImageLoad('story')}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#8e4a0e]/10 rounded-full -z-10" />
          </div>
          <div className="animate-slide-up">
            <h2 className="font-playfair text-3xl text-[#2d2420] mb-2">Our Story</h2>
            <div className="w-12 h-0.5 bg-[#8e4a0e] mb-6" />
            <p className="text-[#6b5b4f] font-dm text-sm leading-relaxed mb-4">
              Founded in 1994, Luxe Bistro was born from a simple yet radical idea: that fine dining should be an honest conversation between the land and the plate. What began as a small herb garden in the countryside has blossomed into a destination for those seeking rustic sophistication.
            </p>
            <p className="text-[#6b5b4f] font-dm text-sm leading-relaxed">
              We believe in "Slow Dining"—the art of lingering over a meal that has been nurtured for months and prepared with intention. At Luxe Bistro, every ingredient is traced back to a specific farm, and every bottle of wine tells a story of the soil it sprang from.
            </p>
          </div>
        </div>
      </section>

      {/* Executive Chef */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 animate-slide-up">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#8e4a0e] font-dm font-medium">
                Executive Chef
              </span>
              <h2 className="font-playfair text-3xl text-[#2d2420] mt-2 mb-4">
                Chef Julian Vane
              </h2>
              <p className="text-[#6b5b4f] font-dm text-sm leading-relaxed mb-4">
                "Nature provides the palette; I simply arrange the flavors. My goal is to honor the soul of the ingredient while bringing forward intention and maximum respect."
              </p>
              <p className="text-[#6b5b4f] font-dm text-sm leading-relaxed mb-6">
                With over two decades of experience in Michelin-starred kitchens across Europe, Chef Julian returned to his roots to establish a kitchen that prioritizes provenance over pretense.
              </p>
              <button className="bg-[#8e4a0e] text-white px-6 py-2.5 rounded-lg text-xs uppercase tracking-[0.15em] font-dm font-medium hover:bg-[#6d3a0b] transition-colors">
                Read Full Bio
              </button>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-[#2d2420]/10 relative">
                {!loadedImages.has('chef') && <ImageSkeleton className="absolute inset-0 w-full h-full rounded-2xl" />}
                <img 
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop"
                  alt="Chef Julian Vane"
                  className={`w-full h-full object-cover transition-opacity duration-500 ${loadedImages.has('chef') ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => handleImageLoad('chef')}
                  onError={() => handleImageLoad('chef')}
                />
              </div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#8e4a0e]/10 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto text-center mb-16 animate-slide-up">
          <h2 className="font-playfair text-3xl text-[#2d2420] mb-3">Our Values</h2>
          <p className="text-[#6b5b4f] font-dm text-sm max-w-lg mx-auto">
            The pillars that define every dish we serve and every guest we welcome.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {values.map((value, idx) => (
            <div 
              key={idx}
              className="group text-center p-6 rounded-xl bg-white border border-[#e8ddd4]/50 
                hover:shadow-lg hover:-translate-y-1 hover:border-[#8e4a0e]/20 
                transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-full bg-[#8e4a0e]/10 flex items-center justify-center mx-auto mb-4
                group-hover:bg-[#8e4a0e] group-hover:scale-110 transition-all duration-500">
                <value.icon className="w-5 h-5 text-[#8e4a0e] group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="font-playfair text-lg text-[#2d2420] mb-2 group-hover:text-[#8e4a0e] transition-colors duration-500">
                {value.title}
              </h3>
              <p className="text-[#6b5b4f] text-xs font-dm leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Journey of Flavor Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-playfair text-3xl text-[#2d2420] text-center mb-16">
            A Journey of Flavor
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#e8ddd4] hidden md:block" />
            
            <div className="space-y-16">
              {milestones.map((milestone, idx) => (
                <div 
                  key={idx}
                  className={`relative grid md:grid-cols-2 gap-8 items-center ${
                    idx % 2 === 0 ? '' : 'md:[direction:rtl]'
                  }`}
                >
                  {/* Content */}
                  <div className={`${idx % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} [direction:ltr]`}>
                    <span className="font-playfair text-2xl text-[#8e4a0e] font-bold">
                      {milestone.year}
                    </span>
                    <h3 className="font-playfair text-xl text-[#2d2420] mt-1 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-[#6b5b4f] text-sm font-dm leading-relaxed">
                      {milestone.desc}
                    </p>
                  </div>

                  {/* Image */}
                  <div className="[direction:ltr]">
                    <div className="aspect-[16/10] rounded-xl overflow-hidden shadow-lg bg-[#2d2420]/10 relative">
                      {!loadedImages.has(`milestone-${idx}`) && <ImageSkeleton className="absolute inset-0 w-full h-full rounded-xl" />}
                      <img 
                        src={milestone.image}
                        alt={milestone.title}
                        className={`w-full h-full object-cover hover:scale-105 transition-transform duration-700 ${loadedImages.has(`milestone-${idx}`) ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => handleImageLoad(`milestone-${idx}`)}
                        onError={() => handleImageLoad(`milestone-${idx}`)}
                      />
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#8e4a0e] rounded-full border-4 border-white shadow hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-[#2d2420] rounded-2xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#8e4a0e]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#8e4a0e]/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <h2 className="font-playfair text-3xl md:text-4xl text-white mb-4">
              Ready for a Taste of the Hearth?
            </h2>
            <p className="text-white/70 font-dm text-sm max-w-md mx-auto mb-8">
              Reservations fill up quickly. Secure your table for an evening of rustic sophistication and culinary discovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/reservations"
                className="bg-[#8e4a0e] text-white px-8 py-3 rounded-full text-xs uppercase tracking-[0.15em] font-dm font-medium hover:bg-[#6d3a0b] transition-colors inline-flex items-center justify-center gap-2"
              >
                Come Dine With Us
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/menu"
                className="border border-white/30 text-white px-8 py-3 rounded-full text-xs uppercase tracking-[0.15em] font-dm font-medium hover:bg-white/10 transition-colors inline-flex items-center justify-center"
              >
                View Our Menu
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}