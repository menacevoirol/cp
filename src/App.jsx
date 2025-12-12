import { Outlet, Link } from "react-router-dom";
import BackgroundEffects from "./components/BackgroundEffects";

export default function App() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <BackgroundEffects />

      {/* GLOBAL HEADER */}
      <nav className="mega-header">
        <div className="mega-center">
          <div className="mega-nav">
            {/* WICHTIG: Anchor-Links für One-Pager verwenden */}
            <a href="#shows">SHOWS</a>
            <a href="#music">MUSIC</a>
            <a href="#about">ABOUT</a>
          </div>

          {/* Logo als Link zur Startseite (/) */}
          <Link to="/">
            <img src="/logo.png" className="mega-sigil" alt="Logo" />
          </Link>

          <div className="mega-nav">
            {/* WICHTIG: Anchor-Links für One-Pager verwenden */}
            <a href="#media">MEDIA</a>
            <a href="#merch">MERCH</a>
            <a href="#contact">CONTACT</a>
          </div>
        </div>
      </nav>

      <main className="flex-grow"></main>
      {/* <Outlet />Hier rendert der Inhalt der Route (Home oder Game) */}
      <Outlet />
    </div>
  );
}
