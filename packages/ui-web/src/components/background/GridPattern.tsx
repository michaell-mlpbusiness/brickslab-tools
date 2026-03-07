"use client";

import React from "react";
import { GridPatternProps } from "./GridPattern.type";
import { alphaColor, clamp01, maskStyle } from "./background.shared";

export function GridPattern({
  className = "",
  size = 40,
  strokeWidth = 1,
  dashed = false,
  lineStyle,
  contrastMode = "custom",
  color = "var(--c-border)",
  opacity = 0.5,
  quality = "high",
  mask = "none",
  interactive = false,
  theme = "auto",
}: GridPatternProps) {
  const safeSize = Math.max(8, size);
  const safeStroke = Math.max(0.5, strokeWidth);
  const safeOpacity = clamp01(opacity);
  const maskOverlay = maskStyle(mask, 0.34);
  const useDashed = lineStyle ? lineStyle === "dashed" : dashed;

  const contrastBackground =
    contrastMode === "black-on-white"
      ? "#FFFFFF"
      : contrastMode === "white-on-black"
      ? "#0A0A0A"
      : null;
  const contrastLineColor =
    contrastMode === "black-on-white"
      ? "#111111"
      : contrastMode === "white-on-black"
      ? "#FFFFFF"
      : color;
  const isSimpleContrast = contrastMode !== "custom";
  const resolvedLineColor = alphaColor(contrastLineColor, safeOpacity);
  const spacing = safeSize + (quality === "low" ? 2 : quality === "high" ? 0 : 1);
  const linePattern = useDashed
    ? `repeating-linear-gradient(0deg, ${resolvedLineColor} 0 ${safeStroke}px, transparent ${safeStroke}px ${safeStroke + 8}px), repeating-linear-gradient(90deg, ${resolvedLineColor} 0 ${safeStroke}px, transparent ${safeStroke}px ${safeStroke + 8}px)`
    : `linear-gradient(${resolvedLineColor} ${safeStroke}px, transparent ${safeStroke}px), linear-gradient(90deg, ${resolvedLineColor} ${safeStroke}px, transparent ${safeStroke}px)`;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background:
          contrastBackground ??
          "linear-gradient(180deg, var(--c-surface) 0%, var(--c-surface-elevated) 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: linePattern,
          backgroundSize: `${spacing}px ${spacing}px`,
          mixBlendMode: isSimpleContrast ? "normal" : theme === "light" ? "multiply" : "normal",
        }}
      />

      {maskOverlay && !isSimpleContrast && <div style={{ ...maskOverlay, zIndex: 1 }} />}
    </div>
  );
}
