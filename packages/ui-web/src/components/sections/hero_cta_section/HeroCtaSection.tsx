import React from "react";
import { HeroCtaSectionProps } from "./HeroCtaSection.type";

export function HeroCtaSection({
  title,
  subtitle,
  ctaLabel,
  onCtaClick,
  secondaryLabel,
  onSecondaryClick,
  align,
  hoverEffect = false,
}: HeroCtaSectionProps) {
  // base styles for the two buttons; hover logic is added conditionally below
  const primaryBase: React.CSSProperties = {
    padding: "12px 28px",
    fontSize: 15,
    fontWeight: 600,
    background: "var(--color-brand)",
    color: "white",
    border: "none",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
  };
  const secondaryBase: React.CSSProperties = {
    padding: "12px 28px",
    fontSize: 15,
    fontWeight: 600,
    background: "transparent",
    color: "var(--color-fg)",
    border: "1px solid var(--c-border)",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
  };

  return (
    <section
      style={{
        padding: "80px 24px",
        textAlign: align ?? "center",
      }}
    >
      <h1
        style={{
          fontSize: "var(--fontsize-5xl)",
          fontWeight: "var(--fontweight-black)",
          color: "var(--color-fg)",
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            fontSize: "var(--fontsize-2xl)",
            color: "var(--color-muted)",
            marginTop: 16,
            marginBottom: 0,
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
      )}
      {(ctaLabel || secondaryLabel) && (
        <div style={{ marginTop: 32, display: "inline-flex", gap: 12, flexWrap: "wrap", justifyContent: align === "left" ? "flex-start" : "center" }}>
          {ctaLabel && (
            <button
              onClick={onCtaClick}
              style={{
                ...primaryBase,
                ...(hoverEffect ? { transition: "filter 0.2s" } : {}),
              }}
              {...(hoverEffect
                ? {
                    onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
                      (e.currentTarget as HTMLElement).style.filter = "brightness(0.9)";
                    },
                    onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
                      (e.currentTarget as HTMLElement).style.filter = "brightness(1)";
                    },
                  }
                : {})}
            >
              {ctaLabel}
            </button>
          )}
          {secondaryLabel && (
            <button
              onClick={onSecondaryClick}
              style={{
                ...secondaryBase,
                ...(hoverEffect
                  ? { transition: "background 0.2s, color 0.2s, opacity 0.2s" }
                  : {}),
              }}
              {...(hoverEffect
                ? {
                    onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
                      (e.currentTarget as HTMLElement).style.opacity = "0.8";
                    },
                    onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
                      (e.currentTarget as HTMLElement).style.opacity = "1";
                    },
                  }
                : {})}
            >
              {secondaryLabel}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
