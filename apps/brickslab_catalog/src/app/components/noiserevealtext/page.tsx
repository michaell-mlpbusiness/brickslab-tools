"use client";

import React, { useState } from "react";
import { NoiseRevealText } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, SubLabel, Preview } from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  { name: "children", type: "string", required: true, description: "Texte à révéler." },
  { name: "direction", type: '"left" | "right" | "up" | "down"', default: '"left"', description: "Direction de la révélation." },
  { name: "duration", type: "number", default: "1.2", description: "Durée de la révélation en secondes." },
  { name: "intensity", type: "number", default: "20", description: "Intensité du filtre de déplacement noise." },
  { name: "noiseScale", type: "number", default: "0.05", description: "Fréquence du bruit (feTurbulence baseFrequency)." },
  { name: "startOnView", type: "boolean", default: "true", description: "Déclenche à l'entrée dans le viewport." },
  { name: "reducedMotion", type: '"auto" | "always" | "never"', default: '"auto"', description: "Affiche immédiatement si réduit." },
  { name: "onComplete", type: "() => void", description: "Callback à la fin de la révélation." },
];

const code = `import { NoiseRevealText } from "@brickslab./ui-web";

// Révélation de gauche à droite
<NoiseRevealText direction="left" startOnView>
  Révélation cinématique
</NoiseRevealText>

// Révélation du bas vers le haut
<NoiseRevealText direction="up" duration={1.5} intensity={30}>
  Montée progressive
</NoiseRevealText>`;

export default function NoiseRevealTextPage() {
  const [key, setKey] = useState(0);

  return (
    <div>
      <ComponentHeader
        name="NoiseRevealText"
        description="Révélation cinématique combinant un masque clip-path directionnel et un filtre SVG feTurbulence/feDisplacementMap pour un effet grain/noise premium."
      />

      <SectionTitle>Directions</SectionTitle>
      <SubLabel>left · right · up · down</SubLabel>
      <Preview>
        <button onClick={() => setKey((k) => k + 1)} style={{ marginBottom: 16, fontSize: 12, padding: "4px 10px", border: "1px solid var(--c-border)", borderRadius: "var(--radius-sm)", background: "var(--c-surface)", color: "var(--color-fg)", cursor: "pointer" }}>
          Rejouer
        </button>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {(["left", "right", "up", "down"] as const).map((d) => (
            <NoiseRevealText key={`${d}-${key}`} direction={d} startOnView={false} duration={1} style={{ fontSize: 22, fontWeight: 700 }}>
              {`Révélation direction « ${d} »`}
            </NoiseRevealText>
          ))}
        </div>
      </Preview>

      <SectionTitle>Titre hero</SectionTitle>
      <Preview>
        <NoiseRevealText
          key={`hero-${key}`}
          direction="left"
          duration={1.4}
          intensity={25}
          startOnView={false}
          style={{ fontSize: 36, fontWeight: 800 }}
        >
          Design system premium
        </NoiseRevealText>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={code} />
    </div>
  );
}
