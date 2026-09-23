import React from 'react';
import './ShopByCategory.css';

// Admin-Ready Data Structure
const CATEGORIES_DATA = [
  { id: 'tops', name: 'TOPS', image: '/dress1.png', slug: 'Tops' },
  { id: 'tshirts', name: 'T-SHIRTS', image: '/dress2.png', slug: 'T-Shirts' },
  { id: 'kurtis', name: 'KURTIS', image: '/dress3.png', slug: 'Kurtis' },
  { id: 'one-pieces', name: 'ONE PIECES', image: '/dress4.png', slug: 'One Pieces' },
  { id: 'jeans', name: 'JEANS', image: '/dress1.png', slug: 'Jeans' },
  { id: 'track-pants', name: 'TRACK PANTS', image: '/dress2.png', slug: 'Track Pants' },
  { id: 'dresses', name: 'DRESSES', image: '/dress3.png', slug: 'Dresses' },
  { id: 'coords', name: 'CO-ORDS', image: '/dress4.png', slug: 'Co-ord Sets' },
  { id: 'new-drop', name: 'NEW DROP', image: '/hero.png', slug: 'New Drop' },
  { id: 'more', name: 'MORE', image: '/dress1.png', slug: 'ALL' }
];

export default function ShopByCategory({ navigateTo }) {
  return (
    <section className="sbc-section">
      <h2 className="sbc-heading">SHOP BY CATEGORY</h2>
      
      <div className="sbc-grid">
        {CATEGORIES_DATA.map((cat) => (
          <div 
            key={cat.id} 
            className="sbc-card" 
            onClick={() => navigateTo('category-plp', cat.slug)}
          >
            <div className="sbc-image-wrapper">
              <img src={cat.image} alt={cat.name} className="sbc-image" loading="lazy" />
            </div>
            <div className="sbc-card-title">
              {cat.name} <span className="sbc-arrow">→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}