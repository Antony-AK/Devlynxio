"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import dynamic from "next/dynamic";

// Lazy-load ParticleField (not delaying LCP)
const ParticleField = dynamic(() => import("@/AnimationObjects/ParticleField"), {
  ssr: false,
  loading: () => null,
});

// Slide data
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

export default function HeroCinematic({ freeze }) {
  const [current, setCurrent] = useState(0);
  const [pulse, setPulse] = useState(0);

  const imgRef = useRef(null);
  const hasMounted = useRef(false);

 
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
    }

    const id = setInterval(() => {
      setCurrent((p) => (p + 1) % SLIDES.length);
    }, 6000);

    return () => clearInterval(id);
  }, []);


  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    let rafId = null;

    const onMove = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
        const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;

        gsap.to(el, {
          x: dx * 12,
          y: dy * 10,
          duration: 0.5,
          ease: "power3.out",
        });
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);


  useEffect(() => {
    const label = document.getElementById("hero-label");
    const subtitle = document.getElementById("hero-sub");
    const cta = document.getElementById("hero-cta");
    const letters = document.querySelectorAll("#hero-title .split-letter");

    if (!label || !subtitle || !cta || !letters.length) return;

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    tl.call(() => setPulse((p) => p + 1), null, 0);

    tl.fromTo(
      label,
      { opacity: 0, y: -18 },
      { opacity: 1, y: 0, duration: 1 }
    );

    tl.fromTo(
      letters,
      { opacity: 0, y: 36, rotateX: -50 },
      { opacity: 1, y: 0, rotateX: 0, stagger: 0.02, duration: 1.1 },
      "-=0.7"
    );

    tl.fromTo(
      subtitle,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.6"
    );

    tl.fromTo(
      cta,
      { opacity: 0, scale: 0.85, y: 18 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "elastic.out(1,0.45)",
      },
      "-=0.7"
    );

    return () => tl.kill();
  }, [current]);


  const splitTitle = useCallback((text, highlights) => {
    return text.split(" ").map((word, wi) => {
      const clean = word.replace(/[^a-zA-Z]/g, "");
      const highlight = highlights.includes(clean);

      return (
        <span
          key={wi}
          className={`inline-block mr-2 whitespace-nowrap ${
            highlight ? "text-primary" : ""
          }`}
        >
          {word.split("").map((ch, ci) => (
            <span key={ci} className="split-letter inline-block opacity-0">
              {ch}
            </span>
          ))}
        </span>
      );
    });
  }, []);

  return (
    <section id="home" className="relative min-h-screen bg-bg text-text overflow-hidden">

      {/* PARTICLES */}
      <div className="absolute inset-0 z-10">
        <ParticleField trigger={current} pulse={pulse} freeze={freeze} />
      </div>

      {/* PARALLAX STATIC BG (for performance) */}
      <div
        ref={imgRef}
        className="absolute inset-0 bg-cover opacity-0 bg-center hidden md:block will-change-transform"
        style={{ backgroundImage: "url('/bg.png')" }}
      />

     

      {/* CONTENT */}
      <div className="relative z-20 w-full h-full flex flex-col items-center text-center px-4 sm:px-6 justify-center lg:justify-start pt-60 md:pt-36">

        <p
          id="hero-label"
          className="text-primary opacity-0 uppercase font-bold tracking-wide text-[10px] sm:text-xs md:text-sm"
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
          <button
            onClick={() => (window.location.href = "#contact")}
            className="bg-primary hover:bg-primary-dark transition px-6 py-2 sm:px-7 sm:py-3 rounded-xl text-sm sm:text-base md:text-lg font-semibold"
          >
            Contact Us →
          </button>
        </div>

      </div>

      {/* SLIDE INDICATORS */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all ${
              current === i ? "w-6 sm:w-8 bg-primary" : "w-2 sm:w-3 bg-primary/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
