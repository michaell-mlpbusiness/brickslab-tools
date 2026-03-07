import React from "react";
import { LatestComponentsListProps } from "./LatestComponentsList.type";

export function LatestComponentsList({
  items,
  title = "5 composants récents",
  ctaLabel = "Voir le catalogue",
  ctaHref = "/components/sectiongallery",
}: LatestComponentsListProps) {
  return (
    <div
      style={{
        background: "var(--c-surface)",
        border: "1px solid var(--c-border)",
        borderRadius: "var(--radius-md)",
        padding: "var(--space-4)",
        boxShadow: "var(--shadow-2)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-3)" }}>
        <div>
          <p style={{ margin: 0, fontSize: "var(--fontsize-sm)", color: "var(--color-muted)", letterSpacing: "0.06em" }}>DERNIERS AJOUTS</p>
          <p style={{ margin: 0, fontSize: "var(--fontsize-lg)", fontWeight: "var(--fontweight-semibold)", color: "var(--color-fg)" }}>{title}</p>
        </div>
        {ctaHref && (
          <a
            href={ctaHref}
            aria-label={ctaLabel}
            style={{ fontSize: "var(--fontsize-sm)", color: "var(--color-brand)", textDecoration: "none", fontWeight: "var(--fontweight-semibold)" }}
          >
            {ctaLabel}
          </a>
        )}
      </div>

      <div style={{ display: "grid", gap: "var(--space-3)" }}>
        {items.map((item) => (
          <a
            key={`${item.label}-${item.href || item.section}`}
            href={item.href}
            aria-label={`${item.label} - ${item.section || "Section inconnue"}`}
            style={{
              textDecoration: "none",
              background: "var(--c-surface-elevated)",
              border: "1px solid var(--c-border)",
              padding: "var(--space-3) var(--space-4)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "var(--space-3)",
              minWidth: 0,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)", minWidth: 0 }}>
              <span style={{ color: "var(--color-fg)", fontWeight: "var(--fontweight-semibold)", fontSize: "var(--fontsize-md)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.label}</span>
              <span style={{ color: "var(--color-muted)", fontSize: "var(--fontsize-sm)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {item.section || "Section inconnue"}
              </span>
            </div>
            <span
              style={{
                padding: "var(--space-1) var(--space-3)",
                borderRadius: "var(--radius-full)",
                fontSize: "var(--fontsize-xs)",
                background: "var(--c-brand-subtle)",
                color: "var(--color-brand)",
                fontWeight: "var(--fontweight-semibold)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {item.type || "web"}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
