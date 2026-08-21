import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import r1 from "./assets/rakhi-1.png";
import r2 from "./assets/rakhi-2.png";
import r3 from "./assets/rakhi-3.png";
import r4 from "./assets/rakhi-4.png";
import r5 from "./assets/rakhi-5.png";
import r6 from "./assets/rakhi-6.png";
import r10 from "./assets/rakhi-7.png";
import r8 from "./assets/rakhi-8.png";
import r9 from "./assets/rakhi-9.png";
import r7 from "./assets/rakhi-10.png";

const products = [
  { id:1, name:"Royal Kundan Rakhi", price:90, cat:"Kundan", image:r1, tag:"Bestseller" },
    { id: 2, name: "Mogra Pearl Rakhi", price: 80, cat:"Meenakari", image:r2, tag:"New" },
  { id:3, name:"Rajputana Red", price:110, cat:"Traditional", image:r3, tag:"Popular" },
  { id:4, name:"Saffron Shree Rakhi", price:90, cat:"Spiritual", image:r4, tag:"Classic" },
  { id:5, name:"Midnight Blue Rakhi", price:80, cat:"Premium", image:r5, tag:"Limited" },
  { id:6, name:"Rose Gold Charm", price:120, cat:"Premium", image:r6, tag:"Premium" },
  { id:7, name:"Meenakari Peacock", price:110, cat:"Pearl", image:r7, tag:"Handpicked" },
  { id:8, name:"Lotus Love Rakhi", price:90, cat:"Floral", image:r8, tag:"New" },
  { id:9, name:"Minimalist Thread", price:90, cat:"Minimal", image:r9, tag:"Everyday" },
  { id:10, name:"Festive Ganesha Rakhi", price:90, cat:"Spiritual", image:r10, tag:"Festive" },
];

const quotes = [
  "A thread of love. A lifetime of memories.",
  "Some bonds are tied by tradition, the best ones are held by heart.",
  "Across every distance, a rakhi keeps love close.",
];

