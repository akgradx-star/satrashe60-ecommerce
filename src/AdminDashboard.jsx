import React, { useState, useMemo } from 'react';
import { MASTER_PRODUCTS } from './Shop';
import CatalogUploads from './CatalogUploads';

// ============================================================================
// INITIAL MOCK CLAIMS & RETURNS SEED DATA (API-READY)
// ============================================================================
const INITIAL_RETURNS = [
  {
    returnId: "RET-10921",
    orderId: "SATRA-89211",
    customerName: "Pooja Sharma",
    customerPhone: "+91 98201 44321",
    productName: "Black Ribbed Top",
    productImage: "/dress2.png",
    skuId: "SKU-BLK-RIB-02",
    size: "M",
    color: "Black",
    quantity: 1,
    orderDate: "10 Aug 2026",
    returnRequestedDate: "12 Aug 2026",
    expectedReturnDate: "15 Aug 2026", // Evaluates for delay
    actualReturnDate: null,
    returnReason: "Size is too loose / Fit issue",
    returnStatus: "Out for Delivery", // 'New' | 'Out for Delivery' | 'Delivered' | 'Lost' | 'No Return No Charge' | 'Disposed'
    courierName: "Delhivery Surface",
    trackingId: "DLV-RET-99014",
    refundStatus: "Pending", // 'Pending' | 'Completed' | 'Rejected'
    refundAmount: 129
  },
  {
    returnId: "RET-10922",
    orderId: "SATRA-77140",
    customerName: "Ananya Iyer",
    customerPhone: "+91 99302 11209",
    productName: "Floral Shirt Top",
    productImage: "/dress1.png",
    skuId: "SKU-FLR-TOP-01",
    size: "S",
    color: "Multi / Floral",
    quantity: 1,
    orderDate: "05 Aug 2026",
    returnRequestedDate: "08 Aug 2026",
    expectedReturnDate: "12 Aug 2026",
    actualReturnDate: "13 Aug 2026",
    returnReason: "Defective stitching on collar",
    returnStatus: "Delivered",
    courierName: "Blue Dart Express",
    trackingId: "BLU-RET-88710",
    refundStatus: "Completed",
    refundAmount: 149
  }
];

const INITIAL_CLAIMS = [
  {
    claimId: "CLM-4011",
    orderId: "SATRA-77140",
    returnId: "RET-10922",
    productName: "Floral Shirt Top",
    skuId: "SKU-FLR-TOP-01",
    customerName: "Ananya Iyer",
    claimReason: "Transit Damage / Broken Seam confirmed by QA",
    claimDate: "09 Aug 2026",
    claimStatus: "Approved", // 'New' | 'Under Review' | 'Approved' | 'Rejected' | 'Resolved'
    claimAmount: 149,
    resolution: "Full merchant credit & supplier reimbursement approved",
    lastUpdated: "13 Aug 2026"
  }
];

