import React from "react";
import { DashboardHeroProps } from "./DashboardHero.type";

export function DashboardHero({
  totalComponents,
  subtitle = "Tableau de bord Brickslab",
  primaryLabel = "Parcourir le catalogue",
  primaryHref = "/components/sectiongallery",
  secondaryLabel = "Voir les fondations",
  secondaryHref = "/components/searchbar",
}: DashboardHeroProps) {
  return (
    <section
      className="dashboard-hero"
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr",
        gap: "var(--space-6)",
        padding: "var(--space-6)",
        background: "var(--c-surface)",
        border: "1px solid var(--c-border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-2)",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (max-width: 960px) {
          .dashboard-hero {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Overlay brand — rgba autorisé pour les effets de superposition */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 30% 30%, rgba(204,74,72,0.12), transparent 40%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", position: "relative", zIndex: 1 }}>
        <p style={{ margin: 0, fontSize: "var(--fontsize-sm)", letterSpacing: "0.08em", color: "var(--color-muted)", textTransform: "uppercase" }}>
          {subtitle}
        </p>
        <h1 style={{ margin: 0, fontSize: "var(--fontsize-2xl)", lineHeight: 1.2, fontWeight: "var(--fontweight-black)" }}>
          Construisons plus vite, avec {totalComponents}+ briques prêtes à assembler.
        </h1>
        <p style={{ margin: 0, fontSize: "var(--fontsize-md)", color: "var(--color-muted)", maxWidth: 640 }}>
          Ce dashboard centralise l'état du design system : inventaire des composants, nouveautés fraîchement publiées, et niveau de confiance via les tests automatisés.
        </p>
        <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
          {primaryHref && (
            <a
              href={primaryHref}
              style={{
                padding: "var(--space-2) var(--space-4)",
                background: "var(--color-brand)",
                color: "#FBFBFB",
                borderRadius: "var(--radius-md)",
                fontWeight: "var(--fontweight-semibold)",
                textDecoration: "none",
                border: "1px solid var(--color-brand)",
              }}
            >
              {primaryLabel}
            </a>
          )}
          {secondaryHref && (
            <a
              href={secondaryHref}
              style={{
                padding: "var(--space-2) var(--space-4)",
                background: "transparent",
                color: "var(--color-fg)",
                borderRadius: "var(--radius-md)",
                fontWeight: "var(--fontweight-semibold)",
                textDecoration: "none",
                border: "1px solid var(--c-border)",
              }}
            >
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>

      <div
        style={{
          background: "var(--c-surface-elevated)",
          border: "1px solid var(--c-border)",
          borderRadius: "var(--radius-md)",
          padding: "var(--space-4)",
          display: "grid",
          gap: "var(--space-3)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: "var(--fontweight-semibold)" }}>Pourquoi Brickslab ?</span>
          <span style={{ fontSize: "var(--fontsize-xs)", color: "var(--color-muted)" }}>Stack modulaire</span>
        </div>
        <ul style={{ margin: 0, paddingLeft: "var(--space-4)", color: "var(--color-muted)", display: "grid", gap: "var(--space-2)", fontSize: "var(--fontsize-sm)" }}>
          <li>Kit UI cohérent web + mobile avec thèmes tokens</li>
          <li>Catalogue documenté avec exemples live</li>
          <li>Qualité assurée par tests unitaires et visuels</li>
          <li>Navigation guidée : recherche, filtres, sections</li>
        </ul>
      </div>
    </section>
  );
}
