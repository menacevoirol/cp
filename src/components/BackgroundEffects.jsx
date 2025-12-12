// menacevoirol/cp/cp-a629b105ec39860fb755a0bb35213c72721b92bc/src/components/BackgroundEffects.jsx
import React from "react";
import Fog from "./Fog";
import NoiseOverlay from "./NoiseOverlay";

export default function BackgroundEffects() {
  return (
    <>
      {/* Das Fixed BG-Image mit sehr geringer Deckkraft */}

      <Fog />
      <NoiseOverlay />
    </>
  );
}
