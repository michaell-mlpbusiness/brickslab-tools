"use client";

import { TextBlock } from "@brickslab./ui-web";
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
    name: "content",
    type: "string",
    required: true,
    description: "Contenu textuel à afficher dans le bloc.",
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
    name: "maxWidth",
    type: "string",
    default: '"65ch"',
    description: "Largeur maximale du bloc de texte. Utilise une valeur CSS valide (ex. : 65ch, 480px, 100%).",
  },
];

const usageCode = `import { TextBlock } from "@brickslab./ui-web";

// Tone par défaut
<TextBlock content="Bienvenue sur BricksLab, la bibliothèque de composants UI." />

// Tone muted
<TextBlock
  content="Ce texte secondaire apporte du contexte sans dominer la hiérarchie visuelle."
  tone="muted"
/>

// Tone brand
<TextBlock
  content="Construisez plus vite avec des composants pensés pour la production."
  tone="brand"
/>

// Alignement centré
<TextBlock
  content="Texte centré pour les sections hero ou landing."
  align="center"
/>

// Largeur personnalisée
<TextBlock
  content="Ce bloc est limité à 480px de large pour un rendu compact."
  maxWidth="480px"
/>`;

export default function TextBlockPage() {
  return (
    <div>
      <ComponentHeader
        name="TextBlock"
        description="Bloc de texte courant avec contrôle du ton, de l'alignement et de la largeur maximale. Idéal pour les paragraphes de description, introductions et sections de contenu éditorial."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>tone</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`tone="default"`}</PropTag>
          <TextBlock content="Bienvenue sur BricksLab, la bibliothèque de composants UI pensée pour la production." tone="default" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`tone="muted"`}</PropTag>
          <TextBlock content="Ce texte secondaire apporte du contexte sans dominer la hiérarchie visuelle." tone="muted" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`tone="brand"`}</PropTag>
          <TextBlock content="Construisez plus vite avec des composants pensés pour la production." tone="brand" />
        </div>
      </Preview>

      <SubLabel>align</SubLabel>
      <Preview>
        {(["left", "center", "right"] as const).map((align) => (
          <div key={align} style={{ flex: 1, minWidth: 200, display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>{`align="${align}"`}</PropTag>
            <TextBlock content="The quick brown fox jumps over the lazy dog." align={align} />
          </div>
        ))}
      </Preview>

      <SubLabel>maxWidth</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`maxWidth="65ch" (défaut)`}</PropTag>
          <TextBlock content="Ce bloc de texte respecte la longueur de ligne optimale pour la lisibilité, soit environ 65 caractères par ligne." maxWidth="65ch" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`maxWidth="320px"`}</PropTag>
          <TextBlock content="Ce bloc est limité à 320px pour un rendu compact adapté aux colonnes étroites." maxWidth="320px" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`maxWidth="100%"`}</PropTag>
          <TextBlock content="Ce bloc occupe toute la largeur disponible de son conteneur parent." maxWidth="100%" />
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
