"use client";

import React from "react";
import { SparklesText } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, SubLabel, Preview } from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  { name: "children", type: "string", required: true, description: "Texte affiché avec les sparkles." },
  { name: "count", type: "number", default: "8", description: "Nombre de sparkles générés." },
  { name: "size", type: "number", default: "10", description: "Taille de base des sparkles en px." },
  { name: "speed", type: "number", default: "1.2", description: "Durée d'un cycle de sparkle en secondes." },
  { name: "colors", type: "string[]", description: "Couleurs des sparkles. Défaut : palette brand." },
  { name: "area", type: '"text" | "bounds"', default: '"bounds"', description: "Zone de distribution des sparkles." },
  { name: "reducedMotion", type: '"auto" | "always" | "never"', default: '"auto"', description: "Désactive les sparkles si réduit." },
];

const code = `import { SparklesText } from "@brickslab./ui-web";

// CTA avec sparkles
<SparklesText count={10} size={12}>
  Nouveau composant ✨
</SparklesText>

// Couleurs custom
<SparklesText colors={["#F59E0B", "#FBFBFB"]} count={6}>
  Doré et blanc
</SparklesText>`;

export default function SparklesTextPage() {
  return (
    <div>
      <ComponentHeader
        name="SparklesText"
        description="Particules sparkle flottantes autour du texte. Idéal pour les CTA hero et les mises en avant premium sans être kitsch."
      />

      <SectionTitle>Défaut</SectionTitle>
      <SubLabel>palette brand — 8 sparkles</SubLabel>
      <Preview>
        <SparklesText style={{ fontSize: 28, fontWeight: 700 }}>
          Nouveau dans la bibliothèque
        </SparklesText>
      </Preview>

      <SectionTitle>Densité et taille</SectionTitle>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <SparklesText count={4} size={8} style={{ fontSize: 20 }}>
            Léger (4 sparkles, taille 8)
          </SparklesText>
          <SparklesText count={15} size={14} style={{ fontSize: 20 }}>
            Dense (15 sparkles, taille 14)
          </SparklesText>
        </div>
      </Preview>

      <SectionTitle>Couleurs personnalisées</SectionTitle>
      <Preview>
        <SparklesText
          colors={["#F59E0B", "#FBFBFB", "#F97316"]}
          count={10}
          style={{ fontSize: 26, fontWeight: 600 }}
        >
          Palette chaleureuse
        </SparklesText>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={code} />
    </div>
  );
}
