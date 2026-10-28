import React from "react";
import { Link } from "react-router-dom";
import { ArrowUp, CaretDown } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { getLenis } from "../../lib/motion";
import { Container } from "./Layout";
import { DoorLever } from "../common/DoorLever";

const SIDDI_LETTERS = ["S", "I", "D", "D", "I"];

export const Footer: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = React.useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="site-footer bg-[#0B0B0C] text-[#F5F5F3] border-t border-[rgba(255,255,255,0.20)] w-full overflow-hidden font-sans">
      {/* 1. TOP CTA SECTION */}
      <section className="w-full relative bg-[#0B0B0C] overflow-hidden min-h-[380px] lg:min-h-[440px] flex items-center">
          {/* Architectural Door Image: fills right 40-42% of section, 100% height */}
          <div className="absolute right-0 top-0 bottom-0 w-[40%] xl:w-[42%] hidden lg:block overflow-hidden pointer-events-none z-0">
            <img
              src="/footer-cta-door-full.png"
              alt="Architectural door hardware installed on dark wood door"
              className="w-full h-full object-cover object-right"
              loading="eager"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 10%, black 22%)",
                maskImage:
                  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 10%, black 22%)",
              }}
            />
          </div>

          {/* CTA Content Container */}
          <Container className="py-14 sm:py-20 lg:py-24 relative z-10">
            <div className="max-w-2xl lg:max-w-[56%] flex flex-col items-start">
              {/* Yellow Eyebrow */}
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <span
                  className="w-8 h-[2px] bg-[#FFC400] inline-block"
                  aria-hidden="true"
                />
                <span className="text-[#FFC400] text-xs sm:text-[13px] font-semibold tracking-[0.22em] uppercase">
                  TRADE DESK
                </span>
              </div>

              {/* Generous Bold Heading */}
              <h2 className="text-4xl sm:text-5xl lg:text-[62px] xl:text-[68px] font-bold text-[#F5F5F3] tracking-tight leading-[1.04]">
                Have a door
                <br className="hidden sm:inline" /> schedule?
              </h2>

              {/* Supporting Text */}
              <p className="mt-4 text-[#929292] text-base sm:text-lg lg:text-[19px] font-normal leading-relaxed max-w-xl">
                Send your drawings. We’ll help specify the right hardware.
              </p>

              {/* Substantial Yellow CTA Button */}
              <div className="mt-8 sm:mt-10 w-full sm:w-auto">
                <Link
                  to="/trade-desk"
                  style={{ color: '#000000' }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#FFC400] hover:bg-[#E6B000] !text-black font-semibold text-base px-7 py-4 rounded-[4px] transition-all duration-200 group shadow-sm hover:shadow-md cursor-pointer"
                >
                  <span style={{ color: '#000000' }} className="!text-black font-semibold">Send a door schedule</span>
                  <DoorLever size={20} className="shrink-0 !text-black" style={{ color: '#000000' }} />
                </Link>
              </div>

              {/* Tablet / Mobile Door Image */}
              <div className="mt-8 lg:hidden w-full max-w-[540px] aspect-[16/10] sm:aspect-[16/9] rounded-sm overflow-hidden bg-[#0B0B0C]">
                <img
                  src="/footer-cta-door-full.png"
                  alt="Architectural door hardware installed on dark wood door"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </div>
            </div>
          </Container>
        </section>

      {/* Horizontal Divider */}
      <div className="w-full border-t border-[rgba(255,255,255,0.20)]" />

      {/* 2. FOUR-COLUMN MAIN FOOTER NAVIGATION */}
      <Container className="pt-14 pb-8 sm:pt-16 md:pb-0">
        {/* DESKTOP & TABLET VIEW (md and up: 768px+) */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-[160px_185px_175px_140px_1fr] xl:grid-cols-12 gap-8 lg:gap-5 xl:gap-8 items-start">
          {/* Brand Info Block: SIDDI Wordmark */}
          <div className="md:col-span-4 lg:col-auto xl:col-span-3 pr-2 xl:pr-4">
            <Link to="/" className="inline-block group site-footer__brand" aria-label="SIDDI home">
              <img src="/siddi-logo.png" alt="SIDDI" width="1774" height="887" />
            </Link>
            
            <p className="text-xs sm:text-[13px] text-[#929292] leading-relaxed max-w-[220px]">
              Architectural door hardware and bathroom fittings, made in Rajkot,
              India.
            </p>
          </div>

          {/* 01 CATALOGUE */}
          <div className="md:col-span-1 lg:col-auto xl:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#FFC400] font-mono text-xs sm:text-[13px] font-bold">
                01
              </span>
              <h3 className="text-[#FFC400] text-xs sm:text-[13px] font-bold tracking-[0.16em] uppercase whitespace-nowrap">
                CATALOGUE
              </h3>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/products"
                  className="text-sm sm:text-[15px] text-[#929292] hover:text-[#F5F5F3] transition-colors"
                >
                  All products
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-sm sm:text-[15px] text-[#929292] hover:text-[#F5F5F3] transition-colors"
                >
                  Technical downloads
                </Link>
              </li>
            </ul>
          </div>

          {/* 02 TRADE */}
          <div className="md:col-span-1 lg:col-auto xl:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#FFC400] font-mono text-xs sm:text-[13px] font-bold">
                02
              </span>
              <h3 className="text-[#FFC400] text-xs sm:text-[13px] font-bold tracking-[0.16em] uppercase whitespace-nowrap">
                TRADE
              </h3>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/trade-desk"
                  className="text-sm sm:text-[15px] text-[#929292] hover:text-[#F5F5F3] transition-colors"
                >
                  Send a door schedule
                </Link>
              </li>
              <li>
                <Link
                  to="/trade-desk"
                  className="text-sm sm:text-[15px] text-[#929292] hover:text-[#F5F5F3] transition-colors"
                >
                  Request a quote
                </Link>
              </li>
              <li>
                <Link
                  to="/trade-desk?type=sample-box"
                  className="text-sm sm:text-[15px] text-[#929292] hover:text-[#F5F5F3] transition-colors"
                >
                  Request samples
                </Link>
              </li>
            </ul>
          </div>

          {/* 03 ABOUT */}
          <div className="md:col-span-1 lg:col-auto xl:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#FFC400] font-mono text-xs sm:text-[13px] font-bold">
                03
              </span>
              <h3 className="text-[#FFC400] text-xs sm:text-[13px] font-bold tracking-[0.16em] uppercase whitespace-nowrap">
                ABOUT
              </h3>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm sm:text-[15px] text-[#929292] hover:text-[#F5F5F3] transition-colors"
                >
                  About SIDDI
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm sm:text-[15px] text-[#929292] hover:text-[#F5F5F3] transition-colors"
                >
                  Our approach
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-sm sm:text-[15px] text-[#929292] hover:text-[#F5F5F3] transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm sm:text-[15px] text-[#929292] hover:text-[#F5F5F3] transition-colors"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm sm:text-[15px] text-[#929292] hover:text-[#F5F5F3] transition-colors"
                >
                  Terms of use
                </Link>
              </li>
            </ul>
          </div>

          {/* 04 CONTACT (with Left Vertical Divider) */}
          <div className="md:col-span-1 lg:col-auto xl:col-span-3 lg:border-l lg:border-[rgba(255,255,255,0.20)] lg:pl-5 xl:pl-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#FFC400] font-mono text-xs sm:text-[13px] font-bold">
                04
              </span>
              <h3 className="text-[#FFC400] text-xs sm:text-[13px] font-bold tracking-[0.16em] uppercase">
                CONTACT
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <a
                  href="tel:+919428161116"
                  className="text-sm sm:text-[15px] text-[#F5F5F3] hover:text-[#FFC400] font-medium transition-colors block"
                >
                  +91 94281 61116
                </a>
                <span className="text-xs text-[#929292] block mt-0.5">
                  Phone / WhatsApp
                </span>
              </div>
              <div>
                <a
                  href="mailto:trade@siddi.in"
                  className="text-sm sm:text-[15px] text-[#F5F5F3] hover:text-[#FFC400] font-medium transition-colors block"
                >
                  trade@siddi.in
                </a>
                <span className="text-xs text-[#929292] block mt-0.5">
                  Email the trade desk
                </span>
              </div>
              <div>
                <span className="text-sm sm:text-[15px] text-[#F5F5F3] font-medium block">
                  Rajkot, Gujarat, India
                </span>
                <span className="text-xs text-[#929292] block mt-0.5">
                  Visit by appointment only
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold tracking-[0.18em] text-[#929292] hover:text-[#F5F5F3] transition-colors uppercase whitespace-nowrap"
              >
                INSTAGRAM
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold tracking-[0.18em] text-[#929292] hover:text-[#F5F5F3] transition-colors uppercase whitespace-nowrap"
              >
                LINKEDIN
              </a>
              <a
                href="https://wa.me/919428161116"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold tracking-[0.18em] text-[#929292] hover:text-[#F5F5F3] transition-colors uppercase whitespace-nowrap"
              >
                WHATSAPP
              </a>
            </div>
          </div>
        </div>

        {/* MOBILE VIEW (< md: 768px) - BRAND INFO + 4 IN ACCORDION */}
        <div className="block md:hidden">
          {/* Brand Info Block */}
          <div className="mb-6">
            <Link to="/" className="inline-block group site-footer__brand" aria-label="SIDDI home">
              <img src="/siddi-logo.png" alt="SIDDI" width="1774" height="887" />
            </Link>
            
            <p className="text-xs text-[#929292] leading-relaxed max-w-[260px]">
              Architectural door hardware and bathroom fittings, made in Rajkot,
              India.
            </p>
          </div>

          {/* 4 in Accordion */}
          <div className="border-t border-[rgba(255,255,255,0.15)]">
            {/* 01 CATALOGUE */}
            <div className="border-b border-[rgba(255,255,255,0.15)]">
              <button
                type="button"
                onClick={() => toggleAccordion("catalogue")}
                className="w-full py-4 flex items-center justify-between text-left group cursor-pointer"
                aria-expanded={activeAccordion === "catalogue"}
                aria-controls="footer-accordion-catalogue"
                id="footer-accordion-btn-catalogue"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[#FFC400] font-mono text-xs font-bold">
                    01
                  </span>
                  <span className="text-[#FFC400] text-xs font-bold tracking-[0.16em] uppercase">
                    CATALOGUE
                  </span>
                </div>
                <CaretDown
                  size={14}
                  weight="bold"
                  className={`text-[#FFC400] transition-transform duration-300 ${
                    activeAccordion === "catalogue" ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence initial={false}>
                {activeAccordion === "catalogue" && (
                  <motion.div
                    key="content-catalogue"
                    id="footer-accordion-catalogue"
                    role="region"
                    aria-labelledby="footer-accordion-btn-catalogue"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5 pt-1 pl-6">
                      <ul className="space-y-3">
                        <li>
                          <Link
                            to="/products"
                            className="text-sm text-[#929292] hover:text-[#F5F5F3] transition-colors block py-0.5"
                          >
                            All products
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/resources"
                            className="text-sm text-[#929292] hover:text-[#F5F5F3] transition-colors block py-0.5"
                          >
                            Technical downloads
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 02 TRADE */}
            <div className="border-b border-[rgba(255,255,255,0.15)]">
              <button
                type="button"
                onClick={() => toggleAccordion("trade")}
                className="w-full py-4 flex items-center justify-between text-left group cursor-pointer"
                aria-expanded={activeAccordion === "trade"}
                aria-controls="footer-accordion-trade"
                id="footer-accordion-btn-trade"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[#FFC400] font-mono text-xs font-bold">
                    02
                  </span>
                  <span className="text-[#FFC400] text-xs font-bold tracking-[0.16em] uppercase">
                    TRADE
                  </span>
                </div>
                <CaretDown
                  size={14}
                  weight="bold"
                  className={`text-[#FFC400] transition-transform duration-300 ${
                    activeAccordion === "trade" ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence initial={false}>
                {activeAccordion === "trade" && (
                  <motion.div
                    key="content-trade"
                    id="footer-accordion-trade"
                    role="region"
                    aria-labelledby="footer-accordion-btn-trade"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5 pt-1 pl-6">
                      <ul className="space-y-3">
                        <li>
                          <Link
                            to="/trade-desk"
                            className="text-sm text-[#929292] hover:text-[#F5F5F3] transition-colors block py-0.5"
                          >
                            Send a door schedule
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/trade-desk"
                            className="text-sm text-[#929292] hover:text-[#F5F5F3] transition-colors block py-0.5"
                          >
                            Request a quote
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/trade-desk?type=sample-box"
                            className="text-sm text-[#929292] hover:text-[#F5F5F3] transition-colors block py-0.5"
                          >
                            Request samples
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 03 ABOUT */}
            <div className="border-b border-[rgba(255,255,255,0.15)]">
              <button
                type="button"
                onClick={() => toggleAccordion("about")}
                className="w-full py-4 flex items-center justify-between text-left group cursor-pointer"
                aria-expanded={activeAccordion === "about"}
                aria-controls="footer-accordion-about"
                id="footer-accordion-btn-about"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[#FFC400] font-mono text-xs font-bold">
                    03
                  </span>
                  <span className="text-[#FFC400] text-xs font-bold tracking-[0.16em] uppercase">
                    ABOUT
                  </span>
                </div>
                <CaretDown
                  size={14}
                  weight="bold"
                  className={`text-[#FFC400] transition-transform duration-300 ${
                    activeAccordion === "about" ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence initial={false}>
                {activeAccordion === "about" && (
                  <motion.div
                    key="content-about"
                    id="footer-accordion-about"
                    role="region"
                    aria-labelledby="footer-accordion-btn-about"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5 pt-1 pl-6">
                      <ul className="space-y-3">
                        <li>
                          <Link
                            to="/about"
                            className="text-sm text-[#929292] hover:text-[#F5F5F3] transition-colors block py-0.5"
                          >
                            About SIDDI
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/about"
                            className="text-sm text-[#929292] hover:text-[#F5F5F3] transition-colors block py-0.5"
                          >
                            Our approach
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/resources"
                            className="text-sm text-[#929292] hover:text-[#F5F5F3] transition-colors block py-0.5"
                          >
                            Resources
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/privacy"
                            className="text-sm text-[#929292] hover:text-[#F5F5F3] transition-colors block py-0.5"
                          >
                            Privacy policy
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/privacy"
                            className="text-sm text-[#929292] hover:text-[#F5F5F3] transition-colors block py-0.5"
                          >
                            Terms of use
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 04 CONTACT */}
            <div className="border-b border-[rgba(255,255,255,0.15)]">
              <button
                type="button"
                onClick={() => toggleAccordion("contact")}
                className="w-full py-4 flex items-center justify-between text-left group cursor-pointer"
                aria-expanded={activeAccordion === "contact"}
                aria-controls="footer-accordion-contact"
                id="footer-accordion-btn-contact"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[#FFC400] font-mono text-xs font-bold">
                    04
                  </span>
                  <span className="text-[#FFC400] text-xs font-bold tracking-[0.16em] uppercase">
                    CONTACT
                  </span>
                </div>
                <CaretDown
                  size={14}
                  weight="bold"
                  className={`text-[#FFC400] transition-transform duration-300 ${
                    activeAccordion === "contact" ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence initial={false}>
                {activeAccordion === "contact" && (
                  <motion.div
                    key="content-contact"
                    id="footer-accordion-contact"
                    role="region"
                    aria-labelledby="footer-accordion-btn-contact"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5 pt-1 pl-6">
                      <div className="space-y-4">
                        <div>
                          <a
                            href="tel:+919428161116"
                            className="text-sm text-[#F5F5F3] hover:text-[#FFC400] font-medium transition-colors block"
                          >
                            +91 94281 61116
                          </a>
                          <span className="text-xs text-[#929292] block mt-0.5">
                            Phone / WhatsApp
                          </span>
                        </div>
                        <div>
                          <a
                            href="mailto:trade@siddi.in"
                            className="text-sm text-[#F5F5F3] hover:text-[#FFC400] font-medium transition-colors block"
                          >
                            trade@siddi.in
                          </a>
                          <span className="text-xs text-[#929292] block mt-0.5">
                            Email the trade desk
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-[#F5F5F3] font-medium block">
                            Rajkot, Gujarat, India
                          </span>
                          <span className="text-xs text-[#929292] block mt-0.5">
                            Visit by appointment only
                          </span>
                        </div>

                        {/* Social Links */}
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
                          <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold tracking-[0.18em] text-[#929292] hover:text-[#F5F5F3] transition-colors uppercase whitespace-nowrap"
                          >
                            INSTAGRAM
                          </a>
                          <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold tracking-[0.18em] text-[#929292] hover:text-[#F5F5F3] transition-colors uppercase whitespace-nowrap"
                          >
                            LINKEDIN
                          </a>
                          <a
                            href="https://wa.me/919428161116"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold tracking-[0.18em] text-[#929292] hover:text-[#F5F5F3] transition-colors uppercase whitespace-nowrap"
                          >
                            WHATSAPP
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>

      {/* 3. 3D PERSPECTIVE OUTLINED SIDDI TEXT & BRAND STATEMENT */}
      <div className="w-full px-12 md:px-0 md:-ml-8 md:pt-5 pb-6 sm:pb-8 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end gap-16 pb-2 sm:pb-4">
          {/* Perspective Container for 3D Text effect (tuned with image defaults: -9deg, 0deg, 12.5deg, -2deg, 0.29 opacity, 15.5vw) */}
          <div
            className="select-none leading-none -mb-3 sm:-mb-5 md:-mb-7 pointer-events-none overflow-visible md:flex items-center hidden"
            style={{
              perspective: "1200px",
              perspectiveOrigin: "20% 50%",
            }}
          >
            <span
              className="font-black uppercase tracking-[0.02em] whitespace-nowrap inline-block select-none"
              style={{
                fontFamily: "'Orbitron', 'Poppins', sans-serif",
                color: "transparent",
                lineHeight: 0.75,
                transformOrigin: "left center",
                willChange: "transform, -webkit-text-stroke",
                WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.29)",
                transform:
                  "rotateX(0deg) rotateY(0deg) rotateZ(4deg) skewY(0deg) scaleY(1)",
                fontSize: "clamp(64px, 20.5vw, 280px)",
                letterSpacing: "11px",
              }}
            >
              {SIDDI_LETTERS.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: "70%", opacity: 0 }}
                  whileInView={{ y: "0%", opacity: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </div>

          <div
            className="select-none leading-none -mb-3 sm:-mb-5 md:-mb-7 pointer-events-none overflow-visible flex items-center md:hidden"
            style={{
              perspective: "1200px",
              perspectiveOrigin: "20% 50%",
            }}
          >
            <span
              className="font-black uppercase tracking-[0.02em] whitespace-nowrap inline-block select-none"
              style={{
                fontFamily: "'Orbitron', 'Poppins', sans-serif",
                color: "transparent",
                lineHeight: 0.75,
                transformOrigin: "left center",
                willChange: "transform, -webkit-text-stroke",
                WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.29)",
                transform:
                  "rotateX(0deg) rotateY(0deg) rotateZ(0deg) skewY(0deg) scaleY(1)",
                fontSize: "clamp(64px, 20.5vw, 280px)",
                letterSpacing: "10px",
              }}
            >
              {SIDDI_LETTERS.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ x: "-60px", opacity: 0 }}
                  whileInView={{ x: "0px", opacity: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </div>

          {/* Small Stacked Brand Statement */}
          <div className="hidden md:flex flex-col pb-2 shrink-0 z-10">
            <div className="text-[#929292] text-xs sm:text-sm font-bold tracking-[0.2em] leading-snug uppercase space-y-0.5">
              <div>DETAILS</div>
              <div>THAT</div>
              <div>OPEN</div>
              <div>POSSIBILITIES.</div>
            </div>
            <div className="w-8 h-[2px] bg-[#FFC400] mt-2.5" />
          </div>
        </div>
      </div>

      {/* 4. BOTTOM COPYRIGHT BAR */}
      <div className="w-full border-t border-[rgba(255,255,255,0.20)] py-5">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-[#929292] uppercase tracking-wider text-center sm:text-left">
            © {new Date().getFullYear()} SIDDI · RAJKOT, INDIA
          </div>
          <div className="flex items-center gap-6 text-xs font-mono text-[#929292] uppercase tracking-wider">
            <span className="hidden md:inline">
              MADE FOR THE BUILT ENVIRONMENT.
            </span>
            <span className="hidden md:inline text-[rgba(255,255,255,0.20)]">
              |
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="text-[#929292] hover:text-[#FFC400] transition-colors cursor-pointer inline-flex items-center gap-1.5 normal-case font-sans text-xs"
            >
              <span>Back to top</span>
              <ArrowUp size={14} weight="bold" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </div>
    </footer>
  );
};
