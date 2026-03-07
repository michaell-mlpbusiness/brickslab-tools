"use client";

import React from "react";
import { Spinner } from "@brickslab./ui-web";
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
    name: "variant",
    type: '"default" | "brand" | "success" | "warning" | "error" | "white"',
    default: '"brand"',
    description: "Couleur de l'arc animé.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: "Taille du spinner en pixels (16 / 24 / 32 / 48).",
  },
  {
    name: "speed",
    type: '"slow" | "normal" | "fast"',
    default: '"normal"',
    description: "Vitesse de rotation (1.2s / 0.7s / 0.35s).",
  },
  {
    name: "label",
    type: "string",
    default: '"Chargement…"',
    description: "Texte accessible aria-label pour les lecteurs d'écran.",
  },
];

const usageCode = `import { Spinner } from "@brickslab./ui-web";

// Basique
<Spinner />

// Variantes
<Spinner variant="brand" />
<Spinner variant="success" />
<Spinner variant="warning" />
<Spinner variant="error" />
<Spinner variant="default" />

// Tailles
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />

// Vitesse
<Spinner speed="slow" />
<Spinner speed="normal" />
<Spinner speed="fast" />

// Avec label accessible
<Spinner label="Enregistrement en cours…" />

// Dans un bouton
<button disabled style={{ display: "flex", alignItems: "center", gap: 8 }}>
  <Spinner size="sm" variant="white" />
  Chargement…
</button>`;

const darkBg: React.CSSProperties = {
  backgroundColor: "#1a1a1a",
  borderRadius: "var(--radius-md)",
  padding: "20px 24px",
  display: "inline-flex",
  alignItems: "center",
  gap: 12,
};

const btnBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "7px 16px",
  fontSize: 13,
  fontWeight: 500,
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--c-border)",
  cursor: "not-allowed",
  fontFamily: "inherit",
  opacity: 0.85,
};

export default function SpinnerPage() {
  return (
    <div>
      <ComponentHeader
        name="Spinner"
        description="Indicateur de chargement CSS-only. Animation @keyframes injectée via une balise style — aucun JavaScript nécessaire. Supporte 6 variantes de couleur, 4 tailles, 3 vitesses et un label accessible aria-label."
      />

      {/* ── Aperçu ──────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>
      <SubLabel>variant=brand, size=md, speed=normal (défauts)</SubLabel>
      <Preview>
        <Spinner />
      </Preview>

      {/* ── Variantes ───────────────────────────────────────────────── */}
      <SectionTitle>Variantes</SectionTitle>
      <SubLabel>default · brand · success · warning · error · white</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-end" }}>
          {(["default", "brand", "success", "warning", "error"] as const).map((v) => (
            <div key={v} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <Spinner variant={v} />
              <PropTag>{v}</PropTag>
            </div>
          ))}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <span style={darkBg}>
              <Spinner variant="white" />
            </span>
            <PropTag>white</PropTag>
          </div>
        </div>
      </Preview>

      {/* ── Tailles ─────────────────────────────────────────────────── */}
      <SectionTitle>Tailles</SectionTitle>
      <SubLabel>sm 16px · md 24px · lg 32px · xl 48px</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 28, alignItems: "flex-end" }}>
          {(["sm", "md", "lg", "xl"] as const).map((s) => (
            <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <Spinner size={s} />
              <PropTag>{s}</PropTag>
            </div>
          ))}
        </div>
      </Preview>

      {/* ── Vitesse ─────────────────────────────────────────────────── */}
      <SectionTitle>Vitesse</SectionTitle>
      <SubLabel>slow 1.2s · normal 0.7s · fast 0.35s</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 28, alignItems: "flex-end" }}>
          {(["slow", "normal", "fast"] as const).map((sp) => (
            <div key={sp} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <Spinner speed={sp} size="lg" />
              <PropTag>{sp}</PropTag>
            </div>
          ))}
        </div>
      </Preview>

      {/* ── Usage contextuel ────────────────────────────────────────── */}
      <SectionTitle>Usage contextuel</SectionTitle>
      <SubLabel>dans un bouton · avec texte · sur fond sombre</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
          <button
            disabled
            style={{
              ...btnBase,
              backgroundColor: "var(--color-brand)",
              color: "#FBFBFB",
              borderColor: "var(--color-brand)",
            }}
          >
            <Spinner size="sm" variant="white" />
            Enregistrement…
          </button>

          <button
            disabled
            style={{
              ...btnBase,
              backgroundColor: "var(--c-surface-elevated)",
              color: "var(--color-fg)",
            }}
          >
            <Spinner size="sm" variant="default" />
            Chargement…
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--color-muted)", fontSize: 13 }}>
            <Spinner size="sm" variant="brand" />
            Récupération des données…
          </div>

          <span style={darkBg}>
            <Spinner size="md" variant="white" />
            <span style={{ color: "#FBFBFB", fontSize: 13 }}>Chargement…</span>
          </span>
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
