"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="bg-[#0B0F14]">
      {/* Hero stays on solid color */}
      <Hero />

      {/* Content on smooth gradient */}
      <div className="bg-gradient-to-b from-[#0B0F14] via-[#121B2C] to-[#223A5C]">
        <About />
        <Stats />
        <Skills />
        <Projects />
        <Contact />
      </div>

      {/* Soft separator so the footer doesn’t visually disappear */}
      <div className="h-8 bg-gradient-to-b from-[#223A5C] to-[#0B0F14]" />

      {/* Footer */}
      <Footer />
    </main>
  );
}
