"use client";

import { TopNav } from "@brickslab./ui-web";
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
    type: "TopNavItem[]",
    required: true,
    description: "Liste des éléments de navigation. Chaque item contient un label et un href.",
  },
  {
    name: "activePath",
    type: "string",
    description: "Chemin de la page courante. L'item dont le href correspond à activePath est mis en évidence.",
  },
];

const usageCode = `import { TopNav } from "@brickslab./ui-web";

<TopNav
  items={[
    { label: "Accueil",      href: "/" },
    { label: "Composants",   href: "/components" },
    { label: "Documentation", href: "/docs" },
    { label: "À propos",     href: "/about" },
  ]}
  activePath="/components"
/>`;

export default function TopNavPage() {
  return (
    <div>
      <ComponentHeader
        name="TopNav"
        description="Navigation horizontale pour les barres de header. Affiche une liste de liens avec mise en évidence de l'élément actif basée sur activePath. Conçu pour s'intégrer dans HeaderBar."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>navigation standard avec élément actif</SubLabel>
      <Preview>
        <TopNav
          items={[
            { label: "Accueil", href: "/" },
            { label: "Composants", href: "/components" },
            { label: "Documentation", href: "/docs" },
            { label: "À propos", href: "/about" },
          ]}
          activePath="/components"
        />
      </Preview>

      <SubLabel>different active paths</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>{`activePath="/"`}</PropTag>
            <TopNav
              items={[
                { label: "Accueil", href: "/" },
                { label: "Composants", href: "/components" },
                { label: "Documentation", href: "/docs" },
              ]}
              activePath="/"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>{`activePath="/docs"`}</PropTag>
            <TopNav
              items={[
                { label: "Accueil", href: "/" },
                { label: "Composants", href: "/components" },
                { label: "Documentation", href: "/docs" },
              ]}
              activePath="/docs"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>sans activePath</PropTag>
            <TopNav
              items={[
                { label: "Accueil", href: "/" },
                { label: "Composants", href: "/components" },
                { label: "Documentation", href: "/docs" },
              ]}
            />
          </div>
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
