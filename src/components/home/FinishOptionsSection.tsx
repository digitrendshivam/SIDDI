import { Container } from '../layout/Layout';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, BookOpen, Stack, Palette } from '@phosphor-icons/react';

export interface FinishItem {
  id: string;
  name: string;
  descriptor: string;
  hex: string;
  gradient: string;
  heroImage: string;
  heroBadge: string;
  macroImage: string;
  description: string;
  substrate: string;
  pairing: string;
}

export const FINISH_OPTIONS: FinishItem[] = [
  {
    id: 'matte-black',
    name: 'Matte black',
    descriptor: 'BOLD & MODERN',
    hex: '#1E1E22',
    gradient: 'radial-gradient(circle at 35% 35%, #2E2E33 0%, #171719 65%, #0B0B0D 100%)',
    heroImage: '/Matte Black Knurled Door Lever.png',
    heroBadge: 'MBK-301 MATTE BLACK',
    macroImage: '/Matte Black Knurled Door Lever.png',
    description: 'An uncompromising, light-absorbent tactile matte finish with microscopic carbon sputtering that naturally repels fingerprints and surface oils.',
    substrate: 'Confirm with the trade desk.',
    pairing: 'Review against project materials using a physical sample.',
  },
  {
    id: 'brushed-brass',
    name: 'Brushed brass',
    descriptor: 'WARM & TIMELESS',
    hex: '#D4AF37',
    gradient: 'conic-gradient(from 45deg, #B5843C 0deg, #E6C26D 90deg, #A87632 180deg, #F0D38D 270deg, #B5843C 360deg)',
    heroImage: '/brass-door-handle.jpg',
    heroBadge: 'BBR-202 BRUSHED BRASS',
    macroImage: '/brass-door-handle.jpg',
    description: 'A tactile, directional satin grain machined along the length of solid forged brass. Captures daylight and casts an inviting golden warmth.',
    substrate: 'Confirm with the trade desk.',
    pairing: 'Review against project materials using a physical sample.',
  },
  {
    id: 'satin-steel',
    name: 'Satin steel',
    descriptor: 'REFINED & VERSATILE',
    hex: '#A4A4AA',
    gradient: 'conic-gradient(from 0deg, #9FA0A6 0deg, #E2E2E7 90deg, #8B8C92 180deg, #D5D5DB 270deg, #9FA0A6 360deg)',
    heroImage: '/Satin Knurled Stainless Door Lever.png',
    heroBadge: 'SDR-104 SATIN STEEL',
    macroImage: '/Satin Knurled Stainless Door Lever.png',
    description: 'A refined, contemporary finish with a smooth satin texture. Works beautifully across modern and classic spaces.',
    substrate: 'Confirm with the trade desk.',
    pairing: 'Review against project materials using a physical sample.',
  },
  {
    id: 'polished-chrome',
    name: 'Polished chrome',
    descriptor: 'CLEAN & PREMIUM',
    hex: '#F1F0EC',
    gradient: 'conic-gradient(from 30deg, #BFC7CE 0deg, #FFFFFF 70deg, #8A96A0 160deg, #F5F7FA 250deg, #BFC7CE 360deg)',
    heroImage: '/Polished Chrome Knurled Door Lever.png',
    heroBadge: 'PCH-405 POLISHED CHROME',
    macroImage: '/Polished Chrome Knurled Door Lever.png',
    description: 'Optically buffed to a seamless mirror before multi-stage electrolytic hard chrome immersion. Reflects spatial geometry with crystalline brilliance.',
    substrate: 'Confirm with the trade desk.',
    pairing: 'Review against project materials using a physical sample.',
  },
  {
    id: 'gunmetal',
    name: 'Gunmetal',
    descriptor: 'CONTEMPORARY EDGE',
    hex: '#5B5B61',
    gradient: 'conic-gradient(from 40deg, #3E4249 0deg, #5B616B 90deg, #26292E 180deg, #4F555E 270deg, #3E4249 360deg)',
    heroImage: '/Modern Gunmetal Knurled Door Handle.png',
    heroBadge: 'GMT-508 GUNMETAL',
    macroImage: '/Modern Gunmetal Knurled Door Handle.png',
    description: 'Titanium-carbide magnetron sputtered dark graphite finish. Shifts subtly between deep charcoal in daylight and warm espresso under evening downlights.',
    substrate: 'Confirm with the trade desk.',
    pairing: 'Review against project materials using a physical sample.',
  },
  {
    id: 'antique-bronze',
    name: 'Antique bronze',
    descriptor: 'CLASSIC CHARACTER',
    hex: '#614E3C',
    gradient: 'conic-gradient(from 20deg, #4A3321 0deg, #7A5638 90deg, #352316 180deg, #6C4C32 270deg, #4A3321 360deg)',
    heroImage: '/Antique Bronze Knurled Door Lever.png',
    heroBadge: 'ABZ-604 ANTIQUE BRONZE',
    macroImage: '/Antique Bronze Knurled Door Lever.png',
    description: 'An authentic living finish, hand-relieved along architectural edges to reveal golden undertones beneath rich coffee patina.',
    substrate: 'Confirm with the trade desk.',
    pairing: 'Review against project materials using a physical sample.',
  },
];

