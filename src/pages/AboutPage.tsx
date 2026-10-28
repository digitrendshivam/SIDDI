import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Factory,
  Buildings,
  Target,
  Eye,
  ShieldCheck,
  Sparkle,
  Drop,
  Gear,
  Quotes,
} from '@phosphor-icons/react';
import { motion, useInView, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Meta } from '../components/common/Meta';
import { Container } from '../components/layout/Layout';

const TIMELINE_MILESTONES = [
  {
    step: '01',
    badge: '25+ YRS',
    year: '1998',
    category: 'FOUNDRY ORIGINS',
    title: 'THE TEAM: 25 YEARS OF METALLURGY',
    description:
      'The craftsmen behind SIDDI bring over two decades of metallurgical foundry know-how—moulding, melting, gravity casting, and hand-finishing virgin architectural brass.',
    icon: Factory,
    link: '/products',
    linkLabel: 'Explore core alloys',
  },
  {
    step: '02',
    badge: 'CNC & PVD',
    year: '2014',
    category: 'SURFACE SCIENCE',
    title: 'MULTI-AXIS MACHINING & CLEANROOM PVD',
    description:
      'Commissioned advanced German-tooled multi-axis CNC knurling centers and physical vapor deposition (PVD) vacuum chambers, creating lifetime wear and corrosion resistance.',
    icon: Gear,
    link: '/products',
    linkLabel: 'View finish specifications',
  },
  {
    step: '03',
    badge: 'ISO 9001',
    year: '2020',
    category: 'QUALITY ASSURANCE',
    title: 'DOCUMENTED ARCHITECTURAL INTEGRITY',
    description:
      'Implemented full spectrometer chemical verification, cycle-testing endurance rigs, and EN 1906 grade testing behind every lever, knob, and bathroom fitting.',
    icon: ShieldCheck,
    link: '/trade-desk',
    linkLabel: 'Download compliance data',
  },
  {
    step: '04',
    badge: '10K+ PROJECTS',
    year: 'TODAY',
    category: 'NATIONWIDE REACH',
    title: 'SCALED FOR ARCHITECTURAL SPECIFICATION',
    description:
      'Supplying prestige residential estates, luxury hotels, and commercial developments across India, supported by our direct Rajkot trade desk and 48-hour takeoff review.',
    icon: Buildings,
    link: '/trade-desk',
    linkLabel: 'Share project schedule',
  },
];

const ABOUT_STATS = [
  { value: 500, suffix: '+', label: 'Product SKUs' },
  { value: 60, suffix: '+', label: 'Finish options' },
  { value: 10000, suffix: '+', label: 'Projects supplied' },
];

const CRAFT_PILLS = [
  {
    icon: Drop,
    title: 'Virgin Brass Metallurgy',
    subtitle: 'High-density architectural alloy',
  },
  {
    icon: Sparkle,
    title: 'In-House PVD Finishes',
    subtitle: 'Scratch & tarnish resistant',
  },
  {
    icon: Gear,
    title: 'Sub-Millimeter CNC Precision',
    subtitle: 'Knurled & balanced spindle tolerances',
  },
  {
    icon: ShieldCheck,
    title: '10-Year Mechanical Warranty',
    subtitle: 'Tested to 200,000+ cycle life',
  },
];

interface StatCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

