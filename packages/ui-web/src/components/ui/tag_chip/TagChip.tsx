import React from "react";
import { TagChipProps } from "./TagChip.type";

const variantStyles: Record<
  NonNullable<TagChipProps["variant"]>,
  { color: string; background: string }
> = {
  default: { color: "var(--color-fg)", background: "var(--c-surface)" },
  brand: { color: "var(--color-brand)", background: "var(--c-brand-subtle)" },
  muted: { color: "var(--color-muted)", background: "transparent" },
};

const sizeStyles: Record<
  NonNullable<TagChipProps["size"]>,
  { fontSize: string; padding: string }
> = {
  sm: { fontSize: "var(--fontsize-xs)", padding: "2px 8px" },
  md: { fontSize: "var(--fontsize-xs)", padding: "3px 10px" },
};

export function TagChip({ label, variant = "default", size = "md" }: TagChipProps) {
  const { color, background } = variantStyles[variant];
  const { fontSize, padding } = sizeStyles[size];

  return (
    <span
      style={{
        display: "inline-block",
        fontSize,
        padding,
        color,
        background,
        border: "1px solid var(--c-border)",
        borderRadius: "var(--radius-sm)",
        fontWeight: "var(--fontweight-medium)",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
