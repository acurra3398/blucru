import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function GearMesh({ position, scale, speed, color }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.z += speed;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  const gearShape = useMemo(() => {
    const shape = new THREE.Shape();
    const teeth = 12;
    const outerR = 1;
    const innerR = 0.7;
    const toothH = 0.2;
    for (let i = 0; i < teeth; i++) {
      const a1 = (i / teeth) * Math.PI * 2;
      const a2 = ((i + 0.3) / teeth) * Math.PI * 2;
      const a3 = ((i + 0.5) / teeth) * Math.PI * 2;
      const a4 = ((i + 0.8) / teeth) * Math.PI * 2;
      if (i === 0) shape.moveTo(Math.cos(a1) * outerR, Math.sin(a1) * outerR);
      shape.lineTo(Math.cos(a2) * (outerR + toothH), Math.sin(a2) * (outerR + toothH));
      shape.lineTo(Math.cos(a3) * (outerR + toothH), Math.sin(a3) * (outerR + toothH));
      shape.lineTo(Math.cos(a4) * outerR, Math.sin(a4) * outerR);
    }
    shape.closePath();
    const hole = new THREE.Path();
    hole.absellipse(0, 0, innerR * 0.4, innerR * 0.4, 0, Math.PI * 2);
    shape.holes.push(hole);
    return shape;
  }, []);

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <extrudeGeometry args={[gearShape, { depth: 0.15, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 }]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

function CoreSphere() {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.2, 1]} />
        <MeshDistortMaterial
          color="#3b82f6"
          emissive="#1e3a5f"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
          distort={0.2}
          speed={2}
          wireframe
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function ParticleRing() {
  const ref = useRef();
  const count = 120;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 2.2 + Math.random() * 0.3;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, []);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#60a5fa" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function FloatingBolts() {
  const group = useRef();
  const bolts = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
      ],
      scale: 0.03 + Math.random() * 0.05,
      speed: 0.2 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
    })), []);

  useFrame((state) => {
    group.current.children.forEach((child, i) => {
      const b = bolts[i];
      child.position.y = b.pos[1] + Math.sin(state.clock.elapsedTime * b.speed + b.offset) * 0.3;
      child.rotation.x = state.clock.elapsedTime * b.speed;
      child.rotation.z = state.clock.elapsedTime * b.speed * 0.5;
    });
  });

  return (
    <group ref={group}>
      {bolts.map((b, i) => (
        <mesh key={i} position={b.pos} scale={b.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.4} metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

export default function RobotScene({ style, className }) {
  return (
    <div style={{ width: '100%', height: '100%', ...style }} className={className}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-3, 2, 4]} intensity={0.8} color="#3b82f6" />
        <pointLight position={[3, -2, 2]} intensity={0.5} color="#f59e0b" />
        <CoreSphere />
        <GearMesh position={[-2.5, 1.2, -1]} scale={0.5} speed={0.008} color="#3b82f6" />
        <GearMesh position={[2.8, -1, -1.5]} scale={0.4} speed={-0.01} color="#f59e0b" />
        <GearMesh position={[-1.8, -1.5, -0.5]} scale={0.3} speed={0.012} color="#60a5fa" />
        <ParticleRing />
        <FloatingBolts />
      </Canvas>
    </div>
  );
}
