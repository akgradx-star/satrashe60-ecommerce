import SideMenu from './SideMenu';
import { useState, useEffect, useContext } from 'react';
import './App.css';
import './Home.css'; // 🚀 Home ka CSS yahan import kar liya
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
// 🚀 DIRECTLY PASTED HOME COMPONENT HERE 
// ISSE "MODULE NOT FOUND" ERROR ZINDAGI MEIN KABHI NAHI AAYEGA!
// ==========================================
function Home({ navigateTo, cartItems, dbProducts, handleOpenProduct }) {
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
        <img src="/logo.png" alt="1760 SATRASHE60" style={{ height: '30px', objectFit: 'contain' }} />
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
            <img src="/logo.png" alt="1760" style={{ height: '24px' }} />
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
        <img src="/logo.png" alt="SATRASHE60" style={{ height: '40px', marginTop: '40px' }} />
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
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  
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

      {currentPage !== 'home' && currentPage !== 'shop' && currentPage !== 'product-detail' && (
        <MobileHeaderNav cartCount={cartItems.length} wishlistCount={wishlist.length} isLoggedIn={!!currentUser} currentPage={currentPage} navigateTo={navigateTo} goBack={handleGoBack} historyLength={historyStack.length} />
      )}

      {currentPage === 'account' ? <Account currentUser={currentUser} orders={placedOrders} onLogin={setCurrentUser} onLogout={() => setCurrentUser(null)} onNavigateToShop={() => navigateTo('shop')} />
      : currentPage === 'community' ? <Community currentUser={currentUser} onNavigateToAbout={() => navigateTo('about')} onNavigateToAccount={() => navigateTo('account')} />
      : currentPage === 'about' ? <About onNavigateToShop={() => navigateTo('shop')} />
      : currentPage === 'product-detail' ? (isMobile ? <MobileProductDetail product={selectedProduct} onBack={handleGoBack} onAddToCart={handleAddToCart} onNavigateToBag={() => navigateTo('cart')} /> : <ProductDetail product={selectedProduct} onBack={() => setCurrentPage(sourceBackPage)} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} sourceTitle={sourceBackPage.toUpperCase()} />)
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
        />
      )}

      <MobileAuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLoginSuccess={(userData) => { setCurrentUser(userData); setShowAuthModal(false); setShowCheckout(true); }} />

      {currentPage !== 'product-detail' && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '60px', backgroundColor: '#000', borderTop: '1px solid #222', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 100 }}>
          <button onClick={() => navigateTo('home')} style={{ background: 'none', border: 'none', fontSize: '20px', color: currentPage === 'home' ? '#D4AF37' : '#888' }}>🏠</button>
          <button onClick={() => { setShowSearchInput(true); window.scrollTo(0,0); }} style={{ background: 'none', border: 'none', fontSize: '20px', color: '#888' }}>🔍</button>
          <button onClick={() => navigateTo('shop', 'New Arrivals')} style={{ background: 'none', border: 'none', fontSize: '10px', fontWeight: '900', color: '#888' }}>NEW</button>
          <button onClick={() => navigateTo('cart')} style={{ background: 'none', border: 'none', fontSize: '20px', color: currentPage === 'cart' ? '#D4AF37' : '#888', position: 'relative' }}>
            🛍️{cartItems.length > 0 && <span style={{ position: 'absolute', top: '-4px', right: '-6px', background: '#D4AF37', color: '#000', fontSize: '10px', fontWeight: '900', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartItems.length}</span>}
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