// src/pages/Gallery.jsx
import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { ImageSkeleton } from '../components/LoadingComponents.jsx';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    category: 'Cuisine',
    title: 'Wood-Fired Venison',
    desc: 'Herb-crusted with root vegetable puree'
  },
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop',
    category: 'Interior',
    title: 'The Main Dining Room',
    desc: 'Intimate seating for forty guests'
  },
  {
    src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop',
    category: 'Harvest',
    title: 'Morning Harvest',
    desc: 'Fresh produce from partner farms'
  },
  {
    src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop',
    category: 'Team',
    title: 'Chef Julian Vane',
    desc: 'Executive Chef & Founder'
  },
  {
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
    category: 'Cuisine',
    title: 'Seasonal Tasting Menu',
    desc: 'Seven courses of rustic elegance'
  },
  {
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop',
    category: 'Interior',
    title: 'The Hearth Bar',
    desc: 'Craft cocktails by firelight'
  },
  {
    src: 'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?q=80&w=800&auto=format&fit=crop',
    category: 'Harvest',
    title: 'Foraged Mushrooms',
    desc: 'Wild chanterelles from the valley'
  },
  {
    src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop',
    category: 'Team',
    title: 'The Kitchen Brigade',
    desc: 'Passionate craftspeople at work'
  },
  {
    src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=800&auto=format&fit=crop',
    category: 'Cuisine',
    title: 'Artisan Bread Service',
    desc: 'Sourdough baked fresh each morning'
  },
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
    category: 'Interior',
    title: 'Private Dining Suite',
    desc: 'Exclusive space for twelve guests'
  },
  {
    src: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800&auto=format&fit=crop',
    category: 'Harvest',
    title: 'The Herb Garden',
    desc: 'Over forty varieties cultivated on-site'
  },
  {
    src: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=800&auto=format&fit=crop',
    category: 'Cuisine',
    title: 'Dessert Finale',
    desc: 'Dark chocolate terrine with gold leaf'
  }
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());

  const handleImageLoad = (idx) => {
    setLoadedImages(prev => new Set(prev).add(idx));
  };

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      {/* Hero */}
      <div className="pt-32 pb-16 px-4 text-center max-w-3xl mx-auto animate-slide-up">
        <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-[#8e4a0e] font-dm font-medium mb-4">
          Visual Journey
        </span>
        <h1 className="font-playfair text-4xl md:text-5xl text-[#2d2420] mb-4">
          The Gallery
        </h1>
        <p className="text-[#6b5b4f] font-dm text-sm md:text-base leading-relaxed max-w-xl mx-auto">
          A curated collection of moments from our kitchen, our gardens, and the tables where memories are made.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {galleryImages.map((img, idx) => (
            <div 
              key={idx}
              className="group relative rounded-xl overflow-hidden cursor-pointer bg-white shadow-sm border border-[#e8ddd4]/30 hover:shadow-xl hover:-translate-y-1 hover:border-[#8e4a0e]/20 transition-all duration-500"
              onClick={() => setLightbox(img)}
            >
              <div className="aspect-[4/3] overflow-hidden relative bg-[#faf7f2]">
                {!loadedImages.has(idx) && <ImageSkeleton className="absolute inset-0 w-full h-full" />}
                <img 
                  src={img.src}
                  alt={img.title}
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${loadedImages.has(idx) ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => handleImageLoad(idx)}
                  onError={() => handleImageLoad(idx)}
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8e4a0e] font-dm font-medium">
                  {img.category}
                </span>
                <h3 className="font-playfair text-lg text-white mt-1">{img.title}</h3>
                <p className="text-white/70 text-xs font-dm mt-1">{img.desc}</p>
              </div>

              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white/40">
                <ZoomIn className="w-4 h-4 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setLightbox(null)}
        >
          <button 
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img 
              src={lightbox.src} 
              alt={lightbox.title}
              className="w-full rounded-lg shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h3 className="font-playfair text-xl text-white">{lightbox.title}</h3>
              <p className="text-white/60 text-sm font-dm mt-1">{lightbox.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}