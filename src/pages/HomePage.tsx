import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { BentoCollectionGrid } from '../components/home/BentoCollectionGrid';
import { FinishOptionsSection } from '../components/home/FinishOptionsSection';
import { TradeProcess } from '../components/home/TradeProcess';
import { ProductGrid } from '../components/products/ProductGrid';
import { Button } from '../components/common/Button';
import { Meta } from '../components/common/Meta';
import { Container } from '../components/layout/Layout';
import { DEMO_PRODUCTS } from '../data/products';

export const HomePage: React.FC = () => {
  const featuredProducts = DEMO_PRODUCTS.filter((product) => product.featured).slice(0, 4);

  return (
    <div className="home-page">
      <Meta
        title="SIDDI — Architectural Hardware for Trade"
        description="Architectural door hardware and bathroom fittings for architects, builders and dealers. Send a door schedule to request a product takeoff."
      />

      <div className="home-cinematic">
        <HeroSection />
        <div className="home-scroll-card">
          {/* Asymmetric Bento Collection Grid Section */}
          <BentoCollectionGrid />
    
          <section className="home-section home-featured" aria-labelledby="home-featured-title">
            <Container className="home-container">
              <header className="home-section__header">
                <div><h2 id="home-featured-title">Featured products.</h2></div>
                <Button to="/products" variant="outline" withArrow>View all products</Button>
              </header>
              <ProductGrid products={featuredProducts} columns={4} />
            </Container>
          </section>
    
          {/* Premium Finish Options Section */}
          <FinishOptionsSection />
        </div>
      </div>

      {/* Trade Process on main black background page after card */}
      <TradeProcess />
    </div>
  );
};
