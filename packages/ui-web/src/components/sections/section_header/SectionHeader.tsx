import React from "react";
import { SectionHeaderProps } from "./SectionHeader.type";

export function SectionHeader({ title, subtitle, align, eyebrow, variant, count }: SectionHeaderProps) {
  if (variant === "compact") {
    return (
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 16, paddingBottom: 10, borderBottom: "1px solid var(--c-border)" }}>
        <h2 style={{ fontSize: 15, fontWeight: "var(--fontweight-bold)", color: "var(--color-fg)", margin: 0, letterSpacing: "-0.01em" }}>
          {title}
        </h2>
        {count !== undefined && (
          <span style={{ fontSize: 11, fontWeight: 600, color: "var(--color-brand)", background: "var(--c-brand-subtle)", border: "1px solid var(--c-brand-border)", padding: "1px 8px", borderRadius: 20 }}>
            {count}
          </span>
        )}
      </div>
    );
  }

  return (
    <div style={{ textAlign: align ?? "left" }}>
      {eyebrow && (
        <div
          style={{
            textTransform: "uppercase",
            color: "var(--color-brand)",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.1em",
            marginBottom: 8,
          }}
        >
          {eyebrow}
        </div>
      )}
      <h2
        style={{
          fontSize: "var(--fontsize-3xl)",
          fontWeight: "var(--fontweight-bold)",
          color: "var(--color-fg)",
          margin: 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontSize: "var(--fontsize-xl)",
            color: "var(--color-muted)",
            marginTop: 12,
            marginBottom: 0,
            lineHeight: 1.6,
            maxWidth: 560,
            ...(align === "center" ? { marginLeft: "auto", marginRight: "auto" } : {}),
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
