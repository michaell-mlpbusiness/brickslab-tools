"use client";

import React from "react";
import { CarouselWithTextSection } from "@brickslab./ui-web";
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
    name: "title",
    type: "string",
    required: true,
    description: "Titre de la section.",
  },
  {
    name: "description",
    type: "string",
    description: "Description ou texte accompagnant le titre (optionnel).",
  },
  {
    name: "carousel",
    type: "React.ReactNode",
    required: true,
    description: "Contenu du carrousel (généralement MediaCarousel ou autre galerie).",
  },
  {
    name: "actions",
    type: "React.ReactNode",
    description: "Boutons ou actions additionnelles à afficher sous la description.",
  },
  {
    name: "imageLeft",
    type: "boolean",
    default: "false",
    description: "Si true, place le carrousel à gauche et le texte à droite. Par défaut, carrousel à droite.",
  },
  {
    name: "variant",
    type: '"default" | "overlay"',
    default: '"default"',
    description: 'Variante de layout. "default" : disposition côte à côte. "overlay" : texte superposé sur le carrousel.',
  },
];

const usageCode = `import { CarouselWithTextSection } from "@brickslab./ui-web";

// Variante par défaut (côte à côte)
export function DefaultVariant() {
  return (
    <CarouselWithTextSection
      title="Découvrez nos produits"
      description="Disposition côte à côte avec carrousel et texte."
      carousel={<div>/* Votre carrousel ici */</div>}
      imageLeft={false}
    />
  );
}

// Variante overlay (texte superposé)
export function OverlayVariant() {
  return (
    <CarouselWithTextSection
      title="Collection Exclusive"
      description="Texte superposé sur le carrousel avec gradient."
      carousel={<div>/* Votre carrousel ici */</div>}
      variant="overlay"
      imageLeft={false}
    />
  );
}`;

export default function CarouselWithTextSectionPage() {
  // This section component doesn't use mock images since carousel is flexible
  return (
    <div>
      <ComponentHeader
        name="CarouselWithTextSection"
        description="Section combinant un carrousel d'images avec du contenu texte. Permet de présenter des produits, collections ou packs avec une mise en page flexible (image à gauche ou à droite)."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>Disposition standard (carrousel à droite)</SubLabel>
      <Preview>
        <CarouselWithTextSection
          title="Produit Premium"
          description="Découvrez notre collection exclusive avec des images haute résolution et une présentation moderne."
          carousel={
            <div
              style={{
                width: "100%",
                height: 300,
                backgroundColor: "var(--c-surface-secondary)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-fg)",
              }}
            >
              📸 Carrousel (placeholder)
            </div>
          }
          imageLeft={false}
        />
      </Preview>

      <SubLabel>Disposition inversée (carrousel à gauche)</SubLabel>
      <Preview>
        <CarouselWithTextSection
          title="Nouvelle Collection"
          description="Parcourez nos dernières créations avec un carrousel interactif."
          carousel={
            <div
              style={{
                width: "100%",
                height: 300,
                backgroundColor: "var(--c-surface-secondary)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-fg)",
              }}
            >
              📸 Carrousel (placeholder)
            </div>
          }
          imageLeft={true}
        />
      </Preview>

      <SubLabel>Sans description ni actions</SubLabel>
      <Preview>
        <CarouselWithTextSection
          title="Simple et épuré"
          carousel={
            <div
              style={{
                width: "100%",
                height: 300,
                backgroundColor: "var(--c-surface-secondary)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-fg)",
              }}
            >
              📸 Carrousel (placeholder)
            </div>
          }
        />
      </Preview>

      <SubLabel>Variante overlay (carrousel en fond, texte par-dessus)</SubLabel>
      <Preview>
        <CarouselWithTextSection
          title="Titre Overlay"
          description="Le texte se superpose au carrousel avec un gradient sombre pour améliorer la lisibilité."
          carousel={
            <div
              style={{
                width: "100%",
                height: 400,
                backgroundColor: "var(--c-surface-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-fg)",
                fontSize: "18px",
              }}
            >
              📸 Carrousel en arrière-plan
            </div>
          }
          variant="overlay"
        />
      </Preview>

      <SubLabel>Variante overlay (texte à droite)</SubLabel>
      <Preview>
        <CarouselWithTextSection
          title="Collection Exclusive"
          description="Découvrez nos produits avec un texte positionné à droite."
          carousel={
            <div
              style={{
                width: "100%",
                height: 400,
                backgroundColor: "var(--c-surface-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-fg)",
                fontSize: "18px",
              }}
            >
              📸 Carrousel en arrière-plan
            </div>
          }
          variant="overlay"
          imageLeft
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
        <p style={{ margin: 0, fontSize: "14px", marginBottom: 12 }}>
          💡 <strong>Deux variantes disponibles :</strong>
        </p>
        <ul style={{ margin: 0, marginLeft: 20, fontSize: "14px", lineHeight: 1.6 }}>
          <li><code style={{ backgroundColor: "var(--c-surface)", padding: "2px 6px", borderRadius: "4px" }}>variant="default"</code> : Disposition côte à côte (carrousel et texte côte à côte)</li>
          <li><code style={{ backgroundColor: "var(--c-surface)", padding: "2px 6px", borderRadius: "4px" }}>variant="overlay"</code> : Texte superposé sur le carrousel avec gradient pour la lisibilité</li>
        </ul>
      </div>
    </div>
  );
}
