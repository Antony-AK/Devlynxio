"use client"

import React from "react";

const partners = [
    "Microsoft",
    "Google",
    "Amazon",
    "Netflix",
    "IBM",
    "Oracle",
    "Meta",
    "Adobe",
    "Salesforce",
    "Spotify"
];

export default function PartnersCarousel() {
    const loop = [...partners, ...partners];

    return (
        <div className="relative w-full bg-black py-10 mt-24 mb-10 overflow-hidden">

            <div className="
        absolute inset-0 
        mx-auto 
        w-[110%]
        h-[140%]
        -top-10 
        bg-gradient-to-r 
        from-red-800/10 
        via-red-600/20 
        to-red-900/10
        blur-3xl 
        opacity-60 
        pointer-events-none
      " />


      {/* ⭐ Top Glow Line */}
<div
  className="
    absolute top-0 left-0 w-full h-[2px]
    bg-red-600/70
    shadow-[0_0_12px_2px_rgba(255,0,0,0.6)]
  "
/>

{/* ⭐ Bottom Glow Line */}
<div
  className="
    absolute bottom-0 left-0 w-full h-[2px]
    bg-red-600/70
    shadow-[0_0_12px_2px_rgba(255,0,0,0.6)]
  "
/>


            {/* CAROUSEL */}
            <div className="relative flex items-center">
                <div className="animate-slide flex gap-20 whitespace-nowrap">
                    {loop.map((name, i) => (
                        <span
                            key={i}
                            className="
                text-2xl 
                font-semibold
                tracking-wide

                bg-gradient-to-r 
                from-red-900 
                to-red-600 
                bg-clip-text 
                text-transparent

                hover:from-red-600
                hover:to-white
                
                transition-all 
                duration-300

                hover:scale-110
                cursor-pointer
                
                drop-shadow-[0_0_6px_rgba(255,0,0,0.45)]
              "
                        >
                            {name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
