"use client";

import React, { useState } from "react";
import { TypingAnimation } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, SubLabel, Preview } from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  { name: "text", type: "string", description: "Texte unique à taper." },
  { name: "words", type: "string[]", description: "Séquence de mots à alterner." },
  { name: "typeSpeed", type: "number", default: "60", description: "Vitesse de frappe en ms par caractère." },
  { name: "deleteSpeed", type: "number", default: "40", description: "Vitesse de suppression en ms par caractère." },
  { name: "loop", type: "boolean", default: "false", description: "Boucle infinie sur la séquence de mots." },
  { name: "showCursor", type: "boolean", default: "true", description: "Affiche le curseur clignotant." },
  { name: "cursor", type: '"line" | "block" | "underscore"', default: '"line"', description: "Forme du curseur." },
  { name: "startOnView", type: "boolean", default: "false", description: "Démarre quand l'élément entre dans le viewport." },
  { name: "reducedMotion", type: '"auto" | "always" | "never"', default: '"auto"', description: "Désactive l'animation si prefers-reduced-motion." },
];

const code = `import { TypingAnimation } from "@brickslab./ui-web";

// Texte unique
<TypingAnimation text="Bonjour, je suis une machine à écrire." />

// Séquence avec boucle
<TypingAnimation
  words={["Designer", "Développeur", "Créateur"]}
  loop
  typeSpeed={80}
  wordPause={1200}
/>

// Curseur bloc
<TypingAnimation text="Curseur bloc" cursor="block" />`;

export default function TypingAnimationPage() {
  return (
    <div>
      <ComponentHeader
        name="TypingAnimation"
        description="Effet machine à écrire — tape et efface un texte ou une séquence de mots avec curseur clignotant configurable."
      />

      <SectionTitle>Texte unique</SectionTitle>
      <SubLabel>text — frappe jusqu'à la fin et s'arrête</SubLabel>
      <Preview>
        <TypingAnimation text="Bienvenue dans le design system Brickslab." style={{ fontSize: 20 }} />
      </Preview>

      <SectionTitle>Séquence en boucle</SectionTitle>
      <SubLabel>words[] + loop — alterne entre plusieurs mots</SubLabel>
      <Preview>
        <div style={{ fontSize: 24, fontWeight: 600 }}>
          Je suis&nbsp;
          <TypingAnimation
            words={["Designer", "Développeur", "Créateur", "Innovateur"]}
            loop
            typeSpeed={80}
            wordPause={1200}
          />
        </div>
      </Preview>

      <SectionTitle>Variantes curseur</SectionTitle>
      <SubLabel>line · block · underscore</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <TypingAnimation text="Curseur ligne (line)" cursor="line" typeSpeed={50} />
          <TypingAnimation text="Curseur bloc (block)" cursor="block" typeSpeed={50} startDelay={1500} />
          <TypingAnimation text="Curseur underscore" cursor="underscore" typeSpeed={50} startDelay={3000} />
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={code} />
    </div>
  );
}
