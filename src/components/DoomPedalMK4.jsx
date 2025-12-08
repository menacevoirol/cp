import { useState, useRef, useEffect } from "react";

export default function DoomPedalMK4({ onComplete }) {
  const [pressed, setPressed] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!pressed) return;

    // MP3 startet 1s später
    const audioTimer = setTimeout(() => {
      audioRef.current?.play().catch(() => {});
    }, 1000);

    // Ende nach 5s
    const endTimer = setTimeout(() => onComplete?.(), 5000);

    return () => {
      clearTimeout(audioTimer);
      clearTimeout(endTimer);
    };
  }, [pressed]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">

      {/* Audio */}
      <audio ref={audioRef} src="/enter.mp3" preload="auto" />

      {/* Pedal body */}
      <div
        className={`relative w-[430px] h-[430px] rounded-xl overflow-hidden
            bg-black shadow-[0_0_60px_rgba(0,0,0,0.9)]
            border-[4px] border-[#666]
            ${pressed ? "animate-[shake_0.12s_linear_infinite]" : ""}
        `}
      >
        {/* Artwork */}
        <img
          src="/logo.png"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 🔥 EYE FIRE OVERLAY – exakt gemappt */}
        <div
          className={`
            absolute 
            ${pressed ? "animate-eyeFire" : ""}
          `}
          style={{
            left: "50%",
            top: "50%",
            width: "430px",
            height: "430px",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            mixBlendMode: "screen",
            background: `
              radial-gradient(
                circle at 217px 107px,       /* <- exakte Position */
                rgba(255,60,0,0.9),
                rgba(255,0,0,0.55) 25%,
                rgba(120,0,0,0.0) 40%
              )
            `
          }}
        ></div>

        {/* 🔥 PUPIL PULSE */}
        <div
          className={`absolute rounded-full bg-red-800/70 blur-md
            ${pressed ? "animate-pulseEye" : ""}
          `}
          style={{
            width: "90px",
            height: "90px",
            top: "107px",
            left: "217px",
            transform: "translate(-50%, -50%)",
            mixBlendMode: "screen",
            pointerEvents: "none"
          }}
        />

        {/* FOOTSWITCH — REAL METAL VERSION */}
<button
  onClick={() => setPressed(true)}
  className={`
    footswitch
    absolute bottom-[100px] left-1/2 -translate-x-1/2
    ${pressed ? "footswitch-pressed" : ""}
  `}
></button>


        {/* LED */}
        <div
          className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-[20px] h-[20px] rounded-full 
            ${pressed ? "bg-red-500 shadow-[0_0_25px_red]" : "bg-[#333]"}`}
        ></div>
      </div>
    </div>
  );
}
