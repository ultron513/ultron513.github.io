"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const group = groupRef.current;

    if (!group) {
      return;
    }

    group.rotation.y += delta * 0.08;
    group.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.15) * 0.12;

    group.children.forEach((child, index) => {
      child.position.y =
        Math.sin(
          state.clock.elapsedTime * 0.35 + index * 1.7,
        ) * 0.12;
    });
  });

  return (
    <group ref={groupRef}>
      <mesh position={[-2.4, 0.6, -1.5]} rotation={[0.4, 0.6, 0.2]}>
        <icosahedronGeometry args={[0.7, 1]} />

        <meshStandardMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.16}
        />
      </mesh>

      <mesh position={[2.2, -0.8, -1]} rotation={[0.5, 0.2, 0.8]}>
        <octahedronGeometry args={[0.6, 0]} />

        <meshStandardMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      <mesh position={[0.5, 1.8, -2]} rotation={[0.7, 0.5, 0.4]}>
        <torusGeometry args={[0.55, 0.12, 16, 48]} />

        <meshStandardMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
}