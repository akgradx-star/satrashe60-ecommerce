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
import ShopYourSize from './ShopYourSize';
import { ShopContext } from './ShopContext'; 

// ==========================================
// 🚀 REUSABLE SECTION HEADER BUTTON
// ==========================================
const SectionHeading = ({ title }) => (
  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
    <div style={{ 
      display: 'inline-block', 
      border: '1px solid #D4AF37', 
      borderRadius: '12px', 
      padding: '6px 20px', 
      color: '#FFF', 
      fontSize: '11px', 
      fontWeight: '800', 
      letterSpacing: '1px',
      textTransform: 'uppercase'
    }}>
      {title}
    </div>
  </div>
);

// ==========================================
// 🚀 HOME COMPONENT
// ==========================================
function Home({ navigateTo, cartItems, dbProducts, handleOpenProduct, handleAddToCart, handleToggleWishlist, onMenuClick }) {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // HERO CAROUSEL STATE
  const [heroImgIndex, setHeroImgIndex] = useState(0);
  const heroImages = ['/dress2.png', '/dress1.png', '/dress3.png', '/dress4.png'];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // BEST SELLERS SWIPE STATE
  const displayProducts = dbProducts && dbProducts.length > 0 ? dbProducts.slice(0, 10) : MASTER_PRODUCTS.slice(0, 5);
  const [swipeIndex, setSwipeIndex] = useState(0);
  const bestSellersCount = displayProducts.length || 1;

  const handleSwipe = () => setSwipeIndex((prev) => (prev + 1) % bestSellersCount);
  const handleSwipeBack = (e) => {
    e.stopPropagation();
    setSwipeIndex((prev) => (prev - 1 + bestSellersCount) % bestSellersCount);
  };

  // SPINNER STATE & PREMIUM OFFERS
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const spinnerSegments = ['TOP FOR ₹9', 'FREE DELIVERY', '₹200 OFF', '₹100 OFF', '₹50 OFF', 'EXTRA DISCOUNT', 'SPIN AGAIN', 'FREE DELIVERY'];

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
      if(wonPrize === 'SPIN AGAIN') {
        alert('Oops! Try spinning again.');
      } else {
        alert(`🎉 Congratulations! You won: ${wonPrize}`);
      }
    }, 4000); 
  };

  return (
    <div style={{ backgroundColor: '#121212', color: '#FFF', paddingBottom: '80px', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px', padding: '0 16px', position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(18, 18, 18, 0.95)', backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onMenuClick} style={{ background: 'transparent', color: '#FFF', border: 'none', fontSize: '24px', cursor: 'pointer', padding: 0 }}>☰</button>
        </div>
        <img src="/logo.png" alt="1760 SATRASHE60" style={{ height: '28px', objectFit: 'contain' }} />
        <div style={{ display: 'flex', gap: '16px' }}>
          <button onClick={() => { setShowSearchInput(!showSearchInput); window.scrollTo({top: 0, behavior: 'smooth'}); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FFF', fontSize: '20px' }}>🔍</button>
          <button onClick={() => navigateTo('cart')} style={{ background: 'none', border: 'none', position: 'relative', cursor: 'pointer', fontSize: '18px' }}>
            🛍{cartItems.length > 0 && <span style={{ position: 'absolute', top: '-5px', right: '-8px', background: '#D4AF37', color: '#000', fontSize: '10px', fontWeight: '900', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartItems.length}</span>}
          </button>
        </div>
      </div>

      {showSearchInput && (
        <div style={{ padding: '16px', backgroundColor: '#1A1A1A', display: 'flex', gap: '10px', borderBottom: '1px solid #333' }}>
          <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#121212', color: '#FFF' }} />
          <button onClick={() => { navigateTo('shop', 'ALL'); setShowSearchInput(false); }} style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '0 16px', borderRadius: '4px', fontWeight: 'bold' }}>Go</button>
          <button onClick={() => { setShowSearchInput(false); setSearchQuery(''); }} style={{ background: 'none', color: '#FFF', border: 'none' }}>✕</button>
        </div>
      )}

      {/* AUTO-SLIDING HERO BANNER */}
      <div style={{ margin: '16px', borderRadius: '8px', overflow: 'hidden', position: 'relative', backgroundColor: '#1A1A1A', display: 'flex', alignItems: 'center', height: '350px' }}>
        <div style={{ padding: '24px', flex: 1, zIndex: 2, background: 'linear-gradient(90deg, rgba(18,18,18,0.95) 0%, rgba(18,18,18,0.3) 100%)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ color: '#D4AF37', fontSize: '10px', letterSpacing: '2px', marginBottom: '8px', fontWeight: '800' }}>PREMIUM EDITION</div>
          <h2 style={{ fontSize: '28px', fontWeight: '900', margin: '0 0 12px 0', lineHeight: '1.2' }}>FRESH DROPS<br/>EVERY WEEK</h2>
          <div style={{ fontSize: '10px', color: '#DDD', marginBottom: '24px', letterSpacing: '1px' }}>TRENDY • COMFY • AFFORDABLE</div>
          <button onClick={() => navigateTo('shop')} style={{ background: 'transparent', color: '#D4AF37', border: '1px solid #D4AF37', padding: '10px 20px', fontSize: '12px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', width: 'fit-content' }}>SHOP NOW →</button>
        </div>
        <div style={{ position: 'absolute', right: 0, top: 0, width: '65%', height: '100%', zIndex: 1 }}>
          <img src={heroImages[heroImgIndex]} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', transition: 'opacity 0.8s ease-in-out' }} />
        </div>
      </div>

      {/* SHOP BY SIZE */}
      <div style={{ margin: '40px 16px' }}>
        <SectionHeading title="SHOP BY SIZE" />
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '5px' }}>
          {["XS", "S", "M", "L", "XL"].map(sz => (
            <button key={sz} onClick={() => navigateTo('size-filter', sz)} style={{ flexShrink: 0, width: '44px', height: '44px', background: '#1A1A1A', border: '1px solid #333', borderRadius: '6px', color: '#D4AF37', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>{sz}</button>
          ))}
        </div>
      </div>

      {/* CIRCULAR CATEGORIES (Modern App Style) */}
      <div style={{ margin: '40px 0' }}>
        <SectionHeading title="CATEGORIES" />
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', scrollbarWidth: 'none', padding: '0 16px 10px 16px' }}>
          {[
            { n: 'Kurtis', i: '/dress3.png' }, 
            { n: 'Tops', i: '/dress1.png' }, 
            { n: 'T-Shirts', i: '/dress2.png' }, 
            { n: 'One Pieces', i: '/dress4.png' },
            { n: 'Jeans', i: '/dress1.png' },
            { n: 'Co-ords', i: '/dress2.png' }
          ].map((cat, idx) => (
            <div key={idx} onClick={() => navigateTo('shop', cat.n)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '70px', cursor: 'pointer' }}>
              <div style={{ width: '68px', height: '68px', borderRadius: '50%', border: '2px solid #D4AF37', padding: '2px', marginBottom: '8px', backgroundColor: '#1A1A1A' }}>
                <img src={cat.i} alt={cat.n} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top' }} />
              </div>
              <span style={{ fontSize: '11px', color: '#FFF', fontWeight: '600', textAlign: 'center' }}>{cat.n}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SPIN & WIN (Moved up, Modern Premium Design) */}
      <div style={{ margin: '40px 0', padding: '30px 16px', backgroundColor: '#1A1A1A', borderTop: '1px solid #222', borderBottom: '1px solid #222' }}>
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <h2 style={{ fontSize: '18px', color: '#D4AF37', margin: '0 0 4px 0', fontWeight: '900', letterSpacing: '2px' }}>SPIN & WIN</h2>
          <p style={{ fontSize: '11px', color: '#888', margin: 0, textTransform: 'uppercase' }}>Try your luck & unlock a special offer</p>
        </div>

        <div style={{ position: 'relative', width: '240px', height: '240px', margin: '0 auto' }}>
          <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', width: '0', height: '0', borderLeft: '12px solid transparent', borderRight: '12px solid transparent', borderTop: '20px solid #D4AF37', zIndex: 10 }}></div>
          
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '4px solid #D4AF37', background: 'conic-gradient(#121212 0deg 45deg, #222 45deg 90deg, #121212 90deg 135deg, #222 135deg 180deg, #121212 180deg 225deg, #222 225deg 270deg, #121212 270deg 315deg, #222 315deg 360deg)', transition: 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)', transform: `rotate(${rotation}deg)`, boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)' }}></div>

          <button onClick={spinWheel} disabled={isSpinning} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#D4AF37', color: '#121212', border: '4px solid #1A1A1A', fontSize: '14px', fontWeight: '900', cursor: isSpinning ? 'not-allowed' : 'pointer', zIndex: 5, boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
            SPIN
          </button>
        </div>
      </div>

      {/* THE 1760 DROP (Redesigned with Light Accents) */}
      <div style={{ margin: '50px 0', position: 'relative', overflow: 'hidden', padding: '20px 0' }}>
        
        {/* Decorative Side Accents */}
        <div style={{ position: 'absolute', left: 0, top: '10%', bottom: '10%', width: '3px', background: 'linear-gradient(180deg, transparent 0%, rgba(212,175,55,0.7) 50%, transparent 100%)', boxShadow: '2px 0 10px rgba(212,175,55,0.3)', zIndex: 0 }} />
        <div style={{ position: 'absolute', right: 0, top: '10%', bottom: '10%', width: '3px', background: 'linear-gradient(180deg, transparent 0%, rgba(212,175,55,0.7) 50%, transparent 100%)', boxShadow: '-2px 0 10px rgba(212,175,55,0.3)', zIndex: 0 }} />

        <div style={{ textAlign: 'center', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #D4AF37', borderRadius: '24px', padding: '10px 30px', gap: '12px', backgroundColor: '#121212' }}>
            <span style={{ color: '#FFF', fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: '600' }}>THE</span>
            <img src="/logo.png" alt="1760" style={{ height: '28px' }} />
            <span style={{ color: '#FFF', fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: '600' }}>DROP</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', padding: '0 20px', scrollbarWidth: 'none', position: 'relative', zIndex: 1 }}>
          <div onClick={() => navigateTo('shop', 'T-Shirts')} style={{ minWidth: '220px', background: '#1A1A1A', borderRadius: '8px', overflow: 'hidden', border: '1px solid #222', cursor: 'pointer' }}>
            <img src="/dress1.png" alt="Offer 1" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', objectPosition: 'top' }} />
            <div style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ color: '#D4AF37', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px' }}>FLAT</div>
              <div style={{ color: '#FFF', fontSize: '20px', fontWeight: '900', marginBottom: '4px' }}>10% OFF</div>
              <div style={{ color: '#888', fontSize: '10px', marginBottom: '12px' }}>ON ALL T-SHIRTS</div>
            </div>
          </div>

          <div onClick={() => navigateTo('shop', 'Kurtis')} style={{ minWidth: '220px', background: '#1A1A1A', borderRadius: '8px', overflow: 'hidden', border: '1px solid #222', cursor: 'pointer' }}>
            <img src="/dress3.png" alt="Offer 2" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', objectPosition: 'top' }} />
            <div style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ color: '#D4AF37', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px' }}>BUY 2 GET</div>
              <div style={{ color: '#FFF', fontSize: '20px', fontWeight: '900', marginBottom: '4px' }}>₹100 OFF</div>
              <div style={{ color: '#888', fontSize: '10px', marginBottom: '12px' }}>ON KURTIS</div>
            </div>
          </div>
          
          <div onClick={() => navigateTo('shop', 'One Pieces')} style={{ minWidth: '220px', background: '#1A1A1A', borderRadius: '8px', overflow: 'hidden', border: '1px solid #222', cursor: 'pointer' }}>
            <img src="/dress4.png" alt="Offer 3" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', objectPosition: 'top' }} />
            <div style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ color: '#D4AF37', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px' }}>FLAT</div>
              <div style={{ color: '#FFF', fontSize: '20px', fontWeight: '900', marginBottom: '4px' }}>15% OFF</div>
              <div style={{ color: '#888', fontSize: '10px', marginBottom: '12px' }}>ON ONE PIECES</div>
            </div>
          </div>
        </div>
      </div>

      {/* BEST SELLERS (Perfectly Aligned Images) */}
      <div style={{ margin: '50px 0', overflow: 'hidden' }}>
        <SectionHeading title="BEST SELLERS" />
        
        <div style={{ position: 'relative', height: '380px', display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: '1000px' }}>
          {displayProducts.map((prod, idx) => {
            const isTop = idx === swipeIndex;
            const isSecond = idx === (swipeIndex + 1) % bestSellersCount;
            const isThird = idx === (swipeIndex + 2) % bestSellersCount;
            
            if (!isTop && !isSecond && !isThird) return null; 

            let transform = '';
            let zIndex = 0;
            let opacity = 1;

            if (isTop) {
              transform = 'rotate(-3deg) scale(1) translateY(0)';
              zIndex = 30;
            } else if (isSecond) {
              transform = 'rotate(5deg) scale(0.95) translateX(25px) translateY(15px)';
              zIndex = 20;
              opacity = 0.8;
            } else if (isThird) {
              transform = 'rotate(-2deg) scale(0.9) translateX(-15px) translateY(30px)';
              zIndex = 10;
              opacity = 0.5;
            }

            return (
              <div 
                key={prod.id || idx} 
                onClick={() => { if(isTop) handleSwipe(); else handleOpenProduct(prod, 'home'); }}
                style={{
                  position: 'absolute', width: '250px', backgroundColor: '#1A1A1A', border: '1px solid #333', borderRadius: '8px', padding: '10px',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)', transform, zIndex, opacity, cursor: isTop ? 'grab' : 'pointer',
                  boxShadow: isTop ? '0 10px 25px rgba(0,0,0,0.6)' : 'none'
                }}
              >
                <div style={{ position: 'relative', borderRadius: '6px', overflow: 'hidden' }}>
                  <span style={{ position: 'absolute', top: '8px', left: '8px', background: '#D4AF37', color: '#121212', fontSize: '9px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', zIndex: 2 }}>HOT</span>
                  
                  <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '6px', zIndex: 2 }}>
                    <button onClick={(e) => { e.stopPropagation(); handleAddToCart({...prod, quantity: 1, selectedSize: 'M'}); }} style={{ background: 'rgba(18,18,18,0.7)', border: '1px solid #D4AF37', color: '#D4AF37', fontSize: '13px', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer' }}>🛍</button>
                    <button onClick={(e) => { e.stopPropagation(); handleToggleWishlist(prod.id); }} style={{ background: 'rgba(18,18,18,0.7)', border: 'none', color: '#FFF', fontSize: '13px', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer' }}>♡</button>
                  </div>
                  
                  {/* FIXED IMAGE ALIGNMENT */}
                  <img src={prod.image || (prod.images && prod.images[0]) || '/dress1.png'} alt={prod.name || 'Product'} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', objectPosition: 'top center' }} />
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

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', marginTop: '10px' }}>
          <button onClick={handleSwipeBack} style={{ background: '#1A1A1A', border: '1px solid #333', color: '#FFF', padding: '8px 20px', borderRadius: '20px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}>
            ↺ Undo Swipe
          </button>
        </div>
      </div>

      {/* TRUST BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px 0', margin: '30px 0', borderTop: '1px solid #222' }}>
        {[{i:'🚚', t:'Free Shipping'}, {i:'💳', t:'COD Available'}, {i:'🛡️', t:'Secure Payment'}, {i:'🎧', t:'24/7 Support'}].map((tb, idx) => (
          <div key={idx} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>{tb.i}</div>
            <div style={{ fontSize: '8px', color: '#888', textTransform: 'uppercase' }}>{tb.t}</div>
          </div>
        ))}
      </div>

      {/* LIFESTYLE & FOOTER */}
      <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#1A1A1A', borderTop: '1px solid #222' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#FFF', margin: '0 0 12px 0', letterSpacing: '2px' }}>IT'S A LIFESTYLE</h3>
        <p style={{ fontSize: '11px', color: '#888', margin: '0 0 20px 0', lineHeight: '1.6' }}>At SATRASHE60, we bring you the perfect blend of street style, comfort and confidence.</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', marginBottom: '10px' }}>
          <img src="/logo.png" alt="SATRASHE60" style={{ height: '35px' }} />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '16px', fontSize: '11px', color: '#FFF', fontWeight: 'bold' }}>
          <span style={{cursor:'pointer'}} onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); navigateTo('home'); }}>Home</span>
          <span style={{cursor:'pointer'}} onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); navigateTo('shop'); }}>Shop</span>
          <span style={{cursor:'pointer'}} onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); navigateTo('about'); }}>About</span>
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
    // Smooth scrolling globally
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.backgroundColor = '#121212';
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
    setTimeout(() => setToastMessage(null), 3000);
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
      window.scrollTo({top: 0, behavior: 'smooth'});
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
      window.scrollTo({top: 0, behavior: 'smooth'});
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
    window.scrollTo({top: 0, behavior: 'smooth'});
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
    <div className="app" style={{ backgroundColor: '#121212', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: '80px', right: '20px', backgroundColor: '#1A1A1A', color: '#FFF', padding: '12px 20px', borderRadius: '6px', fontSize: '12px', fontWeight: '800', zIndex: 99999, borderLeft: '4px solid #D4AF37' }}>
          {toastMessage}
        </div>
      )}

      {currentPage !== 'home' && currentPage !== 'shop' && currentPage !== 'product-detail' && currentPage !== 'cart' && currentPage !== 'size-filter' && (
        <MobileHeaderNav cartCount={cartItems.length} wishlistCount={wishlist.length} isLoggedIn={!!currentUser} currentPage={currentPage} navigateTo={navigateTo} goBack={handleGoBack} historyLength={historyStack.length} />
      )}

      {currentPage === 'account' ? <Account currentUser={currentUser} orders={placedOrders} onLogin={setCurrentUser} onLogout={() => setCurrentUser(null)} onNavigateToShop={() => navigateTo('shop')} />
      : currentPage === 'community' ? <Community currentUser={currentUser} onNavigateToAbout={() => navigateTo('about')} onNavigateToAccount={() => navigateTo('account')} />
      : currentPage === 'about' ? <About onNavigateToShop={() => navigateTo('shop')} />
      : currentPage === 'product-detail' ? (isMobile ? <MobileProductDetail product={selectedProduct} onBack={handleGoBack} onAddToCart={handleAddToCart} onNavigateToBag={() => navigateTo('cart')} /> : <ProductDetail product={selectedProduct} onBack={() => navigateTo(sourceBackPage)} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} sourceTitle={sourceBackPage.toUpperCase()} />)
      : currentPage === 'category-plp' ? <CategoryPLP categoryName={selectedCategory || "ALL"} products={MASTER_PRODUCTS} onBack={() => navigateTo('home')} onProductClick={(prod) => handleOpenProduct(prod, 'category-plp')} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} navigateTo={navigateTo} />
      : currentPage === 'size-filter' ? <ShopYourSize products={dbProducts} initialSizes={[selectedCategory]} navigateTo={navigateTo} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} onAddToCart={handleAddToCart} />
      : currentPage === 'shop' ? <Shop products={dbProducts} initialCategory={selectedCategory} initialSearchQuery={searchQuery} onNavigate={navigateTo} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} onAddToCart={handleAddToCart} />
      : currentPage === 'cart' ? (
        isMobile ? <MobileBag cartItems={cartItems} onBack={handleGoBack} onUpdateQuantity={handleUpdateCartQuantity} onRemoveItem={handleRemoveFromCart} onProceedToAddress={handleProceedToAddress} /> : <div style={{ padding: '60px 4%', minHeight: '60vh', backgroundColor: '#1A1A1A' }}><h2 style={{ textAlign: 'center', color: '#FFF' }}>YOUR BAG</h2>{cartItems.length === 0 ? <div style={{ textAlign: 'center' }}><button onClick={() => navigateTo('shop')}>SHOP NOW</button></div> : <div><button onClick={() => setShowCheckout(true)}>PROCEED TO CHECKOUT</button></div>}</div>
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
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '60px', backgroundColor: 'rgba(18, 18, 18, 0.98)', borderTop: '1px solid #222', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 100, backdropFilter: 'blur(10px)' }}>
          <button onClick={() => navigateTo('home')} style={{ background: 'none', border: 'none', fontSize: '20px', color: currentPage === 'home' ? '#D4AF37' : '#666' }}>🏠</button>
          <button onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); navigateTo('shop'); }} style={{ background: 'none', border: 'none', fontSize: '20px', color: '#666' }}>🔍</button>
          <button onClick={() => navigateTo('shop', 'New Arrivals')} style={{ background: 'none', border: 'none', fontSize: '10px', fontWeight: '900', color: '#666' }}>NEW</button>
          <button onClick={() => navigateTo('cart')} style={{ background: 'none', border: 'none', fontSize: '20px', color: currentPage === 'cart' ? '#D4AF37' : '#666', position: 'relative' }}>
            🛍{cartItems.length > 0 && <span style={{ position: 'absolute', top: '-4px', right: '-6px', background: '#D4AF37', color: '#000', fontSize: '10px', fontWeight: '900', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartItems.length}</span>}
          </button>
          <button onClick={() => navigateTo('account')} style={{ background: 'none', border: 'none', fontSize: '20px', color: currentPage === 'account' ? '#D4AF37' : '#666' }}>👤</button>
        </div>
      )}

      {showCheckout && <CheckoutModal cartItems={cartItems} onClose={() => setShowCheckout(false)} onOrderSuccess={handleOrderPlacedSuccess} onClearCart={() => setCartItems([])} />}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navigateTo={navigateTo} currentUser={currentUser} />
    </div>
  );
}

export default App;