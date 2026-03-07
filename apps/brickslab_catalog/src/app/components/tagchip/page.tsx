"use client";

import { TagChip } from "@brickslab./ui-web";
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
    name: "label",
    type: "string",
    required: true,
    description: "Texte affiché dans le chip.",
  },
  {
    name: "variant",
    type: '"default" | "brand" | "muted"',
    default: '"default"',
    description: 'Style visuel du chip. "default" → style neutre, "brand" → couleur de marque, "muted" → style atténué.',
  },
  {
    name: "size",
    type: '"sm" | "md"',
    default: '"md"',
    description: "Taille du chip. Affecte le padding et la taille de police.",
  },
];

const usageCode = `import { TagChip } from "@brickslab./ui-web";

// Variantes
<TagChip label="Design System" variant="default" />
<TagChip label="BricksLab"     variant="brand" />
<TagChip label="Archivé"       variant="muted" />

// Tailles
<TagChip label="Tag petit"  size="sm" />
<TagChip label="Tag moyen"  size="md" />

// Combinaisons
<TagChip label="Next.js"   variant="brand" size="sm" />
<TagChip label="TypeScript" variant="default" size="md" />`;

export default function TagChipPage() {
  return (
    <div>
      <ComponentHeader
        name="TagChip"
        description="Étiquette compacte utilisée pour catégoriser ou annoter du contenu. Disponible en 3 variantes visuelles et 2 tailles. Idéal pour les tags de projets, catégories d'articles ou filtres."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>variant</SubLabel>
      <Preview>
        {(["default", "brand", "muted"] as const).map((variant) => (
          <div key={variant} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>{`variant="${variant}"`}</PropTag>
            <TagChip label="BricksLab" variant={variant} />
          </div>
        ))}
      </Preview>

      <SubLabel>size</SubLabel>
      <Preview>
        {(["sm", "md"] as const).map((size) => (
          <div key={size} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>{`size="${size}"`}</PropTag>
            <TagChip label="Design System" size={size} />
          </div>
        ))}
      </Preview>

      <SubLabel>toutes les combinaisons variant × size</SubLabel>
      <Preview>
        {(["default", "brand", "muted"] as const).map((variant) =>
          (["sm", "md"] as const).map((size) => (
            <div key={`${variant}-${size}`} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <PropTag>{`${variant} / ${size}`}</PropTag>
              <TagChip label="Tag" variant={variant} size={size} />
            </div>
          ))
        )}
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
