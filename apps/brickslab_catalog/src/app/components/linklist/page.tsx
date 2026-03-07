"use client";

import { LinkList } from "@brickslab./ui-web";
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
    type: "LinkListItem[]",
    required: true,
    description: "Liste des liens à afficher. Chaque item contient un label, un href et une description optionnelle.",
  },
  {
    name: "title",
    type: "string",
    description: "Titre optionnel de la liste de liens.",
  },
];

const usageCode = `import { LinkList } from "@brickslab./ui-web";

// Avec descriptions
<LinkList
  title="Composants"
  links={[
    {
      label: "Heading",
      href: "/components/heading",
      description: "Titre sémantique h1–h6 avec contrôle du niveau et du ton.",
    },
    {
      label: "Text",
      href: "/components/text",
      description: "Texte courant en 4 variantes typographiques.",
    },
    {
      label: "TextCard",
      href: "/components/textcard",
      description: "Carte de contenu avec fond transparent, opaque ou flouté.",
    },
  ]}
/>

// Sans descriptions ni titre
<LinkList
  links={[
    { label: "Accueil", href: "/" },
    { label: "Composants", href: "/components" },
    { label: "Documentation", href: "/docs" },
  ]}
/>`;

export default function LinkListPage() {
  return (
    <div>
      <ComponentHeader
        name="LinkList"
        description="Liste de liens avec descriptions optionnelles. Idéal pour les menus de navigation, les catalogues de ressources ou les sections d'index avec courtes descriptions."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>avec titre et descriptions</SubLabel>
      <Preview>
        <LinkList
          title="Composants UI"
          links={[
            {
              label: "Heading",
              href: "/components/heading",
              description: "Titre sémantique h1–h6 avec contrôle du niveau, du ton et des effets visuels.",
            },
            {
              label: "Text",
              href: "/components/text",
              description: "Texte courant avec 4 variantes typographiques et 3 tons de couleur.",
            },
            {
              label: "TextCard",
              href: "/components/textcard",
              description: "Carte de contenu avec fond transparent, semi-opaque ou flouté.",
            },
            {
              label: "TagChip",
              href: "/components/tagchip",
              description: "Étiquette compacte pour catégoriser du contenu.",
            },
          ]}
        />
      </Preview>

      <SubLabel>sans descriptions</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>liens simples sans descriptions</PropTag>
          <LinkList
            links={[
              { label: "Accueil", href: "/" },
              { label: "Composants", href: "/components" },
              { label: "Documentation", href: "/docs" },
              { label: "Changelog", href: "/changelog" },
            ]}
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
