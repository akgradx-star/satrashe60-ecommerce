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
import Home from './HeroHome';
import { ShopContext } from './ShopContext'; 

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