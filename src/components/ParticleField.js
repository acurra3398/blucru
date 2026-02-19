import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GlowParticles({ count = 300, color = '#3b82f6' }) {
  const ref = useRef();

  const { positions, sizes, opacities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const op = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      // More big glowing orbs, larger base sizes
      sz[i] = Math.random() < 0.2 ? 0.35 + Math.random() * 0.4 : 0.1 + Math.random() * 0.18;
      op[i] = 0.75 + Math.random() * 0.25;
    }
    return { positions: pos, sizes: sz, opacities: op };
  }, [count]);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aOpacity;
        varying float vOpacity;
        uniform float uTime;
        void main() {
          vOpacity = aOpacity;
          vec3 pos = position;
          // Gentle floating motion
          pos.y += sin(uTime * 0.3 + position.x * 0.5) * 0.3;
          pos.x += cos(uTime * 0.2 + position.y * 0.4) * 0.2;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          // Pulsing size
          float pulse = 1.0 + 0.3 * sin(uTime * 0.8 + position.z * 2.0);
          gl_PointSize = aSize * pulse * (500.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vOpacity;
        void main() {
          // Soft glowing circle with bright center
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float glow = pow(1.0 - smoothstep(0.0, 0.5, dist), 1.5);
          float core = 1.0 - smoothstep(0.0, 0.18, dist);
          vec3 col = uColor * glow * 2.0 + vec3(1.0) * core * 0.9;
          float alpha = (glow * 0.9 + core * 0.1) * vOpacity;
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, [color]);

  useFrame((state) => {
    shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    ref.current.rotation.y = state.clock.elapsedTime * 0.015;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.1;
  });

  return (
    <points ref={ref} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aSize" count={count} array={sizes} itemSize={1} />
        <bufferAttribute attach="attributes-aOpacity" count={count} array={opacities} itemSize={1} />
      </bufferGeometry>
    </points>
  );
}

export default function ParticleField({ style, color }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', ...style }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
        <GlowParticles color={color} />
      </Canvas>
    </div>
  );
}
