"use client";

import { ComponentDetailPanel } from "@brickslab./ui-web";
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
    name: "name",
    type: "string",
    required: true,
    description: "Nom du composant documenté.",
  },
  {
    name: "description",
    type: "string",
    description: "Description courte du composant et de son usage.",
  },
  {
    name: "preview",
    type: "ReactNode",
    description: "Aperçu visuel interactif du composant.",
  },
  {
    name: "code",
    type: "string",
    description: "Extrait de code source illustrant l'utilisation du composant.",
  },
  {
    name: "badge",
    type: "string",
    description: "Badge optionnel (ex. : \"Nouveau\", \"Beta\", \"Stable\") affiché à côté du nom.",
  },
];

const sampleCode = `import { TagChip } from "@brickslab./ui-web";

<TagChip label="BricksLab" variant="brand" />
<TagChip label="React"     variant="default" />
<TagChip label="Archivé"   variant="muted" />`;

const usageCode = `import { ComponentDetailPanel } from "@brickslab./ui-web";

<ComponentDetailPanel
  name="TagChip"
  description="Étiquette compacte pour catégoriser du contenu avec 3 variantes et 2 tailles."
  badge="Stable"
  preview={
    <div style={{ display: "flex", gap: 8 }}>
      <TagChip label="React"     variant="brand" />
      <TagChip label="TypeScript" variant="default" />
    </div>
  }
  code={\`import { TagChip } from "@brickslab./ui-web";

<TagChip label="BricksLab" variant="brand" />\`}
/>`;

export default function ComponentDetailPanelPage() {
  return (
    <div>
      <ComponentHeader
        name="ComponentDetailPanel"
        description="Panneau de détail d'un composant regroupant son nom, badge de statut, description, aperçu visuel et extrait de code. Utilisé dans les pages de documentation et catalog pour présenter un composant de façon complète et standardisée."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>panneau complet — nom, badge, description, preview et code</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <ComponentDetailPanel
            name="TagChip"
            badge="Stable"
            description="Étiquette compacte pour catégoriser du contenu. 3 variantes visuelles (default, brand, muted) et 2 tailles (sm, md). Idéal pour les tags de projets, catégories d'articles ou filtres."
            preview={
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ padding: "3px 10px", background: "var(--color-brand)", color: "white", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 500 }}>brand</span>
                <span style={{ padding: "3px 10px", border: "1px solid var(--color-muted)", borderRadius: "999px", fontSize: "0.78rem" }}>default</span>
                <span style={{ padding: "3px 10px", background: "var(--color-muted)", opacity: 0.5, borderRadius: "999px", fontSize: "0.78rem" }}>muted</span>
              </div>
            }
            code={sampleCode}
          />
        </div>
      </Preview>

      <SubLabel>sans preview ni code</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <ComponentDetailPanel
            name="SectionGallery"
            badge="Nouveau"
            description="Galerie en grille configurable pour afficher une collection d'éléments React avec 1 à 4 colonnes."
          />
        </div>
      </Preview>

      <SubLabel>sans badge</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <ComponentDetailPanel
            name="AppShell"
            description="Coque d'application complète avec slots pour header, sidebar, footer et contenu principal."
            code={`<AppShell header={<HeaderBar />} sidebar={<SidebarNav />}>\n  <main>Contenu</main>\n</AppShell>`}
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
