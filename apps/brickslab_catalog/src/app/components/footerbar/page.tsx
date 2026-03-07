"use client";

import { FooterBar } from "../../../catalog/FooterBar";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  {
    name: "children",
    type: "ReactNode (internal)",
    description: "Le footer gère sa propre structure interne avec branding, ressources, légal et liens sociaux.",
  },
];

const usageCode = `import { FooterBar } from "@brickslab/catalog";

export default function Layout() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <main style={{ flex: 1 }}>
        {/* Page content */}
      </main>
      <FooterBar />
    </div>
  );
}`;

export default function FooterBarPage() {
  return (
    <div>
      <ComponentHeader
        name="FooterBar"
        description="Pied de page du catalogue avec branding Brickslab, sections de ressources et légales, liens sociaux et copyright. Composant personnalisé du catalogue pour la navigation footer."
      />

      {/* ── Caractéristiques ─────────────────────────────── */}
      <SectionTitle>Caractéristiques</SectionTitle>
      <div style={{ padding: "16px", backgroundColor: "var(--c-surface-secondary)", borderRadius: "8px", marginBottom: "24px" }}>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Section Branding</strong> : Logo Brickslab avec tagline</li>
          <li><strong>Section Resources</strong> : Liens GitHub, website, documentation</li>
          <li><strong>Section Legal</strong> : Conditions d&apos;utilisation, politique de confidentialité, licence</li>
          <li><strong>Section Social</strong> : Liens vers réseaux sociaux (Twitter/X, LinkedIn)</li>
          <li><strong>Copyright dynamique</strong> : Année calculée automatiquement</li>
          <li><strong>Responsive</strong> : Grille 4 colonnes sur desktop, adaptée sur mobile</li>
        </ul>
      </div>

      {/* ── Props ─────────────────────────────────────────────────── */}
      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      {/* ── Aperçu interactif ─────────────────────────────────────────────────── */}
      <SectionTitle>Démonstration</SectionTitle>
      <SubLabel>Le footer est visible en bas de la page</SubLabel>
      <Preview>
        <div style={{ padding: "16px", textAlign: "center", color: "var(--color-muted)" }}>
          Consultez le footer au bas de la page avec :
          <ul style={{ marginTop: "12px", marginBottom: "12px", lineHeight: "1.8" }}>
            <li>Section branding</li>
            <li>Liens ressources</li>
            <li>Liens légaux</li>
            <li>Liens réseaux sociaux</li>
            <li>Copyright © 2026</li>
          </ul>
        </div>
      </Preview>

      {/* ── Utilisation ────────────────────────────────────────────── */}
      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />

      {/* ── Notes ────────────────────────────────────────────── */}
      <SectionTitle>Notes</SectionTitle>
      <div style={{ padding: "16px", backgroundColor: "var(--c-surface-secondary)", borderRadius: "8px", borderLeft: "3px solid var(--color-brand)" }}>
        <p style={{ margin: 0, fontSize: "14px" }}>
          ⚠️ Le FooterBar est un composant personnalisé du catalogue. Il est intégré au bas de chaque page du layout root et utilise du CSS module pour le styling responsive.
        </p>
      </div>
    </div>
  );
}
