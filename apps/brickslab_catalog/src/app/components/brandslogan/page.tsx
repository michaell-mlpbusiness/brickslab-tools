"use client";

import { BrandSlogan } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  PropTag,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  {
    name: "slogan",
    type: "string",
    default: '"Build faster. Ship smarter."',
    description: "Texte du slogan de marque affiché en évidence.",
  },
  {
    name: "company",
    type: "string",
    default: '"BricksLab"',
    description: "Nom de l'entreprise ou de la marque, affiché en complément du slogan.",
  },
];

const usageCode = `import { BrandSlogan } from "@brickslab./ui-web";

// Valeurs par défaut
<BrandSlogan />

// Slogan personnalisé
<BrandSlogan
  slogan="Des composants pour aller plus vite."
  company="BricksLab"
/>

// Marque tierce
<BrandSlogan
  slogan="Simplify your workflow."
  company="Acme Corp"
/>`;

export default function BrandSloganPage() {
  return (
    <div>
      <ComponentHeader
        name="BrandSlogan"
        description="Composant d'affichage du slogan et du nom de marque. Utilisé typiquement dans les footers, pages d'accueil ou écrans de présentation de l'application."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>valeurs par défaut</SubLabel>
      <Preview>
        <BrandSlogan />
      </Preview>

      <SubLabel>slogan et company personnalisés</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>slogan personnalisé</PropTag>
          <BrandSlogan
            slogan="Des composants pour aller plus vite."
            company="BricksLab"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>marque tierce</PropTag>
          <BrandSlogan
            slogan="Simplify your workflow."
            company="Acme Corp"
          />
        </div>
      </Preview>

      {/* ── Props ──────────────────────────────────────────────────── */}
      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      {/* ── Utilisation ────────────────────────────────────────────── */}
      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} />
    </div>
  );
}
