"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function DogMannyPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutSlide, setAboutSlide] = useState(0);
  const aboutRef = useRef<HTMLDivElement>(null);
  const slideTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const aboutPhotos = [
    { src: "/wells-cavapoo-indoor.jpeg", alt: "Wells with cavapoo" },
    { src: "/wells-walking-dogs.jpeg", alt: "Wells walking dogs" },
    { src: "/wells-pomeranian-puppy.jpeg", alt: "Pomeranian puppy" },
    { src: "/wells-hiking.jpeg", alt: "Wells hiking with a dog" },
    { src: "/wells-pomeranian-outdoors.jpeg", alt: "Pomeranian outdoors" },
    { src: "/wells-white-dog-couch.jpeg", alt: "White dog relaxing on couch" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    // Force light mode regardless of OS dark mode setting
    const meta = document.createElement("meta");
    meta.name = "color-scheme";
    meta.content = "light only";
    document.head.appendChild(meta);

    // Start slideshow only when about section is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !slideTimerRef.current) {
          slideTimerRef.current = setInterval(() => {
            setAboutSlide(prev => (prev + 1) % 6);
          }, 3000);
        } else if (!entry.isIntersecting && slideTimerRef.current) {
          clearInterval(slideTimerRef.current);
          slideTimerRef.current = null;
        }
      },
      { threshold: 0.3 }
    );
    if (aboutRef.current) observer.observe(aboutRef.current);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.head.removeChild(meta);
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Sora:wght@400;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --blue: #3B6FE8;
          --teal: #00C2B2;
          --purple: #7B3FBE;
          --coral: #F0626A;
          --grad: linear-gradient(135deg, var(--purple), var(--coral) 40%, var(--blue) 70%, var(--teal));
          --dark: #111318;
          --mid: #5A5F6E;
          --light: #F5F6FA;
          --white: #FFFFFF;
          --border: #E8EAEF;
        }

        html {
          scroll-behavior: smooth;
          color-scheme: light only;
        }
        body {
          font-family: 'Inter', sans-serif;
          background: var(--white) !important;
          color: var(--dark) !important;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        /* NAV */
        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 0 2rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background 0.3s, box-shadow 0.3s;
        }
        nav.scrolled {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(16px);
          box-shadow: 0 1px 0 var(--border);
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
        }
        .logo img { height: 32px; width: auto; }
        .logo-text {
          font-family: 'Sora', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--dark);
          letter-spacing: -0.02em;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
        }
        .nav-links a {
          font-size: 0.875rem;
          color: var(--mid);
          text-decoration: none;
          font-weight: 400;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--dark); }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.6rem 1.4rem;
          border-radius: 100px;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
          border: none;
          font-family: 'Inter', sans-serif;
        }
        .btn-dark { background: var(--dark); color: #fff; }
        .btn-dark:hover { background: #2a2d35; transform: translateY(-1px); }
        .btn-grad {
          background: var(--grad);
          color: #fff;
          box-shadow: 0 4px 16px rgba(0,194,178,0.2);
        }
        .btn-grad:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,194,178,0.35); }
        .btn-outline {
          background: transparent;
          color: var(--dark);
          border: 1.5px solid var(--border);
        }
        .btn-outline:hover { border-color: var(--dark); }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .hamburger span {
          display: block; width: 22px; height: 1.5px;
          background: var(--dark); transition: all 0.25s;
        }
        .mobile-menu {
          display: none;
          position: fixed;
          inset: 0; top: 64px;
          background: var(--white);
          z-index: 99;
          flex-direction: column;
          padding: 2.5rem 2rem;
          gap: 0;
          border-top: 1px solid var(--border);
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a {
          padding: 0.9rem 0;
          font-size: 1rem;
          color: var(--dark);
          text-decoration: none;
          font-weight: 500;
          border-bottom: 1px solid var(--border);
        }
        .mobile-menu .btn-grad { margin-top: 1.5rem; width: 100%; border: none; }

        /* HERO */
        .hero {
          padding: 9rem 2rem 5rem;
          max-width: 680px;
          margin: 0 auto;
          text-align: center;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--light);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 0.35rem 0.9rem;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--mid);
          margin-bottom: 1.75rem;
        }
        .badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--teal);
          animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.35} }
        .hero h1 {
          font-family: 'Sora', sans-serif;
          font-size: clamp(2.25rem, 6vw, 3.75rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.035em;
          color: var(--dark);
          margin-bottom: 1.25rem;
        }
        .grad-text {
          background: var(--grad);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero p {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--mid);
          font-weight: 300;
          margin-bottom: 2rem;
        }
        .hero-actions {
          display: flex; gap: 0.75rem;
          justify-content: center; flex-wrap: wrap;
        }
        .hero-img {
          margin: 3.5rem auto 0;
          max-width: 640px; width: 100%;
          aspect-ratio: 4/3.5;
          border-radius: 1.25rem;
          overflow: hidden;
          border: 1px solid var(--border);
          background: linear-gradient(135deg, #eef3ff, #e0faf8);
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; gap: 0.6rem;
        }
        .hero-img span { font-size: 2.5rem; }
        .hero-img p { font-size: 0.72rem; color: var(--mid); letter-spacing: 0.08em; text-transform: uppercase; }

        /* TRUST BAR */
        .trust-bar {
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 1.25rem 2rem;
          display: flex; align-items: center;
          justify-content: center;
          gap: 2.5rem; flex-wrap: wrap;
        }
        .trust-item {
          display: flex; align-items: center;
          gap: 0.5rem; font-size: 0.8rem;
          color: var(--mid); font-weight: 400;
        }

        /* SECTIONS */
        .section {
          padding: 5rem 2rem;
          max-width: 860px;
          margin: 0 auto;
        }
        .section-tag {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 0.6rem;
        }
        .section h2 {
          font-family: 'Sora', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.25rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: var(--dark);
          margin-bottom: 0.6rem;
        }
        .section-sub {
          font-size: 0.92rem;
          color: var(--mid);
          line-height: 1.7;
          font-weight: 300;
          margin-bottom: 2.5rem;
          max-width: 440px;
        }

        /* SERVICE CARDS */
        .cards {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 1rem;
        }
        .card {
          border: 1.5px solid var(--border);
          border-radius: 1.25rem;
          padding: 1.75rem 1.5rem;
          background: var(--white);
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .card:hover {
          border-color: var(--teal);
          box-shadow: 0 6px 24px rgba(0,194,178,0.1);
          transform: translateY(-3px);
        }
        .card-icon {
          width: 42px; height: 42px;
          border-radius: 10px;
          background: var(--light);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; margin-bottom: 1rem;
        }
        .card h3 {
          font-family: 'Sora', sans-serif;
          font-size: 0.95rem; font-weight: 700;
          margin-bottom: 0.45rem;
          color: var(--dark); letter-spacing: -0.01em;
        }
        .card p {
          font-size: 0.83rem; line-height: 1.65;
          color: var(--mid); font-weight: 300;
        }

        /* ABOUT */
        .about-wrap { background: var(--light); padding: 5rem 2rem; }
        .about-inner {
          max-width: 860px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 4rem; align-items: center;
        }
        .about-photo {
          aspect-ratio: 4/5;
          border-radius: 1.25rem;
          overflow: hidden;
          background: var(--border);
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; gap: 0.6rem;
        }
        .about-photo span { font-size: 2rem; }
        .about-photo p { font-size: 0.72rem; color: var(--mid); letter-spacing: 0.08em; text-transform: uppercase; }
        .about-text p {
          font-size: 0.88rem; line-height: 1.75;
          color: var(--mid); font-weight: 300; margin-bottom: 0.85rem;
        }
        .pills { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 1.25rem; }
        .pill {
          display: inline-flex; align-items: center; gap: 0.35rem;
          background: var(--white); border: 1.5px solid var(--border);
          border-radius: 100px; padding: 0.3rem 0.85rem;
          font-size: 0.75rem; font-weight: 500; color: var(--dark);
        }

        /* PRICING */
        .pricing-wrap { padding: 5rem 2rem; max-width: 860px; margin: 0 auto; }
        .pricing-cards {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 1rem; margin-top: 2.25rem;
        }
        .price-card {
          border: 1.5px solid var(--border);
          border-radius: 1.25rem; padding: 2rem 1.5rem;
          background: var(--white); transition: all 0.2s;
        }
        .price-card.featured {
          border-color: transparent;
          background: var(--dark);
        }
        .price-card:not(.featured):hover {
          border-color: var(--teal);
          box-shadow: 0 6px 24px rgba(0,194,178,0.1);
          transform: translateY(-3px);
        }
        .price-lbl {
          font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--teal); margin-bottom: 0.9rem; display: block;
        }
        .price-card.featured .price-lbl { color: rgba(255,255,255,0.35); }
        .price-num {
          font-family: 'Sora', sans-serif;
          font-size: 2.4rem; font-weight: 800;
          letter-spacing: -0.04em; line-height: 1;
          color: var(--dark); margin-bottom: 0.2rem;
        }
        .price-card.featured .price-num { color: var(--white); }
        .price-per { font-size: 0.75rem; color: var(--mid); margin-bottom: 1.4rem; }
        .price-card.featured .price-per { color: rgba(255,255,255,0.35); }
        .price-list {
          list-style: none;
          display: flex; flex-direction: column; gap: 0.55rem;
          margin-bottom: 1.5rem;
        }
        .price-list li {
          font-size: 0.8rem; color: var(--mid);
          display: flex; gap: 0.45rem; align-items: flex-start;
        }
        .price-card.featured .price-list li { color: rgba(255,255,255,0.45); }
        .price-list li::before { content: '✓'; color: var(--teal); font-weight: 700; flex-shrink: 0; }
        .price-btn {
          display: block; text-align: center;
          padding: 0.6rem 1rem; border-radius: 100px;
          font-size: 0.8rem; font-weight: 600;
          text-decoration: none;
          background: var(--light); color: var(--dark);
          transition: all 0.2s;
        }
        .price-btn:hover { background: var(--dark); color: var(--white); }
        .price-card.featured .price-btn {
          background: var(--grad); color: var(--white);
          box-shadow: 0 4px 14px rgba(0,194,178,0.3);
        }
        .pricing-note {
          text-align: center; margin-top: 1.25rem;
          font-size: 0.78rem; color: var(--mid);
        }

        /* CONTACT */
        .contact-wrap { background: var(--dark); padding: 5rem 2rem; text-align: center; }
        .contact-inner { max-width: 520px; margin: 0 auto; }
        .contact-wrap .section-tag { color: var(--teal); display: block; margin-bottom: 0.6rem; }
        .contact-wrap h2 {
          font-family: 'Sora', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.25rem);
          font-weight: 700; letter-spacing: -0.03em;
          color: var(--white); margin-bottom: 0.75rem;
        }
        .contact-wrap > .contact-inner > p {
          font-size: 0.92rem; color: rgba(255,255,255,0.4);
          line-height: 1.7; font-weight: 300; margin-bottom: 2rem;
        }
        .contact-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0.65rem; margin-bottom: 1.75rem; text-align: left;
        }
        .contact-tile {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 1rem; padding: 1.1rem 1.15rem;
        }
        .tile-label {
          font-size: 0.63rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(255,255,255,0.28);
          margin-bottom: 0.3rem; font-weight: 500; display: block;
        }
        .tile-val {
          font-size: 0.88rem; color: var(--white);
          font-weight: 500; text-decoration: none; display: block;
        }
        .tile-val:hover { color: var(--teal); }
        .pay-row { display: flex; justify-content: center; gap: 0.45rem; flex-wrap: wrap; margin-bottom: 1.75rem; }
        .pay-chip {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 100px; padding: 0.28rem 0.8rem;
          font-size: 0.73rem; color: rgba(255,255,255,0.45); font-weight: 500;
        }

        /* FOOTER */
        footer {
          border-top: 1px solid var(--border);
          padding: 1.4rem 2rem;
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 1rem;
          background: var(--white);
        }
        .footer-logo { display: flex; align-items: center; gap: 0.4rem; text-decoration: none; }
        .footer-logo img { height: 26px; width: auto; }
        .footer-logo span {
          font-family: 'Sora', sans-serif;
          font-size: 0.9rem; font-weight: 700; color: var(--dark);
        }
        .footer-links { display: flex; gap: 1rem; list-style: none; flex-wrap: nowrap; }
        .footer-links a { font-size: 0.7rem; color: var(--mid); text-decoration: none; white-space: nowrap; }
        .footer-links a:hover { color: var(--dark); }
        .footer-copy { font-size: 0.7rem; color: #bbb; }

        /* ABOUT SLIDESHOW */
        .about-slideshow {
          position: relative;
          width: 100%; height: 100%;
          border-radius: 1.25rem;
          overflow: hidden;
        }
        .about-slideshow img {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center top;
          opacity: 0;
          transition: opacity 0.8s ease;
        }
        .about-slideshow img.active { opacity: 1; }
        .slide-dots {
          position: absolute;
          bottom: 0.75rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.4rem;
          z-index: 2;
        }
        .slide-dots span {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
          transition: background 0.3s;
        }
        .slide-dots span.active { background: #fff; }

        @media (max-width: 720px) {
          .nav-links, nav > a.btn { display: none; }
          .hamburger { display: flex; }
          .cards { grid-template-columns: 1fr 1fr; }
          .about-inner { grid-template-columns: 1fr; gap: 2rem; }
          .contact-grid { grid-template-columns: 1fr; }
          .trust-bar { gap: 1rem; }
          footer { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#" className="logo">
          {/* In your Next.js project, replace src with your logo path, e.g. src="/logo.svg" */}
          <img src="/logosvg.svg" alt="DogManny" style={{height:"32px",width:"auto"}} />
          <span className="logo-text">DogManny</span>
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><Link href="/services">Services & Pricing</Link></li>
          <li><Link href="/reviews">Reviews</Link></li>
          <li><Link href="/privacy">Client Privacy</Link></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className="btn btn-dark">Book Now</a>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {["About", "Services & Pricing", "Reviews", "Client Privacy", "Contact"].map(p => (
          <Link key={p} href={p === "Services & Pricing" ? "/services" : p === "Client Privacy" ? "/privacy" : p === "Reviews" ? "/reviews" : `#${p.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{p}</Link>
        ))}
        <a href="#contact" className="btn btn-grad" onClick={() => setMenuOpen(false)}>Book Now</a>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">
          <div className="badge-dot" />
          Now accepting new clients in Austin
        </div>
        <h1>Dog care that feels <span className="grad-text">personal.</span></h1>
        <p>Walking, sitting, and check-ins from someone who genuinely loves dogs. Just text me — no apps, no strangers, no hassle.</p>
        <div className="hero-actions">
          <a href="sms:+19795876387&body=Hi Wells! I'd like to book dog care." className="btn btn-grad">Text to Book</a>
        <Link href="/services" className="btn btn-outline">See Services & Pricing</Link>
        </div>
        {/* Hero photo */}
        <div className="hero-img">
          <img src="/wells-golden-patio.jpeg" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 35%'}} alt="Wells with a golden retriever" />
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        {[["✦","West Austin based"],["📸","Photos every visit"],["1:1","One dedicated caretaker"],["💬","Replies ASAP"],["🏡","At-home care"]].map(([icon,label]) => (
          <div className="trust-item" key={label as string}><span>{icon}</span><span>{label}</span></div>
        ))}
      </div>

      {/* ABOUT */}
      <div id="about" className="about-wrap" ref={aboutRef}>
        <div className="about-inner">
          {/* About photo slideshow */}
          <div className="about-photo">
            <div className="about-slideshow">
              {aboutPhotos.map(({ src, alt }, i) => (
                <img key={src} src={src} alt={alt} className={i === aboutSlide ? "active" : ""} />
              ))}
              <div className="slide-dots">
                {aboutPhotos.map((_, i) => (
                  <span key={i} className={i === aboutSlide ? "active" : ""} />
                ))}
              </div>
            </div>
          </div>
          <div className="about-text">
            <span className="section-tag">About</span>
            <h2 style={{fontFamily:"'Sora',sans-serif",fontSize:"1.75rem",fontWeight:700,letterSpacing:"-0.03em",marginBottom:"1rem",color:"var(--dark)"}}>Hi, I'm Wells.</h2>
            <p>I'm a 24-year-old Austin local with a genuine love for dogs. I started DogManny to offer something the big platforms can't — a real, consistent person who learns your dog's personality and treats them like family.</p>
            <p>No rotating strangers, no app scheduling. Just send me a text and I'll take care of the rest — with photo updates every visit so you always know they're in good hands.</p>
            <p>I understand that entrusting someone with your home is a big decision. For more information, visit the <Link href="/privacy" style={{color:"var(--teal)",textDecoration:"underline",fontWeight:500}}>Client Privacy page</Link>.</p>
            <div className="pills">
              {["📍 West Austin","📖 Texas A&M","✈️ Loves traveling","🏠 Respectful of your home","🍔 P. Terry's fan!"].map(p => (
                <span className="pill" key={p}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="section">
        <span className="section-tag">Services</span>
        <h2>What I offer</h2>
        <p className="section-sub">Flexible care built around your schedule and your dog's personality.</p>
        <div className="cards">
          {[
            { icon:"🦮", title:"Dog Walks", desc:"30-minute walks tailored to your dog's energy and pace. Includes a photo update every visit. Up to 3 dogs." },
            { icon:"🐾", title:"Daily Check-ins", desc:"Quick visits for feedings, potty breaks, treat time, and anything else your pup needs while you're out." },
            { icon:"🌙", title:"Overnight Sitting", desc:"I stay at your home overnight — hanging out throughout the day, a daily walk, and unlimited plant watering." },
            { icon:"🏠", title:"Check-in Sitting", desc:"Going out of town 2+ days? 4 home visits per day, a walk, feedings, and unlimited plant watering included." },
          ].map(({ icon, title, desc }) => (
            <div className="card" key={title}>
              <div className="card-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center", marginTop:"2rem"}}>
          <Link href="/services" className="btn btn-dark">View Full Services & Pricing →</Link>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <div id="pricing" style={{background:"var(--light)", padding:"4rem 2rem"}}>
        <div style={{maxWidth:"860px", margin:"0 auto"}}>
          <span className="section-tag">Pricing</span>
          <h2 style={{fontFamily:"'Sora',sans-serif",fontSize:"clamp(1.6rem,3vw,2.25rem)",fontWeight:700,letterSpacing:"-0.03em",color:"var(--dark)",marginBottom:"0.6rem"}}>Simple, honest rates.</h2>
          <p style={{fontSize:"0.92rem",color:"var(--mid)",lineHeight:1.7,fontWeight:300,marginBottom:"2rem"}}>All services include up to 3 dogs per household.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"1rem",marginBottom:"2rem"}}>
            {[
              { label:"Dog Walks", price:"$25", per:"per 30-min walk" },
              { label:"Daily Check-ins", price:"$25", per:"per visit" },
              { label:"Check-in Sitting", price:"$70", per:"per day · 2+ days" },
              { label:"Overnight Sitting", price:"$75", per:"per day" },
            ].map(({ label, price, per }) => (
              <div key={label} style={{border:"1.5px solid var(--border)",borderRadius:"1.25rem",padding:"1.5rem",background:"var(--white)"}}>
                <p style={{fontSize:"0.68rem",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--teal)",marginBottom:"0.6rem"}}>{label}</p>
                <p style={{fontFamily:"'Sora',sans-serif",fontSize:"2rem",fontWeight:800,letterSpacing:"-0.04em",lineHeight:1,color:"var(--dark)"}}>{price}</p>
                <p style={{fontSize:"0.75rem",color:"var(--mid)",marginTop:"0.2rem"}}>{per}</p>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center"}}>
            <Link href="/services" className="btn btn-dark">Full Details & Booking →</Link>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" className="contact-wrap">
        <div className="contact-inner">
          <span className="section-tag">Contact</span>
          <h2>Ready to book?</h2>
          <p>Text me your dog's name, what you need, and your dates. I'll get back to you fast — usually within the hour.</p>
          <div className="contact-grid">
            <div className="contact-tile">
              <span className="tile-label">Phone / Text</span>
              <a href="tel:+19795876387" className="tile-val">(979) 587-6387</a>
            </div>
            <div className="contact-tile">
              <span className="tile-label">Email</span>
              <a href="mailto:AustinDogManny@gmail.com" className="tile-val">AustinDogManny@gmail.com</a>
            </div>
            <div className="contact-tile">
              <span className="tile-label">Location</span>
              <span className="tile-val">Austin, TX 78703</span>
            </div>
            <div className="contact-tile">
              <span className="tile-label">Response time</span>
              <span className="tile-val">Within the hour</span>
            </div>
          </div>
          <div className="pay-row">
            {["Venmo","Zelle","Cash"].map(m => <span className="pay-chip" key={m}>{m}</span>)}
          </div>
          <a href="sms:+19795876387&body=Hi Wells! I'd like to book dog care for my pup." className="btn btn-grad" style={{width:"100%"}}>
            Text Wells Now →
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <a href="#" className="footer-logo">
          <img src="/logosvg.svg" alt="DogManny" style={{height:"26px",width:"auto"}} />
          <span>DogManny</span>
        </a>
        <ul className="footer-links">
          <li><a href="/#about">About</a></li>
          <li><Link href="/services">Services & Pricing</Link></li>
          <li><Link href="/reviews">Reviews</Link></li>
          <li><Link href="/privacy">Client Privacy</Link></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
        <p className="footer-copy">© {new Date().getFullYear()} DogManny · Austin, TX</p>
      </footer>
    </>
  );
}