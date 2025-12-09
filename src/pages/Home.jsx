import { useEffect, useState } from "react";
import "../Doom.css";

export default function Home() {

  // Smooth Parallax
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.35);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fade-in on scroll
  useEffect(() => {
    const sections = document.querySelectorAll(".fade-section");

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach(sec => obs.observe(sec));
  }, []);

  return (
    <div className="site-wrapper">

      {/* ======================================== */}
      {/* HEADER */}
      {/* ======================================== */}
      <nav className="main-header">
        <div className="header-inner">
          <img src="/logo.png" className="header-logo" alt="Logo" />

          <div className="header-nav">
            <a href="#about">ABOUT</a>
            <a href="#music">MUSIC</a>
            <a href="#shows">SHOWS</a>
            <a href="#media">MEDIA</a>
            <a href="#merch">MERCH</a>
          </div>
        </div>
      </nav>

      {/* ======================================== */}
      {/* HERO */}
      {/* ======================================== */}
      <header
        className="hero-section fade-section"
        style={{ backgroundPositionY: `-${offset}px` }}
      >
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title">CABLE PULLERS</h1>
          <p className="hero-sub">Heavy Stoner Rock // Doom Atmosphere</p>
        </div>
      </header>

      {/* ======================================== */}
      {/* ABOUT */}
      {/* ======================================== */}
      <section id="about" className="section fade-section">
        <h2 className="section-title">ABOUT</h2>
        <p className="section-text">
          Cable Pullers forge heavy riffs, hypnotic grooves and atmospheric doom energy.
          A modern stoner sound carried by weight, tone and darkness.
        </p>
      </section>

      {/* ======================================== */}
      {/* MUSIC */}
      {/* ======================================== */}
      <section id="music" className="section fade-section">
        <h2 className="section-title">MUSIC</h2>
        <iframe
          className="music-embed"
          src="https://open.spotify.com/embed/artist/3BmG8pTz6PvxI6fN5EZe7C"
          width="100%"
          height="380"
          frameBorder="0"
        />
      </section>

      {/* ======================================== */}
      {/* SHOWS */}
      {/* ======================================== */}
      <section id="shows" className="section fade-section">
        <h2 className="section-title">SHOWS</h2>

        <div className="show-card">
          <p className="show-date">April 6, 2025 — Bern</p>
          <p className="show-name">Stoner Ritual Night</p>
        </div>

        <div className="show-card">
          <p className="show-date">May 12, 2025 — Zürich, Dynamo</p>
          <p className="show-name">Doom Over Zürich</p>
        </div>

      </section>

      {/* ======================================== */}
      {/* MEDIA */}
      {/* ======================================== */}
      <section id="media" className="section fade-section">
        <h2 className="section-title">MEDIA</h2>

        <div className="gallery">
          <img src="/gallery1.jpg" />
          <img src="/gallery2.jpg" />
          <img src="/gallery3.jpg" />
        </div>
      </section>

      {/* ======================================== */}
      {/* FOOTER */}
      {/* ======================================== */}
      <footer className="footer">
        © 2025 Cable Pullers
      </footer>

    </div>
  );
}
