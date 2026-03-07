import React from "react";
import { PageHeroProps } from "./PageHero.type";

export function PageHero({ title, subtitle, eyebrow, stats, children }: PageHeroProps) {
  return (
    <div
      style={{
        position: "relative",
        padding: "clamp(40px, 6vw, 72px) clamp(24px, 4vw, 56px) clamp(32px, 4vw, 48px)",
        overflow: "hidden",
        borderBottom: "1px solid var(--c-border)",
      }}
    >
      {/* Gradient mesh */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at -5% -10%, rgba(204,74,72,0.1) 0%, transparent 55%), radial-gradient(ellipse at 105% 115%, rgba(204,74,72,0.04) 0%, transparent 45%)",
          pointerEvents: "none",
        }}
      />

      {/* Dot grid — fades toward right */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, var(--c-border) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.8,
          pointerEvents: "none",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 110% at 10% 50%, black 20%, transparent 75%)",
          maskImage:
            "radial-gradient(ellipse 75% 110% at 10% 50%, black 20%, transparent 75%)",
        }}
      />

      {/* Brand accent line */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, var(--color-brand) 0%, transparent 40%)",
          opacity: 0.4,
        }}
      />

      <div style={{ position: "relative" }}>
        {eyebrow && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-brand)",
              border: "1px solid var(--c-brand-border)",
              background: "var(--c-brand-subtle)",
              padding: "3px 12px",
              borderRadius: 20,
              marginBottom: 18,
            }}
          >
            {eyebrow}
          </div>
        )}

        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 52px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--color-fg)",
            margin: "0 0 14px 0",
            lineHeight: 1.05,
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            style={{
              fontSize: "clamp(14px, 2vw, 17px)",
              color: "var(--color-muted)",
              margin: 0,
              lineHeight: 1.65,
              maxWidth: 560,
            }}
          >
            {subtitle}
          </p>
        )}

        {stats && stats.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 32,
              marginTop: 32,
              paddingTop: 24,
              borderTop: "1px solid var(--c-border)",
              flexWrap: "wrap",
            }}
          >
            {stats.map((stat, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span
                  style={{
                    fontSize: "clamp(22px, 3vw, 32px)",
                    fontWeight: 700,
                    color: stat.color ?? "var(--color-fg)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--color-muted)",
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
