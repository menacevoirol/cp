import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function FuzzPedalGame({ onComplete }) {
  const [active, setActive] = useState(false);
  const audioRef = useRef(null);

const handlePress = () => {
  if (active) return;
  setActive(true);

  // 1) Visuelle Aktivierung startet SOFORT
  // (LED, Vulkanadern, Tentakel usw.)

  // 2) SHAKE beginnt nach 1 Sekunde – und läuft dann volle 5 Sekunden
  setTimeout(() => {
    document.body.classList.add("shake-hard");
  }, 300); // <-- Shake Delay

  // 3) SOUND beginnt nach 1 Sekunde
  setTimeout(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 1;
      audioRef.current.play();
    }
  }, 300); // <-- Sound Delay

  // 4) Stoppen von Shake + Sound + Weiterleitung nach 6 Sekunden TOTAL
  // (1s Delay + 5s Shake)
  setTimeout(() => {
    // SOUND STOP
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // SHAKE STOP
    document.body.classList.remove("shake-hard");

    // NAVIGATE
    onComplete();
  }, 6200); // <-- 6 Sekunden total
};



  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-40">

      {/* AUDIO ELEMENT */}
      <audio ref={audioRef} src="/enter.mp3" preload="auto" />

      {/* COSMIC PORTAL BEHIND PEDAL */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={ active ? { opacity: 0.25, scale: 1.2 } : {} }
        transition={{ duration: 1.2 }}
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background: `
            radial-gradient(circle, rgba(255,30,0,0.2), transparent 70%),
            radial-gradient(circle, rgba(200,0,0,0.2), transparent 80%)
          `
        }}
      />

      {/* PEDAL BODY */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-[430px] h-[760px]
          rounded-xl overflow-hidden
          bg-[#0a0a0a]
          border-[12px] border-[#2a2a2a]
          shadow-[0_0_160px_black]"
      >

        {/* DAMAGED METAL SCRATCHES */}
        <svg className="absolute inset-0 opacity-25 pointer-events-none" viewBox="0 0 430 760">
          <path d="M20 40 L80 10 L140 45" stroke="#444" strokeWidth="6"/>
          <path d="M310 720 L370 700 L400 735" stroke="#333" strokeWidth="8"/>
          <path d="M180 5 L240 25 L300 5" stroke="#555" strokeWidth="4"/>
          <path d="M40 300 L200 260 L380 290" stroke="#444" strokeWidth="3"/>
          <path d="M80 520 L300 480" stroke="#555" strokeWidth="4"/>
        </svg>

        {/* HEAT SHIMMER */}
        <div
          className="absolute inset-0 mix-blend-screen pointer-events-none"
          style={{
            background: `
              linear-gradient(120deg, rgba(255,80,0,0.12), transparent 70%),
              linear-gradient(60deg, rgba(255,0,0,0.1), transparent 60%)
            `,
            opacity: 0.15
          }}
        />

        {/* LAVA VEINS */}
        <motion.svg
          viewBox="0 0 430 760"
          className="absolute inset-0 pointer-events-none opacity-50"
          animate={active ? { opacity: [0.5, 0.9, 0.6] } : {}}
          transition={{ duration: 1.2, repeat: active ? Infinity : 0 }}
        >
          <motion.path
            d="M20 740 C100 600 80 540 150 480 C240 400 330 330 260 200 C180 80 300 40 420 140"
            strokeWidth="10"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: active ? 1 : 0,
              stroke: active ? ["#aa0000", "#ff4400", "#dd0000"] : "#552222"
            }}
            transition={{ duration: 1.4 }}
            strokeLinecap="round"
          />
        </motion.svg>

        {/* TITLE */}
        <div className="text-center pt-10">
          <h1 className="text-white text-4xl tracking-widest font-black drop-shadow-[0_0_20px_black]">
            CABLE PULLERS
          </h1>
          <p className="text-gray-500 text-xs tracking-[0.5em]">
            HELL ENGINE MK III
          </p>
        </div>

        {/* KNOBS */}
        <div className="flex justify-around mt-14">
          <Knob label="GAIN" />
          <Knob label="FURY" />
          <Knob label="VOL" />
        </div>

        {/* LED */}
        <motion.div
          animate={ active 
            ? { opacity: [0.4, 1, 0.4], scale: [1, 1.8, 1] }
            : { opacity: 0.25 }
          }
          transition={{ duration: 0.5, repeat: active ? Infinity : 0 }}
          className={`w-14 h-14 mx-auto mt-16 rounded-full border-[6px]
            ${active 
              ? "bg-red-600 border-[#330707] shadow-[0_0_80px_25px_red]"
              : "bg-[#170303] border-[#220000]"
            }`}
        />

        {/* FOOTSWITCH */}
        <motion.div
          onClick={handlePress}
          whileTap={{ scale: 0.85 }}
          animate={active ? { y: 20 } : { y: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 12 }}
          className="absolute left-1/2 bottom-32 -translate-x-1/2 cursor-pointer"
        >
          <div className="w-44 h-44 rounded-full bg-gradient-to-b from-[#888] to-[#222]
                          border-[12px] border-[#aaa]
                          shadow-[inset_0_0_40px_black,0_0_60px_black]
                          flex items-center justify-center">
            <div
              className={`
                w-26 h-26 rounded-full
                ${active 
                  ? "bg-red-600 shadow-[0_0_80px_30px_red]" 
                  : "bg-[#2a2a2a] shadow-inner"}
              `}
            />
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}

/* KNOB COMPONENT */
function Knob({ label }) {
  return (
    <div className="text-center">
      <div className="text-gray-400 text-sm tracking-widest mb-3">{label}</div>

      <motion.div
        animate={{ rotate: 130 }}
        className="w-28 h-28 rounded-full
          bg-gradient-to-br from-[#777] to-[#222]
          border-[10px] border-[#999]
          shadow-[inset_0_0_30px_black]
          relative"
      >
        <div className="absolute left-1/2 top-3 -translate-x-1/2 w-2 h-10 bg-red-500 rounded-full"/>
      </motion.div>
    </div>
  );
}
