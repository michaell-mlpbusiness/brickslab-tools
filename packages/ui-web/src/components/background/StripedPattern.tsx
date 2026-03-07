"use client";

import React from "react";
import { StripedPatternProps } from "./StripedPattern.type";
import {
  alphaColor,
  clamp01,
  maskStyle,
  qualityLayers,
  qualityWeight,
  useReducedMotionPreference,
} from "./background.shared";

const stripedPatternKeyframes = `
@keyframes bl-stripe-slide {
  0%, 100% { background-position: 0px 0px; opacity: var(--o1); }
  50% { background-position: var(--shift) var(--shiftY); opacity: var(--o2); }
}
@keyframes bl-stripe-tilt {
  0%, 100% { opacity: 0.06; transform: rotate(var(--angle1)); }
  50% { opacity: 0.14; transform: rotate(var(--angle2)); }
}
`;

export function StripedPattern({
  className = "",
  angle = 45,
  stripeWidth = 10,
  gap = 10,
  color = "var(--color-brand)",
  opacity = 0.2,
  animate = false,
  speed = 1,
  quality = "high",
  mask = "none",
  interactive = false,
  theme = "auto",
  reducedMotion = "auto",
}: StripedPatternProps) {
  const reduced = useReducedMotionPreference(reducedMotion);
  const safeOpacity = clamp01(opacity);
  const safeStripe = Math.max(1, stripeWidth);
  const safeGap = Math.max(0, gap);
  const safeSpeed = Math.max(0.35, speed);
  const layers = qualityLayers(quality, 3, 2, 1);
  const q = qualityWeight(quality);
  const spacing = safeStripe + safeGap;
  const maskOverlay = maskStyle(mask, 0.42);

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
      <style>{stripedPatternKeyframes}</style>

      {Array.from({ length: layers }).map((_, index) => {
        const layerOpacity = safeOpacity * q * (0.95 - index * 0.2);
        const size = spacing + index * 8;

        return (
          <div
            key={`stripe-layer-${index}`}
            style={{
              position: "absolute",
              inset: "-30%",
              pointerEvents: "none",
              transform: `rotate(${angle + index * 3}deg)`,
              backgroundImage: `repeating-linear-gradient(90deg, ${alphaColor(
                color,
                layerOpacity,
              )} 0 ${safeStripe}px, transparent ${safeStripe}px ${size}px)`,
              mixBlendMode: theme === "light" ? "multiply" : "screen",
              filter: `blur(${quality === "low" ? 0 : index * 0.6}px)`,
              zIndex: index + 1,
              animation:
                animate && !reduced
                  ? `bl-stripe-slide ${(7 + index * 1.6) / safeSpeed}s ease-in-out infinite`
                  : undefined,
              ["--o1" as string]: `${layerOpacity * 0.75}`,
              ["--o2" as string]: `${layerOpacity}`,
              ["--shift" as string]: `${size}px`,
              ["--shiftY" as string]: `${size * 0.45}px`,
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          inset: "-15%",
          pointerEvents: "none",
          background: `linear-gradient(${angle}deg, transparent, ${alphaColor("#CC4A48", safeOpacity * 0.3)}, transparent)`,
          mixBlendMode: theme === "light" ? "multiply" : "screen",
          zIndex: layers + 1,
          animation: reduced ? undefined : `bl-stripe-tilt ${10 / safeSpeed}s ease-in-out infinite`,
          ["--angle1" as string]: `${angle - 2}deg`,
          ["--angle2" as string]: `${angle + 2}deg`,
        }}
      />

      {maskOverlay && <div style={{ ...maskOverlay, zIndex: layers + 2 }} />}
    </div>
  );
}
