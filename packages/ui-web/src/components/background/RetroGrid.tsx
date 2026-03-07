"use client";

import React from "react";
import { RetroGridProps } from "./RetroGrid.type";
import {
  alphaColor,
  clamp01,
  qualityLayers,
  qualityWeight,
  useReducedMotionPreference,
} from "./background.shared";

const retroGridKeyframes = `
@keyframes bl-retro-scan {
  from { background-position-y: 0px, 0px; opacity: var(--o1); }
  to { background-position-y: var(--travel), var(--travel); opacity: var(--o2); }
}
@keyframes bl-retro-bloom {
  0%, 100% { opacity: 0.15; transform: scale(0.95); }
  50% { opacity: 0.3; transform: scale(1.08); }
}
`;

export function RetroGrid({
  className = "",
  perspective = 1000,
  lineThickness = 2,
  glow = true,
  speed = 1,
  color = "#4ADE80",
  quality = "high",
  intensity = 0.5,
  interactive = false,
  theme = "auto",
  reducedMotion = "auto",
}: RetroGridProps) {
  const reduced = useReducedMotionPreference(reducedMotion);
  const safePerspective = Math.max(300, perspective);
  const safeLine = Math.max(0.5, lineThickness);
  const safeSpeed = Math.max(0.35, speed);
  const safeIntensity = clamp01(intensity);
  const layers = qualityLayers(quality, 3, 2, 1);
  const q = qualityWeight(quality);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "radial-gradient(circle at 50% 68%, #130C21 0%, #080A11 44%, #020205 100%)",
        perspective: `${safePerspective}px`,
      }}
    >
      <style>{retroGridKeyframes}</style>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "56%",
          width: "58%",
          height: "58%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          pointerEvents: "none",
          background: `radial-gradient(circle, ${alphaColor(color, safeIntensity * 0.45)}, transparent 70%)`,
          filter: "blur(18px)",
          mixBlendMode: theme === "light" ? "multiply" : "screen",
          zIndex: 1,
          animation: reduced ? undefined : `bl-retro-bloom ${7 / safeSpeed}s ease-in-out infinite`,
        }}
      />

      {Array.from({ length: layers }).map((_, index) => {
        const planeOpacity = safeIntensity * q * (0.7 - index * 0.16);
        const spacing = 38 + index * 10;

        return (
          <div
            key={`retro-plane-${index}`}
            style={{
              position: "absolute",
              left: "-30%",
              right: "-30%",
              bottom: "-30%",
              top: "44%",
              pointerEvents: "none",
              transform: `rotateX(74deg) translateY(${index * 16}px)`,
              transformOrigin: "center bottom",
              backgroundImage: `linear-gradient(${alphaColor(color, planeOpacity)} ${safeLine}px, transparent ${safeLine}px), linear-gradient(90deg, ${alphaColor(
                color,
                planeOpacity * 0.9,
              )} ${safeLine}px, transparent ${safeLine}px)`,
              backgroundSize: `${spacing}px ${spacing}px`,
              filter: glow ? `drop-shadow(0 0 ${4 + index * 4}px ${alphaColor(color, 0.7)})` : "none",
              zIndex: 2 + index,
              animation: reduced ? undefined : `bl-retro-scan ${(8 + index * 1.4) / safeSpeed}s linear infinite`,
              ["--travel" as string]: `${spacing * 2}px`,
              ["--o1" as string]: `${planeOpacity * 0.85}`,
              ["--o2" as string]: `${planeOpacity}`,
            }}
          />
        );
      })}

      {glow && quality !== "low" && (
        <div
          style={{
            position: "absolute",
            inset: "-18%",
            pointerEvents: "none",
            background: `radial-gradient(ellipse at 50% 62%, ${alphaColor(color, 0.18)}, transparent 60%)`,
            mixBlendMode: theme === "light" ? "multiply" : "screen",
            zIndex: layers + 3,
            animation: reduced ? undefined : `bl-retro-bloom ${6 / safeSpeed}s ease-in-out infinite`,
          }}
        />
      )}
    </div>
  );
}