const StatCounter: React.FC<StatCounterProps> = ({ value, suffix = '', duration = 1.8 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(value);
      return;
    }

    let startTime: number | null = null;
    let animId: number;

    const easeOutQuad = (t: number) => t * (2 - t);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuad(progress);

      setCount(Math.floor(eased * value));

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

interface TimelineItemProps {
  milestone: (typeof TIMELINE_MILESTONES)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  milestone,
  index,
  total,
  progress,
}) => {
  const Icon = milestone.icon;
  const isEven = index % 2 === 0;

  // Distinct activation threshold for each milestone node
  const threshold = (index + 0.3) / total;

  // Reactive node animations when the scroll traveler reaches each point
  const nodeScale = useTransform(
    progress,
    [threshold - 0.08, threshold, threshold + 0.08],
    [0.9, 1.2, 1]
  );

  const nodeBg = useTransform(
    progress,
    [threshold - 0.05, threshold],
    ['#FFFFFF', '#AD8143']
  );

  const nodeColor = useTransform(
    progress,
    [threshold - 0.05, threshold],
    ['#AD8143', '#FFFFFF']
  );

  const nodeBorder = useTransform(
    progress,
    [threshold - 0.05, threshold],
    ['#E2DED7', '#AD8143']
  );

  const rippleScale = useTransform(
    progress,
    [threshold - 0.05, threshold, threshold + 0.1],
    [0.8, 1.6, 2.2]
  );

  const rippleOpacity = useTransform(
    progress,
    [threshold - 0.05, threshold, threshold + 0.1],
    [0, 0.75, 0]
  );

  const cardBorder = useTransform(
    progress,
    [threshold - 0.05, threshold, threshold + 0.14],
    ['#E2DED7', '#AD8143', '#E2DED7']
  );

  const cardShadow = useTransform(
    progress,
    [threshold - 0.05, threshold, threshold + 0.14],
    [
      '0 4px 24px rgba(0,0,0,0.03)',
      '0 14px 40px rgba(173,129,67,0.18)',
      '0 6px 28px rgba(0,0,0,0.04)',
    ]
  );

  return (
    <div className="relative flex items-center md:justify-between">
      {/* Central Node & Expanding Ripple Anchor (Desktop Center) */}
      <div className="hidden md:flex absolute left-1/2 top-14 -translate-x-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center pointer-events-none z-20">
        {/* Expanding Ripple Glow on Scroll Activation - exactly centered on badge */}
        <motion.div
          style={{ scale: rippleScale, opacity: rippleOpacity }}
          className="absolute inset-0 rounded-full bg-[#AD8143]"
        />

        {/* Circular Node Icon */}
        <motion.div
          style={{
            scale: nodeScale,
            backgroundColor: nodeBg,
            color: nodeColor,
            borderColor: nodeBorder,
          }}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_24px_rgba(173,129,67,0.3)] border-2 pointer-events-auto"
        >
          <Icon size={20} weight="fill" />
        </motion.div>
      </div>

      {/* Central Node & Expanding Ripple Anchor (Mobile Left) */}
      <div className="flex md:hidden absolute left-6 top-[46px] -translate-x-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center pointer-events-none z-20">
        {/* Expanding Ripple Glow on Scroll Activation - exactly centered on badge */}
        <motion.div
          style={{ scale: rippleScale, opacity: rippleOpacity }}
          className="absolute inset-0 rounded-full bg-[#AD8143]"
        />

        {/* Circular Node Icon */}
        <motion.div
          style={{
            scale: nodeScale,
            backgroundColor: nodeBg,
            color: nodeColor,
            borderColor: nodeBorder,
          }}
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-md border-2 pointer-events-auto"
        >
          <Icon size={18} weight="fill" />
        </motion.div>
      </div>

      {/* Timeline Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -24 : 24, y: 16 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full ml-14 md:ml-0 md:w-[calc(50%-44px)] ${
          isEven ? 'md:mr-auto' : 'md:ml-auto'
        }`}
      >
        <motion.div
          style={{
            borderColor: cardBorder,
            boxShadow: cardShadow,
          }}
          className="group relative bg-white rounded-2xl border p-7 sm:p-9 transition-colors duration-300"
        >
          {/* Top Header Row inside Card */}
          <div className="flex items-baseline justify-between mb-3">
            <span
              style={{ fontFamily: '"Poppins", sans-serif' }}
              className="text-3xl sm:text-4xl font-extrabold text-[#AD8143] tracking-tight"
            >
              {milestone.badge}
            </span>
            <span className="text-xs font-mono text-[#A8A29E] tracking-widest uppercase">
              {milestone.step}
            </span>
          </div>

          {/* Category Label */}
          <div className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#78716C] mb-2 font-mono">
            {milestone.year} · {milestone.category}
          </div>

          {/* Milestone Title */}
          <h3
            style={{ fontFamily: '"Poppins", sans-serif' }}
            className="text-lg sm:text-xl font-bold text-[#171717] tracking-tight uppercase mb-3 leading-snug group-hover:text-[#AD8143] transition-colors"
          >
            {milestone.title}
          </h3>

          {/* Milestone Description */}
          <p
            style={{ fontFamily: '"Poppins", sans-serif' }}
            className="text-sm sm:text-base text-[#57534E] leading-relaxed font-normal mb-6"
          >
            {milestone.description}
          </p>

          {/* CTA Link */}
          <Link
            to={milestone.link}
            style={{ fontFamily: '"Poppins", sans-serif' }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#171717] group-hover:text-[#AD8143] transition-colors"
          >
            <span className="border-b border-[#AD8143]/30 pb-0.5 group-hover:border-[#AD8143] transition-colors">
              {milestone.linkLabel}
            </span>
            <ArrowRight
              size={13}
              weight="bold"
              className="transition-transform duration-250 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export const AboutPage: React.FC = () => {
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineContainerRef,
    offset: ['start 65%', 'end 75%'],
  });

  const travelerY = useTransform(timelineProgress, [0, 1], ['0%', '100%']);
  return (
    <div
      className="about-page min-h-screen bg-[#FAF8F5] text-[#18181B]"
      style={{ fontFamily: '"Poppins", sans-serif' }}
    >
      <Meta
        title="About SIDDI — Architectural Hardware"
        description="Learn about SIDDI, an architectural hardware brand and manufacturing foundry based in Rajkot, India."
      />

      {/* Hero Section matching Resources Page Layout & Poppins Typography */}
      <section className="relative w-full overflow-hidden bg-[#F6F2EC] border-b border-[#E7E2DA]">
        {/* Desktop Layout (xl+) */}
        <div className="hidden xl:flex relative w-full min-h-[460px] 2xl:min-h-[490px] items-center">
          {/* Background Architectural Photography */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
            <img
              src="/Sunlit Brass Handle on Ribbed Wood.png"
              alt="SIDDI architectural hardware studio display with brass lever on travertine plinth and technical drawings"
              className="w-full h-full object-cover object-right"
            />
            {/* Soft natural gradient blend into the light left side for clean text readability */}
            <div className="absolute inset-y-0 left-0 w-[48%] bg-gradient-to-r from-[#F6F2EC] via-[#F6F2EC]/50 to-transparent" />
          </div>

          {/* Content Container (Desktop) */}
          <Container className="relative z-10 py-10 2xl:py-12">
            <div className="w-[48%]">
              {/* Breadcrumb */}
              <nav
                aria-label="Breadcrumb"
                className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase"
                style={{ fontFamily: '"Poppins", sans-serif' }}
              >
                <Link to="/" className="text-[#64748B] hover:text-[#18181B] transition-colors">
                  HOME
                </Link>
                <span className="text-[#94A3B8] text-[10px] font-normal">&gt;</span>
                <span className="text-[#F5B900]" aria-current="page">
                  ABOUT SIDDI
                </span>
              </nav>

              {/* Heading in Poppins */}
              <h1
                style={{ fontFamily: '"Poppins", sans-serif' }}
                className="text-[50px] 2xl:text-[56px] font-bold text-[#18181B] tracking-tight leading-[1.06]"
              >
                Hardware for<br />
                considered spaces.
              </h1>

              {/* Description in Poppins */}
              <p
                style={{ fontFamily: '"Poppins", sans-serif' }}
                className="mt-4 max-w-[650px] text-[17px] 2xl:text-[18px] leading-[1.55] text-[#57534E] font-normal"
              >
                SIDDI supplies architectural door hardware and bathroom fittings from Rajkot, India. We help project teams compare products, finishes, and requirements for their schedules.
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
              <nav
                aria-label="Breadcrumb"
                className="mb-3 sm:mb-4 flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase"
                style={{ fontFamily: '"Poppins", sans-serif' }}
              >
                <Link to="/" className="text-[#64748B] hover:text-[#18181B] transition-colors">
                  HOME
                </Link>
                <span className="text-[#94A3B8] text-[10px] font-normal">&gt;</span>
                <span className="text-[#F5B900]" aria-current="page">
                  ABOUT SIDDI
                </span>
              </nav>

              {/* Heading in Poppins */}
              <h1
                style={{ fontFamily: '"Poppins", sans-serif' }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#18181B] tracking-tight leading-[1.1]"
              >
                Hardware for<br className="hidden sm:inline" />
                {' '}considered spaces.
              </h1>

              {/* Description in Poppins */}
              <p
                style={{ fontFamily: '"Poppins", sans-serif' }}
                className="mt-3 text-sm sm:text-base leading-relaxed text-[#57534E] font-normal"
              >
                SIDDI supplies architectural door hardware and bathroom fittings from Rajkot, India. We help project teams compare products, finishes, and requirements for their schedules.
              </p>
            </div>
          </Container>

          {/* Repositioned Architectural Hardware Display Strip */}
          <div className="relative w-full h-[180px] sm:h-[220px] md:h-[260px] bg-[#F6F2EC] overflow-hidden">
            <img
              src="/Warm Architectural Hardware Studio Still Life.png"
              alt="SIDDI architectural hardware brass knurled lever on travertine plinth"
              className="w-full h-full object-cover object-[78%_center]"
            />
            {/* Soft top gradient blend for a continuous, seamless transition */}
            <div className="absolute inset-x-0 top-0 h-12 sm:h-14 bg-gradient-to-b from-[#F6F2EC] to-transparent" />
          </div>
        </div>
      </section>

      {/* Editorial Hardware Specification Section */}
      <section className="relative w-full bg-[#FAF9F6] border-b border-[#E2DED7] py-20 sm:py-24 lg:py-32 overflow-hidden">
        <Container>
          {/* Main Content Area (Two Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
          >
            {/* Left Column (Big Multiline Heading) */}
            <div className="lg:col-span-7">
              <h2
                style={{
                  fontSize: 'clamp(30px, 4.4vw, 66px)',
                  lineHeight: 1.05,
                  fontFamily: '"Poppins", sans-serif',
                }}
                className="font-bold text-[#171717] tracking-tight max-w-[700px]"
              >
                Clear choices, from<br className="hidden sm:inline" /> selection to schedule.
              </h2>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 flex flex-col justify-between pt-2 lg:pt-3">
              <div
                style={{ fontFamily: '"Poppins", sans-serif' }}
                className="space-y-5 text-sm sm:text-base text-[#57534E] leading-[1.7] font-normal"
              >
                <p>
                  Architectural hardware turns on many details: product type, finish, door or room use, and project quantities. We help project teams compare products, finishes and requirements in one place.
                </p>
                <p>
                  Browse the catalogue, pick the products that suit your project, then share a door schedule or enquiry with the trade desk. Confirm dimensions and performance against current documentation before specification.
                </p>
              </div>

              {/* Minimalist Catalogue Link */}
              <div className="mt-8 pt-2">
                <Link
                  to="/products"
                  style={{ fontFamily: '"Poppins", sans-serif' }}
                  className="group inline-flex items-center gap-2 text-sm sm:text-[15px] font-semibold text-[#171717] transition-colors"
                >
                  <span className="border-b border-[#171717]/30 pb-0.5 group-hover:border-[#171717] transition-colors duration-250">
                    Explore the catalogue
                  </span>
                  <ArrowRight
                    size={14}
                    weight="bold"
                    className="text-[#171717] transition-transform duration-250 group-hover:translate-x-1.5"
                  />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Statistics Area */}
          <div className="mt-16 sm:mt-20 lg:mt-24 pt-10 sm:pt-14 lg:pt-16 border-t border-[#E2DED7]">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E2DED7]">
              {ABOUT_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                  className={`py-6 md:py-0 first:pt-0 last:pb-0 ${
                    i === 0
                      ? 'md:pr-8 lg:pr-12 md:pl-0'
                      : i === 1
                      ? 'md:px-8 lg:px-12'
                      : 'md:pl-8 lg:pl-12 md:pr-0'
                  } flex flex-col justify-start`}
                >
                  <div
                    style={{ fontFamily: '"Poppins", sans-serif' }}
                    className="text-4xl sm:text-5xl lg:text-[54px] 2xl:text-[58px] font-bold text-[#171717] tracking-tight font-sans tabular-nums leading-none"
                  >
                    <StatCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div
                    style={{ fontFamily: '"Poppins", sans-serif' }}
                    className="text-xs sm:text-[13px] font-semibold tracking-[0.16em] uppercase text-[#78716C] mt-3 font-sans"
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Company Journey Section — Synchro-Style Central Vertical Timeline */}
      <section className="relative w-full bg-[#F8F6F1] border-b border-[#E2DED7] py-20 sm:py-24 lg:py-32 overflow-hidden">
        <Container>
          {/* Section Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 lg:mb-24">
            <div className="md:col-span-7 lg:col-span-6">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontFamily: '"Poppins", sans-serif' }}
                className="block text-xs font-semibold tracking-[0.24em] uppercase text-[#AD8143] mb-4"
              >
                — MILESTONES & HERITAGE
              </motion.span>

              <h2
                style={{
                  fontFamily: '"Poppins", sans-serif',
                  lineHeight: 1.05,
                }}
                className="text-3xl sm:text-4xl lg:text-[46px] 2xl:text-[52px] font-bold text-[#171717] tracking-tight"
              >
                Forged in Rajkot,
                <br />
                scaled for architecture<span className="text-[#AD8143]">.</span>
              </h2>
            </div>

            <div className="md:col-span-5 lg:col-span-6 flex flex-col justify-between items-start md:items-end">
              <p
                style={{ fontFamily: '"Poppins", sans-serif' }}
                className="text-sm sm:text-base text-[#57534E] leading-[1.7] max-w-[480px] md:text-right mb-6"
              >
                From foundry metallurgy to supplying landmark towers nationwide, our timeline reflects a relentless commitment to virgin architectural brass, microscopic machining, and trade partnership.
              </p>
              <Link
                to="/trade-desk"
                style={{ fontFamily: '"Poppins", sans-serif' }}
                className="group inline-flex items-center gap-2 text-sm sm:text-[15px] font-semibold text-[#171717] transition-colors"
              >
                <span className="border-b border-[#AD8143]/40 pb-0.5 group-hover:border-[#AD8143] transition-colors duration-250">
                  Connect with trade desk
                </span>
                <ArrowRight
                  size={14}
                  weight="bold"
                  className="text-[#171717] group-hover:text-[#AD8143] transition-transform duration-250 group-hover:translate-x-1.5"
                />
              </Link>
            </div>
          </div>

          {/* Vertical Timeline Structure with Interactive Scroll Filling Animation */}
          <div ref={timelineContainerRef} className="relative w-full max-w-5xl mx-auto py-8">
            {/* 1. Base Background Inactive Track (Desktop Center) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-[#E2DED7]" />

            {/* 2. Scroll-Driven Liquid Molten Brass Fill Line (Desktop Center) */}
            <motion.div
              style={{ scaleY: timelineProgress, originY: 0 }}
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 bg-gradient-to-b from-[#AD8143] via-[#D4AF37] to-[#F5B900] shadow-[0_0_14px_rgba(173,129,67,0.7)] z-10 origin-top rounded-full"
            />

            {/* 3. Glowing Molten Brass Traveler Droplet / Beacon (Desktop Center) */}
            <motion.div
              style={{ top: travelerY }}
              className="hidden md:block absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#F5B900] shadow-[0_0_14px_#F5B900,0_0_28px_#AD8143] z-30 pointer-events-none border-2 border-white"
            />

            {/* 4. Base Background Inactive Track (Mobile/Tablet Left) */}
            <div className="md:hidden absolute left-6 top-0 bottom-0 w-[2px] bg-[#E2DED7]" />

            {/* 5. Scroll-Driven Liquid Molten Brass Fill Line (Mobile/Tablet Left) */}
            <motion.div
              style={{ scaleY: timelineProgress, originY: 0 }}
              className="md:hidden absolute left-6 top-0 bottom-0 w-[3px] -translate-x-1/2 bg-gradient-to-b from-[#AD8143] via-[#D4AF37] to-[#F5B900] shadow-[0_0_14px_rgba(173,129,67,0.7)] z-10 origin-top rounded-full"
            />

            {/* 6. Glowing Molten Brass Traveler Droplet / Beacon (Mobile/Tablet Left) */}
            <motion.div
              style={{ top: travelerY }}
              className="md:hidden absolute left-6 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#F5B900] shadow-[0_0_14px_#F5B900,0_0_28px_#AD8143] z-30 pointer-events-none border-2 border-white"
            />

            {/* Timeline Items */}
            <div className="space-y-12 sm:space-y-16 lg:space-y-20">
              {TIMELINE_MILESTONES.map((milestone, i) => (
                <TimelineItem
                  key={milestone.step}
                  milestone={milestone}
                  index={i}
                  total={TIMELINE_MILESTONES.length}
                  progress={timelineProgress}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Plant Showcase, Craft Mosaic & Quality Statement (Adapted from Reference Website) */}
      <section className="relative w-full bg-[#FAF9F6] border-b border-[#E2DED7] py-20 sm:py-24 lg:py-32 overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: 4-Photo Craft Mosaic (FIG. 01–04) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 relative w-full max-w-md mx-auto lg:max-w-none px-2 sm:px-0"
            >
              {/* Corner Crosshairs (+) */}
              <div className="absolute -top-2 left-0 sm:-top-3 sm:-left-3 text-[#AD8143] font-mono text-xs sm:text-sm select-none">+</div>
              <div className="absolute -top-2 right-0 sm:-top-3 sm:-right-3 text-[#AD8143] font-mono text-xs sm:text-sm select-none">+</div>
              <div className="absolute -bottom-2 left-0 sm:-bottom-3 sm:-left-3 text-[#AD8143] font-mono text-xs sm:text-sm select-none">+</div>
              <div className="absolute -bottom-2 right-0 sm:-bottom-3 sm:-right-3 text-[#AD8143] font-mono text-xs sm:text-sm select-none">+</div>

              {/* Mosaic Frame */}
              <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#E2DED7] shadow-[0_6px_30px_rgba(0,0,0,0.03)]">
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                  {/* Item 01: Multi-Axis CNC Knurling */}
                  <div className="relative group overflow-hidden rounded-xl bg-[#F6F2EC] aspect-square sm:aspect-[4/3]">
                    <img
                      src="/Knurled Brass Lever on Walnut Door.png"
                      alt="Multi-axis CNC knurling machining"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-white/95 backdrop-blur-xs px-1.5 py-0.5 sm:px-2 rounded sm:rounded-md text-[8.5px] sm:text-[10px] font-mono font-semibold tracking-tight sm:tracking-wider text-[#171717] whitespace-nowrap shadow-xs">
                      01 CNC LATHE
                    </div>
                  </div>

                  {/* Item 02: Hand Polishing */}
                  <div className="relative group overflow-hidden rounded-xl bg-[#F6F2EC] aspect-square sm:aspect-[4/3]">
                    <img
                      src="/Sunlit Brass Handle on Ribbed Wood.png"
                      alt="Hand fettling and polishing architectural hardware"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-white/95 backdrop-blur-xs px-1.5 py-0.5 sm:px-2 rounded sm:rounded-md text-[8.5px] sm:text-[10px] font-mono font-semibold tracking-tight sm:tracking-wider text-[#171717] whitespace-nowrap shadow-xs">
                      02 HAND FETTLING
                    </div>
                  </div>

                  {/* Item 03: PVD Surface Science */}
                  <div className="relative group overflow-hidden rounded-xl bg-[#F6F2EC] aspect-square sm:aspect-[4/3]">
                    <img
                      src="/Modern Gunmetal Knurled Door Handle.png"
                      alt="PVD vacuum chamber coating"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-white/95 backdrop-blur-xs px-1.5 py-0.5 sm:px-2 rounded sm:rounded-md text-[8.5px] sm:text-[10px] font-mono font-semibold tracking-tight sm:tracking-wider text-[#171717] whitespace-nowrap shadow-xs">
                      03 PVD CHAMBER
                    </div>
                  </div>

                  {/* Item 04: Quality Inspection */}
                  <div className="relative group overflow-hidden rounded-xl bg-[#F6F2EC] aspect-square sm:aspect-[4/3]">
                    <img
                      src="/Stacked Wood, Metal, and Stone Samples.png"
                      alt="Dimensional check and torque tolerance inspection"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-white/95 backdrop-blur-xs px-1.5 py-0.5 sm:px-2 rounded sm:rounded-md text-[8.5px] sm:text-[10px] font-mono font-semibold tracking-tight sm:tracking-wider text-[#171717] whitespace-nowrap shadow-xs">
                      04 LAB INSPECTION
                    </div>
                  </div>
                </div>

                {/* Technical Caption Bar */}
                <div className="mt-2.5 pt-2.5 sm:mt-3 sm:pt-3 border-t border-[#EAE6DE] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#78716C]">
                  <span>FIG. 01–04</span>
                  <span className="font-semibold text-[#AD8143]">EST. 1998</span>
                  <span>RAJKOT · IN</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Statement, Quote Card & Capability Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 flex flex-col justify-between"
            >
              <div>
                <span className="block text-xs font-semibold tracking-[0.24em] uppercase text-[#AD8143] mb-3">
                  — CRAFTSMANSHIP & INTEGRITY
                </span>
                <h2
                  style={{ fontFamily: '"Poppins", sans-serif' }}
                  className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#171717] tracking-tight leading-[1.1] mb-6"
                >
                  Precision at the lathe.
                  <br />
                  <span className="text-[#AD8143]">Purity</span> at the door.
                </h2>
                <p
                  style={{ fontFamily: '"Poppins", sans-serif' }}
                  className="text-sm sm:text-base text-[#57534E] leading-[1.7] mb-8"
                >
                  Operating from Rajkot's historic metals district, our integrated foundry and machining facilities handle every stage in-house—from virgin copper-zinc melting and CNC knurling to cleanroom PVD deposition and micron-tolerance quality inspection.
                </p>

                {/* Quote Card (matching reference style) */}
                <div className="relative bg-white border border-[#E2DED7] rounded-2xl p-7 sm:p-8 mb-8 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                  <Quotes size={32} weight="fill" className="text-[#AD8143] mb-4" />
                  <p
                    style={{ fontFamily: '"Poppins", sans-serif' }}
                    className="text-lg sm:text-xl font-extrabold text-[#171717] tracking-tight uppercase leading-snug mb-3"
                  >
                    <span className="text-[#AD8143]">ARCHITECTURAL PURITY</span> IN EVERY DETAIL,{' '}
                    <span className="text-[#AD8143]">ENDURING VALUE</span> IN EVERY SCHEDULE.
                  </p>
                  <p className="text-xs font-mono tracking-widest text-[#78716C] uppercase">
                    — SIDDI ARCHITECTURAL HARDWARE PVT. LTD.
                  </p>
                </div>

                {/* 4 Pill Badges Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CRAFT_PILLS.map((pill) => {
                    const PillIcon = pill.icon;
                    return (
                      <div
                        key={pill.title}
                        className="flex items-center gap-3 bg-white/70 border border-[#E2DED7] rounded-xl px-4 py-3 hover:border-[#AD8143]/50 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#FAF6EE] text-[#AD8143] flex items-center justify-center shrink-0">
                          <PillIcon size={16} weight="fill" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#171717]">{pill.title}</div>
                          <div className="text-[11px] text-[#78716C]">{pill.subtitle}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 5. Purpose: Mission & Vision (Matching Reference Layout & Structure) */}
      <section className="relative w-full bg-[#F8F6F1] border-b border-[#E2DED7] py-20 sm:py-24 lg:py-32 overflow-hidden">
        <Container>
          {/* Eyebrow & Headline */}
          <div className="mb-14 lg:mb-20 text-center max-w-2xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="block text-xs font-semibold tracking-[0.24em] uppercase text-[#AD8143] mb-3"
            >
              — PURPOSE & DIRECTION
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontFamily: '"Poppins", sans-serif' }}
              className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#171717] tracking-tight uppercase"
            >
              MISSION & <span className="text-[#AD8143]">VISION</span>.
            </motion.h2>
          </div>

          {/* Side-by-Side Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Card 01: OUR MISSION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative bg-white border border-[#E2DED7] rounded-3xl p-8 sm:p-12 overflow-hidden shadow-[0_6px_28px_rgba(0,0,0,0.03)] hover:border-[#AD8143]/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Big Numeral Watermark in Bottom Right */}
              <span className="absolute -bottom-6 -right-4 text-[130px] sm:text-[160px] font-bold text-[#AD8143]/10 leading-none select-none pointer-events-none font-sans">
                01
              </span>

              <div>
                {/* Folder Tab Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF6EE] border border-[#E2DED7] text-[#AD8143] flex items-center justify-center group-hover:bg-[#AD8143] group-hover:text-white transition-colors duration-300">
                    <Target size={24} weight="bold" />
                  </div>
                  <div className="bg-[#FAF6EE] text-[#AD8143] border border-[#E8E2D5] px-3 py-1 rounded-md text-[11px] font-mono font-semibold tracking-wider uppercase">
                    01 WHAT WE DELIVER
                  </div>
                </div>

                {/* Title */}
                <h3
                  style={{ fontFamily: '"Poppins", sans-serif' }}
                  className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight uppercase mb-4"
                >
                  OUR MISSION
                </h3>

                {/* Description */}
                <p
                  style={{ fontFamily: '"Poppins", sans-serif' }}
                  className="text-sm sm:text-base text-[#57534E] leading-[1.75] font-normal mb-8 relative z-10"
                >
                  To empower architects, interior designers, and project teams with uncompromised architectural door hardware and bathroom fittings—delivering microscopic tolerances, tactile luxury, and transparent room-by-room door schedule takeoff support.
                </p>
              </div>

              {/* Bottom Gold Accent Stripe */}
              <div className="w-full h-1 bg-gradient-to-r from-[#AD8143] to-transparent rounded-full" />
            </motion.div>

            {/* Card 02: OUR VISION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative bg-white border border-[#E2DED7] rounded-3xl p-8 sm:p-12 overflow-hidden shadow-[0_6px_28px_rgba(0,0,0,0.03)] hover:border-[#AD8143]/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Big Numeral Watermark in Bottom Right */}
              <span className="absolute -bottom-6 -right-4 text-[130px] sm:text-[160px] font-bold text-[#AD8143]/10 leading-none select-none pointer-events-none font-sans">
                02
              </span>

              <div>
                {/* Folder Tab Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF6EE] border border-[#E2DED7] text-[#AD8143] flex items-center justify-center group-hover:bg-[#AD8143] group-hover:text-white transition-colors duration-300">
                    <Eye size={24} weight="bold" />
                  </div>
                  <div className="bg-[#FAF6EE] text-[#AD8143] border border-[#E8E2D5] px-3 py-1 rounded-md text-[11px] font-mono font-semibold tracking-wider uppercase">
                    02 WHERE WE LEAD
                  </div>
                </div>

                {/* Title */}
                <h3
                  style={{ fontFamily: '"Poppins", sans-serif' }}
                  className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight uppercase mb-4"
                >
                  OUR VISION
                </h3>

                {/* Description */}
                <p
                  style={{ fontFamily: '"Poppins", sans-serif' }}
                  className="text-sm sm:text-base text-[#57534E] leading-[1.75] font-normal mb-8 relative z-10"
                >
                  To stand as India's benchmark architectural hardware house, recognized globally for marrying Rajkot's casting and CNC excellence with contemporary European editorial design, honest virgin metallurgy, and seamless specification experiences.
                </p>
              </div>

              {/* Bottom Gold Accent Stripe */}
              <div className="w-full h-1 bg-gradient-to-r from-[#AD8143] to-transparent rounded-full" />
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
};
