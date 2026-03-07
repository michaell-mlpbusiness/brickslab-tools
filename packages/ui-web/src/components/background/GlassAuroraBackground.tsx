"use client";

import React, { useEffect, useRef, useState } from "react";
import { GlassAuroraBackgroundProps } from "./GlassAuroraBackground.type";
import {
  PREMIUM_PALETTE,
  alphaColor,
  blendModeForTheme,
  clamp01,
  maskStyle,
  qualityLayers,
  qualityWeight,
  useReducedMotionPreference,
} from "./background.shared";

const auroraKeyframes = `
@keyframes bl-aurora-drift {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); opacity: var(--o1); }
  33% { transform: translate3d(var(--x1), var(--y1), 0) scale(1.1) rotate(12deg); opacity: var(--o2); }
  66% { transform: translate3d(var(--x2), var(--y2), 0) scale(0.96) rotate(-9deg); opacity: var(--o1); }
}
@keyframes bl-aurora-conic {
  from { transform: rotate(0deg); opacity: 0.28; }
  50% { opacity: 0.42; }
  to { transform: rotate(360deg); opacity: 0.28; }
}
`;

export function GlassAuroraBackground({
  className = "",
  colors = [...PREMIUM_PALETTE],
  blur = 60,
  intensity = 0.6,
  speed = 1,
  quality = "high",
  border = false,
  interactive = false,
  theme = "auto",
  reducedMotion = "auto",
}: GlassAuroraBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });

  const reduced = useReducedMotionPreference(reducedMotion);
  const safeIntensity = clamp01(intensity);
  const safeSpeed = Math.max(0.35, speed);
  const safeBlur = Math.max(0, blur);
  const layers = qualityLayers(quality, 4, 3, 2);
  const q = qualityWeight(quality);
  const blendMode = blendModeForTheme(theme);

  useEffect(() => {
    if (!interactive) return;

    const handlePointerMove = (event: PointerEvent) => {
      const node = containerRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      setPointer({
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [interactive]);

  const maskOverlay = maskStyle("vignette", 0.32);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: "inherit",
        background:
          "linear-gradient(160deg, color-mix(in srgb, var(--c-surface-elevated) 82%, transparent), color-mix(in srgb, var(--c-surface) 85%, transparent))",
        border: border ? "1px solid color-mix(in srgb, var(--c-border) 70%, transparent)" : undefined,
        backdropFilter: quality === "low" ? "none" : `blur(${safeBlur * 0.22}px) saturate(1.2)`,
        WebkitBackdropFilter: quality === "low" ? "none" : `blur(${safeBlur * 0.22}px) saturate(1.2)`,
      }}
    >
      <style>{auroraKeyframes}</style>

      {Array.from({ length: layers }).map((_, index) => {
        const color = colors[index % colors.length] ?? PREMIUM_PALETTE[index % PREMIUM_PALETTE.length];
        const opacity = safeIntensity * (0.35 - index * 0.05) * q;

        return (
          <div
            key={`aurora-${index}`}
            style={{
              position: "absolute",
              width: "62%",
              height: "62%",
              left: "19%",
              top: "19%",
              borderRadius: "44% 56% 62% 38% / 38% 52% 48% 62%",
              background: `radial-gradient(circle at 35% 35%, ${alphaColor(color, opacity)} 0%, transparent 70%)`,
              filter: `blur(${safeBlur * (0.7 + index * 0.16)}px)`,
              mixBlendMode: blendMode,
              pointerEvents: "none",
              zIndex: index + 1,
              animation: reduced
                ? undefined
                : `bl-aurora-drift ${(8 + index * 1.2) / safeSpeed}s cubic-bezier(0.22, 1, 0.36, 1) infinite`,
              ["--x1" as string]: `${interactive ? pointer.x * 0.1 : 16 + index * 4}px`,
              ["--y1" as string]: `${interactive ? pointer.y * 0.08 : -12 + index * 2}px`,
              ["--x2" as string]: `${interactive ? -pointer.x * 0.08 : -14 - index * 3}px`,
              ["--y2" as string]: `${interactive ? -pointer.y * 0.06 : 10 + index * 2}px`,
              ["--o1" as string]: `${opacity * 0.78}`,
              ["--o2" as string]: `${opacity}`,
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          inset: "-30%",
          pointerEvents: "none",
          background: `conic-gradient(from 0deg at ${interactive ? pointer.x : 50}% ${
            interactive ? pointer.y : 50
          }%, ${alphaColor(colors[0] ?? "#CC4A48", safeIntensity * 0.24)}, transparent 20%, ${alphaColor(
            colors[1] ?? "#4ADE80",
            safeIntensity * 0.18,
          )}, transparent 50%, ${alphaColor(colors[2] ?? "#F59E0B", safeIntensity * 0.2)}, transparent)`,
          filter: `blur(${safeBlur * 0.9}px)`,
          mixBlendMode: blendMode,
          zIndex: layers + 1,
          animation: reduced ? undefined : `bl-aurora-conic ${26 / safeSpeed}s linear infinite`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(130deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.02) 45%, rgba(255, 255, 255, 0.11) 100%)",
          mixBlendMode: "soft-light",
          zIndex: layers + 2,
        }}
      />

      {maskOverlay && <div style={{ ...maskOverlay, zIndex: layers + 3 }} />}
    </div>
  );
}
