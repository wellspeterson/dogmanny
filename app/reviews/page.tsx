"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ReviewsPage() {
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

  const reviews = [
    {
      text: "I like that Wells is dependable and will go out of his way to make my last minute requests work. I like that he truly cares for my dogs. Wells is the best and I've recommended him to all my friends.",
      color: "#EEF3FF",
    },
    {
      text: "Wells goes above and beyond to send pics and videos of his time with my dogs. I see how excited they are to spend time with him. He fills their water bowls, tosses the frisbee over and over again and gives lots of cuddles!",
      color: "#E8FDF8",
    },
    {
      text: "Wells will keep me posted of his timing and let me know immediately if he's even 10 minutes behind. I also appreciate that I could leave out all my valuables and not even think twice about it.",
      color: "#F7F3FF",
    },
    {
      text: "Wells is a really great communicator, always sending photos and notes about how the animals are doing. It makes me feel totally confident that they're in good hands! He really goes above and beyond, and just seems like a truly kind, caring human. I can't recommend Wells enough!",
      color: "#FFF4EE",
    },
    {
      text: "It has truly been life changing! Wells is incredibly reliable, always arriving on time and giving our pups and cat lots of love. He also waters our plants and generally ensures our home and our most prized furry possessions are well taken care of.",
      color: "#EEF3FF",
    },
    {
      text: "Wells stayed in our house for a week. He followed all of my instructions perfectly (and there were many!). He watered our plants and kept the house very tidy, including washing our sheets before our return. He sent me multiple pictures and videos of our pets every day. Several of my neighbors commented to me about how friendly he was when they encountered him walking the dogs.",
      color: "#E8FDF8",
    },
    {
      text: "I very much recommend Wells if you need a pet/house sitter or dog walker. I trust him to take great care of my house and my beloved pets. He seems utterly reliable and careful, and he is fun and nice too. I feel lucky to have found such a wonderful person to take care of things when I am away!",
      color: "#F7F3FF",
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
          --star: #F5A623;
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

        /* SUMMARY BAR */
        .summary-bar {
          max-width: 480px; margin: 0 auto 1rem;
          display: flex; align-items: center; justify-content: center;
          gap: 0.75rem;
          padding: 0 2rem;
        }
        .stars-row { display: flex; gap: 3px; }
        .star { color: var(--star); font-size: 1.1rem; }
        .summary-text {
          font-size: 0.85rem; color: var(--mid); font-weight: 400;
        }
        .summary-text strong { color: var(--dark); }

        /* REVIEWS GRID */
        .reviews-wrap {
          max-width: 900px; margin: 0 auto;
          padding: 1rem 2rem 5rem;
          columns: 2;
          column-gap: 1.25rem;
        }
        .review-card {
          break-inside: avoid;
          border-radius: 1.5rem;
          padding: 2rem 1.75rem;
          margin-bottom: 1.25rem;
          border: 1.5px solid var(--border);
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .review-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.07);
        }
        .review-stars {
          display: flex; gap: 3px; margin-bottom: 1rem;
        }
        .review-star { color: var(--star); font-size: 0.95rem; }
        .review-text {
          font-size: 0.9rem; line-height: 1.75;
          color: var(--dark); font-weight: 300;
          margin-bottom: 1.25rem;
        }
        .review-author {
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--teal);
        }

        /* CTA */
        .cta-wrap {
          background: var(--dark); padding: 4rem 2rem; text-align: center;
        }
        .cta-inner { max-width: 480px; margin: 0 auto; }
        .cta-wrap h2 {
          font-family: 'Sora', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700; letter-spacing: -0.03em;
          color: var(--white); margin-bottom: 0.75rem;
        }
        .cta-wrap p {
          font-size: 0.9rem; color: rgba(255,255,255,0.4);
          line-height: 1.7; font-weight: 300; margin-bottom: 1.75rem;
        }

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
          .reviews-wrap { columns: 1; }
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
          <li><Link href="/pricing">Services & Pricing</Link></li>
          <li><Link href="/reviews" className="active">Reviews</Link></li>
          <li><Link href="/privacy">Client Privacy</Link></li>
          <li><Link href="/#contact">Contact</Link></li>
        </ul>
        <Link href="/#contact" className="btn btn-dark">Book Now</Link>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {[["About","/#about"],["Services & Pricing","/pricing"],["Reviews","/reviews"],["Client Privacy","/privacy"],["Contact","/#contact"]].map(([label, href]) => (
          <Link key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>
        ))}
        <Link href="/#contact" className="btn btn-grad" onClick={() => setMenuOpen(false)}>Book Now</Link>
      </div>

      {/* PAGE HEADER */}
      <div className="page-header">
        <span className="section-tag">Reviews</span>
        <h1>What clients <span className="grad-text">are saying.</span></h1>
        <p>All reviews from verified Austin clients.</p>
      </div>

      {/* SUMMARY BAR */}
      <div className="summary-bar">
        <div className="stars-row">
          {[1,2,3,4,5].map(i => <span key={i} className="star">★</span>)}
        </div>
        <p className="summary-text"><strong>5.0</strong> · {reviews.length} verified reviews</p>
      </div>

      {/* REVIEWS GRID */}
      <div className="reviews-wrap">
        {reviews.map((r, i) => (
          <div key={i} className="review-card" style={{ background: r.color }}>
            <div className="review-stars">
              {[1,2,3,4,5].map(s => <span key={s} className="review-star">★</span>)}
            </div>
            <p className="review-text">"{r.text}"</p>
            <p className="review-author">— Verified Client</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="cta-wrap">
        <div className="cta-inner">
          <span className="section-tag">Ready to join them?</span>
          <h2>Book your first visit.</h2>
          <p>Text me your dog's name, what you need, and your dates — I'll get back to you fast.</p>
          <a href="sms:+19795876387&body=Hi Wells! I'd like to book dog care." className="btn btn-grad">
            Text Wells Now →
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <Link href="/" className="footer-logo">
          <img src="/logosvg.svg" alt="DogManny" style={{height:"26px",width:"auto"}} />
          <span>DogManny</span>
        </Link>
        <ul className="footer-links">
          <li><Link href="/pricing">Services & Pricing</Link></li>
          <li><Link href="/reviews">Reviews</Link></li>
          <li><Link href="/privacy">Client Privacy</Link></li>
          <li><Link href="/#contact">Contact</Link></li>
        </ul>
        <p className="footer-copy">© {new Date().getFullYear()} DogManny · Austin, TX</p>
      </footer>
    </>
  );
}