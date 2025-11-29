"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function Navbar() {
  const MENU = ["Home", "About", "Services", "FAQ", "Contact"];

  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);

  /* ----------------------------------------------------------
      1️⃣ Body scroll lock (non-blocking, no layout shift)
  ---------------------------------------------------------- */
  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", open);
  }, [open]);

  /* ----------------------------------------------------------
      2️⃣ Optimized Lenis (only once)
  ---------------------------------------------------------- */
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.06,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  /* ----------------------------------------------------------
      3️⃣ Super-optimized scrollTo (zero layout shift)
  ---------------------------------------------------------- */
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const horizontal = document.getElementById("horizontal-scroll-section");

    if (horizontal && el.offsetTop > horizontal.offsetTop + horizontal.offsetHeight) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: el, offsetY: 80 },
        ease: "power3.out",
      });
      return;
    }

    window.lenis?.scrollTo(el, {
      offset: -80,
      duration: 1.1,
      easing: (t) => t * (2 - t),
    });
  };

  return (
    <>
      <header
        role="navigation"
        aria-label="Main Navigation"
        className="
          w-full fixed top-0 z-[999]
          bg-bg/80 backdrop-blur-lg
          border-b border-white/10 py-4 transition-all
        "
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">

          {/* Logo */}
          <div className="flex items-center w-36 h-10">
            <Image
              src="/logo1.png"
              alt="Devlynxio Logo"
              priority
              width={600}
              height={80}
              className=" object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex">
            <ul className="flex gap-10">
              {MENU.map((item) => (
                <li key={item} className="group relative">
                  <button
                    aria-label={`Go to ${item}`}
                    onClick={() => {
                      setActive(item);
                      scrollToSection(item.toLowerCase());
                    }}
                    className={`text-[16px] font-medium transition-all
                      ${active === item ? "text-primary" : "text-text hover:text-primary"}
                    `}
                  >
                    {item}
                  </button>

                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-primary transition-all duration-300
                      ${active === item ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                  />
                </li>
              ))}
            </ul>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="px-4 py-2 text-text hover:text-primary transition">Login</button>
            <button className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark transition font-medium">
              Signup
            </button>
          </div>

          {/* Mobile Icon */}
          <button
            aria-label="Toggle Menu"
            className="md:hidden text-3xl text-text me-2"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-menu"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="
              md:hidden fixed top-[72px] left-0 w-full z-[998]
              bg-black/95 backdrop-blur-xl border-b border-white/10
            "
          >
            <motion.ul
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.08 } },
              }}
              className="flex flex-col gap-6 px-6 py-8"
            >
              {MENU.map((item) => (
                <motion.li
                  key={item}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <button
                    aria-label={`Go to ${item}`}
                    onClick={() => {
                      scrollToSection(item.toLowerCase());
                      setActive(item);
                      setOpen(false);
                    }}
                    className={`block text-xl font-medium 
                      ${active === item ? "text-primary" : "text-white/70 hover:text-primary"}
                    `}
                  >
                    {item}
                  </button>
                </motion.li>
              ))}

              {/* Auth */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 },
                }}
                className="flex flex-col gap-4 mt-4"
              >
                <button className="px-4 py-3 text-white bg-white/10 rounded-md hover:bg-white/20 transition">
                  Login
                </button>
                <button className="px-4 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition">
                  Signup
                </button>
              </motion.div>
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