export const FinishOptionsSection: React.FC = () => {
  // Default selection is Satin steel as per specification
  const [selectedId, setSelectedId] = useState<string>('satin-steel');
  const selectedFinish = FINISH_OPTIONS.find((f) => f.id === selectedId) ?? FINISH_OPTIONS[2];

  return (
    <section
      className="finish-options-section bg-[#F5F0E9] text-[#171719] py-12 sm:py-16 lg:py-20 border-t border-[#E8E2D8] overflow-hidden relative w-full"
      aria-labelledby="finish-options-title"
    >
      {/* =========================================================================
          DESKTOP LAYOUT (>= lg): Editorial reference composition
          - Dynamic hero image on top right updating with active finish
          - Eyebrow with gold dash & bold headline
          - Six realistic radial metallic swatches in single horizontal row with active card & gold bottom accent
          - Contained white card below containing all content (no 2nd image)
         ========================================================================= */}
      <Container className="hidden lg:block relative">
        
        {/* Top-Right Ambient Photographic Visual - Exact recreation from reference */}
        <div className="absolute top-[-10px] right-6 lg:right-12 xl:right-16 w-[380px] xl:w-[440px] pointer-events-none select-none z-0">
          <img
            src="/door-handle-faded-hero.png"
            alt="Architectural knurled door lever on travertine stone slab in sunlight"
            className="w-full h-auto object-contain object-top-right"
            loading="lazy"
          />
        </div>

        {/* Top Left Header Content */}
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-bold tracking-[0.22em] text-[#9E743A] uppercase">
              FINISH OPTIONS
            </span>
            <span className="w-10 h-[1.5px] bg-[#9E743A]/60 inline-block rounded-full" />
          </div>

          <h2
            id="finish-options-title"
            className="mt-3 text-[42px] xl:text-[46px] font-bold text-[#171719] leading-[1.12] tracking-tight"
          >
            Choose a finish<br />to review<span className="text-[#9E743A]">.</span>
          </h2>

          <p className="mt-3 text-[14.5px] text-[#635E57] max-w-lg leading-relaxed">
            Each finish is crafted for lasting beauty, performance and real spaces.
          </p>
        </div>

        {/* Six Finish Selectors in Single Horizontal Row on Desktop */}
        <div
          className="mt-8 relative z-10 grid grid-cols-6 gap-3 xl:gap-4 items-end"
          role="radiogroup"
          aria-label="Available finish options"
        >
          {FINISH_OPTIONS.map((finish) => {
            const isSelected = finish.id === selectedId;
            return (
              <div key={finish.id} className="relative flex flex-col items-center">
                <button
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelectedId(finish.id)}
                  className={`w-full flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 cursor-pointer text-center relative ${
                    isSelected
                      ? 'bg-white/85 backdrop-blur-xs border border-[#E3DDD4] shadow-xs ring-1 ring-black/5'
                      : 'bg-transparent hover:bg-white/40 border border-transparent'
                  }`}
                >
                  {/* Circular Metallic Swatch */}
                  <div className="relative my-0.5">
                    <span
                      className={`block w-12 h-12 rounded-full shadow-xs transition-all duration-200 ${
                        isSelected
                          ? 'ring-2 ring-[#9E743A] ring-offset-2 ring-offset-white'
                          : 'hover:scale-105'
                      }`}
                      style={{ background: finish.gradient }}
                    />
                    
                    {/* Small Gold Checkmark Badge for Active Finish */}
                    {isSelected && (
                      <span
                        className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-[#9E743A] text-white shadow-xs"
                        aria-hidden="true"
                      >
                        <Check size={9} weight="bold" />
                      </span>
                    )}
                  </div>

                  {/* Name and Descriptor */}
                  <span className="block text-[13px] font-bold text-[#171719] mt-2 leading-tight truncate w-full">
                    {finish.name}
                  </span>
                  <span className="block text-[8.5px] font-semibold text-[#827C73] uppercase tracking-wider mt-0.5 leading-tight truncate w-full">
                    {finish.descriptor}
                  </span>
                </button>

                {/* Active Gold Underline Bar */}
                {isSelected && (
                  <span
                    className="absolute -bottom-2 w-10 h-[2px] bg-[#9E743A] rounded-full pointer-events-none"
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Lower White Card Container: Macro Texture Preview + Information (Exact from desktop reference) */}
        <div className="mt-8 bg-white rounded-[26px] border border-[#E7E1D6] shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 xl:p-7 relative z-10 w-full">
          <div className="grid grid-cols-12 gap-7 xl:gap-8 items-center">
            
            {/* Left: Macro Finish Photograph */}
            <div className="col-span-5 relative w-full aspect-[4/2] rounded-2xl overflow-hidden border border-[#E7E1D6] bg-[#F4EFEA]">
              <img
                key={selectedFinish.id}
                src={selectedFinish.macroImage}
                alt={`${selectedFinish.name} texture preview`}
                className="w-full h-full object-contain transition-opacity duration-300"
                loading="lazy"
              />
            </div>

            {/* Right: Selected Finish Details, Specs & Actions */}
            <div className="col-span-7 flex flex-col justify-center">
              <span className="block text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#9E743A] mb-1">
                SELECTED FINISH
              </span>
              <h3 className="text-3xl xl:text-[34px] font-bold text-[#171719] leading-tight">
                {selectedFinish.name}
              </h3>
              <p className="mt-2.5 text-[14px] text-[#5C564E] leading-relaxed max-w-xl">
                {selectedFinish.description}
              </p>

              {/* Substrate & Project Pairing Specs Side-by-Side */}
              <div className="mt-5 pt-4 border-t border-[#ECE6DC] flex items-center gap-6 xl:gap-8">
                {/* SUBSTRATE */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] border border-[#EBE3D7] flex items-center justify-center text-[#9E743A] shrink-0">
                    <Stack size={19} weight="bold" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-[9.5px] font-bold uppercase tracking-wider text-[#9E743A]">
                      SUBSTRATE
                    </span>
                    <span className="text-[12.5px] font-medium text-[#171719] mt-0.5 block">
                      {selectedFinish.substrate}
                    </span>
                  </div>
                </div>

                {/* PROJECT PAIRING */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] border border-[#EBE3D7] flex items-center justify-center text-[#9E743A] shrink-0">
                    <Palette size={19} weight="bold" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-[9.5px] font-bold uppercase tracking-wider text-[#9E743A]">
                      PROJECT PAIRING
                    </span>
                    <span className="text-[12.5px] font-medium text-[#171719] mt-0.5 block">
                      {selectedFinish.pairing}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-5 border-t border-[#ECE6DC] flex items-center gap-3">
                <Link
                  to={`/trade-desk?type=sample-box&finish=${encodeURIComponent(selectedFinish.name)}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#171719] !text-white text-xs font-semibold hover:bg-black transition-colors shadow-xs"
                  style={{ color: '#FFFFFF' }}
                >
                  <span className="!text-white" style={{ color: '#FFFFFF' }}>Request a swatch</span>
                  <ArrowRight size={14} weight="bold" aria-hidden="true" className="!text-white" style={{ color: '#FFFFFF' }} />
                </Link>

                <Link
                  to="/resources"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#F4EFEA] hover:bg-[#EAE4DC] border border-[#E2DBD0] text-[#171719] text-xs font-semibold transition-colors"
                >
                  <BookOpen size={15} weight="regular" aria-hidden="true" />
                  <span>View finish guide</span>
                </Link>
              </div>
            </div>

          </div>
        </div>

      </Container>

      {/* =========================================================================
          MOBILE & TABLET LAYOUT (< lg):
          1. Main image height reduced on tablet only (sm:h-[210px] md:h-[220px])
          2. Finish options horizontal scrolling on mobile (flex-row, no 2-row grid)
          3. 2nd image removed - all content cleanly contained
          4. Main image changes dynamically on finish option selection
         ========================================================================= */}
      <Container className="block lg:hidden">
        <div>
          {/* Eyebrow */}
          <span className="block text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#946B00] uppercase mb-2">
            FINISH OPTIONS
          </span>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl font-bold text-[#171719] leading-[1.12] tracking-tight">
            Choose a finish to review<span className="text-[#946B00]">.</span>
          </h2>

          {/* Supporting Text */}
          <p className="mt-3 text-sm sm:text-base text-[#66666D] leading-relaxed">
            Each finish is crafted for lasting beauty, performance and real spaces.
          </p>

          {/* Main Hero Photograph - Height adjusted on tablet only, changes dynamically with finish */}
          <div className="mt-6 mb-8 w-full aspect-[16/10] sm:aspect-auto sm:h-[210px] md:h-[220px] rounded-2xl overflow-hidden shadow-md border border-[#E5E0D8] relative">
            <img
              key={selectedFinish.id}
              src={selectedFinish.heroImage}
              alt={`${selectedFinish.name} architectural hardware`}
              className="w-full h-full object-cover object-center transition-opacity duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            
            {/* Dynamic Corner Badge */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-[9.5px] font-medium tracking-wider uppercase border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedFinish.hex }} />
                <span>{selectedFinish.heroBadge}</span>
              </span>
            </div>
          </div>

          {/* Finish Selectors: Horizontal scroll on mobile (no 2 rows), 6-col grid on tablet */}
          <div
            className="mt-6 sm:mt-8 flex flex-row sm:grid sm:grid-cols-6 overflow-x-auto gap-2.5 sm:gap-2.5 -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 sm:pb-0 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            role="radiogroup"
            aria-label="Available finish options"
          >
            {FINISH_OPTIONS.map((finish) => {
              const isSelected = finish.id === selectedId;
              return (
                <button
                  key={finish.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelectedId(finish.id)}
                  className={`relative flex flex-col items-start justify-between p-2.5 sm:p-3 rounded-lg border text-left transition-all duration-200 cursor-pointer min-h-[92px] sm:min-h-[104px] shrink-0 w-[112px] sm:w-auto snap-start ${
                    isSelected
                      ? 'bg-white border-[#946B00] shadow-xs ring-1 ring-[#946B00]'
                      : 'bg-white/70 hover:bg-white border-[#E4DFD7] hover:border-[#D1C9BE]'
                  }`}
                >
                  {/* Check indicator for selected item */}
                  {isSelected && (
                    <span
                      className="absolute top-2 right-2 flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#946B00] text-white"
                      aria-hidden="true"
                    >
                      <Check size={9} weight="bold" />
                    </span>
                  )}

                  {/* Circular Material Swatch Preview */}
                  <span
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-black/15 shadow-xs shrink-0"
                    style={{ background: finish.gradient || finish.hex }}
                    aria-hidden="true"
                  />

                  {/* Finish Info */}
                  <div className="w-full mt-2">
                    <span className="block text-xs sm:text-[13px] font-bold text-[#171719] leading-tight truncate">
                      {finish.name}
                    </span>
                    <span className="block text-[8px] sm:text-[8.5px] font-semibold uppercase tracking-wider text-[#817366] mt-0.5 leading-none truncate">
                      {finish.descriptor}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Finish Details Area - 2nd Image Removed, Contains All Content Directly */}
          <div className="mt-8 pt-6 border-t border-[#E5E0D8]">
            <div className="w-full">
              <span className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#946B00] mb-1">
                SELECTED FINISH
              </span>
              <h3 className="text-2xl sm:text-[28px] font-bold text-[#171719] leading-tight">
                {selectedFinish.name}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#5B5B61] leading-relaxed max-w-2xl">
                {selectedFinish.description}
              </p>

              {/* Action Buttons: Full-width on mobile */}
              <div className="mt-6 pt-5 border-t border-[#E5E0D8] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  to={`/trade-desk?type=sample-box&finish=${encodeURIComponent(selectedFinish.name)}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[6px] bg-[#171719] !text-white text-xs sm:text-sm font-semibold hover:bg-black transition-colors shadow-xs w-full sm:w-auto"
                  style={{ color: '#FFFFFF' }}
                >
                  <span className="!text-white" style={{ color: '#FFFFFF' }}>Request a swatch</span>
                  <ArrowRight size={15} weight="bold" aria-hidden="true" className="!text-white" style={{ color: '#FFFFFF' }} />
                </Link>

                <Link
                  to="/resources"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[6px] border border-[#D7D6D0] bg-transparent text-[#171719] text-xs sm:text-sm font-semibold hover:border-[#171719] hover:bg-white transition-colors w-full sm:w-auto"
                >
                  <BookOpen size={16} weight="regular" aria-hidden="true" />
                  <span>View finish guide</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </Container>

    </section>
  );
};
