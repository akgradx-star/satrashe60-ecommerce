import React, { useState, useEffect } from 'react';
import './Shop.css';

export const MASTER_PRODUCTS = [
  {
    id: 1,
    slug: "linen-shirt-top",
    name: "Linen Shirt Top",
    category: "Tops",
    price: 149,
    oldPrice: 599,
    mrp: 599,
    discount: 75,
    stock: 1,
    isNew: true,
    isBestSeller: false,
    sizes: ["S", "M", "L", "XL"],
    sizeInventory: { "S": 1, "M": 0, "L": 0, "XL": 0 },
    colors: ["White", "Black"],
    color: "White / Off-White",
    fabric: "100% Pure Linen",
    images: ["/dress1.png", "/dress2.png", "/dress3.png", "/dress4.png"],
    image: "/dress1.png",
    createdAt: "2026-08-01",
    reviews: []
  },
  {
    id: 2,
    slug: "black-ribbed-top",
    name: "Black Ribbed Top",
    category: "Tops",
    price: 129,
    oldPrice: 499,
    mrp: 499,
    discount: 74,
    stock: 1,
    isNew: true,
    isBestSeller: true,
    sizes: ["S", "M", "L", "XL"],
    sizeInventory: { "S": 1, "M": 1, "L": 0, "XL": 1 },
    colors: ["Black", "Beige", "Brown"],
    fabric: "Ribbed Cotton Blend",
    images: ["/dress2.png", "/dress1.png", "/dress3.png"],
    image: "/dress2.png",
    createdAt: "2026-08-05",
    reviews: []
  },
  {
    id: 3,
    slug: "tie-knot-shirt",
    name: "Tie Knot Shirt",
    category: "Tops",
    price: 159,
    oldPrice: 599,
    mrp: 599,
    discount: 73,
    stock: 1,
    isNew: true,
    isBestSeller: false,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Beige"],
    fabric: "Cotton Viscose",
    images: ["/dress3.png", "/dress1.png", "/dress4.png"],
    image: "/dress3.png",
    createdAt: "2026-08-03",
    reviews: []
  },
  {
    id: 4,
    slug: "printed-co-ord-set",
    name: "Printed Co-ord Set",
    category: "Co-ord Sets",
    price: 299,
    oldPrice: 999,
    mrp: 999,
    discount: 70,
    stock: 1,
    isNew: true,
    isBestSeller: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Beige", "Black"],
    fabric: "Premium Rayon Blend",
    images: ["/dress4.png", "/dress2.png", "/dress1.png"],
    image: "/dress4.png",
    createdAt: "2026-08-06",
    reviews: []
  },
  {
    id: 5,
    slug: "oversized-tee",
    name: "Oversized Tee",
    category: "Tops",
    price: 149,
    oldPrice: 499,
    mrp: 499,
    discount: 70,
    stock: 1,
    isNew: true,
    isBestSeller: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Black"],
    fabric: "100% Heavyweight Cotton",
    images: ["/dress1.png", "/dress3.png"],
    image: "/dress1.png",
    createdAt: "2026-08-02",
    reviews: []
  },
  {
    id: 6,
    slug: "boho-printed-top",
    name: "Boho Printed Top",
    category: "Tops",
    price: 169,
    oldPrice: 599,
    mrp: 599,
    discount: 72,
    stock: 0,
    isNew: true,
    isBestSeller: false,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown", "Red"],
    fabric: "Georgette with Soft Lining",
    images: ["/dress2.png", "/dress4.png"],
    image: "/dress2.png",
    createdAt: "2026-08-04",
    reviews: []
  }
];

const CATEGORIES = [
  { name: 'Tops', img: '/dress1.png' },
  { name: 'T-Shirts', img: '/dress2.png' },
  { name: 'Kurtis', img: '/dress3.png' },
  { name: 'One Pieces', img: '/dress4.png' }
];

