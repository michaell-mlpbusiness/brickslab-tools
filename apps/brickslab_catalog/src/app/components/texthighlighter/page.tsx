"use client";

import React, { useState } from "react";
import { TextHighlighter } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, SubLabel, Preview } from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  { name: "children", type: "ReactNode", required: true, description: "Texte ou contenu à annoter." },
  { name: "action", type: '"highlight" | "underline" | "box" | "circle" | "strike"', default: '"underline"', description: "Type d'annotation." },
  { name: "color", type: "string", default: '"#F59E0B"', description: "Couleur de l'annotation." },
  { name: "strokeWidth", type: "number", default: "3", description: "Épaisseur du trait SVG." },
  { name: "duration", type: "number", default: "0.6", description: "Durée de l'animation en secondes." },
  { name: "trigger", type: '"view" | "hover" | "manual"', default: '"view"', description: "Déclencheur de l'animation." },
  { name: "startOnView", type: "boolean", default: "true", description: "Déclenche à l'entrée dans le viewport." },
  { name: "reducedMotion", type: '"auto" | "always" | "never"', default: '"auto"', description: "Désactive l'animation si réduit." },
];

const code = `import { TextHighlighter } from "@brickslab./ui-web";

// Soulignement animé
<TextHighlighter action="underline">
  Mot important
</TextHighlighter>

// Encadrement
<TextHighlighter action="box" color="#CC4A48">
  Encadré en rouge
</TextHighlighter>

// Surlignage au survol
<TextHighlighter action="highlight" trigger="hover" color="#F59E0B">
  Surlignage hover
</TextHighlighter>`;

export default function TextHighlighterPage() {
  const [key, setKey] = useState(0);

  return (
    <div>
      <ComponentHeader
        name="TextHighlighter"
        description="Annotation SVG animée sur du texte — soulignement, encadrement, cercle, barré ou surlignage. Animation draw/fill configurable avec déclencheur view, hover ou manual."
      />

      <SectionTitle>Types d'annotation</SectionTitle>
      <SubLabel>highlight · underline · box · circle · strike</SubLabel>
      <Preview>
        <button onClick={() => setKey((k) => k + 1)} style={{ marginBottom: 16, fontSize: 12, padding: "4px 10px", border: "1px solid var(--c-border)", borderRadius: "var(--radius-sm)", background: "var(--c-surface)", color: "var(--color-fg)", cursor: "pointer" }}>
          Rejouer
        </button>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, fontSize: 20, fontWeight: 600 }}>
          {(["highlight", "underline", "box", "strike"] as const).map((a) => (
            <TextHighlighter key={`${a}-${key}`} action={a} trigger="view" startOnView={false}>
              {a}
            </TextHighlighter>
          ))}
        </div>
      </Preview>

      <SectionTitle>Hover</SectionTitle>
      <SubLabel>trigger="hover" — survolez le texte</SubLabel>
      <Preview>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", fontSize: 18 }}>
          <TextHighlighter action="underline" trigger="hover" color="#CC4A48">
            Soulignement hover
          </TextHighlighter>
          <TextHighlighter action="highlight" trigger="hover" color="#4ADE80">
            Surlignage hover
          </TextHighlighter>
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={code} />
    </div>
  );
}
