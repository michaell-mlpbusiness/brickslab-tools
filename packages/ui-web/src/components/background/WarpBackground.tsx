"use client";

import React, { useEffect, useRef, useState } from "react";
import { WarpBackgroundProps } from "./WarpBackground.type";
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

const warpKeyframes = `
@keyframes bl-warp-float {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); opacity: var(--o1); }
  35% { transform: translate3d(var(--tx), calc(var(--ty) * -1), 0) scale(1.08) rotate(8deg); opacity: var(--o2); }
  70% { transform: translate3d(calc(var(--tx) * -0.8), var(--ty), 0) scale(1.02) rotate(-6deg); opacity: var(--o1); }
}
@keyframes bl-warp-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;

export function WarpBackground({
  children,
  className = "",
  intensity = 0.4,
  speed = 1,
  quality = "high",
  mask = "none",
  interactive = false,
  theme = "auto",
  reducedMotion = "auto",
}: WarpBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });

  const reduced = useReducedMotionPreference(reducedMotion);
  const safeIntensity = clamp01(intensity);
  const safeSpeed = Math.max(0.35, speed);
  const layers = qualityLayers(quality, 4, 3, 2);
  const qualityFactor = qualityWeight(quality);
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

  const maskOverlay = maskStyle(mask, 0.48);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--c-surface-elevated) 80%, transparent), transparent 40%), linear-gradient(135deg, var(--c-surface) 0%, var(--c-surface-elevated) 100%)",
      }}
    >
      <style>{warpKeyframes}</style>

      {Array.from({ length: layers }).map((_, index) => {
        const paletteColor = PREMIUM_PALETTE[index % PREMIUM_PALETTE.length];
        const opacity = safeIntensity * (0.36 - index * 0.06) * qualityFactor;
        const originX = interactive ? pointer.x : 22 + index * 24;
        const originY = interactive ? pointer.y : 34 + index * 13;
        const tx = `${(index % 2 === 0 ? 18 : -18) * safeSpeed}px`;
        const ty = `${(index % 2 === 0 ? -12 : 12) * safeSpeed}px`;

        return (
          <div
            key={`warp-layer-${index}`}
            style={{
              position: "absolute",
              inset: "-22%",
              borderRadius: "46% 54% 61% 39% / 44% 52% 48% 56%",
              transformOrigin: "center",
              background: `radial-gradient(circle at ${originX}% ${originY}%, ${alphaColor(
                paletteColor,
                opacity,
              )} 0%, transparent 66%)`,
              filter: `blur(${quality === "low" ? 24 : quality === "medium" ? 42 : 70}px)`,
              mixBlendMode: blendMode,
              pointerEvents: "none",
              zIndex: index + 1,
              animation: reduced ? undefined : `bl-warp-float ${(6 + index * 1.1) / safeSpeed}s cubic-bezier(0.22, 1, 0.36, 1) infinite`,
              ["--tx" as string]: tx,
              ["--ty" as string]: ty,
              ["--o1" as string]: `${opacity * 0.78}`,
              ["--o2" as string]: `${opacity}`,
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          inset: "-35%",
          pointerEvents: "none",
          background: `conic-gradient(from 0deg at ${interactive ? pointer.x : 50}% ${
            interactive ? pointer.y : 50
          }%, ${alphaColor("#CC4A48", safeIntensity * 0.26)}, transparent 22%, ${alphaColor(
            "#4ADE80",
            safeIntensity * 0.14,
          )}, transparent 58%, ${alphaColor("#F59E0B", safeIntensity * 0.24)}, transparent)`,
          mixBlendMode: blendMode,
          filter: `blur(${quality === "low" ? 16 : 26}px)`,
          opacity: reduced ? 0.4 : 0.75,
          zIndex: layers + 1,
          animation: reduced ? undefined : `bl-warp-spin ${36 / safeSpeed}s linear infinite`,
        }}
      />

      {maskOverlay && <div style={{ ...maskOverlay, zIndex: layers + 2 }} />}

      <div style={{ position: "relative", zIndex: layers + 3, width: "100%", height: "100%" }}>{children}</div>
    </div>
  );
}
