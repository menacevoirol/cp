import { Canvas, useFrame, extend } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ShaderMaterial } from "three";

export default function EnterSequence({ active, onFinish }) {
  if (!active) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[9999] pointer-events-none bg-black"
      style={{ isolation: "isolate" }}
    >
      {/* DARK SMOKE VORTEX */}
      <Canvas
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
        gl={{ alpha: true }}
      >
        <SmokeVortex />
      </Canvas>

      {/* Fade to black after animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1.2 }}
        className="absolute inset-0 bg-black z-10"
      />

      <FinishTimer delay={4000} onFinish={onFinish} />
    </motion.div>
  );
}

function FinishTimer({ onFinish, delay }) {
  useEffect(() => {
    const t = setTimeout(() => onFinish(), delay);
    return () => clearTimeout(t);
  }, []);
  return null;
}

/* -------------------------------
   DARK SMOKE + VORTEX SHADER
-------------------------------- */

function SmokeVortex() {
  const mesh = useRef();

  useFrame(({ clock }) => {
    mesh.current.material.uniforms.time.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[4, 4]} />
      <smokeVortexMaterial />
    </mesh>
  );
}

class SmokeVortexMaterialImpl extends ShaderMaterial {
  constructor() {
    super({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float time;

        // Simple psuedo noise
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          vec2 u = f*f*(3.0-2.0*f);
          return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
        }

        void main() {
          vec2 uv = vUv - 0.5;
          float t = time * 0.3;

          // Rotating vortex coordinate
          float angle = atan(uv.y, uv.x);
          float radius = length(uv);

          angle += t * 0.4;
          vec2 vortexUV = vec2(
            cos(angle) * radius,
            sin(angle) * radius
          );

          float smoke = noise(vortexUV * 4.0 + t);
          smoke += noise(vortexUV * 8.0 - t * 0.7) * 0.5;

          smoke *= smoothstep(0.8, 0.2, radius);

          vec3 col = mix(
            vec3(0.0, 0.0, 0.0),
            vec3(0.15, 0.1, 0.2),
            smoke
          );

          gl_FragColor = vec4(col, 0.95);
        }
      `,
    });
  }
}

extend({ SmokeVortexMaterial: SmokeVortexMaterialImpl });
