import React, { useState } from 'react';
import './MobileFlow.css';

export default function MobileProductDetail({ product, onBack, onAddToCart, onNavigateToBag }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  if (!product) return null;

  const productSizes = Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes : ["S", "M", "L", "XL"];
  const images = product.images && product.images.length > 0 ? product.images : [product.image || '/dress1.png', "/dress2.png", "/dress3.png", "/dress4.png"];
  const discountAmt = product.discount || (product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0);

  const handleNextImage = () => setActiveImageIndex((prev) => (prev + 1) % images.length);
  const handlePrevImage = () => setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  
  const toggleAccordion = (section) => setActiveAccordion(activeAccordion === section ? null : section);

  const handleAddToBag = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    onAddToCart({ ...product, selectedSize, quantity: 1 });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    onAddToCart({ ...product, selectedSize, quantity: 1 });
    onNavigateToBag(); // Redirects to cart immediately
  };

  return (
    <div style={{ backgroundColor: '#000000', color: '#FFFFFF', minHeight: '100vh', fontFamily: "'Inter', sans-serif", paddingBottom: '40px' }}>
      
      {/* 🚀 1. EXACT MOCKUP HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px', backgroundColor: '#000000', padding: '0 16px', position: 'sticky', top: 0, zIndex: 100 }}>
        <button 
          onClick={onBack} 
          style={{ background: 'transparent', color: '#FFF', border: '1px solid #D4AF37', borderRadius: '4px', padding: '6px 12px', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', cursor: 'pointer' }}
        >
          HOME
        </button>
        
        <img 
          src="/logo.png" 
          alt="1760 SATRASHE60" 
          style={{ height: '30px', objectFit: 'contain' }} 
        />
        
        {/* Sleek SVG Search Icon */}
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>

      {/* 🚀 2. MOCKUP IMAGE GALLERY */}
      <div style={{ display: 'flex', width: '100%', height: '65vh', padding: '16px', gap: '12px' }}>
        {/* Main Big Image */}
        <div style={{ flex: 1, position: 'relative', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#111' }}>
          <img 
            src={images[activeImageIndex]} 
            alt={product.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          {/* Pagination Pill (1 / 4) */}
          <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(0,0,0,0.7)', color: '#FFF', display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px', borderRadius: '24px', fontSize: '12px', fontWeight: '800' }}>
            <span onClick={handlePrevImage} style={{ cursor: 'pointer', fontSize: '14px' }}>‹</span>
            <span>{activeImageIndex + 1} / {images.length}</span>
            <span onClick={handleNextImage} style={{ cursor: 'pointer', fontSize: '14px' }}>›</span>
          </div>
        </div>

        {/* Right Side Thumbnails */}
        <div style={{ width: '70px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }} className="hide-scrollbar">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => setActiveImageIndex(idx)}
              style={{ 
                width: '70px', 
                height: '85px', 
                borderRadius: '8px', 
                overflow: 'hidden',
                border: activeImageIndex === idx ? '2px solid #D4AF37' : '2px solid transparent',
                opacity: activeImageIndex === idx ? 1 : 0.6,
                flexShrink: 0,
                cursor: 'pointer',
                backgroundColor: '#111'
              }}
            >
              <img src={img} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>

      {/* 🚀 3. PRODUCT INFO & PRICING */}
      <div style={{ padding: '0 16px', textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: '700', marginBottom: '6px' }}>
          {product.name}
        </h1>
        <p style={{ color: '#888888', fontSize: '12px', margin: 0 }}>
          Effortless style for everyday you.
        </p>
      </div>

      <div style={{ backgroundColor: '#050505', padding: '20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #1A1A1A', borderBottom: '1px solid #1A1A1A', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
          <span style={{ fontSize: '28px', fontWeight: '900', color: '#FFF' }}>₹{product.price}</span>
          {product.oldPrice && <span style={{ fontSize: '16px', color: '#666', textDecoration: 'line-through', fontWeight: '600' }}>₹{product.oldPrice}</span>}
        </div>
        {discountAmt > 0 && (
          <div style={{ border: '1px solid #D4AF37', color: '#D4AF37', fontSize: '12px', fontWeight: '800', padding: '6px 14px', borderRadius: '4px', letterSpacing: '0.5px' }}>
            {discountAmt}% OFF
          </div>
        )}
      </div>

      {/* 🚀 4. SIZE SELECTION */}
      <div style={{ padding: '0 16px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '12px', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase' }}>SELECT SIZE</span>
          <span style={{ fontSize: '11px', color: '#D4AF37', textDecoration: 'underline', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
            📏 Size Guide
          </span>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {productSizes.map(sz => {
            const isSelected = selectedSize === sz;
            return (
              <button
                key={sz}
                onClick={() => { setSelectedSize(sz); setSizeError(false); }}
                style={{ 
                  flex: '1 1 calc(25% - 12px)', 
                  padding: '14px 0', 
                  background: 'transparent', 
                  color: isSelected ? '#D4AF37' : '#FFF', 
                  border: isSelected ? '1px solid #D4AF37' : '1px solid #333', 
                  borderRadius: '4px', 
                  fontSize: '12px', 
                  fontWeight: '800',
                  transition: 'all 0.2s ease'
                }}
              >
                {sz}
              </button>
            );
          })}
        </div>
        {sizeError && <div style={{ color: '#FF3333', fontSize: '12px', marginTop: '10px', fontWeight: '600', textAlign: 'center' }}>Please select a size first.</div>}
      </div>

      {/* 🚀 5. MOCKUP ACTION BUTTONS */}
      <div style={{ display: 'flex', gap: '16px', padding: '0 16px', marginBottom: '30px' }}>
        <button 
          onClick={handleAddToBag}
          style={{ flex: 0.4, padding: '14px 0', background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '6px', fontSize: '12px', fontWeight: '800', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <span style={{ fontSize: '14px' }}>🛍️</span> ADD TO BAG
        </button>
        <button 
          onClick={handleBuyNow}
          style={{ flex: 0.6, padding: '14px 0', background: '#D4AF37', color: '#000000', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '900', letterSpacing: '1px' }}
        >
          BUY NOW
        </button>
      </div>

      {/* 🚀 6. FEATURES ROW */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 16px', backgroundColor: '#050505', borderTop: '1px solid #1A1A1A', borderBottom: '1px solid #1A1A1A', marginBottom: '30px' }}>
        {[
          { icon: '🍃', label: 'Premium\nFabric' },
          { icon: '🛡️', label: 'Comfort\nFit' },
          { icon: '🧥', label: 'Trendy\nDesign' },
          { icon: '🌟', label: 'Everyday\nWear' }
        ].map((feat, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', textAlign: 'center', flex: 1, borderRight: idx !== 3 ? '1px solid #222' : 'none' }}>
            <span style={{ fontSize: '20px' }}>{feat.icon}</span>
            <span style={{ fontSize: '10px', color: '#CCC', whiteSpace: 'pre-line', lineHeight: '1.4', fontWeight: '600' }}>{feat.label}</span>
          </div>
        ))}
      </div>

      {/* 🚀 7. DETAILS & DELIVERY ACCORDIONS */}
      <div style={{ padding: '0 16px' }}>
        {[
          { id: 'details', title: 'DETAILS', content: <ul style={{color: '#CCC', fontSize: '12px', lineHeight: '1.8', paddingLeft: '16px', margin: '0 0 16px 0'}}><li style={{marginBottom:'6px'}}><strong>Fabric:</strong> {product.fabric || 'Premium Blend'}</li><li style={{marginBottom:'6px'}}><strong>Fit:</strong> {product.fitShape || 'Regular Fit'}</li><li><strong>SKU:</strong> {(product.slug || "PRD").toUpperCase()}</li></ul> },
          { id: 'delivery', title: 'DELIVERY', content: <p style={{color: '#CCC', fontSize: '12px', lineHeight: '1.6', margin: '0 0 16px 0'}}>Fast Shipping available. Delivery usually within 3-5 business days across India.</p> }
        ].map((acc) => (
          <div key={acc.id} style={{ borderBottom: '1px solid #1A1A1A' }}>
            <button onClick={() => toggleAccordion(acc.id)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '20px 0', background: 'transparent', border: 'none', color: '#FFF', fontSize: '14px', fontWeight: '900', letterSpacing: '1px' }}>
              <span>{acc.title}</span> 
            </button>
            {activeAccordion === acc.id && <div>{acc.content}</div>}
          </div>
        ))}
      </div>

    </div>
  );
}