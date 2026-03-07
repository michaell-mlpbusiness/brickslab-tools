"use client";

import React from "react";
import { AnimatedGridPatternProps } from "./AnimatedGridPattern.type";
import {
  alphaColor,
  clamp01,
  maskStyle,
  qualityLayers,
  qualityWeight,
  useReducedMotionPreference,
} from "./background.shared";

const animatedGridKeyframes = `
@keyframes bl-grid-drift {
  0% { background-position: 0px 0px, 0px 0px; opacity: var(--o1); }
  50% { background-position: var(--x1) var(--y1), var(--x2) var(--y2); opacity: var(--o2); }
  100% { background-position: 0px 0px, 0px 0px; opacity: var(--o1); }
}
@keyframes bl-grid-pulse {
  0%, 100% { opacity: 0.04; }
  50% { opacity: 0.12; }
}
`;

export function AnimatedGridPattern({
  className = "",
  size = 40,
  speed = 1,
  strokeWidth = 1,
  color = "var(--c-border)",
  quality = "high",
  mask = "none",
  intensity = 0.5,
  interactive = false,
  theme = "auto",
  reducedMotion = "auto",
}: AnimatedGridPatternProps) {
  const reduced = useReducedMotionPreference(reducedMotion);
  const safeIntensity = clamp01(intensity);
  const safeSpeed = Math.max(0.35, speed);
  const safeSize = Math.max(10, size);
  const safeStroke = Math.max(0.5, strokeWidth);
  const layers = qualityLayers(quality, 3, 2, 1);
  const q = qualityWeight(quality);
  const maskOverlay = maskStyle(mask, 0.35);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "linear-gradient(160deg, var(--c-surface), var(--c-surface-elevated))",
      }}
    >
      <style>{animatedGridKeyframes}</style>

      {Array.from({ length: layers }).map((_, layerIndex) => {
        const layerOpacity = safeIntensity * q * (0.55 - layerIndex * 0.12);
        const spacing = safeSize + layerIndex * 8;

        return (
          <div
            key={`animated-grid-layer-${layerIndex}`}
            style={{
              position: "absolute",
              inset: "-8%",
              pointerEvents: "none",
              backgroundImage: `linear-gradient(${alphaColor(color, layerOpacity)} ${safeStroke}px, transparent ${safeStroke}px), linear-gradient(90deg, ${alphaColor(
                color,
                layerOpacity,
              )} ${safeStroke}px, transparent ${safeStroke}px)`,
              backgroundSize: `${spacing}px ${spacing}px`,
              transform: `scale(${1 + layerIndex * 0.02})`,
              filter: `blur(${quality === "low" ? 0 : 0.4 + layerIndex * 0.45}px)`,
              zIndex: layerIndex + 1,
              animation: reduced
                ? undefined
                : `bl-grid-drift ${(8 + layerIndex * 1.6) / safeSpeed}s cubic-bezier(0.22, 1, 0.36, 1) infinite`,
              ["--x1" as string]: `${spacing * 0.5}px`,
              ["--y1" as string]: `${spacing}px`,
              ["--x2" as string]: `${spacing}px`,
              ["--y2" as string]: `${spacing * 0.5}px`,
              ["--o1" as string]: `${layerOpacity * 0.6}`,
              ["--o2" as string]: `${layerOpacity}`,
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(circle at 50% 50%, ${alphaColor("#CC4A48", safeIntensity * 0.15)}, transparent 68%)`,
          mixBlendMode: theme === "light" ? "multiply" : "screen",
          zIndex: layers + 1,
          animation: reduced ? undefined : `bl-grid-pulse ${12 / safeSpeed}s ease-in-out infinite`,
        }}
      />

      {maskOverlay && <div style={{ ...maskOverlay, zIndex: layers + 2 }} />}
    </div>
  );
}
