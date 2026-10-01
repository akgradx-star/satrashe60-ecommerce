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
    fitShape: "Relaxed Fit",
    length: "Regular Length",
    neckCollar: "Mandarin Collar",
    sleeveStyling: "Cuffed Sleeves",
    printPatternType: "Solid Minimalist",
    occasion: "Casual / Vacation",
    sleeveLength: "Three-Quarter Sleeves",
    pattern: "Solid",
    surfaceStyling: "Wooden Button Placket",
    netQuantity: 1,
    character: "Minimalist Aesthetic",
    countryOfOrigin: "India",
    manufacturerInformation: "SATRASHE60 Apparels Pvt Ltd, Sector 4, Pune, Maharashtra - 411045",
    importerInformation: "Not Applicable (Directly Handcrafted in India)",
    packerInformation: "SATRASHE60 Central Fulfillment Hub, Pune, Maharashtra",
    netWeight: "190g",
    supplierInformation: "Verified Street Fashion Curators Hub India",
    contactInformation: "care@satrashe60.com | +91 98765 43210 (Mon-Sat, 10 AM - 7 PM)",
    legalDisclaimer: "Product color may slightly vary due to photographic lighting sources or your monitor settings.",
    createdAt: "2026-08-01",
    images: ["/dress1.png", "/dress2.png", "/dress3.png", "/dress4.png"],
    image: "/dress1.png",
    collections: ["trending-now", "college-edit", "under-199"],
    reviews: [
      {
        reviewId: "rev-101",
        productId: 1,
        customerName: "Priya Sharma",
        rating: 5,
        reviewDate: "08 Aug 2026",
        reviewText: "Material is 100% breathable pure linen! Fits exceptionally well for college and daily wear.",
        images: ["/dress1.png", "/dress2.png"],
        verifiedPurchase: true
      },
      {
        reviewId: "rev-102",
        productId: 1,
        customerName: "Ananya Iyer",
        rating: 4,
        reviewDate: "02 Aug 2026",
        reviewText: "Super comfortable cut and premium stitching. Delivery arrived in 3 days.",
        images: ["/dress3.png"],
        verifiedPurchase: true
      }
    ]
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
    color: "Jet Black",
    fabric: "Ribbed Cotton Blend",
    fitShape: "Slim Fit",
    length: "Crop Length",
    neckCollar: "Square Neck",
    sleeveStyling: "Fitted Sleeves",
    printPatternType: "Ribbed Texture",
    occasion: "Streetwear / Party",
    sleeveLength: "Short Sleeves",
    pattern: "Self Design Ribbed",
    surfaceStyling: "None",
    netQuantity: 1,
    character: "Y2K Streetwear",
    countryOfOrigin: "India",
    manufacturerInformation: "SATRASHE60 Streetwear Studio, Mumbai, Maharashtra",
    importerInformation: "Not Applicable (Made in India)",
    packerInformation: "SATRASHE60 Logistics Center, Pune, Maharashtra",
    netWeight: "160g",
    supplierInformation: "SATRASHE60 Verified Vendors Network",
    contactInformation: "care@satrashe60.com | +91 98765 43210",
    legalDisclaimer: "Gentle machine wash in cold water with similar dark colors.",
    createdAt: "2026-08-05",
    images: ["/dress2.png", "/dress1.png", "/dress3.png"],
    image: "/dress2.png",
    collections: ["trending-now", "street-style", "under-199"],
    reviews: [
      {
        reviewId: "rev-201",
        productId: 2,
        customerName: "Rhea Deshmukh",
        rating: 5,
        reviewDate: "10 Aug 2026",
        reviewText: "The stretch is incredible! Looks like an expensive luxury brand top.",
        images: ["/dress2.png"],
        verifiedPurchase: true
      },
      {
        reviewId: "rev-202",
        productId: 2,
        customerName: "Tanvi Patel",
        rating: 5,
        reviewDate: "06 Aug 2026",
        reviewText: "Exactly as pictured. The square neck is flattering.",
        images: [],
        verifiedPurchase: true
      }
    ]
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
    sizeInventory: { "S": 0, "M": 1, "L": 1, "XL": 0 },
    colors: ["Black", "Beige"],
    color: "Printed Earthy Brown",
    fabric: "Cotton Viscose",
    fitShape: "Regular Fit",
    length: "Crop with Front Knot",
    neckCollar: "Spread Collar",
    sleeveStyling: "Roll-up Sleeves",
    printPatternType: "Ethnic Abstract",
    occasion: "Brunch / Casual",
    sleeveLength: "Full Sleeves",
    pattern: "Printed",
    surfaceStyling: "Tie-Up Front Knot",
    netQuantity: 1,
    character: "Boho Chic",
    countryOfOrigin: "India",
    manufacturerInformation: "SATRASHE60 Apparels Pvt Ltd, Pune, India",
    importerInformation: "Not Applicable",
    packerInformation: "SATRASHE60 Central Fulfillment Hub, Pune",
    netWeight: "180g",
    supplierInformation: "Verified Artisans Network India",
    contactInformation: "care@satrashe60.com",
    legalDisclaimer: "Hand wash separately for initial washes.",
    createdAt: "2026-08-03",
    images: ["/dress3.png", "/dress1.png", "/dress4.png"],
    image: "/dress3.png",
    collections: ["street-style", "college-edit", "under-199"],
    reviews: [
      {
        reviewId: "rev-301",
        productId: 3,
        customerName: "Kavya Menon",
        rating: 5,
        reviewDate: "05 Aug 2026",
        reviewText: "Loved the front tie-knot detail. Paired it with baggy denim and got lots of compliments!",
        images: ["/dress3.png"],
        verifiedPurchase: true
      }
    ]
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
    sizeInventory: { "S": 1, "M": 1, "L": 1, "XL": 1 },
    colors: ["White", "Beige", "Black"],
    color: "Olive & Mustard Baroque",
    fabric: "Premium Rayon Blend",
    fitShape: "Relaxed Fit Co-ord",
    length: "Top + Flared Bottoms",
    neckCollar: "Camp Collar",
    sleeveStyling: "Drop Shoulder",
    printPatternType: "Baroque Geometric",
    occasion: "Resort Wear / Party",
    sleeveLength: "Half Sleeves",
    pattern: "All-Over Print",
    surfaceStyling: "Elasticated Waistband Bottoms",
    netQuantity: 2,
    character: "Statement Co-ord",
    countryOfOrigin: "India",
    manufacturerInformation: "SATRASHE60 Apparels Pvt Ltd, Mumbai",
    importerInformation: "Not Applicable",
    packerInformation: "SATRASHE60 Logistics Center, Pune",
    netWeight: "340g",
    supplierInformation: "Curated Indian Mills",
    contactInformation: "care@satrashe60.com",
    legalDisclaimer: "Iron on low heat.",
    createdAt: "2026-08-06",
    images: ["/dress4.png", "/dress2.png", "/dress1.png"],
    image: "/dress4.png",
    collections: ["trending-now", "party-edit"],
    reviews: [
      {
        reviewId: "rev-401",
        productId: 4,
        customerName: "Simran Kaur",
        rating: 5,
        reviewDate: "11 Aug 2026",
        reviewText: "Outstanding quality for ₹299! The print looks royal and fabric feels silky soft.",
        images: ["/dress4.png"],
        verifiedPurchase: true
      }
    ]
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
    sizeInventory: { "S": 1, "M": 1, "L": 0, "XL": 1 },
    colors: ["Beige", "Black"],
    color: "Washed Vintage Black",
    fabric: "100% Heavyweight Cotton (220 GSM)",
    fitShape: "Oversized Boxy Fit",
    length: "Extended Length",
    neckCollar: "Thick Ribbed Crew Neck",
    sleeveStyling: "Drop Shoulder Extended Sleeves",
    printPatternType: "Gothic Typography Graphic",
    occasion: "Streetwear",
    sleeveLength: "Half Sleeves",
    pattern: "Graphic Printed Back & Chest",
    surfaceStyling: "Distressed Raw Hem Effect",
    netQuantity: 1,
    character: "Underground Street Culture",
    countryOfOrigin: "India",
    manufacturerInformation: "SATRASHE60 Streetwear Studio, Pune",
    importerInformation: "Not Applicable",
    packerInformation: "SATRASHE60 Central Fulfillment Hub",
    netWeight: "250g",
    supplierInformation: "Direct Cotton Mills Tirupur",
    contactInformation: "care@satrashe60.com",
    legalDisclaimer: "Do not iron directly on rubber graphic print.",
    createdAt: "2026-08-02",
    images: ["/dress1.png", "/dress3.png"],
    image: "/dress1.png",
    collections: ["street-style", "college-edit", "under-199"],
    reviews: [
      {
        reviewId: "rev-501",
        productId: 5,
        customerName: "Aakash M.",
        rating: 5,
        reviewDate: "09 Aug 2026",
        reviewText: "Heavy GSM fabric, perfect boxy fit, graphic print did not wash off.",
        images: ["/dress1.png"],
        verifiedPurchase: true
      }
    ]
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
    sizeInventory: { "S": 0, "M": 0, "L": 0, "XL": 0 },
    colors: ["Black", "Brown", "Red"],
    color: "Wine Maroon / Rust",
    fabric: "Georgette with Soft Lining",
    fitShape: "Peplum Flare",
    length: "Hip Length",
    neckCollar: "V-Neck with Ruffled Trim",
    sleeveStyling: "Flared Bell Sleeves",
    printPatternType: "Paisley Boho",
    occasion: "Casual / Evening",
    sleeveLength: "Three-Quarter",
    pattern: "Paisley All-Over",
    surfaceStyling: "Smocked Waist",
    netQuantity: 1,
    character: "Bohemian Gypsy",
    countryOfOrigin: "India",
    manufacturerInformation: "SATRASHE60 Apparels Pvt Ltd, Pune",
    importerInformation: "Not Applicable",
    packerInformation: "SATRASHE60 Logistics Center",
    netWeight: "170g",
    supplierInformation: "Verified Artisan Mills",
    contactInformation: "care@satrashe60.com",
    legalDisclaimer: "Dry clean or delicate cycle recommended.",
    createdAt: "2026-08-04",
    images: ["/dress2.png", "/dress4.png"],
    image: "/dress2.png",
    collections: ["daily-wear", "under-199"],
    reviews: [
      {
        reviewId: "rev-601",
        productId: 6,
        customerName: "Sneha G.",
        rating: 4,
        reviewDate: "03 Aug 2026",
        reviewText: "Very pretty wine shade. Hope SATRASHE60 restocks soon!",
        images: [],
        verifiedPurchase: true
      }
    ]
  }
];

