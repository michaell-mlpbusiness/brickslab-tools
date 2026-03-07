"use client";
import { useState } from "react";
import { Button } from "@brickslab./ui-web";
import { FiArrowRight, FiDownload, FiTrash2, FiPlus } from "react-icons/fi";
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
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "Contenu du bouton (texte ou éléments React).",
  },
  {
    name: "variant",
    type: '"primary" | "secondary" | "ghost" | "danger" | "custom"',
    default: '"primary"',
    description: "Variante visuelle du bouton. 'custom' vous permet de fournir vos propres couleurs via customBg/customColor.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Taille du bouton (hauteur, padding, taille de police).",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Désactive le bouton (opacité réduite, curseur not-allowed).",
  },
  {
    name: "isLoading",
    type: "boolean",
    default: "false",
    description: "Affiche un spinner rotatif à la place de l'icône gauche. Désactive aussi le bouton.",
  },
  {
    name: "leftIcon",
    type: "React.ReactNode",
    description: "Icône affichée à gauche du texte. Remplacée par le spinner si isLoading.",
  },
  {
    name: "rightIcon",
    type: "React.ReactNode",
    description: "Icône affichée à droite du texte.",
  },
  {
    name: "fullWidth",
    type: "boolean",
    default: "false",
    description: "Étire le bouton à 100% de la largeur du conteneur.",
  },
  {
    name: "onClick",
    type: "() => void",
    description: "Callback déclenché au clic.",
  },
  {
    name: "type",
    type: '"button" | "submit" | "reset"',
    default: '"button"',
    description: "Type HTML natif du bouton.",
  },
  {
    name: "customBg",
    type: "string",
    description: "Couleur de fond personnalisée (CSS color) utilisée lorsque variant==='custom'.",
  },
  {
    name: "customColor",
    type: "string",
    description: "Couleur de texte personnalisée (CSS color) utilisée lorsque variant==='custom'.",
  },
  {
    name: "style",
    type: "React.CSSProperties",
    description: "Style inline supplémentaire pour overrides (bordure, ombres...). Exemple fourni plus bas.",
  },
];

const usageCode = `import { Button } from "@brickslab./ui-web";
import { FiArrowRight, FiDownload } from "react-icons/fi";

// Variantes
<Button variant="primary">Enregistrer</Button>
<Button variant="secondary">Annuler</Button>
<Button variant="ghost">En savoir plus</Button>
<Button variant="danger">Supprimer</Button>
// Variante custom (exemple de couleur arbitraire)
<Button variant="custom" customBg="#4ADE80" customColor="#000">Vert vif</Button>

// Tailles
<Button size="sm">Petit</Button>
<Button size="md">Moyen</Button>
<Button size="lg">Grand</Button>

// Avec icônes
<Button leftIcon={<FiPlus />}>Nouveau</Button>
<Button rightIcon={<FiArrowRight />}>Continuer</Button>

// Loading
<Button isLoading>Chargement...</Button>

// Disabled
<Button disabled>Indisponible</Button>

// Full width
<Button fullWidth>Pleine largeur</Button>

// Override via style
<Button
  variant="custom"
  customBg="#fff"
  customColor="#4ADE80"
  style={{ border: "2px dashed #4ADE80" }}
>Outline vert</Button>`;

export default function ButtonPage() {
  const [loading, setLoading] = useState(false);

  function handleLoadingDemo() {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }

  return (
    <div>
      <ComponentHeader
        name="Button"
        description="Bouton d'action polyvalent avec 5 variantes visuelles (dont custom), 3 tailles, support des icônes gauche/droite, état de chargement avec spinner animé, et état désactivé. Hover et focus-visible gérés via CSS natif sans 'use client'."
      />

      {/* ── Variantes ──────────────────────────────────────────────── */}
      <SectionTitle>Variantes</SectionTitle>
      <SubLabel>primary · secondary · ghost · danger · custom</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            <PropTag>primary</PropTag>
            <Button variant="primary">Enregistrer</Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            <PropTag>secondary</PropTag>
            <Button variant="secondary">Annuler</Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            <PropTag>ghost</PropTag>
            <Button variant="ghost">En savoir plus</Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            <PropTag>danger</PropTag>
            <Button variant="danger">Supprimer</Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            <PropTag>custom</PropTag>
            <Button variant="custom" customBg="#4ADE80" customColor="#000">Vert vif</Button>
          </div>
        </div>
      </Preview>

      {/* ── Tailles ────────────────────────────────────────────────── */}
      <SectionTitle>Tailles</SectionTitle>
      <SubLabel>sm (28px) · md (38px) · lg (44px)</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            <PropTag>sm</PropTag>
            <Button size="sm">Petit</Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            <PropTag>md</PropTag>
            <Button size="md">Moyen</Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            <PropTag>lg</PropTag>
            <Button size="lg">Grand</Button>
          </div>
        </div>
      </Preview>

      {/* ── Icônes ─────────────────────────────────────────────────── */}
      <SectionTitle>Avec icônes</SectionTitle>
      <SubLabel>leftIcon · rightIcon · les deux</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            <PropTag>leftIcon</PropTag>
            <Button leftIcon={<FiPlus />}>Nouveau projet</Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            <PropTag>rightIcon</PropTag>
            <Button variant="secondary" rightIcon={<FiArrowRight />}>Continuer</Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            <PropTag>leftIcon + rightIcon</PropTag>
            <Button leftIcon={<FiDownload />} rightIcon={<FiArrowRight />} variant="ghost">Télécharger</Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            <PropTag>danger + leftIcon</PropTag>
            <Button variant="danger" leftIcon={<FiTrash2 />}>Supprimer</Button>
          </div>
        </div>
      </Preview>

      {/* ── Loading ─────────────────────────────────────────────────── */}
      <SectionTitle>État de chargement</SectionTitle>
      <SubLabel>isLoading — spinner animé, bouton désactivé (cliquer pour simuler)</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <Button isLoading={loading} onClick={handleLoadingDemo}>
            {loading ? "Enregistrement..." : "Enregistrer"}
          </Button>
          <Button variant="secondary" isLoading>Chargement fixe</Button>
          <Button variant="ghost" isLoading size="sm">Petit spinner</Button>
        </div>
      </Preview>

      {/* ── Disabled ─────────────────────────────────────────────────── */}
      <SectionTitle>État désactivé</SectionTitle>
      <SubLabel>disabled — opacité 0.6, curseur not-allowed</SubLabel>

      {/* ── Custom style override ──────────────────────────────────────── */}
      <SectionTitle>Override de style</SectionTitle>
      <SubLabel>accès à la prop <code>style</code> pour modifier bordure ou ombre</SubLabel>
      <Preview>
        <Button
          variant="custom"
          customBg="#fff"
          customColor="#4ADE80"
          style={{ border: "2px dashed #4ADE80", boxShadow: "0 0 0 2px rgba(74, 222, 128, 0.3)" }}
        >
          Outline vert
        </Button>
      </Preview>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <Button disabled>Primary désactivé</Button>
          <Button variant="secondary" disabled>Secondary désactivé</Button>
          <Button variant="ghost" disabled>Ghost désactivé</Button>
          <Button variant="danger" disabled>Danger désactivé</Button>
        </div>
      </Preview>

      {/* ── Full Width ───────────────────────────────────────────────── */}
      <SectionTitle>Pleine largeur</SectionTitle>
      <SubLabel>fullWidth — s'étire à 100% du conteneur</SubLabel>
      <Preview>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
          <Button fullWidth>Bouton pleine largeur (primary)</Button>
          <Button fullWidth variant="secondary">Bouton pleine largeur (secondary)</Button>
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
