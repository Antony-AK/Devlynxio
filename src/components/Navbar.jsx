"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);


export default function Navbar() {
  const MENU = ["Home", "About", "Services", "FAQ", "Contact"];

  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  useEffect(() => {
  const lenis = new Lenis({
    smooth: true,
    lerp: 0.1,
  });

  window.lenis = lenis; // ⭐ MUST HAVE

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return () => lenis.destroy();
}, []);




 const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;

  const horizontalSection = document.getElementById("horizontal-scroll-section");
  const horizontalEnd = horizontalSection?.offsetTop + horizontalSection?.offsetHeight;

  // If target is below horizontal section → skip horizontal animation
  if (horizontalSection && el.offsetTop > horizontalEnd) {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: {
        y: el,
        offsetY: 80,
      },
      ease: "power3.out",
    });
    return;
  }

  // Normal Lenis scroll for sections above horizontal slider
  window.lenis?.scrollTo(el, {
    offset: -80,
    duration: 1.2,
    easing: (t) => t * (2 - t),
  });
};



  return (
    <>
      <header className="w-full fixed top-0 z-[999] bg-bg/80 backdrop-blur-lg border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">

          {/* Logo */}
          <div className="flex items-center gap-2 w-36 h-10">
            <img src="/logo1.png" alt="Devlynxio Logo" className="w-full h-full object-cover" />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex">
            <ul className="flex gap-10">
              {MENU.map((item, i) => (
                <li key={i} className="group relative">
                  <a
                    onClick={() => {
                      setActive(item);
                      scrollToSection(item.toLowerCase());
                    }}
                    href={`#${item.toLowerCase()}`}
                    className={`text-text text-[16px] font-medium transition-all duration-300 cursor-pointer 
                      ${active === item ? "text-primary" : "hover:text-primary"}`}
                  >
                    {item}
                  </a>

                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-primary transition-all duration-300
                    ${active === item ? "w-full" : "w-0 group-hover:w-full"}`}
                  ></span>
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
          <div
            className="md:hidden text-text text-2xl me-2 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </div>

        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed top-[72px] left-0 w-full bg-black/95 backdrop-blur-xl z-[998] border-b border-white/10"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.07 },
                },
              }}
              className="flex flex-col gap-6 px-6 py-8"
            >
              {MENU.map((item, i) => (
                <motion.li
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <a
                    onClick={() => {
                      setActive(item);
                      scrollToSection(item.toLowerCase());
                      setOpen(false);
                    }}
                    href={`#${item.toLowerCase()}`}
                    className={`block text-xl font-medium transition-all cursor-pointer
                      ${active === item ? "text-primary" : "text-white/70 hover:text-primary"}`}
                  >
                    {item}
                  </a>
                </motion.li>
              ))}

              {/* Auth buttons in mobile */}
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
                <button className="px-4 py-3 bg-primary rounded-md text-white hover:bg-primary-dark transition font-medium flex items-center justify-center gap-2">
                  Signup
                </button>
              </motion.div>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
