import React, { useState } from 'react';
import './MobileFlow.css';

export default function MobileBag({ cartItems, onBack, onUpdateQuantity, onRemoveItem, onProceedToAddress }) {
  const [qtyError, setQtyError] = useState('');

  // Math Logic
  const bagTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryCharge = bagTotal > 500 ? 0 : 49; 
  const grandTotal = bagTotal + deliveryCharge;

  const handleQtyChange = (item, newQty) => {
    // Inventory Check existing structure se
    const availableStock = item.stock || 1; 
    
    if (newQty > availableStock) {
      setQtyError(`Only ${availableStock} available for ${item.name}`);
      setTimeout(() => setQtyError(''), 3000);
      return;
    }
    onUpdateQuantity(item.id, item.selectedSize, newQty);
  };

  return (
    <div className="mobile-page-container bg-light">
      {/* HEADER */}
      <div className="mobile-header-premium sticky-top">
        <button onClick={onBack} className="icon-btn" style={{fontSize: '24px'}}>‹</button>
        <h2 className="header-title">BAG</h2>
        <button className="icon-btn">♡</button>
      </div>

      {/* BAG ITEMS */}
      <div className="bag-items-container" style={{padding: '16px'}}>
        {qtyError && <div className="toast-error" style={{color: 'red', marginBottom: '10px', fontSize: '12px'}}>{qtyError}</div>}
        
        {cartItems.length === 0 ? (
          <div className="empty-state text-center" style={{padding: '40px 0', color: '#888'}}>Your bag is empty</div>
        ) : (
          cartItems.map((item, idx) => (
            <div key={idx} className="bag-item-card" style={{border: '1px solid #eee'}}>
              <img src={item.image} alt={item.name} className="bag-item-img" />
              <div className="bag-item-details" style={{padding: '0 10px'}}>
                <h4 className="item-name" style={{margin: '0 0 4px 0', fontSize: '14px'}}>{item.name}</h4>
                <p className="item-meta" style={{margin: '0 0 10px 0', fontSize: '12px', color: '#666'}}>
                  Size: {item.selectedSize} | {item.color || 'Standard'}
                </p>
                <div className="item-controls">
                  <div className="qty-selector" style={{fontSize: '12px'}}>
                    QTY | 
                    <select 
                      value={item.quantity} 
                      onChange={(e) => handleQtyChange(item, parseInt(e.target.value))}
                      className="qty-dropdown"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <span className="item-price">₹{item.price * item.quantity}</span>
                </div>
                <div className="item-actions" style={{display: 'flex', justifyContent: 'space-between', marginTop: '12px'}}>
                  <button className="text-btn" style={{background:'none', border:'none', fontSize:'11px', fontWeight:'bold'}}>MOVE TO WISHLIST</button>
                  <button className="icon-btn remove-btn" onClick={() => onRemoveItem(idx)} style={{background:'none', border:'none'}}>🗑️</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PRICE DETAILS */}
      {cartItems.length > 0 && (
        <>
          <div className="price-details-card">
            <h3 className="section-title text-center mb-3" style={{fontSize:'14px', marginBottom: '16px'}}>PRICE DETAILS</h3>
            <div className="price-row">
              <span>Bag Total</span>
              <span>₹{bagTotal}</span>
            </div>
            <div className="price-row">
              <span>Delivery Charges</span>
              <span>{deliveryCharge === 0 ? <span className="free-text">FREE</span> : `₹${deliveryCharge}`}</span>
            </div>
            <hr className="divider my-2" style={{margin: '12px 0'}} />
            <div className="price-row grand-total">
              <span>Grand Total <br/><span className="tax-note" style={{fontSize: '10px', fontWeight:'normal', color: '#666'}}>(incl. of all taxes)</span></span>
              <span>₹{grandTotal}</span>
            </div>
          </div>

          <div className="sticky-bottom-cta bg-white">
            <button className="black-btn full-width uppercase" onClick={onProceedToAddress}>
              SELECT ADDRESS TO CONTINUE
            </button>
          </div>
        </>
      )}
    </div>
  );
}