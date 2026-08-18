import React, { useState, useEffect } from 'react';

export default function ProductDetail({ 
  product, 
  onBack, 
  onAddToCart, 
  onBuyNow, 
  wishlist = [], 
  onToggleWishlist,
  sourceTitle = "Shop"
}) {
  if (!product) {
    return (
      <div style={{ padding: '100px 4%', textAlign: 'center', backgroundColor: '#FAFAFA', minHeight: '60vh' }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: '800', marginBottom: '12px' }}>PRODUCT NOT FOUND</h2>
        <p style={{ color: '#666666', fontSize: '13px', marginBottom: '24px' }}>The product you are looking for does not exist or has been removed.</p>
        <button onClick={onBack} style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '12px 28px', border: 'none', fontWeight: '800', cursor: 'pointer', borderRadius: '4px', letterSpacing: '1px' }}>
          CONTINUE SHOPPING
        </button>
      </div>
    );
  }

  const imageList = product.images && product.images.length > 0 
    ? product.images 
    : [product.image, "/dress2.png", "/dress3.png", "/dress4.png"].filter(Boolean);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState("");
  const [addedNotice, setAddedNotice] = useState(false);
  const [isAdditionalOpen, setIsAdditionalOpen] = useState(false);
  const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isReviewPhotoLightboxOpen, setIsReviewPhotoLightboxOpen] = useState(false);
  const [activeReviewPhotoIndex, setActiveReviewPhotoIndex] = useState(0);

  // Reviews Engine State
  const [reviewsList, setReviewsList] = useState(product.reviews || []);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewImages, setNewReviewImages] = useState([]);
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccessNotice, setReviewSuccessNotice] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const isOutOfStock = product.stock === 0;
  const isOnlyOneLeft = product.stock === 1;
  const maxAvailableStock = typeof product.stock === 'number' ? Math.max(product.stock, 1) : 5;

  // Aggregate Dynamic Ratings
  const totalReviewsCount = reviewsList.length;
  const averageRating = totalReviewsCount === 0 
    ? 5.0 
    : (reviewsList.reduce((acc, r) => acc + Number(r.rating || 5), 0) / totalReviewsCount).toFixed(1);

  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviewsList.forEach(r => {
    const star = Math.min(Math.max(Math.round(r.rating || 5), 1), 5);
    ratingCounts[star] = (ratingCounts[star] || 0) + 1;
  });

  const allCustomerPhotos = reviewsList.flatMap(r => r.images || []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLightboxOpen) {
        if (e.key === 'ArrowRight') setActiveImageIndex(prev => (prev + 1) % imageList.length);
        if (e.key === 'ArrowLeft') setActiveImageIndex(prev => (prev - 1 + imageList.length) % imageList.length);
        if (e.key === 'Escape') setIsLightboxOpen(false);
      }
      if (isReviewPhotoLightboxOpen) {
        if (e.key === 'ArrowRight') setActiveReviewPhotoIndex(prev => (prev + 1) % allCustomerPhotos.length);
        if (e.key === 'ArrowLeft') setActiveReviewPhotoIndex(prev => (prev - 1 + allCustomerPhotos.length) % allCustomerPhotos.length);
        if (e.key === 'Escape') setIsReviewPhotoLightboxOpen(false);
      }
      if (isMoreInfoModalOpen && e.key === 'Escape') {
        setIsMoreInfoModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, isReviewPhotoLightboxOpen, isMoreInfoModalOpen, imageList.length, allCustomerPhotos.length]);

  const handleIncreaseQty = () => {
    if (quantity < maxAvailableStock) setQuantity(prev => prev + 1);
  };

  const handleDecreaseQty = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCartClick = () => {
    if (isOutOfStock) return;
    if (!selectedSize) {
      setSizeError("Please select a size.");
      return;
    }
    setSizeError("");
    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      selectedSize: selectedSize,
      quantity: quantity,
      image: imageList[activeImageIndex] || product.image
    });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleBuyNowClick = () => {
    if (isOutOfStock) return;
    if (!selectedSize) {
      setSizeError("Please select a size.");
      return;
    }
    setSizeError("");
    onBuyNow({
      id: product.id,
      name: product.name,
      price: product.price,
      selectedSize: selectedSize,
      quantity: quantity,
      image: imageList[activeImageIndex] || product.image
    });
  };

  const handleReviewImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewReviewImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewRating) {
      setReviewError("Please select a rating.");
      return;
    }
    if (!newReviewText.trim()) {
      setReviewError("Please write your review.");
      return;
    }

    const newRevObj = {
      reviewId: "rev-" + Date.now(),
      productId: product.id,
      customerName: newReviewName.trim() || "Verified Buyer",
      rating: Number(newReviewRating),
      reviewDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      reviewText: newReviewText.trim(),
      images: newReviewImages,
      verifiedPurchase: true
    };

    setReviewsList([newRevObj, ...reviewsList]);
    setNewReviewText("");
    setNewReviewName("");
    setNewReviewImages([]);
    setReviewError("");
    setReviewSuccessNotice(true);
    setTimeout(() => setReviewSuccessNotice(false), 3000);
  };

  return (
    <div style={{ backgroundColor: '#FAFAFA', color: '#111111', fontFamily: "'Inter', sans-serif", width: '100%', minHeight: '100vh', padding: '24px 4% 80px 4%' }}>
      
      {/* BREADCRUMB */}
      <div style={{ maxWidth: '1280px', margin: '0 auto 24px auto', fontSize: '12px', color: '#888888', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span onClick={onBack} style={{ cursor: 'pointer', color: '#888888' }}>Home</span>
        <span>›</span>
        <span onClick={onBack} style={{ cursor: 'pointer', color: '#888888' }}>{sourceTitle || product.category || 'Shop'}</span>
        <span>›</span>
        <span style={{ color: '#111111', fontWeight: '700' }}>{product.name}</span>
      </div>

      {/* TWO COLUMN PRODUCT CONTAINER */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(340px, 1fr)', gap: '48px', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: IMAGE GALLERY */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div 
            style={{ position: 'relative', width: '100%', height: '540px', backgroundColor: '#F0F0F0', borderRadius: '6px', overflow: 'hidden', cursor: 'zoom-in', border: '1px solid #E5E5E5' }}
            onClick={() => setIsLightboxOpen(true)}
          >
            {product.isNew && (
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#0A0A0A', color: '#FFFFFF', fontSize: '10px', fontWeight: '800', padding: '4px 8px', borderRadius: '2px', letterSpacing: '1px', zIndex: 2 }}>
                NEW
              </span>
            )}

            {isOnlyOneLeft && !isOutOfStock && (
              <span style={{ position: 'absolute', bottom: '14px', left: '14px', backgroundColor: '#FF6B00', color: '#FFFFFF', fontSize: '9px', fontWeight: '800', padding: '4px 8px', borderRadius: '2px', letterSpacing: '0.5px', textTransform: 'uppercase', zIndex: 2 }}>
                ONLY 1 LEFT
              </span>
            )}

            {isOutOfStock && (
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10, 10, 10, 0.75)', color: '#FFFFFF', fontSize: '14px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: '2px', zIndex: 3 }}>
                SOLD OUT
              </div>
            )}

            <button 
              onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
              style={{ position: 'absolute', top: '14px', right: '14px', background: '#FFFFFF', border: 'none', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isWishlisted ? '#FF6B00' : '#111111', fontSize: '18px', cursor: 'pointer', zIndex: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
            >
              {isWishlisted ? '♥' : '♡'}
            </button>

            <img 
              src={imageList[activeImageIndex]} 
              alt={product.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
            />

            <div style={{ position: 'absolute', bottom: '14px', right: '14px', backgroundColor: 'rgba(0,0,0,0.6)', color: '#FFFFFF', fontSize: '11px', padding: '4px 8px', borderRadius: '4px' }}>
              🔍 Click to zoom
            </div>
          </div>

          {/* THUMBNAILS */}
          {imageList.length > 1 && (
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
              {imageList.map((imgUrl, idx) => {
                const isActive = idx === activeImageIndex;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{ width: '80px', height: '90px', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', border: isActive ? '2px solid #FF6B00' : '1px solid #E0E0E0', flexShrink: 0, opacity: isActive ? 1 : 0.65 }}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: DETAILS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '2px', color: '#999999', textTransform: 'uppercase' }}>
              {product.category || "STREET EDIT"}
            </span>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '32px', fontWeight: '900', textTransform: 'uppercase', margin: '6px 0 10px 0', letterSpacing: '-0.5px' }}>
              {product.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <span style={{ color: '#FF6B00', fontWeight: '800' }}>★ {averageRating}</span>
              <span style={{ color: '#888888' }}>({totalReviewsCount} Reviews)</span>
            </div>
          </div>

          {/* PRICE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid #EBEBEB' }}>
            <span style={{ fontSize: '26px', fontWeight: '900', color: '#111111' }}>₹{product.price}</span>
            <span style={{ fontSize: '16px', color: '#999999', textDecoration: 'line-through' }}>₹{product.mrp || product.oldPrice || (product.price * 3)}</span>
            <span style={{ fontSize: '13px', fontWeight: '800', color: '#FF6B00', backgroundColor: 'rgba(255,107,0,0.08)', padding: '4px 8px', borderRadius: '4px' }}>
              {product.discount || 70}% OFF
            </span>
          </div>

          {/* SIZE SELECTION */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>
                SELECT SIZE: {selectedSize && <strong style={{ color: '#FF6B00' }}>{selectedSize}</strong>}
              </span>
              <span style={{ fontSize: '11px', color: '#888888', textDecoration: 'underline', cursor: 'pointer' }}>Size Guide</span>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {(product.sizes || ["S", "M", "L", "XL"]).map(sz => {
                const isSelected = selectedSize === sz;
                const isSizeUnavailable = product.sizeInventory ? product.sizeInventory[sz] === 0 : isOutOfStock;

                return (
                  <button
                    key={sz}
                    disabled={isSizeUnavailable}
                    onClick={() => { setSelectedSize(sz); setSizeError(""); }}
                    style={{ 
                      width: '46px', 
                      height: '46px', 
                      borderRadius: '4px', 
                      border: isSelected ? '2px solid #FF6B00' : '1px solid #D5D5D5', 
                      backgroundColor: isSelected ? '#FF6B00' : isSizeUnavailable ? '#F0F0F0' : '#FFFFFF', 
                      color: isSelected ? '#FFFFFF' : isSizeUnavailable ? '#AAAAAA' : '#111111', 
                      fontWeight: '800', 
                      fontSize: '13px', 
                      cursor: isSizeUnavailable ? 'not-allowed' : 'pointer',
                      textDecoration: isSizeUnavailable ? 'line-through' : 'none'
                    }}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>

            {sizeError && (
              <p style={{ color: '#D92D20', fontSize: '12px', fontWeight: '700', marginTop: '8px' }}>{sizeError}</p>
            )}
          </div>

          {/* QUANTITY */}
          <div>
            <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              QUANTITY
            </span>
            <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #D5D5D5', borderRadius: '4px', backgroundColor: '#FFFFFF' }}>
              <button 
                onClick={handleDecreaseQty}
                disabled={quantity <= 1 || isOutOfStock}
                style={{ width: '36px', height: '36px', border: 'none', background: 'none', fontSize: '16px', fontWeight: '800', cursor: quantity <= 1 ? 'not-allowed' : 'pointer', color: quantity <= 1 ? '#CCC' : '#111' }}
              >
                −
              </button>
              <span style={{ width: '40px', textAlign: 'center', fontSize: '14px', fontWeight: '800' }}>{quantity}</span>
              <button 
                onClick={handleIncreaseQty}
                disabled={quantity >= maxAvailableStock || isOutOfStock}
                style={{ width: '36px', height: '36px', border: 'none', background: 'none', fontSize: '16px', fontWeight: '800', cursor: quantity >= maxAvailableStock ? 'not-allowed' : 'pointer', color: quantity >= maxAvailableStock ? '#CCC' : '#111' }}
              >
                +
              </button>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '6px' }}>
            <button
              onClick={handleAddToCartClick}
              disabled={isOutOfStock}
              style={{ backgroundColor: '#FFFFFF', color: isOutOfStock ? '#999999' : '#0A0A0A', border: '2px solid #0A0A0A', padding: '16px', fontSize: '12px', fontWeight: '900', letterSpacing: '1.5px', textTransform: 'uppercase', cursor: isOutOfStock ? 'not-allowed' : 'pointer', borderRadius: '4px' }}
            >
              {isOutOfStock ? 'SOLD OUT' : 'ADD TO CART'}
            </button>

            <button
              onClick={handleBuyNowClick}
              disabled={isOutOfStock}
              style={{ backgroundColor: isOutOfStock ? '#CCCCCC' : '#FF6B00', color: '#FFFFFF', border: 'none', padding: '16px', fontSize: '12px', fontWeight: '900', letterSpacing: '1.5px', textTransform: 'uppercase', cursor: isOutOfStock ? 'not-allowed' : 'pointer', borderRadius: '4px' }}
            >
              {isOutOfStock ? 'OUT OF STOCK' : 'BUY NOW ⚡'}
            </button>
          </div>

          {addedNotice && (
            <div style={{ backgroundColor: '#E8F5E9', border: '1px solid #C8E6C9', color: '#2E7D32', padding: '12px 16px', borderRadius: '4px', fontSize: '12px', fontWeight: '700', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Added to Cart ✓</span>
              <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => onBack()}>Continue Shopping</span>
            </div>
          )}

          {/* PRODUCT HIGHLIGHTS */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '6px', padding: '20px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '900', letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 14px 0', color: '#0A0A0A' }}>
              PRODUCT HIGHLIGHTS
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 20px', fontSize: '12px' }}>
              <div><span style={{ color: '#888888', display: 'block' }}>Color:</span><strong>{product.color || "Black"}</strong></div>
              <div><span style={{ color: '#888888', display: 'block' }}>Fabric:</span><strong>{product.fabric || "Cotton Blend"}</strong></div>
              <div><span style={{ color: '#888888', display: 'block' }}>Fit / Shape:</span><strong>{product.fitShape || "Regular Fit"}</strong></div>
              <div><span style={{ color: '#888888', display: 'block' }}>Length:</span><strong>{product.length || "Crop / Regular"}</strong></div>
            </div>
          </div>

          {/* ADDITIONAL DETAILS ACCORDION */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '6px', overflow: 'hidden' }}>
            <div 
              onClick={() => setIsAdditionalOpen(!isAdditionalOpen)}
              style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
            >
              <span style={{ fontSize: '12px', fontWeight: '900', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                ADDITIONAL DETAILS
              </span>
              <span style={{ fontSize: '14px', fontWeight: '800' }}>{isAdditionalOpen ? '—' : '+'}</span>
            </div>

            {isAdditionalOpen && (
              <div style={{ padding: '0 20px 20px 20px', borderTop: '1px solid #F0F0F0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 20px', fontSize: '12px', paddingTop: '16px' }}>
                  <div><span style={{ color: '#888888', display: 'block' }}>Neck / Collar:</span><strong>{product.neckCollar || "Round Neck"}</strong></div>
                  <div><span style={{ color: '#888888', display: 'block' }}>Sleeve Styling:</span><strong>{product.sleeveStyling || "Regular Sleeves"}</strong></div>
                  <div><span style={{ color: '#888888', display: 'block' }}>Print or Pattern Type:</span><strong>{product.printPatternType || "Solid / Printed"}</strong></div>
                  <div><span style={{ color: '#888888', display: 'block' }}>Occasion:</span><strong>{product.occasion || "Casual / Streetwear"}</strong></div>
                  <div><span style={{ color: '#888888', display: 'block' }}>Sleeve Length:</span><strong>{product.sleeveLength || "Short Sleeves"}</strong></div>
                  <div><span style={{ color: '#888888', display: 'block' }}>Pattern:</span><strong>{product.pattern || "Solid"}</strong></div>
                  <div><span style={{ color: '#888888', display: 'block' }}>Surface Styling:</span><strong>{product.surfaceStyling || "None"}</strong></div>
                  <div><span style={{ color: '#888888', display: 'block' }}>Net Quantity (N):</span><strong>{product.netQuantity || 1}</strong></div>
                  <div><span style={{ color: '#888888', display: 'block' }}>Character:</span><strong>{product.character || "None"}</strong></div>
                  <div><span style={{ color: '#888888', display: 'block' }}>Country of Origin:</span><strong>{product.countryOfOrigin || "India"}</strong></div>
                </div>

                <button
                  onClick={() => setIsMoreInfoModalOpen(true)}
                  style={{ marginTop: '20px', backgroundColor: '#F5F5F5', border: '1px solid #CCCCCC', color: '#111111', padding: '10px 16px', fontSize: '11px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '4px', width: '100%' }}
                >
                  MORE INFORMATION ➔
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RATINGS & REVIEWS SECTION */}
      <section style={{ maxWidth: '1280px', margin: '60px auto 0 auto', borderTop: '1px solid #E5E5E5', paddingTop: '40px' }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '24px' }}>
          PRODUCT RATINGS & REVIEWS
        </h2>

        {/* SUMMARY */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 320px) 1fr', gap: '40px', backgroundColor: '#FFFFFF', padding: '28px', borderRadius: '8px', border: '1px solid #E5E5E5', marginBottom: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRight: '1px solid #EEE', paddingRight: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: '900', color: '#0A0A0A', lineHeight: 1 }}>{averageRating}</div>
            <div style={{ color: '#FF6B00', fontSize: '20px', margin: '8px 0' }}>
              {"★".repeat(Math.round(averageRating)) + "☆".repeat(5 - Math.round(averageRating))}
            </div>
            <div style={{ fontSize: '12px', color: '#666666', fontWeight: '600' }}>
              Based on {totalReviewsCount} Reviews
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
            {[5, 4, 3, 2, 1].map(star => {
              const count = ratingCounts[star] || 0;
              const percentage = totalReviewsCount > 0 ? (count / totalReviewsCount) * 100 : 0;
              return (
                <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
                  <span style={{ width: '28px', fontWeight: '700' }}>{star} ★</span>
                  <div style={{ flex: 1, height: '8px', backgroundColor: '#EFEFEF', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: star >= 4 ? '#28a745' : star === 3 ? '#ffc107' : '#FF6B00', borderRadius: '4px' }}></div>
                  </div>
                  <span style={{ width: '32px', textAlign: 'right', color: '#888888' }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CUSTOMER PHOTOS */}
        {allCustomerPhotos.length > 0 && (
          <div style={{ marginBottom: '36px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '14px' }}>
              CUSTOMER PHOTOS ({allCustomerPhotos.length})
            </h3>
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
              {allCustomerPhotos.map((photoUrl, idx) => (
                <div 
                  key={idx} 
                  onClick={() => { setActiveReviewPhotoIndex(idx); setIsReviewPhotoLightboxOpen(true); }}
                  style={{ width: '90px', height: '90px', borderRadius: '6px', overflow: 'hidden', cursor: 'pointer', flexShrink: 0, border: '1px solid #E5E5E5' }}
                >
                  <img src={photoUrl} alt={`Customer review ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REVIEWS LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
          {reviewsList.map(rev => (
            <div key={rev.reviewId} style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '6px', border: '1px solid #E5E5E5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ backgroundColor: '#0A0A0A', color: '#FFF', fontSize: '11px', fontWeight: '800', padding: '2px 6px', borderRadius: '3px' }}>
                    {rev.rating} ★
                  </span>
                  <span style={{ fontWeight: '800', fontSize: '13px' }}>{rev.customerName}</span>
                  {rev.verifiedPurchase && (
                    <span style={{ color: '#28a745', fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      ✓ Verified Purchase
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '11px', color: '#999999' }}>{rev.reviewDate}</span>
              </div>

              <p style={{ fontSize: '13px', color: '#444444', lineHeight: 1.5, margin: '8px 0 12px 0' }}>
                "{rev.reviewText}"
              </p>

              {rev.images && rev.images.length > 0 && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  {rev.images.map((img, i) => (
                    <img key={i} src={img} alt="Customer" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #DDD' }} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* WRITE REVIEW FORM */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '28px', borderRadius: '8px', border: '1px solid #E5E5E5' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '900', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px' }}>
            WRITE A CUSTOMER REVIEW
          </h3>

          <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: '800', display: 'block', marginBottom: '6px' }}>SELECT RATING *</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map(st => (
                  <button 
                    type="button" 
                    key={st}
                    onClick={() => setNewReviewRating(st)}
                    style={{ backgroundColor: newReviewRating >= st ? '#FF6B00' : '#F0F0F0', color: newReviewRating >= st ? '#FFF' : '#333', border: 'none', width: '36px', height: '36px', borderRadius: '4px', fontWeight: '800', cursor: 'pointer' }}
                  >
                    {st}★
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', display: 'block', marginBottom: '6px' }}>YOUR NAME (OPTIONAL)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Priya S." 
                  value={newReviewName} 
                  onChange={(e) => setNewReviewName(e.target.value)} 
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #CCC', borderRadius: '4px', fontSize: '12px', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', display: 'block', marginBottom: '6px' }}>UPLOAD PRODUCT PHOTOS (OPTIONAL)</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  onChange={handleReviewImageUpload}
                  style={{ fontSize: '12px', padding: '6px 0' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: '800', display: 'block', marginBottom: '6px' }}>YOUR REVIEW *</label>
              <textarea 
                rows="3" 
                placeholder="How was the quality, fit and fabric?" 
                value={newReviewText} 
                onChange={(e) => setNewReviewText(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #CCC', borderRadius: '4px', fontSize: '12px', boxSizing: 'border-box' }}
              ></textarea>
            </div>

            {reviewError && <div style={{ color: '#D92D20', fontSize: '12px', fontWeight: '700' }}>{reviewError}</div>}
            {reviewSuccessNotice && <div style={{ color: '#28a745', fontSize: '12px', fontWeight: '800' }}>Thank you! Your review has been submitted ✓</div>}

            <button type="submit" style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', border: 'none', padding: '12px 24px', fontSize: '11px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', borderRadius: '4px', cursor: 'pointer', width: 'fit-content' }}>
              SUBMIT REVIEW
            </button>
          </form>
        </div>
      </section>

      {/* MORE INFORMATION MODAL */}
      {isMoreInfoModalOpen && (
        <div 
          onClick={() => setIsMoreInfoModalOpen(false)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', zIndex: 4000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', maxWidth: '580px', width: '100%', maxHeight: '85vh', overflowY: 'auto', border: '1px solid #111', position: 'relative' }}
          >
            <div style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 2 }}>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                MORE INFORMATION
              </h3>
              <button onClick={() => setIsMoreInfoModalOpen(false)} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '12px' }}>
              <div><span style={{ color: '#888888', display: 'block', fontWeight: '700', marginBottom: '2px' }}>Manufacturer Information</span><div>{product.manufacturerInformation || "SATRASHE60 Apparels Pvt Ltd, Maharashtra, India."}</div></div>
              <div><span style={{ color: '#888888', display: 'block', fontWeight: '700', marginBottom: '2px' }}>Importer Information</span><div>{product.importerInformation || "Not Applicable (Made in India)"}</div></div>
              <div><span style={{ color: '#888888', display: 'block', fontWeight: '700', marginBottom: '2px' }}>Packer Information</span><div>{product.packerInformation || "SATRASHE60 Logistics Center, Pune, Maharashtra - 411045"}</div></div>
              <div><span style={{ color: '#888888', display: 'block', fontWeight: '700', marginBottom: '2px' }}>Net Weight</span><div>{product.netWeight || "220g"}</div></div>
              <div><span style={{ color: '#888888', display: 'block', fontWeight: '700', marginBottom: '2px' }}>Supplier Information</span><div>{product.supplierInformation || "Verified Street Fashion Curators Hub India"}</div></div>
              <div><span style={{ color: '#888888', display: 'block', fontWeight: '700', marginBottom: '2px' }}>Contact Information</span><div>{product.contactInformation || "support@satrashe60.com | Mon–Sat (10 AM – 7 PM)"}</div></div>
              <div style={{ backgroundColor: '#F9F9F9', padding: '12px', borderRadius: '4px', border: '1px solid #EEE' }}><span style={{ color: '#888888', display: 'block', fontWeight: '700', marginBottom: '4px' }}>Legal Disclaimer</span><div style={{ color: '#666666', lineHeight: '1.5' }}>{product.legalDisclaimer || "Every effort is made to maintain the accuracy of all information. However, actual product packaging and materials may contain more and/or different information."}</div></div>
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX */}
      {isLightboxOpen && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.92)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
        >
          <button onClick={() => setIsLightboxOpen(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#FFF', fontSize: '32px', cursor: 'pointer' }}>✕</button>
          <button onClick={(e) => { e.stopPropagation(); setActiveImageIndex(prev => (prev - 1 + imageList.length) % imageList.length); }} style={{ position: 'absolute', left: '24px', background: 'rgba(255,255,255,0.2)', border: 'none', color: '#FFF', fontSize: '24px', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
          <img src={imageList[activeImageIndex]} alt={product.name} onClick={(e) => e.stopPropagation()} style={{ maxHeight: '85vh', maxWidth: '85vw', objectFit: 'contain', borderRadius: '4px' }} />
          <button onClick={(e) => { e.stopPropagation(); setActiveImageIndex(prev => (prev + 1) % imageList.length); }} style={{ position: 'absolute', right: '24px', background: 'rgba(255,255,255,0.2)', border: 'none', color: '#FFF', fontSize: '24px', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
        </div>
      )}

      {/* REVIEW PHOTO LIGHTBOX */}
      {isReviewPhotoLightboxOpen && allCustomerPhotos.length > 0 && (
        <div 
          onClick={() => setIsReviewPhotoLightboxOpen(false)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.92)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
        >
          <button onClick={() => setIsReviewPhotoLightboxOpen(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#FFF', fontSize: '32px', cursor: 'pointer' }}>✕</button>
          <button onClick={(e) => { e.stopPropagation(); setActiveReviewPhotoIndex(prev => (prev - 1 + allCustomerPhotos.length) % allCustomerPhotos.length); }} style={{ position: 'absolute', left: '24px', background: 'rgba(255,255,255,0.2)', border: 'none', color: '#FFF', fontSize: '24px', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
          <img src={allCustomerPhotos[activeReviewPhotoIndex]} alt="Review zoom" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '85vh', maxWidth: '85vw', objectFit: 'contain', borderRadius: '4px' }} />
          <button onClick={(e) => { e.stopPropagation(); setActiveReviewPhotoIndex(prev => (prev + 1) % allCustomerPhotos.length); }} style={{ position: 'absolute', right: '24px', background: 'rgba(255,255,255,0.2)', border: 'none', color: '#FFF', fontSize: '24px', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
        </div>
      )}

    </div>
  );
}