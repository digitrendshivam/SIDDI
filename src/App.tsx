import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { ScrollToTop } from './components/common/ScrollToTop';
import { DoorTransition } from './components/common/DoorTransition';

import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { TradeDeskPage } from './pages/TradeDeskPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) return;

    let observer: IntersectionObserver | undefined;
    let frame = 0;
    let revealRecoveryFrame = 0;
    let onLoaderExit: (() => void) | undefined;
    let onScrollRevealRecovery: (() => void) | undefined;
    frame = window.requestAnimationFrame(() => {
      const targets = new Set<HTMLElement>();
      const textTargets = new Set<HTMLElement>();
      const sections = Array.from(document.querySelectorAll<HTMLElement>('main section'));
      const cardSelector = 'article, .home-application, .home-collection, .product-card, .trade-desk-faq__list details, .trade-desk-aside__card';

      sections.forEach((section, sectionIndex) => {
        section.querySelectorAll<HTMLElement>('h1, h2, h3, section > p, .trade-desk-faq__intro').forEach((element, textIndex) => {
          element.dataset.revealKind = 'text';
          element.dataset.textReveal = 'hidden';
          element.dataset.textStyle = ['rise', 'left', 'soft'][sectionIndex % 3];
          element.style.setProperty('--text-reveal-delay', `${Math.min(textIndex * 70, 210)}ms`);
          textTargets.add(element);
          targets.add(element);
        });
        section.querySelectorAll<HTMLElement>(cardSelector).forEach((element, itemIndex) => {
          element.dataset.revealKind = 'card';
          element.dataset.itemReveal = 'hidden';
          element.style.setProperty('--item-reveal-delay', `${Math.min(itemIndex * 90, 360)}ms`);
          targets.add(element);
        });
      });

      document.querySelectorAll<HTMLElement>('main h1, main h2, main h3, main .trade-desk-faq__intro').forEach((element, textIndex) => {
        if (textTargets.has(element)) return;
        element.dataset.revealKind = 'text';
        element.dataset.textReveal = 'hidden';
        element.dataset.textStyle = ['rise', 'left', 'soft'][textIndex % 3];
        element.style.setProperty('--text-reveal-delay', `${Math.min(textIndex * 60, 180)}ms`);
        targets.add(element);
      });

      const heroRoots = new Set(document.querySelectorAll<HTMLElement>('main .page-hero, main .home-hero, main .trade-desk-hero, main .catalogue__head, main .product-detail__overview, main .not-found'));
      heroRoots.forEach((element) => {
        element.dataset.revealKind = 'hero';
        element.dataset.heroReveal = 'hidden';
        targets.add(element);

        element.querySelectorAll<HTMLElement>('h1, p, .home-hero__actions, .home-hero__stage-caption').forEach((textElement, index) => {
          textElement.dataset.revealKind = 'text';
          textElement.dataset.textReveal = 'hidden';
          textElement.dataset.textStyle = index === 0 ? 'rise' : index % 2 ? 'left' : 'soft';
          textElement.style.setProperty('--text-reveal-delay', `${Math.min(120 + index * 130, 510)}ms`);
          textTargets.add(textElement);
          targets.add(textElement);
        });
      });

      const heroMedia = new Set(document.querySelectorAll<HTMLElement>('main .page-hero img, main .home-hero__stage, main .trade-desk-hero img, main .catalogue__head img, main .product-detail__overview .product-gallery'));
      heroMedia.forEach((element) => {
        element.dataset.revealKind = 'media';
        element.dataset.mediaReveal = 'hidden';
        element.style.setProperty('--media-reveal-delay', '180ms');
        targets.add(element);
      });

      document.querySelectorAll<HTMLElement>('.about-page .space-y-5 > p').forEach((element, index) => {
        element.dataset.revealKind = 'text';
        element.dataset.textReveal = 'hidden';
        element.dataset.textStyle = index % 2 ? 'left' : 'rise';
        element.style.setProperty('--text-reveal-delay', `${index * 160}ms`);
        textTargets.add(element);
        targets.add(element);
      });

      document.querySelectorAll<HTMLElement>('.catalogue-filter > *').forEach((element, index) => {
        element.dataset.revealKind = 'card';
        element.dataset.itemReveal = 'hidden';
        element.style.setProperty('--item-reveal-delay', `${index * 100}ms`);
        targets.add(element);
      });

      document.querySelectorAll<HTMLElement>('.trade-desk-form .trade-desk-types legend').forEach((element) => {
        element.dataset.revealKind = 'text';
        element.dataset.textReveal = 'hidden';
        element.dataset.textStyle = 'rise';
        element.style.setProperty('--text-reveal-delay', '0ms');
        textTargets.add(element);
        targets.add(element);
      });

      document.querySelectorAll<HTMLElement>('.trade-desk-form .trade-desk-types button, .trade-desk-form__fields > .trade-desk-field, .trade-desk-form .trade-desk-upload, .trade-desk-form .trade-desk-consent, .trade-desk-form .trade-desk-submit').forEach((element, index) => {
        element.dataset.revealKind = 'card';
        element.dataset.itemReveal = 'hidden';
        element.style.setProperty('--item-reveal-delay', `${Math.min(80 + index * 65, 600)}ms`);
        targets.add(element);
      });

      document.querySelectorAll<HTMLElement>('.site-footer__brand-block, .site-footer__group, .site-footer__contact').forEach((element, itemIndex) => {
        element.dataset.revealKind = 'card';
        element.dataset.itemReveal = 'hidden';
        element.style.setProperty('--item-reveal-delay', `${itemIndex * 90}ms`);
        targets.add(element);
      });

      let hasStarted = false;
      let fallbackTimer: ReturnType<typeof setTimeout> | undefined;

      const startRevealObserver = () => {
        if (hasStarted) return;
        hasStarted = true;
        if (fallbackTimer) clearTimeout(fallbackTimer);

        const revealedTargets = new WeakSet<HTMLElement>();
        const setTargetState = (element: HTMLElement, state: 'shown' | 'hidden') => {
          if (element.dataset.revealKind === 'text') element.dataset.textReveal = state;
          if (element.dataset.revealKind === 'card') element.dataset.itemReveal = state;
          if (element.dataset.revealKind === 'hero') element.dataset.heroReveal = state;
          if (element.dataset.revealKind === 'media') element.dataset.mediaReveal = state;
        };

        observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            const element = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              revealedTargets.add(element);
              setTargetState(element, 'shown');
              observer?.unobserve(element);
            }
          });
        }, { threshold: 0.05, rootMargin: '0px 0px 80px 0px' });

        targets.forEach((element) => {
          const bounds = element.getBoundingClientRect();
          if (bounds.top < window.innerHeight + 80) {
            revealedTargets.add(element);
            setTargetState(element, 'shown');
          } else {
            observer?.observe(element);
          }
        });

        // Recovery scroll listener
        onScrollRevealRecovery = () => {
          if (revealRecoveryFrame) return;
          revealRecoveryFrame = window.requestAnimationFrame(() => {
            revealRecoveryFrame = 0;
            targets.forEach((element) => {
              if (revealedTargets.has(element)) return;
              const bounds = element.getBoundingClientRect();
              if (bounds.top < window.innerHeight + 80) {
                revealedTargets.add(element);
                setTargetState(element, 'shown');
                observer?.unobserve(element);
              }
            });
          });
        };
        window.addEventListener('scroll', onScrollRevealRecovery, { passive: true });
      };

      if (window.location.search.includes('noload')) {
        startRevealObserver();
      } else {
        onLoaderExit = startRevealObserver;
        window.addEventListener('siddi:page-loader-exit-complete', onLoaderExit, { once: true });
        fallbackTimer = setTimeout(startRevealObserver, 1500);
      }
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(revealRecoveryFrame);
      if (onLoaderExit) window.removeEventListener('siddi:page-loader-exit-complete', onLoaderExit);
      if (onScrollRevealRecovery) window.removeEventListener('scroll', onScrollRevealRecovery);
      observer?.disconnect();
    };
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      {/* 3D Double-Door Architectural Page Transition with Rotating Brass Lever */}
      <DoorTransition />
      <Layout>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:category" element={<ProductsPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/applications" element={<Navigate to="/products" replace />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/trade-desk" element={<TradeDeskPage />} />
          <Route path="/contact" element={<TradeDeskPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
