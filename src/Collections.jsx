import React, { useState } from 'react';
import { MASTER_PRODUCTS } from './Shop';

// ==========================================================================
// COLLECTIONS MASTER DATA ARCHITECTURE
// ==========================================================================
export const COLLECTIONS_LIST = [
  {
    id: "trending-now",
    slug: "trending-now",
    name: "TRENDING NOW",
    title: "TRENDING NOW COLLECTION",
    desc: "Products currently getting the most attention across India.",
    stylesCount: 48,
    status: "active",
    image: "/dress1.png"
  },
  {
    id: "street-style",
    slug: "street-style",
    name: "STREET STYLE",
    title: "STREET STYLE COLLECTION",
    desc: "Bold street-fashion focused Oversized Tees, Crop Tops & Statement Shirts.",
    stylesCount: 36,
    status: "active",
    image: "/dress2.png"
  },
  {
    id: "college-edit",
    slug: "college-edit",
    name: "COLLEGE EDIT",
    title: "COLLEGE EDIT COLLECTION",
    desc: "Affordable everyday college fashion. Tops, Kurtis & Casual Fits.",
    stylesCount: 42,
    status: "active",
    image: "/dress3.png"
  },
  {
    id: "daily-wear",
    slug: "daily-wear",
    name: "DAILY WEAR",
    title: "DAILY WEAR COLLECTION",
    desc: "Easy, comfortable everyday outfits carefully selected for you.",
    stylesCount: 28,
    status: "active",
    image: "/dress4.png"
  },
  {
    id: "party-edit",
    slug: "party-edit",
    name: "PARTY EDIT",
    title: "PARTY EDIT COLLECTION",
    desc: "Party and occasion-focused statement fashion.",
    stylesCount: 18,
    status: "active",
    image: "/dress1.png"
  },
  {
    id: "office-smart-casual",
    slug: "office-smart-casual",
    name: "OFFICE / SMART CASUAL",
    title: "OFFICE & SMART CASUAL",
    desc: "Office-friendly and elevated smart casual streetwear.",
    stylesCount: 22,
    status: "active",
    image: "/dress2.png"
  },
  {
    id: "under-199",
    slug: "under-199",
    name: "UNDER ₹199",
    title: "UNDER ₹199 BUDGET EDIT",
    desc: "High fashion on a budget. All items priced at ₹199 or below.",
    stylesCount: 18,
    status: "active",
    image: "/dress3.png"
  },
  {
    id: "one-piece-one-chance",
    slug: "one-piece-one-chance",
    name: "ONE PIECE. ONE CHANCE.",
    title: "ONE PIECE. ONE CHANCE.",
    desc: "Ultra-limited pieces from iconic street markets. No restocks.",
    stylesCount: 30,
    status: "active",
    image: "/dress4.png"
  }
];

