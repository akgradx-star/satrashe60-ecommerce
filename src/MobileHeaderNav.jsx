import React, { useState, useRef, useEffect } from 'react';
import './MobileHeaderNav.css';

export default function MobileHeaderNav({ 
  currentPage = 'home',
  navigateTo,
  goBack,
  historyLength
}) {
  const [pincode, setPincode] = useState(localStorage.getItem('savedPincode') || '');
  const [showPincodeModal, setShowPincodeModal] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const [showFullSearch, setShowFullSearch] = useState(false);

  useEffect(() => {
    setShowFullSearch(false);
    setSearchQuery('');
    setIsSearchFocused(false);
  }, [currentPage]);

  const imageInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const POPULAR_SEARCHES = [
    "One Pieces", "T-Shirts", "Tops", "Formal Wear", 
    "Kurtis", "Co-ord Sets", "Oversized Tees", "Jeans"
  ];

  const handleSavePincode = (e) => {
    e.preventDefault();
    const val = e.target.pincodeInput.value;
    setPincode(val);
    localStorage.setItem('savedPincode', val);
    setShowPincodeModal(false);
  };

  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      alert("Image processing...");
      navigateTo('shop');
    }
  };

  const executeSearch = (queryText) => {
    if (!queryText.trim()) return;
    setSearchQuery(queryText);
    setIsSearchFocused(false);
    setShowFullSearch(false);
    navigateTo('category-plp', queryText); 
  };

  return (
    <>
      {/* 🚀 MAIN FIX YAHAN HAI: position: 'sticky' lagaya hai jisse header image ko overalap nahi karega balki neeche push karega */}
      <header className="mobile-header-premium" style={{ backgroundColor: '#000000', paddingBottom: '10px', position: 'sticky', top: 0, zIndex: 9999, width: '100%', height: 'auto' }}>
        
        {/* ======================================= */}
        {/* 1. HOME PAGE HEADER */}
        {/* ======================================= */}
        {currentPage === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', padding: '10px 15px 0' }}>
            
            {/* SEARCH BAR */}
            <div className="premium-search-container" style={{ position: 'relative', margin: 0, padding: 0 }}>
              <div className="premium-search-box">
                <span className="premium-search-icon">🔍</span>
                <input 
                  type="text" 
                  placeholder='Search "OVERSIZED T-SHIRTS"' 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)} 
                  onKeyDown={(e) => e.key === 'Enter' && executeSearch(searchQuery)}
                  className="premium-search-input"
                  style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF', border: '1px solid #333333', marginBottom: '5px' }}
                />
                <button className="premium-mic-icon" style={{ filter: 'invert(1)', top: '45%' }}>🎙️</button>
                <button className="premium-cam-icon" style={{ filter: 'invert(1)', top: '45%' }} onClick={() => imageInputRef.current.click()}>📷</button>
              </div>

              {isSearchFocused && (
                <div className="search-dropdown-menu" style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}>
                  <div className="dropdown-title" style={{ color: '#AAAAAA' }}>Popular Searches</div>
                  {POPULAR_SEARCHES.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase())).map((item, index) => (
                      <div key={index} className="dropdown-item" onClick={() => executeSearch(item)}>
                        <span className="dropdown-search-icon">🔍</span> {item}
                      </div>
                  ))}
                </div>
              )}
            </div>

            {/* LOGO */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5px 0 0 0' }}>
              <img src="/logo.png" alt="SATRASHE60" style={{ width: '220px', height: 'auto', objectFit: 'contain', display: 'block' }} />
            </div>

            {/* PINCODE (Hidden) */}
            <div className="premium-pincode-row" onClick={() => setShowPincodeModal(true)} style={{ display: 'none', margin: 0 }}>
              <span className="pincode-label" style={{ color: '#FFFFFF' }}>{pincode ? `Pincode: ${pincode}` : 'Enter Pincode'} - </span>
              <span className="pincode-action" style={{ color: '#FF6B00' }}>to check delivery</span>
            </div>

          </div>
        )}

        {/* ======================================= */}
        {/* 2. NON-HOME PAGES (Compact & Black) */}
        {/* ======================================= */}
        {currentPage !== 'home' && (
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px 15px', gap: '10px' }}>
            
            {historyLength > 1 && (
              <button onClick={goBack} className="mobile-step-back-btn" style={{ borderRight: 'none', fontSize: '22px', padding: 0, color: '#FFFFFF' }}>
                ←
              </button>
            )}

            {showFullSearch ? (
              <div className="premium-search-container" style={{ flex: 1, padding: 0, margin: 0, position: 'relative' }}>
                <div className="premium-search-box" style={{ margin: 0, width: '100%', height: '36px' }}>
                  <span className="premium-search-icon">🔍</span>
                  <input 
                    type="text" 
                    placeholder='Search...' 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => { setIsSearchFocused(false); setShowFullSearch(false); }, 200)} 
                    onKeyDown={(e) => e.key === 'Enter' && executeSearch(searchQuery)}
                    className="premium-search-input"
                    style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF', border: 'none' }}
                    autoFocus
                  />
                </div>
              </div>
            ) : (
              <>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <img src="/logo.png" alt="SATRASHE60" style={{ width: '120px', height: 'auto', objectFit: 'contain' }} />
                </div>
                <button 
                  onClick={() => setShowFullSearch(true)} 
                  style={{ background: 'none', border: 'none', fontSize: '18px', color: '#FFFFFF', padding: '5px' }}
                >
                  🔍
                </button>
              </>
            )}
          </div>
        )}
      </header>

      {showPincodeModal && (
        <div className="mobile-modal-overlay" onClick={() => setShowPincodeModal(false)}>
          <div className="mobile-modal-content" onClick={e => e.stopPropagation()}>
            <h3>Enter Delivery Pincode</h3>
            <form onSubmit={handleSavePincode} className="pincode-form">
              <input type="number" name="pincodeInput" placeholder="e.g. 411045" defaultValue={pincode} required />
              <button type="submit" className="gold-btn">SAVE & PROCEED</button>
            </form>
          </div>
        </div>
      )}

      <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} style={{ display: 'none' }} onChange={handleImageSelect} />
      <input type="file" accept="image/*" ref={imageInputRef} style={{ display: 'none' }} onChange={handleImageSelect} />
    </>
  );
}