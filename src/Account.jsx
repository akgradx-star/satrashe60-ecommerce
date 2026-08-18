import React, { useState } from 'react';

export default function Account({ currentUser, onLogin, onLogout, onNavigateToShop }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'signup'
  const [activeSection, setActiveSection] = useState('dashboard'); // 'dashboard' | 'orders' | 'addresses' | 'profile'

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
  });

  // Mock Orders Data
  const [orders] = useState([
    {
      id: 'SATRA-89211',
      date: '10 Aug 2026',
      productName: 'Black Ribbed Top',
      size: 'M',
      price: 129,
      status: 'Delivered',
      image: '/dress2.png'
    },
    {
      id: 'SATRA-90412',
      date: '12 Aug 2026',
      productName: 'Linen Shirt Top',
      size: 'S',
      price: 149,
      status: 'Shipped',
      image: '/dress1.png'
    }
  ]);

  // Mock Saved Addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      fullName: currentUser?.name || 'Customer',
      mobile: '+91 98765 43210',
      address: 'Flat 402, High Street Towers, Baner Road',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411045',
      isDefault: true
    }
  ]);

  // ==========================================
  // 🚀 NAYA API CONNECTION (127.0.0.1 ke sath)
  // ==========================================
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (activeTab === 'signup') {
      try {
        const response = await fetch('http://10.42.209.222:5001/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();

        if (response.ok) {
          alert("🎉 " + data.message + " Ab aap login kar sakte hain.");
          setActiveTab('login');
          setFormData({ ...formData, password: '' });
        } else {
          alert("⚠️ " + data.message);
        }
      } catch (error) {
        console.error("Signup failed:", error);
        alert("❌ Server se connect nahi ho paya. Backend chalu hai ya nahi check karein.");
      }
    } else {
      // LOGIN KA CODE
      try {
        const response = await fetch('http://10.42.209.222:5001/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });
        const data = await response.json();
        if (response.ok) {
          alert("✅ " + data.message);
          onLogin(data.user); 
        } else {
          alert("❌ " + data.message); 
        }
      } catch (error) {
        alert("❌ Server se connect nahi ho paya.");
      }
    }
  };

  // ==========================================
  // VIEW A: AGAR USER LOGIN NAHI HAI (LOGIN/SIGNUP FORM)
  // ==========================================
  if (!currentUser) {
    return (
      <div style={{ backgroundColor: '#FAFAFA', minHeight: '80vh', padding: '60px 4%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '36px', width: '100%', maxWidth: '440px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          
          {/* LOGIN / SIGNUP TABS */}
          <div style={{ display: 'flex', borderBottom: '1px solid #EEEEEE', marginBottom: '24px' }}>
            <button
              onClick={() => setActiveTab('login')}
              style={{ flex: 1, paddingBottom: '12px', background: 'none', border: 'none', borderBottom: activeTab === 'login' ? '2px solid #0A0A0A' : 'none', fontWeight: '800', fontSize: '13px', color: activeTab === 'login' ? '#0A0A0A' : '#888888', cursor: 'pointer', letterSpacing: '1px' }}
            >
              LOGIN
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              style={{ flex: 1, paddingBottom: '12px', background: 'none', border: 'none', borderBottom: activeTab === 'signup' ? '2px solid #0A0A0A' : 'none', fontWeight: '800', fontSize: '13px', color: activeTab === 'signup' ? '#0A0A0A' : '#888888', cursor: 'pointer', letterSpacing: '1px' }}
            >
              SIGN UP
            </button>
          </div>

          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activeTab === 'signup' && (
              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', border: '1px solid #D5D5D5', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>
            )}

            <div>
              <label style={{ fontSize: '11px', fontWeight: '800', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Email Address *</label>
              <input
                type="email"
                required
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', border: '1px solid #D5D5D5', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: '800', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Password *</label>
              <input
                type="password"
                required
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', border: '1px solid #D5D5D5', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>

            <button
              type="submit"
              style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '14px', border: 'none', borderRadius: '4px', fontWeight: '800', fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', marginTop: '8px' }}
            >
              {activeTab === 'login' ? 'SIGN IN →' : 'CREATE ACCOUNT →'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '11px', color: '#888888' }}>
            🔒 Safe & Secure 256-bit Encrypted Checkout
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW B: USER LOGGED IN HAI (DASHBOARD)
  // ==========================================
  return (
    <div style={{ backgroundColor: '#FAFAFA', minHeight: '80vh', padding: window.innerWidth < 768 ? '20px 15px' : '40px 4%', }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'grid',gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '260px 1fr',  gap: '30px', alignItems: 'start' }}>
        
        {/* SIDEBAR NAVIGATION */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '24px' }}>
          <div style={{ paddingBottom: '20px', borderBottom: '1px solid #EEEEEE', marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: '#C9A227', textTransform: 'uppercase' }}>LOGGED IN AS</div>
            <div style={{ fontSize: '16px', fontWeight: '900', color: '#111111', marginTop: '4px' }}>{currentUser.name}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { id: 'dashboard', label: '📊 Dashboard' },
              { id: 'orders', label: '📦 My Orders' },
              { id: 'addresses', label: '📍 Saved Addresses' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                style={{ textAlign: 'left', padding: '12px 14px', background: activeSection === item.id ? '#0A0A0A' : 'none', color: activeSection === item.id ? '#FFFFFF' : '#333333', border: 'none', borderRadius: '4px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={onLogout}
              style={{ textAlign: 'left', padding: '12px 14px', background: 'none', color: '#D92D20', border: 'none', borderRadius: '4px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', marginTop: '12px', borderTop: '1px solid #EEEEEE' }}
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* MAIN DASHBOARD CONTENT */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '32px' }}>
          
          {/* 1. DASHBOARD OVERVIEW */}
          {activeSection === 'dashboard' && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: '900', margin: '0 0 8px 0' }}>
                WELCOME, {currentUser.name.toUpperCase()}!
              </h2>
              <p style={{ fontSize: '13px', color: '#666666', marginBottom: '30px' }}>
                Track your active shipments, delivery addresses, and purchases.
              </p>

              {/* KPI STATS */}
              <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(3, 1fr)', gap: '16px', marginBottom: '36px' }}>
                <div style={{ backgroundColor: '#F9F9F9', border: '1px solid #EEEEEE', borderRadius: '6px', padding: '18px', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#888888', textTransform: 'uppercase' }}>Total Orders</div>
                  <div style={{ fontSize: '26px', fontWeight: '900', color: '#111111', marginTop: '6px' }}>{orders.length}</div>
                </div>

                <div style={{ backgroundColor: '#F9F9F9', border: '1px solid #EEEEEE', borderRadius: '6px', padding: '18px', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#888888', textTransform: 'uppercase' }}>In Transit</div>
                  <div style={{ fontSize: '26px', fontWeight: '900', color: '#FF6B00', marginTop: '6px' }}>1</div>
                </div>

                <div style={{ backgroundColor: '#F9F9F9', border: '1px solid #EEEEEE', borderRadius: '6px', padding: '18px', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#888888', textTransform: 'uppercase' }}>Delivered</div>
                  <div style={{ fontSize: '26px', fontWeight: '900', color: '#28a745', marginTop: '6px' }}>1</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Recent Orders</h3>
                <span onClick={() => setActiveSection('orders')} style={{ fontSize: '12px', color: '#FF6B00', fontWeight: '700', cursor: 'pointer' }}>View All →</span>
              </div>

              {orders.slice(0, 1).map(order => (
                <div key={order.id} style={{ display: 'flex', gap: '16px', border: '1px solid #EEEEEE', borderRadius: '6px', padding: '16px', alignItems: 'center' }}>
                  <img src={order.image} alt={order.productName} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '800', fontSize: '14px' }}>{order.productName}</div>
                    <div style={{ fontSize: '12px', color: '#666666' }}>Order ID: {order.id} | Size: {order.size}</div>
                    <div style={{ fontSize: '13px', fontWeight: '900', marginTop: '4px' }}>₹{order.price}</div>
                  </div>
                  <span style={{ backgroundColor: order.status === 'Delivered' ? '#E8F5E9' : '#FFF3E0', color: order.status === 'Delivered' ? '#2E7D32' : '#E65100', fontSize: '11px', fontWeight: '800', padding: '4px 10px', borderRadius: '4px' }}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* 2. ORDERS SECTION */}
          {activeSection === 'orders' && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: '900', margin: '0 0 20px 0' }}>MY ORDERS</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {orders.map(order => (
                  <div key={order.id} style={{ display: 'flex', gap: '16px', border: '1px solid #EEEEEE', borderRadius: '6px', padding: '16px', alignItems: 'center' }}>
                    <img src={order.image} alt={order.productName} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '800', fontSize: '14px' }}>{order.productName}</div>
                      <div style={{ fontSize: '12px', color: '#666666' }}>Order ID: {order.id} | Placed on: {order.date}</div>
                      <div style={{ fontSize: '13px', fontWeight: '900', marginTop: '4px' }}>₹{order.price}</div>
                    </div>
                    <span style={{ backgroundColor: order.status === 'Delivered' ? '#E8F5E9' : '#FFF3E0', color: order.status === 'Delivered' ? '#2E7D32' : '#E65100', fontSize: '11px', fontWeight: '800', padding: '6px 12px', borderRadius: '4px' }}>
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. SAVED ADDRESSES */}
          {activeSection === 'addresses' && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: '900', margin: '0 0 20px 0' }}>SAVED ADDRESSES</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {addresses.map(addr => (
                  <div key={addr.id} style={{ border: '1px solid #EEEEEE', borderRadius: '6px', padding: '20px', position: 'relative' }}>
                    {addr.isDefault && (
                      <span style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: '#0A0A0A', color: '#FFF', fontSize: '9px', fontWeight: '800', padding: '2px 8px', borderRadius: '2px', letterSpacing: '1px' }}>
                        DEFAULT
                      </span>
                    )}
                    <div style={{ fontWeight: '800', fontSize: '14px' }}>{addr.fullName}</div>
                    <p style={{ fontSize: '13px', color: '#555555', margin: '6px 0', lineHeight: '1.5' }}>
                      {addr.address}<br />
                      {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <div style={{ fontSize: '12px', color: '#888888' }}>Phone: {addr.mobile}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}