import React from 'react';
import type { Product } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  columns?: 2 | 3 | 4;
  className?: string;
  variant?: 'tilt' | 'notched' | 'classic';
  surface?: string;
  onClearFilters?: () => void;
  editorial?: boolean;
  pageOffset?: number;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  emptyMessage = "No hardware items match the selected filter criteria.",
  className = "",
  onClearFilters,
  pageOffset = 0,
}) => {
  if (products.length === 0) {
    return (
      <div className="product-grid-empty text-center py-16 px-6 bg-white border border-stone-200/80 rounded-2xl my-8">
        <h4 className="font-serif text-2xl text-stone-900 mb-2">No products found</h4>
        <p className="text-stone-500 text-sm max-w-md mx-auto mb-6">
          {emptyMessage}
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-[#18181B] hover:bg-stone-800 text-stone-100 font-mono text-xs uppercase tracking-wider rounded-lg transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 ${className}`}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          indexNumber={pageOffset + index + 1}
        />
      ))}
    </div>
  );
};
