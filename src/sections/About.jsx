"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const boardRef = useRef(null);
  const codeRef = useRef(null);
  const textElements = useRef([]);

  useEffect(() => {
  const ctx = gsap.context(() => {

    gsap.from(textElements.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });

    gsap.from(boardRef.current, {
      opacity: 0,
      scale: 0.92,
      y: 40,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });

    gsap.to(codeRef.current, {
      y: "-100%",
      duration: 10,
      ease: "none",
      repeat: -1,
    });

  }, sectionRef);  // bind animations to this component

  return () => ctx.revert();
}, []);

  return (
    <section id="about"
      ref={sectionRef}
      className="w-full min-h-screen bg-black text-white py-28 px-6 md:px-20"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT TEXT */}
        <div className="space-y-6">
          <p
            ref={(el) => textElements.current[0] = el}
            className="text-base sm:text-lg font-medium"
          >
            About Us
          </p>

          <h1
            ref={(el) => textElements.current[1] = el}
            className="text-xl sm:text-2xl  font-semibold text-red-600"
          >
            Tecnowok Solution
          </h1>

          <p
            ref={(el) => textElements.current[2] = el}
            className="text-3xl sm:text-4xl md:text-5xl -mt-3 font-bold  text-white"
          >
            Turning Ideas into <span className="text-red-700">Digital</span> Success
          </p>

          <p
            ref={(el) => textElements.current[3] = el}
            className="text-gray-300 text-base sm:text-lg"
          >
            We build high-performance digital products - apps, websites,
            enterprise platforms, automations and branding that scale globally.
          </p>

          <p
            ref={(el) => textElements.current[4] = el}
            className="text-gray-300 text-base sm:text-lg "
          >
            With 120+ clients across the world, we deliver clean, modern and
            future-ready technology solutions.
          </p>
        </div>

        {/* RIGHT — ANIMATED CODE MATRIX BOARD */}
        <div
          ref={boardRef}
          className="relative w-full h-[380px] md:h-[480px] bg-[#0b0b0d] 
          border border-red-600/10 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(255,0,0,0.55)]"
        >

          {/* subtle neon glow */}
          <div className="absolute inset-0 pointer-events-none 
            bg-gradient-to-br from-red-600/25 via-black/10 to-black/0">
          </div>

          {/* floating code */}
          <pre
            ref={codeRef}
            className="absolute top-0 left-0 w-full text-red-400 text-[14px] opacity-90 leading-relaxed 
            font-mono whitespace-pre-wrap px-6 select-none"
          >
            {`function buildFuture() {
  return {
    innovation: true,
    scalability: true,
    performance: "optimized",
    ui: "modern",
    backend: "secure",
  };
}

const api = {
  status: "connected",
  latency: "12ms",
  requests: 240,
};

class Tecnowok {
  constructor() {
    this.clients = 150;
    this.projects = "global";
  }

  deliver() {
    return "high-performance solutions";
  }
}

const devFlow = () => {
  let sprint = 1;
  while (sprint < 10) sprint++;
  return sprint;
};

function AIEngine(data) {
  return data.map(d => d * 2);
}

let auth = {
  jwt: true,
  encryption: "AES-256",
  uptime: "99.9%"
};`}
          </pre>

          <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
