"use client";
import { Topbar } from "../../../catalog/Topbar";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  PropTag,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  {
    name: "children",
    type: "ReactNode (internal)",
    description: "La barre supérieure gère sa propre structure interne avec logo, recherche et menu burger mobile.",
  },
];

const usageCode = `import { Topbar } from "@brickslab/catalog";

export default function Page() {
  return (
    <>
      <Topbar />
      {/* Page content */}
    </>
  );
}`;

const featureCode = `// Topbar includes:
// 1. Responsive layout (fixed position top)
// 2. Logo with Brickslab branding
// 3. Search input with component filtering
// 4. SearchResults dropdown
// 5. Burger menu for mobile (<1024px)
// 6. MobileNav integration`;

export default function TopbarPage() {
  return (
    <div>
      <ComponentHeader
        name="Topbar"
        description="Barre de navigation supérieure responsive avec logo, recherche de composants et menu burger pour mobile. Composant personnalisé du catalog qui gère la navigation principale et la recherche en-tête du site."
      />

      {/* ── Features ─────────────────────────────────────── */}
      <SectionTitle>Caractéristiques</SectionTitle>
      <div style={{ padding: "16px", backgroundColor: "var(--c-surface-secondary)", borderRadius: "8px", marginBottom: "24px" }}>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Position fixe</strong> : Reste en haut de la page lors du scroll</li>
          <li><strong>Logo avec branding</strong> : Affiche le logo Brickslab avec couleurs de marque</li>
          <li><strong>Recherche intégrée</strong> : Champ de recherche avec suggestions en dropdown</li>
          <li><strong>SearchResults</strong> : Affiche les résultats de recherche filtrés</li>
          <li><strong>Menu burger mobile</strong> : S&apos;affiche sur écrans de max 1024px</li>
          <li><strong>Responsive</strong> : Masque la barre de recherche sur très petits écrans (max 768px)</li>
        </ul>
      </div>

      {/* ── Props ─────────────────────────────────────── */}
      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      {/* ── Résumé interne ─────────────────────────────────────── */}
      <SectionTitle>Composants internes</SectionTitle>
      <Preview>
        <div style={{ padding: "16px", fontFamily: "monospace", fontSize: "13px", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {featureCode}
        </div>
      </Preview>

      {/* ── Utilisation ─────────────────────────────────────── */}
      <SectionTitle>Utilisation</SectionTitle>
      <SubLabel>Implémentation simple</SubLabel>
      <CodeBlock code={usageCode} language="tsx" />

      {/* ── Interactivité ─────────────────────────────────────── */}
      <SectionTitle>Démonstration interactive</SectionTitle>
      <SubLabel>Vous voyez déjà la Topbar au-dessus de cette page</SubLabel>
      <Preview>
        <div style={{ padding: "16px", textAlign: "center", color: "var(--color-muted)" }}>
          La Topbar est visible en haut de l&apos;écran avec :
          <ul style={{ marginTop: "12px", marginBottom: "12px", lineHeight: "1.8" }}>
            <li>Logo Brickslab</li>
            <li>Champ de recherche</li>
            <li>Menu burger (visible sur mobile)</li>
          </ul>
        </div>
      </Preview>

      {/* ── Notes ─────────────────────────────────────── */}
      <SectionTitle>Notes importantes</SectionTitle>
      <div style={{ padding: "16px", backgroundColor: "var(--c-surface-secondary)", borderRadius: "8px", borderLeft: "3px solid var(--color-brand)" }}>
        <p style={{ margin: 0, fontSize: "14px" }}>
          ⚠️ La Topbar est un composant personnalisé du catalogue, non pas un composant de la librairie @brickslab./ui-web. 
          Elle intègre la recherche, la navigation mobile et le branding global du site.
        </p>
      </div>
    </div>
  );
}
