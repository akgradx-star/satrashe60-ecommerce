import React, { useState } from 'react';
import './CategoryPLP.css';

const FILTER_TABS = ["ALL", "NEW", "TRENDING", "BEST SELLERS", "SALE"];

export default function CategoryPLP({ 
  categoryName, 
  products, 
  onBack, 
  onProductClick, 
  wishlist, 
  onToggleWishlist,
  navigateTo 
}) {
  const [activeTab, setActiveTab] = useState("ALL");
  const [showFilterSheet, setShowFilterSheet] = useState(false);

  // Filter products based on selected category (basic mock filter for UI)
  const displayProducts = products.filter(p => 
    categoryName === "ALL" || p.category.toLowerCase() === categoryName.toLowerCase() || p.slug.includes(categoryName.toLowerCase())
  );

  return (
    <div className="plp-container">
     {/* 2. HORIZONTAL SCROLL FILTER TABS */}
      <div className="plp-tabs-wrapper">
        {FILTER_TABS.map(tab => (
          <button 
            key={tab} 
            className={`plp-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 3. CONTROLS BAR (Mobile: View / Filter) */}
      <div className="plp-controls-bar">
        <div className="plp-view-icons">
          <span className="plp-icon active">⊞</span>
          <span className="plp-icon">⊟</span>
        </div>
        <button className="plp-filter-trigger" onClick={() => setShowFilterSheet(true)}>
          <span style={{ fontSize: '14px', marginRight: '4px' }}>⚲</span> FILTERS
        </button>
      </div>

      {/* 4. PRODUCT GRID */}
      <div className="plp-product-grid">
        {displayProducts.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: '#888' }}>
            No products found for this category.
          </div>
        ) : (
          displayProducts.map(product => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div key={product.id} className="plp-product-card" onClick={() => onProductClick(product, 'category-plp')}>
                <div className="plp-image-box">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <button 
                    className={`plp-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
                  >
                    {isWishlisted ? '♥' : '♡'}
                  </button>
                  {product.discount > 0 && <span className="plp-discount-tag">{product.discount}% OFF</span>}
                </div>
                <div className="plp-info-box">
                  <h3 className="plp-prod-name">{product.name}</h3>
                  <div className="plp-price-row">
                    <span className="plp-curr-price">₹{product.price}</span>
                    {product.oldPrice && <span className="plp-old-price">₹{product.oldPrice}</span>}
                  </div>
                  <div className="plp-colors-row">
                    {product.colors && product.colors.map((c, idx) => (
                       <span key={idx} className="plp-color-dot" title={c}></span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 5. BOTTOM SHEET FILTER (Mobile) */}
      {showFilterSheet && (
        <div className="plp-filter-overlay" onClick={() => setShowFilterSheet(false)}>
          <div className="plp-filter-sheet" onClick={e => e.stopPropagation()}>
            <div className="plp-sheet-header">
              <h3>FILTER & SORT</h3>
              <button onClick={() => setShowFilterSheet(false)}>✕</button>
            </div>
            <div className="plp-sheet-content">
              {/* Filter Options Placeholder */}
              <div className="plp-filter-group">
                <h4>SORT BY</h4>
                {['Recommended', 'Newest', 'Price: Low to High', 'Price: High to Low'].map(s => (
                  <label key={s} className="plp-radio"><input type="radio" name="sort" /> {s}</label>
                ))}
              </div>
              <div className="plp-filter-group">
                <h4>SIZE</h4>
                <div className="plp-size-grid">
                  {['S', 'M', 'L', 'XL'].map(s => <button key={s} className="plp-size-btn">{s}</button>)}
                </div>
              </div>
            </div>
            <div className="plp-sheet-footer">
              <button className="plp-clear-btn" onClick={() => setShowFilterSheet(false)}>CLEAR</button>
              <button className="plp-apply-btn" onClick={() => setShowFilterSheet(false)}>APPLY</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
