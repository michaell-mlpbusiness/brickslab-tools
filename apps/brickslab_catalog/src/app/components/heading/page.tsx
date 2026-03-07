"use client";

import { Heading } from "@brickslab./ui-web";
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
    description: "Texte affiché dans le heading.",
  },
  {
    name: "level",
    type: "1 | 2 | 3 | 4 | 5 | 6",
    default: "1",
    description: "Niveau sémantique HTML — détermine la balise (h1 à h6) et la taille/poids de police via le token mapping interne.",
  },
  {
    name: "align",
    type: '"left" | "center" | "right"',
    default: '"left"',
    description: "Alignement horizontal du texte.",
  },
  {
    name: "tone",
    type: '"brand" | "muted"',
    default: '"brand"',
    description: 'Couleur du texte. "brand" → var(--color-brand), "muted" → var(--color-muted).',
  },
  {
    name: "opacity",
    type: "number",
    default: "1",
    description: "Opacité du texte. Clampée automatiquement entre 0 et 1.",
  },
  {
    name: "blurPx",
    type: "number",
    default: "0",
    description: "Flou CSS en pixels. Clampé entre 0 et 10.",
  },
];

const usageCode = `import { Heading } from "@brickslab./ui-web";

// Niveaux (h1 → h6)
<Heading title="Titre principal"  level={1} />
<Heading title="Sous-titre"       level={2} />
<Heading title="Section"          level={3} />
<Heading title="Sous-section"     level={4} />
<Heading title="Libellé"          level={5} />
<Heading title="Caption heading"  level={6} />

// Tones
<Heading title="Brand (défaut)"  level={2} tone="brand" />
<Heading title="Muted"           level={2} tone="muted" />

// Alignement
<Heading title="Centré"  level={3} align="center" />
<Heading title="Droite"  level={3} align="right" />

// Effets visuels
<Heading title="Opacité réduite"  level={3} opacity={0.4} />
<Heading title="Texte flouté"     level={3} blurPx={3} />`;

export default function HeadingPage() {
  return (
    <div>
      <ComponentHeader
        name="Heading"
        description="Titre sémantique h1–h6 avec contrôle du niveau, du ton et des effets visuels. Les tailles et graisses sont mappées automatiquement via une configuration interne basée sur les tokens CSS."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>level — tone: brand (défaut)</SubLabel>
      <Preview>
        {([1, 2, 3, 4, 5, 6] as const).map((level) => (
          <div key={level} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>level={level}</PropTag>
            <Heading title={`Heading ${level}`} level={level} tone="brand" />
          </div>
        ))}
      </Preview>

      <SubLabel>tone</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`tone="brand"`}</PropTag>
          <Heading title="Brand tone" level={2} tone="brand" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`tone="muted"`}</PropTag>
          <Heading title="Muted tone" level={2} tone="muted" />
        </div>
      </Preview>

      <SubLabel>align</SubLabel>
      <Preview>
        {(["left", "center", "right"] as const).map((align) => (
          <div key={align} style={{ flex: 1, minWidth: 180, display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>{`align="${align}"`}</PropTag>
            <Heading title="BricksLab" level={3} align={align} tone="brand" />
          </div>
        ))}
      </Preview>

      <SubLabel>opacity + blurPx</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>opacity=0.4</PropTag>
          <Heading title="Opacité réduite" level={3} opacity={0.4} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>blurPx=3</PropTag>
          <Heading title="Texte flouté" level={3} blurPx={3} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>opacity=0.3 + blurPx=4</PropTag>
          <Heading title="Combiné" level={3} opacity={0.3} blurPx={4} />
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
