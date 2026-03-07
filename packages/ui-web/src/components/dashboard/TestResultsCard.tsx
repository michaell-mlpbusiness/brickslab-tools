import React from "react";
import type { TestResultsCardProps, TestResultItem } from "./TestResultsCard.type";

function getColorByPercent(percent: number): string {
  if (percent >= 90) return "var(--color-excellent)";
  if (percent >= 80) return "var(--color-success)";
  if (percent >= 50) return "var(--color-warning)";
  return "var(--color-error)";
}

export function TestResultsCard({ results, title = "Résultats des tests" }: TestResultsCardProps) {
  const average =
    results.length === 0
      ? 0
      : Math.round(results.reduce((acc, r) => acc + r.percent, 0) / results.length);

  return (
    <div
      style={{
        background: "linear-gradient(145deg, var(--c-brand-subtle), var(--c-surface-elevated))",
        border: "1px solid var(--c-border)",
        borderRadius: "var(--radius-md)",
        padding: "var(--space-5)",
        color: "var(--color-fg)",
        boxShadow: "var(--shadow-2)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)" }}>
        <div>
          <p style={{ margin: 0, fontSize: "var(--fontsize-xs)", color: "var(--color-muted)", letterSpacing: "0.05em" }}>
            Qualité
          </p>
          <p style={{ margin: 0, fontSize: "var(--fontsize-lg)", fontWeight: "var(--fontweight-black)" }}>{title}</p>
        </div>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            border: "6px solid var(--c-brand-subtle)",
            display: "grid",
            placeItems: "center",
            position: "relative",
            overflow: "hidden",
            background: "var(--c-surface)",
          }}
          aria-label={`Taux moyen de réussite des tests ${average}%`}
        >
          <span style={{ fontSize: "var(--fontsize-lg)", fontWeight: "var(--fontweight-black)", color: getColorByPercent(average) }}>{average}%</span>
          <span style={{ fontSize: "var(--fontsize-xs)", color: "var(--color-muted)" }}>pass</span>
        </div>
      </div>

      <div style={{ display: "grid", gap: "var(--space-3)" }}>
        {results.map((r) => (
          <div
            key={r.label}
            style={{
              display: "flex",
              gap: "var(--space-3)",
              alignItems: "center",
              background: "var(--c-surface)",
              borderRadius: "var(--radius-sm)",
              padding: "var(--space-2) var(--space-3)",
              border: "1px solid var(--c-border)",
            }}
          >
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: "var(--fontweight-semibold)" }}>{r.label}</p>
              <div
                style={{
                  height: 6,
                  background: "var(--c-border)",
                  borderRadius: "var(--radius-full)",
                  overflow: "hidden",
                  marginTop: "var(--space-2)",
                }}
              >
                <div
                  style={{
                    width: `${r.percent}%`,
                    height: "100%",
                    background: getColorByPercent(r.percent),
                  }}
                  aria-hidden
                />
              </div>
            </div>
            <span style={{ fontWeight: "var(--fontweight-semibold)", minWidth: 48, textAlign: "right", color: getColorByPercent(r.percent) }}>{r.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
