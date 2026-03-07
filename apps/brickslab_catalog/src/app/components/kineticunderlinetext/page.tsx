"use client";

import React from "react";
import { KineticUnderlineText } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, SubLabel, Preview } from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  { name: "children", type: "ReactNode", required: true, description: "Texte à souligner." },
  { name: "trigger", type: '"hover" | "focus" | "active"', default: '"hover"', description: "Déclencheur de l'animation de l'underline." },
  { name: "thickness", type: "number", default: "2", description: "Épaisseur du trait en px." },
  { name: "offset", type: "number", default: "2", description: "Décalage vertical sous le texte en px." },
  { name: "duration", type: "number", default: "0.3", description: "Durée de la transition en secondes." },
  { name: "easing", type: "string | number[]", default: '"ease"', description: "Timing function CSS." },
  { name: "reducedMotion", type: '"auto" | "always" | "never"', default: '"auto"', description: "Affiche l'underline directement si réduit." },
];

const code = `import { KineticUnderlineText } from "@brickslab./ui-web";

// Lien avec underline cinétique
<KineticUnderlineText>
  Survolez pour voir l'underline
</KineticUnderlineText>

// Épaisseur et couleur custom
<KineticUnderlineText thickness={3} duration={0.5}>
  Underline épais
</KineticUnderlineText>`;

export default function KineticUnderlineTextPage() {
  return (
    <div>
      <ComponentHeader
        name="KineticUnderlineText"
        description="Underline cinétique qui s'étend depuis le centre au hover, focus ou active. Idéal pour les liens et CTAs texte avec une touche moderne."
      />

      <SectionTitle>Hover (défaut)</SectionTitle>
      <SubLabel>S'étend depuis le centre vers les bords</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <KineticUnderlineText style={{ fontSize: 20, cursor: "pointer" }}>
            Survolez ce texte pour voir l'underline cinétique
          </KineticUnderlineText>
          <KineticUnderlineText thickness={3} duration={0.5} style={{ fontSize: 18, cursor: "pointer", color: "var(--color-brand)" }}>
            Trait épais (3px) — transition 0.5s
          </KineticUnderlineText>
        </div>
      </Preview>

      <SectionTitle>Dans une navigation</SectionTitle>
      <Preview>
        <nav style={{ display: "flex", gap: 32 }}>
          {["Accueil", "Composants", "Documentation", "À propos"].map((item) => (
            <KineticUnderlineText key={item} style={{ fontSize: 15, fontWeight: 500, cursor: "pointer" }}>
              {item}
            </KineticUnderlineText>
          ))}
        </nav>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={code} />
    </div>
  );
}
