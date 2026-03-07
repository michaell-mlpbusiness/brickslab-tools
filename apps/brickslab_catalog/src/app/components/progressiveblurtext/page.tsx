"use client";

import React, { useState } from "react";
import { ProgressiveBlurText } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, SubLabel, Preview } from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  { name: "children", type: "string", required: true, description: "Texte à révéler progressivement." },
  { name: "maxBlur", type: "number", default: "12", description: "Flou de départ en px." },
  { name: "duration", type: "number", default: "0.6", description: "Durée de la transition par mot en secondes." },
  { name: "trigger", type: '"scroll" | "view"', default: '"view"', description: "Mode de déclenchement." },
  { name: "startOnView", type: "boolean", default: "true", description: "Déclenche à l'entrée dans le viewport." },
  { name: "reducedMotion", type: '"auto" | "always" | "never"', default: '"auto"', description: "Affiche directement si réduit." },
  { name: "onComplete", type: "() => void", description: "Callback à la fin de la révélation." },
];

const code = `import { ProgressiveBlurText } from "@brickslab./ui-web";

// Révélation au viewport
<ProgressiveBlurText startOnView>
  Ce texte passe de flou à net mot par mot.
</ProgressiveBlurText>

// Flou intense + durée longue
<ProgressiveBlurText maxBlur={24} duration={0.8}>
  Révélation dramatique
</ProgressiveBlurText>`;

export default function ProgressiveBlurTextPage() {
  const [key, setKey] = useState(0);

  return (
    <div>
      <ComponentHeader
        name="ProgressiveBlurText"
        description="Chaque mot passe progressivement de flou à net avec un stagger, créant un effet de focus guidé. Idéal pour les textes de présentation et les blocs de contenu hero."
      />

      <SectionTitle>Défaut</SectionTitle>
      <SubLabel>blur 12px → 0 — mot par mot</SubLabel>
      <Preview>
        <button onClick={() => setKey((k) => k + 1)} style={{ marginBottom: 16, fontSize: 12, padding: "4px 10px", border: "1px solid var(--c-border)", borderRadius: "var(--radius-sm)", background: "var(--c-surface)", color: "var(--color-fg)", cursor: "pointer" }}>
          Rejouer
        </button>
        <ProgressiveBlurText key={key} startOnView={false} style={{ fontSize: 20, lineHeight: 1.7 }}>
          Chaque mot émerge progressivement du flou vers la netteté, guidant le regard du lecteur.
        </ProgressiveBlurText>
      </Preview>

      <SectionTitle>Flou intense</SectionTitle>
      <SubLabel>maxBlur=24 — effet dramatique</SubLabel>
      <Preview>
        <ProgressiveBlurText
          key={`d-${key}`}
          maxBlur={24}
          duration={0.8}
          startOnView={false}
          style={{ fontSize: 24, fontWeight: 700 }}
        >
          Design System Premium Brickslab
        </ProgressiveBlurText>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={code} />
    </div>
  );
}