function App() {
  const [dark, setDark] = useState(false);
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [quote, setQuote] = useState(0);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    const move = (e) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    const over = () => document.documentElement.classList.add("cursor-on-link");
    const out = () => document.documentElement.classList.remove("cursor-on-link");

    window.addEventListener("mousemove", move, { passive: true });
    const interactive = document.querySelectorAll("a, button, .product-image, .filters button");
    interactive.forEach(el => {
      el.addEventListener("mouseenter", over);
      el.addEventListener("mouseleave", out);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      interactive.forEach(el => {
        el.removeEventListener("mouseenter", over);
        el.removeEventListener("mouseleave", out);
      });
      document.documentElement.classList.remove("cursor-on-link");
    };
  }, [category, activeProduct, drawer]);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [category]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
      document.documentElement.style.setProperty("--scroll-progress", progress);
      document.documentElement.style.setProperty("--scrollY", `${window.scrollY}px`);

      document.querySelectorAll("[data-parallax]").forEach(el => {
        const speed = Number(el.dataset.parallax || 0.08);
        const rect = el.getBoundingClientRect();
        const shift = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * speed;
        el.style.transform = `translate3d(0, ${shift}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setQuote(q => (q + 1) % quotes.length), 4500);
    return () => clearInterval(timer);
  }, []);

  const categories = ["All", ...new Set(products.map(p => p.cat))];
  const filtered = useMemo(
    () => category === "All" ? products : products.filter(p => p.cat === category),
    [category]
  );

  const addToCart = (product) => {
    setCart(current => {
      const existing = current.find(item => item.id === product.id);
      return existing
        ? current.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
        : [...current, { ...product, qty: 1 }];
    });
    setDrawer(true);
  };

  const removeFromCart = (id) => {
    setCart(current => current.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="app">
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />
      <div className="announcement">✦ FREE SHIPPING ON ORDERS ABOVE ₹499 &nbsp; • &nbsp; HANDPICKED WITH LOVE ✦</div>

      <header className="nav">
        <a className="brand" href="#top"><span>Crafty Knotz</span><small>Premiun Crochet Collection</small></a>
        <nav>
          <a href="#collection">Collection</a>
          <a href="#story">Our Story</a>
          <a href="#promise">Our Promise</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="nav-actions">
          <button className="icon-btn" onClick={() => setDark(!dark)} aria-label="Toggle theme">
            {dark ? "☼" : "☾"}
          </button>
          <button className="cart-btn" onClick={() => setDrawer(true)}>
            Bag <b>{cart.reduce((sum, item) => sum + item.qty, 0)}</b>
          </button>
        </div>
      </header>

      <main id="top"><div className="scroll-progress" aria-hidden="true"></div>
        <section className="hero">
          <div className="hero-bg-word" data-parallax="0.05">RAKHI</div>
          <div className="hero-copy reveal">
            <p className="eyebrow">THE 2026 FESTIVE EDITION</p>
            <h1>Wear a little<br/><i>love.</i></h1>
            <p className="hero-sub">
              Curated rakhis for the sibling who means everything.
              Handpicked details, timeless colours and a whole lot of emotion.
            </p>
            <div className="hero-buttons">
              <a className="btn dark" href="#collection">Shop the collection <span>↗</span></a>
              <a className="text-link" href="#story">Discover our story ↓</a>
            </div>
          </div>
          <div className="hero-art reveal">
            <div className="hero-circle one"></div>
            <div className="hero-circle two"></div>
            <img src={r7} alt="Featured meenakari rakhi" />
            <div className="floating-note note-one">made for<br/><b>forever</b></div>
            <div className="floating-note note-two">✦ handcrafted<br/>details</div>
          </div>
          <div className="hero-quote">
            <span>“</span>{quotes[quote]}<span>”</span>
          </div>
        </section>

        <section className="marquee" aria-label="Festive message">
          <div>LOVE • TRADITION • TOGETHERNESS • RAKSHA BANDHAN • LOVE • TRADITION • TOGETHERNESS •</div>
        </section>

        <section id="collection" className="collection">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">02 — THE COLLECTION</p>
              <h2>Rakhis worth<br/><i>remembering.</i></h2>
            </div>
            <p className="section-intro">From quiet minimal threads to statement festive pieces, find the one that feels like your bond.</p>
          </div>

          <div className="filters reveal">
            {categories.map(c => <button key={c} className={category===c ? "active" : ""} onClick={()=>setCategory(c)}>{c}</button>)}
          </div>

          <div className="product-grid">
            {filtered.map((p, index) => (
              <article className="product reveal" key={p.id} style={{"--delay":`${(index%4)*70}ms`}}>
                <button className="product-image" onClick={()=>setActiveProduct(p)} aria-label={`View ${p.name}`}>
                  <span className="tag">{p.tag}</span>
                  <img src={p.image} alt={p.name}/>
                  <span className="quick">Quick view ↗</span>
                </button>
                <div className="product-info">
                  <div><small>{p.cat}</small><h3>{p.name}</h3></div>
                  <strong>₹{p.price}</strong>
                </div>
                <button className="add" onClick={(e)=>{e.stopPropagation();addToCart(p)}}>Add to bag <span>+</span></button>
              </article>
            ))}
          </div>
        </section>

        <section id="story" className="quote-section">
          <div className="quote-back" data-parallax="0.08">BOND</div>
          <div className="quote-content reveal">
            <p className="eyebrow">03 — THE FEELING</p>
            <blockquote>“A rakhi is not just a thread.<br/>It is a <i>promise</i> you can wear.”</blockquote>
            <p>— The Riwaaz philosophy</p>
          </div>
        </section>

        <section id="promise" className="promise">
          <div className="promise-head reveal">
            <p className="eyebrow">04 — OUR PROMISE</p>
            <h2>Small details.<br/><i>Big feelings.</i></h2>
          </div>
          <div className="promise-grid">
            <div className="promise-card reveal"><span>01</span><h3>Curated, not crowded.</h3><p>Every design is selected to feel special, giftable and beautifully made.</p></div>
            <div className="promise-card reveal"><span>02</span><h3>Festive, not flashy.</h3><p>Rich colours and thoughtful details that celebrate tradition with a modern eye.</p></div>
            <div className="promise-card reveal"><span>03</span><h3>Ready to gift.</h3><p>Each order is packed with a festive touch, because the unboxing is part of the memory.</p></div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-orbit" aria-hidden="true"></div>
          <div className="contact-head reveal">
            <p className="eyebrow">05 — CONTACT US</p>
            <h2>Let’s stay<br/><i>connected.</i></h2>
            <p>Have a question about a rakhi, a gift set or your selection? We would love to hear from you.</p>
          </div>
          <div className="contact-grid">
            <a className="contact-card reveal" href="mailto:craftyknotz83@gmail.com">
              <span className="contact-icon">✉</span>
              <small>GMAIL</small>
              <h3>craftyknotz83@gmail.com</h3>
              <span className="contact-arrow">↗</span>
            </a>
            <a className="contact-card reveal" href="tel:+919307169324">
              <span className="contact-icon">⌕</span>
              <small>CALL / WHATSAPP</small>
              <h3>+91 9307169324</h3>
              <span className="contact-arrow">↗</span>
            </a>
                      <a className="contact-card reveal" href="https://www.instagram.com/crafty_.knot?igsi=MTd3cDBkMXV2MW1mZA==" target="_blank" rel="noreferrer">
              <span className="contact-icon">◎</span>
              <small>INSTAGRAM</small>
              <h3>crafty_.knot</h3>
              <span className="contact-arrow">↗</span>
            </a>
          </div>
         
        </section>

        <section className="closing">
          <div className="closing-word" data-parallax="0.06">FOREVER</div>
          <p className="eyebrow">UNTIL THE NEXT RAKHI</p>
          <h2>Keep the bond<br/><i>close.</i></h2>
          <a className="btn light" href="#collection">Find your rakhi ↗</a>
        </section>
      </main>

      <footer>
        <div><strong>riwaaz</strong> <span>© 2026</span></div>
        <p>Made for siblings, memories & forever.</p>
        <a href="#top">Back to top ↑</a>
      </footer>

      {drawer && <div className="overlay" onClick={() => setDrawer(false)}>
        <aside className="drawer" onClick={e => e.stopPropagation()}>
          <div className="drawer-head">
            <div>
              <p className="eyebrow">YOUR SELECTION</p>
              <h2>Your bag</h2>
            </div>
            <button onClick={() => setDrawer(false)}>×</button>
          </div>

          {cart.length === 0 ? (
            <div className="empty">
              <span>♡</span>
              <h3>Your bag is waiting.</h3>
              <p>Choose a rakhi from the collection and it will appear here.</p>
              <button className="btn dark" onClick={() => setDrawer(false)}>Browse rakhis</button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.name}/>
                    <div>
                      <small>{item.cat}</small>
                      <h4>{item.name}</h4>
                      <p>₹{item.price} × {item.qty}</p>
                      <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <span>Total</span>
                <strong>₹{total}</strong>
              </div>
              <p className="display-note">Display-only collection • No online checkout</p>
            </>
          )}
        </aside>
      </div>}

      {activeProduct && <div className="modal-bg" onClick={()=>setActiveProduct(null)}>
        <div className="modal" onClick={e=>e.stopPropagation()}>
          <button className="modal-close" onClick={()=>setActiveProduct(null)}>×</button>
          <img src={activeProduct.image} alt={activeProduct.name}/>
          <div className="modal-copy"><small>{activeProduct.cat}</small><h2>{activeProduct.name}</h2><p>A carefully curated festive design, presented for inspiration and gifting this Raksha Bandhan.</p><strong>₹{activeProduct.price}</strong><button className="btn dark" onClick={()=>setActiveProduct(null)}>Back to collection ↗</button></div>
        </div>
      </div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
