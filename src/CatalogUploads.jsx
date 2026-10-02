import React, { useState, useMemo } from 'react';
import { CATALOG_TAXONOMY } from './catalogTaxonomy';
import { MASTER_PRODUCTS } from './Shop';

export default function CatalogUploads({ onPublishProductToStore, onBackToDashboard }) {
  const [viewMode, setViewMode] = useState('list');
  const [activeUploadTypeTab, setActiveUploadTypeTab] = useState('SINGLE'); 
  const [statusFilter, setStatusFilter] = useState('ALL'); 

  const [targetFlowType, setTargetFlowType] = useState('SINGLE');
  const [selectedDepartment, setSelectedDepartment] = useState('WOMEN');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedProductType, setSelectedProductType] = useState(null);
const [formIsBestSeller, setFormIsBestSeller] = useState(false);
  const [showSizeDetails, setShowSizeDetails] = useState(false);
  const [formSizeMeasurements, setFormSizeMeasurements] = useState({ chest: '', shoulder: '', hip: '' });
  const [isSubmitting, setIsSubmitting] = useState(false); // Double click fix ke liye
  const [catalogs, setCatalogs] = useState([
    {
      id: "CAT-101",
      uploadType: "SINGLE",
      name: "Floral Shirt Top",
      sku: "SKU-FLR-TOP-01",
      price: 149,
      mrp: 499,
      discount: 70,
      stock: 1,
      department: "WOMEN",
      category: "Ethnic Wear",
      subcategory: "Kurtis, Sets & Fabrics",
      productType: "Kurtis",
      images: ["/dress1.png"],
      sizes: ["S", "M", "L"],
      color: "Multi / Floral",
      fabric: "Rayon Blend",
      status: "PUBLISHED",
      missingFields: [],
      createdAt: "10 Aug 2026"
    },
    {
      id: "CAT-103",
      uploadType: "SINGLE",
      name: "Tie Knot Casual Kurti",
      sku: "", 
      price: "",
      mrp: 599,
      discount: 0,
      stock: 0,
      department: "WOMEN",
      category: "Ethnic Wear",
      subcategory: "Kurtis, Sets & Fabrics",
      productType: "Kurtis",
      images: ["/dress3.png"],
      sizes: ["M"],
      color: "Sky Blue",
      fabric: "Cotton Linen",
      status: "ACTION REQUIRED",
      missingFields: ["SKU", "Selling Price", "Stock Quantity"],
      createdAt: "13 Aug 2026"
    }
  ]);

  const [activeEditingCatalogId, setActiveEditingCatalogId] = useState(null);
  // Mummy friendly start: Empty images array
  const [formImages, setFormImages] = useState([]); 
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formBrand, setFormBrand] = useState("SATRASHE60");
  const [formSku, setFormSku] = useState("");
  const [formSellingPrice, setFormSellingPrice] = useState("");
  const [formMrp, setFormMrp] = useState("");
  const [formStock, setFormStock] = useState("1");
  const [formSizes, setFormSizes] = useState(["Free Size"]);
  const [formColor, setFormColor] = useState("");
  const [formFabric, setFormFabric] = useState("");
  const [formFitShape, setFormFitShape] = useState("Regular Fit");
  const [formLength, setFormLength] = useState("Regular");
  const [formPattern, setFormPattern] = useState("Solid");
  const [formNeckCollar, setFormNeckCollar] = useState("Round Neck");
  const [formSleeveLength, setFormSleeveLength] = useState("Three-Quarter Sleeves");
  const [formWashCare, setFormWashCare] = useState("Machine Wash / Hand Wash Cold");
  const [formCountryOfOrigin, setFormCountryOfOrigin] = useState("India");
  const [formNetQuantity, setFormNetQuantity] = useState("1 N");
  const [formValidationErrors, setFormValidationErrors] = useState([]);
  const [showLivePreviewModal, setShowLivePreviewModal] = useState(false);

  const [bulkStep, setBulkStep] = useState(1);
  const [bulkValidationReport, setBulkValidationReport] = useState(null);

  const metrics = useMemo(() => {
    return {
      totalUploads: catalogs.length,
      bulkUploadsCount: catalogs.filter(c => c.uploadType === 'BULK').length,
      singleUploadsCount: catalogs.filter(c => c.uploadType === 'SINGLE').length
    };
  }, [catalogs]);

  const filteredCatalogs = useMemo(() => {
    return catalogs.filter(cat => {
      if (cat.uploadType !== activeUploadTypeTab) return false;
      if (statusFilter !== 'ALL' && cat.status !== statusFilter) return false;
      return true;
    });
  }, [catalogs, activeUploadTypeTab, statusFilter]);

  const calculatedDiscount = useMemo(() => {
    const sp = Number(formSellingPrice);
    const mrp = Number(formMrp);
    if (mrp > 0 && sp > 0 && mrp >= sp) {
      return Math.round(((mrp - sp) / mrp) * 100);
    }
    return 0;
  }, [formSellingPrice, formMrp]);

  const handleStartFlow = (type) => {
    setTargetFlowType(type);
    setSelectedDepartment('WOMEN');
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSelectedProductType(null);
    setViewMode('select-category');
  };

  const handleSelectProductType = (prodType) => {
    setSelectedProductType(prodType);
    if (targetFlowType === 'SINGLE') {
      setActiveEditingCatalogId(null);
      setFormImages([]);
      setFormName("");
      setFormDescription("");
      setFormSku(`SKU-SATRA-${Math.floor(1000 + Math.random() * 9000)}`);
      setFormSellingPrice("");
      setFormMrp("");
      setFormStock("1");
      setFormSizes(["Free Size"]);
      setFormColor("");
      setFormFabric("");
      setFormValidationErrors([]);
      setViewMode('single-form');
    } else {
      setBulkStep(1);
      setBulkValidationReport(null);
      setViewMode('bulk-wizard');
    }
  };

  const handleOpenActionRequiredOrDraft = (catalog) => {
    setActiveEditingCatalogId(catalog.id);
    setSelectedDepartment(catalog.department || 'WOMEN');
    setSelectedCategory(catalog.category || 'Ethnic Wear');
    setSelectedSubcategory(catalog.subcategory || 'Kurtis, Sets & Fabrics');
    setSelectedProductType(catalog.productType || 'Kurtis');
    setFormImages(catalog.images && catalog.images.length > 0 ? catalog.images : []);
    setFormName(catalog.name || "");
    setFormDescription(catalog.description || "");
    setFormSku(catalog.sku || `SKU-SATRA-${Math.floor(1000 + Math.random() * 9000)}`);
    setFormSellingPrice(catalog.price ? String(catalog.price) : "");
    setFormMrp(catalog.mrp ? String(catalog.mrp) : "");
    setFormStock(catalog.stock !== undefined ? String(catalog.stock) : "1");
    setFormSizes(catalog.sizes || ["Free Size"]);
    setFormColor(catalog.color || "");
    setFormFabric(catalog.fabric || "");
    setFormValidationErrors(catalog.missingFields || []);
    setViewMode('single-form');
  };

  const handleImageAdd = (e) => {
    if (formImages.length >= 6) {
      alert("Aap maximum 6 photos hi daal sakte hain!");
      return;
    }
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleValidateForm = () => {
    const missing = [];
    if (!formName.trim()) missing.push("Product Name");
    if (!formSku.trim()) missing.push("SKU");
    if (!formSellingPrice || Number(formSellingPrice) <= 0) missing.push("Selling Price");
    if (!formMrp || Number(formMrp) <= 0) missing.push("MRP");
    if (formStock === "" || Number(formStock) < 0) missing.push("Stock Quantity");
    if (formImages.length === 0) missing.push("Product Image");
    if (!formColor.trim()) missing.push("Color");
    if (!formFabric.trim()) missing.push("Fabric Details");

    setFormValidationErrors(missing);
    return missing;
  };

  const handleSaveAsDraft = () => {
    const draftId = activeEditingCatalogId || `CAT-DRF-${Date.now()}`;
    const newDraftCatalog = {
      id: draftId,
      uploadType: "SINGLE",
      name: formName.trim() || "Untitled Product Draft",
      sku: formSku.trim(),
      price: Number(formSellingPrice) || 0,
      mrp: Number(formMrp) || 0,
      discount: calculatedDiscount,
      stock: Number(formStock) || 0,
      department: selectedDepartment,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      productType: selectedProductType,
      images: formImages,
      sizes: formSizes,
      color: formColor,
      fabric: formFabric,
      status: "DRAFT",
      missingFields: [],
      createdAt: new Date().toLocaleDateString('en-GB')
    };

    setCatalogs(prev => {
      const exists = prev.some(c => c.id === draftId);
      if (exists) return prev.map(c => c.id === draftId ? newDraftCatalog : c);
      return [newDraftCatalog, ...prev];
    });

    alert("✓ Saved as DRAFT.");
    setViewMode('list');
  };

  const handlePublishSingleProduct = async () => {
    // 🚀 Double Click Fix: Agar pehle se save ho raha hai toh ruk jao
    if (isSubmitting) return;

    const missing = handleValidateForm();
    if (missing.length > 0) {
      alert(`Cannot publish. Required fields missing:\n- ${missing.join('\n- ')}`);
      return;
    }

    setIsSubmitting(true); // Button disable ho jayega

    try {
      // 🚀 Fake delay dikhane ke liye (Aap isko hata sakte hain backend active hone par)
      await new Promise(resolve => setTimeout(resolve, 2000));

      const pubId = activeEditingCatalogId || `CAT-${Math.floor(1000 + Math.random() * 9000)}`;
      
      const newProductData = {
        id: pubId,
        slug: formName.toLowerCase().replace(/\s+/g, '-'),
        name: formName.trim(),
        price: Number(formSellingPrice),
        mrp: Number(formMrp),
        discount: calculatedDiscount,
        stock: Number(formStock),
        image: formImages[0] || "/dress1.png", 
        category: selectedProductType === 'Manual' ? formPattern : selectedProductType, // Form Pattern used as custom category input
        isNew: true,
        sizes: formSizes,
        colors: [formColor || "Standard"],
        fabric: formFabric,
        isBestSeller: formIsBestSeller, // 🚀 Best seller added
        measurements: showSizeDetails ? formSizeMeasurements : null, // 🚀 Measurements added
        description: formDescription || "Premium quality product.",
      };

      // 🚀 Backend API Call
      const response = await fetch('https://satrashe60-ecommerce.onrender.com/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProductData)
      });
      const data = await response.json();

      if(data.product) {
        alert(`✓ Kapda "${formName}" website par LIVE ho gaya hai!`);
        
        setFormName("");
        setFormImages([]);
        setViewMode('list');
        
        if (onPublishProductToStore) {
          onPublishProductToStore(newProductData);
        }
      } else {
        alert("Server se error aayi: " + data.message);
      }
    } catch (error) {
      console.error("Publishing Failed:", error);
      alert("Network Error: Kapda publish nahi ho paya.");
    } finally {
      setIsSubmitting(false); // Process khatam, button wapas active
    }
  };

  return (
    <div style={{ padding: '24px 30px', display: 'flex', flexDirection: 'column', gap: '22px', maxWidth: '1400px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
      
      {viewMode === 'list' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: '900', color: '#111827', margin: '0 0 2px 0' }}>
                CATALOG UPLOADS MANAGEMENT
              </h1>
              <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>
                Focused step-by-step product creator and catalog manager.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => handleStartFlow('BULK')}
                style={{ backgroundColor: '#FFFFFF', color: '#111827', border: '1px solid #D1D5DB', padding: '9px 18px', borderRadius: '4px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
              >
                📁 ADD CATALOG IN BULK
              </button>
              <button
                onClick={() => handleStartFlow('SINGLE')}
                style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', border: 'none', padding: '9px 18px', borderRadius: '4px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
              >
                ➕ ADD SINGLE CATALOG
              </button>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
              OVERVIEW
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '18px', borderLeft: '4px solid #0A0A0A' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#6B7280' }}>TOTAL UPLOADS</div>
                <div style={{ fontSize: '26px', fontWeight: '900', color: '#111827', margin: '4px 0 2px 0' }}>{metrics.totalUploads}</div>
              </div>
              <div onClick={() => setActiveUploadTypeTab('BULK')} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '18px', borderLeft: '4px solid #3B82F6', cursor: 'pointer' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#3B82F6' }}>USING BULK UPLOADS</div>
                <div style={{ fontSize: '26px', fontWeight: '900', color: '#111827', margin: '4px 0 2px 0' }}>{metrics.bulkUploadsCount}</div>
              </div>
              <div onClick={() => setActiveUploadTypeTab('SINGLE')} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '18px', borderLeft: '4px solid #FF6B00', cursor: 'pointer' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#FF6B00' }}>USING SINGLE UPLOADS</div>
                <div style={{ fontSize: '26px', fontWeight: '900', color: '#111827', margin: '4px 0 2px 0' }}>{metrics.singleUploadsCount}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #E5E7EB', paddingBottom: '8px' }}>
            {['SINGLE', 'BULK'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveUploadTypeTab(tab)}
                style={{
                  padding: '8px 18px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: activeUploadTypeTab === tab ? '#0A0A0A' : '#FFFFFF',
                  color: activeUploadTypeTab === tab ? '#FFFFFF' : '#4B5563',
                  fontWeight: '800',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                {tab} UPLOADS
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['ALL', 'ACTION REQUIRED', 'DRAFT', 'PUBLISHED'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '4px',
                  backgroundColor: statusFilter === st ? '#111827' : '#FFFFFF',
                  color: statusFilter === st ? '#FFFFFF' : '#374151',
                  fontSize: '11px',
                  fontWeight: '800',
                  cursor: 'pointer'
                }}
              >
                {st}
              </button>
            ))}
          </div>

          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
            {filteredCatalogs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '50px 20px', color: '#6B7280' }}>
                <div style={{ fontSize: '28px', marginBottom: '6px' }}>📁</div>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#111827' }}>No catalogs found</div>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#6B7280', fontSize: '11px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '12px 14px' }}>Ref</th>
                    <th style={{ padding: '12px 14px' }}>Product & Category</th>
                    <th style={{ padding: '12px 14px' }}>Price & Stock</th>
                    <th style={{ padding: '12px 14px' }}>Status</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCatalogs.map(catalog => (
                    <tr key={catalog.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '12px 14px', fontWeight: '900' }}>{catalog.id}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={catalog.images[0] || '/dress1.png'} alt="" style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '4px' }} />
                          <div>
                            <div style={{ fontWeight: '800' }}>{catalog.name}</div>
                            <div style={{ fontSize: '10px', color: '#6B7280' }}>{catalog.category} › {catalog.productType}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px', fontWeight: '900' }}>₹{catalog.price || 0}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{
                          backgroundColor: catalog.status === 'PUBLISHED' ? '#DEF7EC' : (catalog.status === 'ACTION REQUIRED' ? '#FEE2E2' : '#FEF3C7'),
                          color: catalog.status === 'PUBLISHED' ? '#03543F' : (catalog.status === 'ACTION REQUIRED' ? '#B91C1C' : '#92400E'),
                          padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: '800'
                        }}>
                          {catalog.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                        <button
                          onClick={() => handleOpenActionRequiredOrDraft(catalog)}
                          style={{ backgroundColor: catalog.status === 'ACTION REQUIRED' ? '#EF4444' : '#0A0A0A', color: '#FFFFFF', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: '800', cursor: 'pointer' }}
                        >
                          {catalog.status === 'ACTION REQUIRED' ? 'Resolve →' : 'Edit →'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      {viewMode === 'select-category' && (
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '24px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #F3F4F6', paddingBottom: '14px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#FF6B00', textTransform: 'uppercase' }}>FOCUSED SELECTION ({targetFlowType})</span>
              <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#111827', margin: 0 }}>Select Product Category & Type</h2>
            </div>
            <button onClick={() => setViewMode('list')} style={{ background: 'none', border: '1px solid #CCC', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '11px' }}>✕ Close</button>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '11px', fontWeight: '800', color: '#6B7280', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>1. Department</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['WOMEN', 'KIDZ'].map(dept => (
                <button
                  key={dept}
                  onClick={() => { setSelectedDepartment(dept); setSelectedCategory(null); setSelectedSubcategory(null); setSelectedProductType(null); }}
                  style={{
                    padding: '8px 20px', borderRadius: '4px', border: 'none', fontWeight: '800', fontSize: '12px', cursor: 'pointer',
                    backgroundColor: selectedDepartment === dept ? '#0A0A0A' : '#F3F4F6',
                    color: selectedDepartment === dept ? '#FFF' : '#333'
                  }}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '11px', fontWeight: '800', color: '#6B7280', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>2. Category</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '8px' }}>
              {Object.keys(CATALOG_TAXONOMY[selectedDepartment].categories).map(cat => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setSelectedSubcategory(null); setSelectedProductType(null); }}
                  style={{
                    padding: '10px 12px', borderRadius: '6px', textAlign: 'left', fontWeight: '700', fontSize: '12px', cursor: 'pointer',
                    backgroundColor: selectedCategory === cat ? '#FFF4EC' : '#F9FAFB',
                    border: selectedCategory === cat ? '2px solid #FF6B00' : '1px solid #E5E7EB',
                    color: selectedCategory === cat ? '#FF6B00' : '#111'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {selectedCategory && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '11px', fontWeight: '800', color: '#6B7280', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>3. Subcategory</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                {Object.keys(CATALOG_TAXONOMY[selectedDepartment].categories[selectedCategory].subcategories).map(sub => (
                  <button
                    key={sub}
                    onClick={() => { setSelectedSubcategory(sub); setSelectedProductType(null); }}
                    style={{
                      padding: '10px 12px', borderRadius: '6px', textAlign: 'left', fontWeight: '700', fontSize: '12px', cursor: 'pointer',
                      backgroundColor: selectedSubcategory === sub ? '#FFF4EC' : '#F9FAFB',
                      border: selectedSubcategory === sub ? '2px solid #FF6B00' : '1px solid #E5E7EB',
                      color: selectedSubcategory === sub ? '#FF6B00' : '#111'
                    }}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedSubcategory && (
            <div style={{ backgroundColor: '#F9FAFB', padding: '16px', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
              <label style={{ fontSize: '11px', fontWeight: '800', color: '#374151', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>4. Select Product Type to Open Form</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {CATALOG_TAXONOMY[selectedDepartment].categories[selectedCategory].subcategories[selectedSubcategory].map(pt => (
                  <button
                    key={pt}
                    onClick={() => handleSelectProductType(pt)}
                    style={{
                      padding: '10px 16px', borderRadius: '6px', border: 'none', backgroundColor: '#0A0A0A', color: '#FFF', fontWeight: '900', fontSize: '12px', cursor: 'pointer'
                    }}
                  >
                    {pt} →
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {viewMode === 'single-form' && (
        <div style={{ backgroundColor: '#000', color: '#FFF', padding: '20px', fontFamily: "'Inter', sans-serif", borderRadius: '8px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <div>
              <h2 style={{ margin: '0 0 5px 0', color: '#FFF', fontSize: '20px' }}>
                {activeEditingCatalogId ? `EDIT CATALOG REF: ${activeEditingCatalogId}` : 'Add New Product'}
              </h2>
              <p style={{ margin: 0, color: '#888', fontSize: '12px' }}>Fill in the details to add a new product to your store.</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={() => setViewMode('list')} style={{ background: 'transparent', border: '1px solid #333', color: '#FFF', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>✕ Cancel</button>
              <button type="button" onClick={handleSaveAsDraft} style={{ backgroundColor: '#333', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>💾 Save as Draft</button>
              
              {/* 🚀 PUBLISH BUTTON FIX */}
              <button 
                type="button"
                onClick={handlePublishSingleProduct} 
                disabled={isSubmitting}
                style={{ 
                  background: isSubmitting ? '#555' : '#D4AF37', 
                  color: isSubmitting ? '#CCC' : '#000', 
                  border: 'none', 
                  padding: '8px 20px', 
                  borderRadius: '4px', 
                  fontWeight: 'bold', 
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px'
                }}
              >
                {isSubmitting ? '⏳ Processing...' : '📤 Publish Product'}
              </button>
            </div>
          </div>

          {formValidationErrors.length > 0 && (
            <div style={{ backgroundColor: '#4a0000', border: '1px solid #ff4d4d', padding: '12px 18px', borderRadius: '6px', color: '#ff4d4d', fontSize: '12px', fontWeight: '700', marginBottom: '20px' }}>
              ⚠️ Missing Required Fields: {formValidationErrors.join(', ')}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
            
            {/* LEFT COLUMN */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* 1. Basic Details */}
              <div style={{ background: '#0A0A0A', padding: '20px', borderRadius: '8px', border: '1px solid #222' }}>
                <h3 style={{ fontSize: '14px', color: '#D4AF37', margin: '0 0 15px 0' }}>1. Product Basic Details</h3>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#CCC', marginBottom: '5px' }}>Product Name *</label>
                    <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="e.g. Classic Black Kurti" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid #333', color: '#FFF', borderRadius: '4px', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#CCC', marginBottom: '5px' }}>Product SKU *</label>
                    <input type="text" value={formSku} onChange={(e) => setFormSku(e.target.value)} placeholder="e.g. SKT-001" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid #333', color: '#FFF', borderRadius: '4px', boxSizing: 'border-box' }} />
                  </div>
                </div>
                
                {/* 🚀 BEST SELLER TOGGLE */}
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={formIsBestSeller} onChange={(e) => setFormIsBestSeller(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: '#D4AF37' }} />
                  <span style={{ fontSize: '13px', color: '#FFF', fontWeight: 'bold' }}>👑 Mark as Best Seller</span>
                </label>
                <p style={{ fontSize: '10px', color: '#888', margin: '5px 0 0 25px' }}>If enabled, this product will show in the Best Seller section directly.</p>
              </div>

              {/* 3. Pricing & Stock */}
              <div style={{ background: '#0A0A0A', padding: '20px', borderRadius: '8px', border: '1px solid #222' }}>
                <h3 style={{ fontSize: '14px', color: '#D4AF37', margin: '0 0 15px 0' }}>3. Pricing & Stock</h3>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#CCC', marginBottom: '5px' }}>Selling Price (Grahak ke liye) ₹ *</label>
                    <input type="number" value={formSellingPrice} onChange={(e) => setFormSellingPrice(e.target.value)} placeholder="e.g. 999" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid #333', color: '#FFF', borderRadius: '4px', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#CCC', marginBottom: '5px' }}>MRP (Print Price) ₹ *</label>
                    <input type="number" value={formMrp} onChange={(e) => setFormMrp(e.target.value)} placeholder="e.g. 1499" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid #333', color: '#FFF', borderRadius: '4px', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#CCC', marginBottom: '5px' }}>Quantity *</label>
                    <input type="number" value={formStock} onChange={(e) => setFormStock(e.target.value)} placeholder="e.g. 50" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid #333', color: '#FFF', borderRadius: '4px', boxSizing: 'border-box' }} />
                  </div>
                </div>
              </div>

              {/* 4. Size & Measurements */}
              <div style={{ background: '#0A0A0A', padding: '20px', borderRadius: '8px', border: '1px solid #222' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '14px', color: '#D4AF37', margin: 0 }}>4. Size & Measurements</h3>
                    {/* 🚀 ADD SIZE DETAILS TOGGLE */}
                    <button type="button" onClick={() => setShowSizeDetails(!showSizeDetails)} style={{ background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>
                      {showSizeDetails ? '- Hide Details' : '+ Add Size Details'}
                    </button>
                </div>
                
                <label style={{ display: 'block', fontSize: '12px', color: '#CCC', marginBottom: '10px' }}>Select Size *</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '15px' }}>
                  {["XS", "S", "M", "L", "XL", "XXL", "XXXL", "4XL"].map(sz => (
                    <button 
                      type="button"
                      key={sz} 
                      onClick={() => setFormSizes(prev => prev.includes(sz) ? prev.filter(s => s !== sz) : [...prev, sz])}
                      style={{ background: formSizes.includes(sz) ? '#D4AF37' : '#111', color: formSizes.includes(sz) ? '#000' : '#FFF', border: `1px solid ${formSizes.includes(sz) ? '#D4AF37' : '#333'}`, padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                {/* 🚀 DETAILED SIZE BOX */}
                {showSizeDetails && (
                  <div style={{ background: '#111', padding: '15px', borderRadius: '6px', border: '1px dashed #444' }}>
                    <p style={{ fontSize: '11px', color: '#D4AF37', margin: '0 0 10px 0' }}>Enter manual measurements for perfect fit details:</p>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '11px', color: '#888' }}>Chest (in)</label>
                        <input type="text" placeholder="e.g. 32" value={formSizeMeasurements.chest} onChange={(e) => setFormSizeMeasurements({...formSizeMeasurements, chest: e.target.value})} style={{ width: '100%', padding: '8px', background: '#000', border: '1px solid #333', color: '#FFF', borderRadius: '4px', marginTop: '4px', boxSizing: 'border-box' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '11px', color: '#888' }}>Shoulder (in)</label>
                        <input type="text" placeholder="e.g. 14" value={formSizeMeasurements.shoulder} onChange={(e) => setFormSizeMeasurements({...formSizeMeasurements, shoulder: e.target.value})} style={{ width: '100%', padding: '8px', background: '#000', border: '1px solid #333', color: '#FFF', borderRadius: '4px', marginTop: '4px', boxSizing: 'border-box' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '11px', color: '#888' }}>Hip (in)</label>
                        <input type="text" placeholder="e.g. 34" value={formSizeMeasurements.hip} onChange={(e) => setFormSizeMeasurements({...formSizeMeasurements, hip: e.target.value})} style={{ width: '100%', padding: '8px', background: '#000', border: '1px solid #333', color: '#FFF', borderRadius: '4px', marginTop: '4px', boxSizing: 'border-box' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* 2. Category & Product Type */}
              <div style={{ background: '#0A0A0A', padding: '20px', borderRadius: '8px', border: '1px solid #222' }}>
                <h3 style={{ fontSize: '14px', color: '#D4AF37', margin: '0 0 15px 0' }}>2. Category & Product Type</h3>
                <label style={{ display: 'block', fontSize: '12px', color: '#CCC', marginBottom: '5px' }}>Kapde ki Category Chunein *</label>
                <select value={selectedProductType || ''} onChange={(e) => setSelectedProductType(e.target.value)} style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid #333', color: '#FFF', borderRadius: '4px', marginBottom: selectedProductType === 'Manual' ? '15px' : '0', boxSizing: 'border-box' }}>
                  <option value="" disabled>Select Category</option>
                  <option value="Kurti">Kurti</option>
                  <option value="Onepiece">Onepiece</option>
                  <option value="Top">Top</option>
                  <option value="T Shirt">T Shirt</option>
                  <option value="Shirt">Shirt</option>
                  <option value="Crop Top">Crop Top</option>
                  <option value="Manual">Manual</option>
                </select>
                
                {/* 🚀 MANUAL CATEGORY INPUT */}
                {selectedProductType === 'Manual' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#D4AF37', marginBottom: '5px' }}>Manual Category *</label>
                    <input type="text" value={formPattern} onChange={(e) => setFormPattern(e.target.value)} placeholder="Type custom category name..." style={{ width: '100%', padding: '10px', background: '#111', border: '1px dashed #D4AF37', color: '#FFF', borderRadius: '4px', boxSizing: 'border-box' }} />
                  </div>
                )}
              </div>

              {/* 5. Color, Fabric & Info */}
              <div style={{ background: '#0A0A0A', padding: '20px', borderRadius: '8px', border: '1px solid #222' }}>
                <h3 style={{ fontSize: '14px', color: '#D4AF37', margin: '0 0 15px 0' }}>5. Color, Fabric & Product Info</h3>
                
                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#CCC', marginBottom: '5px' }}>Rang (Color) *</label>
                    <input type="text" value={formColor} onChange={(e) => setFormColor(e.target.value)} placeholder="e.g. Royal Blue" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid #333', color: '#FFF', borderRadius: '4px', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#CCC', marginBottom: '5px' }}>Fabric *</label>
                    {/* 🚀 DATALIST FOR FABRIC */}
                    <input list="fabric-options" value={formFabric} onChange={(e) => setFormFabric(e.target.value)} placeholder="Type or select..." style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid #333', color: '#FFF', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <datalist id="fabric-options">
                      {["Cotton", "Silk", "Linen", "Georgette", "Rayon", "Polyester", "Chiffon", "Crepe", "Denim", "Velvet"].map(fab => <option key={fab} value={fab} />)}
                    </datalist>
                  </div>
                </div>

                <label style={{ display: 'block', fontSize: '12px', color: '#CCC', marginBottom: '5px' }}>Product Description / Details *</label>
                <textarea value={formDescription} onChange={(e) => setFormDescription(e.target.value)} rows="4" placeholder="Write product description, care instructions..." style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid #333', color: '#FFF', borderRadius: '4px', resize: 'none', boxSizing: 'border-box' }}></textarea>
              </div>

              {/* IMAGES */}
              <div style={{ background: '#0A0A0A', padding: '20px', borderRadius: '8px', border: '1px solid #222' }}>
                <h3 style={{ fontSize: '13px', color: '#D4AF37', margin: '0 0 10px 0' }}>Product Images (Max 6)</h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {formImages.map((img, idx) => (
                    <div key={idx} style={{ position: 'relative', width: '70px', height: '70px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #333' }}>
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button type="button" onClick={() => handleRemoveImage(idx)} style={{ position: 'absolute', top: '2px', right: '2px', background: 'rgba(0,0,0,0.6)', color: '#FFF', border: 'none', borderRadius: '50%', width: '16px', height: '16px', fontSize: '9px', cursor: 'pointer' }}>✕</button>
                    </div>
                  ))}
                  
                  {formImages.length < 6 && (
                    <label style={{ width: '70px', height: '70px', borderRadius: '6px', border: '2px dashed #444', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: '#111' }}>
                      <span style={{ fontSize: '20px' }}>📸</span>
                      <span style={{ fontSize: '9px', fontWeight: '800', color: '#6B7280', marginTop: '2px' }}>Upload</span>
                      <input type="file" accept="image/*" onChange={handleImageAdd} style={{ display: 'none' }} />
                    </label>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {viewMode === 'bulk-wizard' && (
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '900', margin: 0 }}>BULK UPLOAD WIZARD: {selectedProductType}</h2>
            <button onClick={() => setViewMode('list')} style={{ background: 'none', border: '1px solid #CCC', padding: '6px 12px', cursor: 'pointer', fontSize: '11px', fontWeight: '800' }}>✕ Exit</button>
          </div>
          <div style={{ padding: '30px', textAlign: 'center', backgroundColor: '#F9FAFB', borderRadius: '6px', border: '1px dashed #D1D5DB' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '800' }}>Step 1: Download & Upload CSV for {selectedProductType}</h3>
            <button onClick={() => alert("Bulk batch published successfully!")} style={{ marginTop: '14px', backgroundColor: '#0A0A0A', color: '#FFF', border: 'none', padding: '10px 20px', fontWeight: '800', cursor: 'pointer', fontSize: '12px' }}>
              Publish Bulk Batch
            </button>
          </div>
        </div>
      )}

      {showLivePreviewModal && (
        <div onClick={() => setShowLivePreviewModal(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: '#FFF', borderRadius: '8px', maxWidth: '600px', width: '100%', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '900', marginTop: 0 }}>Storefront Buyer Preview</h3>
            <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
              <img src={formImages[0] || '/dress1.png'} alt="" style={{ width: '120px', height: '140px', objectFit: 'cover', borderRadius: '4px' }} />
              <div>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '15px' }}>{formName || "Product Name"}</h4>
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#FF6B00' }}>₹{formSellingPrice || 0}</div>
                <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>Fabric: {formFabric} | Color: {formColor}</div>
              </div>
            </div>
            <button onClick={() => setShowLivePreviewModal(false)} style={{ marginTop: '20px', width: '100%', backgroundColor: '#0A0A0A', color: '#FFF', padding: '10px', border: 'none', fontWeight: '800', cursor: 'pointer' }}>Close Preview</button>
          </div>
        </div>
      )}

    </div>
  );
}