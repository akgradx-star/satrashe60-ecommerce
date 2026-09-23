import React, { useState } from 'react';
import './ShopYourSize.css';

export default function ShopYourSize({ navigateTo }) {
  // Yeh control karega ki image dikhani hai ya size wala form
  const [showForm, setShowForm] = useState(false);
  
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [measurements, setMeasurements] = useState({ chest: '', shoulder: '' });
  
  const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleShopNow = () => {
    if (selectedSizes.length === 0) {
      alert("Please select at least one size to continue! 👕");
      return;
    }
    // 'size-filter' page par navigate karega aur selected sizes sath lekar jayega
    navigateTo('size-filter', selectedSizes);
  };

  return (
    <section className="sys-section">
      <h2 className="sys-title">SHOP YOUR SIZE</h2>

      {/* AGAR FORM FALSE HAI, TOH SIRF IMAGE DIKHEGI */}
      {!showForm ? (
        <div className="sys-banner" onClick={() => setShowForm(true)}>
          <img src="/dress1.png" alt="Shop Your Size" className="sys-img" />
          <div className="sys-click-overlay">
            <span>TAP TO SELECT SIZE</span>
          </div>
        </div>
      ) : (
        /* AGAR IMAGE PAR CLICK HUA, TOH YEH FORM DIKHEGA */
        <div className="sys-form-container">
          <p className="sys-subtitle">Select one or multiple sizes</p>
          
          {/* SIZE SELECTION BUTTONS */}
          <div className="sys-size-grid">
            {SIZES.map(size => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`sys-size-btn ${selectedSizes.includes(size) ? 'selected' : ''}`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* OPTIONAL MEASUREMENTS CHART */}
          {selectedSizes.length > 0 && (
            <div className="sys-measurements-box">
              <p className="sys-measurements-title">
                Optional: Enter Measurements for a perfect fit
              </p>
              <div className="sys-inputs-row">
                <input 
                  type="number" 
                  placeholder="Chest (in)" 
                  value={measurements.chest}
                  onChange={(e) => setMeasurements({...measurements, chest: e.target.value})}
                  className="sys-input"
                />
                <input 
                  type="number" 
                  placeholder="Shoulder (in)" 
                  value={measurements.shoulder}
                  onChange={(e) => setMeasurements({...measurements, shoulder: e.target.value})}
                  className="sys-input"
                />
              </div>
            </div>
          )}

          {/* ACTION BUTTONS (SHOP NOW & CANCEL) */}
          <div className="sys-action-row">
            <button 
              onClick={handleShopNow} 
              className={`sys-shop-btn ${selectedSizes.length > 0 ? 'active' : 'disabled'}`}
            >
              {selectedSizes.length > 0 ? `SHOP SIZES: ${selectedSizes.join(', ')} →` : 'SELECT A SIZE FIRST'}
            </button>
            
            {/* Wapas image par jane ka button */}
            <button onClick={() => setShowForm(false)} className="sys-cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}