"use client";

import { SidebarNav } from "@brickslab./ui-web";
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
    name: "sections",
    type: "SidebarNavSection[]",
    required: true,
    description: "Tableau de sections de navigation. Chaque section a un titre et une liste d'items.",
  },
  {
    name: "activePath",
    type: "string",
    description: "Chemin de la page courante. L'item correspondant est mis en évidence.",
  },
  {
    name: "width",
    type: "number",
    default: "232",
    description: "Largeur en pixels de la sidebar.",
  },
];

const usageCode = `import { SidebarNav } from "@brickslab./ui-web";

<SidebarNav
  sections={[
    {
      title: "Typographie",
      items: [
        { label: "Heading", href: "/components/heading" },
        { label: "Text",    href: "/components/text" },
      ],
    },
    {
      title: "Navigation",
      items: [
        { label: "TopNav",     href: "/components/topnav" },
        { label: "SidebarNav", href: "/components/sidebarnav" },
        { label: "Breadcrumb", href: "/components/breadcrumb" },
      ],
    },
    {
      title: "Médias",
      items: [
        { label: "MediaImage",    href: "/components/mediaimage" },
        { label: "MediaCarousel", href: "/components/mediacarousel" },
      ],
    },
  ]}
  activePath="/components/topnav"
  width={232}
/>`;

export default function SidebarNavPage() {
  return (
    <div>
      <ComponentHeader
        name="SidebarNav"
        description="Navigation latérale organisée en sections avec items cliquables. Affiche l'item actif en fonction de activePath. En position fixe dans l'AppShell — le demo est encapsulé dans un conteneur relatif avec overflow hidden."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>sidebar avec 3 sections — conteneur relatif, overflow hidden</SubLabel>
      <Preview>
        <div style={{ position: "relative", height: 320, overflow: "hidden", border: "1px dashed var(--color-muted)", borderRadius: "var(--radius-md)", width: 240 }}>
          <SidebarNav
            sections={[
              {
                title: "Typographie",
                items: [
                  { label: "Heading", href: "/components/heading" },
                  { label: "Text", href: "/components/text" },
                  { label: "TextBlock", href: "/components/textblock" },
                ],
              },
              {
                title: "Navigation",
                items: [
                  { label: "TopNav", href: "/components/topnav" },
                  { label: "SidebarNav", href: "/components/sidebarnav" },
                  { label: "Breadcrumb", href: "/components/breadcrumb" },
                ],
              },
              {
                title: "Médias",
                items: [
                  { label: "MediaImage", href: "/components/mediaimage" },
                  { label: "MediaCarousel", href: "/components/mediacarousel" },
                ],
              },
            ]}
            activePath="/components/sidebarnav"
            width={232}
          />
        </div>
      </Preview>

      <SubLabel>largeur personnalisée (width=280)</SubLabel>
      <Preview>
        <div style={{ position: "relative", height: 200, overflow: "hidden", border: "1px dashed var(--color-muted)", borderRadius: "var(--radius-md)", width: 288 }}>
          <SidebarNav
            sections={[
              {
                title: "Composants",
                items: [
                  { label: "Heading", href: "/components/heading" },
                  { label: "Text", href: "/components/text" },
                  { label: "TagChip", href: "/components/tagchip" },
                ],
              },
            ]}
            activePath="/components/heading"
            width={280}
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
