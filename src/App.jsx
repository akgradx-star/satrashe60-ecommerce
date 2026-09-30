import SideMenu from './SideMenu';
import MobileCheckout from './MobileCheckout';
import { useState, useEffect } from 'react';
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

  const [dbOrders, setDbOrders] = useState([]);

  useEffect(() => {
    fetch('https://satrashe60-ecommerce.onrender.com/api/orders')
      .then((response) => response.json())
      .then((data) => {
        setDbOrders(data);
        console.log("📦 Backend se yeh ORDERS aaye hain:", data);
      })
      .catch((error) => console.log("Orders laane mein error:", error));
  }, [currentPage]);
  
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

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('satrashe60_cart');
    return savedCart ? JSON.parse(savedCart) : [
      { id: 1, name: "Linen Shirt Top", price: 149, selectedSize: "M", quantity: 1, image: "/dress1.png" }
    ];
  });

  useEffect(() => {
    localStorage.setItem('satrashe60_cart', JSON.stringify(cartItems));
  }, [cartItems]);

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
      newHistory.pop(); 
      const previousPage = newHistory[newHistory.length - 1]; 
      setHistoryStack(newHistory);
      setCurrentPage(previousPage);
      window.scrollTo(0, 0);
    }
  };

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

  const handleUpdateCartQuantity = (itemId, selectedSize, newQuantity) => {
    setCartItems(prev => prev.map(item => 
      (item.id === itemId && item.selectedSize === selectedSize) 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
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

  if (currentPage === 'admin') {
    const mappedOrders = dbOrders.map(order => ({
      ...order,
      id: order._id || order.id,
      status: order.orderStatus || 'Pending' 
    }));

    return (
      <AdminDashboard 
        orders={mappedOrders}
        onUpdateOrderStatus={(orderId, nextStatus) => {
          fetch(`https://satrashe60-ecommerce.onrender.com/api/orders/${orderId}/status`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: nextStatus }) 
          })
          .then((response) => response.json())
          .then((data) => {
            if(data.order) {
              setDbOrders(prev => prev.map(o => (o._id === orderId || o.id === orderId) ? { ...o, orderStatus: nextStatus } : o));
              triggerToast(`Order moved to ${nextStatus} 🚀`);
            }
          })
          .catch((error) => {
            console.error("Update failed:", error);
            triggerToast("Network error, status update nahi hua!");
          });
        }}
        onLogout={() => navigateTo('home')} 
        onNavigateToWebsite={() => navigateTo('home')} 
      />
    );
  }

  return (
    <div className="app">

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
        /* YAHAN PAR CHANGE KIYA HAI - Ab sidha naya Shop khulega */
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
            
            {/* LEFT SIDE: Back Button aur Menu */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              
              {/* BACK BUTTON: Sirf tab dikhega jab hum Home page par nahi honge */}
              {currentPage !== 'home' && (
                <button 
                  onClick={() => {
                    // Agar product ya cart par hai, toh wapas Shop par bhejega, warna Home par
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

            {/* LOGO: Ab logo par click karne se bhi seedha Home khulega */}
            <img 
              src="/logo.png" 
              alt="SATRASHE60" 
              className="header-logo" 
              onClick={() => navigateTo('home')}
              style={{ cursor: 'pointer' }}
            />

            {/* RIGHT SIDE: Search aur Cart */}
            <div className="header-icons">
              <button onClick={() => { setShowSearchInput(true); window.scrollTo(0,0); }}>🔍</button>
              <button onClick={() => navigateTo('cart')}>
                🛍️<span className="cart-badge">{cartItems.length}</span>
              </button>
            </div>
          </header>
          {/* SEARCH BAR OVERLAY */}
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
            <div className="premium-section-header">
              <h2>SHOP BY SIZE</h2>
            </div>
            <div className="premium-size-grid">
              {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                <div key={size} className="premium-category-card" onClick={() => navigateTo('size-filter', [size])}>
                  <div className="premium-cat-img-box size-box-center">
                    <span className="size-text-gold">{size}</span>
                  </div>
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
                { name: 'Tops', img: '/dress1.png' },
                { name: 'T-Shirts', img: '/dress2.png' },
                { name: 'Kurtis', img: '/dress3.png' },
                { name: 'One Pieces', img: '/dress4.png' },
                { name: 'Jeans', img: '/dress1.png' },
                { name: 'Track Pants', img: '/dress2.png' },
                { name: 'Dresses', img: '/dress3.png' },
                { name: 'Co-ords', img: '/dress4.png' }
              ].map((cat, idx) => (
                <div key={idx} className="premium-category-card" onClick={() => navigateTo('shop', cat.name)}>
                  <div className="premium-cat-img-box">
                    <img src={cat.img} alt={cat.name} />
                  </div>
                  <p>{cat.name}</p>
                </div>
              ))}
              
              <div className="premium-category-card" onClick={() => navigateTo('shop', 'New Arrivals')}>
                <div className="premium-cat-img-box new-drop-box">
                  <span className="crown-icon">👑</span>
                  <span className="new-text">NEW</span>
                </div>
                <p>New Drop</p>
              </div>
              
              <div className="premium-category-card" onClick={() => navigateTo('shop')}>
                <div className="premium-cat-img-box more-box">
                  <span className="hanger-icon">🧥</span>
                </div>
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
              {DROPS_DATA.slice(0, 3).map(prod => (
                <div key={prod.id} className="premium-product-card" onClick={() => handleOpenProduct(prod.slug, 'home')}>
                  <div className="product-image-wrapper">
                    <img src={prod.image} alt={prod.name} />
                    <button className="premium-wishlist-btn" onClick={(e) => { e.stopPropagation(); handleToggleWishlist(prod.id); }}>♡</button>
                  </div>
                  <div className="product-info-dark">
                    <h3>{prod.name}</h3>
                    <div className="price-row-dark">
                      <span className="current-price">{prod.price}</span>
                      <span className="old-price">₹699</span>
                    </div>
                    <div className="rating-stars">★★★★★ <span className="review-count">(124)</span></div>
                  </div>
                </div>
              ))}
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
          setUser(userData);
          setShowAuthModal(false);
          setShowCheckout(true);
        }}
      />

      <div className="mobile-bottom-nav-bar">
        <button onClick={() => navigateTo('home')}>
          🏠
        </button>
        <button onClick={() => { setShowSearchInput(true); window.scrollTo(0,0); }}>
          🔍
        </button>
        <button onClick={() => navigateTo('shop', 'New Arrivals')} className="nav-new-text">
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