export default function AdminDashboard({ 
  orders = [], 
  onUpdateOrderStatus, 
  onLogout, 
  onNavigateToWebsite 
}) {
  // Navigation & Sub-views
  // 'dashboard' | 'orders' | 'returns-overview' | 'return-tracking' | 'claims' | 'inventory' | 'catalog-uploads'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [couponsList, setCouponsList] = useState([{ code: 'SATRA60', discount: 60, status: 'ACTIVE' }]);
const [newCouponCode, setNewCouponCode] = useState('');
const [newCouponDiscount, setNewCouponDiscount] = useState('');
  const [role, setRole] = useState('Admin'); // 'Admin' | 'Worker'
  
  // Dashboard Filters & Configurations
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [chartMetric, setChartMetric] = useState('sales'); // 'sales' | 'orders'
  const [lowStockThreshold, setLowStockThreshold] = useState(2);
  const [downloadedLabelsCount, setDownloadedLabelsCount] = useState(3);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  // Orders View Filtering
  const [orderStatusFilter, setOrderStatusFilter] = useState('ALL'); // 'ALL' | 'On Hold' | 'Pending' | 'Ready to Ship' | 'Shipped' | 'Cancelled'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // Returns & Claims State
  const [returnsList, setReturnsList] = useState(INITIAL_RETURNS);
  const [claimsList, setClaimsList] = useState(INITIAL_CLAIMS);
  const [returnStatusFilter, setReturnStatusFilter] = useState('ALL'); // 'ALL' | 'New' | 'Out for Delivery' | 'Delivered' | 'Lost' | 'No Return No Charge' | 'Disposed'

  // ==========================================================================
  // REAL-TIME DATA COMPUTATION & SYNCHRONIZATION
  // ==========================================================================
  
  // Inventory metrics derived directly from MASTER_PRODUCTS
  const inventoryStats = useMemo(() => {
    const products = MASTER_PRODUCTS || [];
    const outOfStock = products.filter(p => p.stock === 0);
    const lowStock = products.filter(p => p.stock > 0 && p.stock <= lowStockThreshold);
    return {
      outOfStockCount: outOfStock.length,
      outOfStockList: outOfStock,
      lowStockCount: lowStock.length,
      lowStockList: lowStock,
      totalCatalogCount: products.length
    };
  }, [lowStockThreshold]);

  // Order Counts by Status
  const orderCounts = useMemo(() => {
    const counts = {
      pending: 0,
      readyToShip: 0,
      shipped: 0,
      onHold: 0,
      cancelled: 0,
      total: orders.length,
      totalRevenue: 0
    };

    orders.forEach(o => {
      const status = (o.status || 'Pending').toLowerCase();
      const amount = Number(o.totalAmount || o.price || 0);
      counts.totalRevenue += amount;

      if (status.includes('pending') || status.includes('placed')) counts.pending++;
      else if (status.includes('ready')) counts.readyToShip++;
      else if (status.includes('shipped') || status.includes('transit')) counts.shipped++;
      else if (status.includes('hold')) counts.onHold++;
      else if (status.includes('cancel')) counts.cancelled++;
      else counts.pending++;
    });

    return counts;
  }, [orders]);

  // Return Metrics
  const returnCounts = useMemo(() => {
    return {
      total: returnsList.length,
      new: returnsList.filter(r => r.returnStatus === 'New').length,
      outForDelivery: returnsList.filter(r => r.returnStatus === 'Out for Delivery').length,
      delivered: returnsList.filter(r => r.returnStatus === 'Delivered').length,
      lost: returnsList.filter(r => r.returnStatus === 'Lost').length,
      noReturnNoCharge: returnsList.filter(r => r.returnStatus === 'No Return No Charge').length,
      disposed: returnsList.filter(r => r.returnStatus === 'Disposed').length,
      refundPending: returnsList.filter(r => r.refundStatus === 'Pending').length,
      refundCompleted: returnsList.filter(r => r.refundStatus === 'Completed').length,
      totalRefundAmount: returnsList.reduce((acc, r) => acc + (r.refundStatus === 'Completed' ? r.refundAmount : 0), 0)
    };
  }, [returnsList]);

  // Filtered Orders for the Delivery/Orders Screen
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const status = (order.status || 'Pending').toLowerCase();
      
      // Status Filter
      if (orderStatusFilter !== 'ALL') {
        if (orderStatusFilter === 'Pending' && !(status.includes('pending') || status.includes('placed'))) return false;
        if (orderStatusFilter === 'Ready to Ship' && !status.includes('ready')) return false;
        if (orderStatusFilter === 'Shipped' && !status.includes('shipped')) return false;
        if (orderStatusFilter === 'On Hold' && !status.includes('hold')) return false;
        if (orderStatusFilter === 'Cancelled' && !status.includes('cancel')) return false;
      }

      // SKU / Query Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = (order.id || '').toLowerCase().includes(q);
        const matchesCustomer = (order.customerName || '').toLowerCase().includes(q);
        const matchesItem = order.items && order.items.some(i => 
          (i.name || '').toLowerCase().includes(q) || (i.sku || '').toLowerCase().includes(q)
        );
        const matchesSingleName = (order.name || '').toLowerCase().includes(q);
        if (!matchesId && !matchesCustomer && !matchesItem && !matchesSingleName) {
          return false;
        }
      }

      return true;
    });
  }, [orders, orderStatusFilter, searchQuery]);

  // Filtered Returns
  const filteredReturns = useMemo(() => {
    if (returnStatusFilter === 'ALL') return returnsList;
    return returnsList.filter(r => r.returnStatus === returnStatusFilter);
  }, [returnsList, returnStatusFilter]);

  // ==========================================================================
  // HANDLERS & ACTIONS
  // ==========================================================================
  
  const handleDownloadShippingLabel = (order) => {
    setDownloadedLabelsCount(prev => prev + 1);
    alert(`🏷️ Shipping Label Generated & Downloaded for ${order.id || 'Order'}.\nCourier: Delhivery Surface / Blue Dart Express.\nTracking Assigned: DLV-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    if (onUpdateOrderStatus) {
      onUpdateOrderStatus(orderId, newStatus);
    }
    if (selectedOrderDetails && selectedOrderDetails.id === orderId) {
      setSelectedOrderDetails(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleCreateCustomerReturn = (order) => {
    const newReturn = {
      returnId: `RET-${Math.floor(10000 + Math.random() * 90000)}`,
      orderId: order.id || 'SATRA-99011',
      customerName: order.customerName || 'Customer',
      customerPhone: order.customerPhone || '+91 98765 00123',
      productName: order.items ? order.items[0]?.name : (order.name || 'Clothing Piece'),
      productImage: order.items ? order.items[0]?.image : (order.image || '/dress1.png'),
      skuId: `SKU-${Math.floor(100 + Math.random() * 900)}`,
      size: (order.items && order.items[0]?.selectedSize) || 'M',
      color: 'Standard',
      quantity: 1,
      orderDate: order.date || 'Today',
      returnRequestedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      expectedReturnDate: new Date(Date.now() + 4 * 86400000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      actualReturnDate: null,
      returnReason: "Customer requested return (Fit/Style dissatisfaction)",
      returnStatus: "New",
      courierName: "Delhivery Reverse Logistics",
      trackingId: `DLV-REV-${Math.floor(100000 + Math.random() * 900000)}`,
      refundStatus: "Pending",
      refundAmount: Number(order.totalAmount || order.price || 149)
    };

    setReturnsList(prev => [newReturn, ...prev]);
    alert(`✓ Return request registered: ${newReturn.returnId} for Order ${newReturn.orderId}`);
  };

  // Helper to check if a return is delayed
  const isReturnDelayed = (expectedDateStr, actualDateStr) => {
    if (actualDateStr) return false;
    const exp = new Date(expectedDateStr);
    return Date.now() > exp.getTime();
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F0F2F5', color: '#2B3445', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      
      {/* =====================================================================
          1. LEFT FIXED SIDEBAR
         ===================================================================== */}
      <aside style={{
        width: '250px',
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid #E3E8EE',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 100,
        overflowY: 'auto'
      }}>
        {/* BRAND LOGO */}
        <div style={{ padding: '20px 18px', borderBottom: '1px solid #F0F2F5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: '#0A0A0A', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF6B00', fontWeight: '900', fontSize: '14px' }}>
              60
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '900', color: '#111827', letterSpacing: '0.5px' }}>
                SATRASHE<span style={{ color: '#FF6B00' }}>60</span>
              </div>
              <div style={{ fontSize: '10px', color: '#C9A227', fontWeight: '800' }}>
                {role === 'Admin' ? 'SUPER ADMIN PANEL' : 'WORKER FULFILLMENT'}
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR NAVIGATION ITEMS */}
        <div style={{ padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
          
          {/* DASHBOARD / HOME */}
          <div>
            <button
              onClick={() => setActiveTab('dashboard')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: activeTab === 'dashboard' ? '#FFF4EC' : 'transparent',
                color: activeTab === 'dashboard' ? '#FF6B00' : '#4B5563',
                fontWeight: '800',
                fontSize: '13px',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <span>📊</span>
              <span>Home / Live Dashboard</span>
            </button>
          </div>

          {/* MANAGE BUSINESS */}
          <div>
            <div style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '1px', color: '#9CA3AF', textTransform: 'uppercase', padding: '0 12px 6px 12px' }}>
              MANAGE BUSINESS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              
              {/* ORDERS & DELIVERY */}
              <button
                onClick={() => { setActiveTab('orders'); setOrderStatusFilter('ALL'); }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: activeTab === 'orders' ? '#FFF4EC' : 'transparent',
                  color: activeTab === 'orders' ? '#FF6B00' : '#4B5563',
                  fontWeight: '700',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>📦</span>
                  <span>Orders & Delivery</span>
                </div>
                {orderCounts.pending > 0 && (
                  <span style={{ backgroundColor: '#FF6B00', color: '#FFF', fontSize: '9px', fontWeight: '900', padding: '2px 6px', borderRadius: '10px' }}>
                    {orderCounts.pending}
                  </span>
                )}
              </button>

              {/* CATALOG UPLOADS (STEP 3 CONNECTED) */}
              <button
                onClick={() => setActiveTab('catalog-uploads')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: activeTab === 'catalog-uploads' ? '#FFF4EC' : 'transparent',
                  color: activeTab === 'catalog-uploads' ? '#FF6B00' : '#4B5563',
                  fontWeight: '700',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>📁</span>
                  <span>Catalog Uploads</span>
                </div>
                <span style={{ backgroundColor: '#DEF7EC', color: '#03543F', fontSize: '9px', fontWeight: '800', padding: '2px 6px', borderRadius: '10px' }}>
                  New
                </span>
              </button>
              <button
  onClick={() => setActiveTab('promotions')}
  style={{
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '9px 12px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: activeTab === 'promotions' ? '#FFF4EC' : 'transparent',
    color: activeTab === 'promotions' ? '#FF6B00' : '#4B5563',
    fontWeight: '700',
    fontSize: '12px',
    cursor: 'pointer',
    textAlign: 'left'
  }}
>
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <span>🏷️</span>
    <span>Promotions & Coupons</span>
  </div>
  <span style={{ fontSize: '9px', backgroundColor: '#DEF7EC', color: '#03543F', padding: '2px 6px', borderRadius: '10px', fontWeight: '800' }}>{couponsList.length}</span>
</button>

              {/* RETURNS MANAGEMENT */}
              <button
                onClick={() => setActiveTab('returns-overview')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: (activeTab === 'returns-overview' || activeTab === 'return-tracking') ? '#FFF4EC' : 'transparent',
                  color: (activeTab === 'returns-overview' || activeTab === 'return-tracking') ? '#FF6B00' : '#4B5563',
                  fontWeight: '700',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>🔄</span>
                  <span>Returns Management</span>
                </div>
                {returnCounts.total > 0 && (
                  <span style={{ backgroundColor: '#E5E7EB', color: '#111', fontSize: '9px', fontWeight: '800', padding: '2px 6px', borderRadius: '10px' }}>
                    {returnCounts.total}
                  </span>
                )}
              </button>

              {/* CLAIM TRACKING */}
              <button
                onClick={() => setActiveTab('claims')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: activeTab === 'claims' ? '#FFF4EC' : 'transparent',
                  color: activeTab === 'claims' ? '#FF6B00' : '#4B5563',
                  fontWeight: '700',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>🛡️</span>
                  <span>Claim Tracking</span>
                </div>
                <span style={{ fontSize: '10px', color: '#9CA3AF' }}>{claimsList.length}</span>
              </button>

              {/* INVENTORY / CATALOG & STOCK */}
              <button
                onClick={() => setActiveTab('inventory')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: activeTab === 'inventory' ? '#FFF4EC' : 'transparent',
                  color: activeTab === 'inventory' ? '#FF6B00' : '#4B5563',
                  fontWeight: '700',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>📋</span>
                  <span>Catalog & Stock</span>
                </div>
                {(inventoryStats.outOfStockCount > 0 || inventoryStats.lowStockCount > 0) && (
                  <span style={{ backgroundColor: '#FEE2E2', color: '#DC2626', fontSize: '9px', fontWeight: '900', padding: '2px 6px', borderRadius: '10px' }}>
                    {inventoryStats.outOfStockCount + inventoryStats.lowStockCount}
                  </span>
                )}
              </button>

            </div>
          </div>

          {/* ACCESS ROLE CONTROLLER */}
          <div style={{ backgroundColor: '#F9FAFB', padding: '12px', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: '10px', fontWeight: '800', color: '#6B7280', marginBottom: '6px', textTransform: 'uppercase' }}>
              ACCESS ROLE
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => setRole('Admin')}
                style={{
                  flex: 1,
                  padding: '5px',
                  fontSize: '11px',
                  fontWeight: '800',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: role === 'Admin' ? '#0A0A0A' : '#E5E7EB',
                  color: role === 'Admin' ? '#FFFFFF' : '#4B5563',
                  cursor: 'pointer'
                }}
              >
                Admin
              </button>
              <button
                onClick={() => setRole('Worker')}
                style={{
                  flex: 1,
                  padding: '5px',
                  fontSize: '11px',
                  fontWeight: '800',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: role === 'Worker' ? '#0A0A0A' : '#E5E7EB',
                  color: role === 'Worker' ? '#FFFFFF' : '#4B5563',
                  cursor: 'pointer'
                }}
              >
                Worker
              </button>
            </div>
          </div>

        </div>

        {/* LOGOUT & STORE NAVIGATION */}
        <div style={{ borderTop: '1px solid #F0F2F5', padding: '14px 10px' }}>
          <button
            onClick={onNavigateToWebsite}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#F3F4F6',
              color: '#111827',
              fontWeight: '700',
              fontSize: '12px',
              cursor: 'pointer',
              marginBottom: '6px'
            }}
          >
            <span>🛍️</span>
            <span>View Customer Website</span>
          </button>
          <button
            onClick={onLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: 'transparent',
              color: '#DC2626',
              fontWeight: '700',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            <span>🚪</span>
            <span>Exit Admin</span>
          </button>
        </div>
      </aside>

      {/* =====================================================================
          2. MAIN CONTENT AREA
         ===================================================================== */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* TOP BAR */}
        <header style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E3E8EE',
          padding: '14px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 90
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '15px', fontWeight: '900', color: '#111827' }}>
              SATRASHE60 Supplier Operations
            </span>
            <span style={{ backgroundColor: '#DEF7EC', color: '#03543F', fontSize: '10px', fontWeight: '800', padding: '3px 8px', borderRadius: '4px' }}>
              ● LIVE DATA-DRIVEN
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ fontSize: '12px', color: '#6B7280' }}>
              Operating as: <strong style={{ color: '#111827' }}>{role === 'Admin' ? 'Akash (Super Admin)' : 'Dispatch Worker'}</strong>
            </div>
            <button 
              onClick={onNavigateToWebsite}
              style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', border: 'none', padding: '7px 14px', borderRadius: '4px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
            >
              🌐 Open Store
            </button>
          </div>
        </header>

        {/* MAIN BODY CONTAINER */}
        <main style={{ padding: '24px 30px', display: 'flex', flexDirection: 'column', gap: '22px', maxWidth: '1400px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>

          {/* =================================================================
              VIEW 0: CATALOG UPLOADS (MODULE VIEW)
             ================================================================= */}
          {activeTab === 'catalog-uploads' && (
            <CatalogUploads 
              onPublishProductToStore={(newProduct) => {
                if (MASTER_PRODUCTS) {
                  MASTER_PRODUCTS.unshift(newProduct);
                }
              }}
              onBackToDashboard={() => setActiveTab('dashboard')}
            />
          )}
          {/* PROMOTIONS & COUPONS VIEW */}
{activeTab === 'promotions' && (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
    <div>
      <h1 style={{ fontSize: '20px', fontWeight: '900', color: '#111827', margin: '0 0 4px 0' }}>PROMOTIONS & COUPONS MANAGER</h1>
      <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>Create and manage discount vouchers for customer checkout conversion.</p>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', alignItems: 'start' }}>
      
      {/* CREATE COUPON FORM */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '20px' }}>
        <h3 style={{ fontSize: '13px', fontWeight: '900', textTransform: 'uppercase', margin: '0 0 14px 0' }}>Create New Coupon</h3>
        <form 
          onSubmit={(e) => { 
            e.preventDefault(); 
            setCouponsList([...couponsList, { code: newCouponCode.toUpperCase(), discount: newCouponDiscount, status: 'ACTIVE' }]);
            setNewCouponCode('');
            setNewCouponDiscount('');
          }} 
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          <div>
            <label style={{ fontSize: '10px', fontWeight: '800', display: 'block', marginBottom: '4px' }}>COUPON CODE *</label>
            <input type="text" required placeholder="e.g. SUMMER20" value={newCouponCode} onChange={(e) => setNewCouponCode(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '12px', textTransform: 'uppercase' }} />
          </div>
          <div>
            <label style={{ fontSize: '10px', fontWeight: '800', display: 'block', marginBottom: '4px' }}>DISCOUNT AMOUNT (₹) *</label>
            <input type="number" required placeholder="50" value={newCouponDiscount} onChange={(e) => setNewCouponDiscount(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '12px' }} />
          </div>
          <button type="submit" style={{ backgroundColor: '#0A0A0A', color: '#FFF', border: 'none', padding: '10px', fontWeight: '900', fontSize: '12px', cursor: 'pointer', borderRadius: '4px' }}>
            Save & Activate Coupon
          </button>
        </form>
      </div>

      {/* ACTIVE COUPONS TABLE */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E5E7EB', fontWeight: '900', fontSize: '13px', textTransform: 'uppercase' }}>Active Vouchers</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#6B7280', fontSize: '11px', textTransform: 'uppercase' }}>
              <th style={{ padding: '12px 16px' }}>Code</th>
              <th style={{ padding: '12px 16px' }}>Discount Value</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {couponsList.map((cp, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={{ padding: '12px 16px', fontWeight: '900' }}>{cp.code}</td>
                <td style={{ padding: '12px 16px', fontWeight: '900', color: '#10B981' }}>₹{cp.discount} OFF</td>
                <td style={{ padding: '12px 16px' }}><span style={{ backgroundColor: '#DEF7EC', color: '#03543F', padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: '800' }}>{cp.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}

          {/* =================================================================
              VIEW 1: LIVE DASHBOARD / HOME
             ================================================================= */}
          {activeTab === 'dashboard' && (
            <>
              {/* WELCOME & DATE RANGE SELECTOR */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h1 style={{ fontSize: '22px', fontWeight: '900', color: '#111827', margin: '0 0 4px 0' }}>
                    LIVE BUSINESS DASHBOARD
                  </h1>
                  <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>
                    Real-time metrics, automated inventory sync & dispatch lifecycle.
                  </p>
                </div>

                <div style={{ display: 'flex', backgroundColor: '#FFFFFF', border: '1px solid #D1D5DB', borderRadius: '6px', overflow: 'hidden' }}>
                  {['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'Custom'].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setDateRange(filter)}
                      style={{
                        padding: '6px 12px',
                        border: 'none',
                        backgroundColor: dateRange === filter ? '#0A0A0A' : '#FFFFFF',
                        color: dateRange === filter ? '#FFFFFF' : '#4B5563',
                        fontSize: '11px',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* ANNOUNCEMENT BANNER */}
              {showAnnouncement && (
                <div style={{
                  backgroundColor: '#FEF3C7',
                  border: '1px solid #FDE68A',
                  borderRadius: '8px',
                  padding: '14px 18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '20px' }}>📢</span>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: '#92400E' }}>
                        LIVE DATA CONNECTION ACTIVE
                      </div>
                      <div style={{ fontSize: '12px', color: '#B45309', marginTop: '2px' }}>
                        All order placements, status transitions, stock counts & returns are synchronized across customer and admin portals.
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowAnnouncement(false)}
                    style={{ background: 'none', border: 'none', color: '#92400E', fontSize: '16px', cursor: 'pointer' }}
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* 4 PRIMARY LIVE DASHBOARD CARDS */}
              <div>
                <div style={{ fontSize: '13px', fontWeight: '800', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                  LIVE ACTION CARDS
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  
                  {/* CARD A: PENDING ORDERS */}
                  <div 
                    onClick={() => { setActiveTab('orders'); setOrderStatusFilter('Pending'); }}
                    style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '18px', cursor: 'pointer', borderLeft: '4px solid #FF6B00', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: '#4B5563' }}>PENDING ORDERS</div>
                      <span style={{ fontSize: '20px' }}>📦</span>
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: '900', color: orderCounts.pending > 0 ? '#FF6B00' : '#111827', margin: '6px 0 2px 0' }}>
                      {orderCounts.pending}
                    </div>
                    <div style={{ fontSize: '11px', color: '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Orders awaiting processing</span>
                      <span style={{ color: '#FF6B00', fontWeight: '800' }}>View Orders →</span>
                    </div>
                  </div>

                  {/* CARD B: DOWNLOADED LABELS */}
                  <div 
                    onClick={() => { setActiveTab('orders'); setOrderStatusFilter('Ready to Ship'); }}
                    style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '18px', cursor: 'pointer', borderLeft: '4px solid #3B82F6', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: '#4B5563' }}>DOWNLOADED LABELS</div>
                      <span style={{ fontSize: '20px' }}>🏷️</span>
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: '900', color: '#111827', margin: '6px 0 2px 0' }}>
                      {downloadedLabelsCount}
                    </div>
                    <div style={{ fontSize: '11px', color: '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Labels generated for courier</span>
                      <span style={{ color: '#3B82F6', fontWeight: '800' }}>View Ready →</span>
                    </div>
                  </div>

                  {/* CARD C: OUT OF STOCK */}
                  <div 
                    onClick={() => setActiveTab('inventory')}
                    style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '18px', cursor: 'pointer', borderLeft: '4px solid #EF4444', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: '#4B5563' }}>OUT OF STOCK</div>
                      <span style={{ fontSize: '20px' }}>🚫</span>
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: '900', color: inventoryStats.outOfStockCount > 0 ? '#EF4444' : '#111827', margin: '6px 0 2px 0' }}>
                      {inventoryStats.outOfStockCount}
                    </div>
                    <div style={{ fontSize: '11px', color: '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Products with 0 stock</span>
                      <span style={{ color: '#EF4444', fontWeight: '800' }}>Manage Stock →</span>
                    </div>
                  </div>

                  {/* CARD D: LOW STOCK */}
                  <div 
                    onClick={() => setActiveTab('inventory')}
                    style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '18px', cursor: 'pointer', borderLeft: '4px solid #F59E0B', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: '#4B5563' }}>LOW STOCK (≤{lowStockThreshold})</div>
                      <span style={{ fontSize: '20px' }}>⚠️</span>
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: '900', color: inventoryStats.lowStockCount > 0 ? '#F59E0B' : '#111827', margin: '6px 0 2px 0' }}>
                      {inventoryStats.lowStockCount}
                    </div>
                    <div style={{ fontSize: '11px', color: '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Items below threshold</span>
                      <span style={{ color: '#F59E0B', fontWeight: '800' }}>Review Alerts →</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* BUSINESS INSIGHTS ANALYTICS GRAPH */}
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', margin: 0 }}>
                      BUSINESS INSIGHTS & REAL-TIME PERFORMANCE
                    </h3>
                    <span style={{ fontSize: '11px', color: '#6B7280' }}>Data aggregated for {dateRange}</span>
                  </div>

                  <div style={{ display: 'flex', backgroundColor: '#F3F4F6', borderRadius: '6px', padding: '3px' }}>
                    <button
                      onClick={() => setChartMetric('sales')}
                      style={{
                        padding: '6px 14px',
                        border: 'none',
                        borderRadius: '4px',
                        backgroundColor: chartMetric === 'sales' ? '#0A0A0A' : 'transparent',
                        color: chartMetric === 'sales' ? '#FFFFFF' : '#4B5563',
                        fontSize: '11px',
                        fontWeight: '800',
                        cursor: 'pointer'
                      }}
                    >
                      SALES (₹{orderCounts.totalRevenue})
                    </button>
                    <button
                      onClick={() => setChartMetric('orders')}
                      style={{
                        padding: '6px 14px',
                        border: 'none',
                        borderRadius: '4px',
                        backgroundColor: chartMetric === 'orders' ? '#0A0A0A' : 'transparent',
                        color: chartMetric === 'orders' ? '#FFFFFF' : '#4B5563',
                        fontSize: '11px',
                        fontWeight: '800',
                        cursor: 'pointer'
                      }}
                    >
                      ORDERS ({orders.length})
                    </button>
                  </div>
                </div>

                {/* GRAPH DISPLAY */}
                <div style={{
                  height: '200px',
                  backgroundColor: '#FAFAFA',
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  {orders.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#6B7280' }}>
                      <span style={{ fontSize: '28px' }}>📊</span>
                      <div style={{ fontSize: '13px', fontWeight: '700', marginTop: '4px' }}>No sales data for {dateRange}</div>
                    </div>
                  ) : (
                    <div style={{ width: '100%', height: '100%', padding: '20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', boxSizing: 'border-box' }}>
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                        const heightPct = idx === 6 ? 85 : (idx === 5 ? 60 : 30);
                        return (
                          <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', width: '40px' }}>
                            <span style={{ fontSize: '10px', fontWeight: '800', color: '#FF6B00' }}>
                              {chartMetric === 'sales' ? `₹${heightPct * 15}` : Math.round(heightPct / 30)}
                            </span>
                            <div style={{ width: '18px', height: `${heightPct}%`, backgroundColor: '#FF6B00', borderRadius: '4px 4px 0 0' }}></div>
                            <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: '600' }}>{day}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* KPI METRIC STRIP */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginTop: '18px' }}>
                  <div style={{ backgroundColor: '#F9FAFB', padding: '12px', borderRadius: '6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', fontWeight: '800', color: '#6B7280' }}>TOTAL ORDERS</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', marginTop: '2px' }}>{orders.length}</div>
                  </div>
                  <div style={{ backgroundColor: '#F9FAFB', padding: '12px', borderRadius: '6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', fontWeight: '800', color: '#6B7280' }}>GROSS SALES</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#FF6B00', marginTop: '2px' }}>₹{orderCounts.totalRevenue}</div>
                  </div>
                  <div style={{ backgroundColor: '#F9FAFB', padding: '12px', borderRadius: '6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', fontWeight: '800', color: '#6B7280' }}>PRODUCT VIEWS</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', marginTop: '2px' }}>348</div>
                  </div>
                  <div style={{ backgroundColor: '#F9FAFB', padding: '12px', borderRadius: '6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', fontWeight: '800', color: '#6B7280' }}>TOTAL CLICKS</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', marginTop: '2px' }}>192</div>
                  </div>
                  <div style={{ backgroundColor: '#F9FAFB', padding: '12px', borderRadius: '6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', fontWeight: '800', color: '#6B7280' }}>CONVERSION RATE</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#10B981', marginTop: '2px' }}>
                      {orders.length > 0 ? `${((orders.length / 192) * 100).toFixed(1)}%` : '0%'}
                    </div>
                  </div>
                  <div style={{ backgroundColor: '#F9FAFB', padding: '12px', borderRadius: '6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', fontWeight: '800', color: '#6B7280' }}>RETURN RATE</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: returnCounts.total > 0 ? '#EF4444' : '#6B7280', marginTop: '2px' }}>
                      {orders.length > 0 ? `${((returnCounts.total / orders.length) * 100).toFixed(1)}%` : '0%'}
                    </div>
                  </div>
                </div>
              </div>

              {/* QUICK THRESHOLD CONFIGURATION */}
              {role === 'Admin' && (
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase' }}>⚙️ LOW STOCK ALERT THRESHOLD</span>
                    <p style={{ fontSize: '11px', color: '#6B7280', margin: '2px 0 0 0' }}>Trigger low stock badge when available stock drops to or below this quantity.</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input 
                      type="number" 
                      min="1" 
                      max="20" 
                      value={lowStockThreshold} 
                      onChange={(e) => setLowStockThreshold(Number(e.target.value) || 1)}
                      style={{ width: '60px', padding: '6px 10px', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '12px', fontWeight: '800', textAlign: 'center' }}
                    />
                    <span style={{ fontSize: '12px', color: '#4B5563', fontWeight: '700' }}>Units</span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* =================================================================
              VIEW 2: DELIVERY / ORDERS SECTION
             ================================================================= */}
          {activeTab === 'orders' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <h1 style={{ fontSize: '20px', fontWeight: '900', color: '#111827', margin: '0 0 4px 0' }}>
                    ORDER FULFILLMENT & DISPATCH PIPELINE
                  </h1>
                  <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>
                    Process pending purchases, generate shipping labels & hand over to couriers.
                  </p>
                </div>

                {/* SKU / ORDER ID SEARCH BAR */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#FFFFFF', border: '1px solid #D1D5DB', borderRadius: '6px', padding: '6px 12px', width: '320px' }}>
                  <span>🔍</span>
                  <input
                    type="text"
                    placeholder="Search SKU, Order ID, Customer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ border: 'none', outline: 'none', fontSize: '12px', width: '100%' }}
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#888' }}>✕</button>
                  )}
                </div>
              </div>

              {/* 5 ORDER STATUS TABS WITH DYNAMIC COUNTERS */}
              <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #E5E7EB', paddingBottom: '8px', overflowX: 'auto' }}>
                {[
                  { id: 'ALL', label: 'All Orders', count: orders.length },
                  { id: 'Pending', label: 'Pending', count: orderCounts.pending, color: '#FF6B00' },
                  { id: 'Ready to Ship', label: 'Ready to Ship', count: orderCounts.readyToShip, color: '#3B82F6' },
                  { id: 'Shipped', label: 'Shipped', count: orderCounts.shipped, color: '#10B981' },
                  { id: 'On Hold', label: 'On Hold', count: orderCounts.onHold, color: '#F59E0B' },
                  { id: 'Cancelled', label: 'Cancelled', count: orderCounts.cancelled, color: '#EF4444' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setOrderStatusFilter(tab.id)}
                    style={{
                      padding: '8px 16px',
                      border: 'none',
                      borderRadius: '6px',
                      backgroundColor: orderStatusFilter === tab.id ? '#0A0A0A' : '#FFFFFF',
                      color: orderStatusFilter === tab.id ? '#FFFFFF' : '#4B5563',
                      fontWeight: '800',
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                    }}
                  >
                    <span>{tab.label}</span>
                    <span style={{
                      backgroundColor: orderStatusFilter === tab.id ? '#FF6B00' : '#F3F4F6',
                      color: orderStatusFilter === tab.id ? '#FFFFFF' : '#111827',
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '10px'
                    }}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* ORDERS LISTING TABLE */}
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
                {filteredOrders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6B7280' }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>📦</div>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#111827' }}>No orders matching filter "{orderStatusFilter}"</div>
                    <p style={{ fontSize: '12px', margin: '4px 0 0 0' }}>Placed orders will appear here automatically.</p>
                  </div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#6B7280', fontSize: '11px', textTransform: 'uppercase' }}>
                        <th style={{ padding: '12px 16px' }}>Order Ref</th>
                        <th style={{ padding: '12px 16px' }}>Customer Details</th>
                        <th style={{ padding: '12px 16px' }}>Item & SKU</th>
                        <th style={{ padding: '12px 16px' }}>Total Amount</th>
                        <th style={{ padding: '12px 16px' }}>Status</th>
                        <th style={{ padding: '12px 16px', textAlign: 'right' }}>Fulfillment Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map(order => {
                        const status = order.status || 'Pending';
                        const firstItem = (order.items && order.items[0]) || { name: order.name || 'Top', selectedSize: 'M', image: '/dress1.png' };
                        
                        return (
                          <tr key={order.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                            <td style={{ padding: '14px 16px' }}>
                              <div style={{ fontWeight: '900', color: '#111827' }}>{order.id}</div>
                              <div style={{ fontSize: '11px', color: '#6B7280' }}>{order.date || 'Today'}</div>
                            </td>
                            <td style={{ padding: '14px 16px' }}>
                              <div style={{ fontWeight: '700', color: '#111827' }}>{order.customerName || 'Customer'}</div>
                              <div style={{ fontSize: '11px', color: '#6B7280' }}>{order.customerPhone || '+91 98200 12345'}</div>
                            </td>
                            <td style={{ padding: '14px 16px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img src={firstItem.image} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                <div>
                                  <div style={{ fontWeight: '700', color: '#111827' }}>{firstItem.name}</div>
                                  <div style={{ fontSize: '10px', color: '#6B7280' }}>SKU: {firstItem.sku || 'SKU-SATRA-01'} | Size: {firstItem.selectedSize}</div>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: '14px 16px', fontWeight: '900', color: '#111827' }}>
                              ₹{order.totalAmount || order.price}
                            </td>
                            <td style={{ padding: '14px 16px' }}>
                              <span style={{
                                backgroundColor: status === 'Shipped' ? '#DEF7EC' : (status === 'Ready to Ship' ? '#DBEAFE' : (status === 'Cancelled' ? '#FEE2E2' : '#FEF3C7')),
                                color: status === 'Shipped' ? '#03543F' : (status === 'Ready to Ship' ? '#1E40AF' : (status === 'Cancelled' ? '#991B1B' : '#92400E')),
                                padding: '4px 10px',
                                borderRadius: '4px',
                                fontSize: '10px',
                                fontWeight: '800',
                                textTransform: 'uppercase'
                              }}>
                                {status}
                              </span>
                            </td>
                            <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                              <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                                
                                {/* VIEW ORDER DETAILS */}
                                <button
                                  onClick={() => setSelectedOrderDetails(order)}
                                  style={{ padding: '6px 10px', backgroundColor: '#F3F4F6', color: '#111827', border: '1px solid #D1D5DB', borderRadius: '4px', fontWeight: '700', fontSize: '11px', cursor: 'pointer' }}
                                >
                                  View Details 🔍
                                </button>

                                {/* STAGE 1: PENDING -> ACCEPT & READY TO SHIP */}
                                {status === 'Pending' && (
                                  <button
                                    onClick={() => handleUpdateStatus(order.id, 'Ready to Ship')}
                                    style={{ padding: '6px 12px', backgroundColor: '#FF6B00', color: '#FFFFFF', border: 'none', borderRadius: '4px', fontWeight: '800', fontSize: '11px', cursor: 'pointer' }}
                                  >
                                    Accept & Pack →
                                  </button>
                                )}

                                {/* STAGE 2: READY TO SHIP -> DOWNLOAD LABEL & SHIP */}
                                {status === 'Ready to Ship' && (
                                  <>
                                    <button
                                      onClick={() => handleDownloadShippingLabel(order)}
                                      style={{ padding: '6px 10px', backgroundColor: '#3B82F6', color: '#FFFFFF', border: 'none', borderRadius: '4px', fontWeight: '800', fontSize: '11px', cursor: 'pointer' }}
                                    >
                                      🏷️ Print Label
                                    </button>
                                    <button
                                      onClick={() => handleUpdateStatus(order.id, 'Shipped')}
                                      style={{ padding: '6px 12px', backgroundColor: '#10B981', color: '#FFFFFF', border: 'none', borderRadius: '4px', fontWeight: '800', fontSize: '11px', cursor: 'pointer' }}
                                    >
                                      Hand to Courier →
                                    </button>
                                  </>
                                )}

                                {/* INITIATE RETURN DEMO TRIGGER */}
                                {status === 'Shipped' && role === 'Admin' && (
                                  <button
                                    onClick={() => handleCreateCustomerReturn(order)}
                                    style={{ padding: '6px 10px', backgroundColor: '#F3F4F6', color: '#D97706', border: '1px solid #FCD34D', borderRadius: '4px', fontWeight: '800', fontSize: '11px', cursor: 'pointer' }}
                                  >
                                    🔄 Create Return
                                  </button>
                                )}

                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>

            </div>
          )}

          {/* =================================================================
              VIEW 3: RETURNS OVERVIEW
             ================================================================= */}
          {activeTab === 'returns-overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h1 style={{ fontSize: '20px', fontWeight: '900', color: '#111827', margin: '0 0 4px 0' }}>
                    RETURNS MANAGEMENT — OVERVIEW
                  </h1>
                  <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>
                    Live aggregation of customer returns, reverse courier tracking & refund settlements.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('return-tracking')}
                  style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', border: 'none', padding: '9px 18px', fontSize: '12px', fontWeight: '800', borderRadius: '4px', cursor: 'pointer' }}
                >
                  🚚 Open Return Tracking →
                </button>
              </div>

              {/* RETURN METRICS CARDS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#6B7280' }}>TOTAL RETURNS</div>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#111827', marginTop: '4px' }}>{returnCounts.total}</div>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '16px', borderLeft: '3px solid #3B82F6' }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#3B82F6' }}>NEW REQUESTS</div>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#111827', marginTop: '4px' }}>{returnCounts.new}</div>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '16px', borderLeft: '3px solid #F59E0B' }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#F59E0B' }}>OUT FOR PICKUP / DELIVERY</div>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#111827', marginTop: '4px' }}>{returnCounts.outForDelivery}</div>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '16px', borderLeft: '3px solid #10B981' }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#10B981' }}>DELIVERED TO WAREHOUSE</div>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#111827', marginTop: '4px' }}>{returnCounts.delivered}</div>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '16px', borderLeft: '3px solid #EF4444' }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#EF4444' }}>LOST IN TRANSIT</div>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#111827', marginTop: '4px' }}>{returnCounts.lost}</div>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#6B7280' }}>REFUND PENDING</div>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#D97706', marginTop: '4px' }}>{returnCounts.refundPending}</div>
                </div>
              </div>

              {/* QUICK LINKS */}
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', margin: '0 0 12px 0' }}>
                  REVERSE LOGISTICS & SETTLEMENTS
                </h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => { setActiveTab('return-tracking'); setReturnStatusFilter('Out for Delivery'); }}
                    style={{ backgroundColor: '#F3F4F6', color: '#111827', border: '1px solid #D1D5DB', padding: '10px 16px', borderRadius: '4px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
                  >
                    🚚 View Out for Delivery Returns ({returnCounts.outForDelivery})
                  </button>
                  <button 
                    onClick={() => { setActiveTab('return-tracking'); setReturnStatusFilter('Delivered'); }}
                    style={{ backgroundColor: '#F3F4F6', color: '#111827', border: '1px solid #D1D5DB', padding: '10px 16px', borderRadius: '4px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
                  >
                    ✅ View Delivered Warehouse Stock ({returnCounts.delivered})
                  </button>
                  <button 
                    onClick={() => setActiveTab('claims')}
                    style={{ backgroundColor: '#F3F4F6', color: '#111827', border: '1px solid #D1D5DB', padding: '10px 16px', borderRadius: '4px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
                  >
                    🛡️ View Active Supplier Claims ({claimsList.length})
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* =================================================================
              VIEW 4: RETURN TRACKING
             ================================================================= */}
          {activeTab === 'return-tracking' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h1 style={{ fontSize: '20px', fontWeight: '900', color: '#111827', margin: '0 0 4px 0' }}>
                    RETURN TRACKING & STATUS
                  </h1>
                  <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>
                    Monitor expected vs actual arrival dates, reverse courier AWB & customer refunds.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('returns-overview')}
                  style={{ backgroundColor: '#F3F4F6', color: '#111827', border: '1px solid #D1D5DB', padding: '8px 14px', fontSize: '12px', fontWeight: '800', borderRadius: '4px', cursor: 'pointer' }}
                >
                  ← Back to Overview
                </button>
              </div>

              {/* RETURN STATUS TABS */}
              <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #E5E7EB', paddingBottom: '8px', overflowX: 'auto' }}>
                {[
                  { id: 'ALL', label: 'All Returns', count: returnsList.length },
                  { id: 'New', label: 'New', count: returnCounts.new },
                  { id: 'Out for Delivery', label: 'Out for Delivery', count: returnCounts.outForDelivery },
                  { id: 'Delivered', label: 'Delivered', count: returnCounts.delivered },
                  { id: 'Lost', label: 'Lost', count: returnCounts.lost },
                  { id: 'No Return No Charge', label: 'No Return No Charge', count: returnCounts.noReturnNoCharge },
                  { id: 'Disposed', label: 'Disposed', count: returnCounts.disposed }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setReturnStatusFilter(tab.id)}
                    style={{
                      padding: '8px 14px',
                      border: 'none',
                      borderRadius: '6px',
                      backgroundColor: returnStatusFilter === tab.id ? '#0A0A0A' : '#FFFFFF',
                      color: returnStatusFilter === tab.id ? '#FFFFFF' : '#4B5563',
                      fontWeight: '800',
                      fontSize: '11px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>{tab.label}</span>
                    <span style={{ backgroundColor: returnStatusFilter === tab.id ? '#FF6B00' : '#F3F4F6', color: returnStatusFilter === tab.id ? '#FFFFFF' : '#111', padding: '2px 6px', borderRadius: '10px', fontSize: '9px' }}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* RETURNS DATA TABLE */}
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
                {filteredReturns.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6B7280' }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔄</div>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#111827' }}>No returns in "{returnStatusFilter}" state</div>
                  </div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#6B7280', fontSize: '11px', textTransform: 'uppercase' }}>
                        <th style={{ padding: '12px 14px' }}>Return Ref / Order</th>
                        <th style={{ padding: '12px 14px' }}>Customer</th>
                        <th style={{ padding: '12px 14px' }}>Product Info</th>
                        <th style={{ padding: '12px 14px' }}>Expected vs Actual Date</th>
                        <th style={{ padding: '12px 14px' }}>Return Status</th>
                        <th style={{ padding: '12px 14px' }}>Refund</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReturns.map(item => {
                        const delayed = isReturnDelayed(item.expectedReturnDate, item.actualReturnDate);

                        return (
                          <tr key={item.returnId} style={{ borderBottom: '1px solid #F3F4F6' }}>
                            <td style={{ padding: '12px 14px' }}>
                              <div style={{ fontWeight: '900', color: '#111827' }}>{item.returnId}</div>
                              <div style={{ fontSize: '11px', color: '#6B7280' }}>Order: {item.orderId}</div>
                              <div style={{ fontSize: '10px', color: '#9CA3AF' }}>Req: {item.returnRequestedDate}</div>
                            </td>
                            <td style={{ padding: '12px 14px' }}>
                              <div style={{ fontWeight: '700', color: '#111827' }}>{item.customerName}</div>
                              <div style={{ fontSize: '11px', color: '#6B7280' }}>{item.customerPhone}</div>
                            </td>
                            <td style={{ padding: '12px 14px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <img src={item.productImage} alt="" style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '4px' }} />
                                <div>
                                  <div style={{ fontWeight: '700' }}>{item.productName}</div>
                                  <div style={{ fontSize: '10px', color: '#6B7280' }}>{item.skuId} | Size: {item.size}</div>
                                  <div style={{ fontSize: '10px', color: '#D97706', fontStyle: 'italic' }}>"{item.returnReason}"</div>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: '12px 14px' }}>
                              <div>Exp: <strong>{item.expectedReturnDate}</strong></div>
                              {item.actualReturnDate ? (
                                <div style={{ fontSize: '11px', color: '#10B981', fontWeight: '700' }}>Arrived: {item.actualReturnDate}</div>
                              ) : (
                                delayed && (
                                  <span style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', fontSize: '9px', fontWeight: '900', padding: '2px 6px', borderRadius: '2px', display: 'inline-block', marginTop: '4px' }}>
                                    ⚠️ DELAYED IN TRANSIT
                                  </span>
                                )
                              )}
                              <div style={{ fontSize: '10px', color: '#6B7280', marginTop: '2px' }}>{item.courierName} ({item.trackingId})</div>
                            </td>
                            <td style={{ padding: '12px 14px' }}>
                              <span style={{
                                backgroundColor: item.returnStatus === 'Delivered' ? '#DEF7EC' : (item.returnStatus === 'Out for Delivery' ? '#FEF3C7' : '#F3F4F6'),
                                color: item.returnStatus === 'Delivered' ? '#03543F' : (item.returnStatus === 'Out for Delivery' ? '#92400E' : '#374151'),
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '10px',
                                fontWeight: '800'
                              }}>
                                {item.returnStatus}
                              </span>
                            </td>
                            <td style={{ padding: '12px 14px' }}>
                              <div style={{ fontWeight: '800', color: '#111827' }}>₹{item.refundAmount}</div>
                              <span style={{ fontSize: '10px', fontWeight: '800', color: item.refundStatus === 'Completed' ? '#10B981' : '#F59E0B' }}>
                                ● {item.refundStatus}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>

            </div>
          )}

          {/* =================================================================
              VIEW 5: CLAIM TRACKING
             ================================================================= */}
          {activeTab === 'claims' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h1 style={{ fontSize: '20px', fontWeight: '900', color: '#111827', margin: '0 0 4px 0' }}>
                    CLAIM TRACKING & RESOLUTIONS
                  </h1>
                  <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>
                    Track reverse transit damage, wrong product returns & merchant dispute settlements.
                  </p>
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
                {claimsList.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '50px 20px', color: '#6B7280' }}>
                    <div style={{ fontSize: '28px', marginBottom: '6px' }}>🛡️</div>
                    <div style={{ fontSize: '14px', fontWeight: '800' }}>No active disputes or claims.</div>
                  </div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#6B7280', fontSize: '11px', textTransform: 'uppercase' }}>
                        <th style={{ padding: '12px 16px' }}>Claim ID</th>
                        <th style={{ padding: '12px 16px' }}>Order & Return Ref</th>
                        <th style={{ padding: '12px 16px' }}>Product & Reason</th>
                        <th style={{ padding: '12px 16px' }}>Claim Amount</th>
                        <th style={{ padding: '12px 16px' }}>Status</th>
                        <th style={{ padding: '12px 16px' }}>Resolution</th>
                      </tr>
                    </thead>
                    <tbody>
                      {claimsList.map(claim => (
                        <tr key={claim.claimId} style={{ borderBottom: '1px solid #F3F4F6' }}>
                          <td style={{ padding: '14px 16px', fontWeight: '900', color: '#111827' }}>
                            {claim.claimId}
                            <div style={{ fontSize: '10px', color: '#6B7280', fontWeight: 'normal' }}>Filed: {claim.claimDate}</div>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ fontWeight: '700' }}>{claim.orderId}</div>
                            <div style={{ fontSize: '11px', color: '#6B7280' }}>Ret: {claim.returnId}</div>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ fontWeight: '700' }}>{claim.productName} ({claim.skuId})</div>
                            <div style={{ fontSize: '11px', color: '#4B5563' }}>"{claim.claimReason}"</div>
                          </td>
                          <td style={{ padding: '14px 16px', fontWeight: '900', color: '#111827' }}>
                            ₹{claim.claimAmount}
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <span style={{
                              backgroundColor: claim.claimStatus === 'Approved' ? '#DEF7EC' : '#FEF3C7',
                              color: claim.claimStatus === 'Approved' ? '#03543F' : '#92400E',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              fontWeight: '800'
                            }}>
                              {claim.claimStatus}
                            </span>
                          </td>
                          <td style={{ padding: '14px 16px', fontSize: '11px', color: '#4B5563' }}>
                            {claim.resolution}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

            </div>
          )}

          {/* =================================================================
              VIEW 6: INVENTORY & STOCK MANAGEMENT
             ================================================================= */}
          {activeTab === 'inventory' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h1 style={{ fontSize: '20px', fontWeight: '900', color: '#111827', margin: '0 0 4px 0' }}>
                    INVENTORY & STOCK CATALOG ({inventoryStats.totalCatalogCount} STYLES)
                  </h1>
                  <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>
                    Live stock units connected directly to store product availability.
                  </p>
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#6B7280', fontSize: '11px', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px 16px' }}>Style</th>
                      <th style={{ padding: '12px 16px' }}>Category</th>
                      <th style={{ padding: '12px 16px' }}>Selling Price</th>
                      <th style={{ padding: '12px 16px' }}>Current Stock</th>
                      <th style={{ padding: '12px 16px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(MASTER_PRODUCTS || []).map(prod => (
                      <tr key={prod.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src={prod.image} alt="" style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: '4px' }} />
                            <div>
                              <div style={{ fontWeight: '800', color: '#111827' }}>{prod.name}</div>
                              <div style={{ fontSize: '10px', color: '#6B7280' }}>ID: {prod.id} | Slug: {prod.slug}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px', color: '#4B5563' }}>{prod.category}</td>
                        <td style={{ padding: '12px 16px', fontWeight: '900', color: '#111827' }}>₹{prod.price}</td>
                        <td style={{ padding: '12px 16px', fontWeight: '800' }}>
                          {prod.stock} Units
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          {prod.stock === 0 ? (
                            <span style={{ backgroundColor: '#FEE2E2', color: '#991B1B', padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: '900' }}>
                              OUT OF STOCK
                            </span>
                          ) : prod.stock <= lowStockThreshold ? (
                            <span style={{ backgroundColor: '#FEF3C7', color: '#92400E', padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: '900' }}>
                              LOW STOCK
                            </span>
                          ) : (
                            <span style={{ backgroundColor: '#DEF7EC', color: '#03543F', padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: '800' }}>
                              IN STOCK
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* =====================================================================
          ORDER DETAILS MODAL POPUP
         ===================================================================== */}
      {selectedOrderDetails && (
        <div 
          onClick={() => setSelectedOrderDetails(null)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(3px)' }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto', border: '1px solid #111' }}
          >
            <div style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: '900', fontSize: '14px', letterSpacing: '1px' }}>
                ORDER DIAGNOSTICS: {selectedOrderDetails.id}
              </div>
              <button onClick={() => setSelectedOrderDetails(null)} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* STATUS & DATE */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EEE', paddingBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase', fontWeight: '800' }}>CURRENT STATUS</div>
                  <div style={{ fontWeight: '900', fontSize: '14px', color: '#FF6B00' }}>{selectedOrderDetails.status || 'Pending'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase', fontWeight: '800' }}>ORDER DATE</div>
                  <div style={{ fontWeight: '700', fontSize: '13px' }}>{selectedOrderDetails.date || 'Today'}</div>
                </div>
              </div>

              {/* CUSTOMER & SHIPPING */}
              <div style={{ backgroundColor: '#F9FAFB', padding: '12px', borderRadius: '6px', fontSize: '12px' }}>
                <div style={{ fontWeight: '800', marginBottom: '4px' }}>CUSTOMER & DELIVERY ADDRESS</div>
                <div><strong>Name:</strong> {selectedOrderDetails.customerName || 'Akash Muttewar'}</div>
                <div><strong>Phone:</strong> {selectedOrderDetails.customerPhone || '+91 98765 43210'}</div>
                <div><strong>Address:</strong> {selectedOrderDetails.shippingAddress || 'Flat 402, High Street Towers, Baner, Pune - 411045, Maharashtra'}</div>
                <div style={{ marginTop: '4px' }}><strong>Payment Mode:</strong> {selectedOrderDetails.paymentMethod || 'Cash On Delivery (COD)'}</div>
              </div>

              {/* PRODUCTS LIST */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#888', textTransform: 'uppercase', marginBottom: '8px' }}>ORDERED ITEMS</div>
                {(selectedOrderDetails.items || [{ name: selectedOrderDetails.name || 'Linen Top', price: selectedOrderDetails.price || 149, selectedSize: 'M', image: '/dress1.png' }]).map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center', borderBottom: '1px solid #F3F4F6', paddingBottom: '8px', marginBottom: '8px' }}>
                    <img src={item.image || '/dress1.png'} alt="" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div style={{ flex: 1, fontSize: '12px' }}>
                      <div style={{ fontWeight: '800' }}>{item.name}</div>
                      <div style={{ color: '#666', fontSize: '11px' }}>Size: {item.selectedSize || 'Free Size'} | Qty: {item.quantity || 1}</div>
                    </div>
                    <div style={{ fontWeight: '900', fontSize: '13px' }}>₹{item.price}</div>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '900', fontSize: '14px', marginTop: '8px' }}>
                  <span>Total Amount Paid:</span>
                  <span>₹{selectedOrderDetails.totalAmount || selectedOrderDetails.price}</span>
                </div>
              </div>

              {/* COURIER INFO */}
              <div style={{ borderTop: '1px solid #EEE', paddingTop: '12px', fontSize: '11px', color: '#666' }}>
                <div><strong>Assigned Courier:</strong> Delhivery Express Logistics</div>
                <div><strong>AWB / Tracking ID:</strong> DLV-990412891</div>
                <div><strong>Expected Delivery:</strong> 4 Days from Dispatch</div>
              </div>

              {/* MODAL ACTIONS */}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button
                  onClick={() => handleDownloadShippingLabel(selectedOrderDetails)}
                  style={{ padding: '8px 14px', backgroundColor: '#3B82F6', color: '#FFF', border: 'none', borderRadius: '4px', fontWeight: '800', fontSize: '11px', cursor: 'pointer' }}
                >
                  🏷️ Print Label
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedOrderDetails.id, 'Cancelled')}
                  style={{ padding: '8px 14px', backgroundColor: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '4px', fontWeight: '800', fontSize: '11px', cursor: 'pointer' }}
                >
                  Cancel Order
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}