export default function Collections({ 
  selectedCollectionSlug, 
  onSelectCollection, 
  onBackToHome, 
  onAddToCart,
  onOpenProduct 
}) {
  const [selectedSort, setSelectedSort] = useState("Featured");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("ALL");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [onlyOneLeftOnly, setOnlyOneLeftOnly] = useState(false);

  // Active Collection Data (If inside a specific collection)
  const currentCollection = COLLECTIONS_LIST.find(c => c.slug === selectedCollectionSlug);

  // Dynamically filter products assigned to this collection tag from MASTER_PRODUCTS
  const rawCollectionProducts = selectedCollectionSlug
    ? (MASTER_PRODUCTS || []).filter(p => p.collections && p.collections.includes(selectedCollectionSlug))
    : [];

  // Apply Sidebar Filters inside Collection
  const filteredProducts = rawCollectionProducts.filter(product => {
    if (selectedCategoryFilter !== "ALL" && product.category.toLowerCase() !== selectedCategoryFilter.toLowerCase()) {
      return false;
    }
    if (selectedSizes.length > 0) {
      const hasSize = product.sizes && product.sizes.some(s => selectedSizes.includes(s));
      if (!hasSize) return false;
    }
    if (onlyOneLeftOnly && product.stock !== 1) {
      return false;
    }
    return true;
  });

  // Apply Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (selectedSort === "Price: Low → High") return a.price - b.price;
    if (selectedSort === "Price: High → Low") return b.price - a.price;
    if (selectedSort === "Most Popular" || selectedSort === "Best Selling") return b.isBestSeller ? 1 : -1;
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });

  return (
    <div style={{ backgroundColor: '#FAFAFA', color: '#111111', fontFamily: "'Inter', sans-serif", width: '100%', minHeight: '100vh' }}>
      
      {/* TWO-COLUMN LAYOUT MATCHING EXACT APPROVED DESIGN */}
      <div style={{ display: 'grid', gridTemplateColumns: '270px 1fr', minHeight: '100vh' }}>
        
        {/* LEFT DEEP BLACK SIDEBAR */}
        <aside style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '28px 20px', display: 'flex', flexDirection: 'column', gap: '20px', borderRight: '1px solid #1F1F1F' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #222222' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>FILTERS</span>
            <button 
              onClick={() => { setSelectedCategoryFilter("ALL"); setSelectedSizes([]); setOnlyOneLeftOnly(false); }} 
              style={{ background: 'none', border: 'none', color: '#888888', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}
            >
              Reset All ↻
            </button>
          </div>

          {/* ACCORDION: CATEGORY */}
          <div style={{ borderBottom: '1px solid #1A1A1A', paddingBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px', marginBottom: '14px', textTransform: 'uppercase' }}>
              CATEGORY <span>—</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { name: "Tops", count: 48 },
                { name: "Kurtis", count: 36 },
                { name: "One Pieces", count: 28 },
                { name: "Co-ord Sets", count: 22 },
                { name: "All Products", count: 156 }
              ].map(item => (
                <label key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: (selectedCategoryFilter === item.name || (item.name === "All Products" && selectedCategoryFilter === "ALL")) ? '#FF6B00' : '#CCCCCC', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedCategoryFilter === item.name || (item.name === "All Products" && selectedCategoryFilter === "ALL")}
                    onChange={() => setSelectedCategoryFilter(item.name === "All Products" ? "ALL" : item.name)}
                    style={{ accentColor: '#FF6B00', width: '15px', height: '15px', cursor: 'pointer' }}
                  />
                  <span>{item.name} <span style={{ color: '#666666' }}>({item.count})</span></span>
                </label>
              ))}
            </div>
          </div>

          {/* ACCORDION: SIZE */}
          <div style={{ borderBottom: '1px solid #1A1A1A', paddingBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px', color: '#DDDDDD', marginBottom: '10px' }}>
              SIZE <span>+</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {["S", "M", "L", "XL"].map(sz => {
                const isSel = selectedSizes.includes(sz);
                return (
                  <button
                    key={sz}
                    onClick={() => {
                      if (isSel) setSelectedSizes(selectedSizes.filter(s => s !== sz));
                      else setSelectedSizes([...selectedSizes, sz]);
                    }}
                    style={{ padding: '4px 10px', fontSize: '10px', fontWeight: '700', backgroundColor: isSel ? '#FF6B00' : '#1A1A1A', color: '#FFFFFF', border: '1px solid #333333', borderRadius: '3px', cursor: 'pointer' }}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* COLOR SWATCHES */}
          <div style={{ borderBottom: '1px solid #1A1A1A', paddingBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px', marginBottom: '12px', color: '#DDDDDD' }}>
              COLOR <span>+</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {["#000000", "#FFFFFF", "#D2B48C", "#5C2C16", "#C15C5C", "#1B4D3E"].map((hex, idx) => (
                <span key={idx} style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: hex, border: '1px solid #444444', cursor: 'pointer', display: 'inline-block' }}></span>
              ))}
            </div>
          </div>

          {/* ONLY 1 LEFT */}
          <div style={{ borderBottom: '1px solid #1A1A1A', paddingBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px', marginBottom: '10px', color: '#DDDDDD' }}>ONLY 1 LEFT</div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#CCCCCC', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={onlyOneLeftOnly}
                onChange={(e) => setOnlyOneLeftOnly(e.target.checked)}
                style={{ accentColor: '#FF6B00', width: '15px', height: '15px', cursor: 'pointer' }} 
              />
              <span>Show Only 1 Left</span>
            </label>
          </div>

          {/* DROP ALERTS BOX */}
          <div style={{ marginTop: 'auto', backgroundColor: '#121212', border: '1px solid #222222', borderRadius: '8px', padding: '18px 14px', textAlign: 'center' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #333333', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto', fontSize: '16px' }}>
              🔔
            </div>
            <div style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
              EXCLUSIVE COLLECTION ALERTS
            </div>
            <p style={{ fontSize: '10px', color: '#888888', marginBottom: '14px', lineHeight: '1.4' }}>
              Be the first to know when new collections drop.
            </p>
            <button style={{ backgroundColor: '#111111', color: '#C9A227', border: '1px solid #333333', padding: '10px 16px', width: '100%', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '4px' }}>
              JOIN THE CLUB
            </button>
          </div>

        </aside>

        {/* RIGHT CONTENT AREA */}
        <main style={{ padding: '30px 40px', backgroundColor: '#FAFAFA' }}>
          
          {/* BREADCRUMB */}
          <div style={{ fontSize: '12px', color: '#888888', marginBottom: '14px' }}>
            <span onClick={onBackToHome} style={{ color: '#888888', cursor: 'pointer' }}>Home</span> › 
            <span style={{ color: '#111111', fontWeight: '600', marginLeft: '4px' }}>
              {selectedCollectionSlug ? (
                <>
                  <span onClick={() => onSelectCollection(null)} style={{ color: '#888888', cursor: 'pointer' }}>Collections</span> › {currentCollection?.name}
                </>
              ) : 'Collections'}
            </span>
          </div>

          {/* PAGE HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '32px', fontWeight: '900', letterSpacing: '-0.5px', margin: '0 0 6px 0', textTransform: 'uppercase' }}>
                {selectedCollectionSlug ? currentCollection?.title : "OUR COLLECTIONS"}
              </h1>
              <p style={{ fontSize: '12px', color: '#666666', margin: 0 }}>
                {selectedCollectionSlug 
                  ? `${currentCollection?.desc} (Showing ${sortedProducts.length} products)`
                  : "Curated from India's most iconic street markets. Handpicked styles. Limited pieces. No restocks."}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '12px', color: '#666666' }}>Sort by:</span>
              <select 
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                style={{ padding: '8px 14px', fontSize: '12px', fontWeight: '600', border: '1px solid #E0E0E0', borderRadius: '4px', background: '#FFFFFF', cursor: 'pointer' }}
              >
                <option value="Featured">Featured</option>
                <option value="Newest First">Newest First</option>
                <option value="Price: Low → High">Price: Low → High</option>
                <option value="Price: High → Low">Price: High → Low</option>
              </select>
            </div>
          </div>

          {/* ================================================================
              VIEW 1: COLLECTIONS HUB (GRID OF 8 COLLECTIONS)
             ================================================================ */}
          {!selectedCollectionSlug ? (
            <>
              {/* DARK HERO BANNER WITH COUNTDOWN */}
              <div style={{ position: 'relative', width: '100%', height: '240px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#0A0A0A', color: '#FFFFFF', marginBottom: '32px', display: 'flex', alignItems: 'center', padding: '0 40px', backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.4)), url('/hero.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div style={{ maxWidth: '420px', zIndex: 2 }}>
                  <p style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '2px', color: '#C9A227', textTransform: 'uppercase', marginBottom: '8px' }}>
                    HANDPICKED. LIMITED. ICONIC.
                  </p>
                  <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '32px', fontWeight: '800', lineHeight: '1.1', marginBottom: '10px' }}>
                    EVERY COLLECTION TELLS A STORY.
                  </h2>
                  <p style={{ fontSize: '12px', color: '#CCCCCC', marginBottom: '20px' }}>
                    Street style. Your style.
                  </p>
                  <button 
                    onClick={() => onSelectCollection(COLLECTIONS_LIST[0].slug)}
                    style={{ backgroundColor: 'transparent', color: '#FFFFFF', border: '1px solid #FFFFFF', padding: '10px 20px', fontSize: '11px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}
                  >
                    EXPLORE ALL COLLECTIONS →
                  </button>
                </div>

                {/* COUNTDOWN CARD */}
                <div style={{ position: 'absolute', right: '30px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(10, 10, 10, 0.85)', border: '1px solid #C9A227', padding: '20px 24px', borderRadius: '6px', textAlign: 'center', zIndex: 2 }}>
                  <div style={{ fontSize: '10px', fontWeight: '800', color: '#C9A227', letterSpacing: '1.5px', marginBottom: '8px' }}>
                    NEXT COLLECTION DROPS IN
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'monospace', letterSpacing: '2px', marginBottom: '8px' }}>
                    02 : 15 : 42 : 09
                  </div>
                  <div style={{ fontSize: '9px', color: '#888888', marginBottom: '12px' }}>
                    FRIDAY, 16 MAY 2025 | AT 8:00 PM
                  </div>
                  <button style={{ backgroundColor: '#C9A227', color: '#0A0A0A', border: 'none', padding: '8px 16px', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', width: '100%', cursor: 'pointer', borderRadius: '3px' }}>
                    NOTIFY ME 🔔
                  </button>
                </div>
              </div>

              {/* 8 COLLECTION TILES */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {COLLECTIONS_LIST.filter(c => c.status === 'active').map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => onSelectCollection(item.slug)}
                    style={{ position: 'relative', height: '280px', borderRadius: '6px', overflow: 'hidden', cursor: 'pointer', backgroundColor: '#121212' }}
                  >
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85, transition: 'transform 0.3s' }} />
                    <button style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: '#FFFFFF', fontSize: '16px', cursor: 'pointer' }}>♡</button>
                    
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 15%, transparent 60%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '20px', color: '#FFFFFF' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
                        {item.name}
                      </h3>
                      <div style={{ fontSize: '10px', color: '#CCCCCC', marginBottom: '10px' }}>
                        {item.stylesCount} Styles
                      </div>
                      <div style={{ fontSize: '11px', fontWeight: '800', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        SHOP NOW →
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* ================================================================
               VIEW 2: DEDICATED COLLECTION PRODUCT LISTING
               ================================================================ */
            <>
              {sortedProducts.length === 0 ? (
                <div style={{ padding: '80px 0', textAlign: 'center', backgroundColor: '#FFFFFF', borderRadius: '6px', border: '1px solid #E5E5E5' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '8px' }}>NO PRODUCTS AVAILABLE RIGHT NOW</h3>
                  <p style={{ color: '#666666', fontSize: '12px', marginBottom: '20px' }}>New styles for {currentCollection?.name} will be dropped soon.</p>
                  <button onClick={() => onSelectCollection(null)} style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '10px 24px', fontSize: '11px', fontWeight: '800', letterSpacing: '1px', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                    ← BACK TO ALL COLLECTIONS
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                  {sortedProducts.map(product => (
                    <div 
                      key={product.id} 
                      onClick={() => onOpenProduct && onOpenProduct(product)}
                      style={{ backgroundColor: '#FFFFFF', borderRadius: '4px', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid #E5E5E5', cursor: 'pointer' }}
                    >
                      {/* PRODUCT IMAGE CONTAINER */}
                      <div style={{ position: 'relative', width: '100%', height: '260px', backgroundColor: '#F0F0F0', overflow: 'hidden' }}>
                        {product.isNew && (
                          <span style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: '#0A0A0A', color: '#FFFFFF', fontSize: '9px', fontWeight: '800', padding: '3px 6px', borderRadius: '2px', letterSpacing: '1px', zIndex: 2 }}>
                            NEW
                          </span>
                        )}

                        {product.stock === 1 ? (
                          <span style={{ position: 'absolute', bottom: '8px', left: '8px', backgroundColor: '#FF6B00', color: '#FFFFFF', fontSize: '8px', fontWeight: '800', padding: '3px 6px', borderRadius: '2px', letterSpacing: '0.5px', textTransform: 'uppercase', zIndex: 2 }}>
                            ONLY 1 LEFT
                          </span>
                        ) : product.stock === 0 ? (
                          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10, 10, 10, 0.75)', color: '#FFFFFF', fontSize: '11px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: '1px', zIndex: 2 }}>
                            SOLD OUT
                          </div>
                        ) : null}
                        
                        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        
                        {/* QUICK BAG BUTTON */}
                        {product.stock > 0 && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToCart({ ...product, selectedSize: (product.sizes && product.sizes[0]) || 'M', quantity: 1 });
                            }}
                            style={{ position: 'absolute', bottom: '8px', right: '8px', backgroundColor: 'rgba(10, 10, 10, 0.85)', color: '#FFFFFF', width: '30px', height: '30px', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', cursor: 'pointer', zIndex: 2 }}
                          >
                            🛍️
                          </button>
                        )}
                      </div>

                      {/* CARD DETAILS */}
                      <div style={{ padding: '12px' }}>
                        <h4 style={{ fontSize: '12px', fontWeight: '700', margin: '0 0 4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#111111' }}>
                          {product.name}
                        </h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '13px', fontWeight: '800', color: '#111111' }}>₹{product.price}</span>
                          <span style={{ fontSize: '10px', color: '#999999', textDecoration: 'line-through' }}>₹{product.mrp || product.oldPrice}</span>
                          <span style={{ fontSize: '9px', fontWeight: '800', color: '#FF6B00' }}>{product.discount}% OFF</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

        </main>

      </div>

      {/* BOTTOM TRUST STRIP */}
      <div style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '20px 4%', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', borderTop: '1px solid #1F1F1F', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>🛡️</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '10px', fontWeight: '800' }}>HANDPICKED WITH LOVE</div>
            <div style={{ fontSize: '9px', color: '#888888' }}>From trusted street markets</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>🛍️</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '10px', fontWeight: '800' }}>NO RESTOCKS</div>
            <div style={{ fontSize: '9px', color: '#888888' }}>Once it's gone, it's gone</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>⭐</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '10px', fontWeight: '800' }}>LIMITED PIECES</div>
            <div style={{ fontSize: '9px', color: '#888888' }}>Only 1-2 pieces per style</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>🚚</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '10px', fontWeight: '800' }}>FAST DELIVERY</div>
            <div style={{ fontSize: '9px', color: '#888888' }}>Pan India Delivery</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>🔄</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '10px', fontWeight: '800' }}>EASY RETURNS</div>
            <div style={{ fontSize: '9px', color: '#888888' }}>Hassle free returns</div>
          </div>
        </div>
      </div>

    </div>
  );
}