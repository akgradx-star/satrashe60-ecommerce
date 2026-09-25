import MobileCheckout from './MobileCheckout';
import { useState, useEffect } from 'react';
import './App.css';
import Shop, { MASTER_PRODUCTS } from './Shop';
import Collections from './Collections';
import CheckoutModal from './CheckoutModal';
import MobileProductDetail from './MobileProductDetail';
import MobileBag from './MobileBag';
import ProductDetail from './ProductDetail';
import About from './About';
import Community from './Community';
import Account from './Account';
import AdminDashboard from './AdminDashboard';
import MobileHeaderNav from './MobileHeaderNav'; // Path check kar lena agar component folder mein ho
import MobileHeroBanner from './MobileHeroBanner';
import MobileAnnouncementStrip from './MobileAnnouncementStrip';
import ShopByCategory from './ShopByCategory';
import CategoryPLP from './CategoryPLP';
import CampaignCarousel from './CampaignCarousel';
import ShopYourSize from './ShopYourSize';
import MobileAuthModal from './MobileAuthModal';

const DROPS_DATA = [
  { id: 1, slug: "linen-shirt-top", name: "Floral Shirt Top", price: "₹149", image: "/dress1.png" },
  { id: 2, slug: "black-ribbed-top", name: "Black Ribbed Top", price: "₹129", image: "/dress2.png" },
  { id: 3, slug: "tie-knot-shirt", name: "Tie Knot Shirt", price: "₹159", image: "/dress3.png" },
  { id: 4, slug: "printed-co-ord-set", name: "Printed Co-ord Set", price: "₹299", image: "/dress4.png" },
  { id: 5, slug: "oversized-tee", name: "Oversized Tee", price: "₹149", image: "/dress1.png" },
  { id: 6, slug: "boho-printed-top", name: "Boho Printed Top", price: "₹169", image: "/dress2.png" },
  { id: 7, slug: "striped-shirt", name: "Striped Shirt", price: "₹139", image: "/dress3.png" }
];

