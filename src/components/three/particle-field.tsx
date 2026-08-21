"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type ParticleFieldProps = {
  count?: number;
  spread?: number;
};

export function ParticleField({
  count = 500,
  spread = 14,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const offset = index * 3;

      data[offset] =
        (Math.random() - 0.5) * spread;

      data[offset + 1] =
        (Math.random() - 0.5) * spread;

      data[offset + 2] =
        (Math.random() - 0.5) * spread;
    }

    return data;
  }, [count, spread]);

  useFrame((state, delta) => {
    const points = pointsRef.current;

    if (!points) {
      return;
    }

    points.rotation.y += delta * 0.012;

    points.rotation.x =
      Math.sin(
        state.clock.elapsedTime * 0.06,
      ) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.32}
        depthWrite={false}
      />
    </points>
  );
}