"use client";

import React, { useState } from "react";
import { NumberTicker } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, SubLabel, Preview } from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  { name: "value", type: "number", required: true, description: "Valeur cible à atteindre." },
  { name: "startValue", type: "number", default: "0", description: "Valeur de départ." },
  { name: "direction", type: '"up" | "down"', default: '"up"', description: "Sens de défilement." },
  { name: "duration", type: "number", default: "1.5", description: "Durée de l'animation en secondes." },
  { name: "decimalPlaces", type: "number", default: "0", description: "Nombre de décimales." },
  { name: "prefix", type: "string", description: "Préfixe affiché avant la valeur (ex: €, $)." },
  { name: "suffix", type: "string", description: "Suffixe affiché après la valeur (ex: %, K)." },
  { name: "separator", type: "boolean", default: "false", description: "Active le séparateur de milliers selon la locale." },
  { name: "startOnView", type: "boolean", default: "true", description: "Démarre au scroll dans le viewport." },
  { name: "reducedMotion", type: '"auto" | "always" | "never"', default: '"auto"', description: "Affiche la valeur finale directement si réduit." },
];

const code = `import { NumberTicker } from "@brickslab./ui-web";

// KPI simple
<NumberTicker value={1927} separator />

// Avec préfixe/suffixe
<NumberTicker value={98.5} prefix="+" suffix="%" decimalPlaces={1} />

// Défilement vers le bas
<NumberTicker value={0} startValue={100} direction="down" duration={2} />`;

export default function NumberTickerPage() {
  const [key, setKey] = useState(0);

  return (
    <div>
      <ComponentHeader
        name="NumberTicker"
        description="Compteur animé pour KPI et données chiffrées. Anime un nombre de startValue à value avec easing, formatage locale, prefix/suffix et déclenchement au viewport."
      />

      <SectionTitle>KPI basiques</SectionTitle>
      <SubLabel>startOnView={false} pour rejouer en démo</SubLabel>
      <Preview>
        <button onClick={() => setKey((k) => k + 1)} style={{ marginBottom: 16, fontSize: 12, padding: "4px 10px", border: "1px solid var(--c-border)", borderRadius: "var(--radius-sm)", background: "var(--c-surface)", color: "var(--color-fg)", cursor: "pointer" }}>
          Rejouer
        </button>
        <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}>
            <NumberTicker key={`a-${key}`} value={1927} separator startOnView={false} style={{ fontSize: 40, fontWeight: 800 }} />
            <div style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 4 }}>Composants testés</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <NumberTicker key={`b-${key}`} value={98.5} decimalPlaces={1} suffix="%" startOnView={false} style={{ fontSize: 40, fontWeight: 800 }} />
            <div style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 4 }}>Taux de réussite</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <NumberTicker key={`c-${key}`} value={47} suffix=" cpts" startOnView={false} style={{ fontSize: 40, fontWeight: 800 }} />
            <div style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 4 }}>Bibliothèque</div>
          </div>
        </div>
      </Preview>

      <SectionTitle>Avec prefix / suffix</SectionTitle>
      <Preview>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          <NumberTicker key={`d-${key}`} value={4999} prefix="€" separator startOnView={false} style={{ fontSize: 28, fontWeight: 700 }} />
          <NumberTicker key={`e-${key}`} value={75} suffix="%" startOnView={false} duration={2} style={{ fontSize: 28, fontWeight: 700 }} />
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={code} />
    </div>
  );
}
