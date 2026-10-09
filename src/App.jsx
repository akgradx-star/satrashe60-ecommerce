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
  <div style={{ textAlign: 'center', marginBottom: '24px', marginTop: '20px' }}>
    <div style={{ 
      display: 'inline-block', 
      border: '1px solid #D4AF37', 
      borderRadius: '20px', 
      padding: '8px 24px', 
      color: '#D4AF37', 
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: '18px', 
      letterSpacing: '2px',
      textTransform: 'uppercase',
      backgroundColor: 'transparent'
    }}>
      {title}
    </div>
  </div>
);

// ==========================================
// 🚀 GIFT PACKAGING COMPONENT
// ==========================================
const GiftPackagingSection = ({ onAddGiftPacking }) => {
  const [showOptions, setShowOptions] = useState(false);
  const options = [
    { id: 'g1', name: 'Basic Wrap', price: 20 },
    { id: 'g2', name: 'Standard Box', price: 50 },
    { id: 'g3', name: 'Ribbon Pack', price: 80 },
    { id: 'g4', name: 'Premium Box', price: 100 },
    { id: 'g5', name: 'Luxury Leatherette', price: 200 },
    { id: 'g6', name: 'VIP Gold Box + Note', price: 500 },
  ];

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', backgroundColor: '#243B3A', borderRadius: '12px', border: '1px solid #D4AF37', textAlign: 'center' }}>
      <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#D4AF37', margin: '0 0 10px 0', fontSize: '20px' }}>GIFT PACKAGING</h3>
      <p style={{ fontFamily: "'Montserrat', sans-serif", color: '#F5F5F5', fontSize: '11px', marginBottom: '16px' }}>Make it special for your loved ones.</p>
      
      {/* 5 Second Animation Placeholder (Simulated via CSS pulse) */}
      <div style={{ 
        width: '100%', height: '120px', backgroundColor: '#050505', borderRadius: '8px', marginBottom: '16px', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ fontSize: '40px', animation: 'pulse 2s infinite' }}>🎁</div>
        <div style={{ position: 'absolute', bottom: '10px', fontSize: '10px', color: '#D4AF37' }}>Packing preview...</div>
      </div>

      <button onClick={() => setShowOptions(true)} style={{ backgroundColor: '#D4AF37', color: '#050505', fontFamily: "'Montserrat', sans-serif", fontWeight: '700', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>
        ADD GIFT PACKAGING
      </button>

      {showOptions && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(5,5,5,0.9)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#243B3A', border: '1px solid #D4AF37', borderRadius: '12px', width: '100%', maxWidth: '350px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#D4AF37', fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', margin: 0, letterSpacing: '1px' }}>SELECT PACKAGING</h3>
              <button onClick={() => setShowOptions(false)} style={{ background: 'none', border: 'none', color: '#F5F5F5', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {options.map(opt => (
                <button 
                  key={opt.id}
                  onClick={() => { onAddGiftPacking(opt); setShowOptions(false); }}
                  style={{ backgroundColor: '#050505', border: '1px solid #D4AF37', color: '#F5F5F5', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontFamily: "'Montserrat', sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <span style={{ fontSize: '11px', fontWeight: '500', marginBottom: '4px', textAlign: 'center' }}>{opt.name}</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#D4AF37' }}>₹{opt.price}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 🚀 THE 1760 DROP OFFERS PAGE
// ==========================================
function DropOffers({ products, onBack, onAddToCart, navigateTo }) {
  const [showPopup, setShowPopup] = useState(false);

  const OFFERS = [
    { id: 1, text: 'TAKE FOR ₹9', desc: 'Shop for ₹399 to get anything 1 free', priority: 1, color: '#EF4444' },
    { id: 2, text: 'TAKE 2', desc: 'Special combo deal applied', priority: 2, color: '#F59E0B' },
    { id: 3, text: '40% OFFER', desc: 'Flat 40% Off instantly', priority: 3, color: '#10B981' },
    { id: 4, text: '₹100 OFF', desc: 'Instant ₹100 Deduction', priority: 4, color: '#3B82F6' },
  ];

  const dropProducts = (products.length > 0 ? [...products] : MASTER_PRODUCTS.slice(0, 10)).map((p, idx) => {
    let offer;
    if (idx % 4 === 0) offer = OFFERS[0];
    else if (idx % 4 === 1) offer = OFFERS[1];
    else if (idx % 4 === 2) offer = OFFERS[2];
    else offer = OFFERS[3];
    return { ...p, currentOffer: offer };
  }).sort((a, b) => a.currentOffer.priority - b.currentOffer.priority);

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', color: '#F5F5F5', paddingBottom: '80px', fontFamily: "'Montserrat', sans-serif" }}>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px', padding: '0 16px', position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#243B3A', borderBottom: '1px solid #D4AF37' }}>
        <button onClick={onBack} style={{ background: 'transparent', color: '#D4AF37', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>← BACK</button>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', color: '#D4AF37', margin: 0, letterSpacing: '2px' }}>THE 1760 DROP</h1>
        <div style={{ width: '50px' }}></div>
      </div>
      <div style={{ padding: '24px 16px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: '900', margin: '0 0 8px 0', color: '#F5F5F5' }}>EXCLUSIVE OFFERS</h2>
        <p style={{ fontSize: '12px', color: '#A0B8B9', margin: 0 }}>Grab them before they disappear</p>
      </div>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
        {dropProducts.map((prod, idx) => (
          <div key={idx} style={{ backgroundColor: '#243B3A', borderRadius: '12px', overflow: 'hidden', border: '1px solid #D4AF37', display: 'flex', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, backgroundColor: prod.currentOffer.color, color: '#FFF', fontSize: '9px', fontWeight: '900', padding: '4px 10px', borderBottomRightRadius: '8px', zIndex: 5, letterSpacing: '1px' }}>
              PRIORITY #{prod.currentOffer.priority}
            </div>
            <div style={{ width: '130px', position: 'relative' }}>
              <img src={prod.image || '/dress1.png'} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '11px', color: '#A0B8B9', marginBottom: '6px', fontWeight: '600' }}>{prod.name}</div>
              <div style={{ fontSize: '22px', fontWeight: '900', color: prod.currentOffer.color, marginBottom: '6px', lineHeight: '1.1' }}>{prod.currentOffer.text}</div>
              <div style={{ fontSize: '10px', color: '#F5F5F5', marginBottom: '14px', lineHeight: '1.3' }}>{prod.currentOffer.desc}</div>
              <button 
                onClick={() => {
                  if (prod.currentOffer.priority === 1) setShowPopup(true);
                  else {
                    onAddToCart({...prod, price: prod.currentOffer.priority === 4 ? Math.max(0, prod.price - 100) : prod.currentOffer.priority === 3 ? Math.round(prod.price * 0.6) : prod.price});
                    alert(`${prod.currentOffer.text} Claimed successfully!`);
                  }
                }}
                style={{ backgroundColor: '#D4AF37', color: '#050505', border: 'none', padding: '10px 16px', borderRadius: '6px', fontSize: '11px', fontWeight: '900', cursor: 'pointer', width: 'fit-content' }}
              >
                {prod.currentOffer.priority === 1 ? 'VIEW CONDITION →' : 'CLAIM OFFER →'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(5,5,5,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#243B3A', border: '1px solid #D4AF37', borderRadius: '12px', padding: '30px 20px', width: '100%', maxWidth: '350px', textAlign: 'center', position: 'relative' }}>
            <div style={{ fontSize: '50px', marginBottom: '15px' }}>🎁</div>
            <h3 style={{ fontSize: '22px', color: '#F5F5F5', fontWeight: '900', margin: '0 0 12px 0' }}>TAKE FOR ₹9</h3>
            <div style={{ backgroundColor: '#050505', padding: '16px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #333' }}>
              <p style={{ fontSize: '13px', color: '#F5F5F5', lineHeight: '1.6', margin: 0 }}>
                Shop for <strong style={{color: '#D4AF37', fontSize: '16px'}}>₹399</strong> to get anything 1 free 
                <br/><br/><span style={{ fontSize: '11px', color: '#A0B8B9' }}>(Then you can claim this item for just ₹9)</span>
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowPopup(false)} style={{ flex: 1, padding: '12px', border: '1px solid #A0B8B9', background: 'transparent', color: '#F5F5F5', borderRadius: '6px', fontWeight: '800', cursor: 'pointer', fontSize: '12px' }}>Cancel</button>
              <button onClick={() => { setShowPopup(false); navigateTo('shop'); }} style={{ flex: 1, padding: '12px', background: '#D4AF37', color: '#050505', border: 'none', borderRadius: '6px', fontWeight: '800', cursor: 'pointer', fontSize: '12px' }}>Shop ₹399 Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 🚀 HOME COMPONENT
// ==========================================
function Home({ navigateTo, cartItems, dbProducts, handleOpenProduct, handleAddToCart, handleToggleWishlist, onMenuClick, setActiveCoupon, isMobile }) {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [heroImgIndex, setHeroImgIndex] = useState(0);
  const heroImages = ['/dress2.png', '/dress1.png', '/dress3.png', '/dress4.png'];

  useEffect(() => {
    const interval = setInterval(() => setHeroImgIndex(prev => (prev + 1) % heroImages.length), 3000); 
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const displayProducts = dbProducts && dbProducts.length > 0 ? dbProducts.slice(0, 10) : MASTER_PRODUCTS.slice(0, 5);
  const [swipeIndex, setSwipeIndex] = useState(0);
  const bestSellersCount = displayProducts.length || 1;

  // Touch Swipe Handlers for Best Sellers
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) setSwipeIndex(prev => (prev + 1) % bestSellersCount);
    if (isRightSwipe) setSwipeIndex(prev => (prev - 1 + bestSellersCount) % bestSellersCount);
    setTouchStart(null); setTouchEnd(null);
  };

  const handleSwipe = () => setSwipeIndex(prev => (prev + 1) % bestSellersCount);

  // SPINNER LOGIC
  const spinnerSegments = [
    { label: 'FLAT ₹200 OFF', value: 200, type: 'discount' },
    { label: 'MYSTERY GIFT', value: 'gift', type: 'gift' },
    { label: 'FLAT ₹50 OFF', value: 50, type: 'discount' },
    { label: 'FREE SHIPPING', value: 'shipping', type: 'shipping' },
    { label: 'FLAT ₹100 OFF', value: 100, type: 'discount' },
    { label: 'SPIN AGAIN', value: 'spin_again', type: 'retry' }
  ];
  
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showWinPopup, setShowWinPopup] = useState(false);
  const [wonPrize, setWonPrize] = useState(null);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const targetSlice = Math.floor(Math.random() * 6); 
    const spins = 5 * 360; 
    const extraDegrees = 360 - (targetSlice * 60) - 30; 
    const currentBase = rotation - (rotation % 360);
    const totalDegree = currentBase + spins + extraDegrees;
    
    setRotation(totalDegree);
    
    setTimeout(() => {
      setIsSpinning(false);
      const prize = spinnerSegments[targetSlice];
      setWonPrize(prize);
      setShowWinPopup(true); 
    }, 4000); 
  };

  const claimOffer = () => {
    if (wonPrize.type !== 'retry') {
      setActiveCoupon(wonPrize);
      alert("Offer added to your Gift Cards! It will auto-apply at checkout.");
    }
    setShowWinPopup(false);
    navigateTo('shop'); 
  };

  return (
    <div style={{ backgroundColor: '#050505', color: '#F5F5F5', paddingBottom: isMobile ? '80px' : '20px', fontFamily: "'Montserrat', sans-serif", overflowX: 'hidden' }}>
      
      <style>{`
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
      `}</style>

      {/* RESPONSIVE HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: isMobile ? '60px' : '80px', padding: isMobile ? '0 16px' : '0 5%', position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#243B3A', borderBottom: '1px solid #D4AF37' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {!isMobile && <img src="/logo.png" alt="1760 SATRASHE60" style={{ height: '40px', objectFit: 'contain', cursor: 'pointer' }} onClick={() => navigateTo('home')} />}
          <button onClick={onMenuClick} style={{ background: 'transparent', border: '1px solid #D4AF37', borderRadius: '4px', padding: '6px 16px', color: '#D4AF37', fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? '14px' : '18px', cursor: 'pointer' }}>MENU</button>
        </div>
        
        {isMobile && <img src="/logo.png" alt="1760 SATRASHE60" style={{ height: '30px', objectFit: 'contain' }} />}
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {/* Desktop Nav Links */}
          {!isMobile && (
            <div style={{ display: 'flex', gap: '30px', marginRight: '20px', fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '1px' }}>
              <span onClick={() => navigateTo('home')} style={{color: '#D4AF37', cursor: 'pointer'}}>HOME</span>
              <span onClick={() => navigateTo('shop')} style={{color: '#F5F5F5', cursor: 'pointer'}}>SHOP</span>
              <span onClick={() => navigateTo('account')} style={{color: '#F5F5F5', cursor: 'pointer'}}>ACCOUNT</span>
            </div>
          )}
          <button onClick={() => { setShowSearchInput(!showSearchInput); window.scrollTo({top: 0, behavior: 'smooth'}); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FFF', fontSize: isMobile ? '20px' : '24px' }}>🔍</button>
          <button onClick={() => navigateTo('cart')} style={{ background: 'transparent', border: '1px solid #D4AF37', borderRadius: '4px', padding: '6px 14px', color: '#D4AF37', position: 'relative', cursor: 'pointer', fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? '14px' : '18px' }}>
            🛒 BAG
            {cartItems.length > 0 && <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#D4AF37', color: '#050505', fontSize: '10px', fontWeight: '900', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartItems.length}</span>}
          </button>
        </div>
      </div>

      {/* MAIN CONTAINER FOR DESKTOP (Max-Width constraints) */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* HERO BANNER */}
        <div style={{ width: '100%', position: 'relative', backgroundColor: '#050505', display: 'flex', alignItems: 'center', height: isMobile ? '400px' : '500px', borderRadius: isMobile ? '0' : '12px', marginTop: isMobile ? '0' : '20px', overflow: 'hidden' }}>
          <img src={heroImages[heroImgIndex]} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', opacity: 0.6 }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '20px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? '42px' : '64px', fontWeight: '900', color: '#F5F5F5', margin: '0 0 10px 0', letterSpacing: '2px' }}>NOIR<br/>Atelier</h2>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '10px' : '14px', color: '#D4AF37', marginBottom: '20px', letterSpacing: '3px', textTransform: 'uppercase' }}>Exclusive Dark Collection</div>
            <button onClick={() => navigateTo('shop')} style={{ backgroundColor: '#D4AF37', color: '#050505', border: 'none', padding: '12px 30px', fontFamily: "'Montserrat', sans-serif", fontSize: '12px', fontWeight: '700', borderRadius: '24px', cursor: 'pointer' }}>SHOP NOW</button>
          </div>
        </div>

        {/* SHOP BY SIZE */}
        <div style={{ margin: '40px 16px' }}>
          <SectionHeading title="SHOP BY SIZE" />
          <div style={{ display: 'flex', flexWrap: isMobile ? 'nowrap' : 'wrap', gap: '16px', justifyContent: 'center', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '5px' }}>
            {["XS", "S", "M", "L", "XL/XXL"].map(sz => (
              <button key={sz} onClick={() => navigateTo('size-filter', sz.split('/')[0])} style={{ flexShrink: 0, width: isMobile ? '48px' : '60px', height: isMobile ? '48px' : '60px', background: 'transparent', border: '1px solid #D4AF37', borderRadius: '50%', color: '#F5F5F5', fontFamily: "'Montserrat', sans-serif", fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{sz}</button>
            ))}
          </div>
        </div>

        {/* CATEGORIES */}
        <div style={{ margin: '40px 0', backgroundColor: '#243B3A', padding: '30px 0', borderRadius: isMobile ? '0' : '12px' }}>
          <SectionHeading title="SHOP BY CATEGORY" />
          <div style={{ display: 'flex', flexWrap: isMobile ? 'nowrap' : 'wrap', gap: isMobile ? '20px' : '40px', overflowX: 'auto', scrollbarWidth: 'none', padding: '0 16px 10px 16px', justifyContent: 'center' }}>
            {[
              { n: 'TOP', i: '/dress1.png' }, 
              { n: 'KURTI', i: '/dress3.png' }, 
              { n: 'ONE PIECE', i: '/dress4.png' },
              { n: 'T-SHIRTS', i: '/dress2.png' },
              { n: 'SET', i: '/dress1.png' }
            ].map((cat, idx) => (
              <div key={idx} onClick={() => navigateTo('shop', cat.n)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '60px', cursor: 'pointer' }}>
                <div style={{ width: isMobile ? '60px' : '100px', height: isMobile ? '60px' : '100px', borderRadius: '50%', border: '2px solid #F5F5F5', padding: '2px', marginBottom: '12px', backgroundColor: '#050505' }}>
                  <img src={cat.i} alt={cat.n} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '10px' : '14px', color: '#F5F5F5', fontWeight: '600', textAlign: 'center', letterSpacing: '1px' }}>{cat.n}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SPIN & WIN */}
        <div style={{ margin: '60px 0', padding: '20px 16px', textAlign: 'center' }}>
          <SectionHeading title="SPIN & WIN" />
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '12px', color: '#F5F5F5', margin: '-10px 0 30px 0' }}>Try your luck & unlock a special offer</p>

          <div style={{ position: 'relative', width: isMobile ? '280px' : '350px', height: isMobile ? '280px' : '350px', margin: '0 auto', background: '#050505', borderRadius: '50%', padding: '10px', border: '2px solid #243B3A', boxShadow: '0 0 30px rgba(212,175,55,0.1)' }}>
            <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', width: '0', height: '0', borderLeft: '15px solid transparent', borderRight: '15px solid transparent', borderTop: '25px solid #D4AF37', zIndex: 10 }}></div>
            
            <div style={{ 
                width: '100%', height: '100%', borderRadius: '50%', border: '4px solid #D4AF37', 
                background: 'conic-gradient(#050505 0deg 60deg, #D4AF37 60deg 120deg, #050505 120deg 180deg, #D4AF37 180deg 240deg, #050505 240deg 300deg, #D4AF37 300deg 360deg)', 
                transition: 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)', 
                transform: `rotate(${rotation}deg)`, 
                position: 'relative', overflow: 'hidden'
            }}>
              {spinnerSegments.map((seg, i) => {
                const angle = i * 60 + 30 - 90;
                return (
                  <div key={i} style={{
                    position: 'absolute', top: '50%', left: '50%', transformOrigin: '0 50%',
                    transform: `rotate(${angle}deg) translate(${isMobile ? '40px' : '60px'}, -50%)`, width: '80px',
                    textAlign: 'right', fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? '14px' : '18px', letterSpacing: '1px',
                    color: i % 2 === 0 ? '#D4AF37' : '#050505', zIndex: 2
                  }}>
                    {seg.label}
                  </div>
                );
              })}
            </div>

            <button onClick={spinWheel} disabled={isSpinning} style={{ 
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
                width: isMobile ? '70px' : '90px', height: isMobile ? '70px' : '90px', borderRadius: '50%', 
                backgroundColor: '#D4AF37', color: '#050505', 
                border: '4px solid #050505', fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? '20px' : '26px', letterSpacing: '1px',
                cursor: isSpinning ? 'not-allowed' : 'pointer', zIndex: 5 
              }}>
              SPIN
            </button>
          </div>
        </div>

        {/* WIN POPUP */}
        {showWinPopup && wonPrize && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 99999, backgroundColor: 'rgba(5,5,5,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ backgroundColor: '#243B3A', border: '1px solid #D4AF37', borderRadius: '12px', padding: '30px', textAlign: 'center', width: '100%', maxWidth: '400px' }}>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '32px', color: '#D4AF37', margin: '0 0 10px 0', letterSpacing: '2px' }}>
                {wonPrize.type === 'retry' ? 'OOPS!' : 'CONGRATULATIONS!'}
              </h2>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '20px', fontWeight: '700', color: '#F5F5F5', marginBottom: '20px' }}>
                {wonPrize.label}
              </div>
              {wonPrize.type !== 'retry' && (
                <p style={{ fontSize: '13px', color: '#D4AF37', marginBottom: '20px' }}>Your offer is added. Claim & Shop Now!</p>
              )}
              <button onClick={claimOffer} style={{ backgroundColor: '#D4AF37', color: '#050505', border: 'none', padding: '14px 30px', fontFamily: "'Montserrat', sans-serif", fontWeight: '700', borderRadius: '24px', cursor: 'pointer', width: '100%' }}>
                {wonPrize.type === 'retry' ? 'TRY AGAIN' : 'CLAIM NOW →'}
              </button>
            </div>
          </div>
        )}

        {/* THE 1760 DROP */}
        <div style={{ margin: '60px 0', backgroundColor: '#243B3A', padding: '40px 0', borderRadius: isMobile ? '0' : '12px' }}>
          <SectionHeading title="THE 1760 DROP" />
          <div style={{ display: 'flex', flexWrap: isMobile ? 'nowrap' : 'wrap', gap: '20px', overflowX: 'auto', padding: '0 20px', scrollbarWidth: 'none', justifyContent: 'center' }}>
            {[
              { tag: '40% OFF', name: 'ALL T-SHIRTS', img: '/dress1.png' },
              { tag: 'BUY 2 GET ₹100 OFF', name: 'ON KURTIS', img: '/dress3.png' },
              { tag: 'FLAT 15%', name: 'ON ONE PIECES', img: '/dress4.png' }
            ].map((drop, idx) => (
               <div key={idx} onClick={() => navigateTo('drop-offers')} style={{ minWidth: isMobile ? '200px' : '260px', backgroundColor: '#050505', border: '1px solid #D4AF37', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer' }}>
                 <img src={drop.img} alt={drop.name} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                 <div style={{ padding: '16px', textAlign: 'center' }}>
                   <div style={{ backgroundColor: '#D4AF37', color: '#050505', fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', padding: '4px 12px', borderRadius: '4px', display: 'inline-block', marginBottom: '8px' }}>{drop.tag}</div>
                   <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '12px', color: '#F5F5F5', fontWeight: '600', marginBottom: '10px' }}>{drop.name}</div>
                   <div style={{ fontSize: '11px', color: '#D4AF37', textDecoration: 'underline' }}>SHOP NOW →</div>
                 </div>
               </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
             <button onClick={() => navigateTo('drop-offers')} style={{ background: 'transparent', border: '1px solid #F5F5F5', color: '#F5F5F5', padding: '8px 24px', borderRadius: '20px', fontSize: '12px', fontFamily: "'Montserrat', sans-serif", cursor: 'pointer' }}>VIEW ALL OFFERS</button>
          </div>
        </div>

        {/* BEST SELLERS */}
        <div style={{ margin: '60px 0', overflow: 'hidden' }}>
          <SectionHeading title="BEST SELLER" />
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <button onClick={() => navigateTo('shop')} style={{ background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', padding: '8px 24px', borderRadius: '20px', fontSize: '12px', fontFamily: "'Montserrat', sans-serif", cursor: 'pointer' }}>VIEW ALL PRODUCTS</button>
          </div>
          
          <div 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ position: 'relative', height: isMobile ? '420px' : '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: '1000px' }}
          >
            {displayProducts.map((prod, idx) => {
              const isTop = idx === swipeIndex;
              const isSecond = idx === (swipeIndex + 1) % bestSellersCount;
              const isThird = idx === (swipeIndex + 2) % bestSellersCount;
              
              if (!isTop && !isSecond && !isThird) return null; 

              let transform = '';
              let zIndex = 0;

              if (isTop) {
                transform = 'rotate(-5deg) scale(1) translateY(0)';
                zIndex = 30;
              } else if (isSecond) {
                transform = `rotate(10deg) scale(0.9) translateX(${isMobile ? '40px' : '100px'}) translateY(20px)`;
                zIndex = 20;
              } else if (isThird) {
                transform = `rotate(-10deg) scale(0.85) translateX(-${isMobile ? '40px' : '100px'}) translateY(40px)`;
                zIndex = 10;
              }

              return (
                <div 
                  key={prod.id || idx} 
                  onClick={() => { if(isTop) handleSwipe(); else handleOpenProduct(prod, 'home'); }}
                  style={{
                    position: 'absolute', width: isMobile ? '260px' : '340px', backgroundColor: '#050505', border: '2px solid #D4AF37', borderRadius: '12px', padding: '12px',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)', transform, zIndex, cursor: isTop ? 'grab' : 'pointer',
                    boxShadow: isTop ? '0 10px 30px rgba(0,0,0,0.8)' : 'none'
                  }}
                >
                  <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                    <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#F5F5F5', color: '#050505', fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', padding: '2px 12px', borderRadius: '4px', zIndex: 2 }}>NEW</span>
                    <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 2 }}>
                      <button onClick={(e) => { e.stopPropagation(); handleToggleWishlist(prod.id); }} style={{ background: 'transparent', border: '1px solid #F5F5F5', color: '#F5F5F5', fontSize: '16px', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>♡</button>
                    </div>
                    <img src={prod.image || (prod.images && prod.images[0]) || '/dress1.png'} alt={prod.name || 'Product'} style={{ width: '100%', height: isMobile ? '300px' : '400px', objectFit: 'cover', objectPosition: 'top' }} />
                  </div>
                  {isTop && (
                    <div style={{ marginTop: '16px', textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', fontWeight: '700', color: '#F5F5F5', marginBottom: '4px' }}>{prod.name}</div>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '18px', fontWeight: '900', color: '#F5F5F5' }}>₹{prod.price} <span style={{fontSize:'12px', color:'#666', textDecoration:'line-through', fontWeight:'500'}}>₹{Math.round(prod.price * 1.5)}</span></div>
                      <div style={{ fontSize: '12px', color: '#D4AF37', marginTop: '4px' }}>★★★★★ (124)</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* NEW GIFT PACKING SECTION */}
        <GiftPackagingSection onAddGiftPacking={(giftItem) => {
          handleAddToCart({
            id: `GIFT-${giftItem.id}`,
            name: `Gift Packaging: ${giftItem.name}`,
            price: giftItem.price,
            image: '/logo.png',
            selectedSize: 'Standard'
          });
          alert(`${giftItem.name} added to cart for ₹${giftItem.price}!`);
        }} />

        {/* TRUST BAR */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center', padding: '24px 0', margin: '40px 16px', backgroundColor: '#050505', border: '1px solid #333', borderRadius: '8px' }}>
          {[{i:'🚚', t:'FREE SHIPPING'}, {i:'💳', t:'COD AVAILABLE'}, {i:'🛡', t:'SECURE PAYMENTS'}, {i:'🎧', t:'24/7 SUPPORT'}].map((tb, idx) => (
            <div key={idx} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minWidth: '100px', margin: '10px' }}>
              <div style={{ fontSize: '24px' }}>{tb.i}</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '9px', color: '#A0B8B9', fontWeight: '700' }}>{tb.t}</div>
            </div>
          ))}
        </div>

      </div> {/* END OF DESKTOP MAX-WIDTH CONTAINER */}

      {/* FOOTER */}
      <div style={{ textAlign: 'center', padding: '50px 20px', backgroundColor: '#050505', borderTop: '1px solid #333' }}>
        <div style={{ border: '1px solid #333', padding: '30px', borderRadius: '8px', display: 'inline-block', marginBottom: '30px' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: '900', color: '#F5F5F5', margin: '0 0 16px 0', letterSpacing: '2px' }}>IT'S A LIFESTYLE</h3>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '11px', color: '#A0B8B9', margin: '0 0 24px 0', lineHeight: '1.6', maxWidth: '300px' }}>
            AT SATRASHE60, WE BRING YOU THE PERFECT BLEND OF STREET STYLE, COMFORT AND CONFIDENCE. YOUR STYLE, ONE STEP CLOSER.
          </p>
          <button onClick={() => navigateTo('about')} style={{ background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', padding: '10px 30px', borderRadius: '4px', fontSize: '12px', fontFamily: "'Montserrat', sans-serif", fontWeight: '700', cursor: 'pointer' }}>READ OUR STORY</button>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="/logo.png" alt="SATRASHE60" style={{ height: '40px' }} />
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
  
  // State for active coupon from Spinner
  const [activeCoupon, setActiveCoupon] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.backgroundColor = '#050505'; // Primary Black
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
    if (currentUser) setShowCheckout(true);
    else setShowAuthModal(true);
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
    if(activeCoupon) setActiveCoupon(null);

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
    <div className="app" style={{ backgroundColor: '#050505', minHeight: '100vh', fontFamily: "'Montserrat', sans-serif" }}>
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: '80px', right: '20px', backgroundColor: '#243B3A', color: '#FFF', padding: '12px 20px', borderRadius: '6px', fontSize: '12px', fontWeight: '800', zIndex: 99999, borderLeft: '4px solid #D4AF37' }}>
          {toastMessage}
        </div>
      )}

      {/* HEADER IS NOW HANDLED INSIDE HOME FOR RESPONSIVENESS (except other pages) */}
      {currentPage !== 'home' && currentPage !== 'shop' && currentPage !== 'product-detail' && currentPage !== 'cart' && currentPage !== 'size-filter' && currentPage !== 'drop-offers' && (
        <MobileHeaderNav cartCount={cartItems.length} wishlistCount={wishlist.length} isLoggedIn={!!currentUser} currentPage={currentPage} navigateTo={navigateTo} goBack={handleGoBack} historyLength={historyStack.length} />
      )}

      {currentPage === 'account' ? <Account currentUser={currentUser} orders={placedOrders} onLogin={setCurrentUser} onLogout={() => setCurrentUser(null)} onNavigateToShop={() => navigateTo('shop')} />
      : currentPage === 'community' ? <Community currentUser={currentUser} onNavigateToAbout={() => navigateTo('about')} onNavigateToAccount={() => navigateTo('account')} />
      : currentPage === 'about' ? <About onNavigateToShop={() => navigateTo('shop')} />
      : currentPage === 'product-detail' ? (isMobile ? <MobileProductDetail product={selectedProduct} onBack={handleGoBack} onAddToCart={handleAddToCart} onNavigateToBag={() => navigateTo('cart')} /> : <ProductDetail product={selectedProduct} onBack={() => navigateTo(sourceBackPage)} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} sourceTitle={sourceBackPage.toUpperCase()} />)
      : currentPage === 'category-plp' ? <CategoryPLP categoryName={selectedCategory || "ALL"} products={MASTER_PRODUCTS} onBack={() => navigateTo('home')} onProductClick={(prod) => handleOpenProduct(prod, 'category-plp')} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} navigateTo={navigateTo} />
      : currentPage === 'size-filter' ? <ShopYourSize products={dbProducts} initialSizes={[selectedCategory]} navigateTo={navigateTo} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} onAddToCart={handleAddToCart} />
      : currentPage === 'drop-offers' ? <DropOffers products={dbProducts} onBack={handleGoBack} onAddToCart={handleAddToCart} navigateTo={navigateTo} />
      : currentPage === 'shop' ? <Shop products={dbProducts} initialCategory={selectedCategory} initialSearchQuery={searchQuery} onNavigate={navigateTo} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} onAddToCart={handleAddToCart} />
      : currentPage === 'cart' ? (
        isMobile ? <MobileBag cartItems={cartItems} onBack={handleGoBack} onUpdateQuantity={handleUpdateCartQuantity} onRemoveItem={handleRemoveFromCart} onProceedToAddress={handleProceedToAddress} activeCoupon={activeCoupon} /> : <div style={{ padding: '60px 4%', minHeight: '60vh', backgroundColor: '#243B3A' }}><h2 style={{ textAlign: 'center', color: '#FFF' }}>YOUR BAG</h2>{cartItems.length === 0 ? <div style={{ textAlign: 'center' }}><button onClick={() => navigateTo('shop')}>SHOP NOW</button></div> : <div><button onClick={() => setShowCheckout(true)}>PROCEED TO CHECKOUT</button></div>}</div>
      ) : (
        <Home 
          isMobile={isMobile}
          navigateTo={navigateTo} 
          cartItems={cartItems} 
          dbProducts={dbProducts} 
          handleOpenProduct={handleOpenProduct}
          handleAddToCart={handleAddToCart}
          handleToggleWishlist={handleToggleWishlist}
          onMenuClick={() => setIsMenuOpen(true)}
          setActiveCoupon={setActiveCoupon}
        />
      )}

      <MobileAuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLoginSuccess={(userData) => { setCurrentUser(userData); setShowAuthModal(false); setShowCheckout(true); }} />

      {/* MOBILE BOTTOM NAVIGATION (Hidden on Desktop) */}
      {isMobile && currentPage !== 'product-detail' && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '60px', backgroundColor: '#050505', borderTop: '1px solid #D4AF37', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 100 }}>
          <button onClick={() => navigateTo('home')} style={{ background: 'none', border: 'none', fontSize: '20px', color: currentPage === 'home' ? '#D4AF37' : '#A0B8B9' }}>🏠</button>
          <button onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); navigateTo('shop'); }} style={{ background: 'none', border: 'none', fontSize: '20px', color: '#A0B8B9' }}>🔍</button>
          <button onClick={() => navigateTo('shop', 'New Arrivals')} style={{ background: 'none', border: 'none', fontSize: '10px', fontWeight: '900', color: '#A0B8B9' }}>NEW</button>
          <button onClick={() => navigateTo('cart')} style={{ background: 'none', border: 'none', fontSize: '20px', color: currentPage === 'cart' ? '#D4AF37' : '#A0B8B9', position: 'relative' }}>
            🛒{cartItems.length > 0 && <span style={{ position: 'absolute', top: '-4px', right: '-6px', background: '#D4AF37', color: '#050505', fontSize: '10px', fontWeight: '900', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartItems.length}</span>}
          </button>
          <button onClick={() => navigateTo('account')} style={{ background: 'none', border: 'none', fontSize: '20px', color: currentPage === 'account' ? '#D4AF37' : '#A0B8B9' }}>👤</button>
        </div>
      )}

      {showCheckout && <CheckoutModal cartItems={cartItems} activeCoupon={activeCoupon} onClose={() => setShowCheckout(false)} onOrderSuccess={handleOrderPlacedSuccess} onClearCart={() => setCartItems([])} />}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navigateTo={navigateTo} currentUser={currentUser} />
    </div>
  );
}

export default App;