"use client";

import React from "react";
import { ComponentPresentationSection } from "@brickslab./ui-web";
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
    name: "name",
    type: "string",
    required: true,
    description: "Nom du composant à présenter.",
  },
  {
    name: "description",
    type: "string",
    required: true,
    description: "Description ou explications du composant.",
  },
  {
    name: "preview",
    type: "React.ReactNode",
    required: true,
    description: "Contenu à afficher dans la zone de prévisualisation (composant ou rendu).",
  },
  {
    name: "children",
    type: "React.ReactNode",
    description: "Contenu optionnel supplémentaire (documentation, props table, etc.) affiché sous la preview.",
  },
];

const usageCode = `import { ComponentPresentationSection } from "@brickslab./ui-web";

export function MyComponentPresentation() {
  return (
    <ComponentPresentationSection
      name="MyComponent"
      description="Brève description du composant et ses cas d'usage."
      preview={<MyComponent />}
    >
      {/* Contenu optionnel: PropsTable, CodeBlock, etc. */}
      <PropsTable props={myProps} />
    </ComponentPresentationSection>
  );
}`;

export default function ComponentPresentationSectionPage() {
  return (
    <div>
      <ComponentHeader
        name="ComponentPresentationSection"
        description="Section de présentation de composant avec titre, description et zone de preview encadrée. Idéale pour documenter et showcaser des composants individuels dans une structure cohérente."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>Présentation simple</SubLabel>
      <Preview>
        <ComponentPresentationSection
          name="TextInput"
          description="Champ de saisie de texte avec support des variantes et états."
          preview={
            <input
              type="text"
              placeholder="Entrez du texte..."
              style={{
                padding: "8px 12px",
                border: "1px solid var(--c-border)",
                borderRadius: "4px",
                fontSize: "14px",
                color: "var(--color-fg)",
                backgroundColor: "var(--c-surface)",
              }}
            />
          }
        />
      </Preview>

      <SubLabel>Avec contenu enfant (children)</SubLabel>
      <Preview>
        <ComponentPresentationSection
          name="Badge"
          description="Élément d'étiquette compacte pour signaler des statuts."
          preview={
            <div
              style={{
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: "12px",
                backgroundColor: "var(--color-brand)",
                color: "white",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Active
            </div>
          }
        >
          <div style={{ marginTop: 16, fontSize: "13px", color: "var(--color-muted)" }}>
            💡 Ce badge est un exemple simple. Vous pouvez combiner plusieurs variantes avec différentes couleurs et tailles.
          </div>
        </ComponentPresentationSection>
      </Preview>

      <SubLabel>Plusieurs éléments en preview (grid)</SubLabel>
      <Preview>
        <ComponentPresentationSection
          name="Button States"
          description="Les différents états d'un bouton."
          preview={
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "var(--color-brand)",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Default
              </button>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "var(--c-surface-secondary)",
                  color: "var(--color-fg)",
                  border: "1px solid var(--c-border)",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Secondary
              </button>
              <button
                disabled
                style={{
                  padding: "8px 16px",
                  backgroundColor: "var(--c-surface-secondary)",
                  color: "var(--color-muted)",
                  border: "1px solid var(--c-border)",
                  borderRadius: "4px",
                  cursor: "not-allowed",
                  fontSize: "14px",
                  opacity: 0.5,
                }}
              >
                Disabled
              </button>
            </div>
          }
        />
      </Preview>

      {/* ── Props ──────────────────────────────────────────────────── */}
      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      {/* ── Utilisation ────────────────────────────────────────────── */}
      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />

      {/* ── Notes ──────────────────────────────────────────────────── */}
      <SectionTitle>Notes</SectionTitle>
      <div
        style={{
          padding: "16px",
          backgroundColor: "var(--c-surface-secondary)",
          borderRadius: "8px",
          borderLeft: "3px solid var(--color-brand)",
        }}
      >
        <p style={{ margin: 0, fontSize: "14px" }}>
            <code style={{ backgroundColor: "var(--c-surface)", padding: "2px 6px", borderRadius: "4px" }}>ComponentPresentationSection</code> est un wrapper de présentation idéal pour documenter les composants dans le catalogue. La prop <code style={{ backgroundColor: "var(--c-surface)", padding: "2px 6px", borderRadius: "4px" }}>children</code> permet d'ajouter du contenu supplémentaire sous la preview (description, code, props, etc.).
        </p>
      </div>
    </div>
  );
}
