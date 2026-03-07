"use client";

import React, { useState } from "react";
import { TextAnimate } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, SubLabel, Preview } from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  { name: "children", type: "string", required: true, description: "Texte à animer." },
  { name: "by", type: '"text" | "word" | "character" | "line"', default: '"word"', description: "Granularité de segmentation." },
  { name: "preset", type: '"fade" | "blur" | "slide" | "scale" | "rise"', default: '"fade"', description: "Preset d'animation par segment." },
  { name: "delay", type: "number", default: "0", description: "Délai initial en secondes avant la première animation." },
  { name: "stagger", type: "number", default: "0.05", description: "Délai entre chaque segment en secondes." },
  { name: "duration", type: "number", default: "0.5", description: "Durée de l'animation par segment." },
  { name: "startOnView", type: "boolean", default: "false", description: "Déclenche l'animation à l'entrée dans le viewport." },
  { name: "once", type: "boolean", default: "true", description: "N'anime qu'une seule fois si startOnView est actif." },
  { name: "reducedMotion", type: '"auto" | "always" | "never"', default: '"auto"', description: "Comportement quand prefers-reduced-motion est actif." },
  { name: "onStart", type: "() => void", description: "Callback déclenché au début de l'animation." },
  { name: "onComplete", type: "() => void", description: "Callback déclenché à la fin de l'animation." },
];

const code = `import { TextAnimate } from "@brickslab./ui-web";

<TextAnimate preset="slide" by="word">
  Chaque mot glisse vers le haut.
</TextAnimate>

<TextAnimate preset="blur" by="character" stagger={0.03}>
  Lettre par lettre, avec blur.
</TextAnimate>

<TextAnimate preset="rise" startOnView stagger={0.08}>
  Animé à l'entrée dans le viewport.
</TextAnimate>`;

export default function TextAnimatePage() {
  const [key, setKey] = useState(0);

  return (
    <div>
      <ComponentHeader
        name="TextAnimate"
        description="Animation multi-segments : découpe un texte par mot, caractère ou ligne et applique un preset d'animation (fade, blur, slide, scale, rise) avec stagger configurable."
      />

      <SectionTitle>Presets</SectionTitle>
      <SubLabel>fade · blur · slide · scale · rise — par mot</SubLabel>
      <Preview>
        <button onClick={() => setKey((k) => k + 1)} style={{ marginBottom: 16, fontSize: 12, padding: "4px 10px", border: "1px solid var(--c-border)", borderRadius: "var(--radius-sm)", background: "var(--c-surface)", color: "var(--color-fg)", cursor: "pointer" }}>
          Rejouer
        </button>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {(["fade", "blur", "slide", "scale", "rise"] as const).map((p) => (
            <TextAnimate key={`${p}-${key}`} preset={p} by="word" stagger={0.06} style={{ fontSize: 18 }}>
              {`Preset « ${p} » appliqué mot par mot`}
            </TextAnimate>
          ))}
        </div>
      </Preview>

      <SectionTitle>Par caractère</SectionTitle>
      <SubLabel>granularité character — stagger réduit</SubLabel>
      <Preview>
        <TextAnimate key={`char-${key}`} preset="blur" by="character" stagger={0.03} style={{ fontSize: 22, fontWeight: 600 }}>
          Chaque lettre arrive une à une
        </TextAnimate>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={code} />
    </div>
  );
}
