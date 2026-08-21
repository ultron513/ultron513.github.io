"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { FloatingShapes } from "./floating-shapes";
import { ParticleField } from "./particle-field";

type SceneProps = {
  className?: string;
  showParticles?: boolean;
  showShapes?: boolean;
};

function SceneContent({
  showParticles,
  showShapes,
}: Required<Omit<SceneProps, "className">>) {
  return (
    <>
      <ambientLight intensity={0.4} />

      <directionalLight
        position={[4, 6, 4]}
        intensity={0.6}
      />

      {showParticles ? <ParticleField /> : null}

      {showShapes ? <FloatingShapes /> : null}
    </>
  );
}

export function Scene({
  className,
  showParticles = true,
  showShapes = true,
}: SceneProps) {
  return (
    <div
      className={className}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0, 8],
          fov: 50,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <Suspense fallback={null}>
          <SceneContent
            showParticles={showParticles}
            showShapes={showShapes}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}