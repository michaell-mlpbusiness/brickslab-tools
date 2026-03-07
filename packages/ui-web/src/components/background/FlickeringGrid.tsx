"use client";

import React, { useEffect, useRef } from "react";
import { FlickeringGridProps } from "./FlickeringGrid.type";
import { clamp01, maskStyle, qualityWeight, useReducedMotionPreference } from "./background.shared";

export function FlickeringGrid({
  className = "",
  cellSize = 50,
  gap = 10,
  opacity = 0.1,
  flickerRate = 0.5,
  rounded = false,
  color = "var(--color-brand)",
  quality = "high",
  mask = "none",
  interactive = false,
  theme = "auto",
  reducedMotion = "auto",
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: -9999, y: -9999 });
  const reduced = useReducedMotionPreference(reducedMotion);

  const safeCell = Math.max(6, cellSize);
  const safeGap = Math.max(0, gap);
  const safeOpacity = clamp01(opacity);
  const safeRate = Math.max(0.08, flickerRate);
  const qualityFactor = qualityWeight(quality);
  const maskOverlay = maskStyle(mask, 0.4);

  useEffect(() => {
    if (!interactive) return;

    const onMove = (event: PointerEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
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
    const phases: number[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, quality === "high" ? 2 : 1.5);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const step = safeCell + safeGap;
      const cols = Math.ceil(rect.width / step) + 1;
      const rows = Math.ceil(rect.height / step) + 1;
      phases.length = cols * rows;

      for (let i = 0; i < phases.length; i += 1) {
        phases[i] = (Math.sin(i * 78.233) + 1) * Math.PI;
      }

      baseColor = resolveColor();
    };

    const draw = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      const step = safeCell + safeGap;
      const cols = Math.ceil(rect.width / step) + 1;
      const rows = Math.ceil(rect.height / step) + 1;

      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = "var(--c-surface)";
      ctx.fillRect(0, 0, rect.width, rect.height);

      ctx.save();
      ctx.fillStyle = baseColor;

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          if (quality === "low" && (row + col) % 2 !== 0) continue;

          const index = row * cols + col;
          const phase = phases[index] ?? 0;
          const x = col * step;
          const y = row * step;

          const wave = reduced
            ? 0.35
            : (Math.sin(time * 0.0014 * safeRate * 6 + phase) + Math.sin(time * 0.0008 + phase * 0.6)) * 0.25 + 0.5;

          let alpha = safeOpacity * qualityFactor * (0.15 + wave * 0.95);

          if (interactive) {
            const dx = pointerRef.current.x - x;
            const dy = pointerRef.current.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const focus = Math.max(0, 1 - distance / Math.max(120, safeCell * 3));
            alpha += focus * 0.28;
          }

          ctx.globalAlpha = Math.min(1, alpha);

          if (rounded) {
            const radius = Math.max(2, safeCell * 0.2);
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + safeCell - radius, y);
            ctx.quadraticCurveTo(x + safeCell, y, x + safeCell, y + radius);
            ctx.lineTo(x + safeCell, y + safeCell - radius);
            ctx.quadraticCurveTo(x + safeCell, y + safeCell, x + safeCell - radius, y + safeCell);
            ctx.lineTo(x + radius, y + safeCell);
            ctx.quadraticCurveTo(x, y + safeCell, x, y + safeCell - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
            ctx.fill();
          } else {
            ctx.fillRect(x, y, safeCell, safeCell);
          }
        }
      }

      ctx.restore();
      ctx.globalAlpha = 1;

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
    rounded,
    safeCell,
    safeGap,
    safeOpacity,
    safeRate,
    theme,
  ]);

  return (
    <div
      className={className}
      style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      />
      {maskOverlay && <div style={{ ...maskOverlay, zIndex: 1 }} />}
    </div>
  );
}
