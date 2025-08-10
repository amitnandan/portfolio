"use client";

import {
  MotionConfig,
  motion,
  useIsPresent,
  useReducedMotion,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { useEffect, useState, ReactNode } from "react";

function yearsSince(dateStr: string) {
  const start = new Date(dateStr);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const m = now.getMonth() - start.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < start.getDate())) years--;
  return Math.max(0, years);
}

type StatEntry = {
  value: ReactNode;
  label: ReactNode;
  animate?: boolean;
};

function Counter({ to, duration = 1.2 }: { to: number; duration?: number }) {
  const prefersReduced = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 120, damping: 20 });
  const isPresent = useIsPresent();
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      setDisplay(Math.round(v).toString());
    });
    return () => unsub();
  }, [spring]);

  useEffect(() => {
    if (prefersReduced) {
      mv.set(to);
      return;
    }
    mv.set(0);
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      mv.set(to * eased);
      if (p < 1 && isPresent) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, prefersReduced, isPresent, mv]);

  return <span>{display}</span>;
}

export default function Stats() {
  const startDate = "2021-10-01";
  const years = yearsSince(startDate);

  const baseProjects = 3;
  const projectsDelivered = baseProjects + years * 3;

  const stats: StatEntry[] = [
    {
      value: (
        <>
          <Counter to={years} />+
        </>
      ),
      label: "Years in Software Engineering",
      animate: true,
    },
    {
      value: "Industry Expertise",
      label: (
        <div className="space-y-0.5">
          <div>FinTech / Banking</div>
          <div>Logistics &amp; Supply Chain</div>
        </div>
      ),
      animate: false,
    },
    {
      value: (
        <>
          <Counter to={projectsDelivered} />+
        </>
      ),
      label: "Projects Delivered",
      animate: true,
    },
    { value: "95%", label: "Client Satisfaction", animate: false },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <section id="stats" className="relative scroll-mt-24">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex flex-col items-center justify-center rounded-xl p-6 border border-white/10 bg-white/5 backdrop-blur-[2px] text-center"
                  role="group"
                  aria-label={
                    typeof stat.label === "string"
                      ? `${stat.value} ${stat.label}`
                      : "stat-card"
                  }
                >
                  <div className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-white/70">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
