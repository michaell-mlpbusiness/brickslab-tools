import React from "react";
import { DocPageHeaderProps, DocPageHeaderBadgeVariant } from "./DocPageHeader.type";

const badgeVariantMap: Record<
  DocPageHeaderBadgeVariant,
  { color: string; bg: string; border: string }
> = {
  default: {
    color: "var(--color-muted)",
    bg: "var(--c-surface-elevated)",
    border: "var(--c-border)",
  },
  brand: {
    color: "#CC4A48",
    bg: "var(--c-brand-subtle)",
    border: "var(--c-brand-border)",
  },
  success: {
    color: "var(--color-success)",
    bg: "var(--c-success-subtle)",
    border: "var(--c-success-border)",
  },
  warning: {
    color: "var(--color-warning)",
    bg: "var(--c-warning-subtle)",
    border: "var(--c-warning-border)",
  },
  error: {
    color: "var(--color-error)",
    bg: "var(--c-brand-subtle)",
    border: "var(--c-brand-border)",
  },
};

export function DocPageHeader({
  name,
  description,
  packageName,
  badges = [],
}: DocPageHeaderProps) {
  return (
    <div data-bl-doc-page-header style={{ marginBottom: "var(--space-6)" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "var(--space-2)",
          marginBottom: "var(--space-3)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "var(--fontsize-2xl)",
            fontWeight: "var(--fontweight-black)",
            color: "var(--color-fg)",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          {name}
        </h1>

        {packageName && (
          <span
            style={{
              fontSize: "var(--fontsize-2xs)",
              fontWeight: "var(--fontweight-semibold)",
              color: "#CC4A48",
              background: "var(--c-brand-subtle)",
              border: "1px solid var(--c-brand-border)",
              borderRadius: "var(--radius-sm)",
              padding: "2px 8px",
              fontFamily: "var(--font-mono), ui-monospace, monospace",
              whiteSpace: "nowrap",
            }}
          >
            {packageName}
          </span>
        )}

        {badges.map((badge, i) => {
          const { color, bg, border } = badgeVariantMap[badge.variant ?? "default"];
          return (
            <span
              key={i}
              style={{
                fontSize: "var(--fontsize-2xs)",
                fontWeight: "var(--fontweight-semibold)",
                color,
                background: bg,
                border: `1px solid ${border}`,
                borderRadius: "var(--radius-full)",
                padding: "2px 8px",
                whiteSpace: "nowrap",
              }}
            >
              {badge.label}
            </span>
          );
        })}
      </div>

      <p
        style={{
          margin: 0,
          fontSize: "var(--fontsize-md)",
          color: "var(--color-muted)",
          lineHeight: 1.65,
          maxWidth: 640,
        }}
      >
        {description}
      </p>
    </div>
  );
}
