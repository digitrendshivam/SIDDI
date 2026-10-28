import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../layout/Layout';

interface ApplicationItem {
  id: string;
  index: string;
  title: string;
  description: string;
  image: string;
  pills: { label: string; href: string }[];
}

const applications: ApplicationItem[] = [
  {
    id: 'bathrooms',
    index: '01',
    title: 'Bathrooms',
    description: 'Bathroom fittings and accessories for residential and project spaces.',
    image: '/Luxe Bathroom Door Hardware.png',
    pills: [
      { label: 'Bathroom accessories', href: '/catalogue' },
      { label: 'Towel rails and holders', href: '/catalogue' },
      { label: 'Hooks, robe hooks and utility', href: '/catalogue' },
    ],
  },
  {
    id: 'interior-doors',
    index: '02',
    title: 'Interior doors',
    description: 'Door handles, knobs, and related hardware for interior doors.',
    image: '/Knurled Brass Lever on Walnut Door.png',
    pills: [
      { label: 'Door handles & knobs', href: '/catalogue' },
      { label: 'Door hardware and accessories', href: '/catalogue' },
    ],
  },
  {
    id: 'hospitality-projects',
    index: '03',
    title: 'Hospitality projects',
    description: 'Door hardware and bathroom accessories for hotels, resorts and curated venues.',
    image: '/Luxury Brass Door Handle in Warm Interior.png',
    pills: [
      { label: 'Door hardware', href: '/catalogue' },
      { label: 'Bathroom accessories', href: '/catalogue' },
      { label: 'Custom project schedules', href: '/catalogue' },
    ],
  },
  {
    id: 'commercial-interiors',
    index: '04',
    title: 'Commercial interiors',
    description: 'Coordinated hardware selections for corporate offices, commercial suites and public spaces.',
    image: '/Modern Gunmetal Knurled Door Handle.png',
    pills: [
      { label: 'Architectural hardware', href: '/catalogue' },
      { label: 'Door handles', href: '/catalogue' },
      { label: 'Commercial fittings', href: '/catalogue' },
    ],
  },
  {
    id: 'renovation-joinery',
    index: '05',
    title: 'Renovation & joinery',
    description: 'Hardware styles and finishes for cabinetry, custom joinery, pocket doors and wardrobe fittings.',
    image: '/Luxury Brass and Black Cabinet Hardware.png',
    pills: [
      { label: 'Cabinet hardware', href: '/catalogue' },
      { label: 'Bathroom fittings', href: '/catalogue' },
      { label: 'Pulls and knobs', href: '/catalogue' },
    ],
  },
];

