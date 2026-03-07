"use client";

import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";
import { ComponentsCountCard } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "count", type: "number", required: true, description: "Nombre total de composants." },
];

const usageCode = `import { ComponentsCountCard } from "@brickslab./ui-web";

<ComponentsCountCard count={36} />`;

export default function ComponentsCountCardPage() {
  return (
    <div>
      <ComponentHeader
        name="ComponentsCountCard"
        description="Carte affichant le nombre total de composants du design system. Utilisée dans le dashboard d'accueil."
      />

      <SectionTitle>Aperçu</SectionTitle>
      <SubLabel>Affiche le nombre total de composants</SubLabel>
      <Preview>
        <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
          <ComponentsCountCard count={36} />
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />
    </div>
  );
}