export default function Shop({ 
  products = [], 
  initialCategory = "ALL", 
  initialSearchQuery = "", 
  initialSizes = [], 
  onNavigate, 
  wishlist = [], 
  onToggleWishlist, 
  onAddToCart 
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSizes, setSelectedSizes] = useState(initialSizes);
  const [sortBy, setSortBy] = useState("Recommended"); 
  const [viewMode, setViewMode] = useState("grid");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [quickAddProduct, setQuickAddProduct] = useState(null);
  const [selectedSizeForAdd, setSelectedSizeForAdd] = useState(null);
  const [sizeError, setSizeError] = useState("");
  const [addedNotice, setAddedNotice] = useState(false);
  const [liveProducts, setLiveProducts] = useState([]);

  useEffect(() => {
    fetch('https://satrashe60-ecommerce.onrender.com/api/products')
      .then(response => response.json())
      .then(data => {
        if(Array.isArray(data)) {
          setLiveProducts(data.reverse()); 
        }
      })
      .catch(error => console.error("Live products laane mein error:", error));
  }, []);

  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (initialSizes && initialSizes.length > 0) {
      setSelectedSizes(initialSizes);
    }
  }, [initialSizes]);

  const finalProductsToDisplay = [...liveProducts, ...MASTER_PRODUCTS];

  const filteredProducts = finalProductsToDisplay.filter(product => {
    if (initialSearchQuery) {
      const q = initialSearchQuery.toLowerCase();
      const matchesName = (product.name || "").toLowerCase().includes(q);
      if (!matchesName) return false;
    }
    if (selectedCategory !== "ALL" && selectedCategory !== "All Products") {
      if ((product.category || "").toLowerCase() !== selectedCategory.toLowerCase()) return false;
    }
    if (selectedSizes.length > 0) {
      const hasSize = (product.sizes || []).some(s => selectedSizes.includes(s));
      if (!hasSize) return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    if (sortBy === "Newest First") return new Date(b.createdAt) - new Date(a.createdAt);
    return 0; 
  });

  const totalProductsCount = sortedProducts.length;

  const handleResetAll = () => {
    setSelectedCategory("ALL");
    setSelectedSizes([]);
    setSortBy("Recommended");
  };

  const handleConfirmAddToCart = () => {
    if (!selectedSizeForAdd) {
      setSizeError("Please select a size.");
      return;
    }
    onAddToCart({ ...quickAddProduct, selectedSize: selectedSizeForAdd, quantity: 1 });
    setAddedNotice(true);
    setTimeout(() => {
      setQuickAddProduct(null);
      setAddedNotice(false);
    }, 1200);
  };

  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh', paddingBottom: '60px', fontFamily: "'Inter', sans-serif" }}>
      
      {/* 🚀 1. EXACT MOCKUP HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px', backgroundColor: '#000000', padding: '0 16px' }}>
        <button 
          onClick={() => onNavigate('home')} 
          style={{ background: 'transparent', color: '#FFF', border: '1px solid #D4AF37', borderRadius: '6px', padding: '6px 14px', fontSize: '11px', fontWeight: '800', letterSpacing: '1px', cursor: 'pointer' }}
        >
          HOME
        </button>
        <img 
          src="/logo.png" 
          alt="1760 SATRASHE60" 
          style={{ height: '34px', objectFit: 'contain', cursor: 'pointer' }} 
          onClick={() => onNavigate('home')}
        />
        <div style={{ width: '12px', height: '12px', backgroundColor: '#FFFFFF', borderRadius: '50%' }}></div>
      </div>

      {/* 🚀 2. GLOWING GOLD RING CATEGORIES */}
      <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', padding: '24px 16px', backgroundColor: '#000000', scrollbarWidth: 'none' }} className="hide-scrollbar">
        {CATEGORIES.map((cat, idx) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <div 
              key={idx} 
              onClick={() => setSelectedCategory(cat.name)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer', flexShrink: 0 }}
            >
              <div style={{ 
                width: '76px', height: '76px', borderRadius: '50%', 
                border: isSelected ? '2px solid #D4AF37' : '2px solid #555555', 
                padding: '3px', transition: 'all 0.3s ease',
                boxShadow: isSelected ? '0 0 18px rgba(212, 175, 55, 0.4)' : 'none'
              }}>
                <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              </div>
              <span style={{ color: isSelected ? '#D4AF37' : '#FFFFFF', fontSize: '13px', fontWeight: '800', transition: 'color 0.3s ease' }}>
                {cat.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* 🚀 3. MOCKUP FILTER BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0A0A0A', padding: '14px 16px', borderTop: '1px solid #1A1A1A', borderBottom: '1px solid #1A1A1A' }}>
        <button onClick={() => setShowMobileFilter(true)} style={{ background: 'none', border: 'none', color: '#D4AF37', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <span style={{ fontSize: '16px' }}>⎚</span> Filter
        </button>
        
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ background: 'none', border: 'none', color: '#FFFFFF', fontSize: '13px', fontWeight: '700', outline: 'none', cursor: 'pointer', textAlign: 'center' }}>
          <option value="Recommended" style={{ color: '#000' }}>Sort By</option>
          <option value="Newest First" style={{ color: '#000' }}>Newest</option>
          <option value="Price: Low to High" style={{ color: '#000' }}>Price: Low to High</option>
          <option value="Price: High to Low" style={{ color: '#000' }}>Price: High to Low</option>
        </select>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setViewMode('grid')} style={{ background: 'none', border: 'none', color: viewMode === 'grid' ? '#D4AF37' : '#555', fontSize: '18px', cursor: 'pointer', padding: 0 }}>⊞</button>
          <button onClick={() => setViewMode('list')} style={{ background: 'none', border: 'none', color: viewMode === 'list' ? '#D4AF37' : '#555', fontSize: '18px', cursor: 'pointer', padding: 0 }}>⊟</button>
        </div>
      </div>

      {/* 🚀 4. MOCKUP PRODUCT GRID */}
      {totalProductsCount === 0 ? (
        <div style={{ color: '#FFF', textAlign: 'center', padding: '40px 20px' }}>
          <h3>No products found for "{selectedCategory}"</h3>
          <button onClick={handleResetAll} style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#D4AF37', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>View All Products</button>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: viewMode === 'grid' ? '1fr 1fr' : '1fr', 
          gap: '16px', 
          padding: '16px',
          backgroundColor: '#000000'
        }}>
          {sortedProducts.map(product => {
            const isWishlisted = wishlist.includes(product.id || product._id);
            const discountPct = product.discount || Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) || 0;

            return (
              <div key={product.id || product._id} style={{ backgroundColor: '#000000', borderRadius: '8px', overflow: 'hidden' }}>
                
                {/* Image Container matching mockup */}
                <div onClick={() => onNavigate(`/product/${product.slug || product.name}`)} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#111' }}>
                  <img src={product.image || product.images?.[0]} alt={product.name} style={{ width: '100%', height: 'auto', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }} />
                  
                  {/* Mockup "New" Badge */}
                  {product.isNew && (
                    <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: '#D4AF37', color: '#000', padding: '4px 10px', borderRadius: '16px', fontSize: '11px', fontWeight: '900', letterSpacing: '0.5px' }}>
                      New
                    </div>
                  )}

                  {/* Mockup Heart Icon */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id || product._id); }}
                    style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(0,0,0,0.4)', border: 'none', width: '32px', height: '32px', borderRadius: '6px', color: isWishlisted ? '#D4AF37' : '#FFFFFF', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  >
                    {isWishlisted ? '♥' : '♡'}
                  </button>
                </div>

                {/* Details below image */}
                <div style={{ padding: '12px 4px' }}>
                  <h3 style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: '700', margin: '0 0 6px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '800' }}>₹{product.price}</span>
                    {product.oldPrice && <span style={{ color: '#666666', fontSize: '11px', textDecoration: 'line-through' }}>₹{product.oldPrice}</span>}
                  </div>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setQuickAddProduct(product);
                      setSelectedSizeForAdd(null);
                      setSizeError("");
                      setAddedNotice(false);
                    }}
                    style={{ width: '100%', marginTop: '12px', padding: '10px 0', backgroundColor: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '4px', fontSize: '11px', fontWeight: '800', letterSpacing: '1px', cursor: 'pointer' }}
                  >
                    ADD TO BAG
                  </button>
                </div>
                
                {/* Subtle separator below card */}
                <div style={{ height: '1px', backgroundColor: '#1A1A1A', marginTop: '8px' }}></div>
              </div>
            );
          })}
        </div>
      )}

      {/* QUICK ADD TO CART MODAL */}
      {quickAddProduct && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(3px)' }}>
          <div style={{ backgroundColor: '#111', padding: '24px', borderRadius: '8px', width: '320px', textAlign: 'center', border: '1px solid #333' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px', color: '#fff' }}>SELECT SIZE</h3>
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '16px' }}>{quickAddProduct.name}</p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
              {(quickAddProduct.sizes || ["S", "M", "L", "XL"]).map(sz => (
                <button
                  key={sz}
                  onClick={() => { setSelectedSizeForAdd(sz); setSizeError(""); }}
                  style={{ width: '38px', height: '38px', border: selectedSizeForAdd === sz ? '2px solid #D4AF37' : '1px solid #333', backgroundColor: selectedSizeForAdd === sz ? '#D4AF37' : '#111', color: selectedSizeForAdd === sz ? '#000' : '#fff', fontWeight: '800', borderRadius: '4px', cursor: 'pointer' }}
                >
                  {sz}
                </button>
              ))}
            </div>

            {sizeError && <div style={{ color: '#FF3333', fontSize: '11px', fontWeight: '700', marginBottom: '12px' }}>{sizeError}</div>}
            {addedNotice && <div style={{ color: '#D4AF37', fontSize: '11px', fontWeight: '800', marginBottom: '12px' }}>Added to Bag ✓</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button onClick={handleConfirmAddToCart} style={{ backgroundColor: '#D4AF37', color: '#000', border: 'none', padding: '12px', fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '4px' }}>CONFIRM</button>
              <button onClick={() => setQuickAddProduct(null)} style={{ backgroundColor: 'transparent', color: '#888', border: 'none', padding: '8px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE FILTER OVERLAY */}
      {showMobileFilter && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' }} onClick={() => setShowMobileFilter(false)}></div>
          <div style={{ backgroundColor: '#111', color: '#FFF', padding: '20px', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '16px', marginBottom: '16px' }}>
              <h3 style={{ color: '#D4AF37', margin: 0 }}>FILTERS</h3>
              <button onClick={() => setShowMobileFilter(false)} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '18px' }}>✕</button>
            </div>
            
            <div style={{ overflowY: 'auto', maxHeight: '50vh' }}>
              <div style={{ paddingBottom: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#D4AF37', marginBottom: '10px' }}>CATEGORIES</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {["ALL", "Tops", "T-Shirts", "Kurtis", "One Pieces", "Co-ord Sets"].map(cat => (
                    <button 
                      key={cat} onClick={() => setSelectedCategory(cat)}
                      style={{ padding: '8px 12px', background: selectedCategory === cat ? '#D4AF37' : '#222', color: selectedCategory === cat ? '#000' : '#fff', border: 'none', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              
              <div style={{ paddingBottom: '16px', paddingTop: '10px', borderTop: '1px solid #333' }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#D4AF37', marginBottom: '10px' }}>SIZES</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {["XS", "S", "M", "L", "XL", "XXL"].map(size => {
                    const isSel = selectedSizes.includes(size);
                    return (
                      <button 
                        key={size}
                        onClick={() => {
                          if (isSel) setSelectedSizes(selectedSizes.filter(s => s !== size));
                          else setSelectedSizes([...selectedSizes, size]);
                        }}
                        style={{ width: '40px', height: '40px', background: isSel ? '#D4AF37' : '#222', color: isSel ? '#000' : '#fff', border: 'none', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <button onClick={handleResetAll} style={{ background: 'none', border: 'none', color: '#FF3333', fontSize: '12px', padding: '10px 0', cursor: 'pointer', fontWeight: 'bold' }}>
                Clear All Filters
              </button>
            </div>

            <button onClick={() => setShowMobileFilter(false)} style={{ width: '100%', padding: '14px', backgroundColor: '#D4AF37', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold', marginTop: '16px' }}>
              APPLY FILTERS
            </button>
          </div>
        </div>
      )}
    </div>
  );
}