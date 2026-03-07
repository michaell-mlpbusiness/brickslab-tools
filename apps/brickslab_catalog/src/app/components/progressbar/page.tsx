"use client";

import React from "react";
import { ProgressBar } from "@brickslab./ui-web";
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
    name: "value",
    type: "number",
    description: "Valeur actuelle de la progression (entre 0 et max).",
  },
  {
    name: "max",
    type: "number",
    default: "100",
    description: "Valeur maximale. Le pourcentage affiché est calculé via value/max.",
  },
  {
    name: "label",
    type: "string",
    description: "Libellé affiché au-dessus de la barre.",
  },
  {
    name: "colorScheme",
    type: '"brand" | "green" | "amber" | "red"',
    default: '"brand"',
    description: "Couleur de la barre de progression.",
  },
  {
    name: "size",
    type: '"sm" | "md"',
    default: '"md"',
    description: "Épaisseur de la barre (sm = 4px, md = 8px).",
  },
  {
    name: "showValue",
    type: "boolean",
    default: "false",
    description: "Affiche le pourcentage calculé à droite du libellé.",
  },
  {
    name: "animate",
    type: "boolean",
    default: "true",
    description: "Anime le remplissage depuis 0% lors de l'entrée dans le viewport. Désactivé automatiquement si prefers-reduced-motion est actif.",
  },
  {
    name: "duration",
    type: "number",
    default: "0.8",
    description: "Durée de l'animation de remplissage en secondes.",
  },
];

const usageCode = `import { ProgressBar } from "@brickslab./ui-web";

// Animée par défaut (0% → valeur au scroll)
<ProgressBar value={65} />

// Durée personnalisée
<ProgressBar value={78} label="Qualité" showValue duration={1.4} />

// Sans animation
<ProgressBar value={90} colorScheme="green" animate={false} showValue />

// Color schemes
<ProgressBar value={90} colorScheme="green" label="Tests passés" showValue />
<ProgressBar value={55} colorScheme="amber" label="Couverture" showValue />
<ProgressBar value={20} colorScheme="red" label="Erreurs" showValue />

// Avec max personnalisé
<ProgressBar value={200} max={300} label="Composants documentés" showValue />`;

export default function ProgressBarPage() {
  return (
    <div>
      <ComponentHeader
        name="ProgressBar"
        description="Barre de progression horizontale pour visualiser une valeur relative (pourcentage, score, quota). Disponible en 4 couleurs, 2 tailles et avec affichage optionnel de la valeur."
      />

      {/* ── Color schemes ───────────────────────────────────────────── */}
      <SectionTitle>Color schemes</SectionTitle>
      <SubLabel>brand · green · amber · red</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
          <ProgressBar value={82} colorScheme="brand" label="brand" showValue />
          <ProgressBar value={91} colorScheme="green" label="green" showValue />
          <ProgressBar value={57} colorScheme="amber" label="amber" showValue />
          <ProgressBar value={23} colorScheme="red" label="red" showValue />
        </div>
      </Preview>

      {/* ── Tailles ─────────────────────────────────────────────────── */}
      <SectionTitle>Tailles</SectionTitle>
      <SubLabel>sm (4px) · md (8px — défaut)</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
          <div>
            <PropTag>sm</PropTag>
            <div style={{ marginTop: 8 }}>
              <ProgressBar value={65} size="sm" colorScheme="brand" />
            </div>
          </div>
          <div>
            <PropTag>md</PropTag>
            <div style={{ marginTop: 8 }}>
              <ProgressBar value={65} size="md" colorScheme="brand" />
            </div>
          </div>
        </div>
      </Preview>

      {/* ── Avec libellé ────────────────────────────────────────────── */}
      <SectionTitle>Avec libellé et valeur</SectionTitle>
      <SubLabel>props label et showValue</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
          <ProgressBar value={78} label="Score qualité" showValue />
          <ProgressBar value={45} colorScheme="amber" label="Couverture tests" showValue />
          <ProgressBar value={94} colorScheme="green" label="Composants documentés" showValue />
        </div>
      </Preview>

      {/* ── Max personnalisé ────────────────────────────────────────── */}
      <SectionTitle>Max personnalisé</SectionTitle>
      <SubLabel>prop max — calcul du pourcentage relatif</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
          <ProgressBar value={47} max={100} label="47 / 100 composants" showValue />
          <ProgressBar value={200} max={300} label="200 / 300 composants" showValue />
        </div>
      </Preview>

      {/* ── Animation ───────────────────────────────────────────────── */}
      <SectionTitle>Animation</SectionTitle>
      <SubLabel>animate=true (défaut) — remplissage depuis 0 à l'entrée dans le viewport</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
          <ProgressBar value={87} colorScheme="green" label="Score audit (0.8s)" showValue />
          <ProgressBar value={68} colorScheme="amber" label="Couverture (1.4s)" showValue duration={1.4} />
          <ProgressBar value={42} colorScheme="red" label="A11y (2s)" showValue duration={2} />
          <ProgressBar value={94} colorScheme="brand" label="Sans animation" showValue animate={false} />
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
