import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import type { Product } from '../../types';

export interface ProductCardProps {
  product: Product;
  indexNumber?: number;
  className?: string;
  variant?: 'classic';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  indexNumber = 1,
  className = '',
}) => {
  const formattedRef = String(indexNumber).padStart(2, '0');
  const [selectedFinishId, setSelectedFinishId] = React.useState<string>(
    product.finishes[0]?.id ?? ''
  );

  const image =
    (selectedFinishId && product.imagesByFinish?.[selectedFinishId]) ||
    product.images[0] ||
    '/Luxury Brass and Black Cabinet Hardware.png';

  const productUrl = `/product/${product.slug}${selectedFinishId ? `?finish=${selectedFinishId}` : ''}`;

  // Fine-tune image vertical alignment so hardware is hero in the upper stage
  const imagePosition =
    product.slug === 'kyoto-minimalist-round-lever'
      ? 'object-[center_12%]'
      : 'object-[center_26%]';

  return (
    <article
      id={`product-${product.slug}`}
      className={`group relative flex flex-col justify-between h-[500px] sm:h-[520px] rounded-[14px] overflow-hidden border border-[#38332E]/60 bg-[#171513] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:border-[#B58A38]/50 ${className}`}
    >
      {/* 1. Full-Card Background Product Image */}
      <Link
        to={productUrl}
        className="absolute inset-0 w-full h-full block overflow-hidden bg-[#171513]"
        aria-label={`View ${product.name}`}
      >
        <img
          src={image}
          alt={product.name}
          loading="lazy"
          className={`w-full h-full object-cover ${imagePosition} group-hover:scale-105 transition-transform duration-700 ease-out`}
        />
      </Link>

      {/* 2. Top-Left Numbering ("02" in Poppins font) */}
      <div className="relative z-20 p-5 pointer-events-none">
        <span
          className="text-[14px] sm:text-[15px] font-normal tracking-wide select-none"
          style={{ color: 'rgba(245, 240, 232, 0.7)', fontFamily: "'Poppins', sans-serif" }}
        >
          {formattedRef}
        </span>
      </div>

      {/* 3. Continuous Warm Dark Espresso/Black Translucent Gradient Overlay */}
      <div
        className="relative z-10 mt-auto w-full pt-10 pb-6 px-6 flex flex-col justify-between overflow-hidden"
        style={{
          clipPath: 'polygon(0 0, 100% 50px, 100% 100%, 0 100%)',
          background:
            'linear-gradient(110deg, rgb(23 21 19 / 56%) 0%, rgb(29 25 22 / 63%) 42%, rgba(41, 32, 25, 0.82) 65%, rgba(41, 32, 25, 0.52) 100%), linear-gradient(rgba(23, 21, 19, 0.2) 0%, rgb(18 16 14 / 79%) 100%)',
        }}
      >
        {/* Content Inside Backdrop */}
        <div className="relative z-10 pt-1">
          {/* Category Tag: "DOOR HANDLES & KNOBS" in Poppins */}
          <span
            className="block text-[10.5px] uppercase tracking-[0.16em] font-medium mb-2 select-none"
            style={{ color: '#F5F0E8', fontFamily: "'Poppins', sans-serif" }}
          >
            {product.category}
          </span>

          {/* Product Title in Poppins font */}
          <Link to={`/product/${product.slug}`} className="block group/title">
            <h3
              className="text-[20px] sm:text-[22px] font-semibold leading-snug mb-2.5 transition-colors group-hover/title:!text-[#B58A38]"
              style={{
                color: '#F5F0E8',
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: '-0.01em',
              }}
            >
              {product.name}
            </h3>
          </Link>

          {/* Description in Poppins font */}
          <p
            className="text-[12.5px] sm:text-[13px] leading-relaxed max-w-[285px] line-clamp-2"
            style={{ color: '#C7BFB5', fontFamily: "'Poppins', sans-serif" }}
          >
            {product.shortDescription}
          </p>

          {/* Color / Finish Swatches: click to change image */}
          {product.finishes && product.finishes.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5 z-20" aria-label="Available finishes">
              {product.finishes.map((f) => {
                const isSelected = selectedFinishId === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-label={`Select ${f.name} color`}
                    title={f.name}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedFinishId(f.id);
                    }}
                    className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                      isSelected
                        ? 'ring-2 ring-[#FFC400] scale-125 border-white shadow-xs'
                        : 'border-white/30 hover:scale-110 opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: f.hex }}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Footer: Bottom-left "View specs →" & Bottom-right Circular Arrow Button with thin muted-gold outline */}
        <div className="relative z-10 pt-1 flex items-center justify-between mt-auto">
          <Link
            to={productUrl}
            className="inline-flex items-center gap-1.5 text-[13px] sm:text-[13.5px] font-medium transition-colors hover:!text-[#B58A38] group/link"
            style={{ color: '#F5F0E8', fontFamily: "'Poppins', sans-serif" }}
          >
            <span style={{ color: '#F5F0E8' }}>View specs</span>
            <ArrowRight
              size={14}
              weight="bold"
              className="group-hover/link:translate-x-1 transition-transform"
              style={{ color: '#F5F0E8' }}
            />
          </Link>

          <Link
            to={productUrl}
            className="w-11 h-11 rounded-full border border-[#B58A38] bg-[#171513]/60 hover:bg-[#B58A38]/20 flex items-center justify-center transition-all shadow-md group-hover:scale-105"
            aria-label={`View specs for ${product.name}`}
          >
            <ArrowRight size={16} weight="bold" style={{ color: '#F5F0E8' }} />
          </Link>
        </div>
      </div>
    </article>
  );
};
