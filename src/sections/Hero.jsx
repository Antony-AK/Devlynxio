"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import dynamic from "next/dynamic";

const ParticleField = dynamic(
  () => import("@/AnimationObjects/ParticleField"),
  { ssr: false }
);

const SLIDES = [
  {
    id: 0,
    title: "Empowering Brands. Accelerating Growth. Delivering Excellence.",
    highlight: ["Brands", "Growth"],
    subtitle:
      "Innovating the Digital Future with Devlynxio - from IT automation and app development to branding, cloud, and digital transformation.",
  },
  {
    id: 1,
    title: "Innovate with Confidence. Build Fast. Scale Smart.",
    highlight: ["Confidence", "Fast"],
    subtitle:
      "We specialize in custom software, mobile apps, enterprise platforms, and smart digital solutions built for global scale.",
  },
  {
    id: 2,
    title: "Your Vision, Our Technology - Let’s Build the Future.",
    highlight: ["Technology", "Future"],
    subtitle:
      "Helping startups and enterprises grow with powerful digital experiences crafted for performance and reliability.",
  },
];

export default function HeroCinematic( { freeze}) {
  const [current, setCurrent] = useState(0);
  const [pulse, setPulse] = useState(0);
  const imgRef = useRef();

  /* Auto-slide */
  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((p) => (p + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

 useEffect(() => {
  let mounted = true;
  const el = imgRef.current;
  if (!el) return;

  const setX = gsap.quickSetter(el, "x", "px");
  const setY = gsap.quickSetter(el, "y", "px");

  function onMove(e) {
    if (!mounted) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
    const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;

    gsap.to({}, {
      duration: 0.6,
      onUpdate: () => {
        setX(dx * 12);
        setY(dy * 10);
      },
    });
  }

  function onLeave() {
    if (!mounted) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
  }

  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerleave", onLeave);

  return () => {
    mounted = false;
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerleave", onLeave);
  };
}, []);


  useEffect(() => {
    const label = document.getElementById("hero-label");
    const subtitle = document.getElementById("hero-sub");
    const cta = document.getElementById("hero-cta");
    const letters = Array.from(
      document.querySelectorAll("#hero-title .split-letter")
    );

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    tl.call(() => setPulse((p) => p + 1), null, 0);

    tl.fromTo(
      label,
      { opacity: 0, y: -18 },
      { opacity: 1, y: 0, duration: 1.1 },
      0.08
    );

    tl.fromTo(
      letters,
      { opacity: 0, y: 36, rotateX: -50 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.02 },
      "-=0.7"
    );

    tl.fromTo(
      subtitle,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.1 },
      "-=0.6"
    );

    tl.fromTo(
      cta,
      { opacity: 0, scale: 0.85, y: 18 },
      { opacity: 1, scale: 1, y: 0, duration: 1.15, ease: "elastic.out(1,0.45)" },
      "-=0.7"
    );

    return () => tl.kill();
  }, [current]);

  const splitTitle = (text, highlights) =>
    text.split(" ").map((word, wi) => {
      const clean = word.replace(/[^a-zA-Z]/g, "");
      const hl = highlights.includes(clean);
      return (
        <span
          key={wi}
          className={`inline-block whitespace-nowrap mr-2 ${
            hl ? "text-primary" : ""
          }`}
        >
          {word.split("").map((ch, ci) => (
            <span key={ci} className="inline-block split-letter opacity-0">
              {ch}
            </span>
          ))}
        </span>
      );
    });

 return (
 <section id="home" className="relative min-h-screen bg-bg text-text overflow-hidden">

  <div className="absolute inset-0 z-10">
    <ParticleField trigger={current} pulse={pulse} freeze={freeze} />
  </div>

    {/* Parallax layer – NEVER unmounted */}
<div
  ref={imgRef}
  className="absolute inset-0 bg-center hidden bg-cover will-change-transform"
  style={{ backgroundImage: `url('/bg.png')` }}
></div>

{/* Fade effect layer – mounted/unmounted */}
<AnimatePresence mode="wait">
  <motion.div suppressHydrationWarning
    key={current}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
    className="absolute inset-0 bg-center hidden bg-cover pointer-events-none"
    style={{ backgroundImage: `url('bg.png')` }}
  />
</AnimatePresence>



  <div className="relative z-20 w-full h-full flex flex-col items-center text-center px-4 sm:px-6 justify-center lg:justify-start pt-40">

    <p
      id="hero-label"
      className="opacity-0 text-primary uppercase font-bold tracking-wide text-[10px] sm:text-xs md:text-sm"
    >
      Devlynxio Solutions
    </p>

    <h1
      id="hero-title"
      className="font-bold mt-4 leading-tight max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
    >
      {splitTitle(SLIDES[current].title, SLIDES[current].highlight)}
    </h1>

    <p
      id="hero-sub"
      className="opacity-0 text-text/80 mt-4 md:mt-5 max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl text-base sm:text-lg md:text-xl"
    >
      {SLIDES[current].subtitle}
    </p>

    <div id="hero-cta" className="opacity-0 mt-6 md:mt-8">
      <button className="bg-primary hover:bg-primary-dark transition px-6 py-2 sm:px-7 sm:py-3 rounded-xl text-sm sm:text-base md:text-lg font-semibold">
        Contact Us →
      </button>
    </div>

  </div>

  <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
    {SLIDES.map((_, i) => (
      <div
        key={i}
        className={`h-2 rounded-full transition-all duration-400 ${
          current === i ? "w-6 sm:w-8 bg-primary" : "w-2 sm:w-3 bg-primary/40"
        }`}
      />
    ))}
  </div>

</section>

);

}
