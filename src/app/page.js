"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import OurServices from "@/sections/OurServices";
import ImpactSection from "@/sections/ImpactSection";
import Testimonials from "@/sections/Testimonials";
import FAQSection from "@/sections/FAQSection";
import PartnersCarousel from "@/AnimationObjects/PartnersCarousel";
import IndustriesWeServe from "@/sections/IndustriesWeServe";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const [freezeParticles, setFreezeParticles] = useState(false);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: "#horizontal-scroll-section",
      start: "top center",
      onEnter: () => setFreezeParticles(true),
      onLeaveBack: () => setFreezeParticles(false),
    });
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <Hero freeze={freezeParticles} />
      <PartnersCarousel />
      <About />
      <OurServices />
      <IndustriesWeServe />
      <ImpactSection />
      <Testimonials />
      <FAQSection />
    </div>
  );
}
