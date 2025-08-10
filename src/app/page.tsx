"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function HomePage() {
  return (
    <main className="bg-[#0B0F14]">
      <Hero />

      <div className="bg-gradient-to-b from-[#0B0F14] via-[#121B2C] via-[#1A2F4A] to-[#223A5C]">
        <About />
        <Stats />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}
