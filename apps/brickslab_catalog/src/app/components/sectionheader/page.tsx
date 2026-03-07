"use client";

import { SectionHeader } from "@brickslab./ui-web";
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
    name: "title",
    type: "string",
    required: true,
    description: "Titre principal de la section.",
  },
  {
    name: "subtitle",
    type: "string",
    description: "Sous-titre optionnel affiché sous le titre principal.",
  },
  {
    name: "align",
    type: '"left" | "center" | "right"',
    default: '"left"',
    description: "Alignement horizontal du contenu du header.",
  },
  {
    name: "eyebrow",
    type: "string",
    description: "Texte court affiché au-dessus du titre (ex. : catégorie, tag, numéro de section). Souvent en couleur brand ou en petites majuscules.",
  },
  {
    name: "variant",
    type: '"default" | "compact"',
    default: '"default"',
    description: 'Style du header. "compact" réduit la hiérarchie visuelle et affiche un layout plus dense.',
  },
  {
    name: "count",
    type: "number",
    description: "Compteur optionnel affiché en badge quand variant='compact'.",
  },
];

const usageCode = `import { SectionHeader } from "@brickslab./ui-web";

// Avec eyebrow
<SectionHeader
  eyebrow="Nouveautés"
  title="Composants de mise en page"
  subtitle="Structures flexibles pour organiser vos pages."
/>

// Centré — typique des sections hero
<SectionHeader
  title="Build faster. Ship smarter."
  subtitle="BricksLab vous fournit les briques pour construire des interfaces modernes."
  align="center"
/>

// Minimal — titre seul
<SectionHeader title="Documentation" />`;

export default function SectionHeaderPage() {
  return (
    <div>
      <ComponentHeader
        name="SectionHeader"
        description="En-tête de section avec titre, sous-titre et eyebrow optionnels. Utilisé en début de sections de page pour introduire du contenu. Supporte 3 alignements et l'eyebrow pour les catégories ou numéros de section."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>avec eyebrow + subtitle — align: left</SubLabel>
      <Preview>
        <SectionHeader
          eyebrow="Composants"
          title="Mise en page & Structure"
          subtitle="Des blocs prêts à l'emploi pour organiser vos interfaces en sections cohérentes."
        />
      </Preview>

      <SubLabel>sans eyebrow — align: center</SubLabel>
      <Preview>
        <div style={{ width: "100%", textAlign: "center" }}>
          <SectionHeader
            title="Build faster. Ship smarter."
            subtitle="BricksLab vous fournit les briques pour construire des interfaces modernes et performantes."
            align="center"
          />
        </div>
      </Preview>

      <SubLabel>align variants</SubLabel>
      <Preview>
        {(["left", "center", "right"] as const).map((align) => (
          <div key={align} style={{ flex: 1, minWidth: 180, display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>{`align="${align}"`}</PropTag>
            <SectionHeader
              eyebrow="Section"
              title="Titre de section"
              align={align}
            />
          </div>
        ))}
      </Preview>

      <SubLabel>titre seul (minimal)</SubLabel>
      <Preview>
        <SectionHeader title="Documentation API" />
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
