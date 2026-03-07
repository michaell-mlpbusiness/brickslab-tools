"use client";

import { FeatureListSection } from "@brickslab./ui-web";
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
    name: "features",
    type: "Feature[]",
    required: true,
    description: "Liste des fonctionnalités à afficher. Chaque item contient un title, une description et une icône optionnelle.",
  },
  {
    name: "title",
    type: "string",
    description: "Titre optionnel de la section de fonctionnalités.",
  },
  {
    name: "subtitle",
    type: "string",
    description: "Sous-titre optionnel affiché sous le titre de section.",
  },
  {
    name: "columns",
    type: "2 | 3 | 4",
    default: "3",
    description: "Nombre de colonnes dans la grille des fonctionnalités.",
  },
];

const demoFeatures = [
  {
    title: "Composants prêts à l'emploi",
    description: "Plus de 30 composants React documentés, testés et prêts à intégrer dans votre projet.",
  },
  {
    title: "Tokens CSS centralisés",
    description: "Système de design cohérent basé sur des variables CSS pour les couleurs, espacements et typographie.",
  },
  {
    title: "Next.js App Router",
    description: "Optimisé pour Next.js 14+ avec support Server Components et Client Components.",
  },
  {
    title: "TypeScript natif",
    description: "Types complets et PropDefs documentées pour une expérience développeur optimale.",
  },
  {
    title: "Accessibilité ARIA",
    description: "Attributs ARIA automatiques, navigation clavier et contraste conforme WCAG 2.1.",
  },
  {
    title: "Thèmes personnalisables",
    description: "Surcharge simple des tokens CSS pour adapter la bibliothèque à votre charte graphique.",
  },
];

const usageCode = `import { FeatureListSection } from "@brickslab./ui-web";

<FeatureListSection
  title="Pourquoi BricksLab ?"
  subtitle="Une bibliothèque pensée pour la vitesse et la cohérence."
  features={[
    {
      title: "Composants prêts à l'emploi",
      description: "Plus de 30 composants documentés et testés.",
    },
    {
      title: "TypeScript natif",
      description: "Types complets pour une DX optimale.",
    },
    {
      title: "Accessibilité ARIA",
      description: "Conformité WCAG 2.1 intégrée.",
    },
  ]}
  columns={3}
/>`;

export default function FeatureListSectionPage() {
  return (
    <div>
      <ComponentHeader
        name="FeatureListSection"
        description="Section de présentation des fonctionnalités en grille. Supporte un titre de section, sous-titre et de 2 à 4 colonnes. Chaque fonctionnalité peut avoir une icône, un titre et une description."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>6 fonctionnalités — 3 colonnes avec titre de section</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <FeatureListSection
            title="Pourquoi BricksLab ?"
            subtitle="Une bibliothèque de composants pensée pour la vitesse, la cohérence et l'accessibilité."
            features={demoFeatures}
            columns={3}
          />
        </div>
      </Preview>

      <SubLabel>2 colonnes</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <FeatureListSection
            features={demoFeatures.slice(0, 4)}
            columns={2}
          />
        </div>
      </Preview>

      <SubLabel>4 colonnes</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <FeatureListSection
            features={demoFeatures}
            columns={4}
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
