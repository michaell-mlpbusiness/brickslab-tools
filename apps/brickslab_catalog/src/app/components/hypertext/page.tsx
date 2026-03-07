"use client";

import React from "react";
import { HyperText } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, SubLabel, Preview } from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  { name: "children", type: "string", required: true, description: "Texte à brouiller." },
  { name: "trigger", type: '"hover" | "tap" | "auto" | "view"', default: '"hover"', description: "Déclencheur de l'effet scramble." },
  { name: "duration", type: "number", default: "0.8", description: "Durée de l'animation en secondes." },
  { name: "delay", type: "number", default: "0", description: "Délai initial en secondes." },
  { name: "characterSet", type: "string[]", description: "Jeu de caractères utilisé pour le scramble." },
  { name: "startOnView", type: "boolean", default: "false", description: "Démarre quand visible dans le viewport." },
  { name: "reducedMotion", type: '"auto" | "always" | "never"', default: '"auto"', description: "Affiche le texte directement si réduit." },
  { name: "onComplete", type: "() => void", description: "Callback à la fin du scramble." },
];

const code = `import { HyperText } from "@brickslab./ui-web";

// Scramble au survol (défaut)
<HyperText>Survolez-moi</HyperText>

// Automatique
<HyperText trigger="auto" delay={0.5}>
  Chargement automatique
</HyperText>

// Jeu de caractères custom
<HyperText characterSet={["0", "1"]} duration={1.2}>
  Mode binaire
</HyperText>`;

export default function HyperTextPage() {
  return (
    <div>
      <ComponentHeader
        name="HyperText"
        description='Effet "scramble" : les caractères se brouillent avant de se résoudre en texte final. Déclenché par hover, tap, auto ou viewport. Idéal pour les micro-interactions sur CTA et titres.'
      />

      <SectionTitle>Hover (défaut)</SectionTitle>
      <SubLabel>trigger="hover" — survolez le texte</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <HyperText style={{ fontSize: 24, fontWeight: 700, cursor: "pointer", display: "inline-block" }}>
            Survolez pour déclencher le scramble
          </HyperText>
          <HyperText style={{ fontSize: 18, cursor: "pointer", display: "inline-block", color: "var(--color-brand)" }}>
            Brickslab Design System
          </HyperText>
        </div>
      </Preview>

      <SectionTitle>Automatique au chargement</SectionTitle>
      <SubLabel>trigger="auto"</SubLabel>
      <Preview>
        <HyperText trigger="auto" style={{ fontSize: 20, fontWeight: 600 }}>
          Animation automatique
        </HyperText>
      </Preview>

      <SectionTitle>Jeu de caractères binaire</SectionTitle>
      <Preview>
        <HyperText
          characterSet={["0", "1"]}
          trigger="hover"
          duration={1.2}
          style={{ fontSize: 20, fontFamily: "monospace", cursor: "pointer" }}
        >
          01001000 01100101 01101100 01101100 01101111
        </HyperText>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={code} />
    </div>
  );
}
