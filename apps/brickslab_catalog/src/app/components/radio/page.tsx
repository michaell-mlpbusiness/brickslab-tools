"use client";

import React, { useState } from "react";
import { Radio, RadioGroup } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  PropTag,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const radioProps: PropDef[] = [
  {
    name: "value",
    type: "string",
    required: true,
    description: "Valeur de l'option — passée à onChange quand sélectionnée.",
  },
  {
    name: "checked",
    type: "boolean",
    description: "État sélectionné — contrôlé par le parent ou RadioGroup.",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    description: "Callback appelé avec la valeur de l'option.",
  },
  {
    name: "label",
    type: "React.ReactNode",
    description: "Texte ou JSX affiché à droite du bouton radio.",
  },
  {
    name: "name",
    type: "string",
    description: "Attribut name natif — injecté automatiquement par RadioGroup.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Désactive cette option.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Taille du bouton radio (14 / 16 / 20 px).",
  },
];

const groupProps: PropDef[] = [
  {
    name: "name",
    type: "string",
    required: true,
    description: "Attribut name HTML injecté dans chaque Radio enfant.",
  },
  {
    name: "value",
    type: "string",
    description: "Valeur sélectionnée — contrôle quel Radio est coché.",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    description: "Callback appelé avec la valeur de l'option sélectionnée.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "Éléments Radio enfants.",
  },
  {
    name: "direction",
    type: '"vertical" | "horizontal"',
    default: '"vertical"',
    description: "Disposition des options.",
  },
  {
    name: "gap",
    type: "number",
    default: "10",
    description: "Espacement en pixels entre les options.",
  },
];

const usageCode = `import { Radio, RadioGroup } from "@brickslab./ui-web";
import { useState } from "react";

// RadioGroup contrôlé
const [plan, setPlan] = useState("pro");

<RadioGroup name="plan" value={plan} onChange={setPlan}>
  <Radio value="free" label="Gratuit — 5 projets max" />
  <Radio value="pro" label="Pro — projets illimités" />
  <Radio value="team" label="Équipe — collaboration avancée" />
</RadioGroup>

// Direction horizontale
<RadioGroup name="size" value={size} onChange={setSize} direction="horizontal">
  <Radio value="sm" label="S" />
  <Radio value="md" label="M" />
  <Radio value="lg" label="L" />
</RadioGroup>

// Option désactivée
<RadioGroup name="tier" value={tier} onChange={setTier}>
  <Radio value="free" label="Free" />
  <Radio value="pro" label="Pro" />
  <Radio value="enterprise" label="Enterprise" disabled />
</RadioGroup>

// Radio standalone (sans groupe)
<Radio
  name="accept"
  value="yes"
  checked={accepted}
  onChange={() => setAccepted(true)}
  label="Oui, j'accepte"
/>`;

export default function RadioPage() {
  const [plan, setPlan] = useState("pro");
  const [size, setSize] = useState("md");
  const [theme, setTheme] = useState("system");
  const [tier, setTier] = useState("free");
  const [standalone, setStandalone] = useState(false);

  return (
    <div>
      <ComponentHeader
        name="Radio / RadioGroup"
        description="Bouton radio stylisé avec appearance:none et radial-gradient CSS. Radio est contrôlé (checked + onChange). RadioGroup injecte automatiquement name, checked et onChange dans ses enfants via React.Children.map. Focus visible accessible."
      />

      {/* ── Aperçu ──────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>
      <SubLabel>RadioGroup vertical — sélection contrôlée</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <RadioGroup name="plan-preview" value={plan} onChange={setPlan}>
            <Radio value="free" label="Gratuit — 5 projets max" />
            <Radio value="pro" label="Pro — projets illimités" />
            <Radio value="team" label="Équipe — collaboration avancée" />
          </RadioGroup>
          <p style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 4 }}>
            Sélection : <strong style={{ color: "var(--color-fg)" }}>{plan}</strong>
          </p>
        </div>
      </Preview>

      {/* ── Direction ───────────────────────────────────────────────── */}
      <SectionTitle>Direction</SectionTitle>
      <SubLabel>vertical (défaut) · horizontal</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <PropTag>vertical</PropTag>
            <div style={{ marginTop: 8 }}>
              <RadioGroup name="theme-v" value={theme} onChange={setTheme}>
                <Radio value="light" label="Clair" />
                <Radio value="dark" label="Sombre" />
                <Radio value="system" label="Système" />
              </RadioGroup>
            </div>
          </div>
          <div>
            <PropTag>horizontal</PropTag>
            <div style={{ marginTop: 8 }}>
              <RadioGroup name="size-h" value={size} onChange={setSize} direction="horizontal" gap={20}>
                <Radio value="sm" label="Small" />
                <Radio value="md" label="Medium" />
                <Radio value="lg" label="Large" />
                <Radio value="xl" label="Extra Large" />
              </RadioGroup>
            </div>
          </div>
        </div>
      </Preview>

      {/* ── Tailles ─────────────────────────────────────────────────── */}
      <SectionTitle>Tailles</SectionTitle>
      <SubLabel>sm 14px · md 16px · lg 20px</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center" }}>
          {(["sm", "md", "lg"] as const).map((s) => (
            <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
              <PropTag>{s}</PropTag>
              <Radio value={s} size={s} checked label={`Option ${s.toUpperCase()}`} onChange={() => {}} name={`size-demo-${s}`} />
            </div>
          ))}
        </div>
      </Preview>

      {/* ── Option désactivée ───────────────────────────────────────── */}
      <SectionTitle>Option désactivée</SectionTitle>
      <SubLabel>disabled — bloque l'interaction sur une option spécifique</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <RadioGroup name="tier-demo" value={tier} onChange={setTier}>
            <Radio value="free" label="Free" />
            <Radio value="pro" label="Pro" />
            <Radio value="enterprise" label="Enterprise (bientôt disponible)" disabled />
          </RadioGroup>
          <p style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 4 }}>
            Sélection : <strong style={{ color: "var(--color-fg)" }}>{tier}</strong>
          </p>
        </div>
      </Preview>

      {/* ── Radio standalone ────────────────────────────────────────── */}
      <SectionTitle>Radio standalone</SectionTitle>
      <SubLabel>sans RadioGroup — contrôlé manuellement</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Radio
            name="standalone"
            value="yes"
            checked={standalone}
            onChange={() => setStandalone(true)}
            label="Oui, j'accepte les conditions"
          />
          <Radio
            name="standalone"
            value="no"
            checked={!standalone}
            onChange={() => setStandalone(false)}
            label="Non, je refuse"
          />
        </div>
      </Preview>

      {/* ── Props Radio ─────────────────────────────────────────────── */}
      <SectionTitle>Props — Radio</SectionTitle>
      <PropsTable props={radioProps} />

      {/* ── Props RadioGroup ────────────────────────────────────────── */}
      <SectionTitle>Props — RadioGroup</SectionTitle>
      <PropsTable props={groupProps} />

      {/* ── Utilisation ────────────────────────────────────────────── */}
      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} />
    </div>
  );
}