function App() {
  const [currentPage, setCurrentPage] = useState('home'); 
  const [historyStack, setHistoryStack] = useState(['home']); // Pages yaad rakhne ke liye
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sourceBackPage, setSourceBackPage] = useState('shop');
  const [selectedCollectionSlug, setSelectedCollectionSlug] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  // 🚀 NAYA: Backend se kapde (products) laane ka state aur API call
  const [dbProducts, setDbProducts] = useState([]);

  useEffect(() => {
    fetch('https://satrashe60-ecommerce.onrender.com/api/products')
      .then((response) => response.json())
      .then((data) => {
        setDbProducts(data);
        console.log("🔥 Backend se yeh kapde aaye hain:", data);
      })
      .catch((error) => console.log("Backend se connect nahi hua:", error));
  }, []);
  // 🚀 YAHAN SE NAYA CODE START HOTA HAI (Orders ke liye)
  const [dbOrders, setDbOrders] = useState([]);

  useEffect(() => {
    // Yahan se if() hata diya gaya hai. 
    // Ab ye har baar data fetch karega taaki Admin button ki ginti hamesha sahi rahe.
    fetch('https://satrashe60-ecommerce.onrender.com/api/orders')
      .then((response) => response.json())
      .then((data) => {
        setDbOrders(data);
        console.log("📦 Backend se yeh ORDERS aaye hain:", data);
      })
      .catch((error) => console.log("Orders laane mein error:", error));
  }, [currentPage]);
  // 🚀 YAHAN NAYA CODE KHATAM HOTA HAI
  
  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);
  const [user, setUser] = useState(() => {
  const saved = localStorage.getItem('user');
  return saved ? JSON.parse(saved) : null;
});
const [showAuthModal, setShowAuthModal] = useState(false);
const handleProceedToAddress = () => {
  if (user && user.isLoggedIn) {
    setShowCheckout(true);
  } else {
    setShowAuthModal(true);
  }
};

  // ==========================================================================
  // PERSISTENT STATE USING LOCALSTORAGE (Prevents Data Loss on Refresh)
  // ==========================================================================
  
  // 1. Logged-in Customer Session
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('satrashe60_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('satrashe60_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('satrashe60_user');
    }
  }, [currentUser]);

  // 2. Global Orders Store
  const [placedOrders, setPlacedOrders] = useState(() => {
    const savedOrders = localStorage.getItem('satrashe60_orders');
    return savedOrders ? JSON.parse(savedOrders) : [
      {
        id: 'SATRA-89211',
        date: '10 Aug 2026',
        customerName: 'Akash Muttewar',
        customerPhone: '+91 98765 43210',
        shippingAddress: 'Flat 402, High Street Towers, Baner, Pune - 411045, Maharashtra',
        items: [{ name: 'Black Ribbed Top', selectedSize: 'M', price: 129, image: '/dress2.png', sku: 'SKU-BLK-RIB-02' }],
        totalAmount: 129,
        paymentMethod: 'Cash On Delivery (COD)',
        status: 'Pending'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('satrashe60_orders', JSON.stringify(placedOrders));
  }, [placedOrders]);

  // 3. Cart Items State
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('satrashe60_cart');
    return savedCart ? JSON.parse(savedCart) : [
      { id: 1, name: "Linen Shirt Top", price: 149, selectedSize: "M", quantity: 1, image: "/dress1.png" }
    ];
  });

  useEffect(() => {
    localStorage.setItem('satrashe60_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 4. Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    const savedWish = localStorage.getItem('satrashe60_wishlist');
    return savedWish ? JSON.parse(savedWish) : [1, 4];
  });

  useEffect(() => {
    localStorage.setItem('satrashe60_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleGoBack = () => {
    if (historyStack.length > 1) {
      const newHistory = [...historyStack];
      newHistory.pop(); // Current page ko delete karo
      const previousPage = newHistory[newHistory.length - 1]; // Pichle page ka naam nikalo
      setHistoryStack(newHistory);
      setCurrentPage(previousPage);
      window.scrollTo(0, 0);
    }
  };
  // Trigger floating Toast Notification helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleOpenProduct = (productOrSlug, source = 'shop') => {
    let foundProduct = typeof productOrSlug === 'string' 
      ? (MASTER_PRODUCTS || []).find(p => p.slug === productOrSlug || p.name.toLowerCase().replace(/\s+/g, '-') === productOrSlug)
      : productOrSlug;


    if (!foundProduct && typeof productOrSlug === 'string') {
      foundProduct = (MASTER_PRODUCTS || []).find(p => p.name.toLowerCase().includes(productOrSlug.toLowerCase()));
    }

    setSelectedProduct(foundProduct || (MASTER_PRODUCTS && MASTER_PRODUCTS[0]));
    setSourceBackPage(source);
    setCurrentPage('product-detail');
    setHistoryStack(prev => [...prev, 'product-detail']);
    window.scrollTo(0, 0);
  };

  const handleOpenCollection = (slug) => {
    setSelectedCollectionSlug(slug);
    setCurrentPage('collections');
  };

  const navigateTo = (pageName, category = "ALL") => {
    if (pageName === currentPage) return; // NAYA: Agar same page par hai toh kuch mat karo
    
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

  const handleToggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
      triggerToast("Removed from Wishlist 🤍");
    } else {
      setWishlist([...wishlist, id]);
      triggerToast("Added to Wishlist ❤️");
    }
  };

  const handleAddToCart = (item) => {
    setCartItems(prev => [...prev, item]);
    triggerToast(`✓ Added to Bag (${item.name})`);
  };

  const handleBuyNow = (item) => {
    setCartItems(prev => [...prev, item]);
    setShowCheckout(true);
  };

  const  handleRemoveFromCart = (indexToRemove) => {
    setCartItems(cartItems.filter((_, idx) => idx !== indexToRemove));
    triggerToast("Item removed from Bag");
  };

  // NAYA FUNCTION YAHAN ADD KIYA HAI 👇
  const handleUpdateCartQuantity = (itemId, selectedSize, newQuantity) => {
    setCartItems(prev => prev.map(item => 
      (item.id === itemId && item.selectedSize === selectedSize) 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };

  // Called when customer successfully checks out (Also deducts inventory stock)
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

    // Automatic Inventory Stock Deduction
    cartItems.forEach(cartItem => {
      const matchedProduct = MASTER_PRODUCTS.find(p => p.name.toLowerCase() === cartItem.name.toLowerCase() || p.id === cartItem.id);
      if (matchedProduct && matchedProduct.stock > 0) {
        matchedProduct.stock -= (cartItem.quantity || 1);
        if (matchedProduct.stock < 0) matchedProduct.stock = 0;
      }
    });

    setPlacedOrders(prev => [createdOrder, ...prev]);
    setCartItems([]);
    setShowCheckout(false);
    triggerToast(`🎉 Order Placed Successfully! Ref: ${createdOrder.id}`);
  };
// Dedicated View for Admin Dashboard with Real-time Status Updates
  if (currentPage === 'admin') {
    return (
      <AdminDashboard 
        orders={dbOrders}
        onUpdateOrderStatus={(orderId, nextStatus) => {
          triggerToast(`Order status update abhi DB ke liye connect karna baaki hai.`);
        }}
        onLogout={() => navigateTo('home')} 
        onNavigateToWebsite={() => navigateTo('home')} 
      />
    );
  }

  return (
    <div className="app">

      {/* FLOATING TOAST NOTIFICATION POPUP */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#0A0A0A',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '800',
          zIndex: 99999,
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          borderLeft: '4px solid #FF6B00',
          letterSpacing: '0.5px'
        }}>
          {toastMessage}
        </div>
      )}

      {/* TOP ANNOUNCEMENT BAR */}
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="announcement desktop-only-header">
        <span>🔥 <strong className="accent">126</strong> NEW STYLES DROPPED TODAY</span>
        <span>|</span>
        <span>🚚 FREE SHIPPING ABOVE ₹500</span>
        <span>|</span>
        <span>💳 COD AVAILABLE</span>
        <span>|</span>
        <span>🔄 EASY RETURNS</span>
      </div>

      {/* HEADER */}
      <header className="header desktop-only-header">
        <div className="logo-brand" onClick={() => navigateTo('home')}>
          <img src="/logo.png" alt="1760 SATRASHE60" className="logo-image" />
        </div>

        <nav>
          <a href="#shop" className={currentPage === 'shop' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigateTo('shop'); }}>SHOP</a>
          <a href="#new" className={currentPage === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>NEW DROP</a>
          <a href="#collections" className={currentPage === 'collections' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleOpenCollection(null); }}>COLLECTIONS</a>
          <a href="#sale" onClick={(e) => { e.preventDefault(); navigateTo('shop', 'Under ₹199'); }}>SALE</a>
          <a 
            href="#community" 
            className={currentPage === 'community' ? 'active' : ''} 
            onClick={(e) => { e.preventDefault(); navigateTo('community'); }}
          >
            COMMUNITY
          </a>
          <a 
            href="#about" 
            className={currentPage === 'about' ? 'active' : ''} 
            onClick={(e) => { e.preventDefault(); navigateTo('about'); }}
          >
            ABOUT
          </a>
        </nav>

        <div className="header-right">
          {/* ADMIN SHORTCUT BUTTON WITH LIVE ORDERS COUNT */}
          <button 
            onClick={() => navigateTo('admin')}
            style={{ backgroundColor: '#FF6B00', color: '#FFFFFF', border: 'none', padding: '6px 12px', fontSize: '11px', fontWeight: '800', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            title="Open Admin Supplier Panel"
          >
            🛡️ 🛡️ ADMIN ({dbOrders.filter(order => !order.status || order.status.toLowerCase() === 'pending').length})
          </button>

          {/* SEARCH INPUT TOGGLE */}
          {showSearchInput ? (
            <input 
              type="text"
              placeholder="Search clothes..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage('shop'); }}
              onBlur={() => { if (!searchQuery) setShowSearchInput(false); }}
              autoFocus
              className="search-input"
              style={{ padding: '6px 14px', borderRadius: '20px', border: '1px solid #CCCCCC', fontSize: '12px', outline: 'none' }}
            />
          ) : (
            <button className="icon-btn" title="Search" onClick={() => setShowSearchInput(true)}>🔍</button>
          )}

          {/* WISHLIST BUTTON */}
          <button className="icon-btn" title="Wishlist" onClick={() => navigateTo('wishlist')}>
            ♡
            {wishlist.length > 0 && <span className="cart-badge-count">{wishlist.length}</span>}
          </button>

          {/* ACCOUNT BUTTON */}
          <button 
            className="icon-btn" 
            title="Account" 
            onClick={() => navigateTo('account')}
            style={{ color: currentUser ? '#FF6B00' : 'inherit' }}
          >
            👤
          </button>

          {/* CART BUTTON */}
          <button className="icon-btn" title="Cart" onClick={() => navigateTo('cart')}>
            🛒
            <span className="cart-badge-count">{cartItems.length}</span>
          </button>
        </div>
      </header>
     {/* MOBILE HEADER & NAVIGATION (Naya wala) */}
     <MobileHeaderNav 
        cartCount={cartItems.length} 
        wishlistCount={wishlist.length} 
        isLoggedIn={!!currentUser} 
        currentPage={currentPage} 
        navigateTo={navigateTo} 
        goBack={handleGoBack}              
        historyLength={historyStack.length} 
      />
      {/* ROUTING: PAGES SWITCHER */}
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
          /* NAYA MOBILE PRODUCT PAGE (Sirf phone par dikhega) */
          <MobileProductDetail 
            product={selectedProduct}
            onBack={handleGoBack}
            onAddToCart={handleAddToCart}
            onNavigateToBag={() => navigateTo('cart')}
          />
        ) : (
          /* PURANA DESKTOP PRODUCT PAGE (Sirf Laptop par dikhega) */
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
        /* 🚀 YAHAN SE SIZE FILTER WALA MAGIC HOGA */
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
        <Collections 
          selectedCollectionSlug={selectedCollectionSlug}
          onSelectCollection={(slug) => setSelectedCollectionSlug(slug)}
          onBackToHome={() => navigateTo('home')}
          onAddToCart={handleAddToCart}
          onOpenProduct={(prod) => handleOpenProduct(prod, 'collections')}
        />
      ) : currentPage === 'wishlist' ? (
        /* WISHLIST PAGE */
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
            onProceedToAddress={handleProceedToAddress} /* 👈 YAHAN CHANGE HUA HAI */
          />
        ) : (
          /* PURANA DESKTOP BAG (Sirf Laptop par dikhega) */
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
                )
                )
                }

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontWeight: '800', fontSize: '16px' }}>
                  <span>Subtotal:</span>
                  <span>₹{cartItems.reduce((acc, i) => acc + (Number(i.price) * (i.quantity || 1)), 0)}</span>
                </div>

                {/* CHECKOUT BUTTON */}
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
        /* HOMEPAGE COMPLETE CODE */
        <>
          {/* HERO SECTION */}
          <section className="hero-exact desktop-only-hero">
            <div className="hero-left-content">
              <p className="hero-subhead">STREET FASHION DELIVERED ACROSS INDIA</p>
              <h1 className="hero-main-title">SATRASHE<span>60</span></h1>
              <p className="hero-tagline">ONE PIECE.<br />ONE CHANCE.</p>

              <button className="hero-orange-btn" onClick={() => navigateTo('shop')}>
                SHOP NEW DROP →
              </button>

              <div className="social-proof-customers">
                <div className="avatar-group">
                  <img src="/dress1.png" alt="Customer" />
                  <img src="/dress2.png" alt="Customer" />
                  <img src="/dress3.png" alt="Customer" />
                  <img src="/dress4.png" alt="Customer" />
                </div>
                <span className="social-proof-text">50K+ HAPPY CUSTOMERS</span>
              </div>
            </div>

            <div className="hero-right-media">
              <img src="/hero.png" alt="Street Fashion Model" className="hero-bg-img" />

              <div className="hero-floating-card">
                <div className="floating-icon-box">🛍️</div>
                <div className="floating-title">EVERY PIECE IS UNIQUE</div>
                <div className="floating-desc">NO RESTOCK ONCE IT'S GONE, IT MAY NEVER RETURN.</div>
              </div>
            </div>
          </section>
          
