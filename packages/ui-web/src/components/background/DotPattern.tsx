"use client";

import React from "react";
import { DotPatternProps } from "./DotPattern.type";
import { alphaColor, clamp01, maskStyle } from "./background.shared";

export function DotPattern({
  className = "",
  dotSize,
  dotWeight = "medium",
  gap = 20,
  offset = 0,
  color = "var(--c-border)",
  quality = "high",
  mask = "none",
  opacity = 0.4,
  interactive = false,
  theme = "auto",
}: DotPatternProps) {
  const dotWeightMap: Record<NonNullable<DotPatternProps["dotWeight"]>, number> = {
    "very-thin": 1,
    thin: 2,
    medium: 3,
  };
  const resolvedDotSize = dotSize ?? dotWeightMap[dotWeight];
  const safeDot = Math.max(1, resolvedDotSize);
  const safeGap = Math.max(2, gap);
  const safeOpacity = clamp01(opacity);
  const spacing = safeDot + safeGap + (quality === "low" ? 2 : quality === "high" ? 0 : 1);
  const maskOverlay = maskStyle(mask, 0.34);
  const dotColor = alphaColor(color, safeOpacity);
  const blendMode = theme === "light" ? "multiply" : "normal";

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "var(--c-surface)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: interactive ? "auto" : "none",
          backgroundImage: `radial-gradient(circle at center, ${dotColor} ${safeDot}px, transparent ${safeDot + 0.5}px)`,
          backgroundSize: `${spacing}px ${spacing}px`,
          backgroundPosition: `${offset}px ${offset}px`,
          mixBlendMode: blendMode,
        }}
      />

      {maskOverlay && <div style={{ ...maskOverlay, zIndex: 1 }} />}
    </div>
  );
}
