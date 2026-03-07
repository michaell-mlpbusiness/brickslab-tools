"use client";

import { useState } from "react";
import { SearchResults } from "../../../catalog/SearchResults";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  {
    name: "query",
    type: "string",
    required: true,
    description: "Terme de recherche pour filtrer les composants. Vide si aucun résultat.",
  },
  {
    name: "onClose",
    type: "() => void",
    required: true,
    description: "Callback appelé pour fermer le dropdown (réinitialise la recherche).",
  },
];

const usageCode = `import { SearchResults } from "@brickslab/catalog";
import { useState } from "react";

export default function SearchDemo() {
  const [query, setQuery] = useState("");

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search components..."
      />
      <SearchResults
        query={query}
        onClose={() => setQuery("")}
      />
    </div>
  );
}`;

export default function SearchResultsPage() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <ComponentHeader
        name="SearchResults"
        description="Dropdown de résultats de recherche pour filtrer et naviguer les composants du catalogue. Composant personnalisé du catalogue qui affiche des résultats avec description et section."
      />

      {/* ── Caractéristiques ─────────────────────────────── */}
      <SectionTitle>Caractéristiques</SectionTitle>
      <div style={{ padding: "16px", backgroundColor: "var(--c-surface-secondary)", borderRadius: "8px", marginBottom: "24px" }}>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li><strong>Recherche multi-critères</strong> : Filtre par nom, section et description</li>
          <li><strong>Position absolute</strong> : S&apos;affiche sous le champ de recherche parent</li>
          <li><strong>Résultats cliquables</strong> : Navigation directe vers la page du composant</li>
          <li><strong>Hover effects</strong> : Background change au survol pour meilleure UX</li>
          <li><strong>Max height</strong> : 500px avec overflow scroll pour longs résultats</li>
          <li><strong>Shadow dropdown</strong> : Box-shadow pour profondeur visuelle</li>
          <li><strong>Responsive</strong> : S&apos;adapte automatiquement à la largeur du parent</li>
        </ul>
      </div>

      {/* ── Props ─────────────────────────────────────────────────── */}
      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      {/* ── Aperçu interactif ─────────────────────────────────────────────────── */}
      <SectionTitle>Démonstration interactive</SectionTitle>
      <SubLabel>Testez la recherche ci-dessous</SubLabel>
      <Preview>
        <div style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un composant…"
            style={{
              width: "100%",
              padding: "8px 12px",
              fontSize: "14px",
              border: "1px solid var(--c-border)",
              borderRadius: "6px",
              backgroundColor: "var(--c-surface-secondary, var(--c-surface))",
              color: "var(--color-fg)",
              outline: "none",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
          <SearchResults query={query} onClose={() => setQuery("")} />
        </div>
      </Preview>

      {/* ── Comportement ─────────────────────────────────────────────────── */}
      <SectionTitle>Comportement</SectionTitle>
      <div style={{ padding: "16px", backgroundColor: "var(--c-surface-secondary)", borderRadius: "8px", marginBottom: "24px" }}>
        <p style={{ marginTop: 0 }}><strong>Affichage:</strong></p>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li>Masqué si query est vide ou aucun résultat</li>
          <li>Visible quand des correspondances sont trouvées</li>
          <li>Chaque résultat affiche: nom (bold), description et section</li>
        </ul>
        <p><strong>Interaction:</strong></p>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li>Cliquer sur un résultat navigue vers la page du composant</li>
          <li>Appeler onClose() réinitialise la recherche et ferme le dropdown</li>
          <li>Hover sur un résultat change le background</li>
        </ul>
      </div>

      {/* ── Utilisation ────────────────────────────────────────────── */}
      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />

      {/* ── Notes ────────────────────────────────────────────── */}
      <SectionTitle>Notes</SectionTitle>
      <div style={{ padding: "16px", backgroundColor: "var(--c-surface-secondary)", borderRadius: "8px", borderLeft: "3px solid var(--color-brand)" }}>
        <p style={{ margin: 0, fontSize: "14px" }}>
          ⚠️ SearchResults est un composant du catalogue qui dépend de <code>searchComponents()</code> de <code>components.data.ts</code>, 
          qui est auto-généré depuis le fichier <code>components.csv</code>. La recherche est instantaneous et côté client.
        </p>
      </div>
    </div>
  );
}
