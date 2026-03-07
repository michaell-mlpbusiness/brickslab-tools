"use client";

import React from "react";
import { DocPageHeader } from "@brickslab./ui-web";
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
    name: "name",
    type: "string",
    description: "Nom du composant affiché en h1.",
  },
  {
    name: "description",
    type: "string",
    description: "Description courte affichée sous le titre (max 640px).",
  },
  {
    name: "packageName",
    type: "string",
    description: "Nom du package affiché en badge monospace (ex: @brickslab./ui-web).",
  },
  {
    name: "badges",
    type: "Array<{ label: string; variant?: DocPageHeaderBadgeVariant }>",
    description: "Badges supplémentaires — variantes: default · brand · success · warning · error.",
  },
];

const usageCode = `import { DocPageHeader } from "@brickslab./ui-web";

// Minimal
<DocPageHeader
  name="Button"
  description="Versatile action button with 4 variants, sizes, icons and loading state."
/>

// Avec package
<DocPageHeader
  name="Button"
  description="Versatile action button with 4 variants, sizes, icons and loading state."
  packageName="@brickslab./ui-web"
/>

// Avec badges supplémentaires
<DocPageHeader
  name="BottomSheet"
  description="Mobile bottom sheet with configurable snap points."
  packageName="@brickslab/ui-mobile"
  badges={[
    { label: "React Native", variant: "default" },
    { label: "Beta", variant: "warning" },
  ]}
/>`;

export default function DocPageHeaderPage() {
  return (
    <div>
      <ComponentHeader
        name="DocPageHeader"
        description="En-tête standard pour les pages de documentation de composants. Affiche le nom en h1, une description, un badge package monospace et des badges supplémentaires configurables. Utilisé par ComponentHeader dans PageSection.tsx."
      />

      {/* ── Minimal ─────────────────────────────────────────────────── */}
      <SectionTitle>Minimal</SectionTitle>
      <SubLabel>name + description uniquement</SubLabel>
      <Preview>
        <DocPageHeader
          name="Button"
          description="Versatile action button with 4 variants, sizes, icons and loading state."
        />
      </Preview>

      {/* ── Avec packageName ────────────────────────────────────────── */}
      <SectionTitle>Avec packageName</SectionTitle>
      <SubLabel>prop packageName — badge monospace brand</SubLabel>
      <Preview>
        <DocPageHeader
          name="Button"
          description="Versatile action button with 4 variants, sizes, icons and loading state."
          packageName="@brickslab./ui-web"
        />
      </Preview>

      {/* ── Avec badges ─────────────────────────────────────────────── */}
      <SectionTitle>Avec badges supplémentaires</SectionTitle>
      <SubLabel>prop badges — variantes default · brand · success · warning · error</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 32, width: "100%" }}>
          <div>
            <PropTag>success + default</PropTag>
            <div style={{ marginTop: 12 }}>
              <DocPageHeader
                name="Tabs"
                description="Controlled tab navigation with underline, pills and boxed variants."
                packageName="@brickslab./ui-web"
                badges={[
                  { label: "Stable", variant: "success" },
                  { label: "v0.1.0", variant: "default" },
                ]}
              />
            </div>
          </div>
          <div>
            <PropTag>warning</PropTag>
            <div style={{ marginTop: 12 }}>
              <DocPageHeader
                name="BottomSheet"
                description="Mobile bottom sheet with configurable snap points."
                packageName="@brickslab/ui-mobile"
                badges={[
                  { label: "React Native", variant: "default" },
                  { label: "Beta", variant: "warning" },
                ]}
              />
            </div>
          </div>
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
