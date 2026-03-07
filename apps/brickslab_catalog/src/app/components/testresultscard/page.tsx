"use client";

import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";
import { TestResultsCard } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "results", type: "Array<{label:string,percent:number}>", required: true, description: "Résultats de tests par composant." },
];

const usageCode = `import { TestResultsCard } from "@brickslab./ui-web";

<TestResultsCard results={[{label: 'SearchBar', percent: 92}]} />`;

export default function TestResultsCardPage() {
  return (
    <div>
      <ComponentHeader
        name="TestResultsCard"
        description="Carte affichant un aperçu des résultats des tests des composants (pourcentage de tests passés)." 
      />

      <SectionTitle>Aperçu</SectionTitle>
      <SubLabel>Exemple de résultats</SubLabel>
      <Preview>
        <div style={{ padding: 16, maxWidth: 540 }}>
          <TestResultsCard
            results={[
              { label: "SearchBar", percent: 92 },
              { label: "Topbar", percent: 88 },
              { label: "FooterBar", percent: 100 },
              { label: "SectionGallery", percent: 90 },
            ]}
          />
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />
    </div>
  );
}
