"use client";

import { useLayoutEffect, useState } from "react";

type Props = {
  targetId: string;
  paddingX?: number;
  paddingY?: number;
  intensity?: "md" | "lg" | "xl";
  opacity?: number;
  feather?: number;
  pulse?: boolean;
  zIndex?: number;
};

const BLUR_CLASS = {
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-2xl",
};

export default function BlurHalo({
  targetId,
  paddingX = 40,
  paddingY = 64,
  intensity = "lg",
  opacity = 0.6,
  feather = 2.3,
  pulse = true,
  zIndex = 1,
}: Props) {
  const [style, setStyle] = useState<React.CSSProperties>({ display: "none" });

  useLayoutEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const update = () => {
      const r = el.getBoundingClientRect();
      setStyle({
        display: "block",
        position: "fixed",
        left: `${r.left - paddingX}px`,
        top: `${r.top - paddingY}px`,
        width: `${r.width + paddingX * 2}px`,
        height: `${r.height + paddingY * 2}px`,
        zIndex,
      });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, [targetId, paddingX, paddingY, zIndex]);

  const maskSize = `${Math.round(160 * feather)}% ${Math.round(160 * feather)}%`;

  return (
    <>
      <div
        className={`pointer-events-none fixed ${BLUR_CLASS[intensity]} backdrop-saturate-150 ${pulse ? "animate-halo-pulse" : ""
          }`}
        style={{
          ...style,
          opacity,
          WebkitMaskImage: `radial-gradient(${maskSize} at 50% 50%,
            rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.5) 85%, rgba(0,0,0,0) 100%)`,
          maskImage: `radial-gradient(${maskSize} at 50% 50%,
            rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.5) 85%, rgba(0,0,0,0) 100%)`,
        }}
      />
      <div
        className={`pointer-events-none fixed ${pulse ? "animate-halo-pulse" : ""}`}
        style={{
          ...style,
          background:
            "radial-gradient(90% 90% at 50% 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.05) 85%, rgba(0,0,0,0.10) 100%)",
        }}
      />
      <style jsx global>{`
        @keyframes halo-pulse {
          0%, 100% { opacity: 0.5; }
          50%      { opacity: 0.65; }
        }
        .animate-halo-pulse {
          animation: halo-pulse 4.2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
