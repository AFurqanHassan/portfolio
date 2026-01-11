import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedStars = () => {
  const starsRef = useRef();
  useFrame((state) => {
    starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });
  return <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />;
};

const BackgroundScene = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-black">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <AnimatedStars />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[5, 2, -5]}>
            <icosahedronGeometry args={[2, 1]} />
            <meshStandardMaterial color="#8833ff" wireframe />
          </mesh>
        </Float>
        <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
          <mesh position={[-5, -2, -2]}>
            <torusGeometry args={[3, 0.2, 16, 100]} />
            <meshStandardMaterial color="#33ffff" wireframe />
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
};

export default BackgroundScene;
