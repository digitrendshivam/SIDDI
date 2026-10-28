import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowSquareOut,
  Buildings,
  CheckCircle,
  FileText,
  LockKey,
  MapPin,
  ShieldCheck,
} from '@phosphor-icons/react';
import { Meta } from '../components/common/Meta';
import { Container } from '../components/layout/Layout';
import { DoorLever } from '../components/common/DoorLever';

const SECTIONS = [
  { id: 'collection', number: '01', title: 'Information We Collect from Trades' },
  { id: 'utilization', number: '02', title: 'Purpose & Use of Tender Materials' },
  { id: 'confidentiality', number: '03', title: 'Data Security & Confidentiality' },
  { id: 'cookies', number: '04', title: 'Minimal Cookies & Web Governance' },
  { id: 'rights', number: '05', title: 'Data Rights & Record Deletion' },
  { id: 'nda', number: '06', title: 'Project-Specific NDAs' },
];

export const PrivacyPage: React.FC = () => {
  const [activeNav, setActiveNav] = useState('collection');

  const scrollToSection = (id: string) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#18181B]" style={{ fontFamily: '"Poppins", sans-serif' }}>
      <Meta
        title="Privacy Policy & Data Governance — SIDDI Architectural Hardware"
        description="Data governance and client privacy policies for architectural trade enquiries, door schedule submissions, and sample requests."
      />

      {/* 1. ARCHITECTURAL HERO SECTION */}
      <section className="relative w-full bg-[#F6F2EC] border-b border-[#E7E2DA] py-12 sm:py-16 lg:py-20">
        <Container>
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#78716C] mb-4 sm:mb-6"
          >
            <Link to="/" className="hover:text-[#18181B] transition-colors">
              Home
            </Link>
            <span className="text-[#A8A29E]">/</span>
            <span className="text-[#18181B] font-medium" aria-current="page">
              Privacy Policy & Governance
            </span>
          </nav>

          <div className="max-w-3xl">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E0D8] text-[11px] font-mono uppercase tracking-wider text-[#946B00] font-semibold mb-4 shadow-xs">
              <ShieldCheck size={15} weight="fill" className="text-[#946B00]" />
              Trade Governance & Data Stewardship
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18181B] tracking-tight leading-[1.12]">
              Privacy & data handling<span className="text-[#946B00]">.</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-base sm:text-lg text-[#57534E] leading-relaxed font-normal">
              How SIDDI protects architectural drawings, door schedules, trade inquiries, and client information across our foundry and digital desks.
            </p>
          </div>

          {/* Trust Pillars Bar */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-[#E5E0D8]">
            <div className="bg-white rounded-xl border border-[#E5E0D8] p-4 flex items-start gap-3 shadow-xs">
              <LockKey size={20} weight="fill" className="text-[#946B00] shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#18181B]">100% Confidential</h2>
                <p className="text-xs text-[#78716C] mt-0.5">Tender drawings & door schedules strictly safeguarded.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E5E0D8] p-4 flex items-start gap-3 shadow-xs">
              <ShieldCheck size={20} weight="fill" className="text-[#946B00] shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#18181B]">Zero Third-Party Sale</h2>
                <p className="text-xs text-[#78716C] mt-0.5">We never sell, rent, or distribute trade contact data.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E5E0D8] p-4 flex items-start gap-3 shadow-xs">
              <CheckCircle size={20} weight="fill" className="text-[#946B00] shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#18181B]">Encrypted Transit</h2>
                <p className="text-xs text-[#78716C] mt-0.5">TLS transport-layer encryption across all submissions.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. MAIN POLICY CONTENT & ASIDE NAVIGATION */}
      <section className="w-full py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Comprehensive Policy Articles (8 cols) */}
            <div className="lg:col-span-8 space-y-8 sm:space-y-10">
              {/* Disclosure Notice Card */}
              <div className="p-5 sm:p-6 bg-[#FAF6EE] border border-[#E8DFC9] rounded-2xl flex items-start gap-4">
                <FileText size={22} weight="bold" className="text-[#AD8143] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-[#785E2F] leading-relaxed">
                  <span className="font-bold uppercase tracking-wider text-[#5C451D] block mb-1 font-mono text-xs">
                    Architectural Trade Notice
                  </span>
                  This privacy governance statement outlines how Siddhi Metal Industries (&ldquo;SIDDI&rdquo;) processes commercial and technical information received from architects, interior designers, quantity surveyors, contractors, and trade dealers.
                </div>
              </div>

              {/* Section 01 */}
              <article id="collection" className="scroll-mt-28 bg-white rounded-[24px] sm:rounded-[28px] border border-[#E5E0D8] p-6 sm:p-9 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#946B00] font-semibold">
                  <span>01</span>
                  <span>/</span>
                  <span>Collection Protocol</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#18181B] tracking-tight">
                  Information We Collect from Trades
                </h2>
                <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                  When you engage with our technical sales desk, upload a door schedule, request physical sample boxes, or download CAD/BIM specifications, we may collect professional identification and project data, including:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#57534E] pl-1">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AD8143] shrink-0 mt-2" />
                    <span><strong>Professional Identification:</strong> Full name, architectural firm/practice name, official email address, phone number, and delivery address.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AD8143] shrink-0 mt-2" />
                    <span><strong>Project Documentation:</strong> Door schedules (PDF, XLSX, DWG), door thickness specifications, floor-wise hardware quantities, and finish finish preferences.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AD8143] shrink-0 mt-2" />
                    <span><strong>Technical Inquiries:</strong> Joinery dimensions, mortise backset dimensions, custom CNC knurling preferences, and PVD finish testing requests.</span>
                  </li>
                </ul>
              </article>

              {/* Section 02 */}
              <article id="utilization" className="scroll-mt-28 bg-white rounded-[24px] sm:rounded-[28px] border border-[#E5E0D8] p-6 sm:p-9 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#946B00] font-semibold">
                  <span>02</span>
                  <span>/</span>
                  <span>Use of Materials</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#18181B] tracking-tight">
                  Purpose & Use of Tender Materials
                </h2>
                <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                  Every document submitted to SIDDI is treated as sensitive project property. We utilize your project data exclusively for the following trade purposes:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE6DE]">
                    <div className="text-xs font-mono font-bold text-[#18181B] uppercase mb-1">Schedule Takeoffs</div>
                    <p className="text-xs text-[#57534E] leading-relaxed">Preparing structured line-item door takeoff estimates and bill-of-quantities for tender review.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE6DE]">
                    <div className="text-xs font-mono font-bold text-[#18181B] uppercase mb-1">Sample Dispatch</div>
                    <p className="text-xs text-[#57534E] leading-relaxed">Curating and shipping requested physical sample boxes, metal swatches, and tactile finish chips.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE6DE]">
                    <div className="text-xs font-mono font-bold text-[#18181B] uppercase mb-1">Milling Feasibility</div>
                    <p className="text-xs text-[#57534E] leading-relaxed">Reviewing spindle sizes, escutcheon clearances, and lock body compatibility with our engineering team.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE6DE]">
                    <div className="text-xs font-mono font-bold text-[#18181B] uppercase mb-1">Supply Coordination</div>
                    <p className="text-xs text-[#57534E] leading-relaxed">Coordinating batch production schedules, custom PVD chamber runs, and delivery timelines.</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#78716C] pt-2">
                  SIDDI does not sell, license, or distribute your practice contact or tender information to external lead brokers or marketing aggregators.
                </p>
              </article>

              {/* Section 03 */}
              <article id="confidentiality" className="scroll-mt-28 bg-white rounded-[24px] sm:rounded-[28px] border border-[#E5E0D8] p-6 sm:p-9 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#946B00] font-semibold">
                  <span>03</span>
                  <span>/</span>
                  <span>Confidentiality & Security</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#18181B] tracking-tight">
                  Data Security & Confidentiality
                </h2>
                <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                  We recognize that architectural door schedules frequently reflect proprietary floor plans and unreleased commercial designs. We protect this information using strict technical safeguards:
                </p>
                <div className="space-y-3 pt-1">
                  <div className="flex items-start gap-3">
                    <CheckCircle size={18} weight="fill" className="text-[#946B00] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-[#57534E]">
                      <strong>End-to-End Transport Security:</strong> All file transfers, quote requests, and sample submissions utilize TLS 1.3 protocol encryption.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={18} weight="fill" className="text-[#946B00] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-[#57534E]">
                      <strong>Restricted Staff Access:</strong> Only appointed technical estimators and foundry project managers have access to client schedule files.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={18} weight="fill" className="text-[#946B00] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-[#57534E]">
                      <strong>Secure File Storage:</strong> Files are stored in ISO 27001-certified infrastructure with automated purging options for non-awarded tenders.
                    </p>
                  </div>
                </div>
              </article>

              {/* Section 04 */}
              <article id="cookies" className="scroll-mt-28 bg-white rounded-[24px] sm:rounded-[28px] border border-[#E5E0D8] p-6 sm:p-9 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#946B00] font-semibold">
                  <span>04</span>
                  <span>/</span>
                  <span>Cookies & Digital Footprint</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#18181B] tracking-tight">
                  Minimal Cookies & Web Governance
                </h2>
                <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                  Our digital platform operates with privacy-by-design principles:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#57534E] pl-1">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AD8143] shrink-0 mt-2" />
                    <span><strong>Functional Cookies Only:</strong> Used solely to preserve filter states in the product catalogue, finish selector preferences, and smooth scrolling.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AD8143] shrink-0 mt-2" />
                    <span><strong>No Cross-Site Ad Trackers:</strong> We do not inject invasive advertising pixels (e.g., third-party retargeting spiders) that follow you across the web.</span>
                  </li>
                </ul>
              </article>

              {/* Section 05 */}
              <article id="rights" className="scroll-mt-28 bg-white rounded-[24px] sm:rounded-[28px] border border-[#E5E0D8] p-6 sm:p-9 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#946B00] font-semibold">
                  <span>05</span>
                  <span>/</span>
                  <span>Data Rights</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#18181B] tracking-tight">
                  Data Rights & Record Deletion
                </h2>
                <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                  At any point during or following an architectural consultation, you retain complete rights regarding your submitted documentation:
                </p>
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE6DE] space-y-2 text-xs sm:text-sm text-[#57534E]">
                  <p><strong>Right to Inspection:</strong> Request a full archive copy of all door schedules and communication records associated with your practice.</p>
                  <p><strong>Right to Modification:</strong> Update contact personnel, shipping hubs, or practice tax identification numbers.</p>
                  <p><strong>Right to Erasure:</strong> Instruct our team to permanently delete uploaded tender packages and project files once procurement concludes.</p>
                </div>
              </article>

              {/* Section 06 */}
              <article id="nda" className="scroll-mt-28 bg-white rounded-[24px] sm:rounded-[28px] border border-[#E5E0D8] p-6 sm:p-9 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#946B00] font-semibold">
                  <span>06</span>
                  <span>/</span>
                  <span>Legal Agreements</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#18181B] tracking-tight">
                  Project-Specific Non-Disclosure Agreements (NDA)
                </h2>
                <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                  For major institutional, hospitality, or high-security residential developments requiring formal non-disclosure execution, our legal team provides mutual NDA execution prior to drawing exchange.
                </p>
                <div className="pt-2">
                  <Link
                    to="/trade-desk?type=contract-supply"
                    className="inline-flex items-center gap-2 font-semibold text-xs sm:text-sm text-[#18181B] hover:text-[#AD8143] transition-colors"
                  >
                    <span>Request an executed trade NDA with your tender submission</span>
                    <ArrowRight size={15} weight="bold" />
                  </Link>
                </div>
              </article>

              {/* Document Metadata Footer */}
              <div className="p-5 rounded-2xl bg-white border border-[#E5E0D8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-[#78716C]">
                <div>
                  <span className="font-semibold text-[#18181B]">DOC ID:</span> SIDDI-PRIV-2026-V2.4
                </div>
                <div>
                  <span className="font-semibold text-[#18181B]">JURISDICTION:</span> RAJKOT · GUJARAT, INDIA
                </div>
                <div>
                  <span className="font-semibold text-[#18181B]">REVISED:</span> OCT 2026
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Navigation & Desk Contacts (4 cols) */}
            <aside className="lg:col-span-4 sticky lg:top-24 space-y-5">
              {/* Card 1: Quick Jump Navigation */}
              <div className="rounded-[24px] bg-white border border-[#E5E0D8] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <div className="text-xs font-mono uppercase tracking-wider text-[#78716C] font-semibold mb-3">
                  Document Index
                </div>
                <nav className="space-y-1.5" aria-label="Privacy sections">
                  {SECTIONS.map((sec) => (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                        activeNav === sec.id
                          ? 'bg-[#FAF6EE] text-[#946B00] font-semibold'
                          : 'text-[#57534E] hover:bg-[#FAF8F5] hover:text-[#18181B]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-[10px] opacity-70">{sec.number}</span>
                        <span>{sec.title}</span>
                      </span>
                      <ArrowRight size={13} weight="bold" className="shrink-0" />
                    </button>
                  ))}
                </nav>
              </div>

              {/* Card 2: Privacy Officer & Foundry Desk */}
              <div className="rounded-[24px] bg-white border border-[#E5E0D8] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-3.5">
                <div className="text-xs font-mono uppercase tracking-wider text-[#78716C] font-semibold">
                  Privacy Officer Desk
                </div>

                <div>
                  <div className="text-xs text-[#78716C] font-medium">Corporate Entity</div>
                  <div className="text-sm font-bold text-[#18181B]">Siddhi Metal Industries</div>
                </div>

                <div className="border-t border-[#EAE6DE]" />

                <div>
                  <div className="text-xs text-[#78716C] font-medium">Foundry & Works</div>
                  <div className="text-xs text-[#57534E] mt-0.5 leading-relaxed flex items-start gap-1.5">
                    <MapPin size={15} weight="fill" className="text-[#946B00] shrink-0 mt-0.5" />
                    <span>80 Feet Road, Nr. Sai Baba Circle, Gondal Rd, Kotharia, Rajkot 360022</span>
                  </div>
                </div>

                <div className="border-t border-[#EAE6DE]" />

                <div>
                  <div className="text-xs text-[#78716C] font-medium">Data Governance Inquiries</div>
                  <a
                    href="mailto:info@siddimetal.com"
                    className="text-xs font-bold text-[#946B00] hover:underline block mt-0.5"
                  >
                    info@siddimetal.com
                  </a>
                </div>

                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full py-2.5 px-4 text-xs font-semibold text-[#18181B] bg-[#F4F3EF] hover:bg-[#EAE8E2] transition-colors"
                  >
                    <span>Contact trade desk</span>
                    <ArrowSquareOut size={14} weight="bold" />
                  </Link>
                </div>
              </div>

              {/* Card 3: Ready to submit a schedule? */}
              <div className="rounded-[24px] bg-[#0B0B0C] text-white p-5 sm:p-6 shadow-md relative overflow-hidden">
                <div className="relative z-10 space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-mono tracking-wider uppercase text-[#FFC400]">
                    <Buildings size={13} weight="fill" />
                    Tender Takeoffs
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Have a confidential project schedule?
                  </h3>
                  <p className="text-xs text-[#A8A29E] leading-relaxed">
                    Upload your schedule through our encrypted takeoff desk for confidential pricing.
                  </p>
                  <Link
                    to="/trade-desk?type=door-takeoff"
                    style={{ color: '#000000' }}
                    className="inline-flex items-center gap-2 rounded-full py-2.5 px-5 text-xs font-bold text-[#0B0B0C] !text-black bg-[#FFC400] hover:bg-[#E6B000] transition-colors mt-1 group"
                  >
                    <span style={{ color: '#000000' }} className="!text-black">Upload door schedule</span>
                    <DoorLever size={16} className="shrink-0 !text-black" style={{ color: '#000000' }} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
};
