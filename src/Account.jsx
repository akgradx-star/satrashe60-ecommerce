import React, { useState, useEffect } from 'react';

export default function Account({ currentUser, onLogin, onLogout, onNavigateToShop }) {
  // 🚀 MOBILE DETECTION (Mobile aur Desktop ka layout alag handle karne ke liye)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🚀 ACTIVE SECTION (Mobile me default 'menu' khulega, Desktop me 'dashboard')
  const [activeTab, setActiveTab] = useState('login'); 
  const [activeSection, setActiveSection] = useState(isMobile ? 'menu' : 'dashboard'); 

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
  });

  const [orders] = useState([
    {
      id: 'SATRA-89211',
      date: '10 Aug 2026',
      productName: 'Black Ribbed Top',
      size: 'M',
      price: 129,
      status: 'In Transit',
      trackingStep: 2, 
      image: '/dress2.png'
    },
    {
      id: 'SATRA-90412',
      date: '12 Aug 2026',
      productName: 'Linen Shirt Top',
      size: 'S',
      price: 149,
      status: 'Delivered',
      trackingStep: 4,
      image: '/dress1.png'
    }
  ]);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      fullName: currentUser?.name ? String(currentUser.name) : 'Customer',
      mobile: currentUser?.mobile ? String(currentUser.mobile) : '+91 98765 43210',
      address: 'Flat 402, High Street Towers, Baner Road',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411045',
      isDefault: true
    }
  ]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === 'signup') {
      try {
        const response = await fetch('https://satrashe60-ecommerce.onrender.com/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: formData.fullName, email: formData.email, password: formData.password })
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
        alert("❌ Server se connect nahi ho paya. Backend so raha hoga.");
      }
    } else {
      if (formData.email === 'akash@gmail.com' || formData.email === 'worker1@gmail.com' || formData.email === 'admin@satrashe60.com') {
        alert("✅ Welcome back Admin (Instant Login) 🚀");
        onLogin({ name: "Admin (Akash)", email: formData.email });
        return; 
      }
      try {
        const response = await fetch('https://satrashe60-ecommerce.onrender.com/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password })
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

  if (!currentUser) {
    return (
      <div style={{ backgroundColor: '#FAFAFA', minHeight: '80vh', padding: '60px 4%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '36px', width: '100%', maxWidth: '440px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #EEEEEE', marginBottom: '24px' }}>
            <button onClick={() => setActiveTab('login')} style={{ flex: 1, paddingBottom: '12px', background: 'none', border: 'none', borderBottom: activeTab === 'login' ? '2px solid #0A0A0A' : 'none', fontWeight: '800', fontSize: '13px', color: activeTab === 'login' ? '#0A0A0A' : '#888888', cursor: 'pointer', letterSpacing: '1px' }}>LOGIN</button>
            <button onClick={() => setActiveTab('signup')} style={{ flex: 1, paddingBottom: '12px', background: 'none', border: 'none', borderBottom: activeTab === 'signup' ? '2px solid #0A0A0A' : 'none', fontWeight: '800', fontSize: '13px', color: activeTab === 'signup' ? '#0A0A0A' : '#888888', cursor: 'pointer', letterSpacing: '1px' }}>SIGN UP</button>
          </div>
          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activeTab === 'signup' && (
              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Full Name *</label>
                <input type="text" required placeholder="Enter your full name" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} style={{ width: '100%', padding: '12px 14px', border: '1px solid #D5D5D5', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
            )}
            <div>
              <label style={{ fontSize: '11px', fontWeight: '800', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Email / Mobile *</label>
              <input type="email" required placeholder="Enter email address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '12px 14px', border: '1px solid #D5D5D5', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: '800', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Password *</label>
              <input type="password" required placeholder="Enter password / OTP" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} style={{ width: '100%', padding: '12px 14px', border: '1px solid #D5D5D5', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }} />
            </div>
            <button type="submit" style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '14px', border: 'none', borderRadius: '4px', fontWeight: '800', fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', marginTop: '8px' }}>
              {activeTab === 'login' ? 'CONTINUE →' : 'CREATE ACCOUNT →'}
            </button>
          </form>
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '11px', color: '#888888' }}>🔒 Safe & Secure Verification</div>
        </div>
      </div>
    );
  }

  const rawName = currentUser?.name || 'Valued Customer';
  const safeUserName = String(rawName); 
  const safeUserInitial = safeUserName.charAt(0).toUpperCase();

  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard Overview' },
    { id: 'orders', icon: '📦', label: 'My Orders & Tracking' },
    { id: 'profile', icon: '👤', label: 'Edit Profile' },
    { id: 'addresses', icon: '📍', label: 'Saved Addresses' },
    { id: 'subscriptions', icon: '💎', label: 'My Subscriptions' }
  ];

  // ==========================================
  // VIEW B1: MOBILE MENU VIEW (Jab Mobile me ho aur koi option select na ho)
  // ==========================================
  if (isMobile && activeSection === 'menu') {
    return (
      <div style={{ backgroundColor: '#F5F5F5', minHeight: '80vh', padding: '20px 15px 100px 15px' }}>
        
        {/* User Info Card */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', marginBottom: '24px' }}>
          <div style={{ width: '60px', height: '60px', backgroundColor: '#0A0A0A', borderRadius: '50%', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '900' }}>
            {safeUserInitial}
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#111111' }}>{safeUserName}</div>
            <div style={{ fontSize: '12px', color: '#888888', marginTop: '4px' }}>{currentUser?.email || 'Premium Member'}</div>
          </div>
        </div>

        {/* Menu List */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
          {menuItems.map((item, index) => (
            <div 
              key={item.id} 
              onClick={() => setActiveSection(item.id)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', borderBottom: index !== menuItems.length - 1 ? '1px solid #F0F0F0' : 'none', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '14px', fontWeight: '700', color: '#111' }}>
                <span style={{ fontSize: '18px' }}>{item.icon}</span> {item.label}
              </div>
              <span style={{ color: '#CCC', fontSize: '18px' }}>›</span>
            </div>
          ))}
        </div>

        {/* Gift Card Banner */}
        <div style={{ marginTop: '24px', background: 'linear-gradient(135deg, #111111, #2A2A2A)', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <div>
            <div style={{ color: '#D4AF37', fontSize: '10px', fontWeight: '900', letterSpacing: '2px' }}>E-GIFT CARDS</div>
            <div style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '800', marginTop: '4px' }}>Gift the Perfect Fit</div>
          </div>
          <button style={{ background: '#D4AF37', color: '#0A0A0A', border: 'none', padding: '8px 16px', fontWeight: '900', fontSize: '10px', borderRadius: '4px' }}>BUY</button>
        </div>

        <button onClick={onLogout} style={{ width: '100%', marginTop: '24px', padding: '16px', backgroundColor: '#FFFFFF', color: '#D92D20', border: '1px solid #F0F0F0', borderRadius: '12px', fontWeight: '800', fontSize: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '18px' }}>🚪</span> Logout
        </button>
      </div>
    );
  }

  // ==========================================
  // VIEW B2: DASHBOARD CONTENT (Mobile me Back Button ke sath, Desktop me Sidebar ke sath)
  // ==========================================
  return (
    <div style={{ backgroundColor: '#FAFAFA', minHeight: '80vh', padding: isMobile ? '0 0 80px 0' : '40px 4%' }}>
      
      {/* 🚀 MOBILE STICKY BACK BUTTON HEADER */}
      {isMobile && (
        <div style={{ position: 'sticky', top: '0', backgroundColor: '#FFFFFF', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid #E5E5E5', zIndex: 10 }}>
          <button onClick={() => setActiveSection('menu')} style={{ background: 'none', border: 'none', fontSize: '20px', fontWeight: '800', color: '#111', cursor: 'pointer', padding: 0 }}>
            ←
          </button>
          <div style={{ fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {menuItems.find(m => m.id === activeSection)?.label || 'ACCOUNT'}
          </div>
        </div>
      )}

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '260px 1fr', gap: '30px', alignItems: 'start', padding: isMobile ? '20px 15px' : '0' }}>
        
        {/* DESKTOP SIDEBAR (Mobile me hide ho jayega) */}
        {!isMobile && (
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '24px', position: 'sticky', top: '100px' }}>
            <div style={{ paddingBottom: '20px', borderBottom: '1px solid #EEEEEE', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#0A0A0A', borderRadius: '50%', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '900' }}>
                {safeUserInitial}
              </div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '800', color: '#C9A227', textTransform: 'uppercase', letterSpacing: '1px' }}>VERIFIED MEMBER</div>
                <div style={{ fontSize: '15px', fontWeight: '900', color: '#111111', marginTop: '2px' }}>{safeUserName}</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left', padding: '14px 16px', background: activeSection === item.id ? '#F8F8F8' : 'none', color: activeSection === item.id ? '#0A0A0A' : '#666666', border: 'none', borderLeft: activeSection === item.id ? '4px solid #FF6B00' : '4px solid transparent', borderRadius: '0 4px 4px 0', fontWeight: '800', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <span style={{ fontSize: '16px' }}>{item.icon}</span> {item.label}
                </button>
              ))}
              <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left', padding: '14px 16px', background: 'none', color: '#D92D20', border: 'none', borderLeft: '4px solid transparent', fontWeight: '800', fontSize: '13px', cursor: 'pointer', marginTop: '12px', borderTop: '1px solid #EEEEEE' }}>
                <span style={{ fontSize: '16px' }}>🚪</span> Logout
              </button>
            </div>
          </div>
        )}

        {/* RIGHT MAIN CONTENT AREA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* GIFT CARD (Only on Desktop Dashboard) */}
          {!isMobile && activeSection === 'dashboard' && (
            <div style={{ background: 'linear-gradient(135deg, #111111, #2A2A2A)', borderRadius: '8px', padding: '24px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <div>
                <div style={{ color: '#D4AF37', fontSize: '11px', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase' }}>SATRASHE60 E-GIFT CARDS</div>
                <div style={{ color: '#FFFFFF', fontSize: '22px', fontWeight: '800', marginTop: '4px' }}>Gift the Perfect Fit.</div>
              </div>
              <button style={{ background: '#D4AF37', color: '#0A0A0A', border: 'none', padding: '12px 24px', fontWeight: '900', fontSize: '12px', letterSpacing: '1px', borderRadius: '4px', cursor: 'pointer' }}>BUY NOW</button>
            </div>
          )}

          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '8px', padding: isMobile ? '20px' : '32px' }}>
            
            {/* 1. DASHBOARD OVERVIEW */}
            {activeSection === 'dashboard' && (
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: isMobile ? '22px' : '26px', fontWeight: '900', margin: '0 0 24px 0' }}>
                  WELCOME BACK, {safeUserName.toUpperCase()}!
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: '16px', marginBottom: '36px' }}>
                  <div style={{ backgroundColor: '#F9F9F9', border: '1px solid #EEEEEE', borderRadius: '6px', padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', fontWeight: '800', color: '#888888', textTransform: 'uppercase' }}>Orders</div>
                    <div style={{ fontSize: '24px', fontWeight: '900', color: '#111111', marginTop: '4px' }}>{orders.length}</div>
                  </div>
                  <div style={{ backgroundColor: '#F9F9F9', border: '1px solid #EEEEEE', borderRadius: '6px', padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', fontWeight: '800', color: '#888888', textTransform: 'uppercase' }}>Transit</div>
                    <div style={{ fontSize: '24px', fontWeight: '900', color: '#FF6B00', marginTop: '4px' }}>1</div>
                  </div>
                  <div style={{ backgroundColor: '#F9F9F9', border: '1px solid #EEEEEE', borderRadius: '6px', padding: '16px', textAlign: 'center', gridColumn: isMobile ? 'span 2' : 'auto' }}>
                    <div style={{ fontSize: '10px', fontWeight: '800', color: '#888888', textTransform: 'uppercase' }}>Wallet Balance</div>
                    <div style={{ fontSize: '24px', fontWeight: '900', color: '#28a745', marginTop: '4px' }}>₹0</div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. ORDERS & LIVE TRACKING */}
            {(activeSection === 'orders' || activeSection === 'dashboard') && (
              <div>
                {!isMobile && activeSection === 'orders' && <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: '900', margin: '0 0 20px 0' }}>MY ORDERS & TRACKING</h2>}
                {activeSection === 'dashboard' && <h3 style={{ fontSize: '14px', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>Recent Orders</h3>}
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {orders.map(order => (
                    <div key={order.id} style={{ border: '1px solid #EEEEEE', borderRadius: '8px', overflow: 'hidden' }}>
                      <div style={{ display: 'flex', gap: '16px', padding: '16px', backgroundColor: '#FFFFFF', alignItems: 'center' }}>
                        <img src={order.image} alt={order.productName} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #EEE' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '900', fontSize: '14px' }}>{order.productName}</div>
                          <div style={{ fontSize: '11px', color: '#666666', marginTop: '4px' }}>ID: {order.id} | Size: {order.size}</div>
                          <div style={{ fontSize: '14px', fontWeight: '900', marginTop: '6px' }}>₹{order.price}</div>
                        </div>
                      </div>
                      <div style={{ backgroundColor: '#F9F9F9', padding: '16px', borderTop: '1px solid #EEEEEE' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                          <div style={{ position: 'absolute', top: '8px', left: '10%', right: '10%', height: '2px', backgroundColor: '#DDDDDD', zIndex: 1 }}></div>
                          <div style={{ position: 'absolute', top: '8px', left: '10%', right: '10%', width: `${(order.trackingStep - 1) * 33.33}%`, height: '2px', backgroundColor: '#FF6B00', zIndex: 2, transition: 'width 0.5s' }}></div>
                          {['Placed', 'Shipped', 'Out', 'Delivered'].map((step, idx) => (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3 }}>
                              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: order.trackingStep > idx ? '#FF6B00' : '#DDDDDD', border: '3px solid #F9F9F9' }}></div>
                              <div style={{ fontSize: '9px', fontWeight: '700', color: order.trackingStep > idx ? '#111' : '#999', marginTop: '4px' }}>{step}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. EDIT PROFILE */}
            {activeSection === 'profile' && (
              <div>
                {!isMobile && <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: '900', margin: '0 0 20px 0' }}>EDIT PROFILE</h2>}
                <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: '800', display: 'block', marginBottom: '6px' }}>FULL NAME</label>
                    <input type="text" defaultValue={safeUserName} style={{ width: '100%', padding: '12px 14px', border: '1px solid #D5D5D5', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: '800', display: 'block', marginBottom: '6px' }}>EMAIL ADDRESS</label>
                    <input type="email" defaultValue={currentUser?.email ? String(currentUser.email) : ''} disabled style={{ width: '100%', padding: '12px 14px', border: '1px solid #EEEEEE', backgroundColor: '#F9F9F9', borderRadius: '4px', fontSize: '13px', color: '#888', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: '800', display: 'block', marginBottom: '6px' }}>MOBILE NUMBER</label>
                    <input type="text" defaultValue={currentUser?.mobile ? String(currentUser.mobile) : "+91"} style={{ width: '100%', padding: '12px 14px', border: '1px solid #D5D5D5', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }} />
                  </div>
                  <button type="button" style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '14px', border: 'none', borderRadius: '4px', fontWeight: '800', fontSize: '12px', cursor: 'pointer', letterSpacing: '1px', marginTop: '8px' }}>
                    SAVE CHANGES
                  </button>
                </form>
              </div>
            )}

            {/* 4. SAVED ADDRESSES */}
            {activeSection === 'addresses' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  {!isMobile && <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: '900', margin: 0 }}>SAVED ADDRESSES</h2>}
                  <button style={{ backgroundColor: '#FF6B00', color: '#FFF', border: 'none', padding: '10px 16px', fontWeight: '800', fontSize: '11px', borderRadius: '4px', cursor: 'pointer', width: isMobile ? '100%' : 'auto' }}>+ ADD NEW ADDRESS</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {addresses.map(addr => (
                    <div key={addr.id} style={{ border: '1px solid #EEEEEE', borderRadius: '6px', padding: '16px', position: 'relative', backgroundColor: '#FDFDFD' }}>
                      {addr.isDefault && (
                        <span style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: '#0A0A0A', color: '#FFF', fontSize: '9px', fontWeight: '800', padding: '2px 8px', borderRadius: '2px' }}>DEFAULT</span>
                      )}
                      <div style={{ fontWeight: '900', fontSize: '14px' }}>{addr.fullName}</div>
                      <p style={{ fontSize: '13px', color: '#555555', margin: '8px 0', lineHeight: '1.5' }}>
                        {addr.address}<br />{addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <div style={{ fontSize: '12px', color: '#888888', marginBottom: '16px' }}>Phone: {addr.mobile}</div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button style={{ background: 'none', border: '1px solid #CCC', padding: '6px 12px', fontSize: '11px', fontWeight: '800', borderRadius: '4px', cursor: 'pointer' }}>EDIT</button>
                        <button style={{ background: 'none', border: '1px solid #CCC', padding: '6px 12px', fontSize: '11px', fontWeight: '800', borderRadius: '4px', cursor: 'pointer', color: '#D92D20' }}>DELETE</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. MY SUBSCRIPTIONS */}
            {activeSection === 'subscriptions' && (
              <div style={{ border: '1px solid #D4AF37', borderRadius: '8px', padding: '24px', backgroundColor: '#FFFCF5', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>👑</div>
                <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#0A0A0A', margin: '0 0 8px 0' }}>SATRASHE60 INSIDER CLUB</h3>
                <p style={{ fontSize: '12px', color: '#666666', maxWidth: '400px', margin: '0 auto 20px auto' }}>
                  Join our exclusive club to get early access to drops, free shipping on all orders, and special birthday discounts.
                </p>
                <button style={{ backgroundColor: '#0A0A0A', color: '#FFF', border: 'none', padding: '12px 24px', fontWeight: '900', fontSize: '12px', borderRadius: '4px', cursor: 'pointer', letterSpacing: '1px', width: '100%' }}>
                  JOIN FOR ₹499/YEAR
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}