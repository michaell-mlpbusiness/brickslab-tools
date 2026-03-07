"use client";

import React from "react";
import { Badge } from "@brickslab./ui-web";
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
    description: "Contenu du badge — texte ou nombre. Ignoré si dot=true.",
  },
  {
    name: "variant",
    type: '"default" | "info" | "success" | "warning" | "error"',
    default: '"default"',
    description: "Variante colorée du badge.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Taille du badge (typographie + padding).",
  },
  {
    name: "dot",
    type: "boolean",
    default: "false",
    description: "Mode point — affiche un indicateur circulaire sans texte.",
  },
  {
    name: "outlined",
    type: "boolean",
    default: "false",
    description: "Fond transparent, couleur appliquée uniquement à la bordure et au texte.",
  },
  {
    name: "max",
    type: "number",
    description: "Si children (nombre) dépasse max, affiche \"max+\". Ex: max=99 avec children=120 → \"99+\".",
  },
];

const usageCode = `import { Badge } from "@brickslab./ui-web";

// Variantes
<Badge>Default</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>

// Tailles
<Badge size="sm" variant="info">Petit</Badge>
<Badge size="md" variant="info">Moyen</Badge>
<Badge size="lg" variant="info">Grand</Badge>

// Outlined
<Badge variant="success" outlined>Outlined</Badge>

// Dot
<Badge variant="error" dot />

// Nombre avec max
<Badge variant="error" max={99}>{120}</Badge>
// → affiche "99+"

// Contenu texte
<Badge variant="info">Nouveau</Badge>`;

export default function BadgePage() {
  return (
    <div>
      <ComponentHeader
        name="Badge"
        description="Indicateur compact non-interactif pour statuts, compteurs ou labels. Disponible en 5 variantes, 3 tailles, mode dot (point coloré) et mode outlined. Complémentaire de TagChip (cliquable) et StatusLabel (avec icône)."
      />

      {/* ── Variantes ───────────────────────────────────────────────── */}
      <SectionTitle>Variantes</SectionTitle>
      <SubLabel>default · info · success · warning · error</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <Badge>Default</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
        </div>
      </Preview>

      {/* ── Tailles ─────────────────────────────────────────────────── */}
      <SectionTitle>Tailles</SectionTitle>
      <SubLabel>sm · md (défaut) · lg</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <PropTag>sm</PropTag>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
              <Badge size="sm">Default</Badge>
              <Badge size="sm" variant="info">Info</Badge>
              <Badge size="sm" variant="success">Success</Badge>
              <Badge size="sm" variant="warning">Warning</Badge>
              <Badge size="sm" variant="error">Error</Badge>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <PropTag>md</PropTag>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
              <Badge size="md">Default</Badge>
              <Badge size="md" variant="info">Info</Badge>
              <Badge size="md" variant="success">Success</Badge>
              <Badge size="md" variant="warning">Warning</Badge>
              <Badge size="md" variant="error">Error</Badge>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <PropTag>lg</PropTag>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
              <Badge size="lg">Default</Badge>
              <Badge size="lg" variant="info">Info</Badge>
              <Badge size="lg" variant="success">Success</Badge>
              <Badge size="lg" variant="warning">Warning</Badge>
              <Badge size="lg" variant="error">Error</Badge>
            </div>
          </div>
        </div>
      </Preview>

      {/* ── Outlined ────────────────────────────────────────────────── */}
      <SectionTitle>Outlined</SectionTitle>
      <SubLabel>fond transparent — bordure + texte colorés</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <Badge outlined>Default</Badge>
          <Badge variant="info" outlined>Info</Badge>
          <Badge variant="success" outlined>Success</Badge>
          <Badge variant="warning" outlined>Warning</Badge>
          <Badge variant="error" outlined>Error</Badge>
        </div>
      </Preview>

      {/* ── Dot ─────────────────────────────────────────────────────── */}
      <SectionTitle>Dot</SectionTitle>
      <SubLabel>indicateur point sans texte — toutes variantes, toutes tailles</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <PropTag>variantes</PropTag>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Badge dot />
              <Badge variant="info" dot />
              <Badge variant="success" dot />
              <Badge variant="warning" dot />
              <Badge variant="error" dot />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <PropTag>tailles</PropTag>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Badge variant="error" size="sm" dot />
              <Badge variant="error" size="md" dot />
              <Badge variant="error" size="lg" dot />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <PropTag>outlined</PropTag>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Badge variant="info" dot outlined />
              <Badge variant="success" dot outlined />
              <Badge variant="warning" dot outlined />
              <Badge variant="error" dot outlined />
            </div>
          </div>
        </div>
      </Preview>

      {/* ── Max ─────────────────────────────────────────────────────── */}
      <SectionTitle>Nombre avec max</SectionTitle>
      <SubLabel>prop max — tronque les compteurs élevés</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <PropTag>{"children=5, max=99"}</PropTag>
            <Badge variant="error">{5}</Badge>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <PropTag>{"children=99, max=99"}</PropTag>
            <Badge variant="error" max={99}>{99}</Badge>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <PropTag>{"children=120, max=99"}</PropTag>
            <Badge variant="error" max={99}>{120}</Badge>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <PropTag>{"children=1234, max=999"}</PropTag>
            <Badge variant="warning" max={999}>{1234}</Badge>
          </div>
        </div>
      </Preview>

      {/* ── Usage contextuel ────────────────────────────────────────── */}
      <SectionTitle>Usage contextuel</SectionTitle>
      <SubLabel>Badge positionné sur un élément UI — compteur de notifications</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, color: "var(--color-muted)" }}>Notifications</span>
            <Badge variant="error" max={99}>{7}</Badge>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, color: "var(--color-muted)" }}>Messages</span>
            <Badge variant="info" max={99}>{42}</Badge>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, color: "var(--color-muted)" }}>Statut</span>
            <Badge variant="success" dot />
            <span style={{ fontSize: 12, color: "var(--color-success)" }}>En ligne</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                padding: "6px 14px",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--color-fg)",
                backgroundColor: "var(--c-surface-elevated)",
                border: "1px solid var(--c-border)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              Nouveau
            </span>
            <Badge variant="info" size="sm">Bêta</Badge>
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
