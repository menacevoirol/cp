import { useEffect, useState } from "react";
import "../doom.css"; // <--- deine Doom-Styles (siehe Schritt 2)

export default function Home() {
  const [scrollEnergy, setScrollEnergy] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const v = window.scrollY % 200;
      setScrollEnergy(v);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="doom-wrapper page-bg text-gray-200">

      {/* DOOM ENERGY LAYER */}
      <div
        className="doom-energy"
        style={{ opacity: 0.25 + scrollEnergy / 400 }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between py-4 px-4">
          <img src="/logo.png" className="h-10 glitch" data-text="CP" alt="Logo" />

          <div className="space-x-6 text-sm tracking-widest">
            <a href="#about" className="hover:text-white">ABOUT</a>
            <a href="#music" className="hover:text-white">MUSIC</a>
            <a href="#shows" className="hover:text-white">SHOWS</a>
            <a href="#media" className="hover:text-white">MEDIA</a>
            <a href="#merch" className="hover:text-white">MERCH</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="pt-40 pb-20 text-center relative">

        {/* DOOM EYE (UNTER DEM LOGO) */}
        <div className="doom-eye eye-idle"></div>

        <h1 
          className="text-5xl font-bold tracking-[0.25em] glitch" 
          data-text="CABLE PULLERS"
        >
          CABLE PULLERS
        </h1>

        <p className="text-gray-400 mt-3">
          Dark Groove // Heavy Atmosphere
        </p>
      </header>

      {/* ABOUT */}
      <section id="about" className="max-w-3xl mx-auto px-4 py-20">
        <h2 className="doom-title glitch" data-text="ABOUT">ABOUT</h2>
        <p className="leading-relaxed text-gray-300">
          Cable Pullers is a heavy stoner rock band delivering thick riffs,
          hypnotic grooves and dark atmospheric energy. Formed in Switzerland,
          the band blends doom, fuzz and raw power into a massive soundscape.
        </p>
      </section>

      {/* MUSIC */}
      <section id="music" className="max-w-3xl mx-auto px-4 py-20">
        <h2 className="doom-title glitch" data-text="MUSIC">MUSIC</h2>

        <iframe 
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/artist/3BmG8pTz6PvxI6fN5EZe7C?utm_source=generator"
          width="100%"
          height="380"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </section>

      {/* SHOWS */}
      <section id="shows" className="max-w-3xl mx-auto px-4 py-20">
        <h2 className="doom-title glitch" data-text="SHOWS">SHOWS</h2>

        <div className="space-y-4">
          <div className="doom-panel">
            <p className="text-gray-400 text-sm">April 6, 2025 — Bern, Switzerland</p>
            <p className="font-bold text-lg">Stoner Ritual Night</p>
          </div>

          <div className="doom-panel">
            <p className="text-gray-400 text-sm">May 12, 2025 — Zürich, Dynamo</p>
            <p className="font-bold text-lg">Doom Over Zürich</p>
          </div>
        </div>
      </section>

      {/* MEDIA */}
      <section id="media" className="max-w-5xl mx-auto px-4 py-20">
        <h2 className="doom-title glitch" data-text="MEDIA">MEDIA</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <img src="/gallery1.jpg" className="object-cover rounded-lg doom-img" />
          <img src="/gallery2.jpg" className="object-cover rounded-lg doom-img" />
          <img src="/gallery3.jpg" className="object-cover rounded-lg doom-img" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500 text-sm">
        <p>© 2025 Cable Pullers — All Rights Reserved</p>
      </footer>
    </div>
  );
}
