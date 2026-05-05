import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float, MeshDistortMaterial, PresentationControls, Stage } from '@react-three/drei';

const WatchModel = () => {
  const watchRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (watchRef.current) {
      watchRef.current.rotation.y = t * 0.5;
      watchRef.current.position.y = Math.sin(t) * 0.1;
    }
  });

  return (
    <group ref={watchRef}>
      {/* Outer Case / Bezel */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.15, 16, 100]} />
        <meshStandardMaterial color="#c5a059" metalness={1} roughness={0.1} />
      </mesh>
      
      {/* Watch Body */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.4, 32]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Face / Dial */}
      <mesh position={[0, 0, 0.21]}>
        <circleGeometry args={[1.3, 32]} />
        <meshStandardMaterial color="#050505" />
      </mesh>

      {/* Hands */}
      <mesh position={[0, 0, 0.22]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.05, 1, 0.01]} />
        <meshStandardMaterial color="#c5a059" />
      </mesh>
      <mesh position={[0, 0, 0.22]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.05, 0.7, 0.01]} />
        <meshStandardMaterial color="#c5a059" />
      </mesh>

      {/* Glass */}
      <mesh position={[0, 0, 0.25]}>
        <circleGeometry args={[1.4, 32]} />
        <meshPhysicalMaterial 
          transparent 
          opacity={0.3} 
          roughness={0} 
          transmission={1} 
          thickness={0.5} 
        />
      </mesh>

      {/* Strap placeholders */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[1.2, 1.5, 0.3]} />
        <meshStandardMaterial color="#222" roughness={0.8} />
      </mesh>
      <mesh position={[0, -2, 0]}>
        <boxGeometry args={[1.2, 1.5, 0.3]} />
        <meshStandardMaterial color="#222" roughness={0.8} />
      </mesh>
    </group>
  );
};

export const WatchScene = () => {
  return (
    <PresentationControls
      global
      config={{ mass: 2, tension: 500 }}
      snap={{ mass: 4, tension: 1500 }}
      rotation={[0, 0.3, 0]}
      polar={[-Math.PI / 3, Math.PI / 3]}
      azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
    >
      <Stage environment="city" intensity={0.5} contactShadow={false}>
        <WatchModel />
      </Stage>
    </PresentationControls>
  );
};

export default WatchScene;
