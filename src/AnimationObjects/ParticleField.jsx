"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

const COLORS = ["#ff1d1d", "#008f4f", "#0a3aff"];

function PixelCubeParticles({ trigger, pulse }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const COUNT = isMobile ? 1200 : 1800; 
  const CUBE_SIZE = isMobile ? 0.02 : 0.02;

  const mesh = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  /** PARTICLE POSITIONS */
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    const spreadX = isMobile ? 14 : 22;
    const spreadY = isMobile ? 10 : 14;
    const spreadZ = isMobile ? 12 : 22;

    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spreadX;
      arr[i * 3 + 1] = (Math.random() - 0.5) * spreadY;
      arr[i * 3 + 2] = (Math.random() - 0.5) * spreadZ;
    }
    return arr;
  }, []);

  /** MATERIAL */
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(COLORS[0]),
        emissive: new THREE.Color(COLORS[0]),
        emissiveIntensity: 1.2,
        roughness: 0.35,
        metalness: 0.25,
      }),
    []
  );

  /** PLACE MATRICES */
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

  /** MOUSE MOVE — DISABLED on MOBILE */
  useEffect(() => {
    if (isMobile) return;

    let rafId = null;

    const onMove = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.3;
        mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.3;
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /** COLOR CHANGE OPTIMIZED */
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

  /** PULSE EFFECT */
  useEffect(() => {
    if (!mesh.current) return;

    gsap.to(mesh.current.scale, {
      x: 1.1,
      y: 1.1,
      z: 1.1,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () =>
        gsap.to(mesh.current.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.25,
        }),
    });
  }, [pulse]);

  /** ROTATION — MOBILE FRIENDLY */
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!mesh.current) return;

    mesh.current.rotation.y =
      t * (isMobile ? 0.02 : 0.05) + (isMobile ? 0 : mouse.current.x * 0.2);

    mesh.current.rotation.x =
      t * (isMobile ? 0.015 : 0.04) + (isMobile ? 0 : mouse.current.y * 0.2);
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, COUNT]} material={material}>
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
    </instancedMesh>
  );
}

export default function ParticleField({ trigger, pulse }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="absolute inset-0 z-[3]">
      <Canvas
        dpr={isMobile ? 1.0 : 1.5}
        camera={{
          position: [0, 0, isMobile ? 8 : 10],
          fov: isMobile ? 78 : 70,
        }}
      >
        <ambientLight intensity={0.33} />
        <PixelCubeParticles trigger={trigger} pulse={pulse} />
      </Canvas>
    </div>
  );
}
