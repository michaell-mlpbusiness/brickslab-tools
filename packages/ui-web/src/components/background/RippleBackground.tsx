"use client";

import React, { useEffect, useRef, useState } from "react";
import { RippleBackgroundProps } from "./RippleBackground.type";
import {
  PREMIUM_PALETTE,
  alphaColor,
  blendModeForTheme,
  normalizeUnitPoint,
  qualityLayers,
  qualityWeight,
  useReducedMotionPreference,
} from "./background.shared";

const rippleKeyframes = `
@keyframes bl-ripple-expand {
  0% { transform: translate(-50%, -50%) scale(0.08); opacity: var(--o1); }
  100% { transform: translate(-50%, -50%) scale(var(--s)); opacity: 0; }
}
@keyframes bl-ripple-pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(0.94); opacity: 0.12; }
  50% { transform: translate(-50%, -50%) scale(1.08); opacity: 0.24; }
}
`;

export function RippleBackground({
  className = "",
  center = { x: 0.5, y: 0.5 },
  amplitude = 80,
  frequency = 3,
  speed = 1,
  quality = "high",
  interactive = false,
  theme = "auto",
  reducedMotion = "auto",
}: RippleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const baseCenter = normalizeUnitPoint(center);
  const [pointerCenter, setPointerCenter] = useState(baseCenter);

  const reduced = useReducedMotionPreference(reducedMotion);
  const safeSpeed = Math.max(0.35, speed);
  const safeAmplitude = Math.max(24, amplitude);
  const safeFrequency = Math.max(1, Math.floor(frequency));
  const layers = qualityLayers(quality, 3, 2, 1);
  const ripples = Math.max(2, Math.floor(safeFrequency * (quality === "high" ? 2 : quality === "medium" ? 1.5 : 1)));
  const q = qualityWeight(quality);

  useEffect(() => {
    setPointerCenter(baseCenter);
  }, [baseCenter.x, baseCenter.y]);

  useEffect(() => {
    if (!interactive) return;

    const onPointerMove = (event: PointerEvent) => {
      const node = containerRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      setPointerCenter({
        x: Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)),
        y: Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height)),
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [interactive]);

  const centerX = (interactive ? pointerCenter.x : baseCenter.x) * 100;
  const centerY = (interactive ? pointerCenter.y : baseCenter.y) * 100;
  const blendMode = blendModeForTheme(theme);

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
          "radial-gradient(circle at 50% 45%, color-mix(in srgb, var(--c-surface-elevated) 74%, transparent), transparent 60%), linear-gradient(170deg, var(--c-surface) 0%, var(--c-surface-elevated) 100%)",
      }}
    >
      <style>{rippleKeyframes}</style>

      {Array.from({ length: layers }).map((_, layerIndex) =>
        Array.from({ length: ripples }).map((__, rippleIndex) => {
          const accent = PREMIUM_PALETTE[(layerIndex + rippleIndex) % PREMIUM_PALETTE.length];
          const alpha = (0.42 - layerIndex * 0.09) * q;
          const delay = (rippleIndex / ripples) * (1.2 + layerIndex * 0.2);
          const maxScale = (safeAmplitude / 80) * (2.6 + layerIndex * 0.4);

          return (
            <div
              key={`ripple-${layerIndex}-${rippleIndex}`}
              style={{
                position: "absolute",
                left: `${centerX}%`,
                top: `${centerY}%`,
                width: `${safeAmplitude * (1 + layerIndex * 0.14)}px`,
                height: `${safeAmplitude * (1 + layerIndex * 0.14)}px`,
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                border: `1px solid ${alphaColor(accent, alpha)}`,
                boxShadow: `0 0 ${12 + layerIndex * 6}px ${alphaColor(accent, alpha * 0.6)}`,
                pointerEvents: "none",
                mixBlendMode: blendMode,
                zIndex: layerIndex + 1,
                animation: reduced
                  ? undefined
                  : `bl-ripple-expand ${(3.4 + layerIndex * 0.7) / safeSpeed}s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s infinite`,
                ["--s" as string]: `${maxScale}`,
                ["--o1" as string]: `${alpha}`,
              }}
            />
          );
        }),
      )}

      <div
        style={{
          position: "absolute",
          left: `${centerX}%`,
          top: `${centerY}%`,
          width: "46%",
          height: "46%",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${alphaColor("#CC4A48", 0.24)}, ${alphaColor(
            "#4ADE80",
            0.08,
          )} 44%, transparent 74%)`,
          filter: "blur(26px)",
          pointerEvents: "none",
          mixBlendMode: blendMode,
          zIndex: layers + 2,
          animation: reduced ? undefined : `bl-ripple-pulse ${8 / safeSpeed}s ease-in-out infinite`,
        }}
      />
    </div>
  );
}
