import React from "react";
import type { KpiCardProps, KpiColorScheme } from "./KpiCard.type";
import { ProgressBar } from "../ui/progress_bar/ProgressBar";
import { NumberTicker } from "../animated_text/number_ticker/NumberTicker";

type ResolvedScheme = Exclude<KpiColorScheme, "auto">;

function resolveScheme(colorScheme: KpiColorScheme | undefined, progress: number | undefined): ResolvedScheme {
  if (!colorScheme || colorScheme === "brand") return "brand";
  if (colorScheme !== "auto") return colorScheme;
  if (progress === undefined) return "brand";
  if (progress >= 80) return "green";
  if (progress >= 60) return "amber";
  return "red";
}

const schemeColor: Record<ResolvedScheme, string> = {
  brand: "var(--color-brand)",
  green: "#4ADE80",
  amber: "#F59E0B",
  red: "#CC4A48",
};

export function KpiCard({ label, value, helper, eyebrow, icon, suffix, progress, loading, animate, colorScheme }: KpiCardProps) {
  const showProgress = progress !== undefined && !loading;
  const scheme = resolveScheme(colorScheme, progress);
  const accentColor = colorScheme ? schemeColor[scheme] : "var(--color-fg)";
  const numericValue = animate ? parseFloat(value) : NaN;
  const canAnimate = animate && !isNaN(numericValue) && !loading;

  return (
    <div
      style={{
        background: "var(--c-surface)",
        border: "1px solid var(--c-border)",
        borderRadius: "var(--radius-md)",
        padding: "var(--space-4)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)",
        boxShadow: "var(--shadow-2)",
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {eyebrow && (
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.13em", color: "var(--color-muted)" }}>
              {eyebrow}
            </span>
          )}
          <span style={{ fontSize: eyebrow ? 14 : "var(--fontsize-xs)", fontWeight: eyebrow ? 600 : 400, letterSpacing: eyebrow ? 0 : "0.08em", color: eyebrow ? "var(--color-fg)" : "var(--color-muted)", textTransform: eyebrow ? undefined : "uppercase" }}>
            {label}
          </span>
        </div>
        {icon && (
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: "var(--c-brand-subtle)",
              border: "1px solid var(--c-brand-border)",
              display: "grid",
              placeItems: "center",
              color: "var(--color-brand)",
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Value row */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{ fontSize: suffix ? 52 : 24, fontWeight: "var(--fontweight-black)", letterSpacing: suffix ? "-0.04em" : undefined, lineHeight: suffix ? 1 : undefined, color: accentColor }}>
          {canAnimate
            ? <NumberTicker value={numericValue} duration={1.2} startOnView />
            : value}
        </span>
        {suffix && (
          <span style={{ fontSize: 15, color: "var(--color-muted)", fontWeight: 500 }}>{suffix}</span>
        )}
      </div>

      {/* Progress bar */}
      {showProgress && (
        <ProgressBar value={progress!} max={100} colorScheme={scheme} size="sm" />
      )}

      {/* Helper */}
      {helper && <span style={{ color: "var(--color-muted)", fontSize: "var(--fontsize-xs)" }}>{helper}</span>}
    </div>
  );
}
