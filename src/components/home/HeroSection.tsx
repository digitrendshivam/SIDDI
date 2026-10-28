import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import { Button } from '../common/Button';
import { Container } from '../layout/Layout';

const heroLinks = [
  { number: '01', title: 'Explore products', text: <>View detailed specifications.</>, to: '/products', img:'/Brushed Metal Door Lever Handle.png' },
  { number: '02', title: 'Download CAD / BIM', text: <>Get technical drawings, CAD files and BIM models.</>, to: '/resources', img:'/DWG and RVT File Icons.png' },
  { number: '03', title: 'Send a door schedule', text: <>Share your project requirements.</>, to: '/trade-desk?type=door-takeoff', img:'/Bold Folded Document Icon.png' },
  { number: '04', title: 'Get samples', text: <>Evaluate finishes and quality.</>, to: '/trade-desk?type=sample-box', img:'/Stacked Wood, Metal, and Stone Samples.png' },
  { number: '05', title: 'Request a quote', text: <>Get pricing for your project.</>, to: '/trade-desk?type=contract-supply', img:'/Black and White Chat Bubble Icon.png' },
];

export const HeroSection: React.FC = () => (
  <section className="home-hero" aria-labelledby="home-hero-title">
    <div className="home-hero__backdrop" aria-hidden="true" />
    <Container className="home-hero__inner">
      <div className="home-hero__content">
        <h1 id="home-hero-title"><span className="home-hero__title-line">Built for</span><span className="home-hero__title-line">Better Spaces.</span></h1>
        <p className="home-hero__description">Architectural door hardware and bathroom fittings. Made in Rajkot, India, for architects, designers, builders and dealers.</p>
        <div className="home-hero__actions">
          <Button to="/trade-desk?type=door-takeoff" variant="primary" withArrow>Send a door schedule</Button>
          <Button to="/trade-desk?type=contract-supply" variant="outline">Request a quote</Button>
        </div>
        <div className="home-hero__stats" aria-label="SIDDI at a glance">
          <div><strong>500+</strong><span>Product SKUs</span></div>
          <div><strong>60+</strong><span>Finish options</span></div>
          <div><strong>10,000+</strong><span>Projects supplied</span></div>
        </div>
      </div>

      <nav className="home-hero__links" aria-label="Quick links">
        {heroLinks.map(({ number, title, text, to, img }) => (
          <Link to={to} className="home-hero__link" key={number}>
            <img className="home-hero__quick-art" src={img} alt="" aria-hidden="true" loading="lazy" />
            <span className="home-hero__link-number mono-label">{number}</span>
            <span className="home-hero__link-title">{title}</span>
            <span className="home-hero__link-text">{text}</span>
            <ArrowRight className="home-hero__link-arrow" size={27} aria-hidden="true" />
          </Link>
        ))}
      </nav>
    </Container>
  </section>
);
