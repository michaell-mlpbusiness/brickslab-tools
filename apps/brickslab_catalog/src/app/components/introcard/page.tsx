"use client";

import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";
import { IntroCard } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "title", type: "string", required: true, description: "Titre affiché" },
  { name: "description", type: "string", description: "Texte secondaire" },
  { name: "highlight", type: "string", description: "Texte mis en avant" },
  { name: "cta", type: "{label:string;href:string}", description: "Call-to-action" },
];

const usageCode = `import { IntroCard } from "@brickslab./ui-web";

<IntroCard
  title="Bienvenue sur Brickslab"
  description="Centralisez vos composants et tokens."
  highlight="Nouvelle version disponible"
  cta={{ label: "Découvrir", href: "/docs" }}
/>`;

export default function IntroCardPage() {
  return (
    <div>
      <ComponentHeader
        name="IntroCard"
        description="Bloc d&apos;introduction présentant la solution Brickslab et liens rapides." 
      />

      <SectionTitle>Aperçu</SectionTitle>
      <SubLabel>IntroCard avec tous les éléments</SubLabel>
      <Preview>
        <IntroCard
          title="Brickslab — Design System"
          description="Centralisez vos composants, tokens et documentation pour accélérer vos livraisons."
          highlight="Nouvelle version avec thème sombre inclus"
          cta={{ label: "En savoir plus", href: "/docs" }}
        />
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />
    </div>
  );
}
