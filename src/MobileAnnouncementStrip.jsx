import React from 'react';
import './MobileAnnouncementStrip.css';

// Admin-Ready Data Structure
// Later this can be fetched from an API/MongoDB
const ANNOUNCEMENT_MESSAGES = [
  "🔥 BIG MARKET DROPS — DIRECT TO YOUR PHONE",
  "⚡ NEW STYLES EVERY DAY",
  "🏷️ PRICE DROPS EVERY DAY",
  "🚚 PAN INDIA DELIVERY",
  "🔄 EASY RETURNS",
  "✨ NO RESTOCK"
];

export default function MobileAnnouncementStrip() {
  return (
    <section className="mobile-announcement-strip">
      <div className="marquee-wrapper">
        <div className="marquee-content">
          {/* We render the list twice to create a seamless infinite loop */}
          {ANNOUNCEMENT_MESSAGES.map((msg, idx) => (
            <React.Fragment key={`first-${idx}`}>
              <span className="marquee-text">{msg}</span>
              <span className="marquee-separator">//</span>
            </React.Fragment>
          ))}
          {ANNOUNCEMENT_MESSAGES.map((msg, idx) => (
            <React.Fragment key={`second-${idx}`}>
              <span className="marquee-text">{msg}</span>
              <span className="marquee-separator">//</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}