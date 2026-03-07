"use client";

import React, { useState } from "react";
import { TextReveal } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, SubLabel, Preview } from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  { name: "children", type: "string", required: true, description: "Texte à révéler." },
  { name: "by", type: '"word" | "character" | "line"', default: '"word"', description: "Granularité de révélation." },
  { name: "fade", type: "boolean", default: "true", description: "Applique un effet de fondu." },
  { name: "blur", type: "boolean", default: "true", description: "Applique un effet de flou à la révélation." },
  { name: "duration", type: "number", default: "0.6", description: "Durée par segment en secondes." },
  { name: "stagger", type: "number", default: "0.04", description: "Décalage entre segments en secondes." },
  { name: "startOnView", type: "boolean", default: "true", description: "Déclenche quand l'élément entre dans le viewport." },
  { name: "reducedMotion", type: '"auto" | "always" | "never"', default: '"auto"', description: "Désactive le flou/fade si réduit." },
];

const code = `import { TextReveal } from "@brickslab./ui-web";

// Révélation par mot au viewport
<TextReveal startOnView>
  Ce texte se révèle mot par mot en scrollant.
</TextReveal>

// Par caractère avec flou uniquement
<TextReveal by="character" blur fade={false} stagger={0.02}>
  Caractères avec blur
</TextReveal>`;

export default function TextRevealPage() {
  const [key, setKey] = useState(0);

  return (
    <div>
      <ComponentHeader
        name="TextReveal"
        description="Révélation progressive de texte au scroll. Chaque mot, caractère ou ligne apparaît avec fondu et/ou flou, idéal pour guider la lecture."
      />

      <SectionTitle>Par mot (défaut)</SectionTitle>
      <SubLabel>fade + blur — déclenchement au viewport</SubLabel>
      <Preview>
        <button onClick={() => setKey((k) => k + 1)} style={{ marginBottom: 16, fontSize: 12, padding: "4px 10px", border: "1px solid var(--c-border)", borderRadius: "var(--radius-sm)", background: "var(--c-surface)", color: "var(--color-fg)", cursor: "pointer" }}>
          Rejouer
        </button>
        <TextReveal key={`w-${key}`} startOnView={false} style={{ fontSize: 20, lineHeight: 1.6 }}>
          Chaque mot apparaît progressivement avec un effet de fondu et de flou subtil.
        </TextReveal>
      </Preview>

      <SectionTitle>Par caractère</SectionTitle>
      <Preview>
        <TextReveal key={`c-${key}`} by="character" stagger={0.025} startOnView={false} style={{ fontSize: 24, fontWeight: 600 }}>
          Lettre après lettre
        </TextReveal>
      </Preview>

      <SectionTitle>Fade seulement</SectionTitle>
      <Preview>
        <TextReveal key={`f-${key}`} blur={false} stagger={0.06} startOnView={false} style={{ fontSize: 18 }}>
          Révélation par fondu uniquement sans effet de flou
        </TextReveal>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={code} />
    </div>
  );
}
