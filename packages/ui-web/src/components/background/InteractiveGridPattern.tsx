"use client";

import React, { useEffect, useRef } from "react";
import { InteractiveGridPatternProps } from "./InteractiveGridPattern.type";
import {
  alphaColor,
  clamp01,
  maskStyle,
  qualityWeight,
  useReducedMotionPreference,
} from "./background.shared";

export function InteractiveGridPattern({
  className = "",
  cellSize = 30,
  radius = 100,
  intensity = 0.8,
  quality = "high",
  mask = "none",
  color = "var(--color-brand)",
  interactive = true,
  theme = "auto",
  reducedMotion = "auto",
}: InteractiveGridPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: -9999, y: -9999 });
  const reduced = useReducedMotionPreference(reducedMotion);

  const safeCell = Math.max(8, cellSize);
  const safeRadius = Math.max(30, radius);
  const safeIntensity = clamp01(intensity);
  const qualityFactor = qualityWeight(quality);
  const maskOverlay = maskStyle(mask, 0.36);

  useEffect(() => {
    if (!interactive) return;

    const onPointerMove = (event: PointerEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [interactive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resolveColor = (): string => {
      if (!color.startsWith("var(")) return color;
      if (typeof window === "undefined") return "#CC4A48";
      const variableName = color.slice(4, -1).trim();
      const computed = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
      return computed || "#CC4A48";
    };

    let raf = 0;
    let baseColor = resolveColor();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, quality === "high" ? 2 : 1.5);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      baseColor = resolveColor();
    };

    const draw = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      const cols = Math.ceil(rect.width / safeCell) + 1;
      const rows = Math.ceil(rect.height / safeCell) + 1;

      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = "var(--c-surface)";
      ctx.fillRect(0, 0, rect.width, rect.height);

      const pulse = reduced ? 0.18 : (Math.sin(time * 0.0014) + 1) * 0.09;

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const x = col * safeCell;
          const y = row * safeCell;
          const centerX = x + safeCell / 2;
          const centerY = y + safeCell / 2;

          const dx = pointerRef.current.x - centerX;
          const dy = pointerRef.current.y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const interactiveBoost = interactive ? Math.max(0, 1 - distance / safeRadius) : 0;

          const alpha = Math.min(
            1,
            safeIntensity * qualityFactor * (0.11 + pulse + interactiveBoost * 0.6),
          );

          if (alpha < 0.02 && quality === "low") continue;

          ctx.strokeStyle = alphaColor(baseColor, alpha);
          ctx.lineWidth = quality === "high" ? 1.2 : 1;

          if (quality !== "low") {
            ctx.shadowBlur = 6 * interactiveBoost;
            ctx.shadowColor = alphaColor(baseColor, 0.8);
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.strokeRect(x, y, safeCell, safeCell);
        }
      }

      ctx.shadowBlur = 0;

      if (!reduced) {
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
    color,
    interactive,
    quality,
    qualityFactor,
    reduced,
    safeCell,
    safeIntensity,
    safeRadius,
    theme,
  ]);

  return (
    <div className={className} style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
      {maskOverlay && <div style={{ ...maskOverlay, zIndex: 1 }} />}
    </div>
  );
}
