"use client";

import { FooterLegal } from "@brickslab./ui-web";
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
    name: "copyright",
    type: "string",
    default: '"BricksLab"',
    description: "Nom de l'entreprise ou de l'entité pour la mention de copyright.",
  },
  {
    name: "year",
    type: "number",
    default: "année courante",
    description: "Année affichée dans la mention de copyright.",
  },
  {
    name: "links",
    type: "FooterLegalLink[]",
    description: "Liens légaux optionnels (ex. : Mentions légales, Politique de confidentialité). Chaque item contient un label et un href.",
  },
];

const usageCode = `import { FooterLegal } from "@brickslab./ui-web";

// Minimal — copyright seul
<FooterLegal />

// Avec année personnalisée
<FooterLegal copyright="BricksLab" year={2024} />

// Avec liens légaux
<FooterLegal
  copyright="BricksLab"
  year={2026}
  links={[
    { label: "Mentions légales", href: "/legal" },
    { label: "Confidentialité", href: "/privacy" },
    { label: "CGU", href: "/terms" },
  ]}
/>`;

export default function FooterLegalPage() {
  return (
    <div>
      <ComponentHeader
        name="FooterLegal"
        description="Bande de bas de page affichant la mention de copyright et des liens légaux optionnels. Typiquement placé en bas du footer principal."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>sans liens (minimal)</SubLabel>
      <Preview>
        <FooterLegal />
      </Preview>

      <SubLabel>avec liens légaux</SubLabel>
      <Preview>
        <FooterLegal
          copyright="BricksLab"
          year={2026}
          links={[
            { label: "Mentions légales", href: "/legal" },
            { label: "Confidentialité", href: "/privacy" },
            { label: "CGU", href: "/terms" },
          ]}
        />
      </Preview>

      <SubLabel>copyright et année personnalisés</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>copyright=&quot;Acme Corp&quot; year=&#123;2025&#125;</PropTag>
          <FooterLegal copyright="Acme Corp" year={2025} />
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
