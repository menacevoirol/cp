import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Noise, Glitch, Vignette } from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

export default function EnterSequence({ active, onFinish }) {
  if (!active) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 pointer-events-none"
    >
      {/* WebGL Shader Canvas */}
      <Canvas>
        <MeltdownShader />
        <Effects onFinish={onFinish} />
      </Canvas>

      {/* Weißer Flash am Ende */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.2 }}
        className="absolute inset-0 bg-white"
      />
    </motion.div>
  );
}

/* -----------------------------------
   MELTDOWN SHADER (wavy distortion)
-------------------------------------*/

function MeltdownShader() {
  const mesh = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    mesh.current.material.distortion = Math.sin(t * 3) * 0.2;
    mesh.current.material.distortion2 = Math.sin(t * 1.2) * 0.15;
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[2, 2]} />
      <meltdownMaterial />
    </mesh>
  );
}

/* -----------------------------------
   POSTPROCESSING (noise + glitch)
-------------------------------------*/

function Effects({ onFinish }) {
  useEffect(() => {
    const timeout = setTimeout(() => onFinish(), 1600); // After animation → navigate
    return () => clearTimeout(timeout);
  }, []);

  return (
    <EffectComposer>
      {/* Noise */}
      <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} />

      {/* Glitch Phase */}
      <Glitch
        delay={[0.3, 0.6]}
        duration={[0.2, 0.6]}
        strength={[0.2, 0.5]}
        mode={GlitchMode.CONSTANT_WILD}
        active
      />

      {/* Doom Vignette */}
      <Vignette eskil={false} offset={0.4} darkness={1.2} />
    </EffectComposer>
  );
}

/* -----------------------------------
   CUSTOM MELTDOWN MATERIAL
-------------------------------------*/

import { ShaderMaterial } from "three";
import { extend } from "@react-three/fiber";

class MeltdownMaterialImpl extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float time;

        void main() {
          vUv = uv;

          vec3 pos = position;

          // Meltdown distortion
          pos.y += sin(uv.x * 10.0 + time * 5.0) * 0.15;
          pos.x += sin(uv.y * 6.0 + time * 3.0) * 0.10;

          gl_Position = vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;

        void main() {
          // Psychedelic doom palette
          float r = 0.2 + 0.2 * sin(vUv.x * 20.0);
          float g = 0.1 + 0.2 * sin(vUv.y * 15.0);
          float b = 0.25 + 0.3 * sin(vUv.x * 10.0 + vUv.y * 10.0);

          gl_FragColor = vec4(r, g, b, 1.0);
        }
      `,
    });
  }
}

extend({ MeltdownMaterial: MeltdownMaterialImpl });
