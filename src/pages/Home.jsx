import { useEffect } from "react";
import hero from "../assets/hero.svg";
import "../Doom.css";

export default function Home() {
  // Nur Fade-In, kein Fullpage Scroll mehr
  useEffect(() => {
    const sections = document.querySelectorAll(".fade-section");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((sec) => obs.observe(sec));
  }, []);

  useEffect(() => {
    const titleContainer = document.querySelector(".hero-content");
    const heroSection = document.querySelector(".hero-section");

    if (!titleContainer || !heroSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry.isIntersecting) {
          titleContainer.classList.add("hidden");
        } else {
          titleContainer.classList.remove("hidden");
        }
      },
      {
        threshold: 0.4, // 40% der Hero-Sektion sichtbar = sichtbar
      }
    );

    observer.observe(heroSection);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-wrapper">
      {/* HEADER */}
      <nav className="mega-header">
        <div className="mega-left"></div>

        <div className="mega-center">
          <div className="mega-nav">
            <a href="#shows">SHOWS</a>
            <a href="#music">MUSIC</a>
            <a href="#about">ABOUT</a>
          </div>

          <img src="/logo.png" className="mega-sigil" alt="Logo" />

          <div className="mega-nav">
            <a href="#media">MEDIA</a>
            <a href="#merch">MERCH</a>
            <a href="#contact">CONTACT</a>
          </div>
        </div>

        <div className="mega-right"></div>
      </nav>

      {/* HERO */}
      <header className="hero-section">
        <div className="hero-svg-wrapper">
          <img src={hero} className="hero-svg" alt="background" />
        </div>

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title">CABLE PULLERS</h1>
        </div>
      </header>

      {/* CONTENT SECTIONS */}
      <section id="about" className="section fade-section">
        <h2 className="section-title">ABOUT</h2>
        <p className="section-text">
          Heavy riffs, hypnotic grooves and atmospheric doom energy.
        </p>
      </section>

      <section id="music" className="section fade-section">
        <h2 className="section-title">MUSIC</h2>
        <iframe
          className="music-embed"
          src="https://open.spotify.com/embed/artist/3BmG8pTz6PvxI6fN5EZe7C"
          width="100%"
          height="380"
        />
      </section>

      <section id="shows" className="section fade-section">
        <h2 className="section-title">SHOWS</h2>
        <div className="show-card">
          <p className="show-date">April 6, 2025 — Bern</p>
          <p className="show-name">Stoner Ritual Night</p>
        </div>
      </section>

      <section id="media" className="section fade-section">
        <h2 className="section-title">MEDIA</h2>
        <div className="gallery">
          <img src="/gallery1.jpg" />
          <img src="/gallery2.jpg" />
          <img src="/gallery3.jpg" />
        </div>
      </section>

      <footer className="footer">© 2025 Cable Pullers</footer>
    </div>
  );
}
