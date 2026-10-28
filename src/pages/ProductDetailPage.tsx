import React, { useMemo, useState, useEffect } from 'react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  CaretRight,
  Info,
  Sparkle,
} from '@phosphor-icons/react';
import { Meta } from '../components/common/Meta';
import { Container } from '../components/layout/Layout';
import { ProductGallery } from '../components/products/ProductGallery';
import { ProductCard } from '../components/products/ProductCard';
import { DEMO_PRODUCTS } from '../data/products';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const product = useMemo(() => DEMO_PRODUCTS.find((item) => item.slug === slug), [slug]);

  const finishParam = searchParams.get('finish');

  const [finishId, setFinishId] = useState(() => {
    if (finishParam && product?.finishes.some((f) => f.id === finishParam)) {
      return finishParam;
    }
    const picturedFinish = product?.finishes.find((item) => product.imagesByFinish?.[item.id]);
    return picturedFinish?.id ?? product?.finishes[0]?.id ?? '';
  });

  useEffect(() => {
    if (finishParam && product?.finishes.some((f) => f.id === finishParam)) {
      setFinishId(finishParam);
    }
  }, [finishParam, product]);

  const handleSelectFinish = (id: string) => {
    setFinishId(id);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('finish', id);
    setSearchParams(newParams, { replace: true });
  };

  if (!product) return <Navigate to="/products" replace />;

  const finish = product.finishes.find((item) => item.id === finishId) ?? product.finishes[0];
  const photo = finish ? product.imagesByFinish?.[finish.id] : product.images[0];
  const quoteHref = `/trade-desk?product=${encodeURIComponent(product.name)}&series=${encodeURIComponent(product.series)}${
    finish ? `&finish=${encodeURIComponent(finish.name)}` : ''
  }`;

  const defaultSpecs: Record<string, string> = {
    'Base Material': 'Forged Solid Brass / Stainless Steel',
    'Mounting Type': 'Concealed Fixing with M4 Through-Bolts',
    'Door Thickness': '35mm – 55mm Architectural Standard',
    'Spindle Size': '8mm x 8mm Hardened Solid Steel',
    'Finish Process': `${finish?.name ?? 'PVD Vacuum Coating'} & Hand Satin Finish`,
    'Testing Standard': 'EN 1906 Grade 4 / 200,000 Cycle Tested',
  };

  const displaySpecs =
    product.specs && Object.keys(product.specs).length > 0 ? product.specs : defaultSpecs;

  const related = useMemo(() => {
    const sameCat = DEMO_PRODUCTS.filter(
      (item) => item.categorySlug === product.categorySlug && item.id !== product.id
    );
    if (sameCat.length >= 4) return sameCat.slice(0, 4);
    const other = DEMO_PRODUCTS.filter(
      (item) => item.id !== product.id && !sameCat.some((s) => s.id === item.id)
    );
    return [...sameCat, ...other].slice(0, 4);
  }, [product]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#18181B]" style={{ fontFamily: '"Poppins", sans-serif' }}>
      <Meta
        title={`${product.name} — SIDDI Architectural Hardware`}
        description={`${product.name} product specifications, finishes, and technical CAD/BIM downloads.`}
        ogImage={photo}
      />

      <div className="w-full py-6 sm:py-8 lg:py-10">
        <Container className="px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-[1440px]">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#78716C] mb-6 sm:mb-8"
          >
            <Link to="/" className="hover:text-[#18181B] transition-colors">
              Home
            </Link>
            <CaretRight size={12} className="text-[#A8A29E]" />
            <Link to="/products" className="hover:text-[#18181B] transition-colors">
              Catalogue
            </Link>
            <CaretRight size={12} className="text-[#A8A29E]" />
            <Link to={`/products/${product.categorySlug}`} className="hover:text-[#18181B] transition-colors">
              {product.category}
            </Link>
            <CaretRight size={12} className="text-[#A8A29E]" />
            <span aria-current="page" className="text-[#AD8143] font-semibold truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </nav>

          {/* Main Product Showcase Layout: Gallery on left, Info & Finishes on right */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 xl:gap-12 items-start mb-10 sm:mb-14">
            {/* Left Column: Product Gallery - ample width on 1024px+ */}
            <div className="w-full lg:col-span-7 xl:col-span-7">
              <ProductGallery
                productName={product.name}
                finishes={product.finishes}
                imagesByFinish={product.imagesByFinish ?? {}}
                selectedFinishId={finish?.id ?? finishId}
                onSelectFinish={handleSelectFinish}
                photoNeeded={product.photoNeeded}
              />
            </div>

            {/* Right Column: Product Info & Actions */}
            <div className="w-full lg:col-span-5 xl:col-span-5 flex flex-col">
              {/* Category & Series Eyebrow */}
              <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#AD8143] font-semibold">
                  {product.series
                    ? product.series.toLowerCase().includes('series')
                    : product.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#D7D6D0]" />
                <span className="text-[11px] font-mono text-[#78716C]">Architectural Grade</span>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold text-[#18181B] tracking-tight leading-[1.15] mb-3 sm:mb-3.5">
                {product.name}
              </h1>

              {/* Product Short Description */}
              <p className="text-sm sm:text-base text-[#57534E] leading-relaxed font-normal mb-5 sm:mb-6">
                {product.shortDescription ||
                  `Engineered door furniture manufactured from solid forged brass for high-traffic architectural spaces.`}{' '}
                Confirm dimensions and specification requirements with our trade desk.
              </p>

              {/* Available Finishes Selector */}
              <div className="border-t border-[#E5E0D8] pt-4 sm:pt-5 mb-5 sm:mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xs font-mono uppercase tracking-wider text-[#78716C] font-semibold">
                    Available Finishes
                  </h2>
                  {finish && (
                    <span className="text-xs font-medium text-[#18181B]">
                      Selected:{' '}
                      <span className="font-semibold text-[#AD8143]">{finish.name}</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3" role="radiogroup" aria-label="Available finishes">
                  {product.finishes.map((item) => {
                    const isSelected = finish?.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        aria-label={item.name}
                        title={item.name}
                        onClick={() => handleSelectFinish(item.id)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all cursor-pointer flex items-center justify-center p-[2px] ${
                          isSelected
                            ? 'ring-2 ring-offset-2 ring-[#FFC400] scale-110'
                            : 'hover:scale-105 opacity-80 hover:opacity-100 ring-1 ring-black/10 hover:ring-black/30'
                        }`}
                      >
                        <span
                          className="w-full h-full rounded-full border border-black/20 shrink-0"
                          style={{ backgroundColor: item.hex }}
                        />
                      </button>
                    );
                  })}
                </div>

                {finish && !product.imagesByFinish?.[finish.id] && (
                  <p className="mt-2.5 text-xs text-[#78716C] italic flex items-center gap-1.5">
                    <Info size={14} className="text-[#AD8143] shrink-0" />
                    <span>A physical studio photograph for {finish.name} is being prepared.</span>
                  </p>
                )}
              </div>

              {/* Primary Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center lg:items-stretch xl:items-center gap-3 sm:gap-3.5">
                <Link
                  to={quoteHref}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-[#FFC400] hover:bg-[#E6B000] active:scale-[0.98] text-[#0B0B0C] font-bold text-xs sm:text-[13px] py-3.5 px-6 rounded-full shadow-[0_4px_18px_rgba(255,196,0,0.3)] hover:shadow-[0_6px_22px_rgba(255,196,0,0.45)] transition-all cursor-pointer text-center whitespace-nowrap"
                >
                  <span>Request a quote</span>
                  <ArrowRight size={15} weight="bold" />
                </Link>

                <Link
                  to="/resources"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F4F3EF] active:scale-[0.98] text-[#18181B] border border-[#D7D6D0] font-semibold text-xs sm:text-[13px] py-3.5 px-6 rounded-full transition-all cursor-pointer text-center whitespace-nowrap"
                >
                  <span>Download CAD & BIM</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Technical Specifications: 100% FULL WIDTH across all screen sizes */}
          <section className="w-full mb-12 sm:mb-16">
            <div className="border-t border-[#E5E0D8] pt-6 sm:pt-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkle size={15} weight="fill" className="text-[#AD8143]" />
                <h2 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#78716C] font-semibold">
                  Technical Specifications
                </h2>
              </div>

              <div className="w-full rounded-2xl border border-[#E5E0D8] bg-white divide-y divide-[#E5E0D8] overflow-hidden shadow-xs">
                {Object.entries(displaySpecs).map(([key, value]) => (
                  <div key={key} className="px-5 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
                    <span className="text-[#78716C] font-medium shrink-0">{key}</span>
                    <span className="text-[#18181B] font-semibold text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Products Section */}
          {related.length > 0 && (
            <section className="mt-16 sm:mt-20 lg:mt-24 pt-10 sm:pt-14 border-t border-[#E5E0D8]" aria-labelledby="related-title">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#AD8143] font-semibold block mb-2">
                    Complete The Specification
                  </span>
                  <h2 id="related-title" className="text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight">
                    Related Hardware
                  </h2>
                </div>
                <Link
                  to={`/products/${product.categorySlug}`}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#18181B] hover:text-[#AD8143] transition-colors group"
                >
                  <span>View all {product.category}</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Grid: 1 col on xs mobile, 2 cols on mobile/tablet/1024px, 4 cols on wide desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
                {related.map((item, index) => (
                  <ProductCard key={item.id} product={item} indexNumber={index + 1} />
                ))}
              </div>
            </section>
          )}
        </Container>
      </div>
    </div>
  );
};

export default ProductDetailPage;
