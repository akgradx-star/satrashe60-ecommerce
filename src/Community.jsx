import React, { useState } from 'react';

// ============================================================================
// 1. DATA ARCHITECTURE FOR COMMUNITY (MODERATION READY & DYNAMIC)
// ============================================================================

export const INITIAL_CUSTOMER_LOOKS = [
  {
    id: "look-1",
    customerName: "Aarushi M.",
    productName: "Black Ribbed Top",
    caption: "Styled with baggy cargo denim for college! Super comfortable.",
    image: "/dress2.png",
    status: "approved", // 'pending' | 'approved' | 'rejected'
    createdAt: "2026-08-10"
  },
  {
    id: "look-2",
    customerName: "Sneha Roy",
    productName: "Printed Co-ord Set",
    caption: "Wore this for a weekend brunch trip. Fabric feel is premium!",
    image: "/dress4.png",
    status: "approved",
    createdAt: "2026-08-08"
  },
  {
    id: "look-3",
    customerName: "Tanvi P.",
    productName: "Linen Shirt Top",
    caption: "Minimalist street look. Loving the fit.",
    image: "/dress1.png",
    status: "approved",
    createdAt: "2026-08-05"
  },
  {
    id: "look-4",
    customerName: "Kavya Menon",
    productName: "Tie Knot Shirt",
    caption: "The tie-up knot detail is just amazing.",
    image: "/dress3.png",
    status: "approved",
    createdAt: "2026-08-02"
  }
];

export const INITIAL_POLL = {
  id: "poll-drop-24",
  title: "VOTE THE NEXT DROP",
  description: "You help us decide what comes next. Pick your favorite style for next Friday's drop!",
  active: true,
  options: [
    { id: "opt-1", label: "Oversized Vintage Acid Wash Tee", image: "/dress1.png", votes: 142 },
    { id: "opt-2", label: "Flared Boho Peplum Corset Top", image: "/dress2.png", votes: 98 },
    { id: "opt-3", label: "Baroque Printed Resort Co-ord Set", image: "/dress4.png", votes: 186 }
  ]
};

export const FOUNDER_JOURNEY_POSTS = [
  {
    id: "post-1",
    day: "DAY 1",
    title: "THE ₹10,000 CHALLENGE",
    desc: "Started with a simple ₹10,000 challenge and a goal to build a real fashion brand from scratch.",
    tag: "Origins"
  },
  {
    id: "post-2",
    day: "DAY 2",
    title: "THE FIRST STOCK ARRIVED",
    desc: "Personally handpicked initial street market batches to test customer response.",
    tag: "Procurement"
  },
  {
    id: "post-3",
    day: "DAY 3",
    title: "THE FIRST ROADSIDE SETUP",
    desc: "Put up the first temporary stall. Result: ₹2,700 on Day 1 & ₹3,200 on Day 2.",
    tag: "Validation"
  },
  {
    id: "post-4",
    day: "BREAKTHROUGH",
    title: "₹7,000 DAY & THE REALIZATION",
    desc: "Peak sales proved the product was loved — the physical location was the only limitation.",
    tag: "Turning Point"
  }
];

