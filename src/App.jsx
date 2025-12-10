import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Fog from "./components/Fog";
import RitualPedal from "./components/RitualPedal";
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
      {/* 🎮 Doom Pedal */}
      {showPedal && (
        <RitualPedal
          onComplete={() => {
            setShowPedal(false);
            setStartSequence(true);
          }}
        />
      )}

      {/* Hintergrund-Effekte */}
      <Fog />
      <NoiseOverlay />

      {/* Fade-to-black bei Start */}
      <TransitionOverlay active={startSequence} />

      {/* Landing Page */}
      {!showPedal && !startSequence && (
        <main className="text-center animate-fadeIn z-20 px-4">
          <img
            src="/logo.png"
            className="w-[260px] md:w-[380px] mx-auto select-none"
            alt="Logo"
          />

          <button
            onClick={handleEnter}
            className="mt-10 px-10 py-3 border border-gray-600 rounded-md text-gray-300
                       hover:bg-gray-800 transition-all tracking-[0.2em]"
          >
            ENTER
          </button>
        </main>
      )}

      {/* Enter Sequence GANZ OBEN! */}
      <EnterSequence
        active={startSequence}
        onFinish={() => navigate("/home")}
      />
    </div>
  );
}
