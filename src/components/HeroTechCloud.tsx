"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Item = {
  id: string;
  src: string;
  alt: string;
  w: number;
  x: number;
  y: number;
  delay: number;
  glow: string; // rgba()
  fading?: boolean;
};

export default function HeroTechCloud() {
  const base = useMemo<Item[]>(
    () => [
      { id: "java",   src: "/logos/java.svg",   alt: "Java",        w: 48, x: 0,   y: -62, delay: 0.0, glow: "rgba(255,120,80,0.65)" },
      { id: "spring", src: "/logos/spring.svg", alt: "Spring",      w: 52, x: -88, y: -10, delay: 0.1, glow: "rgba(80,255,120,0.60)" },
      { id: "kafka",  src: "/logos/kafka.svg",  alt: "Kafka",       w: 46, x: 90,  y: -12, delay: 0.2, glow: "rgba(200,200,255,0.60)" },
      { id: "react",  src: "/logos/react.svg",  alt: "React",       w: 50, x: -50, y: 62,  delay: 0.3, glow: "rgba(80,240,255,0.65)" },
      { id: "ts",     src: "/logos/ts.svg",     alt: "TypeScript",  w: 42, x: 55,  y: 68,  delay: 0.4, glow: "rgba(80,140,255,0.65)" },
      { id: "aws",    src: "/logos/aws.svg",    alt: "AWS",         w: 52, x: -145,y: -58, delay: 0.5, glow: "rgba(255,185,80,0.65)" },
      { id: "docker", src: "/logos/docker.svg", alt: "Docker",      w: 52, x: 145, y: -58, delay: 0.6, glow: "rgba(100,180,255,0.65)" },
      { id: "mysql",  src: "/logos/mysql.svg",  alt: "MySQL",       w: 48, x: 0,   y: 132, delay: 0.7, glow: "rgba(255,160,110,0.60)" },
    ],
    []
  );

  const [items, setItems] = useState<Item[]>(base);
  const rafRef = useRef<number | null>(null);
  const timeouts = useRef<number[]>([]);
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Shuffle cycle
  useEffect(() => {
    if (prefersReduced) return;
    let alive = true;

    function randPos(others: Item[], minSpacing = 60) {
      let tries = 0;
      while (tries < 50) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 85 + Math.random() * 90;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const tooClose = others.some((o) => Math.hypot(o.x - x, o.y - y) < minSpacing);
        if (!tooClose) return { x, y };
        tries++;
      }
      return { x: 0, y: 0 };
    }

    const tick = () => {
      if (!alive) return;
      const idx = Math.floor(Math.random() * items.length);
      setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, fading: true } : it)));

      const t1 = window.setTimeout(() => {
        if (!alive) return;
        setItems((prev) => {
          const others = prev.filter((_, j) => j !== idx);
          const { x, y } = randPos(others);
          return prev.map((it, i) => (i === idx ? { ...it, x, y, fading: false } : it));
        });
      }, 380);
      timeouts.current.push(t1);

      const t2 = window.setTimeout(() => {
        if (!alive) return;
        rafRef.current = window.requestAnimationFrame(tick);
      }, 2400 + Math.random() * 1200);
      timeouts.current.push(t2);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      alive = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      timeouts.current.forEach((id) => clearTimeout(id));
      timeouts.current = [];
    };
  }, [prefersReduced]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const updateHalo = () => {
      const nameEl = document.getElementById("hero-nameblock");
      const cont = containerRef.current;
      if (!nameEl || !cont) return;
      const nr = nameEl.getBoundingClientRect();
      const cr = cont.getBoundingClientRect();
      const x = (nr.left + nr.width / 2 - cr.left) / cr.width;
      const y = (nr.top + nr.height / 2 - cr.top) / cr.height;
      cont.style.setProperty("--halo-x", `${(x * 100).toFixed(2)}%`);
      cont.style.setProperty("--halo-y", `${(y * 100).toFixed(2)}%`);
    };
    updateHalo();
    window.addEventListener("resize", updateHalo);
    window.addEventListener("scroll", updateHalo, { passive: true });
    return () => {
      window.removeEventListener("resize", updateHalo);
      window.removeEventListener("scroll", updateHalo);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
      <div className="relative h-[360px] w-[360px] md:h-[400px] md:w-[400px]">
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-35"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.00) 70%)",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            maskImage:
              "radial-gradient(circle at var(--halo-x, 20%) var(--halo-y, 35%), rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.6) 100%)",
            WebkitMaskImage:
              "radial-gradient(circle at var(--halo-x, 20%) var(--halo-y, 35%), rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.6) 100%)",
            background: "radial-gradient(closest-side, rgba(0,0,0,0.08), rgba(0,0,0,0.22))",
          } as React.CSSProperties}
        />

        {items.map((it) => {
          const softGlow = it.glow.replace(
            /rgba\((\s*\d+\s*),(\s*\d+\s*),(\s*\d+\s*),\s*([0-9.]+)\s*\)/,
            "rgba($1,$2,$3,0.35)"
          );
          return (
            <div
              key={it.id}
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translate(${it.x}px, ${it.y}px)`,
              }}
            >
              <div
                className={`${it.fading ? "opacity-0" : "opacity-90"} will-change-transform`}
                style={{
                  transition: "opacity 380ms ease",
                  animation: prefersReduced ? undefined : `floatY 6.5s ease-in-out ${it.delay}s infinite alternate`,
                }}
              >
                <div
                  className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-[2px] p-2.5 logo-chip"
                  style={{
                    boxShadow: `0 0 12px ${it.glow}, 0 0 32px ${softGlow}`,
                    animation: prefersReduced ? undefined : `pop 2.8s ease-in-out ${it.delay + 0.4}s infinite`,
                    willChange: "transform, filter",
                  }}
                >
                  <img
                    src={it.src}
                    width={it.w}
                    height={it.w}
                    alt={it.alt}
                    className="saturate-110"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          );
        })}

        <style jsx>{`
          @media (prefers-reduced-motion: reduce) {
            .logo-chip { animation: none !important; }
          }
          @keyframes floatY {
            from { transform: translateY(-5px); }
            to   { transform: translateY(5px); }
          }
          @keyframes pop {
            0%, 100% { transform: scale(1); filter: brightness(1); }
            45%      { transform: scale(1.04); filter: brightness(1.08); }
            50%      { transform: scale(1.05); filter: brightness(1.10); }
            55%      { transform: scale(1.035); filter: brightness(1.06); }
          }
        `}</style>
      </div>
    </div>
  );
}
