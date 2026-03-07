"use client";

import React from "react";
import { Callout } from "@brickslab./ui-web";
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
    name: "variant",
    type: '"info" | "warning" | "tip" | "danger"',
    default: '"info"',
    description: "Variante colorée avec icône associée automatiquement.",
  },
  {
    name: "title",
    type: "string",
    description: "Titre du callout. Si omis, un titre par défaut est affiché selon la variante.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    description: "Corps du message. Peut contenir du texte ou des éléments React.",
  },
];

const usageCode = `import { Callout } from "@brickslab./ui-web";

// Info (défaut)
<Callout variant="info">
  Ce composant est contrôlé — passez value et onChange comme props.
</Callout>

// Astuce avec titre personnalisé
<Callout variant="tip" title="Bonne pratique">
  Privilégiez les tokens CSS (var(--color-brand)) aux couleurs hardcodées.
</Callout>

// Attention
<Callout variant="warning">
  La prop onCtaClick est requise si ctaLabel est fourni.
</Callout>

// Danger
<Callout variant="danger" title="Breaking change">
  L'interface de ce composant a changé en v2. Migrez avant la mise à jour.
</Callout>`;

export default function CalloutPage() {
  return (
    <div>
      <ComponentHeader
        name="Callout"
        description="Bloc d'information contextuel statique pour enrichir la prose des pages de documentation. Différent d'Alert (interactif, dismissible) — Callout est inline et non-interactif. Disponible en 4 variantes avec icône et titre automatiques."
      />

      {/* ── Variantes ───────────────────────────────────────────────── */}
      <SectionTitle>Variantes</SectionTitle>
      <SubLabel>info · warning · tip · danger</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
          <Callout variant="info">
            Ce composant est contrôlé — passez <code>value</code> et <code>onChange</code> comme props.
          </Callout>
          <Callout variant="tip">
            Privilégiez les tokens CSS (<code>var(--color-brand)</code>) aux couleurs hardcodées.
          </Callout>
          <Callout variant="warning">
            La prop <code>onCtaClick</code> est requise si <code>ctaLabel</code> est fourni.
          </Callout>
          <Callout variant="danger">
            L'interface de ce composant a changé en v2. Migrez avant la mise à jour.
          </Callout>
        </div>
      </Preview>

      {/* ── Titre personnalisé ──────────────────────────────────────── */}
      <SectionTitle>Titre personnalisé</SectionTitle>
      <SubLabel>prop title — remplace le titre par défaut de la variante</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
          <div>
            <PropTag>sans title (défaut)</PropTag>
            <div style={{ marginTop: 8 }}>
              <Callout variant="tip">Le titre "Astuce" est injecté automatiquement.</Callout>
            </div>
          </div>
          <div>
            <PropTag>avec title</PropTag>
            <div style={{ marginTop: 8 }}>
              <Callout variant="tip" title="Bonne pratique">
                Utilisez <code>size="sm"</code> pour les callouts dans des colonnes étroites.
              </Callout>
            </div>
          </div>
        </div>
      </Preview>

      {/* ── Sans body ───────────────────────────────────────────────── */}
      <SectionTitle>Titre seul</SectionTitle>
      <SubLabel>children optionnel — titre seul possible</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
          <Callout variant="info" title="Composant Server Component compatible" />
          <Callout variant="warning" title="Nécessite 'use client'" />
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
