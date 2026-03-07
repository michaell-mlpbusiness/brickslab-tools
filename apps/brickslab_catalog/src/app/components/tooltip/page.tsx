"use client";

import { Tooltip } from "@brickslab./ui-web";
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
    name: "content",
    type: "React.ReactNode",
    required: true,
    description: "Contenu de la bulle tooltip (texte ou JSX).",
  },
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "Élément déclencheur — le tooltip s'affiche au survol.",
  },
  {
    name: "position",
    type: '"top" | "bottom" | "left" | "right"',
    default: '"top"',
    description: "Position de la bulle par rapport à l'élément déclencheur.",
  },
  {
    name: "delay",
    type: "boolean",
    default: "false",
    description: "Ajoute un délai de 0.3s avant l'apparition de la bulle.",
  },
  {
    name: "maxWidth",
    type: "number",
    default: "220",
    description: "Largeur maximale de la bulle en pixels.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Désactive le tooltip — aucune bulle au survol.",
  },
];

const usageCode = `import { Tooltip } from "@brickslab./ui-web";

// Basique (position top par défaut)
<Tooltip content="Ceci est un tooltip">
  <button>Survolez-moi</button>
</Tooltip>

// Positions
<Tooltip content="En haut" position="top"><button>Top</button></Tooltip>
<Tooltip content="En bas" position="bottom"><button>Bottom</button></Tooltip>
<Tooltip content="À gauche" position="left"><button>Left</button></Tooltip>
<Tooltip content="À droite" position="right"><button>Right</button></Tooltip>

// Avec délai
<Tooltip content="Apparaît après 0.3s" delay>
  <button>Avec délai</button>
</Tooltip>

// MaxWidth réduit
<Tooltip content="Texte long qui doit être contraint" maxWidth={120}>
  <button>MaxWidth 120px</button>
</Tooltip>

// Désactivé
<Tooltip content="Jamais affiché" disabled>
  <button>Désactivé</button>
</Tooltip>

// Contenu riche
<Tooltip content={<span>Statut : <span style={{ color: "#4ADE80" }}>Actif</span></span>}>
  <button>Contenu JSX</button>
</Tooltip>`;

const btnStyle: React.CSSProperties = {
  padding: "6px 14px",
  fontSize: 13,
  fontWeight: 500,
  color: "var(--color-fg)",
  backgroundColor: "var(--c-surface-elevated)",
  border: "1px solid var(--c-border)",
  borderRadius: "var(--radius-sm)",
  cursor: "pointer",
  fontFamily: "inherit",
};

export default function TooltipPage() {
  return (
    <div>
      <ComponentHeader
        name="Tooltip"
        description="Bulle d'aide contextuelle CSS-only. Apparaît au survol sans aucun JavaScript côté client — comportement piloté par :hover CSS via data-bl-tooltip-* attributes. Supporte 4 positions, délai d'apparition, largeur max et contenu ReactNode."
      />

      {/* ── Aperçu ──────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>
      <SubLabel>tooltip basique sur un bouton · position top (défaut)</SubLabel>
      <Preview>
        <Tooltip content="Ceci est un tooltip">
          <button style={btnStyle}>Survolez-moi</button>
        </Tooltip>
      </Preview>

      {/* ── Positions ───────────────────────────────────────────────── */}
      <SectionTitle>Positions</SectionTitle>
      <SubLabel>top · bottom · left · right</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <PropTag>top</PropTag>
            <Tooltip content="En haut" position="top">
              <button style={btnStyle}>Top</button>
            </Tooltip>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <PropTag>bottom</PropTag>
            <Tooltip content="En bas" position="bottom">
              <button style={btnStyle}>Bottom</button>
            </Tooltip>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <PropTag>left</PropTag>
            <Tooltip content="À gauche" position="left">
              <button style={btnStyle}>Left</button>
            </Tooltip>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <PropTag>right</PropTag>
            <Tooltip content="À droite" position="right">
              <button style={btnStyle}>Right</button>
            </Tooltip>
          </div>
        </div>
      </Preview>

      {/* ── Delay ───────────────────────────────────────────────────── */}
      <SectionTitle>Délai</SectionTitle>
      <SubLabel>sans délai vs delay=true (0.3s)</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <PropTag>sans délai</PropTag>
            <Tooltip content="Apparaît immédiatement">
              <button style={btnStyle}>Immédiat</button>
            </Tooltip>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <PropTag>delay</PropTag>
            <Tooltip content="Apparaît après 0.3s" delay>
              <button style={btnStyle}>Avec délai</button>
            </Tooltip>
          </div>
        </div>
      </Preview>

      {/* ── MaxWidth ─────────────────────────────────────────────────── */}
      <SectionTitle>MaxWidth</SectionTitle>
      <SubLabel>défaut 220px vs maxWidth réduit</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <PropTag>maxWidth=220 (défaut)</PropTag>
            <Tooltip content="Texte plus long pour montrer la largeur maximale par défaut du tooltip.">
              <button style={btnStyle}>Défaut</button>
            </Tooltip>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <PropTag>maxWidth=120</PropTag>
            <Tooltip content="Texte contraint dans une largeur réduite." maxWidth={120}>
              <button style={btnStyle}>Étroit</button>
            </Tooltip>
          </div>
        </div>
      </Preview>

      {/* ── Disabled ─────────────────────────────────────────────────── */}
      <SectionTitle>Désactivé</SectionTitle>
      <SubLabel>disabled=true — aucune bulle au survol</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <PropTag>actif</PropTag>
            <Tooltip content="Ce tooltip est actif">
              <button style={btnStyle}>Actif</button>
            </Tooltip>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <PropTag>disabled</PropTag>
            <Tooltip content="Jamais affiché" disabled>
              <button style={{ ...btnStyle, opacity: 0.5 }}>Désactivé</button>
            </Tooltip>
          </div>
        </div>
      </Preview>

      {/* ── Contenu riche ────────────────────────────────────────────── */}
      <SectionTitle>Contenu riche</SectionTitle>
      <SubLabel>content accepte React.ReactNode</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <PropTag>JSX avec couleur</PropTag>
            <Tooltip
              content={
                <span>
                  Statut :{" "}
                  <span style={{ color: "#4ADE80", fontWeight: 600 }}>Actif</span>
                </span>
              }
            >
              <button style={btnStyle}>Statut</button>
            </Tooltip>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <PropTag>alerte</PropTag>
            <Tooltip
              content={
                <span>
                  <span style={{ color: "#F59E0B", fontWeight: 600 }}>⚠ Attention</span>
                  {" "}— Action irréversible
                </span>
              }
            >
              <button style={btnStyle}>Alerte</button>
            </Tooltip>
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
