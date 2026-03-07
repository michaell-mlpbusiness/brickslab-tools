"use client";

import React from "react";
import { ShimmerBorderText } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, SubLabel, Preview } from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  { name: "children", type: "string", required: true, description: "Texte à afficher avec l'effet shimmer." },
  { name: "strokeWidth", type: "number", default: "1", description: "Épaisseur du contour du texte (-webkit-text-stroke)." },
  { name: "strokeColor", type: "string", default: '"var(--color-fg)"', description: "Couleur du contour." },
  { name: "shimmerColor", type: "string", default: '"#FBFBFB"', description: "Couleur du reflet shimmer." },
  { name: "speed", type: "number", default: "2", description: "Durée d'un cycle shimmer en secondes." },
  { name: "fillMode", type: '"solid" | "transparent"', default: '"transparent"', description: "Remplissage du texte — transparent = contour seul." },
  { name: "reducedMotion", type: '"auto" | "always" | "never"', default: '"auto"', description: "Désactive le shimmer si réduit." },
];

const code = `import { ShimmerBorderText } from "@brickslab./ui-web";

// Contour shimmer transparent
<ShimmerBorderText>
  Outline shimmer
</ShimmerBorderText>

// Remplissage solide
<ShimmerBorderText fillMode="solid" strokeColor="#CC4A48" shimmerColor="#F59E0B">
  Texte plein + shimmer
</ShimmerBorderText>`;

export default function ShimmerBorderTextPage() {
  return (
    <div>
      <ComponentHeader
        name="ShimmerBorderText"
        description="Texte avec contour animé (stroke) et reflet shimmer glissant. Effet très design system — idéal pour les titres hero et les états vides."
      />

      <SectionTitle>Transparent (contour seul)</SectionTitle>
      <SubLabel>fillMode="transparent" — stroke + shimmer</SubLabel>
      <Preview>
        <ShimmerBorderText style={{ fontSize: 42, fontWeight: 800 }}>
          Brickslab
        </ShimmerBorderText>
      </Preview>

      <SectionTitle>Remplissage solide</SectionTitle>
      <SubLabel>fillMode="solid" — texte plein avec shimmer overlay</SubLabel>
      <Preview>
        <ShimmerBorderText
          fillMode="solid"
          strokeColor="var(--color-fg)"
          shimmerColor="rgba(255,255,255,0.6)"
          speed={1.5}
          style={{ fontSize: 36, fontWeight: 700 }}
        >
          Design System
        </ShimmerBorderText>
      </Preview>

      <SectionTitle>Couleurs brand</SectionTitle>
      <Preview>
        <ShimmerBorderText
          strokeColor="#CC4A48"
          shimmerColor="#F59E0B"
          strokeWidth={1.5}
          style={{ fontSize: 38, fontWeight: 800 }}
        >
          Composants UI
        </ShimmerBorderText>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={code} />
    </div>
  );
}
