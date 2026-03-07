"use client";

import React from "react";
import { AuroraText } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, SubLabel, Preview } from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  { name: "children", type: "ReactNode", required: true, description: "Texte à afficher avec l'effet aurora." },
  { name: "colors", type: "string[]", description: "Tableau de couleurs du dégradé. Défaut : brand palette." },
  { name: "speed", type: "number", default: "4", description: "Durée d'un cycle d'animation en secondes." },
  { name: "angle", type: "number", default: "135", description: "Angle du dégradé en degrés." },
  { name: "intensity", type: "number", default: "1", description: "Opacité globale (0–1)." },
  { name: "blendMode", type: '"normal" | "screen" | "overlay"', default: '"normal"', description: "Mode de fusion CSS." },
  { name: "reducedMotion", type: '"auto" | "always" | "never"', default: '"auto"', description: "Désactive l'animation si prefers-reduced-motion." },
];

const code = `import { AuroraText } from "@brickslab./ui-web";

<AuroraText>Design System Aurora</AuroraText>

// Couleurs personnalisées
<AuroraText colors={["#CC4A48", "#F59E0B", "#4ADE80"]}>
  Palette sur mesure
</AuroraText>

// Vitesse et angle
<AuroraText speed={8} angle={45}>
  Dégradé lent à 45°
</AuroraText>`;

export default function AuroraTextPage() {
  return (
    <div>
      <ComponentHeader
        name="AuroraText"
        description="Dégradé de couleurs animé appliqué directement sur le texte via background-clip. Idéal pour les héros et titres premium."
      />

      <SectionTitle>Défaut</SectionTitle>
      <SubLabel>palette brand — animation shift continue</SubLabel>
      <Preview>
        <AuroraText as="h2" style={{ fontSize: 36, fontWeight: 800, margin: 0 }}>
          Brickslab Design System
        </AuroraText>
      </Preview>

      <SectionTitle>Couleurs personnalisées</SectionTitle>
      <SubLabel>colors[] — palette entièrement configurable</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <AuroraText style={{ fontSize: 28, fontWeight: 700 }} colors={["#CC4A48", "#F59E0B", "#FBFBFB"]}>
            Chaud — rouge, ambre, blanc
          </AuroraText>
          <AuroraText style={{ fontSize: 28, fontWeight: 700 }} colors={["#60A5FA", "#A78BFA", "#34D399"]}>
            Froid — bleu, violet, vert
          </AuroraText>
        </div>
      </Preview>

      <SectionTitle>Vitesse</SectionTitle>
      <SubLabel>speed — cycles lents ou rapides</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <AuroraText style={{ fontSize: 22 }} speed={1.5}>Rapide (1.5s)</AuroraText>
          <AuroraText style={{ fontSize: 22 }} speed={8}>Lent (8s)</AuroraText>
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={code} />
    </div>
  );
}
