import React from 'react';
import './CampaignCarousel.css';

const CAMPAIGNS = [
  { id: '1', title: 'BASICS', subtitle: 'DAILY', image: '/dress1.png', link: 'shop' },
  { id: '2', title: 'LUXURY', subtitle: 'CURATED', image: '/dress2.png', link: 'shop' },
  { id: '3', title: 'FORMAL', subtitle: 'WEAR', image: '/dress3.png', link: 'shop' }
];

export default function CampaignCarousel({ navigateTo }) {
  return (
    <section className="campaign-section">
      <div className="campaign-scroll-container">
        {CAMPAIGNS.map((item) => (
          <div key={item.id} className="campaign-card" onClick={() => navigateTo(item.link)}>
            <img src={item.image} alt={item.title} className="campaign-img" />
            <div className="campaign-overlay">
              <h3 className="camp-title">{item.title}</h3>
              <p className="camp-subtitle">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}