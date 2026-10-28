import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowSquareOut,
  Compass,
  FileArrowDown,
  House,
  ShieldCheck,
  Sparkle,
} from '@phosphor-icons/react';
import { Meta } from '../components/common/Meta';
import { Container } from '../components/layout/Layout';
import { DoorLever } from '../components/common/DoorLever';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#18181B]" style={{ fontFamily: '"Poppins", sans-serif' }}>
      <Meta
        title="404 — Specification Not Found | SIDDI"
        description="The requested hardware specification, drawing, or page could not be located. Browse the SIDDI architectural catalogue."
      />

      {/* 1. ARCHITECTURAL 404 HERO STAGE */}
      <section className="relative w-full bg-[#F6F2EC] border-b border-[#E7E2DA] py-16 sm:py-20 lg:py-28 overflow-hidden">
        {/* Subtle Background Watermark '404' */}
        <div
          aria-hidden="true"
          className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 font-mono font-black text-[140px] sm:text-[220px] lg:text-[320px] select-none pointer-events-none text-[#18181B]/[0.035] leading-none tracking-tighter"
        >
          404
        </div>

        <Container className="relative z-10">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#78716C] mb-6 sm:mb-8"
          >
            <Link to="/" className="hover:text-[#18181B] transition-colors flex items-center gap-1.5">
              <House size={14} />
              <span>Home</span>
            </Link>
            <span className="text-[#A8A29E]">/</span>
            <span className="text-[#18181B] font-medium" aria-current="page">
              404 Specification Missing
            </span>
          </nav>

          <div className="max-w-2xl">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E0D8] text-[11px] font-mono uppercase tracking-wider text-[#946B00] font-semibold mb-4 shadow-xs">
              <Compass size={14} weight="fill" className="text-[#946B00]" />
              Status: Reference Not Located
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18181B] tracking-tight leading-[1.12]">
              Specification not found<span className="text-[#946B00]">.</span>
            </h1>

            {/* Description */}
            <p className="mt-4 text-base sm:text-lg text-[#57534E] leading-relaxed font-normal">
              The requested CAD drawing, product model, finish specification, or door schedule link is not indexed on our foundry servers or has been re-catalogued.
            </p>

            {/* Dual Action CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                to="/products"
                style={{ color: '#000000' }}
                className="inline-flex items-center justify-center gap-2.5 rounded-full py-3.5 px-7 font-bold text-xs sm:text-sm text-[#0B0B0C] !text-black bg-[#FFC400] hover:bg-[#E6B000] active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(255,196,0,0.3)] cursor-pointer group"
              >
                <span style={{ color: '#000000' }} className="!text-black">Browse architectural catalogue</span>
                <DoorLever size={18} className="shrink-0 !text-black" style={{ color: '#000000' }} />
              </Link>

              <Link
                to="/trade-desk"
                className="inline-flex items-center justify-center gap-2 rounded-full py-3.5 px-6 font-semibold text-xs sm:text-sm text-[#18181B] bg-white hover:bg-[#F4F3EF] border border-[#E5E0D8] active:scale-[0.98] transition-all shadow-xs cursor-pointer"
              >
                <span>Contact trade desk</span>
                <ArrowSquareOut size={15} weight="bold" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. CORE ARCHITECTURAL DIRECTORIES */}
      <section className="w-full py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#946B00] font-semibold mb-2">
                Foundry Directory
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight">
                Explore core hardware departments<span className="text-[#946B00]">.</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#78716C] max-w-md">
              Locate physical products, 3D CAD/BIM specifications, or submit schedules for immediate estimator review.
            </p>
          </div>

          {/* 3 Directory Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 01: Product Catalogue */}
            <Link
              to="/products"
              className="group bg-white rounded-[24px] border border-[#E5E0D8] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#AD8143] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#78716C] mb-4">
                  <span className="font-semibold text-[#AD8143]">01 / CATALOGUE</span>
                  <Sparkle size={18} weight="fill" className="text-[#AD8143] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#18181B] group-hover:text-[#946B00] transition-colors mb-2">
                  Door Levers & Mortise
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  Solid forged brass lever handles, knurled textures, concealed fixing roses, and architectural pull handles.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#EAE6DE] flex items-center justify-between text-xs font-semibold text-[#18181B] group-hover:text-[#AD8143] transition-colors">
                <span>View products</span>
                <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Card 02: Resources & CAD/BIM */}
            <Link
              to="/resources"
              className="group bg-white rounded-[24px] border border-[#E5E0D8] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#AD8143] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#78716C] mb-4">
                  <span className="font-semibold text-[#AD8143]">02 / SPECIFICATIONS</span>
                  <FileArrowDown size={18} weight="bold" className="text-[#AD8143] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#18181B] group-hover:text-[#946B00] transition-colors mb-2">
                  CAD, BIM & Cut Sheets
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  Download engineering drawings (DWG/DXF), 3D Revit architectural families, and dimensioned cut sheets.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#EAE6DE] flex items-center justify-between text-xs font-semibold text-[#18181B] group-hover:text-[#AD8143] transition-colors">
                <span>Access resources</span>
                <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Card 03: Trade Desk */}
            <Link
              to="/trade-desk"
              className="group bg-white rounded-[24px] border border-[#E5E0D8] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#AD8143] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#78716C] mb-4">
                  <span className="font-semibold text-[#AD8143]">03 / TRADE DESK</span>
                  <ShieldCheck size={18} weight="fill" className="text-[#AD8143] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#18181B] group-hover:text-[#946B00] transition-colors mb-2">
                  Door Takeoffs & Samples
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  Send your door schedule for tender takeoffs, or request custom finish sample boxes delivered to your firm.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#EAE6DE] flex items-center justify-between text-xs font-semibold text-[#18181B] group-hover:text-[#AD8143] transition-colors">
                <span>Send schedule</span>
                <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>

          {/* Technical Diagnostics Bar */}
          <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-[#F6F2EC] border border-[#E5E0D8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-[#78716C]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EAB308]" />
              <span>ROUTING EXCEPTION: STATUS_CODE_404</span>
            </div>
            <div>LOCATION: RAJKOT FOUNDRY WEB CLUSTER</div>
            <Link to="/" className="text-[#18181B] font-semibold hover:text-[#AD8143] transition-colors">
              Return to SIDDI Homepage &rarr;
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
};
export default NotFoundPage;
