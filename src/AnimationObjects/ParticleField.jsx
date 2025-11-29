"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

const COLORS = ["#ff1d1d", "#008f4f", "#0a3aff"];
const CUBE_SIZE = 0.02;

function PixelCubeParticles({ trigger, pulse }) {
  const COUNT = 1800;
  const mesh = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 22;
    }
    return arr;
  }, []);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(COLORS[0]),
      emissive: new THREE.Color(COLORS[0]),
      emissiveIntensity: 1.3,
      roughness: 0.35,
      metalness: 0.25,
    });
  }, []);

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

  useEffect(() => {
    const fn = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.4;
    };

    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

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

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.06 + mouse.current.x * 0.4;
      mesh.current.rotation.x = t * 0.04 + mouse.current.y * 0.4;
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
      <Canvas camera={{ position: [0, 0, 10], fov: 70 }} frameloop="always">
        <ambientLight intensity={0.35} />
        <PixelCubeParticles trigger={trigger} pulse={pulse} />
      </Canvas>
    </div>
  );
}
