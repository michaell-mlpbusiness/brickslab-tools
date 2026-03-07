import React from "react";
import { FiArrowRight } from "react-icons/fi";
import type { ComponentsCountCardProps } from "./ComponentsCountCard.type";
import { NumberTicker } from "../animated_text/number_ticker/NumberTicker";

export function ComponentsCountCard({
  count,
  subtitle = "Composants publiés",
  variant = "default",
  animate = false,
  sections,
  cta,
}: ComponentsCountCardProps) {
  if (variant === "dark") {
    const maxCount = sections && sections.length > 0 ? Math.max(...sections.map(s => s.count)) : 1;
    return (
      <div
        style={{
          borderRadius: "var(--radius-md)",
          background: "linear-gradient(145deg, #160909 0%, #0e0e0e 55%, #1a0808 100%)",
          padding: "clamp(24px, 4vw, 40px)",
          height: "100%",
          minHeight: 280,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", top: -60, left: -60, width: 340, height: 340, background: "radial-gradient(circle, rgba(204,74,72,0.22) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", bottom: -80, right: -60, width: 280, height: 280, background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", display: "flex", flexDirection: "column", height: "100%", gap: 0 }}>
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#CC4A48", display: "block", marginBottom: 20 }}>
            ◈ Inventaire UI
          </span>

          <div style={{ marginBottom: 6 }}>
            <span style={{ fontSize: "clamp(72px, 10vw, 108px)", fontWeight: 900, letterSpacing: "-0.05em", color: "#FBFBFB", lineHeight: 0.9, display: "block" }}>
              {animate ? <NumberTicker value={count} duration={1.5} startOnView /> : count}
            </span>
          </div>
          <span style={{ fontSize: 15, fontWeight: 400, color: "rgba(251,251,251,0.42)", letterSpacing: "0.01em", display: "block", marginBottom: 28 }}>
            {subtitle}
          </span>

          {sections && sections.length > 0 && (
            <>
              <div style={{ height: 1, background: "linear-gradient(90deg, rgba(204,74,72,0.5), rgba(255,255,255,0.05) 60%, transparent)", marginBottom: 20 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1 }}>
                {sections.map(({ label, count: cnt }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 11, color: "rgba(251,251,251,0.45)", flex: "0 0 110px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {label}
                    </span>
                    <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(cnt / maxCount) * 100}%`, background: "linear-gradient(90deg, #CC4A48, #F59E0B)", borderRadius: 4 }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(251,251,251,0.3)", minWidth: 22, textAlign: "right" }}>
                      {cnt}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {cta && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#FBFBFB", padding: "9px 18px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "var(--radius-md)", width: "fit-content" }}>
              {cta} <FiArrowRight size={13} />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "var(--c-surface)",
        border: "1px solid var(--c-border)",
        borderRadius: "var(--radius-md)",
        padding: "var(--space-5)",
        minWidth: 220,
        boxShadow: "var(--shadow-2)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "var(--radius-md)",
            background: "var(--c-brand-subtle)",
            display: "grid",
            placeItems: "center",
            color: "var(--color-brand)",
            fontWeight: "var(--fontweight-bold)",
          }}
        >
          UI
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
          <span style={{ fontSize: "var(--fontsize-xs)", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Inventaire
          </span>
          <span style={{ fontSize: "var(--fontsize-sm)", color: "var(--color-fg)", opacity: 0.85 }}>{subtitle}</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-2)" }}>
        <span style={{ fontSize: 42, fontWeight: "var(--fontweight-black)", letterSpacing: "-0.04em", color: "var(--color-fg)" }}>
          {animate ? <NumberTicker value={count} duration={1.2} startOnView /> : count}
        </span>
        <span style={{ fontSize: "var(--fontsize-xs)", color: "var(--color-muted)" }}>composants</span>
      </div>
    </div>
  );
}
