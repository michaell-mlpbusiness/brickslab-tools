"use client";

import { SectionGallery } from "@brickslab./ui-web";
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
    name: "items",
    type: "ReactNode[]",
    required: true,
    description: "Tableau d'éléments React à afficher dans la galerie.",
  },
  {
    name: "title",
    type: "string",
    description: "Titre optionnel affiché au-dessus de la galerie.",
  },
  {
    name: "columns",
    type: "1 | 2 | 3 | 4",
    default: "3",
    description: "Nombre de colonnes de la grille.",
  },
  {
    name: "gap",
    type: "number",
    description: "Espacement en pixels entre les éléments de la galerie.",
  },
];

const placeholderCard = (label: string, index: number) => (
  <div
    key={index}
    style={{
      padding: 16,
      background: "var(--color-surface)",
      border: "1px solid var(--color-muted)",
      borderRadius: "var(--radius-md)",
      minHeight: 80,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "0.85rem",
      opacity: 0.7,
    }}
  >
    {label}
  </div>
);

const usageCode = `import { SectionGallery } from "@brickslab./ui-web";

const cards = Array.from({ length: 6 }, (_, i) => (
  <div key={i} style={{ padding: 16, border: "1px solid var(--color-muted)", borderRadius: "var(--radius-md)" }}>
    Carte {i + 1}
  </div>
));

// 3 colonnes (défaut)
<SectionGallery title="Exemples" items={cards} columns={3} />

// 2 colonnes
<SectionGallery items={cards} columns={2} gap={24} />

// 4 colonnes
<SectionGallery items={cards} columns={4} />`;

export default function SectionGalleryPage() {
  return (
    <div>
      <ComponentHeader
        name="SectionGallery"
        description="Galerie en grille pour afficher une collection d'éléments React. Supporte 1 à 4 colonnes et un espacement configurable. Utilisé pour les galeries de composants, portfolios ou catalogues."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>{`columns=3 (défaut) — 6 éléments`}</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <SectionGallery
            title="Galerie de composants"
            items={Array.from({ length: 6 }, (_, i) => placeholderCard(`Carte ${i + 1}`, i))}
            columns={3}
          />
        </div>
      </Preview>

      <SubLabel>{`columns=2`}</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <SectionGallery
            items={Array.from({ length: 4 }, (_, i) => placeholderCard(`Élément ${i + 1}`, i))}
            columns={2}
            gap={20}
          />
        </div>
      </Preview>

      <SubLabel>{`columns=4`}</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <SectionGallery
            items={Array.from({ length: 8 }, (_, i) => placeholderCard(`Item ${i + 1}`, i))}
            columns={4}
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
