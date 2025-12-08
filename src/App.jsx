import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Fog from "./components/Fog";
import DoomPedalMK4 from "./components/DoomPedalMK4";
import EnterSequence from "./components/EnterSequence"; 
import NoiseOverlay from "./components/NoiseOverlay";
import TransitionOverlay from "./components/TransitionOverlay";

export default function App() {
  const [showPedal, setShowPedal] = useState(false);
  const [startSequence, setStartSequence] = useState(false);
  const navigate = useNavigate();

  const handleEnter = () => {
    setShowPedal(true); 
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">

      {/* 🚀 Shader-Sequenz */}
      <EnterSequence
        active={startSequence}
        onFinish={() => navigate("/home")}
      />

      {/* 🎮 Doom Pedal Spiel */}
      {showPedal && (
        <DoomPedalMK4
          onComplete={() => {
            setShowPedal(false);
            setStartSequence(true);
          }}
        />
      )}

      {/* 🔥 Hintergrund-Video */}
      <Fog />

      {/* 🔥 Film Grain */}
      <NoiseOverlay />

      {/* Optional */}
      <TransitionOverlay active={startSequence} />

      {/* Landing Page Content */}
      {!showPedal && !startSequence && (
        <main className="text-center animate-fadeIn z-20 px-4">
          <img
            src="/logo.png"
            className="w-[260px] md:w-[380px] mx-auto select-none"
            alt="Logo"
          />

          <p className="text-gray-400 text-lg mt-4 tracking-wide">
            Dark Groove // Heavy Atmosphere
          </p>

          <button
            onClick={handleEnter}
            className="mt-10 px-10 py-3 border border-gray-600 rounded-md text-gray-300
                       hover:bg-gray-800 transition-all tracking-[0.2em]"
          >
            ENTER
          </button>
        </main>
      )}
    </div>
  );
}
