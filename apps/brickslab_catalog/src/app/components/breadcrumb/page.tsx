"use client";

import { Breadcrumb } from "@brickslab./ui-web";
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
    type: "BreadcrumbItem[]",
    required: true,
    description: "Liste des éléments du fil d'Ariane. Le dernier élément représente la page courante (sans href).",
  },
  {
    name: "separator",
    type: "string",
    default: '"/"',
    description: "Caractère ou chaîne utilisé comme séparateur entre les éléments.",
  },
];

const usageCode = `import { Breadcrumb } from "@brickslab./ui-web";

// Fil d'Ariane à 3 niveaux
<Breadcrumb
  items={[
    { label: "Accueil", href: "/" },
    { label: "Composants", href: "/components" },
    { label: "Breadcrumb" },
  ]}
/>

// Séparateur personnalisé
<Breadcrumb
  items={[
    { label: "Accueil", href: "/" },
    { label: "Documentation", href: "/docs" },
    { label: "Mise en route" },
  ]}
  separator="›"
/>

// Fil d'Ariane minimal (2 niveaux)
<Breadcrumb
  items={[
    { label: "Composants", href: "/components" },
    { label: "Heading" },
  ]}
/>`;

export default function BreadcrumbPage() {
  return (
    <div>
      <ComponentHeader
        name="Breadcrumb"
        description="Fil d'Ariane de navigation permettant à l'utilisateur de visualiser et naviguer dans la hiérarchie des pages. Supporte les liens internes, les séparateurs personnalisés et marque automatiquement l'élément courant."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>3 niveaux — séparateur par défaut « / »</SubLabel>
      <Preview>
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Composants", href: "/components" },
            { label: "Breadcrumb" },
          ]}
        />
      </Preview>

      <SubLabel>séparateurs personnalisés</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`separator="›"`}</PropTag>
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Documentation", href: "/docs" },
              { label: "Mise en route" },
            ]}
            separator="›"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`separator="→"`}</PropTag>
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Composants", href: "/components" },
              { label: "Navigation" },
            ]}
            separator="→"
          />
        </div>
      </Preview>

      <SubLabel>2 niveaux</SubLabel>
      <Preview>
        <Breadcrumb
          items={[
            { label: "Composants", href: "/components" },
            { label: "Heading" },
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
