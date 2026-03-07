"use client";

import { Text } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  PropTag,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  {
    name: "texte",
    type: "string",
    required: true,
    description: "Contenu textuel à afficher.",
  },
  {
    name: "variant",
    type: '"body-sm" | "body-md" | "body-lg" | "caption"',
    default: '"body-sm"',
    description: 'Variante typographique. Détermine la balise HTML (p ou span) et la taille/graisse via le token mapping interne. "caption" génère un <span>.',
  },
  {
    name: "align",
    type: '"left" | "center" | "right"',
    default: '"left"',
    description: "Alignement horizontal du texte.",
  },
  {
    name: "tone",
    type: '"default" | "muted" | "brand"',
    default: '"default"',
    description: 'Couleur du texte. "default" → var(--color-fg), "muted" → var(--color-muted), "brand" → var(--color-brand).',
  },
  {
    name: "opacity",
    type: "number",
    description: "Opacité CSS du texte (0–1). Déclenche un aria-label si < 0.3 pour l'accessibilité.",
  },
  {
    name: "blurPx",
    type: "number",
    description: "Flou CSS en pixels. Déclenche un aria-label si > 0 pour l'accessibilité.",
  },
];

const usageCode = `import { Text } from "@brickslab./ui-web";

// Variantes
<Text texte="Corps de texte large"  variant="body-lg" />
<Text texte="Corps de texte moyen"  variant="body-md" />
<Text texte="Corps de texte petit"  variant="body-sm" />
<Text texte="Légende / meta"        variant="caption" />

// Tones
<Text texte="Texte par défaut"  variant="body-md" tone="default" />
<Text texte="Texte secondaire"  variant="body-md" tone="muted" />
<Text texte="Texte brand"       variant="body-md" tone="brand" />

// Alignement
<Text texte="Centré"  variant="body-md" align="center" />
<Text texte="Droite"  variant="body-md" align="right" />

// Effets (avec accessibilité automatique)
<Text texte="Opacité réduite"  variant="body-md" opacity={0.4} />
<Text texte="Texte flouté"     variant="body-md" blurPx={2} />

// Caption décorative (aria-hidden automatique)
<Text texte="Légende décorative" variant="caption" tone="muted" />`;

export default function TextPage() {
  return (
    <div>
      <ComponentHeader
        name="Text"
        description="Composant de texte courant avec 4 variantes typographiques (body-lg, body-md, body-sm, caption). Supporte 3 tons de couleur, l'alignement et des effets visuels avec gestion automatique de l'accessibilité ARIA."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>variant — tone: default</SubLabel>
      <Preview>
        {(["body-lg", "body-md", "body-sm", "caption"] as const).map((v) => (
          <div key={v} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>{`variant="${v}"`}</PropTag>
            <Text texte="The quick brown fox" variant={v} tone="default" />
          </div>
        ))}
      </Preview>

      <SubLabel>tone — variant: body-md</SubLabel>
      <Preview>
        {(["default", "muted", "brand"] as const).map((tone) => (
          <div key={tone} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>{`tone="${tone}"`}</PropTag>
            <Text texte="The quick brown fox" variant="body-md" tone={tone} />
          </div>
        ))}
      </Preview>

      <SubLabel>align — variant: body-md</SubLabel>
      <Preview>
        {(["left", "center", "right"] as const).map((align) => (
          <div key={align} style={{ flex: 1, minWidth: 160, display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>{`align="${align}"`}</PropTag>
            <Text texte="The quick brown fox jumps" variant="body-md" align={align} />
          </div>
        ))}
      </Preview>

      <SubLabel>opacity + blurPx (accessibilité automatique)</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>opacity=0.4</PropTag>
          <Text texte="Opacité réduite" variant="body-md" opacity={0.4} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>blurPx=2</PropTag>
          <Text texte="Texte flouté" variant="body-md" blurPx={2} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`variant="caption" tone="muted" (aria-hidden)`}</PropTag>
          <Text texte="Légende décorative" variant="caption" tone="muted" />
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
