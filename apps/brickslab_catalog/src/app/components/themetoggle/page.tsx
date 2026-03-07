"use client";

import { ThemeToggle } from "../../../catalog/ThemeToggle";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  {
    name: "(aucune)",
    type: "-",
    description: "Le composant n'accepte pas de props externes, il gère son propre état et persistance",
  },
];

const usageCode = `import { ThemeToggle } from "@brickslab/catalog";

function AppHeader() {
  return <ThemeToggle />;
}`;

export default function ThemeTogglePage() {
  return (
    <div>
      <ComponentHeader
        name="ThemeToggle"
        description="Interrupteur de thème somb­re / clair utilisant le composant ToggleSwitch de la librairie. Il persiste la préférence dans localStorage et applique une classe sur le root."
      />

      <SectionTitle>Caractéristiques</SectionTitle>
      <div style={{ padding: "16px", backgroundColor: "var(--c-surface-secondary)", borderRadius: "8px", marginBottom: "24px" }}>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li>Basculer entre les thèmes clair et sombre</li>
          <li>Prend en compte la préférence système au premier chargement</li>
          <li>Persistance via <code>localStorage</code></li>
          <li>Utilise le composant <code>ToggleSwitch</code> de @brickslab./ui-web</li>
        </ul>
      </div>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Démonstration</SectionTitle>
      <SubLabel>Le bouton est rendu ci‑dessous :</SubLabel>
      <Preview>
        <div style={{ padding: "16px" }}>
          <ThemeToggle />
        </div>
      </Preview>

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />

      <SectionTitle>Notes</SectionTitle>
      <div style={{ padding: "16px", backgroundColor: "var(--c-surface-secondary)", borderRadius: "8px", borderLeft: "3px solid var(--color-brand)" }}>
        <p style={{ margin: 0, fontSize: "14px" }}>
          ⚠️ Ce composant est spécifique au catalogue et n'est pas parti de la librairie UI.
        </p>
      </div>
    </div>
  );
}