export default function Community({ currentUser, onNavigateToAbout, onNavigateToAccount }) {
  // State Management
  const [looksList, setLooksList] = useState(INITIAL_CUSTOMER_LOOKS);
  const [pollData, setPollData] = useState(INITIAL_POLL);
  const [userVotedOption, setUserVotedOption] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  // Share Look Form State
  const [lookImageFile, setLookImageFile] = useState(null);
  const [lookImagePreview, setLookImagePreview] = useState("");
  const [lookCustomerName, setLookCustomerName] = useState(currentUser?.name || "");
  const [lookProductName, setLookProductName] = useState("");
  const [lookCaption, setLookCaption] = useState("");
  const [formError, setFormError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Total votes calculation
  const totalVotes = pollData.options.reduce((acc, opt) => acc + opt.votes, 0);

  // Handle Image Upload with Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLookImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setLookImagePreview(reader.result);
      reader.readAsDataURL(file);
      setFormError("");
    }
  };

  // Submit Look (Goes to Pending Review for Moderation)
  const handleSubmitLook = (e) => {
    e.preventDefault();
    if (!lookImagePreview) {
      setFormError("Please upload a photo of your style.");
      return;
    }

    const newLookSubmission = {
      id: "look-" + Date.now(),
      customerName: lookCustomerName.trim() || "Community Member",
      productName: lookProductName.trim() || "SATRASHE60 Style",
      caption: lookCaption.trim(),
      image: lookImagePreview,
      status: "pending", // Moderation: Pending admin approval
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Note: Kept as pending and not auto-published to public feed as requested
    console.log("Submitted for Admin Review:", newLookSubmission);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowShareModal(false);
      setLookImageFile(null);
      setLookImagePreview("");
      setLookProductName("");
      setLookCaption("");
    }, 2200);
  };

  // Vote for Next Drop Handler (One vote per user)
  const handleVote = (optionId) => {
    if (userVotedOption) return; // Prevent multiple votes

    const updatedOptions = pollData.options.map(opt => {
      if (opt.id === optionId) {
        return { ...opt, votes: opt.votes + 1 };
      }
      return opt;
    });

    setPollData({ ...pollData, options: updatedOptions });
    setUserVotedOption(optionId);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
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
        backgroundImage: "linear-gradient(to bottom, rgba(10,10,10,0.85), rgba(10,10,10,0.95)), url('/hero.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '3px', color: '#C9A227', textTransform: 'uppercase', marginBottom: '16px' }}>
            BE A PART OF IT
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 5.5vw, 58px)', fontWeight: '900', lineHeight: '1.15', letterSpacing: '-0.5px', marginBottom: '20px', textTransform: 'uppercase' }}>
            WELCOME TO THE SATRASHE60 COMMUNITY
          </h1>
          <p style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: '#CCCCCC', lineHeight: '1.7', maxWidth: '720px', margin: '0 auto 36px auto' }}>
            Don't just shop SATRASHE60. Be a part of it. The SATRASHE60 community is built around the people who discover our products, wear them, share their style and help us build the brand.
          </p>
          
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => {
                if (currentUser) {
                  scrollToSection('customer-looks-section');
                } else {
                  onNavigateToAccount();
                }
              }}
              style={{ backgroundColor: '#FF6B00', color: '#FFFFFF', border: 'none', padding: '15px 32px', fontSize: '12px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px' }}
            >
              JOIN THE COMMUNITY
            </button>
            <button 
              onClick={() => scrollToSection('customer-looks-section')}
              style={{ backgroundColor: 'transparent', color: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.4)', padding: '15px 28px', fontSize: '12px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px' }}
            >
              EXPLORE COMMUNITY ↓
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          LOGGED IN COMMUNITY MEMBER STATUS STRIP (IF ACTIVE)
         ===================================================================== */}
      {currentUser && (
        <div style={{ backgroundColor: '#F4F4F4', padding: '16px 6%', borderBottom: '1px solid #E5E5E5' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>👤 WELCOME BACK, {currentUser.name.toUpperCase()}</span>
              <span style={{ backgroundColor: '#C9A227', color: '#0A0A0A', fontSize: '9px', padding: '2px 6px', borderRadius: '2px', fontWeight: '900' }}>MEMBER</span>
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '11px', fontWeight: '800', letterSpacing: '1px' }}>
              <span onClick={() => setShowShareModal(true)} style={{ color: '#FF6B00', cursor: 'pointer', textDecoration: 'underline' }}>SHARE YOUR LOOK</span>
              <span onClick={() => scrollToSection('vote-section')} style={{ color: '#111', cursor: 'pointer' }}>VOTE NEXT DROP</span>
              <span onClick={onNavigateToAbout} style={{ color: '#111', cursor: 'pointer' }}>FOLLOW JOURNEY</span>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          2. CUSTOMER LOOKS SECTION
         ===================================================================== */}
      <section id="customer-looks-section" style={{ padding: '80px 6%', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '2.5px', color: '#C9A227', textTransform: 'uppercase' }}>
              COMMUNITY STYLE
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '36px', fontWeight: '900', textTransform: 'uppercase', margin: '6px 0 4px 0' }}>
              CUSTOMER LOOKS
            </h2>
            <p style={{ fontSize: '13px', color: '#666666', margin: 0 }}>
              See how the SATRASHE60 community styles their pieces across India.
            </p>
          </div>

          <button 
            onClick={() => setShowShareModal(true)}
            style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', border: 'none', padding: '12px 24px', fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', borderRadius: '2px', cursor: 'pointer' }}
          >
            📸 SHARE YOUR LOOK
          </button>
        </div>

        {/* CUSTOMER LOOKS GRID / EMPTY STATE */}
        {looksList.filter(l => l.status === 'approved').length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#F9F9F9', borderRadius: '8px', border: '1px solid #E5E5E5' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '8px' }}>YOUR LOOK COULD BE HERE.</h3>
            <p style={{ fontSize: '13px', color: '#666666', marginBottom: '20px' }}>Share your SATRASHE60 style and become part of the community.</p>
            <button onClick={() => setShowShareModal(true)} style={{ backgroundColor: '#FF6B00', color: '#FFFFFF', border: 'none', padding: '12px 24px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', borderRadius: '2px' }}>
              SHARE YOUR LOOK
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {looksList.filter(l => l.status === 'approved').map(look => (
              <div key={look.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '6px', overflow: 'hidden', border: '1px solid #E5E5E5', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', width: '100%', height: '340px', backgroundColor: '#F0F0F0', overflow: 'hidden' }}>
                  <img src={look.image} alt={look.customerName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', backgroundColor: 'rgba(10, 10, 10, 0.8)', color: '#FFFFFF', padding: '4px 10px', borderRadius: '3px', fontSize: '10px', fontWeight: '800', letterSpacing: '0.5px' }}>
                    Styled by: {look.customerName}
                  </div>
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#FF6B00', textTransform: 'uppercase', marginBottom: '4px' }}>
                    SATRASHE60: {look.productName}
                  </div>
                  {look.caption && (
                    <p style={{ fontSize: '12px', color: '#555555', lineHeight: '1.5', margin: 0, fontStyle: 'italic' }}>
                      "{look.caption}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* =====================================================================
          3. VOTE THE NEXT DROP (COMMUNITY POLL)
         ===================================================================== */}
      <section id="vote-section" style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '90px 6%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '2.5px', color: '#C9A227', textTransform: 'uppercase' }}>
              DECIDE NEXT WEEK'S STYLES
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '38px', fontWeight: '900', textTransform: 'uppercase', margin: '8px 0 12px 0' }}>
              {pollData.title}
            </h2>
            <p style={{ fontSize: '14px', color: '#AAAAAA', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
              {pollData.description}
            </p>
          </div>

          {/* POLL CARDS GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            {pollData.options.map((opt, idx) => {
              const votePercentage = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
              const hasUserVotedThis = userVotedOption === opt.id;

              return (
                <div key={opt.id} style={{ backgroundColor: '#141414', borderRadius: '6px', overflow: 'hidden', border: hasUserVotedThis ? '2px solid #FF6B00' : '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', width: '100%', height: '300px', backgroundColor: '#1A1A1A' }}>
                    <span style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: '#0A0A0A', color: '#C9A227', fontSize: '10px', fontWeight: '800', padding: '4px 8px', borderRadius: '2px', letterSpacing: '1px' }}>
                      OPTION {String.fromCharCode(65 + idx)}
                    </span>
                    <img src={opt.image} alt={opt.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF', marginBottom: '14px', lineHeight: '1.4' }}>
                      {opt.label}
                    </h3>

                    {/* VOTE BUTTON / RESULTS STATE */}
                    <div>
                      {userVotedOption ? (
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '800', marginBottom: '6px' }}>
                            <span style={{ color: hasUserVotedThis ? '#FF6B00' : '#CCCCCC' }}>
                              {hasUserVotedThis ? "✓ Your Choice" : "Community Vote"}
                            </span>
                            <span style={{ color: '#C9A227' }}>{votePercentage}% ({opt.votes})</span>
                          </div>
                          <div style={{ width: '100%', height: '6px', backgroundColor: '#222222', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: `${votePercentage}%`, height: '100%', backgroundColor: hasUserVotedThis ? '#FF6B00' : '#C9A227', transition: 'width 0.5s' }}></div>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleVote(opt.id)}
                          style={{ width: '100%', backgroundColor: '#FFFFFF', color: '#0A0A0A', border: 'none', padding: '12px', fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px' }}
                        >
                          VOTE FOR THIS
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {userVotedOption && (
            <div style={{ textAlign: 'center', color: '#28a745', fontSize: '12px', fontWeight: '800', letterSpacing: '1px' }}>
              ✓ YOUR VOTE HAS BEEN COUNTED! Results update live as community members vote.
            </div>
          )}

        </div>
      </section>

      {/* =====================================================================
          4. FOUNDER JOURNEY
         ===================================================================== */}
      <section style={{ padding: '90px 6%', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '2.5px', color: '#C9A227', textTransform: 'uppercase' }}>
              REAL STORY
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '36px', fontWeight: '900', textTransform: 'uppercase', margin: '6px 0 4px 0' }}>
              FOLLOW THE JOURNEY
            </h2>
            <p style={{ fontSize: '13px', color: '#666666', margin: 0 }}>
              SATRASHE60 started with a ₹10,000 challenge. Follow the real updates as we build the brand.
            </p>
          </div>

          <button 
            onClick={onNavigateToAbout}
            style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', border: 'none', padding: '12px 24px', fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', borderRadius: '2px', cursor: 'pointer' }}
          >
            READ FULL STORY →
          </button>
        </div>

        {/* JOURNEY CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {FOUNDER_JOURNEY_POSTS.map(post => (
            <div key={post.id} style={{ backgroundColor: '#F9F9F9', border: '1px solid #E5E5E5', borderRadius: '6px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '900', color: '#FF6B00', fontFamily: 'monospace' }}>{post.day}</span>
                  <span style={{ fontSize: '9px', fontWeight: '800', backgroundColor: '#EAEAEA', color: '#555', padding: '2px 6px', borderRadius: '2px', textTransform: 'uppercase' }}>{post.tag}</span>
                </div>
                <h3 style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px', color: '#111111' }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: '12px', color: '#666666', lineHeight: '1.6', margin: 0 }}>
                  {post.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          5. JOIN SATRASHE60 (FINAL COMMUNITY CTA)
         ===================================================================== */}
      <section style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '90px 6%', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '3px', color: '#C9A227', textTransform: 'uppercase' }}>
            BE PART OF THE JOURNEY
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '38px', fontWeight: '900', textTransform: 'uppercase', margin: '12px 0 16px 0' }}>
            WE'RE STILL AT THE BEGINNING.
          </h2>
          <p style={{ fontSize: '14px', color: '#AAAAAA', lineHeight: '1.8', marginBottom: '32px' }}>
            Every order, every review, every shared look, and every vote helps us build SATRASHE60 one step at a time.
          </p>

          {currentUser ? (
            <div style={{ backgroundColor: '#141414', border: '1px solid #28a745', color: '#28a745', padding: '14px 28px', borderRadius: '4px', display: 'inline-block', fontSize: '12px', fontWeight: '800', letterSpacing: '1px' }}>
              YOU'RE PART OF THE COMMUNITY ✓
            </div>
          ) : (
            <button 
              onClick={onNavigateToAccount}
              style={{ backgroundColor: '#FF6B00', color: '#FFFFFF', border: 'none', padding: '16px 36px', fontSize: '12px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px' }}
            >
              JOIN SATRASHE60
            </button>
          )}
        </div>
      </section>

      {/* =====================================================================
          SHARE YOUR LOOK MODAL (WITH MODERATION NOTICE)
         ===================================================================== */}
      {showShareModal && (
        <div 
          onClick={() => setShowShareModal(false)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', maxWidth: '520px', width: '100%', maxHeight: '90vh', overflowY: 'auto', border: '1px solid #111', position: 'relative' }}
          >
            <div style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 2 }}>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                SHARE YOUR SATRASHE60 LOOK
              </h3>
              <button onClick={() => setShowShareModal(false)} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ padding: '24px' }}>
              <form onSubmit={handleSubmitLook} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* PHOTO UPLOAD & PREVIEW */}
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '800', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                    UPLOAD PHOTO * (JPG, PNG, WEBP)
                  </label>
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg, image/webp" 
                    onChange={handleImageChange}
                    style={{ fontSize: '12px', width: '100%' }}
                  />

                  {lookImagePreview && (
                    <div style={{ marginTop: '12px', position: 'relative', width: '100%', height: '220px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #E0E0E0' }}>
                      <img src={lookImagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button 
                        type="button" 
                        onClick={() => { setLookImageFile(null); setLookImagePreview(""); }}
                        style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: 'rgba(0,0,0,0.75)', color: '#FFF', border: 'none', borderRadius: '50%', width: '26px', height: '26px', cursor: 'pointer', fontSize: '12px' }}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: '800', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                    YOUR DISPLAY NAME
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Aarushi M." 
                    value={lookCustomerName} 
                    onChange={(e) => setLookCustomerName(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #CCC', borderRadius: '4px', fontSize: '12px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: '800', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                    PRODUCT NAME (OPTIONAL)
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Black Ribbed Top" 
                    value={lookProductName} 
                    onChange={(e) => setLookProductName(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #CCC', borderRadius: '4px', fontSize: '12px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: '800', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                    CAPTION / HOW DID YOU STYLE IT? (OPTIONAL)
                  </label>
                  <textarea 
                    rows="3" 
                    placeholder="Tell the community how you paired this outfit..."
                    value={lookCaption} 
                    onChange={(e) => setLookCaption(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #CCC', borderRadius: '4px', fontSize: '12px', boxSizing: 'border-box' }}
                  ></textarea>
                </div>

                {formError && <div style={{ color: '#D92D20', fontSize: '12px', fontWeight: '700' }}>{formError}</div>}
                {submitSuccess && (
                  <div style={{ backgroundColor: '#E8F5E9', border: '1px solid #C8E6C9', color: '#2E7D32', padding: '12px', borderRadius: '4px', fontSize: '12px', fontWeight: '800' }}>
                    THANK YOU! Your look has been submitted for review ✓
                  </div>
                )}

                <div style={{ fontSize: '10px', color: '#888888', lineHeight: '1.4' }}>
                  🛡️ Moderation Note: Submissions are reviewed by our team before appearing in the public Customer Looks gallery.
                </div>

                <button 
                  type="submit" 
                  style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', border: 'none', padding: '14px', fontSize: '12px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', borderRadius: '4px', cursor: 'pointer' }}
                >
                  SUBMIT LOOK
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}