export const ApplicationsScrollShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<string>(applications[0].image);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const activeIndexRef = useRef<number>(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const nextImg = applications[activeIndex].image;
    if (nextImg !== currentImage) {
      setCurrentImage(nextImg);
      setAnimationKey((k) => k + 1);
    }
  }, [activeIndex, currentImage]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const triggerPoint = window.innerHeight * 0.45;
          let closestIndex = 0;
          let minDistance = Infinity;

          sectionRefs.current.forEach((ref, index) => {
            if (!ref) return;
            const rect = ref.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height * 0.4;
            const distance = Math.abs(sectionCenter - triggerPoint);
            if (distance < minDistance) {
              minDistance = distance;
              closestIndex = index;
            }
          });

          if (closestIndex !== activeIndexRef.current) {
            activeIndexRef.current = closestIndex;
            setActiveIndex(closestIndex);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="w-full bg-[#FAF8F5] py-20 lg:py-28">
      <Container>

        {/* Mobile View: Clean Stacked Cards (< md) */}
        <div className="space-y-16 md:hidden">
          {applications.map((item) => (
            <article key={item.id} className="space-y-6">
              {/* Image Frame - Plain borderless */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-transparent">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-2xl"
                  loading="lazy"
                />
              </div>

              {/* Text Content */}
              <div className="space-y-2.5" style={{ fontFamily: '"Poppins", sans-serif' }}>
                <span className="block text-xs sm:text-sm text-[#78716C] font-normal">
                  {item.index}
                </span>
                <h3
                  style={{
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: 'clamp(32px, 8.5vw, 42px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.025em',
                  }}
                  className="font-bold text-[#18181B] m-0 p-0"
                >
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-[#57534E] leading-relaxed font-normal pt-1">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {item.pills.map((pill) => (
                    <Link
                      key={pill.label}
                      to={pill.href}
                      style={{ fontFamily: '"Poppins", sans-serif' }}
                      className="inline-flex items-center px-4 py-2 rounded-full bg-[#F2F1ED] text-[#18181B] text-xs font-medium"
                    >
                      {pill.label}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Desktop & Tablet: Sticky Left Image Window, Right Scrolling Content (md+) */}
        <div className="hidden md:flex gap-12 lg:gap-20 items-start relative">
          
          {/* Sticky Left Window (45% width) - Plain page background, no borders */}
          <div className="w-[45%] sticky top-24 lg:top-28 h-[65vh] max-h-[600px] rounded-3xl overflow-hidden select-none bg-transparent">
            {/* 9-box animated grid coming from left top side over plain page - joint on animation time */}
            <div
              key={animationKey}
              className="absolute inset-0 grid grid-cols-3 grid-rows-3 w-full h-full overflow-hidden rounded-3xl"
            >
              {[0, 1, 2].map((row) =>
                [0, 1, 2].map((col) => {
                  const delay = (row + col) * 0.18;
                  return (
                    <motion.div
                      key={`tile-${animationKey}-${row}-${col}`}
                      initial={{
                        opacity: 0,
                        x: -85,
                        y: -85,
                        scale: 0.8,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.95,
                        delay,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="w-full h-full relative"
                      style={{
                        backgroundImage: `url("${currentImage}")`,
                        backgroundSize: '300% 300%',
                        backgroundPosition: `${(col / 2) * 100}% ${(row / 2) * 100}%`,
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                  );
                })
              )}
            </div>
          </div>

          {/* Right Scrolling Content (55% width) */}
          <div className="w-[55%] py-12 lg:py-16 space-y-28 lg:space-y-40">
            {applications.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    sectionRefs.current[index] = el;
                  }}
                  className={`min-h-[60vh] flex flex-col justify-center transition-all duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-25'
                  }`}
                  style={{ fontFamily: '"Poppins", sans-serif' }}
                >
                  <div className="space-y-3 max-w-xl">
                    {/* Small index */}
                    <span
                      style={{ fontFamily: '"Poppins", sans-serif' }}
                      className="block text-sm text-[#78716C] font-normal mb-1"
                    >
                      {item.index}
                    </span>

                    {/* Bold Poppins Heading calibrated to reference */}
                    <h2
                      style={{
                        fontFamily: '"Poppins", sans-serif',
                        fontSize: 'clamp(38px, 4.2vw, 52px)',
                        lineHeight: 1.08,
                        letterSpacing: '-0.025em',
                      }}
                      className="font-bold text-[#18181B] m-0 p-0"
                    >
                      {item.title}
                    </h2>

                    {/* Description */}
                    <p
                      style={{ fontFamily: '"Poppins", sans-serif' }}
                      className="text-base lg:text-[17px] text-[#57534E] leading-relaxed font-normal pt-1 pb-3 max-w-lg"
                    >
                      {item.description}
                    </p>

                    {/* Category Pills matching user screenshot */}
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {item.pills.map((pill) => (
                        <Link
                          key={pill.label}
                          to={pill.href}
                          style={{ fontFamily: '"Poppins", sans-serif' }}
                          className="inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#F2F1ED] hover:bg-[#E8E6DF] text-[#18181B] text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
                        >
                          {pill.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </Container>
    </section>
  );
};
