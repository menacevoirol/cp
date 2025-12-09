import { useState, useEffect } from "react";
import "./RitualPedal.css";

export default function RitualPedal({ onComplete }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (value >= 80) {
      setTimeout(() => onComplete(), 400);
    }
  }, [value, onComplete]);

  return (
    <div className="pedal-wrapper">

      <div className="pedal-box">

        {/* Schrauben */}
        <div className="screw s1"></div>
        <div className="screw s2"></div>
        <div className="screw s3"></div>
        <div className="screw s4"></div>

        {/* Titel */}
        <h1 className="pedal-title">
          CABLE PULLERS
        </h1>

        {/* Fader */}
        <div className="fader-wrapper">
          <div className="fader-track"></div>

          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="fader"
          />

          <div className={`led ${value >= 80 ? "on" : ""}`}></div>
        </div>

      </div>
    </div>
  );
}
