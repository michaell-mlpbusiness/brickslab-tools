"use client";

import { ProjectDescriptionPanel } from "@brickslab./ui-web";
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
    description: "Titre du projet ou de l'élément décrit.",
  },
  {
    name: "description",
    type: "string",
    required: true,
    description: "Description détaillée du projet.",
  },
  {
    name: "tags",
    type: "string[]",
    description: "Liste de tags ou technologies associés au projet.",
  },
  {
    name: "links",
    type: "ProjectLink[]",
    description: "Liens externes associés au projet (ex. : GitHub, démo en ligne). Chaque item contient un label et un href.",
  },
];

const usageCode = `import { ProjectDescriptionPanel } from "@brickslab./ui-web";

<ProjectDescriptionPanel
  title="BricksLab UI"
  description="Bibliothèque de composants React pour construire des interfaces modernes et cohérentes. Basée sur des tokens CSS et optimisée pour Next.js App Router."
  tags={["React", "TypeScript", "Next.js", "Design System"]}
  links={[
    { label: "GitHub",      href: "https://github.com/brickslab/ui" },
    { label: "Démo live",   href: "https://brickslab.io/catalog" },
    { label: "npm",         href: "https://npmjs.com/package/@brickslab./ui-web" },
  ]}
/>`;

export default function ProjectDescriptionPanelPage() {
  return (
    <div>
      <ComponentHeader
        name="ProjectDescriptionPanel"
        description="Panneau de présentation d'un projet avec titre, description, tags et liens externes. Utilisé dans les portfolios, pages de documentation ou dashboards pour afficher les métadonnées d'un projet."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>panneau complet — titre, description, tags et liens</SubLabel>
      <Preview>
        <ProjectDescriptionPanel
          title="BricksLab UI"
          description="Bibliothèque de composants React pour construire des interfaces modernes et cohérentes. Basée sur des tokens CSS et optimisée pour Next.js App Router."
          tags={["React", "TypeScript", "Next.js", "Design System", "CSS Tokens"]}
          links={[
            { label: "GitHub", href: "https://github.com/brickslab/ui" },
            { label: "Démo live", href: "https://brickslab.io/catalog" },
            { label: "npm", href: "https://npmjs.com/package/@brickslab./ui-web" },
          ]}
        />
      </Preview>

      <SubLabel>sans tags ni liens</SubLabel>
      <Preview>
        <ProjectDescriptionPanel
          title="Catalog BricksLab"
          description="Site de documentation interactif présentant tous les composants de la bibliothèque UI avec leurs variantes, props et exemples d'utilisation."
        />
      </Preview>

      <SubLabel>avec tags uniquement</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>tags sans liens</PropTag>
          <ProjectDescriptionPanel
            title="Design Tokens"
            description="Système de variables CSS centralisé pour gérer les couleurs, espacements, rayons de bordure et typographie de façon cohérente."
            tags={["CSS Variables", "Tokens", "Thèmes", "Dark Mode"]}
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
