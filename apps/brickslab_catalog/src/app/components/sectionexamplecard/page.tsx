"use client";

import { SectionExampleCard } from "@brickslab./ui-web";
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
    name: "title",
    type: "string",
    required: true,
    description: "Titre de la carte d'exemple.",
  },
  {
    name: "description",
    type: "string",
    description: "Description courte de l'exemple ou du composant présenté.",
  },
  {
    name: "preview",
    type: "ReactNode",
    description: "Contenu de prévisualisation affiché dans la carte. Peut être n'importe quel noeud React.",
  },
  {
    name: "href",
    type: "string",
    description: "Lien de navigation. Si fourni, la carte devient cliquable et renvoie vers l'URL spécifiée.",
  },
];

const usageCode = `import { SectionExampleCard } from "@brickslab./ui-web";

// Carte avec preview
<SectionExampleCard
  title="Heading"
  description="Titres sémantiques h1–h6 avec contrôle du ton et des effets visuels."
  preview={<h2 style={{ margin: 0 }}>Titre d'exemple</h2>}
  href="/components/heading"
/>

// Carte sans preview
<SectionExampleCard
  title="TextBlock"
  description="Blocs de texte avec contrôle du ton et de la largeur maximale."
  href="/components/textblock"
/>

// Carte sans lien (statique)
<SectionExampleCard
  title="Composant en développement"
  description="Ce composant sera disponible prochainement."
/>`;

export default function SectionExampleCardPage() {
  return (
    <div>
      <ComponentHeader
        name="SectionExampleCard"
        description="Carte d'exemple de composant utilisée dans les pages de galerie ou d'index du catalog. Peut afficher un aperçu interactif, une description et un lien de navigation vers la page dédiée."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>3 cartes dans une grille — avec preview, sans preview, avec href</SubLabel>
      <Preview>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, width: "100%" }}>
          <SectionExampleCard
            title="Heading"
            description="Titres sémantiques h1–h6 avec contrôle du niveau, du ton et des effets visuels."
            preview={
              <div style={{ padding: "12px 0" }}>
                <h3 style={{ margin: 0, color: "var(--color-brand)" }}>Exemple de titre</h3>
              </div>
            }
            href="/components/heading"
          />
          <SectionExampleCard
            title="TextBlock"
            description="Blocs de texte avec contrôle du ton et de la largeur maximale."
            href="/components/textblock"
          />
          <SectionExampleCard
            title="TagChip"
            description="Étiquettes compactes pour catégoriser du contenu. 3 variantes, 2 tailles."
            preview={
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", padding: "8px 0" }}>
                <span style={{ padding: "2px 8px", background: "var(--color-brand)", color: "white", borderRadius: "999px", fontSize: "0.75rem" }}>React</span>
                <span style={{ padding: "2px 8px", background: "transparent", border: "1px solid var(--color-muted)", borderRadius: "999px", fontSize: "0.75rem" }}>TypeScript</span>
              </div>
            }
          />
        </div>
      </Preview>

      {/* ── Props ──────────────────────────────────────────────────── */}
      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      {/* ── Utilisation ────────────────────────────────────────────── */}
      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} />
    </div>
  );
}
