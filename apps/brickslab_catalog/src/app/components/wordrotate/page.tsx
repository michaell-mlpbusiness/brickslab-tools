"use client";

import React from "react";
import { WordRotate } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, SubLabel, Preview } from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  { name: "words", type: "string[]", required: true, description: "Liste de mots à alterner." },
  { name: "interval", type: "number", default: "2500", description: "Temps d'affichage par mot en ms." },
  { name: "transition", type: '"slide" | "fade" | "flip"', default: '"slide"', description: "Effet de transition entre les mots." },
  { name: "duration", type: "number", default: "0.4", description: "Durée de la transition en secondes." },
  { name: "pauseOnHover", type: "boolean", default: "false", description: "Met en pause la rotation au survol." },
  { name: "loop", type: "boolean", default: "true", description: "Boucle infinie ou arrêt au dernier mot." },
  { name: "reducedMotion", type: '"auto" | "always" | "never"', default: '"auto"', description: "Affiche statiquement si réduit." },
  { name: "onChange", type: "(index: number) => void", description: "Callback appelé à chaque changement de mot." },
];

const code = `import { WordRotate } from "@brickslab./ui-web";

// Headline dynamique
<h1>
  Je suis{" "}
  <WordRotate
    words={["Designer", "Développeur", "Créateur"]}
    transition="slide"
    interval={2000}
  />
</h1>

// Transition fade
<WordRotate
  words={["Rapide", "Fiable", "Accessible"]}
  transition="fade"
  pauseOnHover
/>`;

export default function WordRotatePage() {
  return (
    <div>
      <ComponentHeader
        name="WordRotate"
        description="Rotation de mots pour titres dynamiques. Alterne une liste de mots avec des transitions slide, fade ou flip à intervalle configurable."
      />

      <SectionTitle>Transitions</SectionTitle>
      <SubLabel>slide · fade · flip</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {(["slide", "fade", "flip"] as const).map((t) => (
            <div key={t} style={{ fontSize: 22, fontWeight: 600 }}>
              Transition «{" "}
              <WordRotate
                words={["Moderne", "Élégant", "Performant", "Accessible"]}
                transition={t}
                interval={2200}
              />
              {" "}» ({t})
            </div>
          ))}
        </div>
      </Preview>

      <SectionTitle>Dans un titre hero</SectionTitle>
      <Preview>
        <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.3 }}>
          Construire des interfaces{" "}
          <WordRotate
            words={["rapides", "belles", "accessibles", "cohérentes"]}
            transition="slide"
            interval={1800}
            style={{ color: "var(--color-brand)" }}
          />
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={code} />
    </div>
  );
}
