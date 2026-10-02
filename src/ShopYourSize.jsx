import React, { useState, useEffect } from 'react';

export default function ShopYourSize({ navigateTo, products = [], initialSizes = [], wishlist = [], onToggleWishlist, onAddToCart }) {
  // Default 'M' size selected agar koi initial size na ho
  const [selectedSizes, setSelectedSizes] = useState(initialSizes.length > 0 ? initialSizes : ['M']);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  
  const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"];

  // Jab page load ho ya initial size change ho
  useEffect(() => {
    if (initialSizes && initialSizes.length > 0) {
      setSelectedSizes(initialSizes);
    }
  }, [initialSizes]);

  // Multiple Size Selection
  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  // Filter Products
  const filteredProducts = products.filter(p => {
    const sizeMatch = selectedSizes.length === 0 || selectedSizes.some(sz => p.sizes && p.sizes.includes(sz));
    const searchMatch = !searchQuery || (p.name && p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return sizeMatch && searchMatch;
  });

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', color: '#FFF', paddingBottom: '80px', fontFamily: "'Inter', sans-serif" }}>
      
      {/* HEADER WITH SEARCH ICON */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px', padding: '0 16px', position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(5,5,5,0.95)' }}>
        <button onClick={() => navigateTo('home')} style={{ background: 'transparent', color: '#FFF', border: '1px solid #D4AF37', borderRadius: '4px', padding: '6px 12px', fontSize: '10px', fontWeight: '800', cursor: 'pointer' }}>HOME</button>
        <img src="/logo.png" alt="1760 SATRASHE60" style={{ height: '30px', objectFit: 'contain' }} />
        <button onClick={() => setShowSearchInput(!showSearchInput)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FFF', fontSize: '20px' }}>
          🔍
        </button>
      </div>

      {/* SEARCH INPUT BAR */}
      {showSearchInput && (
        <div style={{ padding: '16px', backgroundColor: '#111', display: 'flex', gap: '10px', borderBottom: '1px solid #222' }}>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            autoFocus 
            style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #333', background: '#000', color: '#FFF' }} 
          />
          <button onClick={() => setShowSearchInput(false)} style={{ background: 'none', color: '#FFF', border: 'none', fontSize: '14px' }}>✕</button>
        </div>
      )}

      {/* PAGE TITLE */}
      <div style={{ textAlign: 'center', margin: '30px 0 20px 0' }}>
        <div style={{ display: 'inline-block', borderBottom: '1px solid #333', paddingBottom: '5px' }}>
            <div style={{ fontSize: '10px', color: '#888', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>Shop By Size</div>
        </div>
        <h1 style={{ margin: '15px 0 0 0', fontSize: '32px', fontFamily: "'Playfair Display', serif", fontWeight: 'normal' }}>
          Find Your <br/>
          <span style={{ color: '#D4AF37', fontStyle: 'italic', fontWeight: 'bold' }}>Perfect Fit</span>
        </h1>
      </div>

      {/* MULTIPLE SIZE GRID SELECTOR */}
      <div style={{ padding: '0 16px', marginBottom: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {allSizes.map(sz => {
            const isSelected = selectedSizes.includes(sz);
            return (
              <button
                key={sz}
                onClick={() => toggleSize(sz)}
                style={{
                  padding: '12px 0',
                  backgroundColor: isSelected ? '#D4AF37' : 'transparent',
                  color: isSelected ? '#000' : '#FFF',
                  border: `1px solid ${isSelected ? '#D4AF37' : '#333'}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      {/* DIVIDER: FEATURED IN YOUR SIZE */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 16px 20px', gap: '12px' }}>
        <div style={{ height: '1px', flex: 1, backgroundColor: '#333' }}></div>
        <span style={{ color: '#D4AF37', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 'bold' }}>Featured In Your Size</span>
        <div style={{ height: '1px', flex: 1, backgroundColor: '#333' }}></div>
      </div>

      {/* PRODUCTS GRID */}
      <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {filteredProducts.length === 0 ? (
          <div style={{ gridColumn: 'span 2', textAlign: 'center', color: '#888', padding: '40px 0' }}>
            No products found for the selected size(s).
          </div>
        ) : (
          filteredProducts.map((prod) => {
            const isWishlisted = wishlist && wishlist.includes(prod.id);
            // Size tag logic
            const matchedSizeTag = selectedSizes.length > 0 ? selectedSizes[0] : 'ALL';

            return (
              <div 
                key={prod.id} 
                onClick={() => navigateTo(`/product/${prod.slug || prod.id}`)}
                style={{ background: '#0A0A0A', borderRadius: '8px', overflow: 'hidden', border: '1px solid #222', cursor: 'pointer' }}
              >
                {/* Image & Tags */}
                <div style={{ position: 'relative', width: '100%', height: '220px' }}>
                  <img src={prod.image || (prod.images && prod.images[0]) || '/dress1.png'} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  
                  {/* Heart Icon */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); onToggleWishlist(prod.id); }} 
                    style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid #444', color: isWishlisted ? '#D4AF37' : '#FFF', fontSize: '14px', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {isWishlisted ? '♥' : '♡'}
                  </button>

                  {/* Size Tag (Bottom Left) */}
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', backgroundColor: 'rgba(0,0,0,0.7)', color: '#D4AF37', fontSize: '9px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '12px', border: '1px solid #D4AF37' }}>
                    {matchedSizeTag} SIZE
                  </div>
                </div>

                {/* Details Container */}
                <div style={{ padding: '12px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#FFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {prod.name}
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '6px' }}>
                    <div>
                      <div style={{ color: '#D4AF37', fontSize: '16px', fontWeight: 'bold' }}>₹{prod.price}</div>
                      <div style={{ fontSize: '9px', color: '#888', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ color: '#D4AF37', fontSize: '10px' }}>★★★★★</span> 4.6 (124)
                      </div>
                    </div>
                    
                    {/* Cart Button */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); onAddToCart({...prod, quantity: 1, selectedSize: matchedSizeTag !== 'ALL' ? matchedSizeTag : 'M'}); }} 
                      style={{ background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', width: '30px', height: '30px', borderRadius: '6px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px' }}
                    >
                      🛍
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}