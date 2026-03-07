import React from "react";
import type { IntroCardProps } from "./IntroCard.type";

export function IntroCard({
  title,
  description,
  highlight,
  cta,
  background = "var(--gradient-brand, linear-gradient(135deg, var(--color-brand) 0%, rgba(204, 74, 72, 0.8) 100%))",
}: IntroCardProps) {
  return (
    <div
      style={{
        borderRadius: "var(--radius-lg, 12px)",
        padding: "var(--space-4) var(--space-4)",
        background,
        color: "white",
        marginBottom: "var(--space-4)",
      }}
    >
      <h2
        style={{
          margin: 0,
          marginBottom: "var(--space-3)",
          fontSize: "var(--fontsize-2xl, 28px)",
          fontWeight: "var(--fontweight-bold, 700)",
        }}
      >
        {title}
      </h2>

      {description && (
        <p
          style={{
            margin: 0,
            marginBottom: highlight ? "12px" : 0,
            fontSize: "var(--fontsize-md, 16px)",
            opacity: 0.95,
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>
      )}

      {highlight && (
        <p
          style={{
            margin: 0,
            fontSize: "var(--fontsize-sm, 14px)",
            opacity: 0.8,
            fontStyle: "italic",
            lineHeight: 1.4,
          }}
        >
          {highlight}
        </p>
      )}

      {cta && (
        <a
          href={cta.href}
          style={{
            display: "inline-block",
            marginTop: "16px",
            color: "white",
            textDecoration: "none",
            fontSize: "var(--fontsize-sm, 14px)",
            fontWeight: "600",
            opacity: 0.9,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = "0.9";
          }}
        >
          {cta.label} →
        </a>
      )}
    </div>
  );
}
