// menacevoirol/cp/cp-a629b105ec39860fb755a0bb35213c72721b92bc/src/pages/Home.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import heroSVG from "../assets/hero.svg";
import "../Doom.css";

export default function Home() {
  // Intersection Observer Logic zur Sektion-Sichtbarkeit beibehalten
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

    // Cleanup
    return () => sections.forEach((sec) => obs.unobserve(sec));
  }, []);

  return (
    <div className="site-wrapper has-hero">
      {" "}
      {/* WICHTIG: KLASSE HINZUGEFÜGT */}
      {/* HEADER ENTFERNT (Jetzt in App.jsx) */}
      {/* HERO SECTION - Fixed 100vh Parallax Hintergrund */}
      <header className="hero-section">
        <div className="hero-svg-wrapper">
          <img src={heroSVG} className="hero-svg" alt="Abstract Background" />
        </div>

        {/* NEU: Scroll Hint */}
        <div className="scroll-hint">
          <p>SCROLL TO DESCEND</p>
          <div className="scroll-arrow">↓</div>
        </div>
      </header>
      {/* CONTENT SECTIONS - Scrollen unter dem Hero */}
      <section
        id="about"
        className="section fade-section max-w-4xl mx-auto px-4"
      >
        <h2 className="section-title text-3xl font-bold mb-8 uppercase text-purple-300 tracking-widest">
          About the Ritual
        </h2>
        <p className="section-text text-lg leading-relaxed text-gray-400">
          Cable Pullers zelebrieren den dunklen Riff-Kult. Heavy Riffs,
          hypnotische Grooves und atmosphärische Doom-Energie vereinen sich zu
          einem überwältigenden Hörerlebnis. Willkommen in der Leere.
        </p>
      </section>
      <section
        id="shows"
        className="section fade-section max-w-3xl mx-auto px-4"
      >
        <h2 className="section-title text-3xl font-bold mb-8 uppercase text-purple-300 tracking-widest">
          Upcoming Summonings
        </h2>
        <div className="w-full">
          <div className="show-card max-w-xl mx-auto">
            <p className="show-date">April 6, 2025 — Bern</p>
            <p className="show-name">Stoner Ritual Night</p>
          </div>
          <div className="show-card max-w-xl mx-auto">
            <p className="show-date">May 17, 2025 — Zürich</p>
            <p className="show-name">Inferno Fest</p>
          </div>
        </div>
      </section>
      <section
        id="music"
        className="section fade-section max-w-5xl mx-auto px-4"
      >
        <h2 className="section-title text-3xl font-bold mb-8 uppercase text-purple-300 tracking-widest">
          The Sound of Void
        </h2>
        <div className="w-full max-w-2xl mx-auto">
          <iframe
            className="music-embed w-full border-2 border-gray-700 shadow-xl"
            src="https://open.spotify.com/embed/artist/3BmG8pTz6PvxI6fN5EZe7C"
            width="100%"
            height="380"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </section>
      <section
        id="media"
        className="section fade-section max-w-5xl mx-auto px-4"
      >
        <h2 className="section-title text-3xl font-bold mb-8 uppercase text-purple-300 tracking-widest">
          Gallery of Damnation
        </h2>
        <div className="gallery px-4">
          <img src="/gallery1.jpg" alt="Gallery Image 1" />
          <img src="/gallery2.jpg" alt="Gallery Image 2" />
          <img src="/gallery3.jpg" alt="Gallery Image 3" />
        </div>
      </section>
      {/* FOOTER ENTFERNT (Jetzt in App.jsx) */}
    </div>
  );
}
