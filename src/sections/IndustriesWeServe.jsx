"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slideContent = [ { title: "Retail & E-commerce", text: "We build high-performance e-commerce platforms, online stores, POS systems, and inventory management solutions that enhance customer experience and boost online sales. Our digital solutions help retail brands scale effortlessly with secure payments, real-time analytics, and seamless automation.", }, { title: "News & Media", text: "We deliver fast, secure, and scalable news portals, content management systems, streaming platforms, and digital publishing solutions designed for high traffic environments. Our technology helps media companies distribute content efficiently and engage audiences across all devices.", }, { title: "Social Networking", text: "We develop modern social platforms, community apps, messaging systems, and engagement tools that promote user interaction and scale to millions. Our solutions focus on performance, security, user privacy, and real-time communication features.", }, { title: "Banking & Finance", text: "We create secure, compliant, and intelligent fintech applications, digital banking platforms, payment gateways, and financial management systems. With strong encryption and automation, we help financial institutions deliver seamless and trusted digital services.", }, { title: "Healthcare", text: "We build robust healthcare management systems, appointment platforms, telemedicine apps, EHR systems, and patient engagement tools tailored to medical standards. Our solutions improve operational efficiency and enhance patient care with secure data handling.", }, { title: "Logistics & GPS-Based Solutions", text: "We offer advanced logistics management systems, GPS tracking apps, fleet management platforms, delivery route optimization, and real-time monitoring solutions. Our technology helps logistics companies improve accuracy, reduce costs, and increase operational efficiency.", }, ];

export default function IndustriesWeServe() {
  const slidesRef = useRef([]);
  const containerRef = useRef(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;


  useEffect(() => {
    if (isMobile) return;

    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [isMobile]);

  useEffect(() => {
    if (!containerRef.current || isMobile) return;

    const slides = slidesRef.current;

    gsap.to(slides, {
      xPercent: -100 * (slides.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        end: () => "+=" + containerRef.current.offsetWidth * 1.2,
      },
    });

    return () => ScrollTrigger.killAll();
  }, [isMobile]);

 

  return (
    <section
      id="horizontal-scroll-section"
      ref={containerRef}
      className={`
        flex flex-nowrap items-center
        ${isMobile ? "overflow-x-auto scrollbar-hide gap-6 px-4 py-4" : "md:min-h-screen md:px-20 md:gap-20"}
      `}
    >
      {slideContent.map((item, i) => (
        <div
          key={i}
          ref={(el) => (slidesRef.current[i] = el)}
          className="
            shrink-0 bg-transparent rounded-xl p-5
            flex flex-col md:flex-row justify-center items-center
            w-[360px] h-[460px]
            md:w-[850px] md:h-[350px]
            md:gap-14
          "
        >
          {/* TEXT */}
          <div className="mb-6 text-center md:text-left">
            <h2 className="text-xl md:text-4xl font-bold text-red-600">
              {item.title}
            </h2>
            <p className="text-gray-300 mt-3 text-sm md:text-base max-w-lg">
              {item.text}
            </p>
          </div>

          {/* IMAGE — Use priority only for first slide */}
          <div className="md:w-[70%] h-full">
            <Image
              src={`/img${i + 1}.jpg`}
              width={800}
              height={600}
              alt={item.title}
              loading={i === 0 ? "eager" : "lazy"}        // 🔥 improves LCP
              className="
                object-cover rounded-xl
                md:w-full md:h-full
                w-[300px] h-[200px]
                shadow-[0_0_25px_5px_rgba(255,0,0,0.6)]
              "
            />
          </div>
        </div>
      ))}
    </section>
  );
}
