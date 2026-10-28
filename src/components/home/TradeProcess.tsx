import { Container } from '../layout/Layout';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  num: string;
  label: string;
  title: string;
  description: string;
}

const STEPS: ProcessStep[] = [
  {
    num: '01',
    label: 'SPECIFICATION',
    title: 'Send your door schedule',
    description: 'Share a PDF, DWG or spreadsheet with the trade desk for a prompt takeoff.',
  },
  {
    num: '02',
    label: 'SAMPLING',
    title: 'Check physical samples',
    description: 'Review product and finish samples for your project directly in your studio.',
  },
  {
    num: '03',
    label: 'ESTIMATION',
    title: 'Receive a door-by-door takeoff',
    description: 'Review the proposed hardware schedule itemized door-by-door with lead times.',
  },
];

export const TradeProcess: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  // References to the background fill layers that expand across each card on scroll
  const fillLayersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) {
      return;
    }

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

    const ctx = gsap.context(() => {
      const stepSize = 1 / STEPS.length; // 1 / 3 = 0.333333

      const updateProgress = (progress: number) => {
        // Calculate fill fraction [0, 1] for each card
        const p0 = Math.min(Math.max(progress / stepSize, 0), 1);
        const p1 = Math.min(Math.max((progress - stepSize) / stepSize, 0), 1);
        const p2 = Math.min(Math.max((progress - 2 * stepSize) / stepSize, 0), 1);

        const fills = [p0, p1, p2];

        // Direct DOM update: light color fills across the card on scroll
        fills.forEach((fill, idx) => {
          const widthStr = `${(fill * 100).toFixed(2)}%`;

          const layer = fillLayersRef.current[idx];
          if (layer) {
            layer.style.width = widthStr;
          }
        });

        // Focus changes as cards reach full fill:
        // - Step 0 fills 0% -> 100%: Card 0 is focused (activeStep = 0)
        // - Once Step 0 reaches full fill: Focus shifts to Card 1 (activeStep = 1)
        // - Once Step 1 reaches full fill: Focus shifts to Card 2 (activeStep = 2)
        let newActive = 0;
        if (progress < stepSize) {
          newActive = 0;
        } else if (progress < 2 * stepSize) {
          newActive = 1;
        } else {
          newActive = 2;
        }

        setActiveStep((prev) => (prev !== newActive ? newActive : prev));
      };

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: isDesktop ? 'center center' : 'top 75%',
        end: isDesktop ? '+=180%' : 'bottom 25%',
        pin: isDesktop,
        pinSpacing: isDesktop,
        scrub: 0.3,
        anticipatePin: 1,
        onUpdate: (self) => {
          updateProgress(self.progress);
        },
      });

      scrollTriggerRef.current = st;
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleCardClick = (idx: number) => {
    setActiveStep(idx);
    const st = scrollTriggerRef.current;
    if (st) {
      const stepSize = 1 / STEPS.length;
      const targetFraction = (idx + 0.5) * stepSize;
      const targetScroll = st.start + targetFraction * (st.end - st.start);

      const lenisInstance = (window as unknown as { __lenis?: { scrollTo: (target: number) => void } }).__lenis;
      if (lenisInstance) {
        lenisInstance.scrollTo(targetScroll);
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="home-section home-process"
      aria-labelledby="home-process-title"
    >
      <Container className="home-container">
        <header className="home-section__header">
          <div>
            <span
              className="mono-label"
              style={{ color: 'var(--yellow)', display: 'block', marginBottom: '8px' }}
            >
              HOW IT WORKS
            </span>
            <h2 id="home-process-title">From schedule to specification.</h2>
          </div>
        </header>

        <ol className="home-process__steps">
          {STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            const isCompleted = activeStep > idx;

            return (
              <li
                key={step.num}
                className={`home-process__step ${isActive ? 'is-active' : ''} ${
                  isCompleted ? 'is-completed' : ''
                }`}
                data-step-index={idx}
                onClick={() => handleCardClick(idx)}
                aria-current={isActive ? 'step' : undefined}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(idx);
                  }
                }}
              >
                {/* 
                  Active Color Fill Layer:
                  Soft opacity fill across the card on scroll (#1E1E22 with decreased opacity).
                */}
                <div
                  ref={(el) => {
                    fillLayersRef.current[idx] = el;
                  }}
                  className="absolute inset-y-0 left-0 pointer-events-none z-0"
                  style={{
                    width: '0%',
                    backgroundColor: '#1E1E22',
                    opacity: 0.45,
                  }}
                />

                {/* Card Content (z-10 relative so text sits crisp above the fill layer) */}
                <div className="relative z-10 flex flex-col justify-start h-full pointer-events-none">
                  {/* Step Header: clean number and label with NO '//' and NO dot */}
                  <div className="home-process__step-header">
                    <div className="flex items-center gap-2.5">
                      <span className="mono-label text-[12px] font-semibold tracking-[0.2em] text-[#FFC400]">
                        {step.num}
                      </span>
                      <span className="text-[12px] font-medium tracking-[0.16em] text-[#A4A4AA] uppercase">
                        {step.label}
                      </span>
                    </div>
                  </div>

                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
};
