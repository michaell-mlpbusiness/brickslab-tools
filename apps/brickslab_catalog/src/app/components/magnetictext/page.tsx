"use client";

import React from "react";
import { MagneticText } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, SubLabel, Preview } from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  { name: "children", type: "ReactNode", required: true, description: "Contenu à aimanter." },
  { name: "strength", type: "number", default: "0.4", description: "Force du déplacement (0–1)." },
  { name: "radius", type: "number", default: "120", description: "Rayon d'attraction du curseur en px." },
  { name: "friction", type: "number", default: "0.15", description: "Friction du lerp — plus petit = plus fluide." },
  { name: "trigger", type: '"pointer" | "tilt"', default: '"pointer"', description: "Mode de déclenchement (pointeur souris ou inclinaison)." },
  { name: "disabledOnTouch", type: "boolean", default: "true", description: "Désactive l'effet sur les écrans tactiles." },
  { name: "reducedMotion", type: '"auto" | "always" | "never"', default: '"auto"', description: "Désactive le déplacement si réduit." },
];

const code = `import { MagneticText } from "@brickslab./ui-web";

// CTA aimanté
<MagneticText strength={0.5} radius={150}>
  <Button variant="primary">Découvrir</Button>
</MagneticText>

// Titre hero léger
<MagneticText strength={0.2} radius={200}>
  <h1>Brickslab</h1>
</MagneticText>`;

export default function MagneticTextPage() {
  return (
    <div>
      <ComponentHeader
        name="MagneticText"
        description="Texte aimanté qui suit le curseur dans un rayon défini. Effet parallax ultra moderne pour CTA et titres hero. Lerp fluide avec friction configurable."
      />

      <SectionTitle>Défaut</SectionTitle>
      <SubLabel>Déplacez le curseur au-dessus du texte</SubLabel>
      <Preview>
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap", padding: "24px 0", alignItems: "center" }}>
          <MagneticText style={{ fontSize: 28, fontWeight: 800, cursor: "default" }}>
            Brickslab
          </MagneticText>
          <MagneticText strength={0.6} style={{ fontSize: 20, fontWeight: 600, cursor: "default", color: "var(--color-brand)" }}>
            Force 0.6
          </MagneticText>
          <MagneticText strength={0.2} radius={80} style={{ fontSize: 20, cursor: "default", color: "var(--color-muted)" }}>
            Rayon étroit
          </MagneticText>
        </div>
      </Preview>

      <SectionTitle>Sur un CTA</SectionTitle>
      <Preview>
        <MagneticText strength={0.4} radius={100}>
          <span style={{
            display: "inline-block",
            padding: "12px 28px",
            background: "#CC4A48",
            color: "#FBFBFB",
            borderRadius: "var(--radius-md)",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
          }}>
            Découvrir la bibliothèque
          </span>
        </MagneticText>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={code} />
    </div>
  );
}
