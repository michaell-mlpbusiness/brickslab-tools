"use client";

import React, { useEffect, useRef, useState } from "react";
import { LightRaysBackgroundProps } from "./LightRaysBackground.type";
import {
  alphaColor,
  blendModeForTheme,
  clamp01,
  maskStyle,
  qualityLayers,
  qualityWeight,
  useReducedMotionPreference,
} from "./background.shared";

const lightRaysKeyframes = `
@keyframes bl-ray-flow {
  0% { transform: translate3d(-50%, -120%, 0) skewX(-12deg); opacity: 0; }
  20% { opacity: var(--ray-opacity); }
  80% { opacity: calc(var(--ray-opacity) * 0.8); }
  100% { transform: translate3d(-50%, 140%, 0) skewX(-12deg); opacity: 0; }
}
@keyframes bl-ray-bloom {
  0%, 100% { opacity: 0.16; transform: translateX(-50%) scale(0.95); }
  50% { opacity: 0.3; transform: translateX(-50%) scale(1.06); }
}
`;

export function LightRaysBackground({
  className = "",
  rayCount = 8,
  speed = 1,
  blur = 8,
  opacity = 0.3,
  color = "rgba(255,255,255,1)",
  quality = "high",
  mask = "none",
  interactive = false,
  theme = "auto",
  reducedMotion = "auto",
}: LightRaysBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pointerX, setPointerX] = useState(50);

  const reduced = useReducedMotionPreference(reducedMotion);
  const safeOpacity = clamp01(opacity);
  const safeBlur = Math.max(0, blur);
  const safeSpeed = Math.max(0.35, speed);
  const rays = Math.max(2, Math.floor(rayCount * qualityWeight(quality)));
  const layers = qualityLayers(quality, 3, 2, 1);
  const blendMode = blendModeForTheme(theme);

  useEffect(() => {
    if (!interactive) return;

    const onMove = (event: PointerEvent) => {
      const node = containerRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const next = ((event.clientX - rect.left) / rect.width) * 100;
      setPointerX(Math.max(0, Math.min(100, next)));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [interactive]);

  const maskOverlay = maskStyle(mask, 0.42);

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
          "radial-gradient(circle at 50% -10%, color-mix(in srgb, var(--c-surface-elevated) 64%, transparent), transparent 60%), linear-gradient(180deg, var(--c-surface) 0%, color-mix(in srgb, var(--c-surface-elevated) 70%, var(--c-surface)) 100%)",
      }}
    >
      <style>{lightRaysKeyframes}</style>

      {Array.from({ length: layers }).map((_, layerIndex) =>
        Array.from({ length: rays }).map((__, rayIndex) => {
          const width = quality === "low" ? 80 : 124 + layerIndex * 26;
          const x = (rayIndex / rays) * 100;
          const baseAlpha = safeOpacity * (0.92 - layerIndex * 0.2);
          const delay = (rayIndex / rays) * (0.8 + layerIndex * 0.3);

          return (
            <div
              key={`ray-${layerIndex}-${rayIndex}`}
              style={{
                position: "absolute",
                top: "-60%",
                left: `${x}%`,
                width,
                height: "180%",
                transform: "translateX(-50%) skewX(-12deg)",
                background: `linear-gradient(to bottom, transparent, ${alphaColor(
                  color,
                  baseAlpha,
                )} 36%, ${alphaColor(color, baseAlpha * 0.2)} 66%, transparent)`,
                filter: `blur(${safeBlur * (1 + layerIndex * 0.18)}px)`,
                mixBlendMode: blendMode,
                pointerEvents: "none",
                zIndex: layerIndex + 1,
                animation: reduced
                  ? undefined
                  : `bl-ray-flow ${(5.5 + layerIndex * 0.9) / safeSpeed}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s infinite`,
                ["--ray-opacity" as string]: `${baseAlpha}`,
              }}
            />
          );
        }),
      )}

      <div
        style={{
          position: "absolute",
          top: "-20%",
          bottom: "-10%",
          left: interactive ? `${pointerX}%` : "50%",
          width: "70%",
          transform: "translateX(-50%)",
          background: `radial-gradient(ellipse at 50% 0%, ${alphaColor(color, safeOpacity * 0.4)}, transparent 72%)`,
          filter: `blur(${safeBlur * 1.4}px)`,
          mixBlendMode: blendMode,
          pointerEvents: "none",
          zIndex: layers + 1,
          animation: reduced ? undefined : `bl-ray-bloom ${8 / safeSpeed}s ease-in-out infinite`,
        }}
      />

      {maskOverlay && <div style={{ ...maskOverlay, zIndex: layers + 2 }} />}
    </div>
  );
}
