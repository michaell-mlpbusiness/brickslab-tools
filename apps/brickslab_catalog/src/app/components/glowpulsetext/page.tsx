"use client";

import React from "react";
import { GlowPulseText } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, SubLabel, Preview } from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  { name: "children", type: "ReactNode", required: true, description: "Texte ou contenu à illuminer." },
  { name: "glowColor", type: "string", default: '"#CC4A48"', description: "Couleur du halo." },
  { name: "intensity", type: "number", default: "10", description: "Intensité (spread) du text-shadow en px." },
  { name: "pulse", type: "boolean", default: "true", description: "Active l'animation de pulsation." },
  { name: "pulseRate", type: "number", default: "2", description: "Durée d'un cycle de pulse en secondes." },
  { name: "trigger", type: '"always" | "hover" | "view"', default: '"always"', description: "Déclencheur du glow." },
  { name: "reducedMotion", type: '"auto" | "always" | "never"', default: '"auto"', description: "Désactive le pulse si réduit." },
];

const code = `import { GlowPulseText } from "@brickslab./ui-web";

// Glow permanent
<GlowPulseText glowColor="#CC4A48">
  Titre en glow continu
</GlowPulseText>

// Glow au hover
<GlowPulseText trigger="hover" glowColor="#4ADE80" intensity={15}>
  Hover pour glow
</GlowPulseText>

// Glow sans pulse (statique)
<GlowPulseText pulse={false} glowColor="#60A5FA">
  Halo fixe
</GlowPulseText>`;

export default function GlowPulseTextPage() {
  return (
    <div>
      <ComponentHeader
        name="GlowPulseText"
        description="Halo lumineux pulsant sur du texte via text-shadow animé. Déclenché en permanence, au hover ou au viewport. Utile pour les états actifs, succès ou alertes visuelles."
      />

      <SectionTitle>Glow permanent</SectionTitle>
      <SubLabel>trigger="always" — couleurs brand</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <GlowPulseText glowColor="#CC4A48" style={{ fontSize: 28, fontWeight: 700 }}>
            Glow brand rouge
          </GlowPulseText>
          <GlowPulseText glowColor="#4ADE80" style={{ fontSize: 28, fontWeight: 700 }}>
            Glow vert succès
          </GlowPulseText>
          <GlowPulseText glowColor="#60A5FA" style={{ fontSize: 28, fontWeight: 700 }}>
            Glow bleu info
          </GlowPulseText>
        </div>
      </Preview>

      <SectionTitle>Hover</SectionTitle>
      <SubLabel>trigger="hover" — survolez le texte</SubLabel>
      <Preview>
        <GlowPulseText trigger="hover" glowColor="#F59E0B" intensity={12} style={{ fontSize: 22, cursor: "pointer" }}>
          Survolez pour activer le glow
        </GlowPulseText>
      </Preview>

      <SectionTitle>Intensité</SectionTitle>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <GlowPulseText glowColor="#CC4A48" intensity={5} pulse={false} style={{ fontSize: 20 }}>Intensité 5</GlowPulseText>
          <GlowPulseText glowColor="#CC4A48" intensity={15} pulse={false} style={{ fontSize: 20 }}>Intensité 15</GlowPulseText>
          <GlowPulseText glowColor="#CC4A48" intensity={30} pulse={false} style={{ fontSize: 20 }}>Intensité 30</GlowPulseText>
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={code} />
    </div>
  );
}
