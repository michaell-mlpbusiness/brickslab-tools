"use client";

import React, { useState } from "react";
import { SegmentEmphasisText } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, SubLabel, Preview } from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  { name: "children", type: "string", required: true, description: "Texte à analyser et mettre en emphase." },
  { name: "highlights", type: "SegmentHighlight[]", required: true, description: "Règles de mise en emphase avec match et effet." },
  { name: "by", type: '"word" | "match"', default: '"word"', description: "Stratégie de correspondance." },
  { name: "duration", type: "number", default: "0.4", description: "Durée de l'animation par segment." },
  { name: "stagger", type: "number", default: "0.05", description: "Décalage entre segments." },
  { name: "startOnView", type: "boolean", default: "true", description: "Déclenche au viewport." },
  { name: "reducedMotion", type: '"auto" | "always" | "never"', default: '"auto"', description: "Désactive les animations si réduit." },
];

const code = `import { SegmentEmphasisText } from "@brickslab./ui-web";

<SegmentEmphasisText
  highlights={[
    { match: "rapide", effect: "raise" },
    { match: "accessible", effect: "glow" },
    { match: "moderne", effect: "gradient" },
  ]}
>
  Un design system rapide accessible et moderne.
</SegmentEmphasisText>`;

export default function SegmentEmphasisTextPage() {
  const [key, setKey] = useState(0);

  return (
    <div>
      <ComponentHeader
        name="SegmentEmphasisText"
        description="Mise en avant intelligente de mots clés dans un texte avec des effets raise, glow, underline ou gradient. Les correspondances sont définies par string ou RegExp."
      />

      <SectionTitle>Effets par mot</SectionTitle>
      <SubLabel>raise · glow · underline · gradient</SubLabel>
      <Preview>
        <button onClick={() => setKey((k) => k + 1)} style={{ marginBottom: 16, fontSize: 12, padding: "4px 10px", border: "1px solid var(--c-border)", borderRadius: "var(--radius-sm)", background: "var(--c-surface)", color: "var(--color-fg)", cursor: "pointer" }}>
          Rejouer
        </button>
        <SegmentEmphasisText
          key={key}
          startOnView={false}
          style={{ fontSize: 20, lineHeight: 1.7 }}
          highlights={[
            { match: "rapide", effect: "raise" },
            { match: "accessible", effect: "underline" },
            { match: "moderne", effect: "gradient" },
          ]}
        >
          Un design system rapide accessible et moderne pour construire des interfaces.
        </SegmentEmphasisText>
      </Preview>

      <SectionTitle>Glow sur mots clés</SectionTitle>
      <Preview>
        <SegmentEmphasisText
          key={`g-${key}`}
          startOnView={false}
          style={{ fontSize: 22, fontWeight: 600 }}
          highlights={[
            { match: "Brickslab", effect: "glow" },
            { match: "composants", effect: "underline" },
          ]}
        >
          Brickslab fournit 47 composants React prêts à l'emploi.
        </SegmentEmphasisText>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={code} />
    </div>
  );
}
