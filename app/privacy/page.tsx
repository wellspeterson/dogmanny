"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PrivacyPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    const meta = document.createElement("meta");
    meta.name = "color-scheme";
    meta.content = "light only";
    document.head.appendChild(meta);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.head.removeChild(meta);
    };
  }, []);

  const sections = [
    {
      icon: "🏠",
      title: "Home Security",
      color: "#EEF3FF",
      accent: "#3B6FE8",
      items: [
        "Your belongings remain completely untouched. My focus is solely on providing the best care for your pets.",
        "I never disclose any client information — texts, emails, details about your home, your name, or anything else. Confidentiality is my guarantee.",
      ],
    },
    {
      icon: "🔒",
      title: "Data Security",
      color: "#E8FDF8",
      accent: "#00C2B2",
      items: [
        "All sensitive information — contact details, address, emergency contacts — is safeguarded with advanced encryption.",
        "All data is password-protected, separately stored, and only accessible to me and you. You can request a copy of your stored data at any time.",
      ],
    },
    {
      icon: "🗝️",
      title: "Key Management",
      color: "#F7F3FF",
      accent: "#7B3FBE",
      items: [
        "House keys are stored securely in a dedicated space in my home.",
        "Keys are never labeled and are kept in an anonymous pool — further ensuring your privacy.",
      ],
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

        /* NAV */
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
          flex-direction: column; padding: 2.5rem 2rem;
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
          max-width: 680px; margin: 0 auto; text-align: center;
        }
        .section-tag {
          display: inline-block; font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--teal); margin-bottom: 0.6rem;
        }
        .page-header h1 {
          font-family: 'Sora', sans-serif;
          font-size: clamp(2rem, 5vw, 3rem);
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
        }

        /* SECURITY CARDS */
        .cards-wrap {
          max-width: 760px; margin: 0 auto;
          padding: 1rem 2rem 5rem;
          display: flex; flex-direction: column; gap: 1.25rem;
        }
        .sec-card {
          border-radius: 1.5rem;
          padding: 2.25rem 2rem;
          border: 1.5px solid var(--border);
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .sec-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.07);
        }
        .sec-card-top {
          display: flex; align-items: center; gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .sec-icon {
          width: 48px; height: 48px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem; flex-shrink: 0;
          background: rgba(0,0,0,0.05);
        }
        .sec-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.15rem; font-weight: 700;
          letter-spacing: -0.02em; color: var(--dark);
        }
        .sec-items {
          display: flex; flex-direction: column; gap: 0.85rem;
        }
        .sec-item {
          display: flex; gap: 0.75rem; align-items: flex-start;
          font-size: 0.875rem; line-height: 1.7;
          color: var(--mid); font-weight: 300;
        }
        .sec-item-dot {
          width: 6px; height: 6px; border-radius: 50%;
          flex-shrink: 0; margin-top: 0.5rem;
        }

        /* TRUST STATEMENT */
        .trust-wrap {
          background: var(--dark);
          padding: 4rem 2rem;
          text-align: center;
        }
        .trust-inner { max-width: 560px; margin: 0 auto; }
        .trust-wrap h2 {
          font-family: 'Sora', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700; letter-spacing: -0.03em;
          color: var(--white); margin-bottom: 0.75rem;
        }
        .trust-wrap p {
          font-size: 0.9rem; color: rgba(255,255,255,0.4);
          line-height: 1.7; font-weight: 300; margin-bottom: 1.75rem;
        }
        .contact-row {
          display: flex; gap: 0.75rem;
          justify-content: center; flex-wrap: wrap;
        }
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
          footer { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <Link href="/" className="logo">
          <img src="/logosvg.svg" alt="DogManny" style={{height:"32px",width:"auto"}} />
          <span className="logo-text">DogManny</span>
        </Link>
        <ul className="nav-links">
          <li><Link href="/#about">About</Link></li>
          <li><Link href="/services">Services & Pricing</Link></li>
          <li><Link href="/reviews">Reviews</Link></li>
          <li><Link href="/privacy" className="active">Client Privacy</Link></li>
          <li><Link href="/#contact">Contact</Link></li>
        </ul>
        <Link href="/#contact" className="btn btn-dark">Book Now</Link>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {[["About","/#about"],["Services & Pricing","/services"],["Reviews","/reviews"],["Client Privacy","/privacy"],["Contact","/#contact"]].map(([label, href]) => (
          <Link key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>
        ))}
        <Link href="/#contact" className="btn btn-grad" onClick={() => setMenuOpen(false)}>Book Now</Link>
      </div>

      {/* PAGE HEADER */}
      <div className="page-header">
        <span className="section-tag">Client Privacy</span>
        <h1>Your peace of mind is my <span className="grad-text">priority.</span></h1>
        <p>Entrusting someone with your home and pets is a big decision. Here's exactly how I protect you.</p>
      </div>

      {/* SECURITY CARDS */}
      <div className="cards-wrap">
        {sections.map((s) => (
          <div
            key={s.title}
            className="sec-card"
            style={{ background: s.color }}
          >
            <div className="sec-card-top">
              <div className="sec-icon" style={{ background: `${s.accent}18` }}>
                {s.icon}
              </div>
              <h2 className="sec-title" style={{ color: s.accent }}>{s.title}</h2>
            </div>
            <div className="sec-items">
              {s.items.map((item, i) => (
                <div className="sec-item" key={i}>
                  <div className="sec-item-dot" style={{ background: s.accent }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* TRUST STATEMENT */}
      <div className="trust-wrap">
        <div className="trust-inner">
          <span className="section-tag">Questions?</span>
          <h2>I believe in full transparency.</h2>
          <p>If you have any questions or concerns about how I handle your privacy and security, don't hesitate to reach out directly.</p>
          <div className="contact-row">
            <a href="sms:+19795876387&body=Hi Wells! I have a question about client privacy." className="btn btn-grad">
              Text Wells
            </a>
            <a href="mailto:AustinDogManny@gmail.com" className="btn-outline-light">Send an Email</a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <Link href="/" className="footer-logo">
          <img src="/logosvg.svg" alt="DogManny" style={{height:"26px",width:"auto"}} />
          <span>DogManny</span>
        </Link>
        <ul className="footer-links">
          <li><Link href="/#about">About</Link></li>
          <li><Link href="/services">Services & Pricing</Link></li>
          <li><Link href="/reviews">Reviews</Link></li>
          <li><Link href="/privacy">Client Privacy</Link></li>
          <li><Link href="/#contact">Contact</Link></li>
        </ul>
        <p className="footer-copy">© {new Date().getFullYear()} DogManny · Austin, TX</p>
      </footer>
    </>
  );
}