"use client";

import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";
import { DashboardHero } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "totalComponents", type: "number", required: true, description: "Nombre total de composants affichés dans le titre." },
  { name: "subtitle", type: "string", required: false, description: "Sous-titre affiché au-dessus du titre principal.", default: '"Tableau de bord Brickslab"' },
  { name: "primaryLabel", type: "string", required: false, description: "Libellé du bouton CTA principal.", default: '"Parcourir le catalogue"' },
  { name: "primaryHref", type: "string", required: false, description: "URL du bouton CTA principal.", default: '"/components/sectiongallery"' },
  { name: "secondaryLabel", type: "string", required: false, description: "Libellé du bouton CTA secondaire.", default: '"Voir les fondations"' },
  { name: "secondaryHref", type: "string", required: false, description: "URL du bouton CTA secondaire.", default: '"/components/searchbar"' },
];

const usageCode = `import { DashboardHero } from "@brickslab./ui-web";

<DashboardHero
  totalComponents={42}
  subtitle="Tableau de bord Brickslab"
  primaryLabel="Parcourir le catalogue"
  primaryHref="/components/sectiongallery"
  secondaryLabel="Voir les fondations"
  secondaryHref="/components/searchbar"
/>`;

export default function DashboardHeroPage() {
  return (
    <div>
      <ComponentHeader
        name="DashboardHero"
        description="Section hero du dashboard : titre dynamique avec compteur de composants, description du design system et deux boutons CTA."
      />

      <SectionTitle>Aperçu</SectionTitle>
      <SubLabel>Hero complet avec CTA et panneau d'information</SubLabel>
      <Preview>
        <DashboardHero totalComponents={42} />
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />
    </div>
  );
}
