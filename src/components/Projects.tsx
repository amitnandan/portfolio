"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const projects = [
  {
    name: "E-Wallet",
    description:
      "Modular e-wallet system featuring Spring Boot backend, Hibernate, Kafka for real-time processing.",
    language: "Java",
    languageColor: "#b07219",
    url: "https://github.com/amnandan/E-Wallet",
  },
  {
    name: "Netflix Clone",
    description:
      "Responsive video streaming front-end using React and Redux Toolkit with Firebase auth and GPT-3.5 recommendations.",
    language: "TypeScript",
    languageColor: "#3178c6",
    url: "https://github.com/amnandan/Netflix",
  },
  {
    name: "MovieBookingSystem",
    description: "Full stack movie booking application.",
    language: "Java",
    languageColor: "#b07219",
    url: "https://github.com/amnandan/MovieBookingSystem",
  },
  {
    name: "EmployeeManagement",
    description:
      "CRUD system for managing employee records with Spring Boot.",
    language: "Java",
    languageColor: "#b07219",
    url: "https://github.com/amnandan/EmployeeManagement",
  },
];

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const speed = 1; // px per frame
    let raf = 0;

    const step = () => {
      if (!isPaused.current) {
        el.scrollLeft += speed;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
          el.scrollLeft = 0;
        }
      }
      raf = requestAnimationFrame(step);
    };

    const pause = () => (isPaused.current = true);
    const resume = () => (isPaused.current = false);

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause);
    el.addEventListener("touchend", resume);

    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, []);

  return (
    <section
      id="projects"
      className="relative py-16"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.55]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#121821] to-transparent" />
      </div>

      <div className="pointer-events-none absolute left-0 right-0 top-0 h-6 bg-gradient-to-b from-transparent to-black/10" />
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-6 bg-gradient-to-t from-transparent to-black/10" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <h2 className="text-3xl font-bold text-center text-white mb-10">
          Projects
        </h2>

        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0, black 32px, black calc(100% - 32px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 32px, black calc(100% - 32px), transparent 100%)",
          }}
        >
          <div className="flex gap-6 px-6">
            {projects.map((project) => (
              <Link
                key={project.name}
                href={project.url}
                target="_blank"
                className="group flex-shrink-0 w-80 border border-white/12 rounded-xl bg-white/[0.06] hover:bg-white/[0.10] transition backdrop-blur-md p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  {/* GitHub Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-5 h-5 text-white/70 group-hover:text-white transition"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.1 3.3 9.41 7.87 10.94.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.76.4-1.26.72-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.2-3.11-.12-.29-.52-1.45.11-3.02 0 0 .98-.31 3.2 1.18a11.06 11.06 0 0 1 5.82 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.57.23 2.73.11 3.02.75.81 1.2 1.85 1.2 3.11 0 4.43-2.69 5.41-5.25 5.69.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.12 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-white group-hover:text-yellow-300 transition">
                    {project.name}
                  </h3>
                </div>

                <p className="text-sm text-white/75 mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="mt-auto flex items-center gap-2 text-xs text-white/60">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: project.languageColor }}
                    aria-hidden
                  />
                  {project.language}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE & Edge */
          scrollbar-width: none;    /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;            /* Chrome/Safari */
        }
      `}</style>
    </section>
  );
}
