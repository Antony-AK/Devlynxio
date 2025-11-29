"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaArrowRight,
} from "react-icons/fa";



export default function Footer() {

  
  return (
    <footer id="contact" className="bg-black text-white w-full pt-20 pb-10 mt-22 border-t border-red-600/20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full max-w-7xl mx-auto px-6"
      >
<div className="md:flex w-full gap-44  justify-between items-center">


         <div className="space-y-5 w-[500px] ">
            <Image
              src="/logo1.png"
              alt="Devlynxio Logo"
              width={140}
              height={60}
              className="object-contain"
            />

            <p className="text-gray-400 leading-relaxed w-[300px] md:w-full text-sm">
              Devlynxio builds modern digital products with precision, innovation, and world-class engineering.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-3 mb-5">
              {[FaGithub, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="p-2 rounded-full border border-red-600/40 hover:border-red-500 hover:bg-red-600/20 transition"
                  href="#"
                >
                  <Icon className="text-white text-lg" />
                </motion.a>
              ))}
            </div>
          </div>
        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12  pb-14">

          {/* === COL 1 — BRANDING === */}
         

          {/* === COL 2 — QUICK LINKS === */}
          <div>
            <h3 className="font-semibold text-lg mb-5 text-red-600">Quick Links</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              {["Home", "About", "Services", "Industries", "Portfolio", "Contact"].map(
                (item, i) => (
                  <li key={i}>
                    <motion.a
                      whileHover={{ x: 6, color: "#dc2626" }}
                      transition={{ duration: 0.2 }}
                      className="cursor-pointer inline-block"
                    >
                      {item}
                    </motion.a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* === COL 3 — SERVICES === */}
          <div>
            <h3 className="font-semibold text-lg mb-5 text-red-600">Services</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              {[
                "Web Development",
                "App Development",
                "Branding",
                "AI & ML Solutions",
                "Automation",
                "Cloud Deployment",
              ].map((item, i) => (
                <li key={i}>
                  <motion.a
                    whileHover={{ x: 6, color: "#dc2626" }}
                    transition={{ duration: 0.2 }}
                    className="cursor-pointer inline-block"
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* === COL 4 — CONTACT + CTA === */}
          <div>
            <h3 className="font-semibold text-lg mb-5 text-red-600">Contact</h3>

            <ul className="space-y-3 text-gray-300 text-sm">
              <li>Email: support@devlynxio.com</li>
              <li>Phone: +91 12345 67890</li>
              <li>Tuticorin, Tamil Nadu, India</li>
            </ul>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 bg-red-600 px-5 py-3 text-sm rounded-lg flex items-center gap-2 text-white hover:bg-red-700 transition shadow-lg shadow-red-600/40"
            >
              Request a Quote <FaArrowRight />
            </motion.button>
          </div>
        </div>

        </div>

        {/* === COPYRIGHT BAR === */}
        <div className="border-t border-red-600/20 my-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-gray-400 text-sm">

          <p className="mt-5">© {new Date().getFullYear()} Devlynxio. All rights reserved.</p>

        
        </div>
      </motion.div>
    </footer>
  );
}
