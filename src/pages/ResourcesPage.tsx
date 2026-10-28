import React from 'react';
import { Link } from 'react-router-dom';
import { Meta } from '../components/common/Meta';
import { Container } from '../components/layout/Layout';
import { ApplicationsScrollShowcase } from '../components/resources/ApplicationsScrollShowcase';

export const ResourcesPage: React.FC = () => (
  <div className="resources-page min-h-screen bg-[#F4F3EF] text-[#171719]">
    <Meta title="Resources — SIDDI Architectural Hardware" description="Find product information and request current technical documents from SIDDI." />
    
    {/* Hero Section */}
    <section className="relative w-full overflow-hidden bg-[#F6F2EC] border-b border-[#E7E2DA]">
      {/* Desktop Layout (xl+) */}
      <div className="hidden xl:flex relative w-full min-h-[460px] 2xl:min-h-[490px] items-center">
        {/* Background Architectural Photography */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <img
            src="/Warm Architectural Hardware Studio Still Life.png"
            alt="Architectural hardware studio display with brass lever on travertine and technical drawings"
            className="w-full h-full object-cover object-right"
          />
          {/* Soft natural gradient blend into the light left side for clean text readability */}
          <div className="absolute inset-y-0 left-0 w-[48%] bg-gradient-to-r from-[#F6F2EC] via-[#F6F2EC]/50 to-transparent" />
        </div>

        {/* Content Container (Desktop) */}
        <Container className="relative z-10 py-10 2xl:py-12">
          <div className="w-[48%]">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase">
              <Link to="/" className="text-[#64748B] hover:text-[#18181B] transition-colors">
                HOME
              </Link>
              <span className="text-[#94A3B8] text-[10px] font-normal">&gt;</span>
              <span className="text-[#F5B900]" aria-current="page">
                RESOURCES
              </span>
            </nav>

            {/* Heading */}
            <h1 className="text-[50px] 2xl:text-[56px] font-bold text-[#18181B] tracking-tight leading-[1.06] font-sans">
              Product information<br />
              and project documents.
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-[650px] text-[17px] 2xl:text-[18px] leading-[1.55] text-[#57534E] font-normal font-sans">
              Use the catalogue to explore products. For technical files, ask the trade desk for the latest document for your selected product.
            </p>
          </div>
        </Container>
      </div>

      {/* Mobile, Tablet & Medium Laptop Stacked Layout (< xl) */}
      <div className="xl:hidden flex flex-col w-full">
        {/* Top Text Content */}
        <Container className="pt-8 sm:pt-10 pb-5 sm:pb-6 bg-[#F6F2EC]">
          <div className="max-w-2xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-3 sm:mb-4 flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase">
              <Link to="/" className="text-[#64748B] hover:text-[#18181B] transition-colors">
                HOME
              </Link>
              <span className="text-[#94A3B8] text-[10px] font-normal">&gt;</span>
              <span className="text-[#F5B900]" aria-current="page">
                RESOURCES
              </span>
            </nav>

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#18181B] tracking-tight leading-[1.1] font-sans">
              Product information<br className="hidden sm:inline" />
              {' '}and project documents.
            </h1>

            {/* Description */}
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#57534E] font-normal font-sans">
              Use the catalogue to explore products. For technical files, ask the trade desk for the latest document for your selected product.
            </p>
          </div>
        </Container>

        {/* Repositioned Architectural Hardware Display (brass lever on travertine plinth) */}
        <div className="relative w-full h-[180px] sm:h-[220px] md:h-[260px] bg-[#F6F2EC] overflow-hidden">
          <img
            src="/Warm Architectural Hardware Studio Still Life.png"
            alt="Brass knurled lever on travertine plinth with technical drawings"
            className="w-full h-full object-cover object-[78%_center]"
          />
          {/* Soft top gradient blend for a continuous, seamless transition */}
          <div className="absolute inset-x-0 top-0 h-12 sm:h-14 bg-gradient-to-b from-[#F6F2EC] to-transparent" />
        </div>
      </div>
    </section>

    {/* Applications Scroll Showcase Section */}
    <ApplicationsScrollShowcase />
  </div>
);
