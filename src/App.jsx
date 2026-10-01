import SideMenu from './SideMenu';
import MobileCheckout from './MobileCheckout';
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
import { ShopContext } from './ShopContext'; // 🚀 TANKI IMPORT HO GAYI

function App() {
  // 🚀 TANKI SE SAARA DATA DIRECT LE RAHE HAIN
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
        foundProduct = dbProducts.find(p => 
          p?.slug === productOrSlug || 
          p?.name === productOrSlug || 
          (p?.name && p.name.toLowerCase() === searchSlug) || 
          (p?.name && p.name.toLowerCase().replace(/\s+/g, '-') === searchSlug) || 
          p?._id === productOrSlug || 
          p?.id === productOrSlug
        );
        if (!foundProduct) {
          foundProduct = (MASTER_PRODUCTS || []).find(p => 
            p?.slug === productOrSlug || 
            p?.name === productOrSlug || 
            (p?.name && p.name.toLowerCase() === searchSlug)
          );
        }
      }

      let finalProduct = foundProduct || dbProducts[0] || (MASTER_PRODUCTS && MASTER_PRODUCTS[0]);
      if (finalProduct) {
        finalProduct = { 
          ...finalProduct, 
          sizes: finalProduct.sizes || ["S", "M", "L", "XL"],
          images: finalProduct.images || [finalProduct.image || '/dress1.png']
        };
      }
      setSelectedProduct(finalProduct);
      setSourceBackPage(source);
      setCurrentPage('product-detail');
      setHistoryStack(prev => [...prev, 'product-detail']);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Product open karne mein error:", error);
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

  // 🚀 TANKI WALE FUNCTIONS USE KAR RAHE HAIN
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
      customerName: currentUser?.name || 'Valued Customer',
      customerPhone: currentUser?.mobile || '+91 98201 55678',
      shippingAddress: currentUser?.address || 'Baner Road, Pune, Maharashtra - 411045',
      items: [...cartItems],
      totalAmount: cartItems.reduce((acc, i) => acc + (Number(i.price) * (i.quantity || 1)), 0),
      paymentMethod: 'Cash On Delivery (COD) / Online',
      status: 'Pending',
      ...newOrderDetails
    };

    addOrder(createdOrder);
    clearCart();
    setShowCheckout(false);
    triggerToast(`🎉 Order Placed Successfully! Ref: ${createdOrder.id}`);
  };

  if (currentPage === 'admin') {
    return (
      <AdminDashboard 
        onLogout={() => navigateTo('home')} 
        onNavigateToWebsite={() => navigateTo('home')} 
      />
    );
  }

  return (
    <div className="app">
      {toastMessage && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', backgroundColor: '#0A0A0A',
          color: '#FFFFFF', padding: '12px 20px', borderRadius: '6px', fontSize: '12px',
          fontWeight: '800', zIndex: 99999, boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          borderLeft: '4px solid #FF6B00', letterSpacing: '0.5px'
        }}>
          {toastMessage}
        </div>
      )}

      {currentPage !== 'home' && (
        <MobileHeaderNav 
          cartCount={cartItems.length} 
          wishlistCount={wishlist.length} 
          isLoggedIn={!!currentUser} 
          currentPage={currentPage} 
          navigateTo={navigateTo} 
          goBack={handleGoBack}              
          historyLength={historyStack.length} 
        />
      )}

      {currentPage === 'account' ? (
        <Account 
          currentUser={currentUser}
          orders={placedOrders}
          onLogin={(user) => setCurrentUser(user)}
          onLogout={() => setCurrentUser(null)}
          onNavigateToShop={() => navigateTo('shop')}
        />
      ) : currentPage === 'community' ? (
        <Community 
          currentUser={currentUser}
          onNavigateToAbout={() => navigateTo('about')} 
          onNavigateToAccount={() => navigateTo('account')} 
        />
      ) : currentPage === 'about' ? (
        <About onNavigateToShop={() => navigateTo('shop')} />
      ) : currentPage === 'product-detail' ? (
        isMobile ? (
          <MobileProductDetail 
            product={selectedProduct}
            onBack={handleGoBack}
            onAddToCart={handleAddToCart}
            onNavigateToBag={() => navigateTo('cart')}
          />
        ) : (
          <ProductDetail 
            product={selectedProduct}
            onBack={() => setCurrentPage(sourceBackPage)}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            sourceTitle={sourceBackPage.toUpperCase()}
          />
          )
      ) : currentPage === 'category-plp' ? (
        <CategoryPLP 
          categoryName={selectedCategory || "ALL"}
          products={MASTER_PRODUCTS}
          onBack={() => navigateTo('home')}
          onProductClick={(prod) => handleOpenProduct(prod, 'category-plp')}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          navigateTo={navigateTo}
        />
      ) : currentPage === 'size-filter' ? (
        <Shop 
          products={dbProducts} 
          initialCategory="ALL"
          initialSizes={Array.isArray(selectedCategory) ? selectedCategory : []} 
          onNavigate={navigateTo} 
          wishlist={wishlist} 
          onToggleWishlist={handleToggleWishlist} 
          onAddToCart={handleAddToCart} 
        />
      ) : currentPage === 'shop' ? (
        <Shop 
          products={dbProducts} 
          initialCategory={selectedCategory} 
          initialSearchQuery={searchQuery}
          onNavigate={navigateTo} 
          wishlist={wishlist} 
          onToggleWishlist={handleToggleWishlist} 
          onAddToCart={handleAddToCart} 
        />
      ) : currentPage === 'wishlist' ? (
        <div style={{ padding: '60px 4%', textAlign: 'center', minHeight: '60vh', backgroundColor: '#FAFAFA' }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '32px', fontWeight: '800', marginBottom: '20px' }}>YOUR WISHLIST</h2>
          {wishlist.length === 0 ? (
            <div>
              <p style={{ color: '#666666', marginBottom: '20px' }}>YOUR WISHLIST IS EMPTY</p>
              <button onClick={() => navigateTo('shop')} style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '12px 28px', border: 'none', fontWeight: '800', cursor: 'pointer', borderRadius: '4px' }}>CONTINUE SHOPPING</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
              {(MASTER_PRODUCTS || []).filter(p => wishlist.includes(p.id)).map(p => (
                <div key={p.id} style={{ border: '1px solid #E5E5E5', backgroundColor: '#FFFFFF', borderRadius: '4px', padding: '12px', textAlign: 'left', cursor: 'pointer' }} onClick={() => handleOpenProduct(p, 'wishlist')}>
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                  <h4 style={{ fontSize: '13px', margin: '8px 0 4px 0' }}>{p.name}</h4>
                  <div style={{ fontWeight: '800', fontSize: '14px' }}>₹{p.price}</div>
                  <button onClick={(e) => { e.stopPropagation(); handleToggleWishlist(p.id); }} style={{ marginTop: '10px', background: '#FF6B00', color: '#FFFFFF', border: 'none', padding: '8px 12px', width: '100%', fontWeight: '700', cursor: 'pointer', fontSize: '11px', borderRadius: '2px' }}>REMOVE</button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : currentPage === 'cart' ? (
        isMobile ? (
          <MobileBag 
            cartItems={cartItems}
            onBack={handleGoBack}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onProceedToAddress={handleProceedToAddress}
          />
        ) : (
          <div style={{ padding: '60px 4%', minHeight: '60vh', backgroundColor: '#FAFAFA' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '32px', fontWeight: '800', textAlign: 'center', marginBottom: '20px' }}>YOUR BAG</h2>
            {cartItems.length === 0 ? (
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#666666', marginBottom: '20px' }}>YOUR BAG IS EMPTY</p>
                <button onClick={() => navigateTo('shop')} style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '12px 28px', border: 'none', fontWeight: '800', cursor: 'pointer', borderRadius: '4px' }}>SHOP NOW</button>
              </div>
            ) : (
              <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#FFFFFF', padding: '24px', border: '1px solid #E5E5E5', borderRadius: '6px' }}>
                {cartItems.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '16px', borderBottom: '1px solid #EEEEEE', padding: '14px 0', alignItems: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, fontSize: '14px' }}>{item.name}</h4>
                      <div style={{ fontSize: '12px', color: '#666666' }}>Size: {item.selectedSize || 'Free Size'} | Qty: {item.quantity || 1}</div>
                      <div style={{ fontWeight: '800', fontSize: '14px', marginTop: '4px' }}>₹{item.price}</div>
                    </div>
                    <button onClick={() => handleRemoveFromCart(idx)} style={{ background: 'none', border: 'none', color: '#999999', cursor: 'pointer', fontSize: '16px' }}>✕</button>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontWeight: '800', fontSize: '16px' }}>
                  <span>Subtotal:</span>
                  <span>₹{cartItems.reduce((acc, i) => acc + (Number(i.price) * (i.quantity || 1)), 0)}</span>
                </div>
                <button 
                  onClick={() => setShowCheckout(true)}
                  style={{ backgroundColor: '#FF6B00', color: '#FFFFFF', width: '100%', padding: '16px', border: 'none', marginTop: '20px', fontWeight: '800', cursor: 'pointer', borderRadius: '4px', letterSpacing: '1px', textTransform: 'uppercase' }}
                >
                  PROCEED TO CHECKOUT →
                </button>
              </div>
            )}
          </div>
        )
      ) : (
        <div className="premium-home-container">
          <header className="premium-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {currentPage !== 'home' && (
                <button 
                  onClick={() => {
                    if (currentPage === 'product' || currentPage === 'product-detail' || currentPage === 'cart') {
                      navigateTo('shop', 'ALL');
                    } else {
                      navigateTo('home');
                    }
                  }} 
                  style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '24px', cursor: 'pointer', padding: 0, marginTop: '-4px' }}
                >
                  ←
                </button>
              )}
              <button className="menu-btn" onClick={() => setIsMenuOpen(true)}>☰</button>
            </div>
            <img src="/logo.png" alt="SATRASHE60" className="header-logo" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }} />
            <div className="header-icons">
              <button onClick={() => { setShowSearchInput(true); window.scrollTo(0,0); }}>🔍</button>
              <button onClick={() => navigateTo('cart')}>
                🛍️<span className="cart-badge">{cartItems.length}</span>
              </button>
            </div>
          </header>

          {showSearchInput && (
            <div className="premium-search-bar">
              <input 
                type="text" 
                placeholder="Search 'Tops', 'Kurtis'..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if(e.key === 'Enter') {
                    navigateTo('shop', 'ALL');
                    setShowSearchInput(false);
                  }
                }}
                autoFocus
              />
              <button className="search-go-btn" onClick={() => { navigateTo('shop', 'ALL'); setShowSearchInput(false); }}>Go</button>
              <button className="search-close-btn" onClick={() => { setShowSearchInput(false); setSearchQuery(''); }}>✕</button>
            </div>
          )}

          <div className="premium-hero">
            <div className="premium-hero-content">
              <div className="hero-eyebrow">STYLE MEETS YOU</div>
              <h1 className="hero-main-title">WEAR<br/>YOUR<br/>STORY</h1>
              <p className="hero-subtitle">PREMIUM FASHION FOR<br/>MODERN YOU</p>
              <button className="gold-outline-btn" onClick={() => navigateTo('shop')}>SHOP NOW →</button>
            </div>
            <div className="slider-count">01 / 03</div>
          </div>

          <section className="premium-section">
            <div className="premium-section-header"><h2>SHOP BY SIZE</h2></div>
            <div className="premium-size-grid">
              {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                <div key={size} className="premium-category-card" onClick={() => navigateTo('size-filter', [size])}>
                  <div className="premium-cat-img-box size-box-center"><span className="size-text-gold">{size}</span></div>
                </div>
              ))}
            </div>
          </section>

          <section className="premium-section">
            <div className="premium-section-header">
              <h2>SHOP BY CATEGORY</h2>
              <button className="gold-text-btn" onClick={() => navigateTo('shop')}>VIEW ALL →</button>
            </div>
            <div className="premium-category-grid">
              {[
                { name: 'Tops', img: '/dress1.png' }, { name: 'T-Shirts', img: '/dress2.png' },
                { name: 'Kurtis', img: '/dress3.png' }, { name: 'One Pieces', img: '/dress4.png' },
                { name: 'Jeans', img: '/dress1.png' }, { name: 'Track Pants', img: '/dress2.png' },
                { name: 'Dresses', img: '/dress3.png' }, { name: 'Co-ords', img: '/dress4.png' }
              ].map((cat, idx) => (
                <div key={idx} className="premium-category-card" onClick={() => navigateTo('shop', cat.name)}>
                  <div className="premium-cat-img-box"><img src={cat.img} alt={cat.name} /></div>
                  <p>{cat.name}</p>
                </div>
              ))}
              
              <div className="premium-category-card" onClick={() => navigateTo('shop', 'New Arrivals')}>
                <div className="premium-cat-img-box new-drop-box"><span className="crown-icon">👑</span><span className="new-text">NEW</span></div>
                <p>New Drop</p>
              </div>
              <div className="premium-category-card" onClick={() => navigateTo('shop')}>
                <div className="premium-cat-img-box more-box"><span className="hanger-icon">🧥</span></div>
                <p>More</p>
              </div>
            </div>
          </section>

          <div className="premium-promo-banner">
            <div className="promo-overlay">
              <div className="hero-eyebrow">NEW ARRIVALS</div>
              <h2 className="promo-title">FRESH DROPS<br/>EVERY WEEK</h2>
              <p className="promo-subtitle">TRENDY • COMFY • AFFORDABLE</p>
              <button className="gold-filled-btn" onClick={() => navigateTo('shop')}>EXPLORE NOW →</button>
            </div>
          </div>

          <section className="premium-section">
            <div className="premium-section-header">
              <h2>BEST SELLERS</h2>
              <button className="gold-text-btn" onClick={() => navigateTo('shop', 'Best Sellers')}>VIEW ALL →</button>
            </div>
           <div className="premium-products-scroll">
              {dbProducts.slice(0, 6).map(prod => {
                const productImg = prod.image || (prod.images && prod.images[0]) || '/dress1.png';
                const productId = prod._id || prod.id;
                
                return (
                <div key={productId} className="premium-product-card" onClick={() => handleOpenProduct(prod, 'home')}>
                  <div className="product-image-wrapper">
                    <span className="card-badge badge-new" style={{position: 'absolute', top: '10px', left: '10px', background: '#D4AF37', color: '#000', padding: '2px 8px', fontSize: '10px', fontWeight: '800', borderRadius: '2px', zIndex: 10}}>NEW</span>
                    <img src={productImg} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button className="premium-wishlist-btn" onClick={(e) => { e.stopPropagation(); handleToggleWishlist(productId); }}>♡</button>
                  </div>
                  <div className="product-info-dark">
                    <h3>{prod.name}</h3>
                    <div className="price-row-dark">
                      <span className="current-price">₹{prod.price}</span>
                      {prod.oldPrice && <span className="old-price">₹{prod.oldPrice}</span>}
                    </div>
                    <div className="rating-stars">★★★★★ <span className="review-count">({prod.reviews?.length || 124})</span></div>
                  </div>
                </div>
              )})}
            </div>
          </section>

          <div className="premium-trust-bar">
            <div className="trust-item"><span className="icon">🚚</span><p>Free Shipping<br/>Above ₹549</p></div>
            <div className="trust-item"><span className="icon">💳</span><p>COD<br/>Available</p></div>
            <div className="trust-item"><span className="icon">🛡️</span><p>Secure<br/>Payments</p></div>
            <div className="trust-item"><span className="icon">🎧</span><p>24/7<br/>Support</p></div>
          </div>

          <div className="premium-lifestyle">
             <img src="/hero.png" alt="Lifestyle" className="lifestyle-image" />
             <div className="lifestyle-content">
               <div className="hero-eyebrow">MORE THAN JUST CLOTHES</div>
               <h2>IT'S A LIFESTYLE</h2>
               <p>At SATRASHE60, we bring you the perfect blend of street style, comfort and confidence. Because your story deserves the best fit.</p>
               <button className="gold-outline-btn" onClick={() => navigateTo('about')}>KNOW OUR STORY →</button>
             </div>
          </div>

          <footer className="premium-footer">
            <div className="newsletter-box">
              <span className="newsletter-icon">✉️</span>
              <div className="newsletter-text">
                 <h4>STAY IN THE LOOP</h4>
                 <p>Get exclusive offers, new drops and more.</p>
              </div>
              <div className="newsletter-input-group">
                <input type="email" placeholder="Enter your email address" />
                <button>SUBSCRIBE</button>
              </div>
            </div>
            <div className="footer-bottom-links">
               <img src="/logo.png" alt="SATRASHE60" className="footer-logo-small" />
               <div className="footer-nav">
                 <span onClick={() => navigateTo('home')}>Home</span>
                 <span onClick={() => navigateTo('shop')}>Shop</span>
                 <span onClick={() => navigateTo('about')}>About</span>
                 <span onClick={() => navigateTo('about')}>Contact</span>
               </div>
               <div className="footer-socials">
                 <span>📷</span> <span>▶️</span> <span>📌</span> <span>💬</span>
               </div>
               <div className="footer-copy">© 2026 SATRASHE60. All rights reserved.</div>
            </div>
          </footer>
        </div>
      )}

      <MobileAuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={(userData) => {
          setCurrentUser(userData);
          setShowAuthModal(false);
          setShowCheckout(true);
        }}
      />

      <div className="mobile-bottom-nav-bar">
        <button onClick={() => navigateTo('home')}>🏠</button>
        <button onClick={() => { setShowSearchInput(true); window.scrollTo(0,0); }}>🔍</button>
        <button onClick={() => navigateTo('shop', 'New Arrivals')} className="nav-new-text">NEW</button>
        <button onClick={() => navigateTo('cart')} style={{ position: 'relative' }}>
          🛍️{cartItems.length > 0 && <span className="bottom-nav-badge">{cartItems.length}</span>}
        </button>
        <button onClick={() => navigateTo('account')}>👤</button>
      </div>

      {showCheckout && (
        <CheckoutModal 
          cartItems={cartItems}
          onClose={() => setShowCheckout(false)}
          onOrderSuccess={handleOrderPlacedSuccess}
          onClearCart={() => setCartItems([])}
        />
      )}
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        navigateTo={navigateTo}
        currentUser={currentUser}
      />
    </div>
  );
}

export default App;