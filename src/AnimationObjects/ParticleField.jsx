"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

const COLORS = ["#ff1d1d", "#008f4f", "#0a3aff"];

// Mobile optimized cube size
const CUBE_SIZE =
  typeof window !== "undefined" && window.innerWidth < 768 ? 0.015 : 0.02;

function PixelCubeParticles({ trigger, pulse }) {
  // Reduce particle count ONLY on mobile
  const COUNT =
    typeof window !== "undefined" && window.innerWidth < 768 ? 700 : 1800;

  const mesh = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  // Generate random positions once
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 22;
    }
    return arr;
  }, []);

  // Material
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(COLORS[0]),
      emissive: new THREE.Color(COLORS[0]),
      emissiveIntensity: 1.3,
      roughness: 0.35,
      metalness: 0.25,
    });
  }, []);

  // Set instanced mesh matrices
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
  }, [positions, COUNT]);

  // Mouse movement — DISABLED ON MOBILE
  useEffect(() => {
    if (window.innerWidth < 768) return; // skip mobile

    const fn = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.4;
    };

    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  // Color change animation
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

  // Pulse scale animation
  useEffect(() => {
    if (!mesh.current) return;

    gsap.to(mesh.current.scale, {
      x: 1.35,
      y: 1.35,
      z: 1.35,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () =>
        gsap.to(mesh.current.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.35,
        }),
    });
  }, [pulse]);

  // Rotation — lighter on mobile
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const isMobile = window.innerWidth < 768;

    if (mesh.current) {
      mesh.current.rotation.y = t * (isMobile ? 0.03 : 0.06) + mouse.current.x * 0.4;
      mesh.current.rotation.x = t * (isMobile ? 0.02 : 0.04) + mouse.current.y * 0.4;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, COUNT]} material={material}>
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
    </instancedMesh>
  );
}

export default function ParticleField({ trigger, pulse }) {
  return (
    <div className="absolute inset-0 z-[3]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 70 }}
        frameloop="always"
        dpr={
          typeof window !== "undefined" && window.innerWidth < 768
            ? 0.8 // ⚡ mobile smoother
            : 1.5 // desktop full quality
        }
      >
        <ambientLight intensity={0.35} />
        <PixelCubeParticles trigger={trigger} pulse={pulse} />
      </Canvas>
    </div>
  );
}
