"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

import service1 from "@/assets/service1.png";
import service6 from "@/assets/service2.png";
import service3 from "@/assets/service3.png";
import service4 from "@/assets/service4.png";
import service5 from "@/assets/service5.webp";
import service2 from "@/assets/service6.webp";

const SERVICES = [
  {
    id: 0,
    title: "01",
    heading: "IT & Automation",
    desc: "Develop high-performance web & mobile apps, integrate AI solutions, and optimize cloud infrastructure for scalability and efficiency.",
    img: service1,
    tag: "IT & Automation",
  },
  {
    id: 1,
    title: "02",
    heading: "Enterprise & E-commerce Solutions",
    desc: "Streamline operations with ERP, LMS, POS, and store management systems designed to improve productivity, automation, and sales performance.",
    img: service2,
    tag: "Enterprise & E-commerce",
  },
  {
    id: 2,
    title: "03",
    heading: "Digital Marketing",
    desc: "Boost traffic, conversions, and brand visibility with SEO, SEM, social media marketing, paid campaigns, and influencer collaborations.",
    img: service3,
    tag: "Digital Marketing",
  },
  {
    id: 3,
    title: "04",
    heading: "Creative Branding & Content",
    desc: "Strengthen your brand with graphic design, video editing, motion graphics, and content strategies that increase engagement and identity.",
    img: service4,
    tag: "Branding & Content",
  },
  {
    id: 4,
    title: "05",
    heading: "IT Outsourcing",
    desc: "Reduce operational costs and increase efficiency by outsourcing software development, IT operations, and maintenance to our expert team.",
    img: service5,
    tag: "IT Outsourcing",
  },
  {
    id: 5,
    title: "06",
    heading: "IT Support",
    desc: "Ensure smooth business operations with troubleshooting, system maintenance, security updates, and 24/7 technical support.",
    img: service6,
    tag: "IT Support",
  },
];


export default function OurServices() {
  const [active, setActive] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const indicatorRef = useRef(null);
  const buttonsRef = useRef([]);

  // Moving blob animation
  useEffect(() => {
    const btn = buttonsRef.current[active];
    if (!btn) return;

    const center = btn.offsetLeft + btn.offsetWidth / 2;
    const blobWidth = 260;

    gsap.to(indicatorRef.current, {
      x: center - blobWidth / 2,
      duration: 0.6,
      ease: "power3.out",
    });
  }, [active]);

  // Auto slide
  useEffect(() => {
    const slider = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % SERVICES.length);
        setIsFading(false);
      }, 350);
    }, 3500);

    return () => clearInterval(slider);
  }, []);

  return (
    <section id="services"
 className="w-full bg-black py-14 px-4 md:px-6 flex justify-center">
      <div className="w-full  max-w-7xl ">

        {/* TOP CARD */}
        <div
          className="text-white px-6 md:px-10 py-14 rounded-[40px] relative "
          style={{
            background: `
              radial-gradient(#c81818 0.10px, transparent 0.8px) 0 0 / 9px 9px,
              #000
            `,
            boxShadow: `
              0 0 40px rgba(219,0,7,0.65),
              0 0 85px rgba(219,0,7,0.45),
              inset 0 0 35px rgba(219,0,7,0.35)
            `,
          }}
        >
          <p className="text-center text-red-600 font-semibold tracking-wide">
            OUR SERVICES
          </p>

          <h2 className="text-center text-2xl md:text-4xl font-semibold mt-4">
            Providing a Full Range of Services
          </h2>

          {/* CONTENT + IMAGE */}
          <div className="mt-5 flex flex-col md:flex-row justify-around items-center mx-auto gap-8">

            {/* LEFT TEXT */}
            <div
              className={`max-w-lg transition-all duration-500 text-center md:text-left
              ${isFading ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"}`}
            >
              <h3 className="text-5xl text-red-600 font-extrabold">
                {SERVICES[active].title}
              </h3>

              <h4 className="text-2xl mt-4 font-semibold text-white">
                {SERVICES[active].heading}
              </h4>

              <p className="mt-4 text-white/90 leading-relaxed text-base md:text-lg">
                {SERVICES[active].desc}
              </p>

              <button className="mt-8 px-6 py-2 rounded-xl bg-primary text-white font-semibold hover:bg-red-700 transition">
                Learn More →
              </button>
            </div>

            {/* RIGHT IMAGE */}
            <div
              className={`w-full md:w-[35%] transition-all duration-500
              ${isFading ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
            >
              <div className="w-full h-56 md:h-72  rounded-2xl flex justify-end items-end p-4 ">
                <Image
                  src={SERVICES[active].img}
                  alt="service"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

          </div>
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="relative bg-black mt-8  pb-4 flex justify-center">

          {/* MOVING BLOB */}
          <div
            ref={indicatorRef}
            className="absolute -top-10 left-1 hidden md:block"
            style={{
              width: "250px",
              height: "110px",
              pointerEvents: "none",
              overflow: "hidden",
              borderRadius: "40px",
              
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 260 180"
              preserveAspectRatio="none"

            >
              <path
                d="
      M20 0
      L240 0
      L240 120
      Q240 180 130 180
      Q20 180 20 120
      Z
    "
                fill="rgba(0,0,0,0.85)"
              />

              {/* SIDE + BOTTOM STROKE ONLY */}
              <path
                d="
      M240 0 
      L240 120
      Q240 180 130 180
      Q20 180 20 120
      L20 0
    "
                stroke="rgba(219,0,7,0.7)"
                strokeWidth="3"
                fill="none"
              />
            </svg>

          </div>


          {/* BUTTONS */}
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-6 md:gap-24 z-10 px-4">
            {SERVICES.map((s, index) => (
              <button
                key={index}
                ref={(el) => (buttonsRef.current[index] = el)}
                onClick={() => {
                  setIsFading(true);
                  setTimeout(() => {
                    setActive(index);
                    setIsFading(false);
                  }, 350);
                }}
                className={`text-sm md:text-sm font-semibold md:max-w-28 md:text-center transition cursor-pointer
                  ${active === index
                    ? "text-primary border-b md:border-none pt-2 scale-110 font-bold "
                    : "text-white/70 hover:text-white "
                  }`}
              >
                {s.tag}
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
