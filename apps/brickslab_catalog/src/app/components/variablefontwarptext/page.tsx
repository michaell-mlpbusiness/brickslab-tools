"use client";

import React from "react";
import { VariableFontWarpText } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, SubLabel, Preview } from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  { name: "children", type: "string", required: true, description: "Texte à déformer via les axes variable font." },
  { name: "axes", type: "FontAxes", description: "Axes à animer : wght, wdth, slnt — chacun avec [valeurMin, valeurMax]." },
  { name: "trigger", type: '"hover" | "scroll" | "view"', default: '"hover"', description: "Déclencheur de la déformation." },
  { name: "duration", type: "number", default: "0.4", description: "Durée de la transition en secondes." },
  { name: "easing", type: "string | number[]", default: '"ease"', description: "Timing function CSS ou cubic-bezier." },
  { name: "reducedMotion", type: '"auto" | "always" | "never"', default: '"auto"', description: "Désactive l'animation si réduit." },
];

const code = `import { VariableFontWarpText } from "@brickslab./ui-web";

// Poids au survol
<VariableFontWarpText axes={{ wght: [300, 900] }}>
  De léger à bold au survol
</VariableFontWarpText>

// Largeur + inclinaison
<VariableFontWarpText axes={{ wdth: [75, 125], slnt: [0, -10] }}>
  Élargi et incliné
</VariableFontWarpText>`;

export default function VariableFontWarpTextPage() {
  return (
    <div>
      <ComponentHeader
        name="VariableFontWarpText"
        description="Déformation subtile via les axes d'une variable font (wght, wdth, slnt). Transitions fluides sur hover, scroll ou viewport. Nécessite une police variable dans la page."
      />

      <SectionTitle>Axe wght (poids)</SectionTitle>
      <SubLabel>hover — de 300 à 900</SubLabel>
      <Preview>
        <VariableFontWarpText
          axes={{ wght: [300, 900] }}
          style={{ fontSize: 28, cursor: "pointer" }}
        >
          Survolez — poids variable
        </VariableFontWarpText>
      </Preview>

      <SectionTitle>Axe wdth (largeur)</SectionTitle>
      <SubLabel>hover — de condensé à étendu</SubLabel>
      <Preview>
        <VariableFontWarpText
          axes={{ wdth: [75, 125] }}
          style={{ fontSize: 28, cursor: "pointer" }}
        >
          Condensé → Étendu
        </VariableFontWarpText>
      </Preview>

      <SectionTitle>Combinaison d'axes</SectionTitle>
      <Preview>
        <VariableFontWarpText
          axes={{ wght: [400, 800], slnt: [0, -12] }}
          duration={0.6}
          style={{ fontSize: 26, cursor: "pointer" }}
        >
          Gras + inclinaison combinés
        </VariableFontWarpText>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={code} />
    </div>
  );
}
