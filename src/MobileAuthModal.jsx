import React, { useState } from 'react';
import './MobileFlow.css';

export default function MobileAuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [step, setStep] = useState('PHONE'); // 'PHONE' | 'OTP'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // STEP 1: SEND OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 💡 BACKEND / MONGODB CONNECTIVITY YAHAN HOGI:
      // const res = await fetch('/api/auth/send-otp', { method: 'POST', body: JSON.stringify({ phone: phoneNumber }) });
      
      // Temporary Mock OTP generation:
      const mockOtp = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(mockOtp);
      
      setTimeout(() => {
        setLoading(false);
        setStep('OTP');
        alert(`Demo OTP: ${mockOtp}`); // Testing ke liye alert
      }, 600);
    } catch (err) {
      setLoading(false);
      setError('Failed to send OTP. Please try again.');
    }
  };

  // STEP 2: VERIFY OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError('Please enter the OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 💡 BACKEND / MONGODB VERIFY YAHAN HOGI:
      // const res = await fetch('/api/auth/verify-otp', { method: 'POST', body: JSON.stringify({ phone: phoneNumber, otp }) });
      
      if (otp === generatedOtp || otp === '1234') {
        const userData = {
          phone: phoneNumber,
          token: 'jwt_token_' + Date.now(),
          isLoggedIn: true,
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setLoading(false);
        onLoginSuccess(userData);
      } else {
        setLoading(false);
        setError('Invalid OTP. Please check again.');
      }
    } catch (err) {
      setLoading(false);
      setError('Verification failed.');
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 99999,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center'
    }}>
      <div style={{
        background: '#fff', width: '100%', maxWidth: '480px',
        borderTopLeftRadius: '16px', borderTopRightRadius: '16px',
        padding: '24px 20px', boxSizing: 'border-box'
      }}>
        {/* CLOSE BUTTON */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>
            {step === 'PHONE' ? 'LOG IN / SIGN UP' : 'ENTER OTP'}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>

        {error && <div style={{ color: 'red', fontSize: '12px', marginBottom: '12px' }}>{error}</div>}

        {step === 'PHONE' ? (
          <form onSubmit={handleSendOtp}>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
              Enter your 10-digit mobile number to proceed with your order.
            </p>
            <div style={{ display: 'flex', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
              <span style={{ padding: '14px', background: '#f5f5f5', borderRight: '1px solid #ccc', fontWeight: '600', fontSize: '14px' }}>+91</span>
              <input
                type="tel"
                placeholder="Mobile Number"
                maxLength={10}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                style={{ flex: 1, border: 'none', padding: '14px', fontSize: '14px', outline: 'none' }}
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={loading || phoneNumber.length !== 10}
              className="black-btn full-width"
              style={{ padding: '14px', borderRadius: '4px' }}
            >
              {loading ? 'SENDING OTP...' : 'CONTINUE'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
              We sent an OTP to <strong>+91 {phoneNumber}</strong> <br />
              <span onClick={() => setStep('PHONE')} style={{ color: '#FF6B00', cursor: 'pointer', textDecoration: 'underline', fontSize: '12px' }}>Edit number</span>
            </p>
            <input
              type="number"
              placeholder="Enter 4-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '14px', fontSize: '16px', letterSpacing: '4px', textAlign: 'center', marginBottom: '16px', outline: 'none' }}
              autoFocus
            />
            <button
              type="submit"
              disabled={loading}
              className="black-btn full-width"
              style={{ padding: '14px', borderRadius: '4px' }}
            >
              {loading ? 'VERIFYING...' : 'VERIFY & PROCEED'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}