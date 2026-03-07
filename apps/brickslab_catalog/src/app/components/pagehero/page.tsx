"use client";

import React from "react";
import { PageHero } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  { name: "title", type: "string", required: true, description: "Titre principal (h1)." },
  { name: "subtitle", type: "string", description: "Sous-titre affiché sous le titre." },
  { name: "eyebrow", type: "string", description: "Badge pill au-dessus du titre (ex: 'Catalogue Complet')." },
  {
    name: "stats",
    type: "PageHeroStat[]",
    description: "Ligne de statistiques sous le titre. Chaque stat a value, label et une color optionnelle.",
  },
  { name: "children", type: "React.ReactNode", description: "Slot pour contenu additionnel (boutons, badges…)." },
];

export default function PageHeroPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <ComponentHeader
        name="PageHero"
        description="Hero pleine-largeur pour les pages de navigation. Remplace SectionHeader avec un mesh gradient, un dot grid, un eyebrow pill et une stats row."
      />

      <SectionTitle>Aperçu</SectionTitle>
      <Preview>
        <PageHero
          eyebrow="Exemple"
          title="Page Hero"
          subtitle="Un hero moderne pour les pages principales. Dot grid, gradient mesh, stats row intégrés."
          stats={[
            { value: 47, label: "Composants" },
            { value: "100%", label: "TypeScript", color: "#4ADE80" },
            { value: "v1.0", label: "Version" },
          ]}
        />
      </Preview>

      <SectionTitle>Avec children</SectionTitle>
      <Preview>
        <PageHero
          eyebrow="Documentation"
          title="Résultats des Tests"
          subtitle="Audit qualité 7 axes par composant."
          stats={[
            { value: "92%", label: "Score moyen", color: "#4ADE80" },
            { value: 47, label: "Composants" },
          ]}
        />
      </Preview>

      <SectionTitle>Code</SectionTitle>
      <CodeBlock
        code={`import { PageHero } from "@brickslab./ui-web";

<PageHero
  eyebrow="Catalogue Complet"
  title="47 composants"
  subtitle="Tous les composants React documentés et testés."
  stats={[
    { value: 47, label: "Web" },
    { value: "13", label: "Catégories" },
  ]}
/>`}
        language="tsx"
      />

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />
    </div>
  );
}
