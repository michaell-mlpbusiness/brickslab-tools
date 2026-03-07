import React from "react";
import type { BadgeProps, BadgeVariant, BadgeSize } from "./Badge.type";

const variantMap: Record<
  BadgeVariant,
  { bg: string; border: string; color: string }
> = {
  default: {
    bg: "var(--c-surface-elevated)",
    border: "var(--c-border)",
    color: "var(--color-fg)",
  },
  info: {
    bg: "var(--c-brand-subtle)",
    border: "var(--c-brand-border)",
    color: "var(--color-brand)",
  },
  success: {
    bg: "var(--c-success-subtle)",
    border: "var(--c-success-border)",
    color: "var(--color-success)",
  },
  warning: {
    bg: "var(--c-warning-subtle)",
    border: "var(--c-warning-border)",
    color: "var(--color-warning)",
  },
  error: {
    bg: "var(--c-brand-subtle)",
    border: "var(--c-brand-border)",
    color: "var(--color-error)",
  },
};

const sizeMap: Record<BadgeSize, { fontSize: string; padding: string; dotSize: number }> = {
  sm: { fontSize: "var(--fontsize-2xs)", padding: "1px 6px", dotSize: 6 },
  md: { fontSize: "var(--fontsize-xs)", padding: "2px 8px", dotSize: 8 },
  lg: { fontSize: "var(--fontsize-xs)", padding: "3px 10px", dotSize: 10 },
};

export function Badge({
  variant = "default",
  size = "md",
  children,
  dot = false,
  outlined = false,
  max,
}: BadgeProps) {
  const { bg, border, color } = variantMap[variant];
  const { fontSize, padding, dotSize } = sizeMap[size];

  let content: React.ReactNode = children;
  if (!dot && max !== undefined && typeof children === "number" && children > max) {
    content = `${max}+`;
  }

  if (dot) {
    return (
      <span
        data-bl-badge
        data-bl-badge-dot
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          backgroundColor: outlined ? "transparent" : color,
          border: `1.5px solid ${color}`,
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <span
      data-bl-badge
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize,
        fontWeight: "var(--fontweight-semibold)",
        lineHeight: 1,
        whiteSpace: "nowrap",
        padding,
        borderRadius: "var(--radius-full)",
        border: `1px solid ${border}`,
        backgroundColor: outlined ? "transparent" : bg,
        color,
        userSelect: "none" as const,
      }}
    >
      {content}
    </span>
  );
}
