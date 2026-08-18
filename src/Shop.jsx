import React, { useState, useEffect } from 'react';

// ==========================================================================
// MASTER PRODUCT DATABASE WITH EXPANDED PDP ATTRIBUTES & REVIEWS
// ==========================================================================
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

const COLOR_MAP = {
  "White": "#FFFFFF",
  "Beige": "#D2B48C",
  "Black": "#000000",
  "Brown": "#5C2C16",
  "Red": "#C15C5C"
};

export default function Shop({ 
  initialCategory = "ALL", 
  initialSearchQuery = "", 
  onNavigate, 
  wishlist = [], 
  onToggleWishlist, 
  onAddToCart 
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [newThisWeekOnly, setNewThisWeekOnly] = useState(false);
  const [onlyOneLeftOnly, setOnlyOneLeftOnly] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  
  const [sortBy, setSortBy] = useState("Newest First");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const itemsPerPage = 12;

  const [openAccordions, setOpenAccordions] = useState({
    category: true,
    size: false,
    price: false,
    color: true,
    fabric: false,
    newArrivals: true,
    onlyOneLeft: true,
    discount: false
  });

  const [quickAddProduct, setQuickAddProduct] = useState(null);
  const [selectedSizeForAdd, setSelectedSizeForAdd] = useState(null);
  const [sizeError, setSizeError] = useState("");
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const toggleAccordion = (section) => {
    setOpenAccordions(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const filteredProducts = MASTER_PRODUCTS.filter(product => {
    if (initialSearchQuery) {
      const q = initialSearchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(q);
      const matchesCat = product.category.toLowerCase().includes(q);
      const matchesFab = product.fabric.toLowerCase().includes(q);
      if (!matchesName && !matchesCat && !matchesFab) return false;
    }

    if (selectedCategory === "Under ₹199" && product.price >= 199) return false;
    if (selectedCategory !== "ALL" && selectedCategory !== "All Products" && selectedCategory !== "Under ₹199") {
      if (product.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    }

    if (selectedSizes.length > 0) {
      const hasSize = product.sizes.some(s => selectedSizes.includes(s));
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
      const hasColor = product.colors.some(c => selectedColors.includes(c));
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
    if (sortBy === "Price: Low → High") return a.price - b.price;
    if (sortBy === "Price: High → Low") return b.price - a.price;
    if (sortBy === "Most Popular" || sortBy === "Best Selling") return b.isBestSeller ? 1 : -1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const totalProductsCount = sortedProducts.length;
  const startIndex = (currentPageNum - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const activeChips = [];
  if (selectedCategory !== "ALL" && selectedCategory !== "All Products") activeChips.push({ type: 'category', label: selectedCategory });
  selectedSizes.forEach(s => activeChips.push({ type: 'size', label: `Size: ${s}`, value: s }));
  selectedPriceRanges.forEach(p => activeChips.push({ type: 'price', label: p, value: p }));
  selectedColors.forEach(c => activeChips.push({ type: 'color', label: c, value: c }));
  selectedFabrics.forEach(f => activeChips.push({ type: 'fabric', label: f, value: f }));
  if (newThisWeekOnly) activeChips.push({ type: 'newThisWeek', label: "New This Week" });
  if (onlyOneLeftOnly) activeChips.push({ type: 'onlyOneLeft', label: "Only 1 Left" });
  if (selectedDiscount) activeChips.push({ type: 'discount', label: `${selectedDiscount}%+ Off` });

  const handleRemoveChip = (chip) => {
    if (chip.type === 'category') setSelectedCategory("ALL");
    if (chip.type === 'size') setSelectedSizes(selectedSizes.filter(s => s !== chip.value));
    if (chip.type === 'price') setSelectedPriceRanges(selectedPriceRanges.filter(p => p !== chip.value));
    if (chip.type === 'color') setSelectedColors(selectedColors.filter(c => c !== chip.value));
    if (chip.type === 'fabric') setSelectedFabrics(selectedFabrics.filter(f => f !== chip.value));
    if (chip.type === 'newThisWeek') setNewThisWeekOnly(false);
    if (chip.type === 'onlyOneLeft') setOnlyOneLeftOnly(false);
    if (chip.type === 'discount') setSelectedDiscount(null);
  };

  const handleResetAll = () => {
    setSelectedCategory("ALL");
    setSelectedSizes([]);
    setSelectedPriceRanges([]);
    setSelectedColors([]);
    setSelectedFabrics([]);
    setNewThisWeekOnly(false);
    setOnlyOneLeftOnly(false);
    setSelectedDiscount(null);
    setSortBy("Newest First");
    setCurrentPageNum(1);
  };

  const handleOpenQuickAdd = (e, product) => {
    e.stopPropagation();
    if (product.stock === 0) return;
    setQuickAddProduct(product);
    setSelectedSizeForAdd(null);
    setSizeError("");
    setAddedNotice(false);
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
    <div style={{ backgroundColor: '#FAFAFA', color: '#111111', fontFamily: "'Inter', sans-serif", width: '100%', minHeight: '100vh' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '270px 1fr', minHeight: '100vh' }}>
        
        {/* LEFT DEEP BLACK SIDEBAR */}
        <aside style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '28px 20px', display: 'flex', flexDirection: 'column', gap: '20px', borderRight: '1px solid #1F1F1F' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #222222' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>FILTERS</span>
            <button onClick={handleResetAll} style={{ background: 'none', border: 'none', color: '#888888', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>
              Reset All ↻
            </button>
          </div>

          {/* CATEGORY ACCORDION */}
          <div style={{ borderBottom: '1px solid #1A1A1A', paddingBottom: '16px' }}>
            <div onClick={() => toggleAccordion('category')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px', marginBottom: openAccordions.category ? '14px' : '0', cursor: 'pointer', textTransform: 'uppercase' }}>
              CATEGORY <span>{openAccordions.category ? '—' : '+'}</span>
            </div>
            {openAccordions.category && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { name: "Tops", count: 48 },
                  { name: "Kurtis", count: 36 },
                  { name: "One Pieces", count: 28 },
                  { name: "Co-ord Sets", count: 22 },
                  { name: "Under ₹199", count: 18 },
                  { name: "All Products", count: 156 }
                ].map(item => (
                  <label key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: selectedCategory === item.name ? '#FF6B00' : '#CCCCCC', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={selectedCategory === item.name || (item.name === "All Products" && selectedCategory === "ALL")}
                      onChange={() => setSelectedCategory(item.name === "All Products" ? "ALL" : item.name)}
                      style={{ accentColor: '#FF6B00', width: '15px', height: '15px', cursor: 'pointer' }}
                    />
                    <span>{item.name} <span style={{ color: '#666666' }}>({item.count})</span></span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* SIZE ACCORDION */}
          <div style={{ borderBottom: '1px solid #1A1A1A', paddingBottom: '14px' }}>
            <div onClick={() => toggleAccordion('size')} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px', color: '#DDDDDD', cursor: 'pointer' }}>
              SIZE <span>{openAccordions.size ? '—' : '+'}</span>
            </div>
            {openAccordions.size && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                {["XS", "S", "M", "L", "XL", "XXL"].map(size => {
                  const isSel = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => {
                        if (isSel) setSelectedSizes(selectedSizes.filter(s => s !== size));
                        else setSelectedSizes([...selectedSizes, size]);
                      }}
                      style={{ padding: '6px 12px', border: '1px solid #333333', backgroundColor: isSel ? '#FF6B00' : 'transparent', color: '#FFFFFF', fontSize: '11px', fontWeight: '700', borderRadius: '3px', cursor: 'pointer' }}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* PRICE ACCORDION */}
          <div style={{ borderBottom: '1px solid #1A1A1A', paddingBottom: '14px' }}>
            <div onClick={() => toggleAccordion('price')} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px', color: '#DDDDDD', cursor: 'pointer' }}>
              PRICE <span>{openAccordions.price ? '—' : '+'}</span>
            </div>
            {openAccordions.price && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                {["Under ₹199", "₹199–₹299", "₹299–₹499", "₹499+"].map(range => (
                  <label key={range} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#CCCCCC', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={selectedPriceRanges.includes(range)}
                      onChange={() => {
                        if (selectedPriceRanges.includes(range)) setSelectedPriceRanges(selectedPriceRanges.filter(p => p !== range));
                        else setSelectedPriceRanges([...selectedPriceRanges, range]);
                      }}
                      style={{ accentColor: '#FF6B00', width: '15px', height: '15px' }}
                    />
                    <span>{range}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* COLOR SWATCHES */}
          <div style={{ borderBottom: '1px solid #1A1A1A', paddingBottom: '16px' }}>
            <div onClick={() => toggleAccordion('color')} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px', marginBottom: '12px', color: '#DDDDDD', cursor: 'pointer' }}>
              COLOR <span>{openAccordions.color ? '—' : '+'}</span>
            </div>
            {openAccordions.color && (
              <div style={{ display: 'flex', gap: '10px' }}>
                {Object.entries(COLOR_MAP).map(([colorName, hex]) => {
                  const isSel = selectedColors.includes(colorName);
                  return (
                    <span 
                      key={colorName} 
                      title={colorName}
                      onClick={() => {
                        if (isSel) setSelectedColors(selectedColors.filter(c => c !== colorName));
                        else setSelectedColors([...selectedColors, colorName]);
                      }}
                      style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: hex, border: isSel ? '2px solid #FF6B00' : '1px solid #444444', cursor: 'pointer', display: 'inline-block', boxShadow: isSel ? '0 0 6px #FF6B00' : 'none' }}
                    ></span>
                  );
                })}
              </div>
            )}
          </div>

          {/* FABRIC ACCORDION */}
          <div style={{ borderBottom: '1px solid #1A1A1A', paddingBottom: '14px' }}>
            <div onClick={() => toggleAccordion('fabric')} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px', color: '#DDDDDD', cursor: 'pointer' }}>
              FABRIC <span>{openAccordions.fabric ? '—' : '+'}</span>
            </div>
            {openAccordions.fabric && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                {["100% Pure Linen", "Ribbed Cotton Blend", "Cotton Viscose", "Premium Rayon Blend", "100% Heavyweight Cotton", "Georgette"].map(fab => (
                  <label key={fab} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#CCCCCC', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={selectedFabrics.includes(fab)}
                      onChange={() => {
                        if (selectedFabrics.includes(fab)) setSelectedFabrics(selectedFabrics.filter(f => f !== fab));
                        else setSelectedFabrics([...selectedFabrics, fab]);
                      }}
                      style={{ accentColor: '#FF6B00', width: '15px', height: '15px' }}
                    />
                    <span>{fab}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* NEW ARRIVALS */}
          <div style={{ borderBottom: '1px solid #1A1A1A', paddingBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px', marginBottom: '10px', color: '#DDDDDD' }}>NEW ARRIVALS</div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#CCCCCC', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={newThisWeekOnly}
                onChange={(e) => setNewThisWeekOnly(e.target.checked)}
                style={{ accentColor: '#FF6B00', width: '15px', height: '15px' }} 
              />
              <span>New This Week</span>
            </label>
          </div>

          {/* ONLY 1 LEFT */}
          <div style={{ borderBottom: '1px solid #1A1A1A', paddingBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px', marginBottom: '10px', color: '#DDDDDD' }}>ONLY 1 LEFT</div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#CCCCCC', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={onlyOneLeftOnly} 
                onChange={(e) => setOnlyOneLeftOnly(e.target.checked)}
                style={{ accentColor: '#FF6B00', width: '15px', height: '15px' }} 
              />
              <span>Show Only 1 Left</span>
            </label>
          </div>

          {/* EXCLUSIVE DROP ALERTS BOX */}
          <div style={{ marginTop: 'auto', backgroundColor: '#121212', border: '1px solid #222222', borderRadius: '8px', padding: '18px 14px', textAlign: 'center' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #333333', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto', fontSize: '16px' }}>
              🎁
            </div>
            <div style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
              EXCLUSIVE DROP ALERTS
            </div>
            <p style={{ fontSize: '10px', color: '#888888', marginBottom: '14px', lineHeight: '1.4' }}>
              Join the club & get early access to new drops and offers.
            </p>
            <button style={{ backgroundColor: '#111111', color: '#FF6B00', border: '1px solid #333333', padding: '10px 16px', width: '100%', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '4px' }}>
              JOIN THE CLUB
            </button>
          </div>
        </aside>

        {/* RIGHT MAIN SHOP CONTENT AREA */}
        <main style={{ padding: '30px 40px', backgroundColor: '#FAFAFA' }}>
          <div style={{ fontSize: '12px', color: '#888888', marginBottom: '14px' }}>
            <span onClick={() => onNavigate('/')} style={{ color: '#888888', cursor: 'pointer' }}>Home</span> › <span style={{ color: '#111111', fontWeight: '600' }}>Shop</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '32px', fontWeight: '900', letterSpacing: '-0.5px', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
                SHOP ALL
              </h1>
              <p style={{ fontSize: '12px', color: '#666666', margin: 0 }}>
                Showing {totalProductsCount === 0 ? '0' : `${startIndex + 1}–${Math.min(startIndex + itemsPerPage, totalProductsCount)}`} of {totalProductsCount} products
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '12px', color: '#666666' }}>Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '8px 14px', fontSize: '12px', fontWeight: '600', border: '1px solid #E0E0E0', borderRadius: '4px', background: '#FFFFFF', cursor: 'pointer' }}
              >
                <option value="Newest First">Newest First</option>
                <option value="Price: Low → High">Price: Low → High</option>
                <option value="Price: High → Low">Price: High → Low</option>
                <option value="Most Popular">Most Popular</option>
                <option value="Best Selling">Best Selling</option>
              </select>

              <div style={{ display: 'flex', border: '1px solid #E0E0E0', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
                <button 
                  onClick={() => setViewMode('grid')} 
                  style={{ padding: '8px 10px', background: viewMode === 'grid' ? '#0A0A0A' : '#FFFFFF', color: viewMode === 'grid' ? '#FFFFFF' : '#666666', border: 'none', cursor: 'pointer', fontSize: '12px' }}
                >
                  田
                </button>
                <button 
                  onClick={() => setViewMode('list')} 
                  style={{ padding: '8px 10px', background: viewMode === 'list' ? '#0A0A0A' : '#FFFFFF', color: viewMode === 'list' ? '#FFFFFF' : '#666666', border: 'none', cursor: 'pointer', fontSize: '12px' }}
                >
                  ☰
                </button>
              </div>
            </div>
          </div>

          {activeChips.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px', flexWrap: 'wrap' }}>
              {activeChips.map((chip, idx) => (
                <div key={idx} style={{ backgroundColor: '#EFEFEF', color: '#333333', padding: '6px 14px', fontSize: '11px', fontWeight: '600', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {chip.label}
                  <span onClick={() => handleRemoveChip(chip)} style={{ cursor: 'pointer', fontWeight: '800', color: '#888888' }}>✕</span>
                </div>
              ))}
              <button onClick={handleResetAll} style={{ background: 'none', border: 'none', color: '#FF6B00', fontSize: '11px', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}>
                Clear All
              </button>
            </div>
          )}

          {totalProductsCount === 0 ? (
            <div style={{ padding: '80px 0', textAlign: 'center', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E0E0E0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px' }}>NO PRODUCTS FOUND</h3>
              <p style={{ fontSize: '13px', color: '#666666', marginBottom: '24px' }}>Try resetting filters or searching with a different keyword.</p>
              <button onClick={handleResetAll} style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', border: 'none', padding: '12px 28px', fontSize: '12px', fontWeight: '800', cursor: 'pointer', borderRadius: '4px', letterSpacing: '1px' }}>
                CONTINUE SHOPPING
              </button>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: viewMode === 'grid' ? 'repeat(6, 1fr)' : '1fr', 
              gap: '16px', 
              marginBottom: '40px' 
            }}>
              {paginatedProducts.map(product => {
                const isWishlisted = wishlist.includes(product.id);
                return (
                  <div 
                    key={product.id} 
                    onClick={() => onNavigate(`/product/${product.slug}`)}
                    style={{ 
                      backgroundColor: '#FFFFFF', 
                      borderRadius: '4px', 
                      overflow: 'hidden', 
                      display: 'flex', 
                      flexDirection: viewMode === 'grid' ? 'column' : 'row',
                      border: '1px solid #E5E5E5',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ position: 'relative', width: viewMode === 'grid' ? '100%' : '180px', height: '220px', backgroundColor: '#F0F0F0', overflow: 'hidden' }}>
                      {product.isNew && (
                        <span style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: '#0A0A0A', color: '#FFFFFF', fontSize: '9px', fontWeight: '800', padding: '3px 6px', borderRadius: '2px', letterSpacing: '1px', zIndex: 2 }}>
                          NEW
                        </span>
                      )}

                      <button 
                        onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
                        style={{ position: 'absolute', top: '8px', right: '8px', background: 'none', border: 'none', color: isWishlisted ? '#FF6B00' : '#FFFFFF', fontSize: '16px', cursor: 'pointer', zIndex: 2, textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}
                      >
                        {isWishlisted ? '♥' : '♡'}
                      </button>

                      <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />

                      {product.stock === 1 ? (
                        <span style={{ position: 'absolute', bottom: '8px', left: '8px', backgroundColor: '#FF6B00', color: '#FFFFFF', fontSize: '8px', fontWeight: '800', padding: '3px 6px', borderRadius: '2px', letterSpacing: '0.5px', textTransform: 'uppercase', zIndex: 2 }}>
                          ONLY 1 LEFT
                        </span>
                      ) : product.stock === 0 ? (
                        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10, 10, 10, 0.75)', color: '#FFFFFF', fontSize: '11px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: '1px', zIndex: 2 }}>
                          SOLD OUT
                        </div>
                      ) : null}

                      {product.stock > 0 && (
                        <button 
                          onClick={(e) => handleOpenQuickAdd(e, product)}
                          style={{ position: 'absolute', bottom: '8px', right: '8px', backgroundColor: 'rgba(10, 10, 10, 0.85)', color: '#FFFFFF', width: '28px', height: '28px', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', cursor: 'pointer', zIndex: 2 }}
                        >
                          🛍️
                        </button>
                      )}
                    </div>

                    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                      <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111111', margin: '0 0 4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {product.name}
                      </h3>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '800', color: '#111111' }}>₹{product.price}</span>
                        <span style={{ fontSize: '10px', color: '#999999', textDecoration: 'line-through' }}>₹{product.oldPrice}</span>
                        <span style={{ fontSize: '9px', fontWeight: '800', color: '#FF6B00' }}>{product.discount}% OFF</span>
                      </div>

                      <div style={{ fontSize: '9px', color: '#666666', fontWeight: '600', marginBottom: '6px' }}>
                        Size: {product.sizes.join(" ")}
                      </div>

                      <div style={{ display: 'flex', gap: '5px' }}>
                        {product.colors.map((colorName, i) => (
                          <span key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: COLOR_MAP[colorName] || '#CCCCCC', border: '1px solid #CCCCCC', display: 'inline-block' }}></span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {totalProductsCount > itemsPerPage && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '30px' }}>
              <button 
                onClick={() => setCurrentPageNum(prev => Math.max(prev - 1, 1))}
                disabled={currentPageNum === 1}
                style={{ width: '32px', height: '32px', backgroundColor: '#EFEFEF', color: '#111111', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', opacity: currentPageNum === 1 ? 0.5 : 1 }}
              >
                ‹
              </button>

              {[...Array(Math.ceil(totalProductsCount / itemsPerPage))].map((_, idx) => {
                const page = idx + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPageNum(page)}
                    style={{ width: '32px', height: '32px', backgroundColor: currentPageNum === page ? '#0A0A0A' : '#EFEFEF', color: currentPageNum === page ? '#FFFFFF' : '#111111', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    {page}
                  </button>
                );
              })}

              <button 
                onClick={() => setCurrentPageNum(prev => Math.min(prev + 1, Math.ceil(totalProductsCount / itemsPerPage)))}
                disabled={currentPageNum === Math.ceil(totalProductsCount / itemsPerPage)}
                style={{ width: '32px', height: '32px', backgroundColor: '#EFEFEF', color: '#111111', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', opacity: currentPageNum === Math.ceil(totalProductsCount / itemsPerPage) ? 0.5 : 1 }}
              >
                ›
              </button>
            </div>
          )}
        </main>
      </div>

      {quickAddProduct && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(3px)' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '8px', width: '320px', textAlign: 'center', border: '1px solid #111' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px' }}>
              SELECT SIZE
            </h3>
            <p style={{ fontSize: '12px', color: '#666666', marginBottom: '16px' }}>{quickAddProduct.name}</p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
              {quickAddProduct.sizes.map(sz => (
                <button
                  key={sz}
                  onClick={() => { setSelectedSizeForAdd(sz); setSizeError(""); }}
                  style={{ width: '38px', height: '38px', border: selectedSizeForAdd === sz ? '2px solid #FF6B00' : '1px solid #CCCCCC', backgroundColor: selectedSizeForAdd === sz ? '#FF6B00' : '#FFFFFF', color: selectedSizeForAdd === sz ? '#FFFFFF' : '#111111', fontWeight: '800', borderRadius: '4px', cursor: 'pointer' }}
                >
                  {sz}
                </button>
              ))}
            </div>

            {sizeError && <div style={{ color: '#D92D20', fontSize: '11px', fontWeight: '700', marginBottom: '12px' }}>{sizeError}</div>}
            {addedNotice && <div style={{ color: '#008000', fontSize: '11px', fontWeight: '800', marginBottom: '12px' }}>Added to Bag ✓</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button 
                onClick={handleConfirmAddToCart}
                style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', border: 'none', padding: '12px', fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '4px' }}
              >
                ADD TO BAG
              </button>
              <button 
                onClick={() => setQuickAddProduct(null)}
                style={{ backgroundColor: 'transparent', color: '#666666', border: 'none', padding: '8px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM TRUST STRIP */}
      <div style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '18px 4%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', borderTop: '1px solid #1F1F1F' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '20px' }}>🚚</span>
          <div>
            <div style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>PAN INDIA DELIVERY</div>
            <div style={{ fontSize: '9px', color: '#888888' }}>Fast & Reliable</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '20px' }}>🛍️</span>
          <div>
            <div style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>NO RESTOCK</div>
            <div style={{ fontSize: '9px', color: '#888888' }}>Once it's gone, it may never return.</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '20px' }}>🏷️</span>
          <div>
            <div style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>BEST PRICES</div>
            <div style={{ fontSize: '9px', color: '#888888' }}>Everyday Affordable Fashion</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '20px' }}>🛡️</span>
          <div>
            <div style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>PREMIUM QUALITY</div>
            <div style={{ fontSize: '9px', color: '#888888' }}>Handpicked with Love</div>
          </div>
        </div>
      </div>
    </div>
  );
}