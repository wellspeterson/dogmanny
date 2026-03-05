"use client";

import { useState, useEffect, useRef } from "react";

export default function ServicesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    const meta = document.createElement("meta");
    meta.name = "color-scheme";
    meta.content = "light only";
    document.head.appendChild(meta);

    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveCard(i);
          }
        },
        { threshold: 0.5 }
      );
      obs.observe(ref);
      observers.push(obs);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.head.removeChild(meta);
      observers.forEach(o => o.disconnect());
    };
  }, []);

  const services = [
    {
      icon: "🦮",
      title: "Dog Walks",
      tagline: "Tailored activity, happy pups.",
      price: "$25",
      per: "per 30-min walk · up to 3 dogs",
      color: "#EEF3FF",
      accent: "#3B6FE8",
      desc: "Whether your dog needs a casual stroll or a brisk adventure, I match the pace to what they need that day. Every walk includes a photo update.",
      includes: [],
      ideal: "",
    },
    {
      icon: "🐾",
      title: "Daily Check-ins",
      tagline: "A quick visit goes a long way.",
      price: "$25",
      per: "per visit · up to 3 dogs",
      color: "#E8FDF8",
      accent: "#00C2B2",
      desc: "Need someone to pop in while you're out? I'll handle feedings, potty breaks, and anything else your pup needs — then send you a photo so you can get back to your day.",
      includes: [],
      ideal: "",
    },
    {
      icon: "🌙",
      title: "Overnight Sitting",
      tagline: "I stay so your dog isn't alone.",
      price: "$75",
      per: "per day · up to 3 dogs",
      color: "#111318",
      accent: "#00C2B2",
      dark: true,
      desc: "I stay at your home overnight so your dog has a familiar, comfortable environment the whole time. Includes hanging out throughout the day, a 30-min walk, and unlimited plant watering.",
      includes: [],
      ideal: "",
    },
    {
      icon: "🏠",
      title: "Check-in Sitting",
      tagline: "Everything covered while you're away.",
      price: "$70",
      per: "per day · 2+ day bookings",
      color: "#F7F3FF",
      accent: "#7B3FBE",
      desc: "Going out of town for 2+ days? Includes 4 total home visits per day, a 30-min walk, feedings, and unlimited plant watering. Single-day visits billed at the standard $25 rate. Add-on visits available at $25 each.",
      includes: [],
      ideal: "",
    },
  ];

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

        html { scroll-behavior: smooth; color-scheme: light only; }
        body {
          font-family: 'Inter', sans-serif;
          background: var(--white) !important;
          color: var(--dark) !important;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        /* NAV — identical to main page */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 0 2rem; height: 64px;
          display: flex; align-items: center; justify-content: space-between;
          transition: background 0.3s, box-shadow 0.3s;
        }
        nav.scrolled {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(16px);
          box-shadow: 0 1px 0 var(--border);
        }
        .logo { display: flex; align-items: center; gap: 0.5rem; text-decoration: none; }
        .logo img { height: 32px; width: auto; }
        .logo-text {
          font-family: 'Sora', sans-serif; font-weight: 700;
          font-size: 1.05rem; color: var(--dark); letter-spacing: -0.02em;
        }
        .nav-links { display: flex; align-items: center; gap: 2rem; list-style: none; }
        .nav-links a {
          font-size: 0.875rem; color: var(--mid);
          text-decoration: none; font-weight: 400; transition: color 0.2s;
        }
        .nav-links a:hover, .nav-links a.active { color: var(--dark); font-weight: 500; }
        .btn {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 0.6rem 1.4rem; border-radius: 100px;
          font-size: 0.875rem; font-weight: 600; text-decoration: none;
          transition: all 0.2s; cursor: pointer; border: none;
          font-family: 'Inter', sans-serif;
        }
        .btn-dark { background: var(--dark); color: #fff; }
        .btn-dark:hover { background: #2a2d35; transform: translateY(-1px); }
        .btn-grad {
          background: var(--grad); color: #fff;
          box-shadow: 0 4px 16px rgba(0,194,178,0.2);
        }
        .btn-grad:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,194,178,0.35); }
        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .hamburger span { display: block; width: 22px; height: 1.5px; background: var(--dark); }
        .mobile-menu {
          display: none; position: fixed; inset: 0; top: 64px;
          background: var(--white); z-index: 99;
          flex-direction: column; padding: 2.5rem 2rem; gap: 0;
          border-top: 1px solid var(--border);
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a {
          padding: 0.9rem 0; font-size: 1rem; color: var(--dark);
          text-decoration: none; font-weight: 500;
          border-bottom: 1px solid var(--border);
        }
        .mobile-menu .btn-grad { margin-top: 1.5rem; width: 100%; border: none; }

        /* PAGE HEADER */
        .page-header {
          padding: 7rem 2rem 3.5rem;
          max-width: 860px; margin: 0 auto; text-align: center;
        }
        .section-tag {
          display: inline-block; font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--teal); margin-bottom: 0.6rem;
        }
        .page-header h1 {
          font-family: 'Sora', sans-serif;
          font-size: clamp(2rem, 5vw, 3.25rem);
          font-weight: 800; letter-spacing: -0.035em;
          line-height: 1.08; color: var(--dark); margin-bottom: 1rem;
        }
        .grad-text {
          background: var(--grad);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .page-header p {
          font-size: 1rem; color: var(--mid);
          line-height: 1.7; font-weight: 300;
          max-width: 480px; margin: 0 auto;
        }

        /* SERVICE CARDS */
        .services-wrap {
          max-width: 860px; margin: 0 auto;
          padding: 1rem 2rem 5rem;
          display: flex; flex-direction: column; gap: 1.5rem;
        }
        .svc-card {
          border-radius: 1.5rem;
          overflow: hidden;
          border: 1.5px solid var(--border);
          display: grid;
          grid-template-columns: 1fr 1fr;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .svc-card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
          transform: translateY(-3px);
        }
        .svc-card.dark { border-color: transparent; }
        .svc-left {
          padding: 2.5rem 2rem;
          display: flex; flex-direction: column; justify-content: space-between;
        }
        .svc-right {
          padding: 2.5rem 2rem;
          background: var(--light);
          border-left: 1.5px solid var(--border);
          display: flex; flex-direction: column; justify-content: space-between;
        }
        .svc-card.dark .svc-right {
          background: rgba(255,255,255,0.05);
          border-left-color: rgba(255,255,255,0.08);
        }
        .svc-top { margin-bottom: 1.5rem; }
        .svc-icon {
          font-size: 2rem; margin-bottom: 1rem; display: block;
        }
        .svc-tagline {
          font-size: 0.68rem; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; margin-bottom: 0.5rem; display: block;
        }
        .svc-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.6rem; font-weight: 800;
          letter-spacing: -0.03em; line-height: 1.1;
          margin-bottom: 1rem;
        }
        .svc-desc {
          font-size: 0.875rem; line-height: 1.75; font-weight: 300;
        }
        .svc-price-row {
          display: flex; align-items: baseline; gap: 0.4rem;
          margin-top: 2rem;
        }
        .svc-price {
          font-family: 'Sora', sans-serif;
          font-size: 2.5rem; font-weight: 800; letter-spacing: -0.04em; line-height: 1;
        }
        .svc-per { font-size: 0.8rem; font-weight: 400; }
        .svc-cta { margin-top: 1.5rem; }
        .includes-label {
          font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; margin-bottom: 1rem; display: block;
          opacity: 0.5;
        }
        .includes-list { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
        .includes-list li {
          font-size: 0.83rem; line-height: 1.5;
          display: flex; align-items: flex-start; gap: 0.6rem;
        }
        .includes-list li::before {
          content: '✓'; font-weight: 700; flex-shrink: 0; font-size: 0.75rem;
          margin-top: 1px; color: var(--teal);
        }
        .ideal-box {
          margin-top: 1.75rem;
          padding: 1rem 1.15rem;
          border-radius: 0.9rem;
          background: rgba(0,0,0,0.04);
          font-size: 0.78rem; line-height: 1.6;
        }
        .svc-card.dark .ideal-box { background: rgba(255,255,255,0.06); }
        .ideal-box strong { display: block; font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.3rem; opacity: 0.5; }

        /* CTA BANNER */
        .cta-banner {
          background: var(--dark);
          padding: 4rem 2rem;
          text-align: center;
        }
        .cta-inner { max-width: 480px; margin: 0 auto; }
        .cta-banner h2 {
          font-family: 'Sora', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2.1rem);
          font-weight: 700; letter-spacing: -0.03em;
          color: var(--white); margin-bottom: 0.75rem;
        }
        .cta-banner p {
          font-size: 0.9rem; color: rgba(255,255,255,0.4);
          line-height: 1.7; font-weight: 300; margin-bottom: 1.75rem;
        }
        .cta-actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
        .btn-outline-light {
          background: transparent; color: rgba(255,255,255,0.6);
          border: 1.5px solid rgba(255,255,255,0.15);
          padding: 0.6rem 1.4rem; border-radius: 100px;
          font-size: 0.875rem; font-weight: 500; text-decoration: none;
          transition: all 0.2s;
        }
        .btn-outline-light:hover { border-color: rgba(255,255,255,0.4); color: var(--white); }

        /* FOOTER */
        footer {
          border-top: 1px solid var(--border); padding: 1.4rem 2rem;
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 1rem;
          background: var(--white);
        }
        .footer-logo { display: flex; align-items: center; gap: 0.4rem; text-decoration: none; }
        .footer-logo img { height: 26px; width: auto; }
        .footer-logo span { font-family: 'Sora', sans-serif; font-size: 0.9rem; font-weight: 700; color: var(--dark); }
        .footer-links { display: flex; gap: 1rem; list-style: none; flex-wrap: nowrap; }
        .footer-links a { font-size: 0.7rem; color: var(--mid); text-decoration: none; white-space: nowrap; }
        .footer-links a:hover { color: var(--dark); }
        .footer-copy { font-size: 0.7rem; color: #bbb; }

        @media (max-width: 720px) {
          .nav-links, nav > a.btn { display: none; }
          .hamburger { display: flex; }
          .svc-card { grid-template-columns: 1fr; }
          .svc-right { border-left: none; border-top: 1.5px solid var(--border); }
          .svc-card.dark .svc-right { border-top-color: rgba(255,255,255,0.08); }
          footer { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <a href="/" className="logo">
          <img src="/logosvg.svg" alt="DogManny" style={{height:"32px",width:"auto"}} />
          <span className="logo-text">DogManny</span>
        </a>
        <ul className="nav-links">
          <li><a href="/#about">About</a></li>
          <li><a href="/services" className="active">Services & Pricing</a></li>
          <li><a href="/reviews">Reviews</a></li>
          <li><a href="/privacy">Client Privacy</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
        <a href="/#contact" className="btn btn-dark">Book Now</a>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {[["About","/#about"],["Services & Pricing","/services"],["Reviews","/reviews"],["Client Privacy","/privacy"],["Contact","/#contact"]].map(([label, href]) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <a href="/#contact" className="btn btn-grad" onClick={() => setMenuOpen(false)}>Book Now</a>
      </div>

      {/* PAGE HEADER */}
      <div className="page-header">
        <span className="section-tag">Services & Pricing</span>
        <h1>Everything your dog <span className="grad-text">needs.</span></h1>
        <p>Personalized care for every situation — whether you're at work, on vacation, or just need a hand.</p>
      </div>

      {/* SERVICE CARDS */}
      <div className="services-wrap">
        {services.map((s, i) => (
          <div
            key={s.title}
            ref={el => { cardRefs.current[i] = el; }}
            className={`svc-card${s.dark ? " dark" : ""}`}
            style={{
              background: s.color,
              color: s.dark ? "#fff" : "var(--dark)",
              gridTemplateColumns: s.includes.length === 0 ? "1fr" : "1fr 1fr",
              transform: activeCard === i ? "scale(1.02)" : "scale(1)",
              boxShadow: activeCard === i
                ? s.dark
                  ? "0 20px 60px rgba(0,0,0,0.35)"
                  : "0 20px 60px rgba(0,0,0,0.12)"
                : "none",
              transition: "transform 0.4s ease, box-shadow 0.4s ease",
              zIndex: activeCard === i ? 2 : 1,
              position: "relative",
            }}
          >
            {/* LEFT */}
            <div className="svc-left">
              <div className="svc-top">
                <span className="svc-icon">{s.icon}</span>
                <span className="svc-tagline" style={{ color: s.accent }}>{s.tagline}</span>
                <h2 className="svc-title">{s.title}</h2>
                <p className="svc-desc" style={{ color: s.dark ? "rgba(255,255,255,0.55)" : "var(--mid)", whiteSpace: "pre-line" }}>{s.desc}</p>
              </div>
              <div>
                <div className="svc-price-row">
                  <span className="svc-price">{s.price}</span>
                  <span className="svc-per" style={{ color: s.dark ? "rgba(255,255,255,0.35)" : "var(--mid)" }}>{s.per}</span>
                </div>
                <div className="svc-cta">
                  <a
                    href={`sms:+19795876387&body=Hi Wells! I'd like to book ${s.title}.`}
                    className="btn btn-grad"
                    style={{ width: "100%" }}
                  >
                    Book {s.title} →
                  </a>
                  {s.title === "Overnight Sitting" && (
                    <p style={{fontSize:"0.7rem", color:"rgba(255,255,255,0.3)", marginTop:"0.85rem", lineHeight:1.6}}>
                      * Dates reserved first come, first serve. Bookings over 3 days require a 25% non-refundable deposit. Cancellations within 10 days of start date incur an additional 50% fee.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            {s.includes.length > 0 && (
            <div className="svc-right">
              <div>
                <span className="includes-label" style={{ color: s.dark ? "rgba(255,255,255,0.9)" : "var(--dark)" }}>What's included</span>
                <ul className="includes-list">
                  {s.includes.map((item) => (
                    <li key={item} style={{ color: s.dark ? "rgba(255,255,255,0.55)" : "var(--mid)" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ideal-box">
                <strong>Best for</strong>
                <span style={{ color: s.dark ? "rgba(255,255,255,0.5)" : "var(--mid)" }}>{s.ideal}</span>
              </div>
            </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA BANNER */}
      <div className="cta-banner">
        <div className="cta-inner">
          <h2>Not sure which to pick?</h2>
          <p>Just text me what you're looking for and I'll help you figure out the best fit for your dog's needs.</p>
          <div className="cta-actions">
            <a href="sms:+19795876387&body=Hi Wells! I have a question about your services." className="btn btn-grad">
              Text Wells
            </a>
            <a href="/#pricing" className="btn-outline-light">View Pricing</a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <a href="/" className="footer-logo">
          <img src="/logosvg.svg" alt="DogManny" style={{height:"26px",width:"auto"}} />
          <span>DogManny</span>
        </a>
        <ul className="footer-links">
          <li><a href="/#about">About</a></li>
          <li><a href="/services">Services & Pricing</a></li>
          <li><a href="/reviews">Reviews</a></li>
          <li><a href="/privacy">Client Privacy</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
        <p className="footer-copy">© {new Date().getFullYear()} DogManny · Austin, TX</p>
      </footer>
    </>
  );
}