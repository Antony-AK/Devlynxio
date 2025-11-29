"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ_DATA = [
  {
    q: "Why should I choose Devlynxio?",
    a: "Devlynxio is a trusted software and IT solutions provider delivering scalable, secure, and high-performance products tailored for modern businesses."
  },
  {
    q: "Do you provide custom software solutions?",
    a: "Yes, we develop fully custom digital solutions that match your business workflows, UI goals, and technical requirements."
  },
  {
    q: "How much does it cost to develop a software solution?",
    a: "The cost depends on complexity, features, UI/UX needs, and technology stack. Contact us for a custom quote."
  },
  {
    q: "How many clients have you worked with?",
    a: "We have delivered projects for 50+ clients worldwide across multiple industries."
  },
  {
    q: "What makes Devlynxio different?",
    a: "Expert development, modern UI/UX, on-time delivery, and transparent communication throughout the entire process."
  }
];

// ⭐ Smooth fade-up
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay }
  }
});

export default function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq"
 className="w-full bg-black text-white py-20 px-5 sm:px-8 md:px-14 flex justify-center md:mt-10">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">

        {/* LEFT TEXT SIDE */}
        <motion.div
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-4"
        >
          <p className="text-red-500 text-lg font-semibold">FAQ</p>

          <h2 className="text-3xl sm:text-4xl font-semibold leading-snug text-white">
            What would you like to know <br /> about Devlynxio?
          </h2>

          <p className="mt-4 text-gray-300 text-base sm:text-lg max-w-md">
            Still have questions? Reach out — we’re always happy to help!
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-red-600 px-6 py-3 rounded-md text-sm sm:text-base flex items-center gap-2 hover:bg-red-700 transition"
          >
            Contact Us
          </motion.button>
        </motion.div>

        {/* FAQ RIGHT SIDE */}
        <div className="space-y-5">
          {FAQ_DATA.map((item, i) => {
            const isOpen = i === open;

            return (
              <motion.div
                key={i}
                layout
                variants={fadeUp(i * 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ layout: { duration: 0.35, ease: "easeInOut" } }}
                className="bg-gradient-to-r from-red-600 to-[#d62828] p-5 sm:p-6 rounded-xl shadow-md cursor-pointer"
                onClick={() => setOpen(isOpen ? null : i)}
                style={{ willChange: "transform, opacity" }}
              >

                {/* QUESTION HEADER */}
                <motion.div layout="position" className="flex justify-between items-center">
                  <p className="text-base sm:text-lg font-semibold">{item.q}</p>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl"
                  >
                    ⏷
                  </motion.span>
                </motion.div>

                {/* ANSWER */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 text-white/90 leading-relaxed text-sm sm:text-base"
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
