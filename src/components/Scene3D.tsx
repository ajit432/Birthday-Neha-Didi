import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleFieldProps {
  isDark: boolean;
}

const ParticleField: React.FC<ParticleFieldProps> = ({ isDark }) => {
  const points = useRef<THREE.Points>(null);
  
  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 10;
    positions[i3 + 1] = (Math.random() - 0.5) * 10;
    positions[i3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      points.current.rotation.y = state.clock.getElapsedTime() * 0.075;
    }
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? '#a78bfa' : '#ec4899'}
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={isDark ? 0.8 : 0.6}
      />
    </Points>
  );
};

interface Scene3DProps {
  isDark: boolean;
}

const Scene3D: React.FC<Scene3DProps> = ({ isDark }) => {
  return (
    <div className="fixed inset-0 -z-10 opacity-30 smooth">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <ParticleField isDark={isDark} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;