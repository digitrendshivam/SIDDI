import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

export const LeverIcon: React.FC<{ flip?: boolean; className?: string }> = ({ flip = false, className = '' }) => (
  <svg
    className={`lever-svg ${flip ? 'scale-x-[-1]' : ''} ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: 'visible' }}
  >
    {/* Rose Mount */}
    <circle cx="6" cy="12" r="5" fill="#FFC400" />
    <circle cx="6" cy="12" r="2.2" fill="#8C6200" />
    {/* Lever Handle */}
    <rect
      className="lever-bar"
      x="6"
      y="10.2"
      width="17"
      height="3.6"
      rx="1.8"
      fill="url(#brass-lever-gradient)"
      style={{ transformOrigin: '6px 12px' }}
    />
    <defs>
      <linearGradient id="brass-lever-gradient" x1="6" y1="10" x2="23" y2="14" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF099" />
        <stop offset="0.4" stopColor="#FFC400" />
        <stop offset="1" stopColor="#B8860B" />
      </linearGradient>
    </defs>
  </svg>
);

export const DoorTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const isNoLoad = typeof window !== 'undefined' && window.location.search.includes('noload');

  // Initial Opening Animation
  useEffect(() => {
    if (isNoLoad) {
      window.dispatchEvent(new Event('siddi:page-loader-exit-complete'));
      return;
    }

    const container = containerRef.current;
    const left = leftDoorRef.current;
    const right = rightDoorRef.current;
    if (!container || !left || !right) return;

    const levers = container.querySelectorAll('.lever-bar');

    // On initial mount, start closed and swing open
    gsap.set(container, { visibility: 'visible' });
    gsap.set(left, { rotateY: 0 });
    gsap.set(right, { rotateY: 0 });
    gsap.set(levers, { rotate: 0 });

    const openTl = gsap.timeline({
      delay: 0.25,
      onComplete: () => {
        gsap.set(container, { visibility: 'hidden' });
        window.dispatchEvent(new Event('siddi:page-loader-exit-complete'));
      },
    });

    // Lever press down -> spring up -> doors swing open
    openTl
      .to(levers, { rotate: 32, duration: 0.18, ease: 'power2.out' })
      .to(levers, { rotate: 0, duration: 0.24, ease: 'power1.out' })
      .to(left, { rotateY: -100, duration: 0.75, ease: 'power2.inOut' }, '+=0.05')
      .to(right, { rotateY: 100, duration: 0.75, ease: 'power2.inOut' }, '<');

    return () => {
      openTl.kill();
    };
  }, [isNoLoad]);

  // Page Transition on Link Click
  useEffect(() => {
    if (isNoLoad) return;

    let isBusy = false;

    const handleLinkClick = (e: MouseEvent) => {
      if (isBusy || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const target = (e.target as HTMLElement).closest('a[href]');
      if (!target) return;

      const a = target as HTMLAnchorElement;
      if (a.target === '_blank' || a.hasAttribute('download')) return;

      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      const destUrl = new URL(a.href, window.location.href);
      if (destUrl.origin !== window.location.origin) return;
      if (destUrl.pathname === window.location.pathname && destUrl.search === window.location.search) return;

      e.preventDefault();
      e.stopPropagation();

      isBusy = true;
      const container = containerRef.current;
      const left = leftDoorRef.current;
      const right = rightDoorRef.current;
      if (!container || !left || !right) {
        navigate(destUrl.pathname + destUrl.search + destUrl.hash);
        isBusy = false;
        return;
      }

      const levers = container.querySelectorAll('.lever-bar');

      gsap.set(container, { visibility: 'visible' });

      const transitionTl = gsap.timeline({
        onComplete: () => {
          gsap.set(container, { visibility: 'hidden' });
          isBusy = false;
          window.dispatchEvent(new Event('siddi:page-loader-exit-complete'));
        },
      });

      transitionTl
        // 1. Doors swing shut over the screen
        .fromTo(left, { rotateY: -100 }, { rotateY: 0, duration: 0.55, ease: 'power2.inOut' }, 0)
        .fromTo(right, { rotateY: 100 }, { rotateY: 0, duration: 0.55, ease: 'power2.inOut' }, 0)
        // 2. Brass lever handle depresses when meeting stiles latch
        .to(levers, { rotate: 32, duration: 0.16, ease: 'power2.out' }, 0.56)
        .to(levers, { rotate: 0, duration: 0.22, ease: 'power1.out' }, 0.72)
        // 3. Switch route behind closed doors
        .call(() => {
          navigate(destUrl.pathname + destUrl.search + destUrl.hash);
          window.scrollTo(0, 0);
        }, [], 0.76)
        // 4. Doors swing open onto the new page
        .to(left, { rotateY: -100, duration: 0.68, ease: 'power2.inOut' }, 0.95)
        .to(right, { rotateY: 100, duration: 0.68, ease: 'power2.inOut' }, 0.95);
    };

    document.addEventListener('click', handleLinkClick, true);
    return () => {
      document.removeEventListener('click', handleLinkClick, true);
    };
  }, [navigate, isNoLoad]);

  if (isNoLoad) return null;

  return (
    <div ref={containerRef} className="doors-transition" aria-hidden="true">
      {/* Left Door Leaf */}
      <div ref={leftDoorRef} className="door-leaf door-leaf--left">
        <div className="door-plate">
          <LeverIcon flip />
        </div>
      </div>

      {/* Right Door Leaf */}
      <div ref={rightDoorRef} className="door-leaf door-leaf--right">
        <div className="door-plate">
          <LeverIcon />
        </div>

        {/* Meeting Stile SIDDI Brand Mark */}
        <div className="door-mark">
          <img
            src="/siddi-logo.png"
            alt="SIDDI"
            className="w-24 sm:w-28 h-auto opacity-75"
          />
          <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#FFC400]/80 uppercase font-semibold">
            Solid Brass Foundry
          </span>
        </div>
      </div>
    </div>
  );
};
export default DoorTransition;
