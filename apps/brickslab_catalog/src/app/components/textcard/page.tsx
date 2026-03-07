"use client";

import { TextCard } from "@brickslab./ui-web";
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
    name: "texte",
    type: "string",
    required: true,
    description: "Texte principal affiché dans la carte (via le composant Text interne).",
  },
  {
    name: "cardtitle",
    type: "string",
    description: "Titre optionnel de la carte. Si présent, affiché au-dessus de texte avec la variante body-lg et le ton brand.",
  },
  {
    name: "variant",
    type: '"default" | "opaque" | "blurred"',
    default: '"default"',
    description: '"default" : pas de couche de fond. "opaque" : fond semi-transparent. "blurred" : fond flouté (effet glassmorphism).',
  },
  {
    name: "opacity",
    type: "number",
    description: "Override de l'opacité du fond. Défaut selon variant : 0.5 (opaque), 0.3 (blurred).",
  },
  {
    name: "blurPx",
    type: "number",
    description: "Override de l'intensité du flou en pixels. Défaut : 6 (blurred). Ignoré pour default et opaque.",
  },
  {
    name: "width",
    type: "number",
    description: "Largeur en pixels. Si omis, la carte s'adapte à son contenu.",
  },
  {
    name: "height",
    type: "number",
    description: "Hauteur en pixels. Si omis, la carte s'adapte à son contenu.",
  },
];

const usageCode = `import { TextCard } from "@brickslab./ui-web";

// variant: default (pas de fond)
<TextCard
  cardtitle="Statistiques"
  texte="124 nouveaux utilisateurs"
  width={280}
  height={110}
/>

// variant: opaque (fond semi-transparent)
<TextCard
  cardtitle="Maintenance"
  texte="Service temporairement indisponible"
  variant="opaque"
  width={280}
/>

// variant: opaque avec opacité personnalisée
<TextCard
  texte="Fond très transparent"
  variant="opaque"
  opacity={0.15}
  width={280}
/>

// variant: blurred (effet glassmorphism)
// ⚠️  Nécessite un fond visible derrière la carte
<TextCard
  cardtitle="Glassmorphism"
  texte="Fond flouté"
  variant="blurred"
  width={280}
/>

// variant: blurred avec intensité de flou personnalisée
<TextCard
  texte="Blur intense"
  variant="blurred"
  blurPx={14}
  width={280}
/>`;

export default function TextCardPage() {
  return (
    <div>
      <ComponentHeader
        name="TextCard"
        description="Carte de contenu texte avec trois variantes de fond : transparent, semi-opaque et flouté (glassmorphism). Compose le composant Text en interne. La variante blurred requiert un arrière-plan visible pour que l'effet soit perceptible."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>{`variant="default"`}</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>avec cardtitle</PropTag>
          <TextCard
            cardtitle="Statistiques"
            texte="124 nouveaux utilisateurs"
            variant="default"
            width={260}
            height={100}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>sans cardtitle</PropTag>
          <TextCard
            texte="Texte seul, sans titre"
            variant="default"
            width={260}
            height={100}
          />
        </div>
      </Preview>

      <SubLabel>{`variant="opaque"`}</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>opacity=0.5 (défaut)</PropTag>
          <TextCard
            cardtitle="Maintenance"
            texte="Service temporairement indisponible"
            variant="opaque"
            width={260}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>opacity=0.15</PropTag>
          <TextCard
            cardtitle="Info"
            texte="Fond très transparent"
            variant="opaque"
            opacity={0.15}
            width={260}
          />
        </div>
      </Preview>

      <SubLabel>{`variant="blurred" — fond dégradé pour démonstration`}</SubLabel>
      <Preview background="linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-dark) 50%, var(--color-brand) 100%)">
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>blurPx=6 (défaut)</PropTag>
          <TextCard
            cardtitle="Glassmorphism"
            texte="Fond flouté avec gradient"
            variant="blurred"
            width={260}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>blurPx=14</PropTag>
          <TextCard
            texte="Blur très intense"
            variant="blurred"
            blurPx={14}
            width={260}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>opacity=0.1 + blurPx=8</PropTag>
          <TextCard
            cardtitle="Subtil"
            texte="Fond quasi invisible"
            variant="blurred"
            opacity={0.1}
            blurPx={8}
            width={260}
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
