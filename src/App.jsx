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

// Gold Color with 60% Opacity
const GOLD_60 = 'rgba(212, 175, 55, 0.6)';

// ==========================================
// 🚀 REUSABLE SECTION HEADER BUTTON
// ==========================================
const SectionHeading = ({ title }) => (
  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
    <div style={{ 
      display: 'inline-block', 
      border: `1px solid ${GOLD_60}`, 
      borderRadius: '20px', 
      padding: '5px 16px', 
      color: GOLD_60, 
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: '13px', 
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
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '16px', backgroundColor: '#091616', borderRadius: '12px', border: `1px solid ${GOLD_60}`, textAlign: 'center' }}>
      <h3 style={{ fontFamily: "'Playfair Display', serif", color: GOLD_60, margin: '0 0 6px 0', fontSize: '13px' }}>GIFT PACKAGING</h3>
      <p style={{ fontFamily: "'Montserrat', sans-serif", color: '#E0E0E0', fontSize: '9px', marginBottom: '12px' }}>Make it special for your loved ones.</p>
      
      <div style={{ 
        width: '100%', height: '80px', backgroundColor: '#060E0E', borderRadius: '8px', marginBottom: '12px', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden',
        border: '1px dashed #333'
      }}>
        <div style={{ fontSize: '24px', animation: 'pulse 2s infinite' }}>🎁</div>
        <div style={{ position: 'absolute', bottom: '6px', fontSize: '8px', color: GOLD_60 }}>Packing preview...</div>
      </div>

      <button onClick={() => setShowOptions(true)} style={{ backgroundColor: 'transparent', color: GOLD_60, border: `1px solid ${GOLD_60}`, fontFamily: "'Montserrat', sans-serif", fontWeight: '600', padding: '8px 16px', borderRadius: '20px', fontSize: '9px', cursor: 'pointer', letterSpacing: '1px' }}>
        ADD GIFT PACKAGING
      </button>

      {showOptions && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ backgroundColor: '#091616', border: `1px solid ${GOLD_60}`, borderRadius: '12px', width: '100%', maxWidth: '280px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ color: GOLD_60, fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', margin: 0, letterSpacing: '1px' }}>SELECT PACKAGING</h3>
              <button onClick={() => setShowOptions(false)} style={{ background: 'none', border: 'none', color: '#E0E0E0', fontSize: '14px', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {options.map(opt => (
                <button 
                  key={opt.id}
                  onClick={() => { onAddGiftPacking(opt); setShowOptions(false); }}
                  style={{ backgroundColor: '#060E0E', border: '1px solid #1A2E2E', color: '#E0E0E0', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontFamily: "'Montserrat', sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <span style={{ fontSize: '8px', fontWeight: '500', marginBottom: '4px', textAlign: 'center' }}>{opt.name}</span>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: GOLD_60 }}>₹{opt.price}</span>
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
    { id: 1, text: 'TAKE FOR ₹9', desc: 'Shop for ₹399 to get anything 1 free', priority: 1, color: GOLD_60 },
    { id: 2, text: 'TAKE 2', desc: 'Special combo deal applied', priority: 2, color: GOLD_60 },
    { id: 3, text: '40% OFFER', desc: 'Flat 40% Off instantly', priority: 3, color: GOLD_60 },
    { id: 4, text: '₹100 OFF', desc: 'Instant ₹100 Deduction', priority: 4, color: GOLD_60 },
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
    <div style={{ backgroundColor: '#091616', minHeight: '100vh', color: '#E0E0E0', paddingBottom: '80px', fontFamily: "'Montserrat', sans-serif" }}>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '50px', padding: '0 16px', position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#091616', borderBottom: '1px solid #1A2E2E' }}>
        <button onClick={onBack} style={{ background: 'transparent', color: GOLD_60, border: 'none', fontSize: '10px', fontWeight: '600', cursor: 'pointer' }}>← BACK</button>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', color: GOLD_60, margin: 0, letterSpacing: '2px' }}>THE 1760 DROP</h1>
        <div style={{ width: '40px' }}></div>
      </div>
      <div style={{ padding: '16px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: '900', margin: '0 0 6px 0', color: '#FFF' }}>EXCLUSIVE OFFERS</h2>
        <p style={{ fontSize: '9px', color: '#A0B8B9', margin: 0 }}>Grab them before they disappear</p>
      </div>
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '600px', margin: '0 auto' }}>
        {dropProducts.map((prod, idx) => (
          <div key={idx} style={{ backgroundColor: '#060E0E', borderRadius: '8px', overflow: 'hidden', border: '1px solid #1A2E2E', display: 'flex', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, backgroundColor: prod.currentOffer.color, color: '#091616', fontSize: '7px', fontWeight: '800', padding: '3px 8px', borderBottomRightRadius: '6px', zIndex: 5, letterSpacing: '1px' }}>
              PRIORITY #{prod.currentOffer.priority}
            </div>
            <div style={{ width: '90px', position: 'relative' }}>
              <img src={prod.image || '/dress1.png'} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '9px', color: '#A0B8B9', marginBottom: '4px', fontWeight: '500' }}>{prod.name}</div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: prod.currentOffer.color, marginBottom: '4px', lineHeight: '1.1' }}>{prod.currentOffer.text}</div>
              <div style={{ fontSize: '8px', color: '#E0E0E0', marginBottom: '10px', lineHeight: '1.3' }}>{prod.currentOffer.desc}</div>
              <button 
                onClick={() => {
                  if (prod.currentOffer.priority === 1) setShowPopup(true);
                  else {
                    onAddToCart({...prod, price: prod.currentOffer.priority === 4 ? Math.max(0, prod.price - 100) : prod.currentOffer.priority === 3 ? Math.round(prod.price * 0.6) : prod.price});
                    alert(`${prod.currentOffer.text} Claimed successfully!`);
                  }
                }}
                style={{ backgroundColor: 'transparent', color: GOLD_60, border: `1px solid ${GOLD_60}`, padding: '6px 10px', borderRadius: '4px', fontSize: '8px', fontWeight: '700', cursor: 'pointer', width: 'fit-content' }}
              >
                {prod.currentOffer.priority === 1 ? 'VIEW CONDITION →' : 'CLAIM OFFER →'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#091616', border: `1px solid ${GOLD_60}`, borderRadius: '12px', padding: '20px 16px', width: '100%', maxWidth: '280px', textAlign: 'center', position: 'relative' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎁</div>
            <h3 style={{ fontSize: '16px', color: '#FFF', fontWeight: '800', margin: '0 0 10px 0' }}>TAKE FOR ₹9</h3>
            <div style={{ backgroundColor: '#060E0E', padding: '10px', borderRadius: '6px', marginBottom: '16px', border: '1px solid #1A2E2E' }}>
              <p style={{ fontSize: '10px', color: '#E0E0E0', lineHeight: '1.5', margin: 0 }}>
                Shop for <strong style={{color: GOLD_60, fontSize: '11px'}}>₹399</strong> to get anything 1 free 
                <br/><br/><span style={{ fontSize: '8px', color: '#A0B8B9' }}>(Then you can claim this item for just ₹9)</span>
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setShowPopup(false)} style={{ flex: 1, padding: '8px', border: '1px solid #A0B8B9', background: 'transparent', color: '#E0E0E0', borderRadius: '4px', fontWeight: '600', cursor: 'pointer', fontSize: '9px' }}>Cancel</button>
              <button onClick={() => { setShowPopup(false); navigateTo('shop'); }} style={{ flex: 1, padding: '8px', background: GOLD_60, color: '#091616', border: 'none', borderRadius: '4px', fontWeight: '700', cursor: 'pointer', fontSize: '9px' }}>Shop ₹399 Now</button>
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
  const heroImages = ['/noir-bg.jpg', '/dress2.png', '/dress1.png', '/dress3.png', '/dress4.png'];

  useEffect(() => {
    const interval = setInterval(() => setHeroImgIndex(prev => (prev + 1) % heroImages.length), 4000); 
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
    <div style={{ backgroundColor: '#091616', color: '#F5F5F5', paddingBottom: isMobile ? '80px' : '20px', fontFamily: "'Montserrat', sans-serif", overflowX: 'hidden' }}>
      
      <style>{`
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
      `}</style>

      {/* RESPONSIVE HEADER - Bag Icon Removed from Top */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: isMobile ? '50px' : '70px', padding: isMobile ? '0 16px' : '0 5%', position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#091616', borderBottom: `1px solid ${GOLD_60}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {!isMobile && <img src="/logo.png" alt="1760 SATRASHE60" style={{ height: '60px', objectFit: 'contain', cursor: 'pointer' }} onClick={() => navigateTo('home')} />}
          <button onClick={onMenuClick} style={{ background: 'transparent', border: `1px solid ${GOLD_60}`, borderRadius: '4px', padding: '4px 10px', color: GOLD_60, fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? '10px' : '12px', cursor: 'pointer', letterSpacing: '1px' }}>MENU</button>
        </div>
        
        {/* LOGO DOUBLED IN SIZE */}
        {isMobile && <img src="/logo.png" alt="1760 SATRASHE60" style={{ height: '48px', objectFit: 'contain' }} />}
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {!isMobile && (
            <div style={{ display: 'flex', gap: '20px', marginRight: '16px', fontFamily: "'Bebas Neue', sans-serif", fontSize: '13px', letterSpacing: '1px' }}>
              <span onClick={() => navigateTo('home')} style={{color: GOLD_60, cursor: 'pointer'}}>HOME</span>
              <span onClick={() => navigateTo('shop')} style={{color: '#F5F5F5', cursor: 'pointer'}}>SHOP</span>
              <span onClick={() => navigateTo('account')} style={{color: '#F5F5F5', cursor: 'pointer'}}>ACCOUNT</span>
            </div>
          )}
          <button onClick={() => { setShowSearchInput(!showSearchInput); window.scrollTo({top: 0, behavior: 'smooth'}); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FFF', fontSize: isMobile ? '14px' : '18px' }}>🔍</button>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* 🚀 HERO BANNER WITH 80px MARGIN TOP */}
        <div style={{ width: '100%', position: 'relative', backgroundColor: '#091616', display: 'flex', alignItems: 'center', height: isMobile ? '300px' : '420px', borderRadius: isMobile ? '0' : '12px', marginTop: '80px', overflow: 'hidden' }}>
          
          <img src={heroImages[heroImgIndex]} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.6 }} />
          
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #091616 0%, transparent 15%, transparent 85%, #091616 100%), linear-gradient(to bottom, transparent 60%, #091616 100%)' }}></div>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)' }}></div>

          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '16px', zIndex: 10 }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <div style={{ width: '20px', height: '1px', backgroundColor: '#666' }}></div>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '7px' : '9px', color: '#CCC', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600' }}>THE COLLECTION</span>
              <div style={{ width: '20px', height: '1px', backgroundColor: '#666' }}></div>
            </div>

            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? '38px' : '52px', fontWeight: '400', color: '#F5F5F5', margin: '0', letterSpacing: '2px', lineHeight: '1' }}>NOIR</h2>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? '26px' : '34px', fontWeight: '400', fontStyle: 'italic', color: '#F5F5F5', margin: '0 0 12px 0', letterSpacing: '1px', lineHeight: '1' }}>Atelier</h3>
            
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '7px' : '9px', color: '#BBD4D5', maxWidth: '250px', lineHeight: '1.6', marginBottom: '20px', letterSpacing: '0.5px' }}>
              Where shadow meets silhouette — a study in<br/>architectural precision and raw elegance.
            </p>

            <button onClick={() => navigateTo('shop')} style={{ backgroundColor: GOLD_60, border: 'none', color: '#FFF', padding: isMobile ? '8px 20px' : '10px 28px', fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? '13px' : '16px', borderRadius: '30px', cursor: 'pointer', letterSpacing: '2px', boxShadow: '0 4px 15px rgba(212, 175, 55, 0.15)' }}>
              SHOP NOW
            </button>
          </div>
        </div>

        {/* SHOP BY SIZE (80px Top & Bottom Gap) */}
        <div style={{ margin: '80px 16px' }}>
          <SectionHeading title="SHOP BY SIZE" />
          <div style={{ display: 'flex', flexWrap: isMobile ? 'nowrap' : 'wrap', gap: '10px', justifyContent: 'center', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '5px' }}>
            {["XS", "S", "M", "L", "XL"].map(sz => (
              <button key={sz} onClick={() => navigateTo('size-filter', sz)} style={{ flexShrink: 0, width: isMobile ? '32px' : '40px', height: isMobile ? '32px' : '40px', background: 'transparent', border: `1px solid ${GOLD_60}`, borderRadius: '50%', color: '#F5F5F5', fontFamily: "'Montserrat', sans-serif", fontSize: '9px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{sz}</button>
            ))}
          </div>
        </div>

        {/* CATEGORIES */}
        <div style={{ margin: '80px 0', padding: '16px 0', borderRadius: isMobile ? '0' : '12px' }}>
          <SectionHeading title="SHOP BY CATEGORY" />
          <div style={{ display: 'flex', flexWrap: isMobile ? 'nowrap' : 'wrap', gap: isMobile ? '12px' : '24px', overflowX: 'auto', scrollbarWidth: 'none', padding: '0 16px 10px 16px', justifyContent: 'center' }}>
            {[
              { n: 'TOP', i: '/dress1.png' }, 
              { n: 'KURTI', i: '/dress3.png' }, 
              { n: 'ONE PIECE', i: '/dress4.png' },
              { n: 'T-SHIRTS', i: '/dress2.png' },
              { n: 'SET', i: '/dress1.png' }
            ].map((cat, idx) => (
              <div key={idx} onClick={() => navigateTo('shop', cat.n)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '40px', cursor: 'pointer' }}>
                <div style={{ width: isMobile ? '40px' : '64px', height: isMobile ? '40px' : '64px', borderRadius: '50%', border: '1px solid #E0E0E0', padding: '2px', marginBottom: '6px', backgroundColor: '#091616' }}>
                  <img src={cat.i} alt={cat.n} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '7px' : '9px', color: '#E0E0E0', fontWeight: '500', textAlign: 'center', letterSpacing: '1px' }}>{cat.n}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 🚀 SPIN & WIN (Fixed Alignment & Shrunk) */}
        <div style={{ margin: '80px 0', padding: '16px', textAlign: 'center' }}>
          <SectionHeading title="SPIN & WIN" />
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '8px', color: '#A0B8B9', margin: '-12px 0 20px 0', letterSpacing: '1px' }}>Try your luck & unlock a special offer</p>

          <div style={{ position: 'relative', width: isMobile ? '200px' : '240px', height: isMobile ? '200px' : '240px', margin: '0 auto', background: '#091616', borderRadius: '50%', padding: '6px', border: '1px solid #1A2E2E', boxShadow: '0 0 15px rgba(212,175,55,0.05)' }}>
            <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', width: '0', height: '0', borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: `16px solid ${GOLD_60}`, zIndex: 10 }}></div>
            
            <div style={{ 
                width: '100%', height: '100%', borderRadius: '50%', border: `3px solid ${GOLD_60}`, 
                background: `conic-gradient(#091616 0deg 60deg, ${GOLD_60} 60deg 120deg, #091616 120deg 180deg, ${GOLD_60} 180deg 240deg, #091616 240deg 300deg, ${GOLD_60} 300deg 360deg)`, 
                transition: 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)', 
                transform: `rotate(${rotation}deg)`, 
                position: 'relative', overflow: 'hidden'
            }}>
              {spinnerSegments.map((seg, i) => {
                const angle = i * 60 + 30 - 90; // Center calculation
                return (
                  <div key={i} style={{
                    position: 'absolute', top: '50%', left: '50%', transformOrigin: '0 50%',
                    transform: `rotate(${angle}deg) translate(${isMobile ? '30px' : '45px'}, -50%)`, width: '60px',
                    textAlign: 'right', fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? '10px' : '12px', letterSpacing: '1px',
                    color: i % 2 === 0 ? '#091616' : GOLD_60, zIndex: 2
                  }}>
                    {seg.label}
                  </div>
                );
              })}
            </div>

            <button onClick={spinWheel} disabled={isSpinning} style={{ 
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
                width: isMobile ? '48px' : '60px', height: isMobile ? '48px' : '60px', borderRadius: '50%', 
                backgroundColor: '#091616', color: GOLD_60, 
                border: `2px solid ${GOLD_60}`, fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? '12px' : '16px', letterSpacing: '1px',
                cursor: isSpinning ? 'not-allowed' : 'pointer', zIndex: 5 
              }}>
              SPIN
            </button>
          </div>
        </div>

        {/* WIN POPUP */}
        {showWinPopup && wonPrize && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 99999, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div style={{ backgroundColor: '#091616', border: `1px solid ${GOLD_60}`, borderRadius: '12px', padding: '20px', textAlign: 'center', width: '100%', maxWidth: '280px' }}>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', color: GOLD_60, margin: '0 0 8px 0', letterSpacing: '1px' }}>
                {wonPrize.type === 'retry' ? 'OOPS!' : 'CONGRATULATIONS!'}
              </h2>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '13px', fontWeight: '700', color: '#F5F5F5', marginBottom: '12px' }}>
                {wonPrize.label}
              </div>
              {wonPrize.type !== 'retry' && (
                <p style={{ fontSize: '8px', color: '#A0B8B9', marginBottom: '16px' }}>Your offer is added. Claim & Shop Now!</p>
              )}
              <button onClick={claimOffer} style={{ backgroundColor: 'transparent', color: GOLD_60, border: `1px solid ${GOLD_60}`, padding: '8px 20px', fontFamily: "'Montserrat', sans-serif", fontSize: '8px', fontWeight: '600', borderRadius: '20px', cursor: 'pointer', width: '100%' }}>
                {wonPrize.type === 'retry' ? 'TRY AGAIN' : 'CLAIM NOW →'}
              </button>
            </div>
          </div>
        )}

        {/* THE 1760 DROP */}
        <div style={{ margin: '80px 0', padding: '16px 0', borderRadius: isMobile ? '0' : '12px' }}>
          <SectionHeading title="THE 1760 DROP" />
          <div style={{ display: 'flex', flexWrap: isMobile ? 'nowrap' : 'wrap', gap: '12px', overflowX: 'auto', padding: '0 16px', scrollbarWidth: 'none', justifyContent: 'center' }}>
            {[
              { tag: '40% OFF', name: 'ALL T-SHIRTS', img: '/dress1.png' },
              { tag: 'BUY 2 GET ₹100 OFF', name: 'ON KURTIS', img: '/dress3.png' },
              { tag: 'FLAT 15%', name: 'ON ONE PIECES', img: '/dress4.png' }
            ].map((drop, idx) => (
               <div key={idx} onClick={() => navigateTo('drop-offers')} style={{ minWidth: isMobile ? '110px' : '175px', backgroundColor: '#091616', border: '1px solid #1A2E2E', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer' }}>
                 <img src={drop.img} alt={drop.name} style={{ width: '100%', height: '145px', objectFit: 'cover', opacity: 0.9 }} />
                 <div style={{ padding: '10px', textAlign: 'center' }}>
                   <div style={{ backgroundColor: GOLD_60, color: '#091616', fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginBottom: '6px' }}>{drop.tag}</div>
                   <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '8px', color: '#F5F5F5', fontWeight: '500', marginBottom: '6px' }}>{drop.name}</div>
                   <div style={{ fontSize: '7px', color: GOLD_60, textDecoration: 'underline' }}>SHOP NOW →</div>
                 </div>
               </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
             <button onClick={() => navigateTo('drop-offers')} style={{ background: 'transparent', border: `1px solid ${GOLD_60}`, color: GOLD_60, padding: '4px 16px', borderRadius: '20px', fontSize: '8px', fontFamily: "'Montserrat', sans-serif", cursor: 'pointer' }}>VIEW ALL OFFERS</button>
          </div>
        </div>

        {/* BEST SELLERS */}
        <div style={{ margin: '80px 0', overflow: 'hidden' }}>
          <SectionHeading title="BEST SELLER" />
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <button onClick={() => navigateTo('shop')} style={{ background: 'transparent', border: `1px solid ${GOLD_60}`, color: GOLD_60, padding: '4px 16px', borderRadius: '20px', fontSize: '8px', fontFamily: "'Montserrat', sans-serif", cursor: 'pointer' }}>VIEW ALL PRODUCTS</button>
          </div>
          
          <div 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ position: 'relative', height: isMobile ? '300px' : '360px', display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: '1000px' }}
          >
            {displayProducts.map((prod, idx) => {
              const isTop = idx === swipeIndex;
              const isSecond = idx === (swipeIndex + 1) % bestSellersCount;
              const isThird = idx === (swipeIndex + 2) % bestSellersCount;
              
              if (!isTop && !isSecond && !isThird) return null; 

              let transform = '';
              let zIndex = 0;

              if (isTop) {
                transform = 'rotate(-3deg) scale(1) translateY(0)';
                zIndex = 30;
              } else if (isSecond) {
                transform = `rotate(6deg) scale(0.9) translateX(${isMobile ? '25px' : '50px'}) translateY(12px)`;
                zIndex = 20;
              } else if (isThird) {
                transform = `rotate(-6deg) scale(0.85) translateX(-${isMobile ? '25px' : '50px'}) translateY(24px)`;
                zIndex = 10;
              }

              return (
                <div 
                  key={prod.id || idx} 
                  onClick={() => { if(isTop) handleSwipe(); else handleOpenProduct(prod, 'home'); }}
                  style={{
                    position: 'absolute', width: isMobile ? '160px' : '225px', backgroundColor: '#091616', border: '1px solid #1A2E2E', borderRadius: '8px', padding: '8px',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)', transform, zIndex, cursor: isTop ? 'grab' : 'pointer',
                    boxShadow: isTop ? '0 10px 20px rgba(0,0,0,0.5)' : 'none'
                  }}
                >
                  <div style={{ position: 'relative', borderRadius: '6px', overflow: 'hidden' }}>
                    <span style={{ position: 'absolute', top: '6px', left: '6px', background: '#F5F5F5', color: '#091616', fontFamily: "'Bebas Neue', sans-serif", fontSize: '9px', padding: '2px 6px', borderRadius: '4px', zIndex: 2 }}>NEW</span>
                    <div style={{ position: 'absolute', top: '6px', right: '6px', zIndex: 2 }}>
                      <button onClick={(e) => { e.stopPropagation(); handleToggleWishlist(prod.id); }} style={{ background: 'transparent', border: '1px solid #E0E0E0', color: '#E0E0E0', fontSize: '9px', width: '22px', height: '22px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>♡</button>
                    </div>
                    <img src={prod.image || (prod.images && prod.images[0]) || '/dress1.png'} alt={prod.name || 'Product'} style={{ width: '100%', height: isMobile ? '190px' : '250px', objectFit: 'cover', objectPosition: 'top', opacity: 0.9 }} />
                  </div>
                  {isTop && (
                    <div style={{ marginTop: '10px', textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '9px', fontWeight: '600', color: '#F5F5F5', marginBottom: '3px' }}>{prod.name}</div>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '11px', fontWeight: '800', color: '#F5F5F5' }}>₹{prod.price} <span style={{fontSize:'8px', color:'#888', textDecoration:'line-through', fontWeight:'400'}}>₹{Math.round(prod.price * 1.5)}</span></div>
                      <div style={{ fontSize: '7px', color: GOLD_60, marginTop: '3px' }}>★★★★★ (124)</div>
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
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center', padding: '12px 0', margin: '80px 16px', backgroundColor: '#091616', border: '1px solid #1A2E2E', borderRadius: '8px' }}>
          {[{i:'🚚', t:'FREE SHIPPING'}, {i:'💳', t:'COD AVAILABLE'}, {i:'🛡', t:'SECURE PAYMENTS'}, {i:'🎧', t:'24/7 SUPPORT'}].map((tb, idx) => (
            <div key={idx} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: '55px', margin: '4px' }}>
              <div style={{ fontSize: '14px' }}>{tb.i}</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '6px', color: '#A0B8B9', fontWeight: '500' }}>{tb.t}</div>
            </div>
          ))}
        </div>

      </div> {/* END OF DESKTOP MAX-WIDTH CONTAINER */}

      {/* FOOTER */}
      <div style={{ textAlign: 'center', padding: '30px 20px', backgroundColor: '#060E0E', borderTop: '1px solid #1A2E2E' }}>
        <div style={{ border: '1px solid #1A2E2E', padding: '16px', borderRadius: '8px', display: 'inline-block', marginBottom: '20px' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '11px', fontWeight: '900', color: '#F5F5F5', margin: '0 0 10px 0', letterSpacing: '2px' }}>IT'S A LIFESTYLE</h3>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '7px', color: '#A0B8B9', margin: '0 0 12px 0', lineHeight: '1.6', maxWidth: '200px' }}>
            AT SATRASHE60, WE BRING YOU THE PERFECT BLEND OF STREET STYLE, COMFORT AND CONFIDENCE.
          </p>
          <button onClick={() => navigateTo('about')} style={{ background: 'transparent', border: `1px solid ${GOLD_60}`, color: GOLD_60, padding: '6px 16px', borderRadius: '4px', fontSize: '7px', fontFamily: "'Montserrat', sans-serif", fontWeight: '600', cursor: 'pointer' }}>READ OUR STORY</button>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="/logo.png" alt="SATRASHE60" style={{ height: '24px' }} />
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
  
  const [activeCoupon, setActiveCoupon] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.backgroundColor = '#091616'; 
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
    <div className="app" style={{ backgroundColor: '#091616', minHeight: '100vh', fontFamily: "'Montserrat', sans-serif" }}>
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: '80px', right: '20px', backgroundColor: '#091616', color: '#FFF', padding: '12px 20px', borderRadius: '6px', fontSize: '10px', fontWeight: '600', zIndex: 99999, borderLeft: `4px solid ${GOLD_60}`, boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
          {toastMessage}
        </div>
      )}

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
        isMobile ? <MobileBag cartItems={cartItems} onBack={handleGoBack} onUpdateQuantity={handleUpdateCartQuantity} onRemoveItem={handleRemoveFromCart} onProceedToAddress={handleProceedToAddress} activeCoupon={activeCoupon} /> : <div style={{ padding: '60px 4%', minHeight: '60vh', backgroundColor: '#091616' }}><h2 style={{ textAlign: 'center', color: '#FFF' }}>YOUR BAG</h2>{cartItems.length === 0 ? <div style={{ textAlign: 'center' }}><button onClick={() => navigateTo('shop')}>SHOP NOW</button></div> : <div><button onClick={() => setShowCheckout(true)}>PROCEED TO CHECKOUT</button></div>}</div>
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

      {/* MOBILE BOTTOM NAVIGATION */}
      {isMobile && currentPage !== 'product-detail' && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '50px', backgroundColor: '#091616', borderTop: '1px solid #1A2E2E', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 100 }}>
          <button onClick={() => navigateTo('home')} style={{ background: 'none', border: 'none', fontSize: '18px', color: currentPage === 'home' ? GOLD_60 : '#A0B8B9' }}>🏠</button>
          <button onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); navigateTo('shop'); }} style={{ background: 'none', border: 'none', fontSize: '18px', color: '#A0B8B9' }}>🔍</button>
          <button onClick={() => navigateTo('shop', 'New Arrivals')} style={{ background: 'none', border: 'none', fontSize: '9px', fontWeight: '800', color: '#A0B8B9' }}>NEW</button>
          <button onClick={() => navigateTo('cart')} style={{ background: 'none', border: 'none', fontSize: '18px', color: currentPage === 'cart' ? GOLD_60 : '#A0B8B9', position: 'relative' }}>
            🛒{cartItems.length > 0 && <span style={{ position: 'absolute', top: '-4px', right: '-6px', background: GOLD_60, color: '#091616', fontSize: '9px', fontWeight: '800', width: '14px', height: '14px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartItems.length}</span>}
          </button>
          <button onClick={() => navigateTo('account')} style={{ background: 'none', border: 'none', fontSize: '18px', color: currentPage === 'account' ? GOLD_60 : '#A0B8B9' }}>👤</button>
        </div>
      )}

      {showCheckout && <CheckoutModal cartItems={cartItems} activeCoupon={activeCoupon} onClose={() => setShowCheckout(false)} onOrderSuccess={handleOrderPlacedSuccess} onClearCart={() => setCartItems([])} />}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navigateTo={navigateTo} currentUser={currentUser} />
    </div>
  );
}

export default App;