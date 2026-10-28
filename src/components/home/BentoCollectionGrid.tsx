import { Container } from '../layout/Layout';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from '@phosphor-icons/react';

interface CategoryCard {
  slug: string;
  index: string;
  title: string;
  count: string;
  image: string;
  imageAlt: string;
  gridClass: string;
  titleSize: string;
  imagePosition?: string;
}

const CATEGORY_CARDS: CategoryCard[] = [
  // 1. Door Handles & Knobs — upper-left landscape (8 cols, row 1)
  {
    slug: 'door-handles-knobs',
    index: '01',
    title: 'Door Handles & Knobs',
    count: '4 PRODUCTS',
    image: '/01_door_handles_knobs.png',
    imageAlt: 'Matte-black and brushed-brass architectural door handles arranged on natural beige stone',
    gridClass: 'lg:col-span-8 lg:row-span-1 min-h-[320px] sm:min-h-[360px] lg:min-h-[380px]',
    titleSize: 'text-2xl sm:text-3xl lg:text-[32px]',
    imagePosition: 'object-[50%_45%]',
  },
  // 2. Bathroom Accessories — tall portrait card on the right (4 cols, spans row 1 & row 2)
  {
    slug: 'bathroom-accessories',
    index: '02',
    title: 'Bathroom Accessories',
    count: '3 PRODUCTS',
    image: '/02_bathroom_accessories.png',
    imageAlt: 'Matte-black waterfall faucet against warm beige marble vanity with ambient lighting',
    gridClass: 'lg:col-span-4 lg:row-span-2 min-h-[380px] sm:min-h-[460px] lg:min-h-[776px]',
    titleSize: 'text-2xl sm:text-[28px] lg:text-[30px]',
    imagePosition: 'object-center',
  },
  // 3. Door Hardware & Accessories — compact landscape card in second row, left side (4 cols, row 2)
  {
    slug: 'door-hardware-accessories',
    index: '03',
    title: 'Door Hardware & Accessories',
    count: '3 PRODUCTS',
    image: '/03_door_hardware_accessories.png',
    imageAlt: 'Minimalist matte-black flush plate on light stone tiled wall',
    gridClass: 'lg:col-span-4 lg:row-span-1 min-h-[280px] sm:min-h-[320px] lg:min-h-[380px]',
    titleSize: 'text-xl sm:text-2xl lg:text-[26px]',
    imagePosition: 'object-center',
  },
  // 4. Towel Rails & Holders — compact landscape card beside card 3 (4 cols, row 2)
  {
    slug: 'towel-rails-holders',
    index: '04',
    title: 'Towel Rails & Holders',
    count: '3 PRODUCTS',
    image: '/04_towel_rails_holders.png',
    imageAlt: 'Black architectural towel rail with soft grey towel against beige stone wall',
    gridClass: 'lg:col-span-4 lg:row-span-1 min-h-[280px] sm:min-h-[320px] lg:min-h-[380px]',
    titleSize: 'text-xl sm:text-2xl lg:text-[26px]',
    imagePosition: 'object-center',
  },
  // 5. Hooks, Robe Hooks & Utility — full-width landscape card in final row (12 cols, row 3)
  {
    slug: 'hooks-utility',
    index: '05',
    title: 'Hooks, Robe Hooks & Utility',
    count: '2 PRODUCTS',
    image: '/05_hooks_robe_hooks_utility.png',
    imageAlt: 'Black bathroom hooks and accessories against textured beige stone with grey towel',
    gridClass: 'lg:col-span-12 lg:row-span-1 min-h-[280px] sm:min-h-[320px] lg:min-h-[340px]',
    titleSize: 'text-2xl sm:text-3xl lg:text-[32px]',
    imagePosition: 'object-[50%_35%]',
  },
];

export const BentoCollectionGrid: React.FC = () => {
  return (
    <section className="bento-collection-section bg-[#F7F4EF] text-[#11100F] py-16 sm:py-20 lg:py-28 border-b border-[#E7E2D8]">
      <Container className="home-container">
        {/* Section Header */}
        <header className="mb-10 sm:mb-12 lg:mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8">
          <div className="max-w-3xl">
            <span className="mono-label block text-[13px] sm:text-[14px] font-mono uppercase tracking-[0.26em] text-[#817366] mb-3 sm:mb-4">
              OBJECTS OF DESIGN
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.06] text-[#11100F] font-normal tracking-[-0.025em] text-balance">
              The art of the finishing touch.
            </h2>
            <p className="text-base sm:text-lg lg:text-[22px] font-normal text-[#817366] mt-3 sm:mt-4 leading-relaxed">
              Architectural hardware, thoughtfully selected for considered spaces.
            </p>
          </div>

          <div className="shrink-0 pt-2 lg:pt-0">
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 text-xs sm:text-[13px] font-mono tracking-[0.2em] uppercase text-[#11100F] hover:text-[#817366] transition-colors"
              aria-label="Explore all collections"
            >
              <span className="border-b border-[#11100F]/30 pb-0.5 group-hover:border-[#11100F] transition-colors">
                EXPLORE ALL COLLECTIONS
              </span>
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#11100F]/30 text-[#11100F] flex items-center justify-center transition-all duration-300 group-hover:border-[#11100F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-[#11100F]/5"
                aria-hidden="true"
              >
                <ArrowUpRight size={17} weight="bold" />
              </div>
            </Link>
          </div>
        </header>

        {/* 5-Card Exact Asymmetrical Grid */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-4">
          {CATEGORY_CARDS.map((card) => (
            <Link
              key={card.slug}
              to={`/products/${card.slug}`}
              className={`bento-card group relative overflow-hidden rounded-[12px] bg-[#1A1A1C] transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] focus-visible:ring-offset-2 ${card.gridClass}`}
              aria-label={`${card.title} — ${card.count}`}
            >
              {/* Background Photography with Subtle Zoom */}
              <img
                src={card.image}
                alt={card.imageAlt}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover ${card.imagePosition || 'object-center'} transition-transform duration-500 ease-out group-hover:scale-[1.04]`}
              />

              {/* Upward Transparent-to-Dark Gradient */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0E0E10]/95 via-[#0E0E10]/45 to-transparent transition-opacity duration-300 group-hover:opacity-95 pointer-events-none"
                aria-hidden="true"
              />

              {/* Top-Left Index Number & Architectural Rule */}
              <div className="absolute top-5 left-5 sm:top-6 sm:left-6 lg:top-7 lg:left-7 z-10 flex items-center gap-2.5 pointer-events-none">
                <span className="font-mono text-xs sm:text-[13px] font-medium text-white/90 tracking-wider">
                  {card.index}
                </span>
                <div className="w-8 h-[1px] bg-white/40" />
              </div>

              {/* Lower-Left Title & Product Count + Lower-Right Circular Arrow */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7 z-10 pointer-events-none">
                <div className="flex items-end justify-between gap-4">
                  <div className="max-w-[82%]">
                    <h3 className={`bento-title font-serif ${card.titleSize} font-normal text-white leading-tight tracking-[-0.015em]`}>
                      {card.title}
                    </h3>
                    <span className="bento-count mono-label block text-[11px] sm:text-[12px] font-mono tracking-[0.2em] text-white/80 uppercase mt-2">
                      {card.count}
                    </span>
                  </div>

                  {/* Circular Outlined Arrow */}
                  <div
                    className="bento-arrow w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/60 text-white flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 bg-black/25 backdrop-blur-[2px]"
                    aria-hidden="true"
                  >
                    <ArrowUpRight size={18} weight="bold" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};