{/* ========================================== */}
          {/* MOBILE NAYA LAYOUT (Bina Hero Image ke) */}
          {/* ========================================== */}

          {/* 1. SABSE UPAR: SHOP YOUR SIZE (Logo ke theek niche) */}
          <div style={{ paddingTop: '10px' }}>
            <ShopYourSize navigateTo={navigateTo} />
          </div>

          {/* 2. CHALTI HUI LINE (Announcement Strip) */}
          <MobileAnnouncementStrip />

          {/* 3. SHOP BY CATEGORY */}
          <ShopByCategory navigateTo={navigateTo} />

          {/* TRUST BADGES BAR (Sirf Desktop ke liye) */}
          <div className="trust-badges-bar desktop-only-header">
            <div className="trust-item"><span className="trust-icon">🚚</span><div><div className="trust-text-title">PAN INDIA DELIVERY</div></div></div>
            <div className="trust-item"><span className="trust-icon">⚙️</span><div><div className="trust-text-title">UNIQUE PRODUCTS</div><div className="trust-text-sub">NO RESTOCK</div></div></div>
            <div className="trust-item"><span className="trust-icon">🏷️</span><div><div className="trust-text-title">BEST PRICES</div><div className="trust-text-sub">EVERY DAY</div></div></div>
            <div className="trust-item"><span className="trust-icon">🛡️</span><div><div className="trust-text-title">PREMIUM QUALITY</div><div className="trust-text-sub">ASSURED</div></div></div>
          </div>

          {/* NEW: CAMPAIGN CAROUSEL */}
          <CampaignCarousel navigateTo={navigateTo} />
         {/* COMBINED TRENDING PRODUCTS SECTION */}
          <section className="section" style={{ padding: '40px 4%' }}>
            <div className="section-header-row">
              <h2 className="section-title-exact">TODAY'S DROP & ONLY ONE LEFT ⚡</h2>
              <a href="#shop" className="view-all-link" onClick={(e) => { e.preventDefault(); navigateTo('shop'); }}>VIEW ALL ›</a>
            </div>

            {/* Yeh scrollable grid mobile ke liye perfect hai */}
            <div className="products-exact-grid-mobile">
              {DROPS_DATA.map(item => (
                <div key={item.id} className="product-card-exact" onClick={() => handleOpenProduct(item.slug || item.name, 'home')}>
                  <div className="card-image-box">
                    <span className="badge-new-black">{item.id % 2 === 0 ? "NEW" : "ONLY 1 LEFT"}</span>
                    <button className="wishlist-heart-btn" onClick={(e) => { e.stopPropagation(); handleToggleWishlist(item.id); }}>♡</button>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="card-meta">
                    <div className="card-product-title">{item.name}</div>
                    <div className="card-product-price">{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <div className="mobile-only-minimal-footer" onClick={() => navigateTo('home')}>
            <img src="/logo.png" alt="SATRASHE60" className="minimal-footer-logo" />
            <p className="minimal-footer-copy">© 2026 SATRASHE60. All Rights Reserved.</p>
          </div>


          {/* SHOP BY CATEGORY (Purana Desktop wala) */}
          <section className="section desktop-only-hero" style={{ padding: '20px 4% 40px 4%' }}>
            <div className="section-header-row">
              <h2 className="section-title-exact">SHOP BY CATEGORY</h2>
              <a href="#shop" className="view-all-link" onClick={(e) => { e.preventDefault(); navigateTo('shop'); }}>VIEW ALL ›</a>
            </div>

            <div className="category-tiles-grid">
              <div className="category-tile-card" onClick={() => navigateTo('shop', 'Tops')}>
                <img src="/dress1.png" alt="TOPS" />
                <div className="category-tile-overlay">
                  <div className="category-tile-title">TOPS</div>
                  <div className="category-tile-sub">SHOP NOW →</div>
                </div>
              </div>

              <div className="category-tile-card" onClick={() => navigateTo('shop', 'Kurtis')}>
                <img src="/dress2.png" alt="KURTIS" />
                <div className="category-tile-overlay">
                  <div className="category-tile-title">KURTIS</div>
                  <div className="category-tile-sub">SHOP NOW →</div>
                </div>
              </div>

              <div className="category-tile-card" onClick={() => navigateTo('shop', 'One Pieces')}>
                <img src="/dress3.png" alt="ONE PIECES" />
                <div className="category-tile-overlay">
                  <div className="category-tile-title">ONE PIECES</div>
                  <div className="category-tile-sub">SHOP NOW →</div>
                </div>
              </div>

              <div className="category-tile-card" onClick={() => navigateTo('shop', 'Co-ord Sets')}>
                <img src="/dress4.png" alt="CO-ORD SETS" />
                <div className="category-tile-overlay">
                  <div className="category-tile-title">CO-ORD SETS</div>
                  <div className="category-tile-sub">SHOP NOW →</div>
                </div>
              </div>

              <div className="category-tile-card" onClick={() => navigateTo('shop', 'Under ₹199')}>
                <img src="/dress1.png" alt="UNDER 199" />
                <div className="category-tile-overlay">
                  <div className="category-tile-title">UNDER ₹199</div>
                  <div className="category-tile-sub">SHOP NOW →</div>
                </div>
              </div>
            </div>
          </section>

          {/* OUR STORY SECTION */}
          <section className="our-story-section">
            <div className="story-img-box">
              <img src="/hero.png" alt="Our Story" />
            </div>

            <div className="story-content-box">
              <p className="story-eyebrow">OUR STORY</p>
              <h2 className="story-title">FROM STREET MARKETS <br /><span>TO YOUR DOORSTEP</span></h2>
              <p className="story-desc">
                We travel across India's famous street markets to handpick trendy, affordable and unique fashion for you. No middlemen. No bulk production. Just real fashion, carefully selected with love.
              </p>

              <div className="story-features-list">
                <div className="story-feature-item">
                  <div className="story-feature-icon">♡</div>
                  <div>
                    <div className="story-feature-title">HANDPICKED</div>
                    <div className="story-feature-sub">WITH LOVE</div>
                  </div>
                </div>

                <div className="story-feature-item">
                  <div className="story-feature-icon">👕</div>
                  <div>
                    <div className="story-feature-title">FRESH STYLES</div>
                    <div className="story-feature-sub">EVERY WEEK</div>
                  </div>
                </div>

                <div className="story-feature-item">
                  <div className="story-feature-icon">👤</div>
                  <div>
                    <div className="story-feature-title">MADE FOR</div>
                    <div className="story-feature-sub">EVERY YOU</div>
                  </div>
                </div>
              </div>

              <button className="black-story-btn" onClick={() => navigateTo('about')}>KNOW OUR STORY</button>
            </div>
          </section>

          {/* FROM OUR INSTAGRAM */}
          <section className="section" style={{ padding: '40px 4%' }}>
            <div className="section-header-row">
              <div>
                <h2 className="section-title-exact">FROM OUR INSTAGRAM</h2>
                <p style={{ fontSize: '12px', color: '#666666', marginTop: '4px' }}>@satrashe60_official</p>
              </div>
              <button className="black-follow-btn">FOLLOW US</button>
            </div>

            <div className="insta-grid">
              <div className="insta-card"><img src="/dress1.png" alt="Insta" /></div>
              <div className="insta-card"><img src="/dress2.png" alt="Insta" /></div>
              <div className="insta-card"><img src="/dress3.png" alt="Insta" /></div>
              <div className="insta-card"><img src="/dress4.png" alt="Insta" /></div>
              <div className="insta-card"><img src="/dress1.png" alt="Insta" /></div>
              <div className="insta-card"><img src="/dress2.png" alt="Insta" /></div>
            </div>
          </section>

          {/* WHAT OUR CUSTOMERS SAY */}
          <section className="section" style={{ padding: '40px 4%', backgroundColor: '#F9F9F9' }}>
            <div className="section-header-row">
              <h2 className="section-title-exact">WHAT OUR CUSTOMERS SAY <span style={{ fontSize: '13px', color: '#666666', marginLeft: '8px' }}>⭐ 4.8/5 (3,200+ Reviews)</span></h2>
              <a href="#reviews" className="view-all-link">VIEW ALL REVIEWS ›</a>
            </div>

            <div className="reviews-grid">
              <div className="review-card">
                <div>
                  <div className="stars-row">★★★★★</div>
                  <p className="review-text">"Amazing quality & same as shown in pics. Packaging was too good. Will order again!"</p>
                </div>
                <div className="reviewer-profile">
                  <img src="/dress1.png" alt="User" className="reviewer-avatar" />
                  <span className="reviewer-name">Pooja S.</span>
                </div>
              </div>

              <div className="review-card">
                <div>
                  <div className="stars-row">★★★★★</div>
                  <p className="review-text">"Finally a brand that gives unique styles at such affordable prices. Love SATRASHE60!"</p>
                </div>
                <div className="reviewer-profile">
                  <img src="/dress2.png" alt="User" className="reviewer-avatar" />
                  <span className="reviewer-name">Neha T.</span>
                </div>
              </div>

              <div className="review-card">
                <div>
                  <div className="stars-row">★★★★★</div>
                  <p className="review-text">"Super fast delivery and the fit is perfect. My new favourite store for sure!"</p>
                </div>
                <div className="reviewer-profile">
                  <img src="/dress3.png" alt="User" className="reviewer-avatar" />
                  <span className="reviewer-name">Ayesha M.</span>
                </div>
              </div>

              <div className="review-card">
                <div>
                  <div className="stars-row">★★★★★</div>
                  <p className="review-text">"Every drop is just wow! Can't wait for the next one."</p>
                </div>
                <div className="reviewer-profile">
                  <img src="/dress4.png" alt="User" className="reviewer-avatar" />
                  <span className="reviewer-name">Simran K.</span>
                </div>
              </div>
            </div>
          </section>

          {/* JOIN THE CLUB */}
          <div className="join-club-bar">
            <div className="join-club-left">
              <span className="join-icon">✉️</span>
              <div>
                <div className="join-title">JOIN THE CLUB</div>
                <div className="join-sub">Get early access to new drops, exclusive offers & more.</div>
              </div>
            </div>

            <form className="join-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" className="join-input" required />
              <button type="submit" className="join-orange-btn">JOIN NOW</button>
            </form>
          </div>

          {/* FOOTER */}
          <footer className="exact-footer">
            <div className="footer-cols-grid">
              <div>
                <div className="footer-brand-logo">1760 SATRASHE<span>60</span></div>
                <p className="footer-tagline">Street Fashion. One Chance.</p>
                <div className="footer-social-icons">📷 🎥 👤 📌</div>
              </div>

              <div>
                <div className="footer-col-title">SHOP</div>
                <div className="footer-links-list">
                  <a href="#shop" onClick={(e) => { e.preventDefault(); navigateTo('shop'); }}>All Products</a>
                  <a href="#shop" onClick={(e) => { e.preventDefault(); navigateTo('shop', 'Tops'); }}>Tops</a>
                  <a href="#shop" onClick={(e) => { e.preventDefault(); navigateTo('shop', 'Kurtis'); }}>Kurtis</a>
                  <a href="#shop" onClick={(e) => { e.preventDefault(); navigateTo('shop', 'One Pieces'); }}>One Pieces</a>
                  <a href="#shop" onClick={(e) => { e.preventDefault(); navigateTo('shop', 'Co-ord Sets'); }}>Co-ord Sets</a>
                  <a href="#shop" onClick={(e) => { e.preventDefault(); navigateTo('shop', 'Under ₹199'); }}>Under ₹199</a>
                </div>
              </div>

              <div>
                <div className="footer-col-title">HELP</div>
                <div className="footer-links-list">
                  <a href="#track">Track Order</a>
                  <a href="#shipping">Shipping & Delivery</a>
                  <a href="#returns">Returns & Refunds</a>
                  <a href="#faq">FAQ</a>
                  <a href="#contact">Contact Us</a>
                </div>
              </div>

              <div>
                <div className="footer-col-title">COMPANY</div>
                <div className="footer-links-list">
                  <a href="#about" onClick={(e) => { e.preventDefault(); navigateTo('about'); }}>About Us</a>
                  <a href="#story" onClick={(e) => { e.preventDefault(); navigateTo('about'); }}>Our Story</a>
                  <a href="#careers">Careers</a>
                  <a href="#privacy">Privacy Policy</a>
                  <a href="#terms">Terms & Conditions</a>
                  <a href="#admin" onClick={(e) => { e.preventDefault(); navigateTo('admin'); }} style={{ color: '#FF6B00', fontWeight: 'bold' }}>Admin Portal</a>
                </div>
              </div>

              <div>
                <div className="footer-col-title">PAYMENT METHODS</div>
                <div className="payment-badge-group">
                  <span className="pay-badge">VISA</span>
                  <span className="pay-badge">MasterCard</span>
                  <span className="pay-badge">RuPay</span>
                  <span className="pay-badge">UPI</span>
                  <span className="pay-badge">Paytm</span>
                </div>
                <div className="footer-col-title" style={{ marginTop: '20px' }}>WE DELIVER</div>
                <div className="payment-badge-group">
                  <span className="pay-badge">DELHIVERY</span>
                  <span className="pay-badge">BLUE DART</span>
                  <span className="pay-badge">EXPRESSBEES</span>
                </div>
              </div>
            </div>

            <div className="copyright-text">
              © 2026 SATRASHE60. All Rights Reserved.
            </div>
          </footer>
        </>
      )}
      {/* MOBILE AUTH (OTP) MODAL */}
      <MobileAuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={(userData) => {
          setUser(userData);
          setShowAuthModal(false);
          setShowCheckout(true); // Login hote hi seedha address page
        }}
      />
{/* MOBILE BOTTOM NAVIGATION BAR */}
      <div className="mobile-bottom-nav-bar">
        <button onClick={() => navigateTo('home')}>
          🏠
        </button>
        <button onClick={() => { setShowSearchInput(true); window.scrollTo(0,0); }}>
          🔍
        </button>
        <button onClick={() => navigateTo('home')} className="nav-new-text">
          NEW
        </button>
        <button onClick={() => navigateTo('cart')} style={{ position: 'relative' }}>
          🛍️
          {cartItems.length > 0 && <span className="bottom-nav-badge">{cartItems.length}</span>}
        </button>
        <button onClick={() => navigateTo('account')}>
          👤
        </button>
      </div>
      {/* CHECKOUT MODAL OVERLAY */}
      {showCheckout && (
        <CheckoutModal 
          cartItems={cartItems}
          onClose={() => setShowCheckout(false)}
          onOrderSuccess={handleOrderPlacedSuccess}
          onClearCart={() => setCartItems([])}
        />
      )}

    </div>
  );
}

export default App;