const CATEGORIES = [
  { name: 'Tops', img: '/dress1.png' },
  { name: 'T-Shirts', img: '/dress2.png' },
  { name: 'Kurtis', img: '/dress3.png' },
  { name: 'One Pieces', img: '/dress4.png' },
  { name: 'Jeans', img: '/dress1.png' },
  { name: 'Track Pants', img: '/dress2.png' }
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
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [newThisWeekOnly, setNewThisWeekOnly] = useState(false);
  const [onlyOneLeftOnly, setOnlyOneLeftOnly] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  
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
      const matchesCat = (product.category || "").toLowerCase().includes(q);
      const matchesFab = (product.fabric || "").toLowerCase().includes(q);
      if (!matchesName && !matchesCat && !matchesFab) return false;
    }

    if (selectedCategory === "Under ₹199" && product.price >= 199) return false;
    if (selectedCategory !== "ALL" && selectedCategory !== "All Products" && selectedCategory !== "Under ₹199" && selectedCategory !== "New Arrivals" && selectedCategory !== "Best Sellers") {
      if ((product.category || "").toLowerCase() !== selectedCategory.toLowerCase()) return false;
    }
    
    if (selectedCategory === "New Arrivals" && !product.isNew) return false;
    if (selectedCategory === "Best Sellers" && !product.isBestSeller) return false;

    if (selectedSizes.length > 0) {
      const hasSize = (product.sizes || []).some(s => selectedSizes.includes(s));
      if (!hasSize) return false;
    }

    if (selectedPriceRanges.length > 0) {
      const matchesPrice = selectedPriceRanges.some(range => {
        if (range === "Under ₹199") return product.price < 199;
        if (range === "₹199–₹299") return product.price >= 199 && product.price <= 299;
        if (range === "₹299–₹499") return product.price >= 299 && product.price <= 499;
        if (range === "₹499+") return product.price > 499;
        return true;
      });
      if (!matchesPrice) return false;
    }

    if (selectedColors.length > 0) {
      const hasColor = (product.colors || []).some(c => selectedColors.includes(c));
      if (!hasColor) return false;
    }

    if (selectedFabrics.length > 0) {
      if (!selectedFabrics.includes(product.fabric)) return false;
    }

    if (newThisWeekOnly && !product.isNew) return false;
    if (onlyOneLeftOnly && product.stock !== 1) return false;
    if (selectedDiscount && product.discount < selectedDiscount) return false;

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
    setSelectedPriceRanges([]);
    setSelectedColors([]);
    setSelectedFabrics([]);
    setNewThisWeekOnly(false);
    setOnlyOneLeftOnly(false);
    setSelectedDiscount(null);
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
    <div className="premium-shop-container" style={{ backgroundColor: '#000000', minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* 🚀 1. LUXURY HEADER (Pill Nav & Center Logo) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', backgroundColor: '#000000', position: 'relative', borderBottom: '1px solid #1A1A1A' }}>
        
        {/* Left Side: Back & Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 10 }}>
          <button onClick={() => onNavigate('home')} style={{ background: 'transparent', border: '1px solid #D4AF37', borderRadius: '50%', width: '32px', height: '32px', color: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '18px' }}>
            ←
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', background: '#111111', borderRadius: '24px', padding: '3px', border: '1px solid #222222' }}>
            <button 
              onClick={() => onNavigate('home')} 
              style={{ background: 'transparent', color: '#D4AF37', border: '1px solid #D4AF37', borderRadius: '20px', padding: '6px 14px', fontSize: '11px', fontWeight: '800', letterSpacing: '1px', cursor: 'pointer', transition: 'all 0.3s ease' }}
            >
              HOME
            </button>
            <button 
              style={{ background: 'transparent', color: '#888888', border: 'none', padding: '6px 14px', fontSize: '11px', fontWeight: '800', letterSpacing: '1px', cursor: 'default' }}
            >
              SHOP
            </button>
          </div>
        </div>

        {/* Center: Small Fixed Logo */}
        <img 
          src="/logo.png" 
          alt="1760 SATRASHE60" 
          style={{ height: '38px', position: 'absolute', left: '50%', transform: 'translateX(-50%)', objectFit: 'contain', cursor: 'pointer', zIndex: 5 }} 
          onClick={() => onNavigate('home')}
        />

        {/* Right Side: Search Icon */}
        <button style={{ background: 'none', border: 'none', color: '#FFFFFF', fontSize: '20px', cursor: 'pointer', zIndex: 10 }}>
          🔍
        </button>
      </div>

      {/* 🚀 2. GOLD RING CATEGORIES SLIDER */}
      <div style={{ display: 'flex', gap: '18px', overflowX: 'auto', padding: '24px 20px', backgroundColor: '#000000', scrollbarWidth: 'none' }} className="hide-scrollbar">
        {CATEGORIES.map((cat, idx) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <div 
              key={idx} 
              onClick={() => setSelectedCategory(cat.name)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer', flexShrink: 0 }}
            >
              <div style={{ 
                width: '76px', 
                height: '76px', 
                borderRadius: '50%', 
                border: isSelected ? '2px solid #D4AF37' : '2px solid #333333', 
                padding: '3px',
                transition: 'all 0.3s ease',
                boxShadow: isSelected ? '0 0 10px rgba(212, 175, 55, 0.3)' : 'none'
              }}>
                <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              </div>
              <span style={{ color: isSelected ? '#D4AF37' : '#FFFFFF', fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px', transition: 'color 0.3s ease' }}>
                {cat.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* BANNER SECTION (Dark Theme) */}
      <div className="shop-premium-banner" style={{ margin: '0 20px 20px 20px', borderRadius: '8px' }}>
        <div className="banner-overlay" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 100%)' }}>
          <span className="banner-eyebrow" style={{ color: '#D4AF37' }}>TRENDING NOW</span>
          <h1 className="banner-title" style={{ color: '#FFF' }}>WOMEN'S<br/>COLLECTION</h1>
          <p className="banner-subtitle" style={{ color: '#CCC' }}>STREET STYLE / COMFORT / AFFORDABLE</p>
          <button className="banner-btn" style={{ borderColor: '#D4AF37', color: '#D4AF37' }} onClick={() => setSelectedCategory("ALL")}>EXPLORE NOW →</button>
        </div>
      </div>

      {/* FILTER & SORT BAR */}
      <div className="shop-controls-bar" style={{ backgroundColor: '#111111', borderBottom: '1px solid #222' }}>
        <button className="filter-btn" onClick={() => setShowMobileFilter(true)} style={{ color: '#D4AF37' }}>
          <span className="filter-icon">⎚</span> Filter
        </button>
        
        <div className="sort-wrapper">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select" style={{ color: '#FFF', backgroundColor: '#111' }}>
            <option value="Recommended">Sort By</option>
            <option value="Newest First">Newest</option>
            <option value="Price: Low to High">Price: Low - High</option>
            <option value="Price: High to Low">Price: High - Low</option>
          </select>
        </div>

        <div className="view-toggles">
          <button onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'active-view' : ''} style={{ color: viewMode === 'grid' ? '#D4AF37' : '#888' }}>⊞</button>
          <button onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'active-view' : ''} style={{ color: viewMode === 'list' ? '#D4AF37' : '#888' }}>⊟</button>
        </div>
      </div>

      {/* PRODUCT GRID */}
      {totalProductsCount === 0 ? (
        <div className="no-products-msg" style={{ color: '#FFF' }}>
          <h3>No products found for "{selectedCategory}"</h3>
          <button onClick={handleResetAll} className="reset-btn-gold">View All Products</button>
        </div>
      ) : (
        <div className={`premium-product-grid ${viewMode}`} style={{ padding: '20px' }}>
          {sortedProducts.map(product => {
            const isWishlisted = wishlist.includes(product.id || product._id);
            const discountPct = product.discount || Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) || 0;

            return (
              <div key={product.id || product._id} className="premium-shop-card" style={{ backgroundColor: '#111', border: '1px solid #222' }}>
                
                <div className="card-img-wrapper" onClick={() => onNavigate(`/product/${product.slug || product.name}`)}>
                  {product.isNew && <span className="card-badge badge-new" style={{ backgroundColor: '#D4AF37', color: '#000' }}>New</span>}
                  {product.isBestSeller && !product.isNew && <span className="card-badge badge-bestseller">Bestseller</span>}

                  <button 
                    className="card-wishlist-btn"
                    onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id || product._id); }}
                    style={{ color: isWishlisted ? '#D4AF37' : '#FFF', backgroundColor: 'rgba(0,0,0,0.5)' }}
                  >
                    {isWishlisted ? '♥' : '♡'}
                  </button>
                  <img src={product.image || product.images?.[0]} alt={product.name} />
                </div>

                <div className="card-info-box" style={{ padding: '12px' }}>
                  <h3 className="card-prod-title" style={{ color: '#FFF' }}>{product.name}</h3>
                  <div className="card-price-row">
                    <span className="card-current-price" style={{ color: '#FFF' }}>₹ {product.price}</span>
                    {product.oldPrice && <span className="card-old-price" style={{ color: '#666' }}>₹{product.oldPrice}</span>}
                    {discountPct > 0 && <span className="card-discount" style={{ color: '#D4AF37', backgroundColor: 'transparent', padding: 0 }}>({discountPct}% OFF)</span>}
                  </div>
                  <div className="card-rating" style={{ color: '#D4AF37' }}>
                    <span className="stars">★★★★★</span> <span className="reviews" style={{ color: '#888' }}>({product.reviews?.length || 124})</span>
                  </div>
                  
                  <button 
                    className="card-add-to-cart-btn"
                    style={{ border: '1px solid #D4AF37', backgroundColor: 'transparent', color: '#D4AF37', marginTop: '10px' }}
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setQuickAddProduct(product);
                      setSelectedSizeForAdd(null);
                      setSizeError("");
                      setAddedNotice(false);
                    }}
                  >
                    🛍 ADD TO CART
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* QUICK ADD TO CART MODAL */}
      {quickAddProduct && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(3px)' }}>
          <div style={{ backgroundColor: '#111', padding: '24px', borderRadius: '8px', width: '320px', textAlign: 'center', border: '1px solid #333' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px', color: '#fff' }}>
              SELECT SIZE
            </h3>
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
              <button 
                onClick={handleConfirmAddToCart}
                style={{ backgroundColor: '#D4AF37', color: '#000', border: 'none', padding: '12px', fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '4px' }}
              >
                CONFIRM
              </button>
              <button 
                onClick={() => setQuickAddProduct(null)}
                style={{ backgroundColor: 'transparent', color: '#888', border: 'none', padding: '8px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE FILTER OVERLAY */}
      {showMobileFilter && (
        <div className="mobile-filter-overlay" style={{ zIndex: 3000 }}>
          <div className="mobile-filter-content" style={{ backgroundColor: '#111', color: '#FFF' }}>
            <div className="filter-header" style={{ borderBottom: '1px solid #333' }}>
              <h3 style={{ color: '#D4AF37' }}>FILTERS</h3>
              <button onClick={() => setShowMobileFilter(false)} style={{ color: '#FFF' }}>✕</button>
            </div>
            
            <div className="filter-body" style={{ overflowY: 'auto' }}>
              <div style={{ paddingBottom: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#D4AF37', marginBottom: '10px' }}>CATEGORIES</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {["ALL", "Tops", "T-Shirts", "Kurtis", "One Pieces", "Co-ord Sets"].map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
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
              
              <div style={{ paddingTop: '10px', borderTop: '1px solid #333' }}>
                <button onClick={handleResetAll} style={{ background: 'none', border: 'none', color: '#FF3333', fontSize: '12px', padding: '10px 0', cursor: 'pointer', fontWeight: 'bold' }}>
                  Clear All Filters
                </button>
              </div>
            </div>

            <div className="filter-footer" style={{ borderTop: '1px solid #333', backgroundColor: '#111' }}>
              <button className="apply-filter-btn" onClick={() => setShowMobileFilter(false)} style={{ backgroundColor: '#D4AF37', color: '#000' }}>APPLY FILTERS</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}