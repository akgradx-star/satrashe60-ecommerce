import React, { useState } from 'react';
import './MobileFlow.css';
import { MASTER_PRODUCTS } from './Shop';

export default function MobileProductDetail({ product, onBack, onAddToCart, onNavigateToBag }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [pincode, setPincode] = useState('');
  const [deliveryMessage, setDeliveryMessage] = useState('');
  const [isAddedToBag, setIsAddedToBag] = useState(false);
  const [showSizeError, setShowSizeError] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  const productSizes = Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes : ["XS", "S", "M", "L", "XL", "XXL"];
  const images = product.images && product.images.length > 0 ? product.images : [product.image || '/dress1.png', "/dress2.png", "/dress3.png"];
  const discountAmt = product.discount || (product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0);

  const toggleAccordion = (section) => setActiveAccordion(activeAccordion === section ? null : section);

  const handleNextImage = () => setActiveImageIndex((prev) => (prev + 1) % images.length);
  const handlePrevImage = () => setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const handlePincodeCheck = () => {
    if (pincode.length === 6) {
      if (pincode === '411045') setDeliveryMessage('Fast Shipping within 24 HRS. Deliver by Tomorrow.');
      else setDeliveryMessage('Delivery available in 3-5 business days.');
    } else {
      setDeliveryMessage('Please enter a valid 6-digit pincode.');
    }
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      setTimeout(() => setShowSizeError(false), 2000);
      return;
    }
    onAddToCart({ ...product, selectedSize, quantity: 1 });
    setIsAddedToBag(true);
  };

  return (
    <div style={{ backgroundColor: '#000000', color: '#FFFFFF', minHeight: '100vh', fontFamily: "'Inter', sans-serif", paddingBottom: '100px' }}>
      
      {/* 🚀 1. LUXURY HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', position: 'sticky', top: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 100, borderBottom: '1px solid #1A1A1A' }}>
        <button onClick={onBack} style={{ background: '#111', border: '1px solid #333', borderRadius: '50%', width: '36px', height: '36px', color: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px' }}>
          ←
        </button>
        <img src="/logo.png" alt="SATRASHE60" style={{ height: '28px', objectFit: 'contain' }} />
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ fontSize: '20px', color: '#FFF' }}>🔍</span>
          <div style={{ position: 'relative' }} onClick={onNavigateToBag}>
            <span style={{ fontSize: '20px', color: '#FFF' }}>🛍️</span>
            {isAddedToBag && <span style={{ position: 'absolute', top: '-4px', right: '-6px', background: '#D4AF37', color: '#000', fontSize: '10px', fontWeight: '900', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>}
          </div>
        </div>
      </div>

      {/* 🚀 2. IMAGE GALLERY (Main + Right Thumbnails) */}
      <div style={{ display: 'flex', width: '100%', height: '60vh', padding: '15px 20px', gap: '12px' }}>
        <div style={{ flex: 1, position: 'relative', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#111' }}>
          <img src={images[activeImageIndex]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(0,0,0,0.7)', color: '#FFF', display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
            <span onClick={handlePrevImage} style={{ padding: '0 4px', cursor: 'pointer' }}>‹</span>
            <span>{activeImageIndex + 1} / {images.length}</span>
            <span onClick={handleNextImage} style={{ padding: '0 4px', cursor: 'pointer' }}>›</span>
          </div>
        </div>
        <div style={{ width: '65px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', scrollbarWidth: 'none' }}>
          {images.map((img, idx) => (
            <div 
              key={idx} onClick={() => setActiveImageIndex(idx)}
              style={{ width: '65px', height: '75px', borderRadius: '8px', overflow: 'hidden', border: activeImageIndex === idx ? '2px solid #D4AF37' : '1px solid #333', opacity: activeImageIndex === idx ? 1 : 0.6, flexShrink: 0, cursor: 'pointer' }}
            >
              <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>

      {/* 🚀 3. PRODUCT INFO */}
      <div style={{ padding: '24px 20px' }}>
        <div style={{ color: '#D4AF37', fontSize: '11px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>SATRASHE60</div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', fontWeight: '700', marginBottom: '8px' }}>{product.name}</h1>
        <p style={{ color: '#AAAAAA', fontSize: '13px', marginBottom: '20px' }}>Effortless style for everyday you.</p>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
          <span style={{ fontSize: '28px', fontWeight: '800' }}>₹{product.price}</span>
          {product.oldPrice && <span style={{ fontSize: '16px', color: '#666', textDecoration: 'line-through' }}>₹{product.oldPrice}</span>}
          {discountAmt > 0 && <span style={{ border: '1px solid #D4AF37', color: '#D4AF37', fontSize: '11px', fontWeight: '800', padding: '4px 10px', borderRadius: '16px' }}>{discountAmt}% OFF</span>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', marginBottom: '30px' }}>
          <span style={{ color: '#D4AF37', fontSize: '16px' }}>★</span>
          <span style={{ fontWeight: '800' }}>4.7</span>
          <span style={{ color: '#888' }}>(320+ reviews)</span>
        </div>

        {/* Features Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #222', borderBottom: '1px solid #222', padding: '20px 0', marginBottom: '30px' }}>
          {[
            { icon: '🍃', label: 'Premium\nFabric' },
            { icon: '🛡️', label: 'Comfort\nFit' },
            { icon: '🧥', label: 'Trendy\nDesign' },
            { icon: '🌟', label: 'Everyday\nWear' }
          ].map((feat, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center', flex: 1, borderRight: idx !== 3 ? '1px solid #222' : 'none' }}>
              <span style={{ fontSize: '20px', color: '#D4AF37' }}>{feat.icon}</span>
              <span style={{ fontSize: '10px', color: '#CCC', whiteSpace: 'pre-line', lineHeight: '1.4' }}>{feat.label}</span>
            </div>
          ))}
        </div>

        {/* Size Selection */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '1px' }}>SELECT SIZE</span>
            <span style={{ fontSize: '12px', color: '#D4AF37', textDecoration: 'underline' }}>📏 Size Guide</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {productSizes.map(sz => {
              const isSelected = selectedSize === sz;
              return (
                <button
                  key={sz}
                  onClick={() => { setSelectedSize(sz); setShowSizeError(false); }}
                  style={{ flex: '1 1 calc(33% - 10px)', padding: '12px 0', background: isSelected ? '#1A1A1A' : '#050505', color: isSelected ? '#D4AF37' : '#FFF', border: isSelected ? '1px solid #D4AF37' : '1px solid #333', borderRadius: '6px', fontSize: '13px', fontWeight: '800', transition: 'all 0.2s ease' }}
                >
                  {sz}
                </button>
              );
            })}
          </div>
          {showSizeError && <div style={{ color: '#FF3333', fontSize: '12px', marginTop: '10px', fontWeight: '600' }}>Please select a size first.</div>}
        </div>

        {/* 🚀 ACCORDIONS (Kept logic, changed style to Dark) */}
        <div style={{ borderTop: '1px solid #222' }}>
          {[
            { id: 'details', title: 'DETAILS', content: <ul style={{color: '#CCC', fontSize: '13px', lineHeight: '1.8'}}><li style={{marginBottom:'6px'}}><strong>Fabric:</strong> {product.fabric || 'Premium Blend'}</li><li style={{marginBottom:'6px'}}><strong>Fit:</strong> {product.fitShape || 'Regular Fit'}</li><li><strong>SKU:</strong> {(product.slug || "PRD").toUpperCase()}</li></ul> },
            { id: 'delivery', title: 'DELIVERY', content: <div><div style={{display:'flex', gap:'10px'}}><input type="number" placeholder="Enter Pincode" value={pincode} onChange={(e)=>setPincode(e.target.value)} style={{flex:1, padding:'10px', background:'#111', color:'#FFF', border:'1px solid #333', borderRadius:'4px'}}/><button onClick={handlePincodeCheck} style={{padding:'10px 16px', background:'#D4AF37', color:'#000', border:'none', borderRadius:'4px', fontWeight:'bold'}}>CHECK</button></div>{deliveryMessage && <p style={{color:'#D4AF37', fontSize:'12px', marginTop:'10px'}}>{deliveryMessage}</p>}</div> },
            { id: 'returns', title: 'RETURNS', content: <p style={{color: '#CCC', fontSize: '13px', lineHeight: '1.6'}}>Return within 3 days. ₹49 reverse-pickup fee applies. Must be unused with tags.</p> }
          ].map((acc) => (
            <div key={acc.id} style={{ borderBottom: '1px solid #222' }}>
              <button onClick={() => toggleAccordion(acc.id)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '16px 0', background: 'transparent', border: 'none', color: '#FFF', fontSize: '13px', fontWeight: '800', letterSpacing: '1px' }}>
                <span>{acc.title}</span> <span>{activeAccordion === acc.id ? '−' : '+'}</span>
              </button>
              {activeAccordion === acc.id && <div style={{ paddingBottom: '16px' }}>{acc.content}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* 🚀 4. FIXED BOTTOM ACTION BAR */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#0A0A0A', borderTop: '1px solid #222', padding: '16px 20px', display: 'flex', gap: '16px', zIndex: 100 }}>
        {isAddedToBag ? (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '12px', color: '#CCC' }}><span style={{ color: '#D4AF37', fontWeight: 'bold' }}>Added to bag!</span><br/>FREE 1-2 day delivery</div>
            <button onClick={onNavigateToBag} style={{ background: '#D4AF37', color: '#000', border: 'none', borderRadius: '8px', padding: '12px 24px', fontWeight: '900' }}>VIEW BAG</button>
          </div>
        ) : (
          <>
            <button onClick={() => setIsWishlisted(!isWishlisted)} style={{ width: '56px', height: '56px', background: '#000', border: '1px solid #444', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: isWishlisted ? '#D4AF37' : '#FFF' }}>
              {isWishlisted ? '♥' : '♡'}
            </button>
            <button onClick={handleAddToBag} style={{ flex: 1, height: '56px', background: '#D4AF37', color: '#000', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '900', letterSpacing: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>🛍️</span> ADD TO BAG
            </button>
          </>
        )}
      </div>
    </div>
  );
}