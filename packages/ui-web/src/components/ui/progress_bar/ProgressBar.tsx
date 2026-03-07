import React, { useRef, useEffect, useState } from "react";
import { ProgressBarProps, ProgressBarColorScheme } from "./ProgressBar.type";

const colorMap: Record<ProgressBarColorScheme, string> = {
  brand: "#CC4A48",
  green: "#4ADE80",
  amber: "#F59E0B",
  red: "#CC4A48",
};

const trackColorMap: Record<ProgressBarColorScheme, string> = {
  brand: "var(--c-brand-subtle)",
  green: "var(--c-success-subtle)",
  amber: "var(--c-warning-subtle)",
  red: "var(--c-brand-subtle)",
};

const sizeMap = {
  sm: 4,
  md: 8,
};

export function ProgressBar({
  value,
  max = 100,
  label,
  colorScheme = "brand",
  size = "md",
  showValue = false,
  animate = true,
  duration = 0.8,
}: ProgressBarProps) {
  const clamped = Math.min(Math.max(value, 0), max);
  const percent = (clamped / max) * 100;
  const barColor = colorMap[colorScheme];
  const trackColor = trackColorMap[colorScheme];
  const height = sizeMap[size];

  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const shouldAnimate = animate && !reducedMotion;

  useEffect(() => {
    if (!shouldAnimate) {
      setActive(true);
      return;
    }
    const el = trackRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
        obs.disconnect();
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [shouldAnimate]);

  const displayWidth = active ? `${percent}%` : "0%";
  const transition = shouldAnimate
    ? `width ${duration}s cubic-bezier(0.25, 1, 0.5, 1)`
    : undefined;

  return (
    <div data-bl-progress-bar style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
      {(label || showValue) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {label && (
            <span
              style={{
                fontSize: "var(--fontsize-xs)",
                color: "var(--color-muted)",
                fontWeight: "var(--fontweight-medium)",
              }}
            >
              {label}
            </span>
          )}
          {showValue && (
            <span
              style={{
                fontSize: "var(--fontsize-xs)",
                color: "var(--color-muted)",
                fontWeight: "var(--fontweight-semibold)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {Math.round(percent)}%
            </span>
          )}
        </div>
      )}
      <div
        ref={trackRef}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        style={{
          width: "100%",
          height,
          borderRadius: "var(--radius-full)",
          backgroundColor: trackColor,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: displayWidth,
            borderRadius: "var(--radius-full)",
            backgroundColor: barColor,
            transition,
          }}
        />
      </div>
    </div>
  );
}
