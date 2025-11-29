"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import image1 from "@/assets/no1.jpg";
import image2 from "@/assets/no2.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function ImpactSection() {
  const sectionRef = useRef(null);
  const numbersRef = useRef([]);

  useEffect(() => {
    const nums = numbersRef.current;
    if (!nums[0]) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => startCounters(),
    });

    function startCounters() {
      nums.forEach((el, i) => {
        const finalValue = parseInt(el.getAttribute("data-value"), 10);

        animateCount(el, finalValue);

        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: i * 0.2,
          }
        );
      });
    }

    function animateCount(el, final) {
      const duration = 1400;
      const startTime = performance.now();

      function update(time) {
        const progress = Math.min((time - startTime) / duration, 1);
        const value = Math.floor(progress * final);
        el.textContent = value;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          if (final === 10) el.textContent = `${value}+ years`;
          else el.textContent = `${value}+`;
        }
      }

      requestAnimationFrame(update);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black text-white px-6 md:px-16 py-20 flex justify-center"
    >
      <div className="w-full max-w-7xl">

        {/* ===== TOP SECTION ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT TITLE BLOCK */}
          <div>
            <p className="text-red-600 text-sm mb-2">Impact</p>

            <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
              Tecnowok Solution by the <br /> numbers
            </h2>
          </div>

          {/* RIGHT TEXT */}
          <div className="flex flex-col justify-between">
            <p className="text-gray-300 text-[16px] leading-relaxed max-w-lg">
              Tecnowok represents the connected world. Offering innovative and
              customer-centric information technology experience, enabling
              enterprises, associates and the society to rise.
            </p>

            <button className="mt-6 w-fit bg-red-600 px-6 py-2 text-sm rounded-sm hover:bg-red-700 transition">
              Request Quote !
            </button>
          </div>
        </div>

        {/* ===== 3-COL GRID ===== */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LEFT COLUMN — TALL BOX */}
          <div className="bg-red-600 h-[280px] md:h-[600px] p-8 flex flex-col justify-between  md:row-span-2">
            <h3
              ref={(el) => (numbersRef.current[0] = el)}
              data-value="120"
              className="text-4xl md:text-5xl font-bold opacity-0"
            >
              0+
            </h3>

            <div>
              <p className="font-semibold">Happy Clients</p>
              <p className="text-gray-200 text-sm mt-2 leading-relaxed">
                Successful digital transformations across <br /> industries
              </p>
            </div>
          </div>

          {/* ROW 1 — COL 2 IMAGE */}
          <div className="h-[280px] overflow-hidden rounded">
            <Image
              src={image1}
              alt="Impact Image 1"
              className="w-full h-full object-cover"
            />
          </div>

          {/* ROW 1 — COL 3 SMALL RED BOX */}
          <div className="bg-red-600 h-[280px] p-8 flex flex-col justify-between rounded">
            <h3
              ref={(el) => (numbersRef.current[1] = el)}
              data-value="10"
              className="text-4xl md:text-5xl font-bold opacity-0"
            >
              0+
            </h3>

            <div>
              <p className="font-semibold">Running Successfully</p>
              <p className="text-gray-200 text-sm mt-2 leading-relaxed">
                Reliable assistance for seamless business <br /> operations
              </p>
            </div>
          </div>

          {/* ROW 2 — COL 2 WHITE BOX */}
          <div className="bg-white text-black h-[280px] p-8 flex flex-col justify-between rounded">
            <h3
              ref={(el) => (numbersRef.current[2] = el)}
              data-value="100"
              className="text-4xl md:text-5xl font-bold text-red-600 opacity-0"
            >
              0+
            </h3>

            <div>
              <p className="font-semibold text-red-600">Global Presence</p>
              <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                Global technology solutions for diverse <br /> business needs
              </p>
            </div>
          </div>

          {/* ROW 2 — COL 3 IMAGE */}
          <div className="h-[280px] overflow-hidden rounded">
            <Image
              src={image2}
              alt="Impact Image 2"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
