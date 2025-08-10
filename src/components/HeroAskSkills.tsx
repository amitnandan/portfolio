"use client";

import { MotionConfig, motion } from "framer-motion";
import Typewriter from "./Typewriter";
import { useCallback } from "react";

type Props = {
  phrases?: string[];
  toSkillsAnchor?: string;
};

export default function HeroAskSkills({
  phrases = [
    "Java · Spring Boot · WebFlux",
    "Apache Kafka · Event-driven systems",
    "React (TypeScript) · Front-end integrations",
    "AWS (EC2, S3) · Docker · CI/CD (basic)",
    "SQL · MySQL · Hibernate/JPA",
  ],
  toSkillsAnchor,
}: Props) {
  const go = useCallback(() => {
    if (!toSkillsAnchor) return;
    const id = toSkillsAnchor.replace(/^#/, "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [toSkillsAnchor]);

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="mt-6 mx-auto max-w-2xl"
        aria-label="Interactive skills preview"
      >
        <div
          className={[
            "mx-auto w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-[2px] px-4 py-3",
            toSkillsAnchor ? "cursor-pointer focus-within:ring-1 focus-within:ring-white/30" : "",
          ].join(" ")}
          {...(toSkillsAnchor
            ? {
              role: "button",
              tabIndex: 0,
              onClick: go,
              onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  go();
                }
              },
              title: "View full skills",
            }
            : {})}
        >
          <div id="ask-label" className="text-xs text-white/60">
            Ask:
          </div>
          <div className="mt-1 text-sm text-white/75">Tell me your skills</div>

          {/* Reserve some height so typewriter doesn’t shift layout as it types */}
          <div className="mt-3 text-base md:text-lg min-h-[1.75rem] md:min-h-[2rem]">
            <span className="text-white/60 mr-2">→</span>
            <span className="text-white/90" aria-describedby="ask-label">
              <Typewriter
                phrases={phrases}
                typingMs={55}
                deletingMs={28}
                pauseMs={1100}
                loop
              />
            </span>
          </div>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
