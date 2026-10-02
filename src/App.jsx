import SideMenu from './SideMenu';
import { useState, useEffect, useContext } from 'react';
import './App.css';
import Shop, { MASTER_PRODUCTS } from './Shop';
import CheckoutModal from './CheckoutModal';
import MobileProductDetail from './MobileProductDetail';
import MobileBag from './MobileBag';
import ProductDetail from './ProductDetail';
import About from './About';
import Community from './Community';
import Account from './Account';
import AdminDashboard from './AdminDashboard';
import MobileHeaderNav from './MobileHeaderNav'; 
import MobileAuthModal from './MobileAuthModal';
import CategoryPLP from './CategoryPLP'; 
import { ShopContext } from './ShopContext'; 

// ==========================================
// 🚀 HOME COMPONENT
// ==========================================
function Home({ navigateTo, cartItems, dbProducts, handleOpenProduct, handleAddToCart, handleToggleWishlist, onMenuClick }) {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // 🚀 HERO CAROUSEL STATE (Automatic Image Change)
  const [heroImgIndex, setHeroImgIndex] = useState(0);
  const heroImages = ['/dress2.png', '/dress1.png', '/dress3.png', '/dress4.png'];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 2500); // Har 2.5 second mein image change hogi
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // 🚀 BEST SELLERS FIX (Taaki black screen na aaye)
  const displayProducts = dbProducts && dbProducts.length > 0 ? dbProducts.slice(0, 10) : MASTER_PRODUCTS.slice(0, 5);
  const [swipeIndex, setSwipeIndex] = useState(0);
  const bestSellersCount = displayProducts.length || 1;

  const handleSwipe = () => {
    setSwipeIndex((prev) => (prev + 1) % bestSellersCount);
  };

  const handleSwipeBack = (e) => {
    e.stopPropagation();
    setSwipeIndex((prev) => (prev - 1 + bestSellersCount) % bestSellersCount);
  };

  // Spinner State
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const spinnerSegments = ['FLAT 50% OFF', 'FREE SHIPPING', '₹200 COUPON', 'MYSTERY GIFT', 'FLAT 30% OFF', 'FREE SHIPPING', '₹100 COUPON', 'MYSTERY GIFT'];

  const spinWheel = () => {
    if(isSpinning) return;
    setIsSpinning(true);
    const spins = Math.floor(Math.random() * 5) + 5; 
    const randomDegree = Math.floor(Math.random() * 360);
    const totalDegree = rotation + (spins * 360) + randomDegree;
    
    setRotation(totalDegree);
    
    setTimeout(() => {
      setIsSpinning(false);
      const normalizedDegree = totalDegree % 360;
      const segmentIndex = Math.floor((360 - normalizedDegree + 22.5) % 360 / 45);
      const wonPrize = spinnerSegments[segmentIndex % 8];
      alert(`🎉 Congratulations! You won: ${wonPrize}`);
    }, 4000); 
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#FFF', paddingBottom: '80px', fontFamily: "'Inter', sans-serif" }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px', padding: '0 16px', position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(0,0,0,0.95)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onMenuClick} style={{ background: 'transparent', color: '#FFF', border: 'none', fontSize: '24px', cursor: 'pointer', padding: 0 }}>☰</button>
        </div>
        <img src="/logo.png" alt="1760 SATRASHE60" style={{ height: '30px', objectFit: 'contain' }} />
        <div style={{ display: 'flex', gap: '16px' }}>
          <button onClick={() => { setShowSearchInput(true); window.scrollTo(0,0); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <button onClick={() => navigateTo('cart')} style={{ background: 'none', border: 'none', position: 'relative', cursor: 'pointer', fontSize: '18px' }}>
            🛍️️{cartItems.length > 0 && <span style={{ position: 'absolute', top: '-5px', right: '-8px', background: '#D4AF37', color: '#000', fontSize: '10px', fontWeight: '900', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartItems.length}</span>}
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

      {/* 🚀 AUTO-SLIDING HERO BANNER */}
      <div style={{ margin: '16px', borderRadius: '12px', border: '1px solid #333', overflow: 'hidden', position: 'relative', backgroundColor: '#111', display: 'flex', alignItems: 'center', height: '350px' }}>
        <div style={{ padding: '24px', flex: 1, zIndex: 2, background: 'linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 100%)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ color: '#D4AF37', fontSize: '10px', letterSpacing: '2px', marginBottom: '8px', fontWeight: '800' }}>NEW ARRIVALS</div>
          <h2 style={{ fontSize: '28px', fontWeight: '900', margin: '0 0 12px 0', lineHeight: '1.2' }}>FRESH DROPS<br/>EVERY WEEK</h2>
          <div style={{ fontSize: '10px', color: '#DDD', marginBottom: '24px', letterSpacing: '1px' }}>TRENDY • COMFY • AFFORDABLE</div>
          
          {/* 🚀 SHOP NOW BUTTON */}
          <button onClick={() => navigateTo('shop')} style={{ background: 'transparent', color: '#D4AF37', border: '1px solid #D4AF37', padding: '10px 16px', fontSize: '12px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', width: 'fit-content' }}>SHOP NOW →</button>
        </div>
        <div style={{ position: 'absolute', right: 0, top: 0, width: '60%', height: '100%', zIndex: 1 }}>
          <img src={heroImages[heroImgIndex]} alt="Hero Carousel" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.8s ease-in-out' }} />
        </div>
      </div>

      {/* CENTERED SHOP BY SIZE */}
      <div style={{ margin: '40px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'inline-block', border: '1px solid #D4AF37', borderRadius: '20px', padding: '8px 24px' }}>
            <span style={{ color: '#FFF', fontSize: '12px', fontWeight: '800', letterSpacing: '1px' }}>SHOP BY SIZE</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', overflowX: 'auto', scrollbarWidth: 'none' }} className="hide-scrollbar">
          {["XS", "S", "M", "L", "XL"].map(sz => (
            <button key={sz} onClick={() => navigateTo('size-filter', sz)} style={{ flexShrink: 0, width: '48px', height: '48px', background: '#111', border: '1px solid #333', borderRadius: '4px', color: '#D4AF37', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>{sz}</button>
          ))}
        </div>
      </div>

      {/* CENTERED SHOP BY CATEGORY */}
      <div style={{ margin: '40px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'inline-block', border: '1px solid #D4AF37', borderRadius: '20px', padding: '8px 24px' }}>
            <span style={{ color: '#FFF', fontSize: '12px', fontWeight: '800', letterSpacing: '1px' }}>SHOP BY CATEGORY</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[{n: 'Tops', i: '/dress1.png'}, {n: 'T-Shirts', i: '/dress2.png'}, {n: 'Kurtis', i: '/dress3.png'}, {n: 'One Pieces', i: '/dress4.png'}].map((cat, idx) => (
            <div key={idx} onClick={() => navigateTo('shop', cat.n)} style={{ background: '#111', borderRadius: '8px', overflow: 'hidden', border: '1px solid #222', cursor: 'pointer' }}>
              <img src={cat.i} alt={cat.n} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
              <div style={{ padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#FFF' }}>{cat.n}</div>
                  <div style={{ fontSize: '9px', color: '#D4AF37' }}>Explore Now →</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🚀 BEST SELLERS (FIXED IMAGES) */}
      <div style={{ margin: '50px 0', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'inline-block', border: '1px solid #D4AF37', borderRadius: '20px', padding: '8px 24px' }}>
            <span style={{ color: '#FFF', fontSize: '12px', fontWeight: '800', letterSpacing: '1px' }}>BEST SELLERS</span>
          </div>
        </div>
        
        <div style={{ position: 'relative', height: '420px', display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: '1000px' }}>
          {displayProducts.map((prod, idx) => {
            const isTop = idx === swipeIndex;
            const isSecond = idx === (swipeIndex + 1) % bestSellersCount;
            const isThird = idx === (swipeIndex + 2) % bestSellersCount;
            
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
                key={prod.id || idx} 
                onClick={() => { if(isTop) handleSwipe(); else handleOpenProduct(prod, 'home'); }}
                style={{
                  position: 'absolute', width: '270px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px', padding: '12px',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)', transform, zIndex, opacity, cursor: isTop ? 'grab' : 'pointer',
                  boxShadow: isTop ? '0 15px 30px rgba(0,0,0,0.8)' : 'none'
                }}
              >
                <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                  <span style={{ position: 'absolute', top: '8px', left: '8px', background: '#D4AF37', color: '#000', fontSize: '10px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '12px', zIndex: 2 }}>HOT</span>
                  
                  <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '6px', zIndex: 2 }}>
                    <button onClick={(e) => { e.stopPropagation(); handleAddToCart({...prod, quantity: 1, selectedSize: 'M'}); }} style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid #D4AF37', color: '#D4AF37', fontSize: '14px', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer' }}>🛒</button>
                    <button onClick={(e) => { e.stopPropagation(); handleToggleWishlist(prod.id); }} style={{ background: 'rgba(0,0,0,0.6)', border: 'none', color: '#FFF', fontSize: '14px', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer' }}>♡</button>
                  </div>
                  
                  <img src={prod.image || (prod.images && prod.images[0]) || '/dress1.png'} alt={prod.name || 'Product'} style={{ width: '100%', height: '320px', objectFit: 'cover' }} />
                </div>
                {isTop && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>₹{prod.price || '999'}</div>
                    <div style={{ fontSize: '10px', color: '#888' }}>Tap to swipe ↺</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Swipe Controls & View All */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginTop: '20px' }}>
          <button onClick={handleSwipeBack} style={{ background: '#222', border: '1px solid #444', color: '#FFF', padding: '8px 24px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
            ↺ Back (View Previous)
          </button>
          <button onClick={() => navigateTo('shop', 'Best Sellers')} style={{ background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '12px', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }}>
            VIEW ALL BEST SELLERS
          </button>
        </div>
      </div>

      {/* BIG THE 1760 DROP WITH 3 IMAGES */}
      <div style={{ margin: '60px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', border: '2px solid #D4AF37', borderRadius: '30px', padding: '14px 40px', gap: '15px' }}>
            <span style={{ color: '#FFF', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: '600' }}>THE</span>
            <img src="/logo.png" alt="1760" style={{ height: '35px' }} />
            <span style={{ color: '#FFF', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: '600' }}>DROP</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', padding: '0 16px', scrollbarWidth: 'none' }} className="hide-scrollbar">
          
          <div onClick={() => navigateTo('shop', 'T-Shirts')} style={{ minWidth: '220px', background: '#111', borderRadius: '12px', overflow: 'hidden', border: '1px solid #222', cursor: 'pointer' }}>
            <img src="/dress1.png" alt="Offer 1" style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
            <div style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ color: '#D4AF37', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px' }}>FLAT</div>
              <div style={{ color: '#FFF', fontSize: '22px', fontWeight: '900', marginBottom: '4px' }}>10% OFF</div>
              <div style={{ color: '#888', fontSize: '9px', marginBottom: '12px' }}>ON ALL T-SHIRTS</div>
              <button style={{ background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', padding: '8px 20px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>SHOP T-SHIRTS →</button>
            </div>
          </div>

          <div onClick={() => navigateTo('shop', 'Kurtis')} style={{ minWidth: '220px', background: '#111', borderRadius: '12px', overflow: 'hidden', border: '1px solid #222', cursor: 'pointer' }}>
            <img src="/dress3.png" alt="Offer 2" style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
            <div style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ color: '#D4AF37', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px' }}>BUY 2 GET</div>
              <div style={{ color: '#FFF', fontSize: '22px', fontWeight: '900', marginBottom: '4px' }}>₹100 OFF</div>
              <div style={{ color: '#888', fontSize: '9px', marginBottom: '12px' }}>ON KURTIS</div>
              <button style={{ background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', padding: '8px 20px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>SHOP KURTIS →</button>
            </div>
          </div>
          
          <div onClick={() => navigateTo('shop', 'One Pieces')} style={{ minWidth: '220px', background: '#111', borderRadius: '12px', overflow: 'hidden', border: '1px solid #222', cursor: 'pointer' }}>
            <img src="/dress4.png" alt="Offer 3" style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
            <div style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ color: '#D4AF37', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px' }}>FLAT</div>
              <div style={{ color: '#FFF', fontSize: '22px', fontWeight: '900', marginBottom: '4px' }}>15% OFF</div>
              <div style={{ color: '#888', fontSize: '9px', marginBottom: '12px' }}>ON ONE PIECES</div>
              <button style={{ background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', padding: '8px 20px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>SHOP ONE PIECES →</button>
            </div>
          </div>

        </div>
        
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button onClick={() => navigateTo('shop')} style={{ background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '12px', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }}>
            VIEW ALL OFFERS
          </button>
        </div>
      </div>

      {/* PLAY & WIN SPINNER */}
      <div style={{ margin: '60px 0', padding: '40px 0', backgroundColor: '#050505', borderTop: '1px solid #1A1A1A', borderBottom: '1px solid #1A1A1A' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'inline-block', border: '1px solid #333', padding: '15px 40px', borderRadius: '4px', backgroundColor: '#000' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', color: '#FFF', margin: '0 0 5px 0' }}>PLAY &</h2>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: '42px', color: '#D4AF37', margin: 0, fontWeight: '900', transform: 'skewX(-10deg)', letterSpacing: '2px' }}>WIN</h2>
          </div>
        </div>

        <div style={{ position: 'relative', width: '280px', height: '280px', margin: '0 auto' }}>
          <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', width: '0', height: '0', borderLeft: '15px solid transparent', borderRight: '15px solid transparent', borderTop: '25px solid #D4AF37', zIndex: 10 }}></div>
          
          <div 
            style={{ 
              width: '100%', height: '100%', borderRadius: '50%', border: '6px solid #D4AF37',
              background: 'conic-gradient(#111 0deg 45deg, #D4AF37 45deg 90deg, #111 90deg 135deg, #D4AF37 135deg 180deg, #111 180deg 225deg, #D4AF37 225deg 270deg, #111 270deg 315deg, #D4AF37 315deg 360deg)',
              transition: 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)',
              transform: `rotate(${rotation}deg)`,
              boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)'
            }}
          ></div>

          <button 
            onClick={spinWheel}
            disabled={isSpinning}
            style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#D4AF37', color: '#000',
              border: '6px solid #111', fontSize: '16px', fontWeight: '900', cursor: isSpinning ? 'not-allowed' : 'pointer', zIndex: 5,
              boxShadow: '0 4px 15px rgba(0,0,0,0.6)'
            }}
          >
            SPIN
          </button>
        </div>
      </div>

      {/* TRUST BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px 0', margin: '30px 0' }}>
        {[{i:'🚚', t:'Free Shipping'}, {i:'💳', t:'COD Available'}, {i:'🛡️', t:'Secure Payment'}, {i:'🎧', t:'24/7 Support'}].map((tb, idx) => (
          <div key={idx} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>{tb.i}</div>
            <div style={{ fontSize: '8px', color: '#888', textTransform: 'uppercase' }}>{tb.t}</div>
          </div>
        ))}
      </div>

      {/* LIFESTYLE & FOOTER */}
      <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#050505', borderTop: '1px solid #222' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#FFF', margin: '0 0 16px 0', letterSpacing: '2px' }}>IT'S A LIFESTYLE</h3>
        <p style={{ fontSize: '12px', color: '#888', margin: '0 0 24px 0', lineHeight: '1.6' }}>At SATRASHE60, we bring you the perfect blend of street style, comfort and confidence. Because your story deserves the best fit.</p>
        <button onClick={() => navigateTo('about')} style={{ background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', padding: '10px 24px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>KNOW OUR STORY ...</button>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', marginBottom: '10px' }}>
          <img src="/logo.png" alt="SATRASHE60" style={{ height: '50px' }} />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', fontSize: '12px', color: '#FFF', fontWeight: 'bold' }}>
          <span style={{cursor:'pointer'}} onClick={() => navigateTo('home')}>Home</span>
          <span style={{cursor:'pointer'}} onClick={() => navigateTo('shop')}>Shop</span>
          <span style={{cursor:'pointer'}} onClick={() => navigateTo('about')}>About</span>
          <span style={{cursor:'pointer'}} onClick={() => navigateTo('about')}>Contact</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 🚀 APP COMPONENT
// ==========================================
function App() {
  const { 
    currentUser, setCurrentUser,
    cartItems, handleAddToCart: contextAddToCart, handleRemoveFromCart: contextRemoveFromCart, handleUpdateCartQuantity, clearCart,
    wishlist, handleToggleWishlist: contextToggleWishlist,
    placedOrders, addOrder
  } = useContext(ShopContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); 
  const [historyStack, setHistoryStack] = useState(['home']); 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sourceBackPage, setSourceBackPage] = useState('shop');
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState('');
  
  const [dbProducts, setDbProducts] = useState(() => {
    const cached = localStorage.getItem('satrashe60_cached_products');
    return cached ? JSON.parse(cached) : [];
  });

  useEffect(() => {
    const fetchProductsWithRetry = (retries = 10) => { 
      fetch('https://satrashe60-ecommerce.onrender.com/api/products')
        .then((response) => {
          if (!response.ok) throw new Error("Server abhi uth raha hai...");
          return response.json();
        })
        .then((data) => {
          const kapde = Array.isArray(data) ? data : (data.products || data.data || []);
          const safeKapde = kapde.map(p => ({
            ...p,
            id: p._id || p.id, 
            sizes: Array.isArray(p.sizes) && p.sizes.length > 0 ? p.sizes : ["S", "M", "L", "XL"],
            image: p.image || (p.images && p.images[0]) || '/dress1.png',
            name: p.name || 'Premium Product',
            price: p.price || 0
          }));
          setDbProducts(safeKapde);
          localStorage.setItem('satrashe60_cached_products', JSON.stringify(safeKapde));
        })
        .catch((error) => {
          if (retries > 0) {
            setTimeout(() => fetchProductsWithRetry(retries - 1), 3000);
          }
        });
    };
    fetchProductsWithRetry();
  }, []);

  const [toastMessage, setToastMessage] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleProceedToAddress = () => {
    if (currentUser) {
      setShowCheckout(true);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleGoBack = () => {
    if (historyStack.length > 1) {
      const newHistory = [...historyStack];
      newHistory.pop(); 
      const previousPage = newHistory[newHistory.length - 1]; 
      setHistoryStack(newHistory);
      setCurrentPage(previousPage);
      window.scrollTo(0, 0);
    }
  };

  const handleOpenProduct = (productOrSlug, source = 'shop') => {
    try {
      let foundProduct;
      if (typeof productOrSlug === 'object' && productOrSlug !== null) {
        foundProduct = productOrSlug;
      } else if (typeof productOrSlug === 'string') {
        const searchSlug = productOrSlug.toLowerCase();
        foundProduct = dbProducts.find(p => p?.slug === productOrSlug || p?.name === productOrSlug || (p?.name && p.name.toLowerCase() === searchSlug) || p?._id === productOrSlug || p?.id === productOrSlug);
        if (!foundProduct) {
          foundProduct = (MASTER_PRODUCTS || []).find(p => p?.slug === productOrSlug || p?.name === productOrSlug || (p?.name && p.name.toLowerCase() === searchSlug));
        }
      }
      let finalProduct = foundProduct || dbProducts[0] || (MASTER_PRODUCTS && MASTER_PRODUCTS[0]);
      if (finalProduct) {
        finalProduct = { ...finalProduct, sizes: finalProduct.sizes || ["S", "M", "L", "XL"], images: finalProduct.images || [finalProduct.image || '/dress1.png'] };
      }
      setSelectedProduct(finalProduct);
      setSourceBackPage(source);
      setCurrentPage('product-detail');
      setHistoryStack(prev => [...prev, 'product-detail']);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Product open error:", error);
      setCurrentPage('home'); 
    }
  };

  const navigateTo = (pageName, category = "ALL") => {
    if (pageName === currentPage) return; 
    if (pageName.startsWith('/product/')) {
      const slug = pageName.replace('/product/', '');
      handleOpenProduct(slug, currentPage);
      return;
    }
    setCurrentPage(pageName);
    setSelectedCategory(category);
    setHistoryStack(prev => [...prev, pageName]);
    window.scrollTo(0, 0);
  };

  const handleToggleWishlist = (id) => contextToggleWishlist(id, triggerToast);
  const handleAddToCart = (item) => contextAddToCart(item, triggerToast);
  const handleRemoveFromCart = (idx) => contextRemoveFromCart(idx, triggerToast);
  
  const handleBuyNow = (item) => {
    contextAddToCart(item, null);
    setShowCheckout(true);
  };

  const handleOrderPlacedSuccess = (newOrderDetails) => {
    const createdOrder = {
      id: `SATRA-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      customerName: currentUser?.name || 'Customer',
      items: [...cartItems],
      totalAmount: cartItems.reduce((acc, i) => acc + (Number(i.price) * (i.quantity || 1)), 0),
      status: 'Pending',
      ...newOrderDetails
    };
    addOrder(createdOrder);
    clearCart();
    setShowCheckout(false);
    triggerToast(`🎉 Order Placed Successfully!`);
  };

  if (currentPage === 'admin') return <AdminDashboard onLogout={() => navigateTo('home')} onNavigateToWebsite={() => navigateTo('home')} />;

  return (
    <div className="app" style={{ backgroundColor: '#000000', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: '80px', right: '20px', backgroundColor: '#0A0A0A', color: '#FFF', padding: '12px 20px', borderRadius: '6px', fontSize: '12px', fontWeight: '800', zIndex: 99999, borderLeft: '4px solid #D4AF37' }}>
          {toastMessage}
        </div>
      )}

      {currentPage !== 'home' && currentPage !== 'shop' && currentPage !== 'product-detail' && currentPage !== 'cart' && (
   <MobileHeaderNav cartCount={cartItems.length} wishlistCount={wishlist.length} isLoggedIn={!!currentUser} currentPage={currentPage} navigateTo={navigateTo} goBack={handleGoBack} historyLength={historyStack.length} />
)}
      {currentPage === 'account' ? <Account currentUser={currentUser} orders={placedOrders} onLogin={setCurrentUser} onLogout={() => setCurrentUser(null)} onNavigateToShop={() => navigateTo('shop')} />
      : currentPage === 'community' ? <Community currentUser={currentUser} onNavigateToAbout={() => navigateTo('about')} onNavigateToAccount={() => navigateTo('account')} />
      : currentPage === 'about' ? <About onNavigateToShop={() => navigateTo('shop')} />
      : currentPage === 'product-detail' ? (isMobile ? <MobileProductDetail product={selectedProduct} onBack={handleGoBack} onAddToCart={handleAddToCart} onNavigateToBag={() => navigateTo('cart')} /> : <ProductDetail product={selectedProduct} onBack={() => navigateTo(sourceBackPage)} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} sourceTitle={sourceBackPage.toUpperCase()} />)
      : currentPage === 'category-plp' ? <CategoryPLP categoryName={selectedCategory || "ALL"} products={MASTER_PRODUCTS} onBack={() => navigateTo('home')} onProductClick={(prod) => handleOpenProduct(prod, 'category-plp')} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} navigateTo={navigateTo} />
      : currentPage === 'size-filter' || currentPage === 'shop' ? <Shop products={dbProducts} initialCategory={selectedCategory} initialSizes={currentPage === 'size-filter' ? [selectedCategory] : []} initialSearchQuery={searchQuery} onNavigate={navigateTo} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} onAddToCart={handleAddToCart} />
      : currentPage === 'cart' ? (
        isMobile ? <MobileBag cartItems={cartItems} onBack={handleGoBack} onUpdateQuantity={handleUpdateCartQuantity} onRemoveItem={handleRemoveFromCart} onProceedToAddress={handleProceedToAddress} /> : <div style={{ padding: '60px 4%', minHeight: '60vh', backgroundColor: '#FAFAFA' }}><h2 style={{ textAlign: 'center' }}>YOUR BAG</h2>{cartItems.length === 0 ? <div style={{ textAlign: 'center' }}><button onClick={() => navigateTo('shop')}>SHOP NOW</button></div> : <div><button onClick={() => setShowCheckout(true)}>PROCEED TO CHECKOUT</button></div>}</div>
      ) : (
        <Home 
          navigateTo={navigateTo} 
          cartItems={cartItems} 
          dbProducts={dbProducts} 
          handleOpenProduct={handleOpenProduct}
          handleAddToCart={handleAddToCart}
          handleToggleWishlist={handleToggleWishlist}
          onMenuClick={() => setIsMenuOpen(true)}
        />
      )}

      <MobileAuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLoginSuccess={(userData) => { setCurrentUser(userData); setShowAuthModal(false); setShowCheckout(true); }} />

      {currentPage !== 'product-detail' && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '60px', backgroundColor: '#000', borderTop: '1px solid #222', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 100 }}>
          <button onClick={() => navigateTo('home')} style={{ background: 'none', border: 'none', fontSize: '20px', color: currentPage === 'home' ? '#D4AF37' : '#888' }}>🏠</button>
          <button onClick={() => { window.scrollTo(0,0); navigateTo('shop'); }} style={{ background: 'none', border: 'none', fontSize: '20px', color: '#888' }}>🔍</button>
          <button onClick={() => navigateTo('shop', 'New Arrivals')} style={{ background: 'none', border: 'none', fontSize: '10px', fontWeight: '900', color: '#888' }}>NEW</button>
          <button onClick={() => navigateTo('cart')} style={{ background: 'none', border: 'none', fontSize: '20px', color: currentPage === 'cart' ? '#D4AF37' : '#888', position: 'relative' }}>
            🛍{cartItems.length > 0 && <span style={{ position: 'absolute', top: '-4px', right: '-6px', background: '#D4AF37', color: '#000', fontSize: '10px', fontWeight: '900', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartItems.length}</span>}
          </button>
          <button onClick={() => navigateTo('account')} style={{ background: 'none', border: 'none', fontSize: '20px', color: currentPage === 'account' ? '#D4AF37' : '#888' }}>👤</button>
        </div>
      )}

      {showCheckout && <CheckoutModal cartItems={cartItems} onClose={() => setShowCheckout(false)} onOrderSuccess={handleOrderPlacedSuccess} onClearCart={() => setCartItems([])} />}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navigateTo={navigateTo} currentUser={currentUser} />
    </div>
  );
}

export default App;