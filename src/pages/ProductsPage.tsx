import React, { useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductGrid } from '../components/products/ProductGrid';
import { CATEGORIES } from '../data/categories';
import { DEMO_PRODUCTS } from '../data/products';
import { Meta } from '../components/common/Meta';
import { Container } from '../components/layout/Layout';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

const ITEMS_PER_PAGE = 9;

export const ProductsPage: React.FC = () => {
  const { category: routeCategory } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const gridTopRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categoryParam = searchParams.get('category');
  const finishParam = searchParams.get('finish');
  const seriesParam = searchParams.get('series');
  const queryParam = searchParams.get('q') ?? '';
  const sortParam = searchParams.get('sort') ?? 'featured';
  const pageParam = parseInt(searchParams.get('page') ?? '1', 10);
  const activePage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  const activeCategory = CATEGORIES.find((category) => category.slug === routeCategory);

  const selectedCategories = useMemo(() => {
    if (categoryParam) return categoryParam.split(',').filter(Boolean);
    if (routeCategory) return [routeCategory];
    return [];
  }, [categoryParam, routeCategory]);

  const selectedFinishes = useMemo(() => {
    return finishParam?.split(',').filter(Boolean) ?? [];
  }, [finishParam]);

  const selectedSeries = useMemo(() => {
    return seriesParam?.split(',').filter(Boolean) ?? [];
  }, [seriesParam]);

  const searchQuery = queryParam;
  const sortBy = sortParam;

  const updateParams = (changes: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    if (!('page' in changes)) {
      params.delete('page');
    }
    setSearchParams(params, { replace: true });
  };

  const handleCategoriesChange = (values: string[]) => {
    if (routeCategory) {
      const params = new URLSearchParams(searchParams);
      if (values.length) params.set('category', values.join(','));
      else params.delete('category');
      params.delete('page');
      navigate(`/products${params.size ? `?${params.toString()}` : ''}`);
      return;
    }
    updateParams({ category: values.length ? values.join(',') : null });
  };

  const handleFinishesChange = (values: string[]) => {
    updateParams({ finish: values.length ? values.join(',') : null });
  };

  const handleSeriesChange = (values: string[]) => {
    updateParams({ series: values.length ? values.join(',') : null });
  };

  const handleSearchChange = (value: string) => {
    updateParams({ q: value.trim() ? value : null });
  };

  const handleSortChange = (value: string) => {
    updateParams({ sort: value === 'featured' ? null : value });
  };

  const handleReset = () => {
    navigate('/products');
  };

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const result = DEMO_PRODUCTS.filter((product) => {
      if (selectedCategories.length && !selectedCategories.includes(product.categorySlug)) return false;
      if (selectedFinishes.length && !product.finishes.some((finish) => selectedFinishes.includes(finish.id))) return false;
      if (selectedSeries.length && !selectedSeries.includes(product.series)) return false;
      if (!query) return true;
      const searchable = [
        product.name,
        product.series,
        product.category,
        product.shortDescription,
        ...product.finishes.map((finish) => finish.name),
      ];
      return searchable.some((value) => value.toLowerCase().includes(query));
    });

    return result.sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'series') return a.series.localeCompare(b.series);
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [searchQuery, selectedCategories, selectedFinishes, selectedSeries, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(activePage, totalPages);
  const pageOffset = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(pageOffset, pageOffset + ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    updateParams({ page: newPage === 1 ? null : String(newPage) });
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Generate dynamic page list with windowing
  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | string)[] = [];
    if (currentPage <= 3) {
      pages.push(1, 2, 3, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage, '...', totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);

  const title = activeCategory?.title ?? 'Catalogue';
  const metaTitle = activeCategory ? `${title} — SIDDI Catalogue` : 'Catalogue — SIDDI';

  return (
    <div className="catalogue-page min-h-screen bg-[#FAF8F5] text-[#18181B]">
      <Meta
        title={metaTitle}
        description={
          activeCategory
            ? `Browse SIDDI ${title.toLowerCase()} specifications.`
            : 'Browse architectural hardware by category, finish or series.'
        }
      />

      {/* Large Catalogue Hero with responsive layout & smooth light gradient overlay */}
      <section className="relative bg-[#FAF8F5] border-b border-[#E7E5DF] pt-24 sm:pt-28 md:pt-36 pb-12 sm:pb-14 md:pb-16 overflow-hidden">
        {/* Hero Architectural Photography */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-[46%] lg:w-[44%] pointer-events-none select-none overflow-hidden">
          <img
            src="/Knurled Brass Lever on Walnut Door.png"
            alt="SIDDI Architectural Door Hardware"
            className="w-full h-full object-cover object-[center_35%]"
          />
          {/* Mobile: Smooth light gradient overlay across photo for maximum elegance & readability */}
          <div
            className="absolute inset-0 md:hidden pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(250, 248, 245, 0.94) 0%, rgba(250, 248, 245, 0.86) 38%, rgba(250, 248, 245, 0.52) 72%, rgba(250, 248, 245, 0.24) 100%)',
            }}
          />
          {/* Desktop: Gentle feather on the left edge only */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-24 lg:w-32 bg-gradient-to-r from-[#FAF8F5] to-transparent pointer-events-none" />
        </div>

        {/* Hero Content Container */}
        <Container className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left Title and Breadcrumbs */}
          <div className="max-w-md sm:max-w-lg lg:max-w-xl">
            <nav className="flex items-center gap-2 text-xs text-stone-500 mb-3 sm:mb-5 font-sans" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-stone-800 transition-colors">Home</Link>
              <span className="text-stone-400" aria-hidden="true">/</span>
              {activeCategory ? (
                <>
                  <Link to="/products" className="hover:text-stone-800 transition-colors">Catalogue</Link>
                  <span className="text-stone-400" aria-hidden="true">/</span>
                  <span className="text-stone-800 font-medium" aria-current="page">{activeCategory.title}</span>
                </>
              ) : (
                <span className="text-stone-800 font-medium" aria-current="page">Catalogue</span>
              )}
            </nav>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#18181B] font-normal tracking-tight mb-2 sm:mb-2.5">
              {title}
            </h1>

            <p className="text-stone-600 text-xs sm:text-sm md:text-base font-sans max-w-sm sm:max-w-md">
              Browse architectural hardware by category, finish or series.
            </p>
          </div>

          {/* Right Edge Editorial Marker (visible on tablet & desktop) */}
          <div className="hidden md:flex flex-col items-end pr-4 text-right">
            <div className="font-mono text-[9.5px] tracking-[0.25em] text-[#78716C] uppercase leading-relaxed font-medium">
              <div>HARDWARE</div>
              <div>FOR</div>
              <div>CONSIDERED</div>
              <div>SPACES</div>
            </div>
            <div className="w-6 h-[1px] bg-[#78716C]/60 mt-2" />
          </div>
        </Container>
      </section>

      {/* Main Listing Section */}
      <Container className="pb-16 sm:pb-24">
        <div ref={gridTopRef} id="catalogue-grid" className="pt-20" />

        {/* Filter Panel */}
        <ProductFilters
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedCategories={selectedCategories}
          onCategoriesChange={handleCategoriesChange}
          selectedFinishes={selectedFinishes}
          onFinishesChange={handleFinishesChange}
          selectedSeries={selectedSeries}
          onSeriesChange={handleSeriesChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          totalCount={DEMO_PRODUCTS.length}
          filteredCount={filteredProducts.length}
          onResetAll={handleReset}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* 3x3 Product Cards Grid (9 products per page) */}
        <ProductGrid
          products={paginatedProducts}
          editorial={true}
          pageOffset={pageOffset}
          emptyMessage="No hardware items match the selected filter criteria. Clear search or reset filters to browse all specifications."
          onClearFilters={handleReset}
        />

        {/* Dynamic Pagination: Centered, never cut off, responsive for all screens */}
        {totalPages > 1 && (
          <nav
            className="pt-12 sm:pt-16 pb-6 flex items-center justify-center gap-1.5 sm:gap-2"
            aria-label="Catalogue pagination"
          >
            {/* Previous page arrow */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-[#E2DFD7] bg-white flex items-center justify-center text-stone-700 hover:bg-stone-50 disabled:opacity-35 disabled:cursor-not-allowed transition-all shadow-2xs"
              aria-label="Previous page"
            >
              <CaretLeft size={14} weight="bold" />
            </button>

            {/* Dynamic Page Numbers */}
            {pageNumbers.map((item, index) => {
              if (typeof item === 'string') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-stone-400 font-sans text-xs select-none"
                  >
                    ...
                  </span>
                );
              }

              const isActive = currentPage === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handlePageChange(item)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-sans text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#18181B] text-white shadow-sm'
                      : 'bg-white border border-[#E2DFD7] text-stone-700 hover:bg-stone-100'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item}
                </button>
              );
            })}

            {/* Next page arrow */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-[#E2DFD7] bg-white flex items-center justify-center text-stone-700 hover:bg-stone-50 disabled:opacity-35 disabled:cursor-not-allowed transition-all shadow-2xs"
              aria-label="Next page"
            >
              <CaretRight size={14} weight="bold" />
            </button>
          </nav>
        )}
      </Container>
    </div>
  );
};
