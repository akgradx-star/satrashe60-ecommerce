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
    <div style={{ backgroundColor: '#243637', minHeight: '100vh', color: '#FFF', paddingBottom: '80px', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px', padding: '0 16px', position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(36, 54, 55, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #3A5354' }}>
        <button onClick={onBack} style={{ background: 'transparent', color: '#FFF', border: '1px solid #D4AF37', borderRadius: '4px', padding: '6px 12px', fontSize: '10px', fontWeight: '800', cursor: 'pointer' }}>← HOME</button>
        <h1 style={{ fontSize: '16px', fontWeight: '900', color: '#D4AF37', margin: 0, letterSpacing: '1px' }}>THE 1760 DROP</h1>
        <div style={{ width: '50px' }}></div>
      </div>

      <div style={{ padding: '24px 16px 10px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 8px 0', color: '#FFF' }}>EXCLUSIVE OFFERS</h2>
        <p style={{ fontSize: '12px', color: '#A0B8B9', margin: 0 }}>Sorted by maximum customer benefit</p>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {dropProducts.map((prod, idx) => (
          <div key={idx} style={{ backgroundColor: '#2D4243', borderRadius: '12px', overflow: 'hidden', border: '1px solid #3A5354', display: 'flex', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, backgroundColor: prod.currentOffer.color, color: '#FFF', fontSize: '9px', fontWeight: '900', padding: '4px 10px', borderBottomRightRadius: '8px', zIndex: 5, letterSpacing: '1px' }}>
              PRIORITY #{prod.currentOffer.priority}
            </div>
            <div style={{ width: '130px', position: 'relative' }}>
              <img src={prod.image || '/dress1.png'} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '11px', color: '#A0B8B9', marginBottom: '6px', fontWeight: '600' }}>{prod.name}</div>
              <div style={{ fontSize: '22px', fontWeight: '900', color: prod.currentOffer.color, marginBottom: '6px', lineHeight: '1.1' }}>
                {prod.currentOffer.text}
              </div>
              <div style={{ fontSize: '10px', color: '#BBD4D5', marginBottom: '14px', lineHeight: '1.3' }}>
                {prod.currentOffer.desc}
              </div>
              <button 
                onClick={() => {
                  if (prod.currentOffer.priority === 1) {
                    setShowPopup(true);
                  } else {
                    onAddToCart({...prod, price: prod.currentOffer.priority === 4 ? Math.max(0, prod.price - 100) : prod.currentOffer.priority === 3 ? Math.round(prod.price * 0.6) : prod.price});
                    alert(`${prod.currentOffer.text} Claimed successfully!`);
                  }
                }}
                style={{ backgroundColor: '#D4AF37', color: '#121212', border: 'none', padding: '10px 16px', borderRadius: '6px', fontSize: '11px', fontWeight: '900', cursor: 'pointer', width: 'fit-content' }}
              >
                {prod.currentOffer.priority === 1 ? 'VIEW CONDITION →' : 'CLAIM OFFER →'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#2D4243', border: '1px solid #D4AF37', borderRadius: '12px', padding: '30px 20px', width: '100%', maxWidth: '350px', textAlign: 'center', position: 'relative' }}>
            <div style={{ fontSize: '50px', marginBottom: '15px' }}>🎁</div>
            <h3 style={{ fontSize: '22px', color: '#FFF', fontWeight: '900', margin: '0 0 12px 0' }}>TAKE FOR ₹9</h3>
            <div style={{ backgroundColor: '#1F2E2F', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
              <p style={{ fontSize: '13px', color: '#DDD', lineHeight: '1.6', margin: 0 }}>
                Shop for <strong style={{color: '#D4AF37', fontSize: '16px'}}>₹399</strong> to get anything 1 free 
                <br/><br/>
                <span style={{ fontSize: '11px', color: '#A0B8B9' }}>(Then you can claim this item for just ₹9)</span>
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowPopup(false)} style={{ flex: 1, padding: '12px', border: '1px solid #A0B8B9', background: 'transparent', color: '#FFF', borderRadius: '6px', fontWeight: '800', cursor: 'pointer', fontSize: '12px' }}>Cancel</button>
              <button onClick={() => { setShowPopup(false); navigateTo('shop'); }} style={{ flex: 1, padding: '12px', background: '#D4AF37', color: '#121212', border: 'none', borderRadius: '6px', fontWeight: '800', cursor: 'pointer', fontSize: '12px' }}>Shop ₹399 Now</button>
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
function Home({ navigateTo, cartItems, dbProducts, handleOpenProduct, handleAddToCart, handleToggleWishlist, onMenuClick }) {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [heroImgIndex, setHeroImgIndex] = useState(0);
  const heroImages = ['/dress2.png', '/dress1.png', '/dress3.png', '/dress4.png'];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const displayProducts = dbProducts && dbProducts.length > 0 ? dbProducts.slice(0, 10) : MASTER_PRODUCTS.slice(0, 5);
  const [swipeIndex, setSwipeIndex] = useState(0);
  const bestSellersCount = displayProducts.length || 1;

  const handleSwipe = () => setSwipeIndex((prev) => (prev + 1) % bestSellersCount);
  const handleSwipeBack = (e) => {
    e.stopPropagation();
    setSwipeIndex((prev) => (prev - 1 + bestSellersCount) % bestSellersCount);
  };

  const spinnerSegments = ['₹9 TOP', 'FREE DEL', '₹200 OFF', '₹100 OFF', '₹50 OFF', 'EXTRA %', 'SPIN AGN', 'FREE DEL'];
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [cooldown, setCooldown] = useState(0); 
  const [showWinPopup, setShowWinPopup] = useState(false);
  const [wonPrize, setWonPrize] = useState('');

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const spinWheel = () => {
    if (isSpinning || cooldown > 0) return;
    setIsSpinning(true);
    
    const targetSlice = Math.floor(Math.random() * 8); 
    const spins = 5 * 360; 
    const extraDegrees = 360 - (targetSlice * 45) - 22.5; 
    const currentBase = rotation - (rotation % 360);
    const totalDegree = currentBase + spins + extraDegrees;
    
    setRotation(totalDegree);
    
    setTimeout(() => {
      setIsSpinning(false);
      const prize = spinnerSegments[targetSlice];
      setWonPrize(prize);
      setShowWinPopup(true); 
      setCooldown(60); 
    }, 4000); 
  };

  return (
    <div style={{ backgroundColor: '#243637', color: '#FFF', paddingBottom: '80px', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
      
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.5); opacity: 0; }
          80% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes floatUp {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
        }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px', padding: '0 16px', position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(36, 54, 55, 0.95)', backdropFilter: 'blur(10px)' }}>
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
        <div style={{ padding: '16px', backgroundColor: '#2D4243', display: 'flex', gap: '10px', borderBottom: '1px solid #3A5354' }}>
          <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #4B6B6C', background: '#243637', color: '#FFF' }} />
          <button onClick={() => { navigateTo('shop', 'ALL'); setShowSearchInput(false); }} style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '0 16px', borderRadius: '4px', fontWeight: 'bold' }}>Go</button>
          <button onClick={() => { setShowSearchInput(false); setSearchQuery(''); }} style={{ background: 'none', color: '#FFF', border: 'none' }}>✕</button>
        </div>
      )}

      <div style={{ margin: '16px', borderRadius: '8px', overflow: 'hidden', position: 'relative', backgroundColor: '#2D4243', display: 'flex', alignItems: 'center', height: '350px' }}>
        <div style={{ padding: '24px', flex: 1, zIndex: 2, background: 'linear-gradient(90deg, rgba(36,54,55,0.95) 0%, rgba(36,54,55,0.3) 100%)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ color: '#D4AF37', fontSize: '10px', letterSpacing: '2px', marginBottom: '8px', fontWeight: '800' }}>PREMIUM EDITION</div>
          <h2 style={{ fontSize: '28px', fontWeight: '900', margin: '0 0 12px 0', lineHeight: '1.2' }}>FRESH DROPS<br/>EVERY WEEK</h2>
          <div style={{ fontSize: '10px', color: '#BBD4D5', marginBottom: '24px', letterSpacing: '1px' }}>TRENDY • COMFY • AFFORDABLE</div>
          <button onClick={() => navigateTo('shop')} style={{ background: 'transparent', color: '#D4AF37', border: '1px solid #D4AF37', padding: '10px 20px', fontSize: '12px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', width: 'fit-content' }}>SHOP NOW →</button>
        </div>
        <div style={{ position: 'absolute', right: 0, top: 0, width: '65%', height: '100%', zIndex: 1 }}>
          <img src={heroImages[heroImgIndex]} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', transition: 'opacity 0.8s ease-in-out' }} />
        </div>
      </div>

      <div style={{ margin: '40px 16px' }}>
        <SectionHeading title="SHOP BY SIZE" />
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '5px' }}>
          {["XS", "S", "M", "L", "XL"].map(sz => (
            <button key={sz} onClick={() => navigateTo('size-filter', sz)} style={{ flexShrink: 0, width: '44px', height: '44px', background: '#2D4243', border: '1px solid #3A5354', borderRadius: '6px', color: '#D4AF37', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>{sz}</button>
          ))}
        </div>
      </div>

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
              <div style={{ width: '68px', height: '68px', borderRadius: '50%', border: '2px solid #D4AF37', padding: '2px', marginBottom: '8px', backgroundColor: '#2D4243' }}>
                <img src={cat.i} alt={cat.n} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top' }} />
              </div>
              <span style={{ fontSize: '11px', color: '#FFF', fontWeight: '600', textAlign: 'center' }}>{cat.n}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ margin: '40px 0', padding: '30px 16px', backgroundColor: '#2D4243', borderTop: '1px solid #3A5354', borderBottom: '1px solid #3A5354' }}>
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <h2 style={{ fontSize: '18px', color: '#D4AF37', margin: '0 0 4px 0', fontWeight: '900', letterSpacing: '2px' }}>SPIN & WIN</h2>
          <div style={{ height: '30px', marginTop: '6px' }}>
            {cooldown > 0 ? (
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(212, 175, 55, 0.1)', border: '1px solid #D4AF37', color: '#D4AF37', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '800' }}>
                ⏳ Next spin in {Math.floor(cooldown / 60)}:{(cooldown % 60).toString().padStart(2, '0')}
              </div>
            ) : (
              <p style={{ fontSize: '11px', color: '#A0B8B9', margin: 0, textTransform: 'uppercase' }}>Try your luck & unlock a special offer</p>
            )}
          </div>
        </div>

        <div style={{ position: 'relative', width: '260px', height: '260px', margin: '0 auto' }}>
          <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', width: '0', height: '0', borderLeft: '14px solid transparent', borderRight: '14px solid transparent', borderTop: '22px solid #D4AF37', zIndex: 10 }}></div>
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '4px solid #D4AF37', background: 'conic-gradient(#2D4243 0deg 45deg, #D4AF37 45deg 90deg, #2D4243 90deg 135deg, #D4AF37 135deg 180deg, #2D4243 180deg 225deg, #D4AF37 225deg 270deg, #2D4243 270deg 315deg, #D4AF37 315deg 360deg)', transition: 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)', transform: `rotate(${rotation}deg)`, boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)', position: 'relative', overflow: 'hidden' }}>
            {spinnerSegments.map((seg, i) => {
              const angle = i * 45 + 22.5 - 90;
              return (
                <div key={i} style={{ position: 'absolute', top: '50%', left: '50%', transformOrigin: '0 50%', transform: `rotate(${angle}deg) translate(35px, -50%)`, width: '80px', textAlign: 'right', fontSize: '9px', fontWeight: '900', color: i % 2 === 0 ? '#D4AF37' : '#2D4243', zIndex: 2, textTransform: 'uppercase', lineHeight: '1.2' }}>
                  {seg}
                </div>
              );
            })}
          </div>
          <button onClick={spinWheel} disabled={isSpinning || cooldown > 0} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: (isSpinning || cooldown > 0) ? '#4B6B6C' : '#D4AF37', color: (isSpinning || cooldown > 0) ? '#A0B8B9' : '#121212', border: '4px solid #243637', fontSize: '13px', fontWeight: '900', cursor: (isSpinning || cooldown > 0) ? 'not-allowed' : 'pointer', zIndex: 5, boxShadow: '0 4px 10px rgba(0,0,0,0.6)' }}>
            SPIN
          </button>
        </div>
      </div>

      {showWinPopup && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'popIn 0.5s ease-out' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} style={{ position: 'absolute', left: `${Math.random() * 100}%`, bottom: '-30px', fontSize: ['24px', '30px', '20px'][Math.floor(Math.random() * 3)], animation: `floatUp ${2 + Math.random() * 2}s ease-in forwards`, animationDelay: `${Math.random() * 0.5}s` }}>
                {['🎉', '🎊', '✨', '💰', '💸'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>
          <div style={{ fontSize: '70px', marginBottom: '10px' }}>🎉</div>
          <h2 style={{ color: '#D4AF37', fontSize: '32px', textAlign: 'center', margin: '0 0 10px 0', fontFamily: "'Playfair Display', serif" }}>
            {wonPrize === 'SPIN AGAIN' ? 'OOPS!' : 'YOU WON!'}
          </h2>
          <div style={{ color: '#121212', fontSize: '24px', fontWeight: '900', background: '#D4AF37', padding: '12px 24px', borderRadius: '8px', boxShadow: '0 5px 15px rgba(212,175,55,0.4)', textAlign: 'center' }}>
            {wonPrize}
          </div>
          {wonPrize !== 'SPIN AGAIN' && (<p style={{ color: '#DDD', marginTop: '20px', fontSize: '13px' }}>Offer code successfully applied!</p>)}
          <button onClick={() => setShowWinPopup(false)} style={{ marginTop: '30px', padding: '12px 40px', border: '1px solid #D4AF37', background: 'transparent', color: '#D4AF37', borderRadius: '30px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', position: 'relative', zIndex: 10 }}>
            {wonPrize === 'SPIN AGAIN' ? 'CLOSE' : 'CLAIM & CLOSE'}
          </button>
        </div>
      )}

      <div style={{ margin: '50px 0', position: 'relative', overflow: 'hidden', padding: '20px 0' }}>
        <div style={{ position: 'absolute', left: 0, top: '10%', bottom: '10%', width: '3px', background: 'linear-gradient(180deg, transparent 0%, rgba(212,175,55,0.7) 50%, transparent 100%)', boxShadow: '2px 0 10px rgba(212,175,55,0.3)', zIndex: 0 }} />
        <div style={{ position: 'absolute', right: 0, top: '10%', bottom: '10%', width: '3px', background: 'linear-gradient(180deg, transparent 0%, rgba(212,175,55,0.7) 50%, transparent 100%)', boxShadow: '-2px 0 10px rgba(212,175,55,0.3)', zIndex: 0 }} />

        <div style={{ textAlign: 'center', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #D4AF37', borderRadius: '24px', padding: '10px 30px', gap: '12px', backgroundColor: '#243637' }}>
            <span style={{ color: '#FFF', fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: '600' }}>THE</span>
            <img src="/logo.png" alt="1760" style={{ height: '28px' }} />
            <span style={{ color: '#FFF', fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: '600' }}>DROP</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', padding: '0 20px', scrollbarWidth: 'none', position: 'relative', zIndex: 1 }}>
          <div onClick={() => navigateTo('drop-offers')} style={{ minWidth: '220px', background: '#2D4243', borderRadius: '8px', overflow: 'hidden', border: '1px solid #3A5354', cursor: 'pointer' }}>
            <img src="/dress1.png" alt="Offer 1" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', objectPosition: 'top' }} />
            <div style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ color: '#EF4444', fontSize: '11px', fontWeight: '900', marginBottom: '4px' }}>PRIORITY #1 MEGA OFFER</div>
              <div style={{ color: '#FFF', fontSize: '22px', fontWeight: '900', marginBottom: '4px' }}>TAKE FOR ₹9</div>
              <div style={{ color: '#A0B8B9', fontSize: '10px', marginBottom: '12px' }}>CONDITION APPLIES</div>
            </div>
          </div>

          <div onClick={() => navigateTo('drop-offers')} style={{ minWidth: '220px', background: '#2D4243', borderRadius: '8px', overflow: 'hidden', border: '1px solid #3A5354', cursor: 'pointer' }}>
            <img src="/dress3.png" alt="Offer 2" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', objectPosition: 'top' }} />
            <div style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ color: '#F59E0B', fontSize: '11px', fontWeight: '900', marginBottom: '4px' }}>PRIORITY #2 SPECIAL</div>
              <div style={{ color: '#FFF', fontSize: '22px', fontWeight: '900', marginBottom: '4px' }}>TAKE 2</div>
              <div style={{ color: '#A0B8B9', fontSize: '10px', marginBottom: '12px' }}>HEAVY DISCOUNT</div>
            </div>
          </div>
          
          <div onClick={() => navigateTo('drop-offers')} style={{ minWidth: '220px', background: '#2D4243', borderRadius: '8px', overflow: 'hidden', border: '1px solid #3A5354', cursor: 'pointer' }}>
            <img src="/dress4.png" alt="Offer 3" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', objectPosition: 'top' }} />
            <div style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ color: '#10B981', fontSize: '11px', fontWeight: '900', marginBottom: '4px' }}>PRIORITY #3 FLAT</div>
              <div style={{ color: '#FFF', fontSize: '22px', fontWeight: '900', marginBottom: '4px' }}>40% OFF</div>
              <div style={{ color: '#A0B8B9', fontSize: '10px', marginBottom: '12px' }}>INSTANT DEDUCTION</div>
            </div>
          </div>
        </div>
      </div>

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
                  position: 'absolute', width: '250px', backgroundColor: '#2D4243', border: '1px solid #3A5354', borderRadius: '8px', padding: '10px',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)', transform, zIndex, opacity, cursor: isTop ? 'grab' : 'pointer',
                  boxShadow: isTop ? '0 10px 25px rgba(0,0,0,0.6)' : 'none'
                }}
              >
                <div style={{ position: 'relative', borderRadius: '6px', overflow: 'hidden' }}>
                  <span style={{ position: 'absolute', top: '8px', left: '8px', background: '#D4AF37', color: '#121212', fontSize: '9px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', zIndex: 2 }}>HOT</span>
                  
                  <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '6px', zIndex: 2 }}>
                    <button onClick={(e) => { e.stopPropagation(); handleAddToCart({...prod, quantity: 1, selectedSize: 'M'}); }} style={{ background: 'rgba(36,54,55,0.7)', border: '1px solid #D4AF37', color: '#D4AF37', fontSize: '13px', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer' }}>🛍</button>
                    <button onClick={(e) => { e.stopPropagation(); handleToggleWishlist(prod.id); }} style={{ background: 'rgba(36,54,55,0.7)', border: 'none', color: '#FFF', fontSize: '13px', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer' }}>♡</button>
                  </div>
                  
                  <img src={prod.image || (prod.images && prod.images[0]) || '/dress1.png'} alt={prod.name || 'Product'} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', objectPosition: 'top center' }} />
                </div>
                {isTop && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>₹{prod.price || '999'}</div>
                    <div style={{ fontSize: '10px', color: '#A0B8B9' }}>Tap to swipe ↺</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', marginTop: '10px' }}>
          <button onClick={handleSwipeBack} style={{ background: '#2D4243', border: '1px solid #3A5354', color: '#FFF', padding: '8px 20px', borderRadius: '20px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}>
            ↺ Undo Swipe
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px 0', margin: '30px 0', borderTop: '1px solid #3A5354' }}>
        {[{i:'🚚', t:'Free Shipping'}, {i:'💳', t:'COD Available'}, {i:'🛡', t:'Secure Payment'}, {i:'🎧', t:'24/7 Support'}].map((tb, idx) => (
          <div key={idx} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>{tb.i}</div>
            <div style={{ fontSize: '8px', color: '#A0B8B9', textTransform: 'uppercase' }}>{tb.t}</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#2D4243', borderTop: '1px solid #3A5354' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#FFF', margin: '0 0 12px 0', letterSpacing: '2px' }}>IT'S A LIFESTYLE</h3>
        <p style={{ fontSize: '11px', color: '#BBD4D5', margin: '0 0 20px 0', lineHeight: '1.6' }}>At SATRASHE60, we bring you the perfect blend of street style, comfort and confidence.</p>
        
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
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.backgroundColor = '#243637';
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
    <div className="app" style={{ backgroundColor: '#243637', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: '80px', right: '20px', backgroundColor: '#2D4243', color: '#FFF', padding: '12px 20px', borderRadius: '6px', fontSize: '12px', fontWeight: '800', zIndex: 99999, borderLeft: '4px solid #D4AF37' }}>
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
        isMobile ? <MobileBag cartItems={cartItems} onBack={handleGoBack} onUpdateQuantity={handleUpdateCartQuantity} onRemoveItem={handleRemoveFromCart} onProceedToAddress={handleProceedToAddress} /> : <div style={{ padding: '60px 4%', minHeight: '60vh', backgroundColor: '#2D4243' }}><h2 style={{ textAlign: 'center', color: '#FFF' }}>YOUR BAG</h2>{cartItems.length === 0 ? <div style={{ textAlign: 'center' }}><button onClick={() => navigateTo('shop')}>SHOP NOW</button></div> : <div><button onClick={() => setShowCheckout(true)}>PROCEED TO CHECKOUT</button></div>}</div>
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
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '60px', backgroundColor: 'rgba(36, 54, 55, 0.98)', borderTop: '1px solid #3A5354', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 100, backdropFilter: 'blur(10px)' }}>
          <button onClick={() => navigateTo('home')} style={{ background: 'none', border: 'none', fontSize: '20px', color: currentPage === 'home' ? '#D4AF37' : '#A0B8B9' }}>🏠</button>
          <button onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); navigateTo('shop'); }} style={{ background: 'none', border: 'none', fontSize: '20px', color: '#A0B8B9' }}>🔍</button>
          <button onClick={() => navigateTo('shop', 'New Arrivals')} style={{ background: 'none', border: 'none', fontSize: '10px', fontWeight: '900', color: '#A0B8B9' }}>NEW</button>
          <button onClick={() => navigateTo('cart')} style={{ background: 'none', border: 'none', fontSize: '20px', color: currentPage === 'cart' ? '#D4AF37' : '#A0B8B9', position: 'relative' }}>
            🛍{cartItems.length > 0 && <span style={{ position: 'absolute', top: '-4px', right: '-6px', background: '#D4AF37', color: '#000', fontSize: '10px', fontWeight: '900', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartItems.length}</span>}
          </button>
          <button onClick={() => navigateTo('account')} style={{ background: 'none', border: 'none', fontSize: '20px', color: currentPage === 'account' ? '#D4AF37' : '#A0B8B9' }}>👤</button>
        </div>
      )}

      {showCheckout && <CheckoutModal cartItems={cartItems} onClose={() => setShowCheckout(false)} onOrderSuccess={handleOrderPlacedSuccess} onClearCart={() => setCartItems([])} />}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navigateTo={navigateTo} currentUser={currentUser} />
    </div>
  );
}

export default App;