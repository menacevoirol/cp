// menacevoirol/cp/cp-a629b105ec39860fb755a0bb35213c72721b92bc/src/components/BackgroundEffects.jsx
import React from "react";
import Fog from "./Fog";
import NoiseOverlay from "./NoiseOverlay";

export default function BackgroundEffects() {
  return (
    <>
      {/* Das Fixed BG-Image mit sehr geringer Deckkraft */}
      <div
        className="fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url("/background.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Fog />
      <NoiseOverlay />
    </>
  );
}
