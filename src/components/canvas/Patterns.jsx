import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Sphere, Points, PointMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 1. Parametric Wave Mesh
export const ParametricWave = ({ color = "#8833ff" }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
    meshRef.current.rotation.y = time * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color={color}
        speed={2}
        distort={0.4}
        radius={1}
      />
    </mesh>
  );
};

// 2. Particle Field
export const ParticleField = ({ color = "#33ffff" }) => {
  const points = useMemo(() => {
    const p = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      p[i * 3] = (Math.random() - 0.5) * 4;
      p[i * 3 + 1] = (Math.random() - 0.5) * 4;
      p[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return p;
  }, []);

  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.1;
  });

  return (
    <Points positions={points} ref={ref}>
      <PointMaterial
        transparent
        color={color}
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

// 3. Floating Geometric Solids (Abstract)
export const AbstractSolids = ({ color = "#ff3366" }) => {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.5;
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.3;
  });

  return (
    <group ref={ref}>
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[1, 0]} />
        <MeshWobbleMaterial color={color} factor={1} speed={2} />
      </mesh>
    </group>
  );
};

// 4. Noise-driven Deformation Grid
export const DeformationGrid = ({ color = "#33ff88" }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.5;
    meshRef.current.position.y = Math.sin(time) * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[0.6, 0.2, 128, 32]} />
      <MeshDistortMaterial
        color={color}
        speed={5}
        distort={0.3}
      />
    </mesh>
  );
};

// Helper to get a random pattern based on a string (e.g. repo name)
export const getProjectPattern = (repoName, index) => {
  const patterns = [
    ParametricWave,
    ParticleField,
    AbstractSolids,
    DeformationGrid
  ];
  
  // Deterministic choice based on index or hash
  const Component = patterns[index % patterns.length];
  
  // Deterministic color
  const colors = ["#8833ff", "#33ffff", "#ff3366", "#33ff88", "#ffaa33", "#ffffff"];
  const color = colors[index % colors.length];

  return <Component color={color} />;
};
