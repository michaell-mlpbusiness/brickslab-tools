"use client";

import React, { useEffect, useRef } from "react";
import { NoiseMeshBackgroundProps } from "./NoiseMeshBackground.type";
import {
  PREMIUM_PALETTE,
  alphaColor,
  clamp01,
  maskStyle,
  qualityWeight,
  useReducedMotionPreference,
} from "./background.shared";

type Blob = {
  radius: number;
  orbit: number;
  phase: number;
  speed: number;
  color: string;
};

const noiseMeshKeyframes = `
@keyframes bl-noise-breathe {
  0%, 100% { filter: brightness(0.94) saturate(1); }
  50% { filter: brightness(1.05) saturate(1.08); }
}
`;

export function NoiseMeshBackground({
  className = "",
  colors = [...PREMIUM_PALETTE],
  noise = 0.5,
  grainSize = 1,
  animate = true,
  speed = 1,
  quality = "high",
  mask = "none",
  interactive = false,
  theme = "auto",
  reducedMotion = "auto",
}: NoiseMeshBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5 });
  const reduced = useReducedMotionPreference(reducedMotion);

  const safeNoise = clamp01(noise);
  const safeGrain = Math.max(0.2, grainSize);
  const safeSpeed = Math.max(0.35, speed);
  const qualityFactor = qualityWeight(quality);
  const shouldAnimate = animate && !reduced;
  const maskOverlay = maskStyle(mask, 0.4);

  useEffect(() => {
    if (!interactive) return;

    const onPointerMove = (event: PointerEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)),
        y: Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height)),
      };
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [interactive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;

    const blobCount = quality === "high" ? 9 : quality === "medium" ? 6 : 4;
    const blobs: Blob[] = Array.from({ length: blobCount }).map((_, index) => {
      const paletteColor = colors[index % colors.length] ?? PREMIUM_PALETTE[index % PREMIUM_PALETTE.length];
      return {
        radius: 0.16 + ((index * 17) % 10) / 40,
        orbit: 0.2 + ((index * 11) % 9) / 20,
        phase: (index * 1.7) % (Math.PI * 2),
        speed: 0.4 + ((index * 13) % 7) / 10,
        color: paletteColor,
      };
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, quality === "high" ? 2 : 1.5);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      const t = time * 0.001 * safeSpeed;

      ctx.clearRect(0, 0, rect.width, rect.height);

      const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      const pointerShift = interactive ? pointerRef.current.x * 0.2 : 0.1;
      gradient.addColorStop(0, alphaColor(colors[0] ?? "#CC4A48", 0.22 + pointerShift * 0.6));
      gradient.addColorStop(0.5, alphaColor(colors[1] ?? "#4ADE80", 0.15));
      gradient.addColorStop(1, alphaColor(colors[2] ?? "#F59E0B", 0.2));
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      ctx.globalCompositeOperation = "screen";

      for (const blob of blobs) {
        const orbitX = rect.width * blob.orbit;
        const orbitY = rect.height * blob.orbit;
        const centerX =
          rect.width * 0.5 +
          Math.cos(t * blob.speed + blob.phase) * orbitX +
          (interactive ? (pointerRef.current.x - 0.5) * rect.width * 0.2 : 0);
        const centerY =
          rect.height * 0.5 +
          Math.sin(t * (blob.speed * 0.8) + blob.phase) * orbitY +
          (interactive ? (pointerRef.current.y - 0.5) * rect.height * 0.2 : 0);

        const radius = Math.max(rect.width, rect.height) * blob.radius;
        const g = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        g.addColorStop(0, alphaColor(blob.color, 0.24 * qualityFactor));
        g.addColorStop(0.45, alphaColor(blob.color, 0.12 * qualityFactor));
        g.addColorStop(1, alphaColor(blob.color, 0));

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";

      if (quality !== "low") {
        const grainAlpha = safeNoise * (quality === "high" ? 0.045 : 0.028);
        const pixel = Math.max(1, Math.floor(safeGrain));
        const sampleCount = Math.floor((rect.width * rect.height) / (quality === "high" ? 500 : 900));

        for (let i = 0; i < sampleCount; i += 1) {
          const x = Math.random() * rect.width;
          const y = Math.random() * rect.height;
          ctx.fillStyle = `rgba(255,255,255,${Math.random() * grainAlpha})`;
          ctx.fillRect(x, y, pixel, pixel);
        }
      }

      if (shouldAnimate) {
        raf = requestAnimationFrame(draw);
      }
    };

    resize();
    draw(performance.now());

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [
    animate,
    colors,
    interactive,
    quality,
    qualityFactor,
    reduced,
    safeGrain,
    safeNoise,
    safeSpeed,
    shouldAnimate,
    theme,
  ]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        animation: shouldAnimate ? `bl-noise-breathe ${9 / safeSpeed}s ease-in-out infinite` : undefined,
      }}
    >
      <style>{noiseMeshKeyframes}</style>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
      {maskOverlay && <div style={{ ...maskOverlay, zIndex: 1 }} />}
    </div>
  );
}
