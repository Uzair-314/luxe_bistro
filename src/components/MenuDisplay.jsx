import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MENU_CATEGORIES, MENU_ITEMS } from './menuData';
import { useApp } from '../hooks/useApp';
import ScrollReveal from './ScrollReveal.jsx';

export default function MenuDisplay() {
  const { addToCart } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu-preview" className="py-24 bg-bistro-cream px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Headers */}
        <div className="text-center mb-16">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="font-dm text-xs tracking-[0.4em] text-bistro-terracotta uppercase block mb-3 font-semibold">
              Our Culinary Offerings
            </span>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="font-playfair text-4xl sm:text-5xl text-bistro-espresso tracking-wide">
              The Seasonal Menu
            </h2>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.3}>
            <div className="w-12 h-[1px] bg-bistro-terracotta mx-auto mt-4"></div>
          </ScrollReveal>
        </div>

        {/* Category Tabs */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-16 font-dm text-xs tracking-widest uppercase">
            {MENU_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-lg transition-all duration-300 border ${
                  activeCategory === category
                    ? 'bg-bistro-espresso text-bistro-cream border-bistro-espresso shadow-md'
                    : 'bg-transparent text-bistro-espresso/60 border-bistro-espresso/10 hover:border-bistro-terracotta hover:text-bistro-terracotta'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Menu Grid - Each card animates individually on scroll */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
          {filteredItems.map((item) => (
            <ScrollReveal key={item.id} direction="up" delay={0}>
              <div className="group p-6 rounded-lg bg-bistro-darkCream/30 hover:bg-bistro-darkCream/60 transition-all duration-300 border border-bistro-darkCream flex gap-5 h-full">
                {/* Image */}
                <div className="w-24 h-24 rounded-lg bg-bistro-espresso/10 flex-shrink-0 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between mb-2">
                      <h3 className="font-playfair text-xl text-bistro-espresso tracking-wide flex items-center gap-2">
                        {item.name}
                        {item.isChefSpecial && (
                          <span className="font-dm text-[9px] tracking-widest uppercase bg-bistro-terracotta/10 text-bistro-terracotta px-2 py-0.5 rounded font-bold">
                            Chef's Special
                          </span>
                        )}
                      </h3>
                      <span className="font-playfair text-lg text-bistro-terracotta font-medium ml-4">
                        ${item.price}
                      </span>
                    </div>
                    <p className="font-dm text-bistro-sage text-sm leading-relaxed mb-4 font-light">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    className="self-start font-dm text-[10px] tracking-widest uppercase font-semibold text-bistro-espresso hover:text-bistro-terracotta flex items-center gap-1.5 transition-colors group/btn"
                  >
                    <span>Add To Order</span>
                    <svg className="w-3 h-3 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* View Full Menu Link */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="text-center mt-16">
            <Link 
              to="/menu"
              className="inline-block font-dm text-[11px] uppercase tracking-[0.2em] text-bistro-espresso border-b-2 border-bistro-terracotta pb-1 hover:text-bistro-terracotta transition-colors"
            >
              View Full Menu
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}