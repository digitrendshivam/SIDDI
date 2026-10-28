import React, { useEffect, useState } from 'react';
import { ArrowUp, WhatsappLogo } from '@phosphor-icons/react';
import { getLenis } from '../../lib/motion';

export const FloatingActions: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setShowBackToTop(window.scrollY > 400);
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  const backToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 0.8 });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  const whatsappNumber = '919428161116';
  const whatsappMessage = encodeURIComponent('Hello SIDDI, I would like to contact the trade desk.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact SIDDI on WhatsApp"
        className="floating-whatsapp"
      >
        <WhatsappLogo size={20} weight="regular" aria-hidden="true" />
      </a>
      {showBackToTop && (
        <button
          type="button"
          aria-label="Back to top"
          title="Back to top"
          onClick={backToTop}
          className="floating-back-to-top"
        >
          <ArrowUp size={20} weight="bold" aria-hidden="true" />
        </button>
      )}
    </>
  );
};
