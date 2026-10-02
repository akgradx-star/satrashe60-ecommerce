import React, { useState } from 'react';
import './Home.css';
import logo from './logo.png'; 

export default function Home({ navigateTo, cartItems, dbProducts, handleOpenProduct }) {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [swipeIndex, setSwipeIndex] = useState(0);

  const handleSwipe = () => {
    const bestSellersCount = dbProducts.slice(0, 5).length || 3;
    setSwipeIndex((prev) => (prev + 1) % bestSellersCount);
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#FFF', paddingBottom: '80px', fontFamily: "'Inter', sans-serif" }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px', padding: '0 16px', position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(0,0,0,0.95)' }}>
        <button onClick={() => navigateTo('home')} style={{ background: 'transparent', color: '#FFF', border: '1px solid #D4AF37', borderRadius: '4px', padding: '6px 12px', fontSize: '10px', fontWeight: '800', cursor: 'pointer' }}>HOME</button>
        <img src={logo} alt="1760 SATRASHE60" style={{ height: '30px', objectFit: 'contain' }} />
        <div style={{ display: 'flex', gap: '16px' }}>
          <button onClick={() => { setShowSearchInput(true); window.scrollTo(0,0); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <button onClick={() => navigateTo('cart')} style={{ background: 'none', border: 'none', position: 'relative', cursor: 'pointer', fontSize: '18px' }}>
            🛍️{cartItems.length > 0 && <span style={{ position: 'absolute', top: '-5px', right: '-8px', background: '#D4AF37', color: '#000', fontSize: '10px', fontWeight: '900', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartItems.length}</span>}
          </button>
        </div>
      </div>

      {showSearchInput && (
        <div style={{ padding: '16px', backgroundColor: '#111', display: 'flex', gap: '10px' }}>
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #333', background: '#000', color: '#FFF' }} />
          <button onClick={() => { navigateTo('shop', 'ALL'); setShowSearchInput(false); }} style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '0 16px', borderRadius: '4px', fontWeight: 'bold' }}>Go</button>
          <button onClick={() => { setShowSearchInput(false); setSearchQuery(''); }} style={{ background: 'none', color: '#FFF', border: 'none' }}>✕</button>
        </div>
      )}

      {/* HERO BANNER */}
      <div style={{ margin: '16px', borderRadius: '12px', border: '1px solid #333', overflow: 'hidden', position: 'relative', backgroundColor: '#111', display: 'flex', alignItems: 'center' }}>
        <div style={{ padding: '20px', flex: 1 }}>
          <div style={{ color: '#D4AF37', fontSize: '10px', letterSpacing: '1px', marginBottom: '8px' }}>NEW ARRIVALS</div>
          <h2 style={{ fontSize: '20px', fontWeight: '900', margin: '0 0 8px 0', lineHeight: '1.2' }}>FRESH DROPS<br/>EVERY WEEK</h2>
          <div style={{ fontSize: '9px', color: '#AAA', marginBottom: '16px', letterSpacing: '1px' }}>TRENDY • COMFY • AFFORDABLE</div>
          <button onClick={() => navigateTo('shop')} style={{ background: 'transparent', color: '#D4AF37', border: '1px solid #D4AF37', padding: '6px 12px', fontSize: '10px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>EXPLORE NOW →</button>
        </div>
        <div style={{ flex: 1, height: '100%' }}>
          <img src="/dress2.png" alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      {/* SHOP BY SIZE */}
      <div style={{ margin: '30px 16px' }}>
        <div style={{ display: 'inline-block', border: '1px solid #D4AF37', borderRadius: '16px', padding: '6px 16px', marginBottom: '16px' }}>
          <span style={{ color: '#D4AF37', fontSize: '12px', fontWeight: '800', letterSpacing: '1px' }}>SHOP BY SIZE</span>
        </div>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', scrollbarWidth: 'none' }} className="hide-scrollbar">
          {["XS", "S", "M", "L", "XL"].map(sz => (
            <button key={sz} onClick={() => navigateTo('size-filter', sz)} style={{ flexShrink: 0, width: '48px', height: '48px', background: '#111', border: '1px solid #333', borderRadius: '4px', color: '#D4AF37', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>{sz}</button>
          ))}
        </div>
      </div>

      {/* SHOP BY CATEGORY */}
      <div style={{ margin: '30px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ border: '1px solid #D4AF37', borderRadius: '16px', padding: '6px 16px' }}>
            <span style={{ color: '#D4AF37', fontSize: '12px', fontWeight: '800', letterSpacing: '1px' }}>SHOP BY CATEGORY</span>
          </div>
          <button onClick={() => navigateTo('shop')} style={{ background: 'none', border: 'none', color: '#888', fontSize: '10px', fontWeight: 'bold' }}>VIEW ALL →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[{n: 'Tops', i: '/dress1.png'}, {n: 'T-Shirts', i: '/dress2.png'}, {n: 'Kurtis', i: '/dress3.png'}, {n: 'One Pieces', i: '/dress4.png'}].map((cat, idx) => (
            <div key={idx} onClick={() => navigateTo('shop', cat.n)} style={{ background: '#111', borderRadius: '8px', overflow: 'hidden', border: '1px solid #222', cursor: 'pointer' }}>
              <img src={cat.i} alt={cat.n} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
              <div style={{ padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#FFF' }}>{cat.n}</div>
                  <div style={{ fontSize: '9px', color: '#888' }}>Explore Now →</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BEST SELLERS (TINDER SWIPE EFFECT) */}
      <div style={{ margin: '40px 0', overflow: 'hidden' }}>
        <div style={{ margin: '0 16px 20px', display: 'inline-block', border: '1px solid #D4AF37', borderRadius: '16px', padding: '6px 16px' }}>
          <span style={{ color: '#D4AF37', fontSize: '12px', fontWeight: '800', letterSpacing: '1px' }}>BEST SELLERS</span>
        </div>
        
        <div style={{ position: 'relative', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: '1000px' }}>
          {dbProducts.slice(0, 4).map((prod, idx) => {
            const isTop = idx === swipeIndex;
            const isSecond = idx === (swipeIndex + 1) % 4;
            const isThird = idx === (swipeIndex + 2) % 4;
            
            if (!isTop && !isSecond && !isThird) return null; 

            let transform = '';
            let zIndex = 0;
            let opacity = 1;

            if (isTop) {
              transform = 'rotate(-4deg) scale(1) translateY(0)';
              zIndex = 30;
            } else if (isSecond) {
              transform = 'rotate(6deg) scale(0.95) translateX(30px) translateY(20px)';
              zIndex = 20;
              opacity = 0.8;
            } else if (isThird) {
              transform = 'rotate(-2deg) scale(0.9) translateX(-20px) translateY(40px)';
              zIndex = 10;
              opacity = 0.5;
            }

            return (
              <div 
                key={prod.id} 
                onClick={() => {
                  if(isTop) handleSwipe(); 
                  else handleOpenProduct(prod, 'home'); 
                }}
                style={{
                  position: 'absolute', width: '260px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px', padding: '12px',
                  transition: 'all 0.4s ease-in-out', transform, zIndex, opacity, cursor: isTop ? 'grab' : 'pointer',
                  boxShadow: isTop ? '0 15px 30px rgba(0,0,0,0.8)' : 'none'
                }}
              >
                <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                  <span style={{ position: 'absolute', top: '8px', left: '8px', background: '#D4AF37', color: '#000', fontSize: '10px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '12px', zIndex: 2 }}>New</span>
                  <button style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#FFF', fontSize: '16px', width: '28px', height: '28px', borderRadius: '4px', zIndex: 2 }}>♡</button>
                  <img src={prod.image || '/dress1.png'} alt={prod.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                </div>
                {isTop && <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '10px', color: '#888' }}>Tap to swipe ↺</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* THE 1760 DROP */}
      <div style={{ margin: '40px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #D4AF37', borderRadius: '24px', padding: '8px 20px', gap: '10px' }}>
            <span style={{ color: '#FFF', fontSize: '14px', fontWeight: '400' }}>THE</span>
            <img src={logo} alt="1760" style={{ height: '24px' }} />
            <span style={{ color: '#FFF', fontSize: '14px', fontWeight: '400' }}>DROP</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', padding: '0 16px', scrollbarWidth: 'none' }} className="hide-scrollbar">
          <div onClick={() => navigateTo('shop', 'T-Shirts')} style={{ minWidth: '220px', background: '#111', borderRadius: '12px', overflow: 'hidden', border: '1px solid #222', cursor: 'pointer' }}>
            <img src="/dress2.png" alt="Offer 1" style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
            <div style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ color: '#D4AF37', fontSize: '10px', fontWeight: 'bold', marginBottom: '4px' }}>BUY 2 GET</div>
              <div style={{ color: '#FFF', fontSize: '20px', fontWeight: '900', marginBottom: '4px' }}>₹100 OFF</div>
              <div style={{ color: '#888', fontSize: '9px', marginBottom: '12px' }}>ON KURTIS</div>
              <button style={{ background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', padding: '6px 16px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>SHOP KURTIS →</button>
            </div>
          </div>
          
          <div onClick={() => navigateTo('shop', 'One Pieces')} style={{ minWidth: '220px', background: '#111', borderRadius: '12px', overflow: 'hidden', border: '1px solid #222', cursor: 'pointer' }}>
            <img src="/dress4.png" alt="Offer 2" style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
            <div style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ color: '#D4AF37', fontSize: '10px', fontWeight: 'bold', marginBottom: '4px' }}>FLAT</div>
              <div style={{ color: '#FFF', fontSize: '20px', fontWeight: '900', marginBottom: '4px' }}>15% OFF</div>
              <div style={{ color: '#888', fontSize: '9px', marginBottom: '12px' }}>ON ONE PIECES</div>
              <button style={{ background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', padding: '6px 16px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>SHOP ONE PIECES →</button>
            </div>
          </div>
        </div>
      </div>

      {/* TRUST BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '1px solid #222', borderBottom: '1px solid #222', padding: '20px 0', margin: '30px 0' }}>
        {[{i:'🚚', t:'Free Shipping'}, {i:'💳', t:'COD Available'}, {i:'🛡️', t:'Secure Payment'}, {i:'🎧', t:'24/7 Support'}].map((tb, idx) => (
          <div key={idx} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>{tb.i}</div>
            <div style={{ fontSize: '8px', color: '#888', textTransform: 'uppercase' }}>{tb.t}</div>
          </div>
        ))}
      </div>

      {/* LIFESTYLE & FOOTER */}
      <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#050505' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#FFF', margin: '0 0 16px 0', letterSpacing: '2px' }}>IT'S A LIFESTYLE</h3>
        <p style={{ fontSize: '12px', color: '#888', margin: '0 0 24px 0', lineHeight: '1.6' }}>At SATRASHE60, we bring you the perfect blend of street style, comfort and confidence. Because your story deserves the best fit.</p>
        <button onClick={() => navigateTo('about')} style={{ background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', padding: '10px 24px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>KNOW OUR STORY ...</button>
        <img src={logo} alt="SATRASHE60" style={{ height: '40px', marginTop: '40px' }} />
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', fontSize: '12px', color: '#FFF', fontWeight: 'bold' }}>
          <span onClick={() => navigateTo('home')}>Home</span>
          <span onClick={() => navigateTo('shop')}>Shop</span>
          <span onClick={() => navigateTo('about')}>About</span>
          <span onClick={() => navigateTo('about')}>Contact</span>
        </div>
      </div>
    </div>
  );
}