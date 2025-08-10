"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useNetworkCanvas } from "@/hooks/useNetworkCanvas";
import HeroTechCloud from "./HeroTechCloud";
import Typewriter from "./Typewriter";
import BlurHalo from "./BlurHalo";

export default function Hero() {
  // Wire background
  useNetworkCanvas({
    canvasId: "network-canvas",
    haloElementId: "hero-nameblock",
    innerFadeRadius: 0,
    outerFadeRadius: 300,
    dotCount: 60,
  });

  useEffect(() => {
    if (!document.getElementById("network-canvas")) {
      console.warn("network-canvas not found");
    }
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[100svh]">
      {/* 1) BACKGROUND canvas — now at z-0 so it’s visible */}
      <div className="absolute inset-0 z-0">
        <canvas id="network-canvas" className="block h-full w-full" />
      </div>

      {/* 2) Subtle vignette above canvas */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(1200px_500px_at_70%_-10%,rgba(255,255,255,0.06),transparent_60%)]" />

      {/* 3) Blur halo that follows the name block (fixed, sits above vignette) */}
      <BlurHalo
        targetId="hero-nameblock"
        paddingX={56}
        paddingY={80}
        intensity="xl"
        opacity={0.5}
        feather={2.6}
        zIndex={20}
        pulse
      />

      {/* 4) FOREGROUND content at highest layer */}
      <div className="relative z-30 mx-auto grid min-h-[100svh] max-w-6xl grid-cols-1 items-center gap-10 px-6 pt-20 md:grid-cols-2 md:pt-24">
        {/* Left: text */}
        <div className="text-center md:text-left">
          <div id="hero-nameblock" className="inline-block">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Amit Nandan</h1>
            <p className="mt-3 text-white/80">
              Software Engineer — Backend &amp; Full-Stack
            </p>
          </div>

          {/* Typewriter */}
          <div className="mt-6 mx-auto max-w-2xl rounded-xl border border-white/15 bg-white/5 backdrop-blur-[2px] px-4 py-3">
            <div className="text-xs text-white/60">Ask:</div>
            <div className="mt-1 text-sm text-white/75">tell me your skills</div>
            <div className="mt-3 text-base md:text-lg">
              <span className="text-white/60 mr-2">→</span>
              <span className="text-white/90">
                <Typewriter
                  phrases={[
                    "Java · Spring Boot · WebFlux",
                    "Apache Kafka · Event-driven systems",
                    "React (TypeScript) · Front-end integrations",
                    "AWS (EC2, S3) · Docker · CI/CD",
                    "SQL · MySQL · Hibernate/JPA",
                  ]}
                  typingMs={55}
                  deletingMs={28}
                  pauseMs={1100}
                  loop
                />
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <a
              href="#contact"
              className="px-5 py-2 rounded font-semibold bg-white/90 text-[#0B0F14] hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Contact me
            </a>
            <a
              href="#about"
              className="px-5 py-2 rounded border border-white/15 text-white/85 hover:border-white/30 transition focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              Learn more
            </a>
          </div>

          {/* Socials + Resume */}
          <div className="mt-6 flex gap-4 justify-center md:justify-start">
            {/* GitHub */}
            <a
              href="https://github.com/amitnandan"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/15 hover:shadow-[0_0_12px_rgba(255,255,255,0.6)] transition focus:outline-none focus:ring-2 focus:ring-white/40"
              aria-label="GitHub"
              title="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-white" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.111.82-.261.82-.58 0-.287-.011-1.245-.017-2.259-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.758-1.333-1.758-1.089-.744.083-.729.083-.729 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.605-2.665-.303-5.467-1.332-5.467-5.932 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.172 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 6 0c2.292-1.552 3.298-1.23 3.298-1.23.655 1.649.243 2.869.12 3.172.77.84 1.235 1.911 1.235 3.221 0 4.61-2.806 5.625-5.479 5.922.431.372.816 1.103.816 2.223 0 1.606-.015 2.899-.015 3.293 0 .321.217.695.825.577C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/amit-nandan-an21"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-white/20 bg-[#0077B5]/25 hover:border-[#0077B5]/40 hover:bg-[#0077B5]/35 hover:shadow-[0_0_14px_rgba(0,119,181,0.85)] transition focus:outline-none focus:ring-2 focus:ring-[#59b3e3]/60"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-white" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.984 3.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM.75 8.25h4.5v15h-4.5v-15zM8.25 8.25h4.309v2.051h.062c.6-1.138 2.067-2.338 4.259-2.338 4.556 0 5.395 3.001 5.395 6.9v8.387h-4.5v-7.44c0-1.776-.032-4.064-2.476-4.064-2.48 0-2.86 1.938-2.86 3.94v7.564h-4.5v-15z"/>
              </svg>
            </a>

            {/* Resume */}
            <a
              href="/resume"
              className="p-2 rounded-full border border-white/20 bg-yellow-500/20 hover:border-yellow-500/40 hover:bg-yellow-500/30 hover:shadow-[0_0_12px_rgba(255,215,0,0.85)] transition focus:outline-none focus:ring-2 focus:ring-yellow-400/60"
              aria-label="Resume"
              title="Resume"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 2h8l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2v6h6" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right: photo with moving logo cloud behind */}
        <div className="relative flex justify-center md:justify-end">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <HeroTechCloud />
          </div>
          <div className="relative z-10">
            <div className="relative w-52 h-52 md:w-60 md:h-60">
              <Image
                src="/me.jpg"
                alt="Amit Nandan"
                width={240}
                height={240}
                className="rounded-full object-cover ring-1 ring-white/15 shadow-2xl"
                priority
              />
              <div className="pointer-events-none absolute -inset-1 rounded-full blur-xl opacity-20 bg-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="h-10 md:h-0" />
    </section>
  );
}
