import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProductFinish } from '../../types';

export interface ProductGalleryProps {
  productName: string;
  finishes: ProductFinish[];
  imagesByFinish: Record<string, string>;
  selectedFinishId: string;
  onSelectFinish: (finishId: string) => void;
  photoNeeded?: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  productName,
  finishes,
  imagesByFinish,
  selectedFinishId,
  onSelectFinish,
  photoNeeded = 'Studio photography in progress',
}) => {
  const currentFinish = finishes.find((f) => f.id === selectedFinishId) || finishes[0];
  const activeImage =
    (currentFinish && imagesByFinish[currentFinish.id]) || '/Luxury Brass and Black Cabinet Hardware.png';

  return (
    <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4">
      {/* 1. HERO BIG MAIN IMAGE (Up on mobile, Left on tablet/desktop) */}
      <div className="relative flex-1 min-w-0 aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3] min-h-[260px] sm:min-h-[440px] lg:min-h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E5E0D8] bg-[#FAF8F5] flex items-center justify-center p-0 group">
        <AnimatePresence mode="wait">
          {activeImage ? (
            <motion.img
              key={activeImage}
              src={activeImage}
              alt={`${productName}${currentFinish ? ` in ${currentFinish.name}` : ''}`}
              initial={{ opacity: 0, scale: 1.35 }}
              animate={{ opacity: 1, scale: 1.48 }}
              exit={{ opacity: 0, scale: 1.52 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full object-contain"
              loading="eager"
            />
          ) : (
            <motion.div
              key="pending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full w-full min-h-[260px] flex flex-col items-center justify-center text-center p-6 text-[#78716C]"
            >
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#AD8143] font-semibold mb-2">
                Photograph pending
              </span>
              <p className="text-xs sm:text-sm font-mono max-w-xs text-[#57534E]">
                {photoNeeded}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Finish Pill Badge on Big Image */}
        <AnimatePresence mode="wait">
          {currentFinish && (
            <motion.div
              key={currentFinish.id}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF8F5]/95 backdrop-blur-sm border border-[#E5E0D8] text-xs font-medium text-[#18181B] select-none shadow-2xs"
            >
              <span
                className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                style={{ backgroundColor: currentFinish.hex }}
              />
              <span>{currentFinish.name}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. THUMBNAILS (Below big image on mobile, Right vertical column on sm+) */}
      {finishes && finishes.length > 0 && (
        <div
          className="flex flex-row sm:flex-col gap-2.5 sm:gap-2 shrink-0 py-1 sm:py-0.5 px-0.5 overflow-x-auto sm:overflow-x-visible sm:overflow-y-auto max-w-full sm:max-h-[480px] scrollbar-none"
          role="tablist"
          aria-label="Product color variations"
        >
          {finishes.map((f) => {
            const isSelected = f.id === selectedFinishId;
            const thumbImg = imagesByFinish[f.id] || activeImage;

            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-label={`Select ${f.name} color and view image`}
                title={`${f.name} — Click to switch image and color`}
                onClick={() => onSelectFinish(f.id)}
                className={`group relative shrink-0 w-16 sm:w-16 aspect-[4/3] rounded-xl sm:rounded-2xl border-2 overflow-hidden bg-[#FAF8F5] transition-all duration-200 cursor-pointer flex items-center justify-center p-1 sm:p-1.5 ${
                  isSelected
                    ? 'border-[#FFC400]'
                    : 'border-[#E5E0D8] hover:border-[#18181B]/40 opacity-70 hover:opacity-100'
                }`}
              >
                {/* Thumbnail Image: fully contained with natural margins */}
                <img
                  src={thumbImg}
                  alt={f.name}
                  className="w-full h-full object-contain select-none scale-125"
                  loading="lazy"
                />

                {/* Clean Color Indicator Dot */}
                <span
                  className="absolute bottom-1 right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-white shadow-xs shrink-0 pointer-events-none"
                  style={{ backgroundColor: f.hex }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
