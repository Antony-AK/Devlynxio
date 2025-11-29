"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

const COLORS = ["#ff1d1d", "#008f4f", "#0a3aff"];

// Slightly reduce cube size on mobile, but still visible
const CUBE_SIZE =
  typeof window !== "undefined" && window.innerWidth < 768 ? 0.018 : 0.02;

function PixelCubeParticles({ trigger, pulse }) {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  // 🔥 Increase from 700 → 1000 (still super safe)
  const COUNT = isMobile ? 1000 : 1800;

  const mesh = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  // Smaller particle spread on mobile (WAY more visible)
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * (isMobile ? 12 : 22); // shrink X range
      arr[i * 3 + 1] = (Math.random() - 0.5) * (isMobile ? 8 : 14); // shrink Y range
      arr[i * 3 + 2] = (Math.random() - 0.5) * (isMobile ? 10 : 22); // shrink Z range
    }

    return arr;
  }, []);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(COLORS[0]),
      emissive: new THREE.Color(COLORS[0]),
      emissiveIntensity: 1.2,
      roughness: 0.35,
      metalness: 0.25,
    });
  }, []);

  // Place cubes in scene
  useEffect(() => {
    if (!mesh.current) return;

    const mat = new THREE.Matrix4();

    for (let i = 0; i < COUNT; i++) {
      mat.setPosition(
        positions[i * 3],
        positions[i * 3 + 1],
        positions[i * 3 + 2]
      );
      mesh.current.setMatrixAt(i, mat);
    }

    mesh.current.instanceMatrix.needsUpdate = true;
  }, [positions]);

  // Mouse movement (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const fn = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.4;
    };

    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  // Color change
  useEffect(() => {
    const target = new THREE.Color(COLORS[trigger]);
    gsap.to(material.color, { ...target, duration: 1 });

    gsap.to(material.emissive, {
      r: target.r * 0.8,
      g: target.g * 0.8,
      b: target.b * 0.8,
      duration: 1,
    });
  }, [trigger]);

  // Pulse scaling
  useEffect(() => {
    if (!mesh.current) return;

    gsap.to(mesh.current.scale, {
      x: 1.25,
      y: 1.25,
      z: 1.25,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () =>
        gsap.to(mesh.current.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
        }),
    });
  }, [pulse]);

  // Rotation — reduced for mobile
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (mesh.current) {
      mesh.current.rotation.y =
        t * (isMobile ? 0.02 : 0.06) + mouse.current.x * (isMobile ? 0 : 0.3);

      mesh.current.rotation.x =
        t * (isMobile ? 0.015 : 0.04) + mouse.current.y * (isMobile ? 0 : 0.3);
    }
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, COUNT]} material={material}>
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
    </instancedMesh>
  );
}

export default function ParticleField({ trigger, pulse }) {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="absolute inset-0 z-[3]">
      <Canvas
        camera={{
          position: [0, 0, isMobile ? 8.5 : 10], // bring closer on mobile
          fov: isMobile ? 75 : 70,
        }}
        frameloop="always"
        dpr={isMobile ? 0.9 : 1.5}
      >
        <ambientLight intensity={0.35} />
        <PixelCubeParticles trigger={trigger} pulse={pulse} />
      </Canvas>
    </div>
  );
}
