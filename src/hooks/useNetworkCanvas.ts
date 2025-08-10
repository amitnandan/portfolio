"use client";

import { useEffect } from "react";

type NetworkOptions = {
  canvasId?: string;
  haloElementId?: string;
  innerFadeRadius?: number;
  outerFadeRadius?: number;
  dotCount?: number; // overrides auto density if provided
};

export function useNetworkCanvas({
  canvasId = "network-canvas",
  haloElementId = "hero-nameblock",
  innerFadeRadius = 0,
  outerFadeRadius = 300,
  dotCount,
}: NetworkOptions = {}) {
  useEffect(() => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
    const haloEl = document.getElementById(haloElementId || "");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;

    const DPR = Math.min(2, window.devicePixelRatio || 1);
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- Responsive tuning ---
    const isMobile = window.matchMedia("(max-width: 640px)").matches;

    // density: prefer caller override; else scale by device + motion + screen
    const AUTO_COUNT = prefersReduced ? (isMobile ? 14 : 24) : (isMobile ? 22 : 60);
    const DOT_COUNT =
      typeof dotCount === "number" ? dotCount : AUTO_COUNT;

    // slightly smaller reach and slower speed on mobile
    const MAX_LINK_DIST = isMobile ? 90 : 140;
    const SPEED = prefersReduced ? 0.18 : isMobile ? 0.22 : 0.3;

    // trails: fade quicker on mobile so it looks cleaner
    const BG_FADE = prefersReduced ? 0.1 : isMobile ? 0.085 : 0.06;

    const DOT = [155, 232, 216];
    const LINK = [254, 194, 96];
    const GLOW_ALPHA = 0.6;

    type Dot = { x: number; y: number; vx: number; vy: number; r: number };
    let dots: Dot[] = [];

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      canvas.width = Math.floor(clientWidth * DPR);
      canvas.height = Math.floor(clientHeight * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const init = () => {
      resize();
      dots = Array.from({ length: DOT_COUNT }, () => ({
        x: Math.random() * canvas.clientWidth,
        y: Math.random() * canvas.clientHeight,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r: isMobile ? 1 + Math.random() * 1.2 : 1 + Math.random() * 1.6,
      }));
    };

    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const smoothstep = (e0: number, e1: number, x: number) => {
      const t = clamp((x - e0) / (e1 - e0), 0, 1);
      return t * t * (3 - 2 * t);
    };

    const step = () => {
      if (!running) return;
      const w = canvas.clientWidth, h = canvas.clientHeight;

      // Halo geometry
      let haloCenter = { x: -9999, y: -9999 };
      const fadeInner = innerFadeRadius;
      let fadeOuter = outerFadeRadius;
      if (haloEl) {
        const r = haloEl.getBoundingClientRect();
        haloCenter = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        fadeOuter = Math.max(
          fadeOuter,
          Math.max(r.width, r.height) / 2 + outerFadeRadius * 0.4
        );
      }

      // trails
      ctx.fillStyle = `rgba(11, 15, 20, ${BG_FADE})`;
      ctx.fillRect(0, 0, w, h);

      // dots
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;

        const dist = Math.hypot(d.x - haloCenter.x, d.y - haloCenter.y);
        const fade = smoothstep(fadeInner, fadeOuter, dist);

        const grd = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, 10);
        grd.addColorStop(0, `rgba(${DOT[0]}, ${DOT[1]}, ${DOT[2]}, ${GLOW_ALPHA * fade})`);
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.arc(d.x, d.y, 10, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = `rgba(${DOT[0]}, ${DOT[1]}, ${DOT[2]}, ${0.9 * fade})`;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
      }

      // links
      ctx.lineWidth = isMobile ? 0.8 : 1;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i], b = dots[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const distAB = Math.hypot(dx, dy);
          if (distAB < MAX_LINK_DIST) {
            const midX = (a.x + b.x) / 2, midY = (a.y + b.y) / 2;
            const distMid = Math.hypot(midX - haloCenter.x, midY - haloCenter.y);
            const fade = smoothstep(fadeInner, fadeOuter, distMid);
            const base = isMobile ? 0.28 : 0.35;
            ctx.strokeStyle = `rgba(${LINK[0]}, ${LINK[1]}, ${LINK[2]}, ${base * fade})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(step);
    };

    // init + animation
    init();
    step();

    // Debounced resize
    let resizeTO: number | null = null;
    const onResize = () => {
      if (resizeTO) window.clearTimeout(resizeTO);
      resizeTO = window.setTimeout(() => {
        resize();
      }, 120);
    };

    // Pause when tab hidden (battery saver)
    const onVis = () => {
      running = !document.hidden && !prefersReduced;
      if (running) step();
    };

    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [canvasId, haloElementId, innerFadeRadius, outerFadeRadius, dotCount]);
}
