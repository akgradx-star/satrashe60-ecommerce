import React from 'react';

// 🛡️ VIP ADMIN EMAILS: Yahan aap apne aur apne workers ke asli email daal sakte hain
const ADMIN_EMAILS = [
  "akash@gmail.com",       // Aapka email (Test karne ke liye)
  "worker1@gmail.com",     // Aapke worker ka email
  "admin@satrashe60.com"   // Company email
];

export default function SideMenu({ isOpen, onClose, navigateTo, currentUser }) {
  if (!isOpen) return null;

  const handleNav = (page, category = "ALL") => {
    navigateTo(page, category);
    onClose();
  };

  const userName = currentUser?.name || "Guest";
  const userEmail = currentUser?.email || "Login to access more";

  // 🔒 MAGIC LOGIC: Check karega ki login karne wala customer hai ya ADMIN
  const isAdmin = currentUser?.email && ADMIN_EMAILS.includes(currentUser.email);

  return (
    <div className="side-menu-overlay" onClick={onClose}>
      <div className="side-menu-drawer" onClick={(e) => e.stopPropagation()}>
        
        <button className="side-menu-close" onClick={onClose}>✕</button>

        {/* PROFILE SECTION */}
        <div className="side-profile-section" onClick={() => handleNav('account')}>
          <div className="side-avatar-box">
            <img src="/hero.png" alt="Profile" />
          </div>
          <div className="side-profile-info">
            <h4>{userName}</h4>
            <p>{userEmail}</p>
          </div>
          <span className="side-chevron">›</span>
        </div>

        <div className="side-menu-links">
          
          {/* 🚨 SECRET ADMIN BUTTON: Sirf Admin Emails ko dikhega */}
          {isAdmin && (
            <div className="menu-group" style={{ backgroundColor: '#1a0505', borderBottom: '1px solid #331111', borderRadius: '4px', marginBottom: '10px' }}>
              <div className="menu-item" onClick={() => handleNav('admin')} style={{ paddingLeft: '10px' }}>
                <span className="menu-icon">🛡️</span> 
                <span className="menu-text" style={{ color: '#FF4444', fontWeight: '800' }}>Admin Dashboard</span> 
                <span className="side-chevron" style={{ color: '#FF4444' }}>›</span>
              </div>
            </div>
          )}

          <div className="menu-group">
            <div className="menu-item active-gold" onClick={() => handleNav('home')}>
              <span className="menu-icon">🏠</span> <span className="menu-text">Home</span> <span className="side-chevron">›</span>
            </div>
            <div className="menu-item" onClick={() => handleNav('shop', 'ALL')}>
              <span className="menu-icon">🛍️</span> <span className="menu-text">Shop All</span> <span className="side-chevron">›</span>
            </div>
            <div className="menu-item" onClick={() => handleNav('shop', 'New Arrivals')}>
              <span className="menu-icon">✨</span> <span className="menu-text">New Drop</span> <span className="menu-badge">NEW</span> <span className="side-chevron">›</span>
            </div>
          </div>

          <div className="menu-group">
            <div className="menu-item" onClick={() => handleNav('shop', 'Tops')}>
              <span className="menu-icon">👕</span> <span className="menu-text">Tops</span> <span className="side-chevron">›</span>
            </div>
            <div className="menu-item" onClick={() => handleNav('shop', 'T-Shirts')}>
              <span className="menu-icon">👕</span> <span className="menu-text">T-Shirts</span> <span className="side-chevron">›</span>
            </div>
            <div className="menu-item" onClick={() => handleNav('shop', 'Kurtis')}>
              <span className="menu-icon">👗</span> <span className="menu-text">Kurtis</span> <span className="side-chevron">›</span>
            </div>
            <div className="menu-item" onClick={() => handleNav('shop', 'One Pieces')}>
              <span className="menu-icon">👗</span> <span className="menu-text">One Pieces</span> <span className="side-chevron">›</span>
            </div>
            <div className="menu-item" onClick={() => handleNav('shop', 'Jeans')}>
              <span className="menu-icon">👖</span> <span className="menu-text">Jeans</span> <span className="side-chevron">›</span>
            </div>
            <div className="menu-item" onClick={() => handleNav('shop', 'Co-ord Sets')}>
              <span className="menu-icon">👕</span> <span className="menu-text">Co-ords</span> <span className="side-chevron">›</span>
            </div>
          </div>

          <div className="menu-group" style={{ borderBottom: 'none' }}>
            <div className="menu-item" onClick={() => handleNav('account')}>
              <span className="menu-icon">📦</span> <span className="menu-text">My Orders</span> <span className="side-chevron">›</span>
            </div>
            <div className="menu-item" onClick={() => handleNav('wishlist')}>
              <span className="menu-icon">🤍</span> <span className="menu-text">Wishlist</span> <span className="side-chevron">›</span>
            </div>
            <div className="menu-item" onClick={() => handleNav('about')}>
              <span className="menu-icon">🎧</span> <span className="menu-text">Help & Support</span> <span className="side-chevron">›</span>
            </div>
          </div>

          {/* BOTTOM BRAND BANNER */}
          <div className="menu-bottom-brand">
            <span className="spider-icon">🕷️</span>
            <div className="brand-text">
              <h4>SATRASHE</h4>
              <p>Wear the attitude</p>
            </div>
            <span className="side-chevron">›</span>
          </div>

        </div>
      </div>
    </div>
  );
}