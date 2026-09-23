import React, { useState } from 'react';
import './MobileFlow.css';

export default function MobileCheckout({ cartItems, onBack, onPlaceOrder }) {
  const [address, setAddress] = useState({ name: '', phone: '', address: '', pincode: '' });
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  // Total calculate karne ka logic
  const bagTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryCharge = bagTotal > 500 ? 0 : 49; 
  const grandTotal = bagTotal + deliveryCharge;

  const inputStyle = {
    width: '100%', padding: '14px', marginBottom: '12px',
    border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px', outline: 'none'
  };

  const handleOrderSubmit = () => {
    if (!address.name || !address.phone || !address.address || !address.pincode) {
      alert("Please fill all address details!");
      return;
    }
    onPlaceOrder(address, paymentMethod, grandTotal);
  };

  return (
    <div className="mobile-page-container bg-light" style={{ paddingBottom: '120px' }}>
      {/* HEADER */}
      <div className="mobile-header-premium sticky-top">
        <button onClick={onBack} className="icon-btn" style={{fontSize: '24px'}}>‹</button>
        <h2 className="header-title">CHECKOUT</h2>
        <div style={{ width: '24px' }}></div>
      </div>

      {/* DELIVERY ADDRESS SECTION */}
      <div style={{ padding: '20px 16px', background: '#fff', marginTop: '10px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '16px', color: '#111' }}>DELIVERY ADDRESS</h3>
        <input 
          type="text" placeholder="Full Name" style={inputStyle} 
          value={address.name} onChange={(e) => setAddress({...address, name: e.target.value})} 
        />
        <input 
          type="tel" placeholder="Mobile Number" style={inputStyle} 
          value={address.phone} onChange={(e) => setAddress({...address, phone: e.target.value})} 
        />
        <textarea 
          placeholder="Complete Address (House No, Building, Street, Area)" 
          style={{ ...inputStyle, minHeight: '80px', resize: 'none' }} 
          value={address.address} onChange={(e) => setAddress({...address, address: e.target.value})} 
        />
        <input 
          type="number" placeholder="Pincode" style={inputStyle} 
          value={address.pincode} onChange={(e) => setAddress({...address, pincode: e.target.value})} 
        />
      </div>

      {/* PAYMENT METHOD SECTION */}
      <div style={{ padding: '20px 16px', background: '#fff', marginTop: '10px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '16px', color: '#111' }}>PAYMENT METHOD</h3>
        
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px', border: '1px solid #eee', borderRadius: '4px', marginBottom: '10px', cursor: 'pointer' }}>
          <input type="radio" name="payment" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} />
          <span style={{ fontSize: '14px', fontWeight: '600' }}>UPI (GPay, PhonePe, Paytm)</span>
        </label>
        
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px', border: '1px solid #eee', borderRadius: '4px', cursor: 'pointer' }}>
          <input type="radio" name="payment" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
          <span style={{ fontSize: '14px', fontWeight: '600' }}>Cash on Delivery (COD)</span>
        </label>
      </div>

      {/* STICKY BOTTOM CTA */}
      <div className="sticky-bottom-cta" style={{ bottom: 0, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '12px', color: '#666' }}>Grand Total</span>
          <span style={{ fontSize: '18px', fontWeight: '800' }}>₹{grandTotal}</span>
        </div>
        <button 
          className="black-btn" 
          style={{ padding: '14px 30px', borderRadius: '4px', whiteSpace: 'nowrap' }}
          onClick={handleOrderSubmit}
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
}