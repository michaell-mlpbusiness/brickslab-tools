"use client";
import { useState } from "react";
import { SearchBar } from "@brickslab./ui-web";
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
    name: "value",
    type: "string",
    required: true,
    description: "Valeur courante du champ de recherche. Composant contrôlé.",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    required: true,
    description: "Callback déclenché à chaque changement de valeur dans le champ.",
  },
  {
    name: "placeholder",
    type: "string",
    description: "Texte indicatif affiché quand le champ est vide.",
  },
  {
    name: "onSubmit",
    type: "() => void",
    description: "Callback optionnel déclenché lors de la soumission (touche Entrée ou bouton de recherche).",
  },
  {
    name: "onClear",
    type: "() => void",
    description: "Affiche un bouton ✕ quand value est non vide. Déclenché au clic pour réinitialiser la valeur.",
  },
  {
    name: "elevated",
    type: "boolean",
    description: "Utilise var(--c-surface-elevated) comme fond au lieu de var(--c-surface). Utile dans les barres d'outils sur fond de surface.",
  },
];

const usageCode = `import { SearchBar } from "@brickslab./ui-web";
import { useState } from "react";

function Demo() {
  const [query, setQuery] = useState("");

  return (
    <SearchBar
      value={query}
      onChange={setQuery}
      onClear={() => setQuery("")}
      placeholder="Rechercher un composant..."
      elevated
    />
  );
}`;

export default function SearchBarPage() {
  const [query, setQuery] = useState("");
  const [query2, setQuery2] = useState("TextCard");

  return (
    <div>
      <ComponentHeader
        name="SearchBar"
        description="Champ de recherche contrôlé avec placeholder et callback de soumission. Composant entièrement contrôlé : la valeur et les changements sont gérés par le parent via value et onChange."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>avec onClear et elevated</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 320 }}>
          <PropTag>{`value="${query}" (live)`}</PropTag>
          <SearchBar
            value={query}
            onChange={setQuery}
            onClear={() => setQuery("")}
            placeholder="Rechercher un composant..."
            elevated
          />
          {query && (
            <span style={{ fontSize: "0.8rem", opacity: 0.6 }}>
              Requête : « {query} »
            </span>
          )}
        </div>
      </Preview>

      <SubLabel>sans onClear (pas de bouton ✕)</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 320 }}>
          <PropTag>{`value="${query2}" (pré-rempli)`}</PropTag>
          <SearchBar
            value={query2}
            onChange={setQuery2}
            placeholder="Rechercher..."
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
