import React from 'react';
import { useNavigate } from 'react-router-dom'; // 🚀 Page badalne ke liye
import './Home.css';
import logo from './logo.png'; // 🚀 Aapka Upload kiya hua logo

export default function Home() {
  const navigate = useNavigate();

  // 🚀 Shop Page par bhejne wala function (Category ya Size ke saath)
  const handleNavigateToShop = (category = "ALL", size = null) => {
    // Agar future mein size filter bhejna ho, toh URL mein query pass kar sakte hain. 
    // Abhi ke liye simple category bhej rahe hain.
    navigate('/shop', { state: { selectedCategory: category, selectedSize: size } });
  };

  return (
    <div className="home-container">
      
      {/* --- HEADER --- */}
      <header className="home-header">
        <button className="menu-btn">☰</button>
        <img src={logo} alt="SATRASHE60 Logo" className="header-logo" />
        <div className="header-icons">
          <button>🔍</button>
          <button>🛍️<span className="cart-badge">2</span></button>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="hero-subtitle">STYLE MEETS YOU</span>
            <h1 className="hero-title">WEAR<br/>YOUR<br/>STORY</h1>
            <p className="hero-desc">PREMIUM FASHION FOR<br/>MODERN YOU</p>
            <button 
              className="shop-now-btn"
              onClick={() => handleNavigateToShop("ALL")}
            >
              SHOP NOW →
            </button>
          </div>
          <div className="slider-indicator">01 / 03</div>
        </div>
      </section>

      {/* --- 🚀 NAYA: SHOP BY SIZE SECTION --- */}
      <section className="shop-by-size-section">
        <div className="section-header">
          <h2>SHOP BY SIZE</h2>
        </div>
        <div className="size-grid">
          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <button 
              key={size} 
              className="size-box"
              onClick={() => handleNavigateToShop("ALL", size)} // 🚀 Size click par shop page
            >
              {size}
            </button>
          ))}
        </div>
      </section>

      {/* --- SHOP BY CATEGORY --- */}
      <section className="shop-by-category-section">
        <div className="section-header">
          <h2>SHOP BY CATEGORY</h2>
          <button className="view-all-btn" onClick={() => handleNavigateToShop("ALL")}>VIEW ALL →</button>
        </div>
        
        <div className="category-grid">
          {[
            { name: 'Tops', img: '/dress1.png' },
            { name: 'T-Shirts', img: '/dress2.png' },
            { name: 'Kurtis', img: '/dress3.png' },
            { name: 'One Pieces', img: '/dress4.png' },
            { name: 'Jeans', img: '/dress1.png' },
            { name: 'Track Pants', img: '/dress2.png' },
            { name: 'Dresses', img: '/dress3.png' },
            { name: 'Co-ords', img: '/dress4.png' }
          ].map((cat, index) => (
            <div 
              key={index} 
              className="category-card"
              onClick={() => handleNavigateToShop(cat.name)} // 🚀 Click par us category ke kapde khulenge
            >
              <div className="cat-img-box">
                <img src={cat.img} alt={cat.name} />
              </div>
              <p>{cat.name}</p>
            </div>
          ))}
          
          <div className="category-card" onClick={() => handleNavigateToShop("New Arrivals")}>
            <div className="cat-img-box new-drop-box">
              <span style={{ color: '#FF0000', fontSize: '24px' }}>👑</span>
              <span style={{ fontWeight: '800', marginTop: '5px' }}>NEW</span>
            </div>
            <p>New Drop</p>
          </div>
          
          <div className="category-card" onClick={() => handleNavigateToShop("ALL")}>
            <div className="cat-img-box more-box">
              <span style={{ fontSize: '24px', color: '#fff' }}>🧥</span>
            </div>
            <p>More</p>
          </div>
        </div>
      </section>

      {/* --- PROMO BANNER --- */}
      <section className="promo-banner">
        <div className="promo-content">
          <span className="promo-subtitle">NEW ARRIVALS</span>
          <h2>FRESH DROPS<br/>EVERY WEEK</h2>
          <p>TRENDY • COMFY • AFFORDABLE</p>
          <button 
            className="explore-btn"
            onClick={() => handleNavigateToShop("New Arrivals")}
          >
            EXPLORE NOW →
          </button>
        </div>
      </section>

      {/* --- BEST SELLERS --- */}
      <section className="best-sellers-section">
        <div className="section-header">
          <h2>BEST SELLERS</h2>
          <button className="view-all-btn" onClick={() => handleNavigateToShop("Best Sellers")}>VIEW ALL →</button>
        </div>
        
        <div className="products-scroller">
          {[
            { name: 'Oversized Graphic Tee', price: 249, old: 699, img: '/dress1.png' },
            { name: 'Short Kurti', price: 249, old: 699, img: '/dress3.png' },
            { name: 'One Piece Dress', price: 399, old: 1499, img: '/dress4.png' }
          ].map((prod, i) => (
            <div 
              key={i} 
              className="product-card"
              onClick={() => handleNavigateToShop("ALL")} 
            >
              <div className="prod-img-box">
                <img src={prod.img} alt={prod.name} />
                <button className="wishlist-btn">♡</button>
              </div>
              <div className="prod-info">
                <h3>{prod.name}</h3>
                <div className="price-row">
                  <span className="price">₹ {prod.price}</span>
                  <span className="old-price">₹ {prod.old}</span>
                </div>
                <div className="rating">★★★★★ <span style={{color: '#666'}}>(124)</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FEATURES STRIP --- */}
      <section className="features-strip">
        <div className="feature"><span className="icon">🚚</span><p>Free Shipping<br/>Above ₹549</p></div>
        <div className="feature"><span className="icon">💳</span><p>COD<br/>Available</p></div>
        <div className="feature"><span className="icon">🛡️</span><p>Secure<br/>Payments</p></div>
        <div className="feature"><span className="icon">🎧</span><p>24/7<br/>Support</p></div>
      </section>

      {/* --- LIFESTYLE BANNER --- */}
      <section className="lifestyle-banner">
        <div className="lifestyle-img">
          {/* Using a placeholder background in CSS */}
        </div>
        <div className="lifestyle-content">
          <span className="life-subtitle">MORE THAN JUST CLOTHES</span>
          <h2>IT'S A LIFESTYLE</h2>
          <p>At SATRASHE60, we bring you the perfect blend of street style, comfort and confidence. Because your story deserves the best fit.</p>
          <button className="story-btn">KNOW OUR STORY →</button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="home-footer">
        <div className="newsletter">
          <span className="news-icon">📨</span>
          <div className="news-text">
            <h4>STAY IN THE LOOP</h4>
            <p>Get exclusive offers, new drops and more.</p>
          </div>
          <div className="news-input">
            <input type="email" placeholder="Enter your email address" />
            <button>SUBSCRIBE</button>
          </div>
        </div>
        
        <div className="footer-links">
          <img src={logo} alt="SATRASHE60" className="footer-logo" />
          <nav>
            <a href="/">Home</a>
            <a href="/shop">Shop</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>
          <div className="social-icons">
            <span>📷</span> <span>▶️</span> <span>📌</span> <span>💬</span>
          </div>
        </div>
        
        <div className="copyright">
          © 2026 SATRASHE60. All rights reserved.
        </div>
      </footer>
      
    </div>
  );
}/Users/akashmuttewar/Downloads/satrashe60_files/logo.png