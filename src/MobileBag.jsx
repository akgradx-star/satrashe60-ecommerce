import React, { useState } from 'react';

export default function MobileBag({ cartItems, onBack, onUpdateQuantity, onRemoveItem, onProceedToAddress }) {
  const [qtyError, setQtyError] = useState('');

  // 🚀 Coupon States
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  // Math Logic
  const bagTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryCharge = bagTotal > 500 ? 0 : 49; 
  
  // 🚀 Apply Coupon Logic
  const handleApplyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    if (code === 'FLAT100') {
      setDiscountAmount(100);
      setCouponMessage('₹100 Off applied successfully! 🎉');
    } else if (code === 'SATRA50') {
      setDiscountAmount(50);
      setCouponMessage('₹50 Off applied successfully! 🎉');
    } else if (code === '') {
      setDiscountAmount(0);
      setCouponMessage('Please enter a coupon code.');
    } else {
      setDiscountAmount(0);
      setCouponMessage('Invalid coupon code!');
    }
  };

  const finalGrandTotal = Math.max(0, bagTotal + deliveryCharge - discountAmount);

  const handleQtyChange = (item, newQty) => {
    const availableStock = item.stock || 5; 
    
    if (newQty > availableStock) {
      setQtyError(`Only ${availableStock} available for ${item.name}`);
      setTimeout(() => setQtyError(''), 3000);
      return;
    }
    if (newQty < 1) return;
    onUpdateQuantity(item.id, item.selectedSize, newQty);
  };

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', color: '#FFF', fontFamily: "'Inter', sans-serif", paddingBottom: '100px' }}>
      
      {/* HEADER (Clean Design) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px', padding: '0 16px', position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(5,5,5,0.95)' }}>
        <button onClick={onBack} style={{ background: 'transparent', color: '#FFF', border: '1px solid #D4AF37', borderRadius: '4px', padding: '6px 12px', fontSize: '10px', fontWeight: '800', cursor: 'pointer' }}>HOME</button>
        <img src="/logo.png" alt="1760 SATRASHE60" style={{ height: '30px', objectFit: 'contain' }} />
        <div style={{ width: '50px' }}></div>
      </div>

      {/* PAGE TITLE & BANNER (Photo Removed) */}
      <div style={{ padding: '20px 16px 10px' }}>
        <div style={{ borderBottom: '1px solid #222', paddingBottom: '16px' }}>
            <h1 style={{ fontSize: '28px', fontFamily: "'Playfair Display', serif", color: '#D4AF37', margin: '0 0 5px 0' }}>My Cart</h1>
            <p style={{ fontSize: '10px', color: '#888', letterSpacing: '1px', margin: 0, textTransform: 'uppercase' }}>Your style, one step closer</p>
            <div style={{ height: '2px', width: '30px', backgroundColor: '#D4AF37', marginTop: '10px' }}></div>
        </div>
      </div>

      {/* BAG ITEMS */}
      <div style={{ padding: '16px' }}>
        {qtyError && <div style={{ color: '#ff4d4d', marginBottom: '10px', fontSize: '12px', textAlign: 'center' }}>{qtyError}</div>}
        
        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#888' }}>Your bag is empty</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cartItems.map((item, idx) => (
              <div key={idx} style={{ border: '1px solid #333', borderRadius: '8px', padding: '12px', display: 'flex', gap: '16px', backgroundColor: '#0a0a0a' }}>
                <img src={item.image} alt={item.name} style={{ width: '90px', height: '120px', objectFit: 'cover', borderRadius: '4px' }} />
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 'bold' }}>{item.name}</h4>
                      <button style={{ background: 'none', border: 'none', color: '#888', fontSize: '18px', cursor: 'pointer' }}>♡</button>
                    </div>
                    <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#888' }}>
                      Size: {item.selectedSize} <span style={{ margin: '0 5px' }}>|</span> {item.color || 'Standard'}
                    </p>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#D4AF37', marginBottom: '12px' }}>₹{item.price}</div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #333', borderRadius: '20px', overflow: 'hidden' }}>
                      <button onClick={() => handleQtyChange(item, item.quantity - 1)} style={{ background: 'transparent', border: 'none', color: '#FFF', padding: '4px 12px', fontSize: '16px', cursor: 'pointer' }}>-</button>
                      <span style={{ fontSize: '14px', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => handleQtyChange(item, item.quantity + 1)} style={{ background: 'transparent', border: 'none', color: '#FFF', padding: '4px 12px', fontSize: '16px', cursor: 'pointer' }}>+</button>
                    </div>
                    
                    <div style={{ width: '1px', height: '20px', backgroundColor: '#333' }}></div>
                    
                    <button onClick={() => onRemoveItem(idx)} style={{ background: 'none', border: 'none', color: '#888', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                      <span style={{ fontSize: '14px' }}>🗑</span> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🚀 COUPON SECTION */}
      {cartItems.length > 0 && (
        <div style={{ margin: '0 16px 20px' }}>
          <div 
            onClick={() => setShowCouponInput(!showCouponInput)}
            style={{ padding: '16px', border: '1px solid #333', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0a0a0a', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px', color: '#D4AF37' }}>🏷️</span>
                <div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#FFF' }}>Have a coupon code?</div>
                    <div style={{ fontSize: '11px', color: '#888' }}>Apply and get exciting offers</div>
                </div>
            </div>
            <span style={{ color: '#FFF', fontSize: '16px', transform: showCouponInput ? 'rotate(90deg)' : 'rotate(0deg)', transition: '0.3s' }}>›</span>
          </div>
          
          {showCouponInput && (
            <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="Enter Code (e.g. FLAT100)" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                style={{ flex: 1, padding: '10px 16px', borderRadius: '4px', border: '1px solid #333', background: '#111', color: '#FFF', textTransform: 'uppercase' }}
              />
              <button onClick={handleApplyCoupon} style={{ backgroundColor: '#D4AF37', color: '#000', border: 'none', padding: '0 20px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Apply</button>
            </div>
          )}
          {couponMessage && (
            <div style={{ marginTop: '8px', fontSize: '12px', color: discountAmount > 0 ? '#4CAF50' : '#ff4d4d', marginLeft: '4px' }}>
              {couponMessage}
            </div>
          )}
        </div>
      )}

      {/* PRICE DETAILS */}
      {cartItems.length > 0 && (
        <div style={{ margin: '0 16px 20px', padding: '20px', border: '1px solid #333', borderRadius: '8px', backgroundColor: '#0a0a0a' }}>
          <h3 style={{ fontSize: '18px', fontFamily: "'Playfair Display', serif", color: '#D4AF37', margin: '0 0 20px 0' }}>Price Details</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: '#CCC' }}>
            <span>Bag Total</span>
            <span>₹{bagTotal}</span>
          </div>
          
          {/* Coupon Discount Row */}
          {discountAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: '#4CAF50' }}>
              <span>Coupon Discount</span>
              <span>- ₹{discountAmount}</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '14px', color: '#CCC' }}>
            <span>Delivery Charges</span>
            <span>{deliveryCharge === 0 ? <span style={{ color: '#D4AF37' }}>FREE</span> : `₹${deliveryCharge}`}</span>
          </div>
          
          <div style={{ height: '1px', backgroundColor: '#333', marginBottom: '20px' }}></div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#D4AF37' }}>Grand Total</div>
                <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>(incl. of all taxes)</div>
            </div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#FFF' }}>₹{finalGrandTotal}</div>
          </div>
        </div>
      )}

      {/* BOTTOM CHECKOUT BAR */}
      {cartItems.length > 0 && (
        <div style={{ position: 'fixed', bottom: '60px', left: 0, right: 0, padding: '16px', backgroundColor: '#050505', borderTop: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 90 }}>
          <div>
            <div style={{ fontSize: '12px', color: '#888' }}>Total</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#FFF' }}>₹{finalGrandTotal}</div>
          </div>
          
          <button 
            onClick={onProceedToAddress}
            style={{ 
              backgroundColor: '#D4AF37', color: '#000', border: 'none', padding: '14px 24px', 
              borderRadius: '30px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            Proceed to Checkout <span>→</span>
          </button>
        </div>
      )}
    </div>
  );
}