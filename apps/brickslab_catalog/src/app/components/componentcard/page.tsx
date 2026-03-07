"use client";

import React from "react";
import { ComponentCard, Badge } from "@brickslab./ui-web";
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
    description: "Nom du composant affiché en titre de la carte.",
  },
  {
    name: "section",
    type: "string",
    description: "Section parente affichée en sous-titre (ex: \"UI Controls\").",
  },
  {
    name: "description",
    type: "string",
    description: "Description courte du composant.",
  },
  {
    name: "href",
    type: "string",
    description: "URL de destination au clic sur la carte.",
  },
  {
    name: "type",
    type: '"web" | "mobile"',
    default: '"web"',
    description: "Badge de plateforme affiché en haut à droite.",
  },
  {
    name: "preview",
    type: "React.ReactNode",
    description: "Slot optionnel pour afficher un aperçu live du composant dans la carte.",
  },
];

const usageCode = `import { ComponentCard } from "@brickslab./ui-web";

// Basique
<ComponentCard
  label="Button"
  section="UI Controls"
  description="Versatile action button with 4 variants, sizes, icons and loading state."
  href="/components/button"
/>

// Avec type mobile
<ComponentCard
  label="BottomSheet"
  section="Layout"
  description="Mobile bottom sheet with snap points."
  href="/components/bottomsheet"
  type="mobile"
/>

// Avec preview slot
<ComponentCard
  label="Badge"
  section="UI Controls"
  description="Compact non-interactive indicator for statuses and counts."
  href="/components/badge"
  preview={<Badge variant="info">Info</Badge>}
/>

// Grille de composants
<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
  {components.map((c) => (
    <ComponentCard key={c.href} {...c} />
  ))}
</div>`;

export default function ComponentCardPage() {
  return (
    <div>
      <ComponentHeader
        name="ComponentCard"
        description="Carte de catalogue pour présenter un composant dans une grille. Affiche nom, section, description et un badge de plateforme. Accepte un slot preview pour un aperçu live. L'effet hover (border brand + élévation) est géré en CSS pur via data-attribute."
      />

      {/* ── Sans preview ────────────────────────────────────────────── */}
      <SectionTitle>Sans preview</SectionTitle>
      <SubLabel>affichage minimal — label · section · description · type</SubLabel>
      <Preview>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16, width: "100%" }}>
          <ComponentCard
            label="Button"
            section="UI Controls"
            description="Versatile action button with 4 variants, sizes, icons and loading state."
            href="/components/button"
          />
          <ComponentCard
            label="Badge"
            section="UI Controls"
            description="Compact non-interactive indicator for statuses, counts and labels."
            href="/components/badge"
          />
          <ComponentCard
            label="ProgressBar"
            section="UI Controls"
            description="Horizontal progress bar with 4 color schemes and 2 sizes."
            href="/components/progressbar"
          />
        </div>
      </Preview>

      {/* ── Type mobile ─────────────────────────────────────────────── */}
      <SectionTitle>Type de plateforme</SectionTitle>
      <SubLabel>prop type — "web" (défaut) · "mobile"</SubLabel>
      <Preview>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16, width: "100%" }}>
          <div>
            <PropTag>web</PropTag>
            <div style={{ marginTop: 8 }}>
              <ComponentCard
                label="Tabs"
                section="UI Controls"
                description="Controlled tab navigation."
                href="/components/tabs"
                type="web"
              />
            </div>
          </div>
          <div>
            <PropTag>mobile</PropTag>
            <div style={{ marginTop: 8 }}>
              <ComponentCard
                label="BottomSheet"
                section="Layout"
                description="Mobile bottom sheet with snap points."
                href="#"
                type="mobile"
              />
            </div>
          </div>
        </div>
      </Preview>

      {/* ── Avec preview ────────────────────────────────────────────── */}
      <SectionTitle>Avec preview slot</SectionTitle>
      <SubLabel>prop preview — aperçu live du composant</SubLabel>
      <Preview>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16, width: "100%" }}>
          <ComponentCard
            label="Badge"
            section="UI Controls"
            description="Compact non-interactive indicator."
            href="/components/badge"
            preview={
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
                <Badge>Default</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
              </div>
            }
          />
          <ComponentCard
            label="Callout"
            section="UI Controls"
            description="Inline contextual message block for documentation."
            href="/components/callout"
            preview={
              <div style={{ width: "100%", fontSize: 12 }}>
                <Badge variant="info" size="sm">info · warning · tip · danger</Badge>
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
