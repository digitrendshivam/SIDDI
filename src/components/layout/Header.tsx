import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, X } from '@phosphor-icons/react';
import { Button } from '../common/Button';
import { pauseLenis, resumeLenis } from '../../lib/motion';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Resources', path: '/resources' },
  { label: 'About', path: '/about' },
  { label: 'Contact us', path: '/trade-desk' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    resumeLenis();
  }, [location.pathname]);

  const toggleMenu = () => {
    if (mobileMenuOpen) resumeLenis();
    else pauseLenis();
    setMobileMenuOpen((open) => !open);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    resumeLenis();
  };

  const isLinkActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/trade-desk' || path === '/contact') {
      return location.pathname === '/trade-desk' || location.pathname === '/contact';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
        <div className="site-header__inner spec-container">
          <Link to="/" className="site-header__brand" aria-label="SIDDI home">
            <img src="/siddi-logo.png" alt="SIDDI" width="1774" height="887" />
          </Link>
          <nav className="site-header__nav" aria-label="Main navigation">
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                aria-current={isLinkActive(path) ? 'page' : undefined}
                className="spec-link mono-label"
              >
                {label}
              </Link>
            ))}
          </nav>
          <Button to="/trade-desk" variant="primary" className="site-header__cta">
            Request a quote
          </Button>
          <button
            type="button"
            className="site-header__menu"
            onClick={toggleMenu}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X size={20} weight="regular" /> : <List size={20} weight="regular" />}
          </button>
        </div>
      </header>
      {mobileMenuOpen && (
        <div className="mobile-navigation" id="mobile-navigation">
          <nav aria-label="Mobile navigation">
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                onClick={closeMenu}
                aria-current={isLinkActive(path) ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
          <Button to="/trade-desk" variant="primary" className="mobile-navigation__cta" onClick={closeMenu}>
            Request a quote
          </Button>
        </div>
      )}
    </>
  );
};
