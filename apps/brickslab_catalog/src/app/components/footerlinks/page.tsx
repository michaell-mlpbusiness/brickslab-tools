"use client";

import { FooterLinks } from "@brickslab./ui-web";
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
    name: "links",
    type: "FooterLinksItem[]",
    required: true,
    description: "Liste des liens à afficher dans la colonne. Chaque item contient un label et un href.",
  },
  {
    name: "title",
    type: "string",
    description: "Titre optionnel de la colonne de liens. Affiché en en-tête de la liste.",
  },
];

const usageCode = `import { FooterLinks } from "@brickslab./ui-web";

// Colonne avec titre
<FooterLinks
  title="Produit"
  links={[
    { label: "Fonctionnalités", href: "/features" },
    { label: "Tarifs",          href: "/pricing" },
    { label: "Changelog",       href: "/changelog" },
    { label: "Roadmap",         href: "/roadmap" },
  ]}
/>

// Colonne sans titre
<FooterLinks
  links={[
    { label: "À propos",  href: "/about" },
    { label: "Blog",      href: "/blog" },
    { label: "Carrières", href: "/careers" },
  ]}
/>`;

export default function FooterLinksPage() {
  return (
    <div>
      <ComponentHeader
        name="FooterLinks"
        description="Colonne de liens pour footer organisée avec un titre optionnel. Composant de base pour construire des footers multi-colonnes avec navigation secondaire."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>colonnes de liens typiques d&apos;un footer</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>Produit</PropTag>
          <FooterLinks
            title="Produit"
            links={[
              { label: "Fonctionnalités", href: "/features" },
              { label: "Tarifs", href: "/pricing" },
              { label: "Changelog", href: "/changelog" },
              { label: "Roadmap", href: "/roadmap" },
            ]}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>Ressources</PropTag>
          <FooterLinks
            title="Ressources"
            links={[
              { label: "Documentation", href: "/docs" },
              { label: "Guides", href: "/guides" },
              { label: "API Reference", href: "/api" },
              { label: "Exemples", href: "/examples" },
            ]}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>Entreprise</PropTag>
          <FooterLinks
            title="Entreprise"
            links={[
              { label: "À propos", href: "/about" },
              { label: "Blog", href: "/blog" },
              { label: "Carrières", href: "/careers" },
              { label: "Contact", href: "/contact" },
            ]}
          />
        </div>
      </Preview>

      <SubLabel>sans titre</SubLabel>
      <Preview>
        <FooterLinks
          links={[
            { label: "Mentions légales", href: "/legal" },
            { label: "Confidentialité", href: "/privacy" },
            { label: "CGU", href: "/terms" },
          ]}
        />
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
