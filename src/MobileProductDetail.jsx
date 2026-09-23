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

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const handlePincodeCheck = () => {
    if (pincode.length === 6) {
      if (pincode === '411045') { 
        setDeliveryMessage('Fast Shipping within 24 HRS. Deliver by Tomorrow.');
      } else {
        setDeliveryMessage('Delivery available in 3-5 business days.');
      }
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

  if (!product) return null;

  return (
    <div className="mobile-page-container">
      {/* HEADER */}
      <div className="mobile-product-header">
        <button onClick={onBack} className="icon-btn" style={{fontSize: '24px'}}>‹</button>
        <div className="header-actions">
          <button className="icon-btn">♡</button>
          <button className="icon-btn">📤</button>
        </div>
      </div>

      {/* PRODUCT MEDIA */}
      <div className="mobile-product-image-container">
        <img src={product.image} alt={product.name} className="product-main-image" />
      </div>

      {/* PRODUCT INFO */}
      <div className="mobile-product-info">
        <h1 className="product-title">{product.name}</h1>
        <div className="price-row">
          <span className="current-price">₹{product.price}</span>
          {product.oldPrice && <span className="old-price">₹{product.oldPrice}</span>}
          {product.discount > 0 && <span className="discount-badge">{product.discount}% OFF</span>}
        </div>
        {product.stock === 1 && (
          <div className="stock-warning" style={{color: '#FF6B00', fontSize: '12px', fontWeight: 'bold', marginTop: '4px'}}>
            Only 1 left in stock!
          </div>
        )}
      </div>

      {/* SIZE SELECTION */}
      <div className="mobile-section size-section">
        <h3 className="section-title text-center" style={{fontSize: '14px', marginBottom: '12px'}}>SELECT A SIZE</h3>
        <div className="size-grid">
          {product.sizes.map((size) => {
            const isAvailable = product.sizeInventory[size] > 0;
            return (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? 'selected' : ''} ${!isAvailable ? 'disabled' : ''}`}
                disabled={!isAvailable}
                onClick={() => {
                  setSelectedSize(size);
                  setShowSizeError(false);
                }}
              >
                {size}
              </button>
            );
          })}
        </div>
        {showSizeError && <div className="error-text text-center mt-2" style={{color: 'red', fontSize: '12px'}}>Please select a size to continue.</div>}
      </div>

      <hr className="divider" />

      {/* ACCORDIONS */}
      <div className="accordions-container">
        {/* DETAILS */}
        <div className="accordion-item">
          <button className="accordion-header" onClick={() => toggleAccordion('details')}>
            <span>DETAILS</span> <span>{activeAccordion === 'details' ? '−' : '+'}</span>
          </button>
          {activeAccordion === 'details' && (
            <div className="accordion-content">
              <ul className="details-list" style={{listStyle: 'none', padding: 0, margin: 0}}>
                <li style={{marginBottom: '6px'}}><strong>Fabric:</strong> {product.fabric}</li>
                <li style={{marginBottom: '6px'}}><strong>Fit:</strong> {product.fitShape}</li>
                <li style={{marginBottom: '6px'}}><strong>Pattern:</strong> {product.pattern}</li>
                <li style={{marginBottom: '6px'}}><strong>Neck:</strong> {product.neckCollar}</li>
                <li style={{marginBottom: '6px'}}><strong>SKU:</strong> {product.slug.toUpperCase()}</li>
              </ul>
            </div>
          )}
        </div>

        {/* DELIVERY */}
        <div className="accordion-item">
          <button className="accordion-header" onClick={() => toggleAccordion('delivery')}>
            <span>DELIVERY</span> <span>{activeAccordion === 'delivery' ? '−' : '+'}</span>
          </button>
          {activeAccordion === 'delivery' && (
            <div className="accordion-content">
              <div className="pincode-checker">
                <input 
                  type="number" 
                  placeholder="Enter Pincode" 
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="pincode-input"
                />
                <button onClick={handlePincodeCheck} className="pincode-btn">CHECK</button>
              </div>
              {deliveryMessage && <p className="delivery-message" style={{marginTop: '8px', fontSize: '12px'}}>{deliveryMessage}</p>}
            </div>
          )}
        </div>

        {/* RETURNS */}
        <div className="accordion-item">
          <button className="accordion-header" onClick={() => toggleAccordion('returns')}>
            <span>RETURNS</span> <span>{activeAccordion === 'returns' ? '−' : '+'}</span>
          </button>
          {activeAccordion === 'returns' && (
            <div className="accordion-content policy-text">
              <p style={{marginBottom: '8px'}}><strong>Return Window:</strong> Raise a request within 3 days of delivery.</p>
              <p style={{marginBottom: '8px'}}><strong>Return Fee:</strong> ₹49 return handling & reverse-pickup fee will be deducted for eligible returns.</p>
              <p><strong>Conditions:</strong> Product must be unused, unwashed, with tags intact.</p>
            </div>
          )}
        </div>
      </div>

      {/* YOU MAY ALSO LIKE SECTION */}
      <div style={{ marginTop: '30px', paddingBottom: '40px' }}>
        <h3 style={{ textAlign: 'center', fontSize: '16px', fontWeight: '800', marginBottom: '20px' }}>YOU MAY ALSO LIKE</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '0 16px' }}>
          {MASTER_PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map((suggestedProduct, index) => (
            <div key={index} style={{ cursor: 'pointer' }}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={suggestedProduct.image} 
                  alt={suggestedProduct.name} 
                  style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '4px' }} 
                />
                <button style={{ position: 'absolute', top: '8px', right: '8px', background: 'none', border: 'none', fontSize: '20px' }}>♡</button>
              </div>
              <h4 style={{ fontSize: '12px', color: '#111', margin: '8px 0 4px 0', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {suggestedProduct.name}
              </h4>
              <div style={{ fontSize: '13px', fontWeight: '700' }}>₹{suggestedProduct.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* STICKY BOTTOM CTA */}
      <div className="sticky-bottom-cta">
        {isAddedToBag ? (
          <div className="added-confirmation" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
            <div style={{ fontSize: '13px', color: '#333', lineHeight: '1.4' }}>
              <span style={{ fontWeight: '600' }}>Added to bag!</span><br />
              FREE 1-2 day delivery on 5k+ pincodes
            </div>
            <button 
              className="black-btn view-bag-btn" 
              onClick={onNavigateToBag}
              style={{ padding: '14px 20px', whiteSpace: 'nowrap' }}
            >
              VIEW BAG
            </button>
          </div>
        ) : (
          <button 
            className={`black-btn full-width ${!selectedSize ? 'disabled-cta' : ''}`}
            onClick={handleAddToBag}
          >
            ADD TO BAG
          </button>
        )}
      </div>
    </div>
  );
}