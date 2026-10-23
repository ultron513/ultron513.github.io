"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { seeded } from "@/lib/seeded";

import { planetFragment, planetVertex } from "./shaders/planet.glsl";
import { starfieldFragment, starfieldVertex } from "./shaders/starfield.glsl";

export type SceneColors = {
  star: [number, number, number];
  line: [number, number, number, number];
  planet: [number, number, number];
  limb: [number, number, number];
};

type SceneProps = {
  colors: SceneColors;
  day: boolean;
  frameloop: "always" | "demand" | "never";
  compact: boolean;
};

const STAR_COUNT = 1400;

function useStarGeometry() {
  return useMemo(() => {
    const rand = seeded(513);
    const positions = new Float32Array(STAR_COUNT * 3);
    const sizes = new Float32Array(STAR_COUNT);
    const seeds = new Float32Array(STAR_COUNT);
    for (let i = 0; i < STAR_COUNT; i++) {
      // Points in a thick shell around the camera.
      const u = rand() * 2 - 1;
      const theta = rand() * Math.PI * 2;
      const radius = 14 + rand() * 26;
      const s = Math.sqrt(1 - u * u);
      positions.set(
        [radius * s * Math.cos(theta), radius * u, -Math.abs(radius * s * Math.sin(theta)) - 2],
        i * 3,
      );
      sizes[i] = 0.6 + Math.pow(rand(), 6) * 3.2;
      seeds[i] = rand();
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    // Constellations for Daylight Orbit: join each of the brightest stars to its nearest bright neighbour.
    const bright = Array.from({ length: STAR_COUNT }, (_, i) => i)
      .filter((i) => sizes[i] > 1.6 && positions[i * 3 + 2] > -30)
      .slice(0, 90);
    const segments: number[] = [];
    for (const i of bright) {
      let best = -1;
      let bestDistance = Infinity;
      for (const j of bright) {
        if (j === i) continue;
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const d = dx * dx + dy * dy + dz * dz;
        if (d < bestDistance) {
          bestDistance = d;
          best = j;
        }
      }
      if (best >= 0 && bestDistance < 14)
        segments.push(
          ...positions.slice(i * 3, i * 3 + 3),
          ...positions.slice(best * 3, best * 3 + 3),
        );
    }
    const lines = new THREE.BufferGeometry();
    lines.setAttribute("position", new THREE.Float32BufferAttribute(segments, 3));
    return { geometry, lines };
  }, []);
}

function Stars({ colors, day }: { colors: SceneColors; day: boolean }) {
  const { geometry, lines } = useStarGeometry();
  const dpr = useThree((state) => state.viewport.dpr);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: starfieldVertex,
        fragmentShader: starfieldFragment,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: 1 },
          uScale: { value: 1 },
          uColor: { value: new THREE.Color() },
          uOpacity: { value: 1 },
        },
      }),
    [],
  );
  const lineMaterial = useMemo(
    () => new THREE.LineBasicMaterial({ transparent: true, depthWrite: false }),
    [],
  );

  useEffect(() => {
    material.uniforms.uColor.value.setRGB(...colors.star, THREE.SRGBColorSpace);
    material.uniforms.uPixelRatio.value = dpr;
    material.uniforms.uScale.value = day ? 0.7 : 1;
    material.uniforms.uOpacity.value = day ? 0.55 : 1;
    lineMaterial.color.setRGB(colors.line[0], colors.line[1], colors.line[2], THREE.SRGBColorSpace);
    lineMaterial.opacity = day ? Math.max(colors.line[3], 0.2) : 0;
    lineMaterial.visible = day;
  }, [colors, day, dpr, material, lineMaterial]);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <group>
      <points geometry={geometry} material={material} />
      <lineSegments geometry={lines} material={lineMaterial} />
    </group>
  );
}

function Planet({ colors, day, compact }: { colors: SceneColors; day: boolean; compact: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: planetVertex,
        fragmentShader: planetFragment,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uColor: { value: new THREE.Color() },
          uLimb: { value: new THREE.Color() },
          uLight: { value: new THREE.Vector3(-1.2, 0.8, 0.9) },
          uDay: { value: 0 },
        },
      }),
    [],
  );

  useEffect(() => {
    material.uniforms.uColor.value.setRGB(...colors.planet, THREE.SRGBColorSpace);
    material.uniforms.uLimb.value.setRGB(...colors.limb, THREE.SRGBColorSpace);
    material.uniforms.uDay.value = day ? 1 : 0;
  }, [colors, day, material]);

  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.05;
  });

  return (
    <mesh
      ref={mesh}
      position={compact ? [2.75, 3.25, -1] : [3.5, -0.3, 0]}
      rotation={[0.35, 0, -0.2]}
      material={material}
    >
      <sphereGeometry args={[compact ? 1.7 : 1.95, 96, 64]} />
    </mesh>
  );
}

function OrbitRings({ colors, compact }: { colors: SceneColors; compact: boolean }) {
  const satellite = useRef<THREE.Mesh>(null);
  const rings = useMemo(() => {
    const make = (rx: number, ry: number) => {
      const curve = new THREE.EllipseCurve(0, 0, rx, ry, 0, Math.PI * 2);
      return new THREE.BufferGeometry().setFromPoints(
        curve.getPoints(160).map((p) => new THREE.Vector3(p.x, p.y, 0)),
      );
    };
    return [make(3.6, 1.05), make(4.6, 1.45)];
  }, []);
  const material = useMemo(
    () => new THREE.LineBasicMaterial({ transparent: true, depthWrite: false }),
    [],
  );
  const satelliteMaterial = useMemo(() => new THREE.MeshBasicMaterial(), []);

  useEffect(() => {
    material.color.setRGB(colors.line[0], colors.line[1], colors.line[2], THREE.SRGBColorSpace);
    material.opacity = Math.min(1, colors.line[3] * 1.6);
    satelliteMaterial.color.setRGB(...colors.planet, THREE.SRGBColorSpace);
  }, [colors, material, satelliteMaterial]);

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.12;
    satellite.current?.position.set(Math.cos(t) * 4.6, Math.sin(t) * 1.45, 0);
  });

  return (
    <group position={compact ? [2.75, 3.25, -1] : [3.5, -0.3, 0]} rotation={[0.2, 0.1, -0.32]}>
      {rings.map((geometry, i) => (
        <lineLoop key={i} geometry={geometry} material={material} />
      ))}
      <mesh ref={satellite} material={satelliteMaterial}>
        <sphereGeometry args={[0.055, 12, 12]} />
      </mesh>
    </group>
  );
}

/** Eases the camera toward the pointer for a light parallax (desktop only). */
function Parallax() {
  const target = useRef(new THREE.Vector2());
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      target.current.set(
        event.clientX / window.innerWidth - 0.5,
        event.clientY / window.innerHeight - 0.5,
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  useFrame(({ camera }) => {
    camera.position.x += (target.current.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (-target.current.y * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, -4);
  });
  return null;
}

export default function HeroScene({ colors, day, frameloop, compact }: SceneProps) {
  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 50, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <Stars colors={colors} day={day} />
      <OrbitRings colors={colors} compact={compact} />
      <Planet colors={colors} day={day} compact={compact} />
      {frameloop === "always" && !compact ? <Parallax /> : null}
    </Canvas>
  );
}
