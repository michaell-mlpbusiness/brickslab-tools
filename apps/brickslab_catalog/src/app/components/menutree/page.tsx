"use client";

import { MenuTree } from "@brickslab./ui-web";
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
    name: "items",
    type: "MenuTreeItem[]",
    required: true,
    description: "Arbre de navigation. Chaque item peut avoir un label, un href optionnel et des children pour les sous-menus.",
  },
  {
    name: "activePath",
    type: "string",
    description: "Chemin de la page courante. L'item correspondant est mis en évidence.",
  },
  {
    name: "level",
    type: "number",
    default: "0",
    description: "Niveau d'indentation courant. Utilisé en interne pour le rendu récursif des sous-menus.",
  },
];

const usageCode = `import { MenuTree } from "@brickslab./ui-web";

<MenuTree
  items={[
    { label: "Accueil", href: "/" },
    {
      label: "Composants",
      children: [
        { label: "Heading",     href: "/components/heading" },
        { label: "Text",        href: "/components/text" },
        {
          label: "Navigation",
          children: [
            { label: "TopNav",     href: "/components/topnav" },
            { label: "SidebarNav", href: "/components/sidebarnav" },
          ],
        },
      ],
    },
    { label: "Documentation", href: "/docs" },
  ]}
  activePath="/components/topnav"
/>`;

export default function MenuTreePage() {
  return (
    <div>
      <ComponentHeader
        name="MenuTree"
        description="Menu de navigation arborescent avec support des sous-menus imbriqués. Rendu récursif basé sur la propriété children. L'élément actif est mis en évidence via activePath."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>menu à 2 niveaux avec activePath</SubLabel>
      <Preview>
        <div style={{ minWidth: 220 }}>
          <MenuTree
            items={[
              { label: "Accueil", href: "/" },
              {
                label: "Composants",
                children: [
                  { label: "Heading", href: "/components/heading" },
                  { label: "Text", href: "/components/text" },
                  { label: "TextBlock", href: "/components/textblock" },
                  {
                    label: "Navigation",
                    children: [
                      { label: "TopNav", href: "/components/topnav" },
                      { label: "SidebarNav", href: "/components/sidebarnav" },
                      { label: "MenuTree", href: "/components/menutree" },
                    ],
                  },
                ],
              },
              { label: "Documentation", href: "/docs" },
              { label: "Changelog", href: "/changelog" },
            ]}
            activePath="/components/menutree"
          />
        </div>
      </Preview>

      <SubLabel>menu plat sans sous-menus</SubLabel>
      <Preview>
        <div style={{ minWidth: 200 }}>
          <MenuTree
            items={[
              { label: "Accueil", href: "/" },
              { label: "À propos", href: "/about" },
              { label: "Blog", href: "/blog" },
              { label: "Contact", href: "/contact" },
            ]}
            activePath="/blog"
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
