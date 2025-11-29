"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slideContent = [
  {
    title: "Retail & E-commerce",
    text: "We build high-performance e-commerce platforms, online stores, POS systems, and inventory management solutions that enhance customer experience and boost online sales. Our digital solutions help retail brands scale effortlessly with secure payments, real-time analytics, and seamless automation.",
  },
  {
    title: "News & Media",
    text: "We deliver fast, secure, and scalable news portals, content management systems, streaming platforms, and digital publishing solutions designed for high traffic environments. Our technology helps media companies distribute content efficiently and engage audiences across all devices.",
  },
  {
    title: "Social Networking",
    text: "We develop modern social platforms, community apps, messaging systems, and engagement tools that promote user interaction and scale to millions. Our solutions focus on performance, security, user privacy, and real-time communication features.",
  },
  {
    title: "Banking & Finance",
    text: "We create secure, compliant, and intelligent fintech applications, digital banking platforms, payment gateways, and financial management systems. With strong encryption and automation, we help financial institutions deliver seamless and trusted digital services.",
  },
  {
    title: "Healthcare",
    text: "We build robust healthcare management systems, appointment platforms, telemedicine apps, EHR systems, and patient engagement tools tailored to medical standards. Our solutions improve operational efficiency and enhance patient care with secure data handling.",
  },
  {
    title: "Logistics & GPS-Based Solutions",
    text: "We offer advanced logistics management systems, GPS tracking apps, fleet management platforms, delivery route optimization, and real-time monitoring solutions. Our technology helps logistics companies improve accuracy, reduce costs, and increase operational efficiency.",
  },
];

export default function IndustriesWeServe() {
  const slidesRef = useRef([]);
  const containerRef = useRef(null);
  const [slideWidth, setSlideWidth] = React.useState(350);

useEffect(() => {
  if (slidesRef.current[0]) {
    const realWidth = slidesRef.current[0].offsetWidth;
    setSlideWidth(realWidth + 20); // 20px = gap/margin between slides
  }
}, []);


  // Smooth scrolling (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Horizontal scroll animation
 // Horizontal scroll animation
useEffect(() => {
  if (!containerRef.current) return;

  // Disable GSAP horizontal scroll for mobile
  if (window.innerWidth < 768) return;

  const slides = slidesRef.current;

  gsap.to(slides, {
    xPercent: -100 * (slides.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: containerRef.current,
      scrub: 1,
      pin: true,
      end: "+=" + containerRef.current.offsetWidth,
      snap: 1 / (slides.length - 1),
    },
  });

  return () => ScrollTrigger.getAll().forEach((st) => st.kill());
}, []);

const totalWidth = typeof window !== "undefined"
  ? window.innerWidth < 768
    ? `${slideWidth * slideContent.length}px`
  : `calc(150vw * ${slideContent.length})`
  : "100%";


  return (
   <section 
  id="horizontal-scroll-section"
  ref={containerRef}
  className="
    md:min-h-screen
    flex flex-nowrap items-center 
    md:space-x-20 md:px-20
    overflow-x-scroll scrollbar-hide md:overflow-x-hidden   /* 🔥 mobile scroll */
    snap-x snap-mandatory md:snap-none       /* 🔥 smooth swipe scroll */
  "
  // style={{ width: totalWidth }}
>

      {slideContent.map((item, i) => (
        <div
          key={i}
          ref={(el) => (slidesRef.current[i] = el)}
          className="w-[350px] md:w-[850px] h-[500px] md:h-[350px] shrink-0 flex bg-transparent flex-col md:flex-row md:gap-14 justify-center items-center  overflow-hidden rounded-xl p-5"
        >
          {/* TEXT */}
          <div className="mb-6">
            <h2 className="text-xl md:text-4xl text-center md:text-left font-bold text-red-600">{item.title}</h2>
            <p className="text-gray-300 mt-3 text-center md:text-left text-sm md:text-base max-w-lg">{item.text}</p>
          </div>

          {/* IMAGE */}
          <div className="md:w-[70%] h-full">
            <Image
              src={`/img${i + 1}.jpg`}
              width={800}
              height={600}
              alt={item.title}
              className="md:w-full md:h-full w-[300px] h-[200px] object-cover rounded-xl shadow-[0_0_25px_5px_rgba(255,0,0,0.6)] transition-all duration-300"
            />
          </div>
        </div>
      ))}
    </section>
  );
}
