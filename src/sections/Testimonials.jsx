"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

import img1 from "@/assets/review1.jpg";
import img2 from "@/assets/review2.jpg";
import img3 from "@/assets/review3.jpg";
import img4 from "@/assets/review4.jpg";
import img5 from "@/assets/review5.jpg";
import img6 from "@/assets/review6.jpg";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      text: "The digital excellence delivered has transformed our entire business. We've seen a 300% increase in engagement within the first quarter.",
      name: "Antony",
      position: "Co Founder, TechVision Co.",
      img: img1,
    },
    {
      id: 2,
      text: "Outstanding results and exceptional service. The team went above and beyond to deliver exactly what we needed.",
      name: "Sarah",
      position: "Founder, Digital Ventures",
      img: img2,
    },
    {
      id: 3,
      text: "A transformative partnership that exceeded all expectations. Highly recommended for any business seeking excellence.",
      name: "James",
      position: "Director, Innovation Labs",
      img: img3,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const cardsRef = useRef([]);
  const tl = useRef(null);

  /* Detect Mobile */
  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  /* Auto Slide — optimized (stops when tab inactive) */
  useEffect(() => {
    let interval;

    const start = () => {
      interval = setInterval(() => {
        if (document.visibilityState === "visible") {
          setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }
      }, 3000);
    };

    start();
    return () => clearInterval(interval);
  }, []);

  /* GSAP Animation — optimized, no forced layout */
  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    if (tl.current) tl.current.kill();

    const timeline = gsap.timeline();
    tl.current = timeline;

    cards.forEach((card, index) => {
      const pos = (index - currentIndex + testimonials.length) % testimonials.length;

      const config = {
        0: {
          opacity: 1,
          scale: 1,
          x: 0,
          zIndex: 30,
        },
        1: {
          opacity: isMobile ? 0.5 : 0.6,
          scale: isMobile ? 0.88 : 0.8,
          x: isMobile ? 25 : 85,
          zIndex: 20,
        },
        2: {
          opacity: isMobile ? 0.3 : 0.4,
          scale: isMobile ? 0.78 : 0.62,
          x: isMobile ? 45 : 150,
          zIndex: 10,
        },
      }[pos];

      timeline.to(
        card,
        {
          ...config,
          duration: 0.6,
          ease: "power3.out",
        },
        0
      );
    });
  }, [currentIndex, isMobile]);

  return (
    <section className="w-full flex justify-center items-center py-16 md:py-24 bg-black text-white px-4 md:px-6 overflow-hidden">
      <div className="w-full max-w-7xl border border-red-600 rounded-3xl p-6 md:p-10 shadow-lg shadow-red-600/40">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-4">
            <p className="text-red-600">Testimonials</p>

            <h2 className="text-2xl md:text-4xl font-bold leading-tight">
              What Our Clients Say
            </h2>

            <p className="text-gray-400 text-base md:text-xl leading-relaxed max-w-lg">
              Trusted by brands worldwide to deliver digital excellence.
            </p>
          </div>

          {/* RIGHT STACKED CARDS */}
          <div className="relative w-[290px] sm:w-[320px] md:w-[500px] h-72 sm:h-80 md:h-72">

            {testimonials.map((t, i) => (
              <div
                key={t.id}
                ref={(el) => (cardsRef.current[i] = el)}
                className="absolute inset-0 flex items-center justify-center will-change-transform"
              >
                <div className="
                  bg-gradient-to-br from-red-600 to-red-700
                  border border-red-500 rounded-2xl p-6 md:p-8
                  h-full w-full shadow-lg shadow-red-600/60 
                  relative overflow-hidden
                ">

                  {/* Light Overlay (GPU Friendly) */}
                  <div className="absolute inset-0 bg-red-500/10 pointer-events-none" />

                  {/* Quote */}
                  <p className="text-white text-sm md:text-lg leading-relaxed pr-6">
                    "{t.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/40">
                    <div className="w-14 h-14 rounded-full overflow-hidden border border-white">
                      <Image
                        src={t.img}
                        alt={t.name}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                        priority={i === currentIndex}   // Prevent LCP delay
                      />
                    </div>

                    <div>
                      <p className="font-bold text-lg">{t.name}</p>
                      <p className="text-black/80 text-xs md:text-sm">{t.position}</p>
                    </div>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}
