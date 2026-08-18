
import React from 'react';

// ============================================================================
// 📸 FOUNDER IMAGE CONFIGURATION:
// Replace '/hero.png' with your real portrait photo path (e.g. '/founder.jpg')
// ============================================================================
const  FOUNDER_PHOTO_SRC = "/CEO.jpeg"; // <-- REPLACE YOUR PHOTO HERE

export default function About({ onNavigateToShop }) {
  const scrollToStory = () => {
    const el = document.getElementById('about-story-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#111111', fontFamily: "'Inter', -apple-system, sans-serif", width: '100%', overflowX: 'hidden' }}>
      
      {/* =====================================================================
          1. HERO SECTION
         ===================================================================== */}
      <section style={{ 
        backgroundColor: '#0A0A0A', 
        color: '#FFFFFF', 
        padding: '90px 6% 100px 6%', 
        position: 'relative',
        backgroundImage: "linear-gradient(to bottom, rgba(10,10,10,0.88), rgba(10,10,10,0.96)), url('/hero.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '3px', color: '#C9A227', textTransform: 'uppercase', marginBottom: '16px' }}>
            MORE THAN CLOTHES. A JOURNEY.
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: '900', lineHeight: '1.1', letterSpacing: '-0.5px', marginBottom: '24px', textTransform: 'uppercase' }}>
            FASHION SHOULD NOT DEPEND ON WHERE YOU LIVE.
          </h1>
          <p style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: '#CCCCCC', lineHeight: '1.7', maxWidth: '700px', margin: '0 auto 36px auto' }}>
            SATRASHE60 started with a simple challenge — start with ₹10,000 and build something of our own. What began as a small roadside offline experiment became a bigger realization for Indian fashion.
          </p>
          <button 
            onClick={scrollToStory}
            style={{ backgroundColor: 'transparent', color: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.4)', padding: '14px 32px', fontSize: '11px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px', transition: 'all 0.2s' }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = '#0A0A0A'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#FFFFFF'; }}
          >
            OUR STORY ↓
          </button>
        </div>
      </section>

      {/* =====================================================================
          2. MEET THE FOUNDER SECTION
         ===================================================================== */}
      <section id="about-story-section" style={{ padding: '90px 6%', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
          
          {/* FOUNDER IMAGE (EASY TO REPLACE) */}
          <div style={{ position: 'relative', width: '100%', height: '480px', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#F0F0F0', border: '1px solid #E5E5E5' }}>
            <img 
              src={FOUNDER_PHOTO_SRC} 
              alt="Akash Muttewar - Founder & CEO SATRASHE60" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', backgroundColor: 'rgba(10, 10, 10, 0.85)', backdropFilter: 'blur(6px)', padding: '12px 16px', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '12px', fontWeight: '800', color: '#FFFFFF', letterSpacing: '1px', textTransform: 'uppercase' }}>AKASH MUTTEWAR</div>
              <div style={{ fontSize: '10px', color: '#C9A227', fontWeight: '700', letterSpacing: '0.5px' }}>FOUNDER & CEO — SATRASHE60</div>
            </div>
          </div>

          {/* FOUNDER INTRO */}
          <div>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '2.5px', color: '#888888', textTransform: 'uppercase' }}>
              MEET THE FOUNDER
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '38px', fontWeight: '900', margin: '8px 0 16px 0', textTransform: 'uppercase', lineHeight: '1.15' }}>
              AKASH MUTTEWAR
            </h2>
            <div style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '1.5px', color: '#FF6B00', marginBottom: '20px', textTransform: 'uppercase' }}>
              FOUNDER & CEO — SATRASHE60
            </div>

            <p style={{ fontSize: '18px', fontStyle: 'italic', color: '#333333', lineHeight: '1.6', marginBottom: '20px', borderLeft: '3px solid #C9A227', paddingLeft: '16px' }}>
              "SATRASHE60 was born from my decision to stop waiting for the perfect opportunity and start building with what I had."
            </p>

            <p style={{ fontSize: '14px', color: '#555555', lineHeight: '1.8' }}>
              We didn't start in a boardroom with millions in funding. We started on the raw Indian streets with pure intent, observing how real people connect with clothes and discovering the huge gap between bustling city wholesale markets and fashion enthusiasts across India.
            </p>
          </div>

        </div>
      </section>

      {/* =====================================================================
          3. THE ₹10,000 BEGINNING & THE REAL CHALLENGE
         ===================================================================== */}
      <section style={{ backgroundColor: '#F9F9F9', padding: '90px 6%', borderTop: '1px solid #EBEBEB', borderBottom: '1px solid #EBEBEB' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '2.5px', color: '#C9A227', textTransform: 'uppercase' }}>
              ORIGIN STORY
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '36px', fontWeight: '900', textTransform: 'uppercase', margin: '8px 0 16px 0' }}>
              IT STARTED WITH ₹10,000.
            </h2>
            <p style={{ fontSize: '15px', color: '#666666', maxWidth: '680px', margin: '0 auto', lineHeight: '1.7' }}>
              I took a challenge: Start a business with ₹10,000. No big investment. No large store. No huge team. Just an idea, some clothing stock and the willingness to try.
            </p>
          </div>

          {/* REALITY STATS STRIP */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '60px' }}>
            <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '6px', border: '1px solid #E5E5E5', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#888', textTransform: 'uppercase', marginBottom: '6px' }}>FIRST DAY REVENUE</div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111' }}>₹2,700</div>
              <div style={{ fontSize: '11px', color: '#28a745', fontWeight: '700', marginTop: '4px' }}>✓ Immediate Customer Demand</div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '6px', border: '1px solid #E5E5E5', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#888', textTransform: 'uppercase', marginBottom: '6px' }}>SECOND DAY REVENUE</div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111' }}>₹3,200</div>
              <div style={{ fontSize: '11px', color: '#28a745', fontWeight: '700', marginTop: '4px' }}>✓ Confirmed Appeal</div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '6px', border: '1px solid #E5E5E5', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#888', textTransform: 'uppercase', marginBottom: '6px' }}>UNSTABLE SPOT DAYS</div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#D92D20' }}>₹500 – ₹700</div>
              <div style={{ fontSize: '11px', color: '#666', fontWeight: '600', marginTop: '4px' }}>Local restrictions & Weather</div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '6px', border: '1px solid #E5E5E5', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#888', textTransform: 'uppercase', marginBottom: '6px' }}>PEAK SPOT BREAKTHROUGH</div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#FF6B00' }}>₹7,000</div>
              <div style={{ fontSize: '11px', color: '#28a745', fontWeight: '700', marginTop: '4px' }}>✓ The Product Was Right</div>
            </div>
          </div>

          {/* THE REAL CHALLENGE DETAILS */}
          <div style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '40px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: '800', marginBottom: '14px', color: '#C9A227', textTransform: 'uppercase' }}>
              THE PRODUCT WASN'T THE PROBLEM. THE PLACE WAS.
            </h3>
            <p style={{ fontSize: '14px', color: '#CCCCCC', lineHeight: '1.8', margin: '0 0 16px 0' }}>
              The problem was not that customers didn't want the clothes. The problem was the severe limitation of selling from physical roadside spots — police interventions, municipal permissions, unpredictable weather, heavy rains, and unstable selling counters.
            </p>
            <p style={{ fontSize: '14px', color: '#CCCCCC', lineHeight: '1.8', margin: 0 }}>
              Whenever the location worked, the sales skyrocketed to ₹7,000. That proved people genuinely loved the fashion curation. The constraint was strictly physical access.
            </p>
          </div>

        </div>
      </section>

      {/* =====================================================================
          4. THE REALIZATION & WHY SATRASHE60
         ===================================================================== */}
      <section style={{ padding: '90px 6%', maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '2.5px', color: '#888888', textTransform: 'uppercase' }}>
          THAT'S WHEN I REALIZED SOMETHING
        </span>
        
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: '900', margin: '14px 0 24px 0', textTransform: 'uppercase', lineHeight: '1.2' }}>
          THE CUSTOMER WAS THERE.<br />
          THE DEMAND WAS THERE.<br />
          <span style={{ color: '#FF6B00' }}>THE LOCATION WAS THE PROBLEM.</span>
        </h2>

        <p style={{ fontSize: '15px', color: '#555555', lineHeight: '1.8', maxWidth: '760px', margin: '0 auto 40px auto' }}>
          Millions of people living in smaller cities, tier-2/3 towns, and villages want fashionable and affordable clothes but cannot easily travel to major city wholesale and street hubs. Why should good fashion depend on geography?
        </p>

        {/* COMPARISON FLOW */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '700px', margin: '0 auto', textAlign: 'left' }}>
          <div style={{ backgroundColor: '#F5F5F5', padding: '20px', borderRadius: '6px', border: '1px solid #E0E0E0' }}>
            <div style={{ fontSize: '10px', fontWeight: '800', color: '#888', textTransform: 'uppercase', marginBottom: '6px' }}>OLD MODEL</div>
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#999' }}>CUSTOMER → TRAVEL TO MARKET</div>
            <div style={{ fontSize: '11px', color: '#666', marginTop: '6px' }}>Costly travel, limited choices, wasted time.</div>
          </div>

          <div style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '20px', borderRadius: '6px', border: '1px solid #C9A227' }}>
            <div style={{ fontSize: '10px', fontWeight: '800', color: '#C9A227', textTransform: 'uppercase', marginBottom: '6px' }}>SATRASHE60 MODEL</div>
            <div style={{ fontSize: '13px', fontWeight: '900', color: '#FFFFFF' }}>FASHION → CUSTOMER</div>
            <div style={{ fontSize: '11px', color: '#CCCCCC', marginTop: '6px' }}>Direct discovery delivered to your doorstep.</div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. OUR PRODUCT PHILOSOPHY
         ===================================================================== */}
      <section style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '90px 6%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '2.5px', color: '#C9A227', textTransform: 'uppercase' }}>
              OUR PRODUCT PHILOSOPHY
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '36px', fontWeight: '900', textTransform: 'uppercase', margin: '8px 0' }}>
              HANDPICKED. AFFORDABLE. DIFFERENT.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: '#141414', border: '1px solid rgba(255,255,255,0.1)', padding: '28px 24px', borderRadius: '6px' }}>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>🛍️</div>
              <h3 style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px', color: '#FFFFFF' }}>HANDPICKED</h3>
              <p style={{ fontSize: '12px', color: '#AAAAAA', lineHeight: '1.6', margin: 0 }}>Every piece is curated with strict intention from street hubs rather than mass-filling a generic catalog.</p>
            </div>

            <div style={{ backgroundColor: '#141414', border: '1px solid rgba(255,255,255,0.1)', padding: '28px 24px', borderRadius: '6px' }}>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>🏷️</div>
              <h3 style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px', color: '#FFFFFF' }}>AFFORDABLE</h3>
              <p style={{ fontSize: '12px', color: '#AAAAAA', lineHeight: '1.6', margin: 0 }}>Style should never require a massive budget. We keep prices direct, accessible and pocket-friendly.</p>
            </div>

            <div style={{ backgroundColor: '#141414', border: '1px solid rgba(255,255,255,0.1)', padding: '28px 24px', borderRadius: '6px' }}>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>🔍</div>
              <h3 style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px', color: '#FFFFFF' }}>DISCOVERY</h3>
              <p style={{ fontSize: '12px', color: '#AAAAAA', lineHeight: '1.6', margin: 0 }}>Every drop and visit should feel like uncovering a fresh treasure you wouldn't easily find in your local market.</p>
            </div>

            <div style={{ backgroundColor: '#141414', border: '1px solid rgba(255,255,255,0.1)', padding: '28px 24px', borderRadius: '6px' }}>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>⚡</div>
              <h3 style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px', color: '#FFFFFF' }}>LIMITED</h3>
              <p style={{ fontSize: '12px', color: '#AAAAAA', lineHeight: '1.6', margin: 0 }}>Unique street fashion with no massive restocks. When it's gone, it makes way for the next new style.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. MISSION & VISION
         ===================================================================== */}
      <section style={{ padding: '90px 6%', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          
          <div style={{ backgroundColor: '#FAFAFA', padding: '36px', borderRadius: '8px', border: '1px solid #E5E5E5' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '2.5px', color: '#FF6B00', textTransform: 'uppercase' }}>OUR MISSION</span>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', fontWeight: '900', margin: '10px 0 16px 0', textTransform: 'uppercase' }}>
              MAKE FASHION ACCESSIBLE, WHEREVER YOU LIVE.
            </h3>
            <p style={{ fontSize: '13px', color: '#555555', lineHeight: '1.8', margin: 0 }}>
              To bridge the physical distance between India's most vibrant fashion markets and customers through e-commerce, seamless logistics, and community discovery.
            </p>
          </div>

          <div style={{ backgroundColor: '#FAFAFA', padding: '36px', borderRadius: '8px', border: '1px solid #E5E5E5' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '2.5px', color: '#C9A227', textTransform: 'uppercase' }}>OUR VISION</span>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', fontWeight: '900', margin: '10px 0 16px 0', textTransform: 'uppercase' }}>
              FROM ONE SMALL SHOP TO A FASHION DESTINATION.
            </h3>
            <p style={{ fontSize: '13px', color: '#555555', lineHeight: '1.8', margin: 0 }}>
              Starting one product, one order, and one customer at a time to build a nationwide street-fashion destination where genuine value meets trendsetting designs.
            </p>
          </div>

        </div>
      </section>

      {/* =====================================================================
          7. THE JOURNEY TIMELINE
         ===================================================================== */}
      <section style={{ backgroundColor: '#F9F9F9', padding: '90px 6%', borderTop: '1px solid #EAEAEA', borderBottom: '1px solid #EAEAEA' }}>
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '2.5px', color: '#888', textTransform: 'uppercase' }}>CHRONOLOGY</span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '36px', fontWeight: '900', textTransform: 'uppercase', margin: '8px 0' }}>
              THE JOURNEY SO FAR
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { num: "01", title: "THE CHALLENGE — ₹10,000", desc: "Started with a personal challenge to build a real enterprise from absolute scratch." },
              { num: "02", title: "THE FIRST OFFLINE SHOP", desc: "Procured initial curated clothing stock and setup temporary roadside stalls to test real buyer interest." },
              { num: "03", title: "THE FIRST SALES — ₹2,700 & ₹3,200", desc: "Immediate validation. Customers stopped, tried, and bought with high enthusiasm." },
              { num: "04", title: "THE ROADBLOCKS — ₹500 & ₹700", desc: "Encountered police removal notices, municipal limitations, unstable spots, and bad weather." },
              { num: "05", title: "THE BREAKTHROUGH — ₹7,000", desc: "A prime location generated massive single-day sales, proving customer appetite was enormous." },
              { num: "06", title: "THE REALIZATION", desc: "The product was never the problem — physical access and fixed geography were the constraints." },
              { num: "07", title: "SATRASHE60 ONLINE", desc: "Transitioned the entire curated street-fashion discovery system online to reach all of India." }
            ].map(step => (
              <div key={step.num} style={{ display: 'flex', gap: '20px', backgroundColor: '#FFFFFF', padding: '20px 24px', borderRadius: '6px', border: '1px solid #E5E5E5', alignItems: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#C9A227', fontFamily: 'monospace', minWidth: '36px' }}>{step.num}</div>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 4px 0' }}>{step.title}</h4>
                  <p style={{ fontSize: '12px', color: '#666666', margin: 0, lineHeight: '1.5' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. FOUNDER'S AUTHENTIC NOTE
         ===================================================================== */}
      <section style={{ padding: '90px 6%', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '2.5px', color: '#C9A227', textTransform: 'uppercase' }}>
          PERSONAL NOTE
        </span>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '32px', fontWeight: '900', textTransform: 'uppercase', margin: '8px 0 28px 0' }}>
          A NOTE FROM AKASH
        </h2>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', padding: '40px', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', textAlign: 'left' }}>
          <p style={{ fontSize: '14px', color: '#444444', lineHeight: '1.8', marginBottom: '16px' }}>
            "I don't know exactly how far SATRASHE60 will go. But I know where it started. It started with ₹10,000. It started with putting clothes on a roadside stall and seeing whether people would buy them.
          </p>
          <p style={{ fontSize: '14px', color: '#444444', lineHeight: '1.8', marginBottom: '16px' }}>
            There were good days. There were difficult days. There were days when I had to pack and remove the entire shop. But every single obstacle taught me something clear: If the location is the problem, build something that doesn't depend on one location.
          </p>
          <p style={{ fontSize: '14px', color: '#444444', lineHeight: '1.8', marginBottom: '24px' }}>
            That's why I'm building SATRASHE60. I don't want this to remain just a small clothing business — I want to see how far we can take it. And this is only the beginning."
          </p>

          <div style={{ borderTop: '1px solid #EEEEEE', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '900', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>AKASH MUTTEWAR</div>
              <div style={{ fontSize: '11px', color: '#888888', fontWeight: '700' }}>FOUNDER & CEO — SATRASHE60</div>
            </div>
            <span style={{ fontSize: '20px' }}>✍️</span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          9. WHAT WE BELIEVE
         ===================================================================== */}
      <section style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '90px 6%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '2.5px', color: '#C9A227', textTransform: 'uppercase' }}>CORE PRINCIPLES</span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '36px', fontWeight: '900', textTransform: 'uppercase', margin: '8px 0' }}>
              WHAT WE BELIEVE
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div style={{ padding: '24px', backgroundColor: '#141414', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', color: '#FF6B00' }}>
                FASHION SHOULD BE ACCESSIBLE.
              </h4>
              <p style={{ fontSize: '12px', color: '#AAAAAA', lineHeight: '1.6', margin: 0 }}>Your physical pincode or location shouldn't decide what trends you get to wear.</p>
            </div>

            <div style={{ padding: '24px', backgroundColor: '#141414', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', color: '#FF6B00' }}>
                STYLE DOESN'T HAVE TO BE EXPENSIVE.
              </h4>
              <p style={{ fontSize: '12px', color: '#AAAAAA', lineHeight: '1.6', margin: 0 }}>Affordable fashion can still be premium, durable, and highly expressive.</p>
            </div>

            <div style={{ padding: '24px', backgroundColor: '#141414', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', color: '#FF6B00' }}>
                SMALL BEGINNINGS BUILD BIG THINGS.
              </h4>
              <p style={{ fontSize: '12px', color: '#AAAAAA', lineHeight: '1.6', margin: 0 }}>We are proud to start small with ₹10,000 and build brick-by-brick with long-term vision.</p>
            </div>

            <div style={{ padding: '24px', backgroundColor: '#141414', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', color: '#FF6B00' }}>
                CUSTOMERS BUILD BRANDS.
              </h4>
              <p style={{ fontSize: '12px', color: '#AAAAAA', lineHeight: '1.6', margin: 0 }}>Every single parcel, review, and feedback message is deeply valued.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          10. COMMUNITY CTA & FINAL BRAND STATEMENT
         ===================================================================== */}
      <section style={{ padding: '100px 6%', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '3px', color: '#C9A227', textTransform: 'uppercase' }}>
            JOIN OUR STORY
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '40px', fontWeight: '900', textTransform: 'uppercase', margin: '12px 0 16px 0' }}>
            BUILD THIS JOURNEY WITH US.
          </h2>
          <p style={{ fontSize: '14px', color: '#666666', lineHeight: '1.8', marginBottom: '32px' }}>
            SATRASHE60 is still at the beginning. Every order, every review, and every share helps us take the next step towards making street fashion accessible across India.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={onNavigateToShop}
              style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', border: 'none', padding: '16px 36px', fontSize: '12px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', borderRadius: '2px', cursor: 'pointer' }}
            >
              SHOP NOW →
            </button>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              style={{ backgroundColor: 'transparent', color: '#111111', border: '1px solid #111111', padding: '16px 32px', fontSize: '12px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px', display: 'inline-flex', alignItems: 'center' }}
            >
              FOLLOW OUR JOURNEY
            </a>
          </div>

          <div style={{ marginTop: '70px', paddingTop: '40px', borderTop: '1px solid #EBEBEB' }}>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>
              FROM ₹10,000 TO A BRAND.
            </div>
            <div style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '3px', color: '#FF6B00', marginTop: '6px' }}>
              SATRASHE60 — ONE PIECE. ONE CHANCE.
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}