import { useState } from 'react';

export default function CheckoutModal({ cartItems = [], onClose, onOrderSuccess }) {
  const [step, setStep] = useState(1); // 1: Address & Details, 2: Coupon & Payment, 3: Success
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  
  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  // Subtotal Calculation
  const subtotal = cartItems.reduce((acc, i) => acc + (Number(i.price) * (i.quantity || 1)), 0);
  const shippingFee = subtotal >= 500 ? 0 : 50;
  const grandTotal = Math.max(0, subtotal - appliedDiscount + shippingFee);

  // Valid Coupons List (Can be managed via Admin later)
  const VALID_COUPONS = {
    'SATRA60': 60,
    'FIRST50': 50,
    'WELCOME100': 100
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (VALID_COUPONS[cleanCode]) {
      const disc = VALID_COUPONS[cleanCode];
      setAppliedDiscount(disc);
      setCouponMessage(`✓ Coupon "${cleanCode}" applied successfully! ₹${disc} off.`);
    } else {
      setAppliedDiscount(0);
      setCouponMessage(`✕ Invalid or expired coupon code.`);
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert("Please fill in all delivery details.");
      return;
    }

    try {
      const orderData = {
        customerName: name,
        customerPhone: phone,
        shippingAddress: address,
        totalAmount: grandTotal,
        paymentMethod: paymentMethod === 'COD' ? 'Cash On Delivery (COD)' : 'Online Payment (UPI/Card)',
        items: cartItems
      };

      // Yahan humne aapka WiFi wala IP aur sahi Port (5001) daala hai
      // Isse mobile aur laptop dono se order direct aapke Database mein jayega!
      const response = await fetch('https://satrashe60-ecommerce.onrender.com](https://satrashe60-ecommerce.onrender.com/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        if (onOrderSuccess) {
          onOrderSuccess(orderData);
        }
        setStep(3); // Success screen dikhayega
      } else {
        alert("Failed to save order in database. Please try again.");
      }
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Error connecting to server. Is your backend running?");
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        maxWidth: '520px',
        width: '100%',
        overflow: 'hidden',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
        border: '1px solid #111'
      }}>
        {/* MODAL HEADER */}
        <div style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: '900', fontSize: '14px', letterSpacing: '1px' }}>
            SECURE CHECKOUT — SATRASHE60
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '18px', cursor: 'pointer' }}>✕</button>
        </div>

        {/* MODAL BODY */}
        <div style={{ padding: '24px' }}>
          {step === 1 ? (
            <form onSubmit={(e) => { e.preventDefault(); if(!name || !phone || !address) { alert('Fill details'); return; } setStep(2); }} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '900', margin: '0 0 4px 0', textTransform: 'uppercase' }}>1. Shipping Address & Contact</h3>
              
              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', display: 'block', marginBottom: '4px' }}>Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Akash Muttewar" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', display: 'block', marginBottom: '4px' }}>Mobile Phone (for delivery updates) *</label>
                <input 
                  type="tel" 
                  required
                  placeholder="+91 98201 23456" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', display: 'block', marginBottom: '4px' }}>Complete Delivery Address *</label>
                <textarea 
                  rows="3"
                  required
                  placeholder="House/Flat No., Street, Landmark, City, Pincode" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ width: '100%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <button 
                type="submit" 
                style={{ backgroundColor: '#FF6B00', color: '#FFFFFF', padding: '14px', border: 'none', fontWeight: '900', fontSize: '12px', cursor: 'pointer', borderRadius: '4px', marginTop: '10px', letterSpacing: '1px' }}
              >
                PROCEED TO PAYMENT →
              </button>
            </form>
          ) : step === 2 ? (
            <form onSubmit={handleFinalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '900', margin: 0, textTransform: 'uppercase' }}>2. Coupon & Payment</h3>
                <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#3B82F6', fontSize: '11px', fontWeight: '800', cursor: 'pointer' }}>← Edit Address</button>
              </div>

              {/* COUPON BOX */}
              <div style={{ backgroundColor: '#F9FAFB', padding: '14px', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
                <label style={{ fontSize: '11px', fontWeight: '800', display: 'block', marginBottom: '6px' }}>HAVE A COUPON CODE? (Try: SATRA60)</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text"
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    style={{ flex: 1, padding: '8px 10px', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '12px', textTransform: 'uppercase', fontWeight: '800' }}
                  />
                  <button 
                    type="button"
                    onClick={handleApplyCoupon}
                    style={{ backgroundColor: '#0A0A0A', color: '#FFF', border: 'none', padding: '8px 14px', borderRadius: '4px', fontSize: '11px', fontWeight: '800', cursor: 'pointer' }}
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <div style={{ fontSize: '11px', fontWeight: '800', marginTop: '6px', color: appliedDiscount > 0 ? '#10B981' : '#EF4444' }}>
                    {couponMessage}
                  </div>
                )}
              </div>

              {/* PRICE SUMMARY */}
              <div style={{ backgroundColor: '#F3F4F6', padding: '14px', borderRadius: '6px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Bag Subtotal:</span>
                  <span style={{ fontWeight: '700' }}>₹{subtotal}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981', fontWeight: '800' }}>
                    <span>Coupon Discount:</span>
                    <span>-₹{appliedDiscount}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Shipping Fee:</span>
                  <span style={{ fontWeight: '700' }}>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #D1D5DB', paddingTop: '8px', fontWeight: '900', fontSize: '15px' }}>
                  <span>Total Payable:</span>
                  <span style={{ color: '#FF6B00' }}>₹{grandTotal}</span>
                </div>
              </div>

              {/* PAYMENT MODE */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', display: 'block', marginBottom: '6px' }}>PAYMENT METHOD</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <label style={{ flex: 1, border: paymentMethod === 'COD' ? '2px solid #FF6B00' : '1px solid #D1D5DB', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '800', textAlign: 'center', backgroundColor: paymentMethod === 'COD' ? '#FFF4EC' : '#FFF' }}>
                    <input type="radio" name="pay" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} style={{ marginRight: '6px' }} />
                    Cash On Delivery
                  </label>
                  <label style={{ flex: 1, border: paymentMethod === 'ONLINE' ? '2px solid #FF6B00' : '1px solid #D1D5DB', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '800', textAlign: 'center', backgroundColor: paymentMethod === 'ONLINE' ? '#FFF4EC' : '#FFF' }}>
                    <input type="radio" name="pay" checked={paymentMethod === 'ONLINE'} onChange={() => setPaymentMethod('ONLINE')} style={{ marginRight: '6px' }} />
                    UPI / Card / NetBanking
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                style={{ backgroundColor: '#FF6B00', color: '#FFFFFF', padding: '14px', border: 'none', fontWeight: '900', fontSize: '12px', cursor: 'pointer', borderRadius: '4px', letterSpacing: '1px' }}
              >
                PLACE ORDER (₹{grandTotal}) →
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <div style={{ fontSize: '42px', marginBottom: '10px' }}>🎉</div>
              <h3 style={{ fontSize: '18px', fontWeight: '900', margin: '0 0 6px 0' }}>ORDER PLACED SUCCESSFULLY!</h3>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '20px' }}>Your order has been recorded and synchronized with the Admin Supplier Hub.</p>
              <button 
                onClick={onClose}
                style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '12px 24px', border: 'none', fontWeight: '800', fontSize: '12px', cursor: 'pointer', borderRadius: '4px' }}
              >
                CONTINUE SHOPPING
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}