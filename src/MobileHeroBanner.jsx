import React, { useState, useEffect } from 'react';
import './MobileHeroBanner.css';

const HERO_BANNERS = [
  {
    id: 'banner-1',
    image: '/hero.png', 
    label: 'STREET FASHION DELIVERED ACROSS INDIA',
    title: 'ONE PIECE.\nONE CHANCE.',
    subtitle: "Every piece is unique.\nNo restock once it's gone.",
    ctaText: 'SHOP NEW DROP →',
    ctaLink: 'home', 
    tag: 'NO RESTOCK',
    thumbnails: ['/dress1.png', '/dress2.png', '/dress3.png']
  },
  {
    id: 'banner-2',
    image: '/dress4.png', 
    label: 'LIMITED TIME ONLY',
    title: 'THE SUMMER\nEDIT',
    subtitle: 'Premium Co-ords & Lightweight Linen.',
    ctaText: 'EXPLORE COLLECTION →',
    ctaLink: 'collections',
    tag: 'PRICE DROP',
    thumbnails: []
  },
  {
    id: 'banner-3',
    image: '/dress2.png',
    label: 'STREETWEAR CLASSICS',
    title: 'OVERSIZED\nCULTURE',
    subtitle: 'Heavyweight cotton tees made for the streets.',
    ctaText: 'SHOP TOPS →',
    ctaLink: 'shop',
    tag: 'ONLY FEW LEFT',
    thumbnails: ['/dress1.png']
  }
];

export default function MobileHeroBanner({ navigateTo }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === HERO_BANNERS.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, currentSlide]);

  const handleTouchStart = (e) => {
    setIsPaused(true);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev === HERO_BANNERS.length - 1 ? 0 : prev + 1));
    }
    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev === 0 ? HERO_BANNERS.length - 1 : prev - 1));
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section 
      className="mobile-hero-section"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 🚀 NUCLEAR FIX: Yeh internal CSS us purani file ki saari galat settings ko destroy kar degi */}
      <style>{`
        .mobile-hero-section {
          height: auto !important; 
          min-height: unset !important;
          padding: 0 !important;
          margin: 0 !important;
          background: #000;
        }
        .hero-slider-track {
          height: auto !important; 
          display: flex !important;
          align-items: flex-start !important;
        }
        .hero-slide {
          height: auto !important; 
          min-height: unset !important;
          position: relative !important;
          display: block !important;
        }
        /* Yahan humne image ko background hone se rok diya aur actual full size lene diya */
        .hero-bg-image {
          position: relative !important; 
          height: auto !important; 
          width: 100% !important;
          max-height: none !important;
          object-fit: contain !important;
          display: block !important;
        }
        .hero-overlay {
          position: absolute !important;
          top: 0; left: 0; right: 0; bottom: 0;
          height: 100% !important;
        }
        .hero-content {
          position: absolute !important;
          bottom: 10% !important; /* Text ko image ke upar theek se set kiya */
          left: 0; right: 0;
          height: auto !important;
        }
      `}</style>

      <div 
        className="hero-slider-track"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {HERO_BANNERS.map((banner, index) => (
          <div className="hero-slide" key={banner.id}>
            
            {/* Background Image */}
            <img src={banner.image} alt={banner.title} className="hero-bg-image" loading={index === 0 ? "eager" : "lazy"} />
            
            {/* Gradient Overlay */}
            <div className="hero-overlay"></div>

            {/* Content Container */}
            <div className="hero-content">
              <h2 className="hero-main-heading">
                {banner.title.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </h2>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
}