"use client";

import React from "react";
import { AnimatedGradientText } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, SubLabel, Preview } from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  { name: "children", type: "ReactNode", required: true, description: "Texte à afficher avec le dégradé animé." },
  { name: "colorStops", type: "string[]", description: "Couleurs du dégradé. Défaut : palette brand." },
  { name: "speed", type: "number", default: "4", description: "Durée d'un cycle en secondes." },
  { name: "angle", type: "number", default: "90", description: "Angle du dégradé linéaire." },
  { name: "mode", type: '"linear" | "radial"', default: '"linear"', description: "Type de dégradé." },
  { name: "animate", type: '"shift" | "rotate" | "pulse"', default: '"shift"', description: "Style d'animation du dégradé." },
  { name: "reducedMotion", type: '"auto" | "always" | "never"', default: '"auto"', description: "Désactive l'animation si prefers-reduced-motion." },
];

const code = `import { AnimatedGradientText } from "@brickslab./ui-web";

<AnimatedGradientText>Dégradé animé par défaut</AnimatedGradientText>

// Palette custom + pulse
<AnimatedGradientText
  colorStops={["#CC4A48", "#F59E0B", "#4ADE80"]}
  animate="pulse"
  speed={3}
>
  Pulse coloré
</AnimatedGradientText>

// Mode radial
<AnimatedGradientText mode="radial">
  Centre lumineux
</AnimatedGradientText>`;

export default function AnimatedGradientTextPage() {
  return (
    <div>
      <ComponentHeader
        name="AnimatedGradientText"
        description="Dégradé animé sur du texte. Plus contrôlable qu'AuroraText, pensé pour les titres brandables avec choix du mode (shift/rotate/pulse) et du type (linear/radial)."
      />

      <SectionTitle>Modes d'animation</SectionTitle>
      <SubLabel>shift · rotate · pulse</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {(["shift", "rotate", "pulse"] as const).map((a) => (
            <AnimatedGradientText key={a} animate={a} style={{ fontSize: 26, fontWeight: 700 }}>
              Animation « {a} »
            </AnimatedGradientText>
          ))}
        </div>
      </Preview>

      <SectionTitle>Couleurs personnalisées</SectionTitle>
      <Preview>
        <AnimatedGradientText
          colorStops={["#CC4A48", "#F59E0B", "#4ADE80", "#60A5FA"]}
          style={{ fontSize: 30, fontWeight: 800 }}
        >
          Palette brand complète
        </AnimatedGradientText>
      </Preview>

      <SectionTitle>Mode radial</SectionTitle>
      <Preview>
        <AnimatedGradientText mode="radial" colorStops={["#FBFBFB", "#CC4A48"]} style={{ fontSize: 28, fontWeight: 700 }}>
          Centre vers bords
        </AnimatedGradientText>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={code} />
    </div>
  );
}
