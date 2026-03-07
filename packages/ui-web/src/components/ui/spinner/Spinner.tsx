import React from "react";
import type { SpinnerProps, SpinnerSize, SpinnerVariant, SpinnerSpeed } from "./Spinner.type";

const spinnerStyles = `
@keyframes bl-spin {
  to { transform: rotate(360deg); }
}
[data-bl-spinner] {
  animation: bl-spin var(--bl-spinner-duration) linear infinite;
  border-radius: 50%;
  flex-shrink: 0;
}
`;

const sizeMap: Record<SpinnerSize, { px: number; stroke: number }> = {
  sm: { px: 16, stroke: 2 },
  md: { px: 24, stroke: 2.5 },
  lg: { px: 32, stroke: 3 },
  xl: { px: 48, stroke: 4 },
};

const variantMap: Record<SpinnerVariant, string> = {
  default: "var(--color-muted)",
  brand:   "var(--color-brand)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  error:   "var(--color-error)",
  white:   "#FBFBFB",
};

const speedMap: Record<SpinnerSpeed, string> = {
  slow:   "1.2s",
  normal: "0.7s",
  fast:   "0.35s",
};

export function Spinner({
  size = "md",
  variant = "brand",
  speed = "normal",
  label = "Chargement…",
}: SpinnerProps) {
  const { px, stroke } = sizeMap[size];
  const color = variantMap[variant];
  const duration = speedMap[speed];

  return (
    <>
      <style>{spinnerStyles}</style>
      <span
        data-bl-spinner
        role="status"
        aria-label={label}
        style={{
          display: "inline-block",
          width: px,
          height: px,
          border: `${stroke}px solid var(--c-border)`,
          borderTopColor: color,
          "--bl-spinner-duration": duration,
        } as React.CSSProperties}
      />
    </>
  );
}
