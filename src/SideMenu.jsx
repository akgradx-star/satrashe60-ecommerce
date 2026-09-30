import React from 'react';

export default function SideMenu({ isOpen, onClose, navigateTo, currentUser }) {
  if (!isOpen) return null;

  // Menu button click hone par page change karega aur menu band kar dega
  const handleNav = (page, category = "ALL") => {
    navigateTo(page, category);
    onClose();
  };

  // Agar user logged in hai toh uska data, warna default design jaisa dikhega
  const userName = currentUser?.name || "Akash";
  const userEmail = currentUser?.email || "akash@gmail.com";

  return (
    <div className="side-menu-overlay" onClick={onClose}>
      <div className="side-menu-drawer" onClick={(e) => e.stopPropagation()}>
        
        {/* CLOSE BUTTON */}
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

        {/* VIP BANNER */}
        <div className="side-vip-banner">
          <span className="vip-icon">👑</span>
          <div className="vip-text">
            <h4>SatraShe VIP</h4>
            <p>Exclusive offers, early access & more</p>
          </div>
          <span className="side-chevron" style={{ color: '#D4AF37' }}>›</span>
        </div>

        {/* SCROLLABLE MENU LINKS */}
        <div className="side-menu-links">
          
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
            <div className="menu-item" onClick={() => handleNav('shop', 'Track Pants')}>
              <span className="menu-icon">👖</span> <span className="menu-text">Track Pants</span> <span className="side-chevron">›</span>
            </div>
            <div className="menu-item" onClick={() => handleNav('shop', 'Dresses')}>
              <span className="menu-icon">👗</span> <span className="menu-text">Dresses</span> <span className="side-chevron">›</span>
            </div>
            <div className="menu-item" onClick={() => handleNav('shop', 'Co-ord Sets')}>
              <span className="menu-icon">👕</span> <span className="menu-text">Co-ords</span> <span className="side-chevron">›</span>
            </div>
            <div className="menu-item" onClick={() => handleNav('shop', 'ALL')}>
              <span className="menu-icon">⊞</span> <span className="menu-text">More</span> <span className="side-chevron">›</span>
            </div>
          </div>

          <div className="menu-group" style={{ borderBottom: 'none' }}>
            <div className="menu-item" onClick={() => handleNav('account')}>
              <span className="menu-icon">📦</span> <span className="menu-text">My Orders</span> <span className="side-chevron">›</span>
            </div>
            <div className="menu-item" onClick={() => handleNav('wishlist')}>
              <span className="menu-icon">🤍</span> <span className="menu-text">Wishlist</span> <span className="side-chevron">›</span>
            </div>
            <div className="menu-item" onClick={() => handleNav('shop', 'ALL')}>
              <span className="menu-icon">🏷️</span> <span className="menu-text">Offers & Discounts</span> <span className="side-chevron">›</span>
            </div>
            <div className="menu-item" onClick={() => handleNav('about')}>
              <span className="menu-icon">🎧</span> <span className="menu-text">Help & Support</span> <span className="side-chevron">›</span>
            </div>
            <div className="menu-item" onClick={() => handleNav('account')}>
              <span className="menu-icon">⚙️</span> <span className="menu-text">Settings</span> <span className="side-chevron">›</span>
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