"use client";

import React, { useState } from "react";
import { Checkbox } from "@brickslab./ui-web";
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
    name: "checked",
    type: "boolean",
    description: "État coché — contrôlé par le parent.",
  },
  {
    name: "defaultChecked",
    type: "boolean",
    description: "État coché initial — mode non-contrôlé.",
  },
  {
    name: "onChange",
    type: "(checked: boolean) => void",
    description: "Callback appelé à chaque changement d'état.",
  },
  {
    name: "label",
    type: "React.ReactNode",
    description: "Texte ou JSX affiché à droite de la case.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Désactive l'interaction.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Taille de la case à cocher (14 / 16 / 20 px).",
  },
  {
    name: "id",
    type: "string",
    description: "Attribut id natif — utile pour associer un label externe.",
  },
  {
    name: "name",
    type: "string",
    description: "Attribut name natif pour les formulaires.",
  },
  {
    name: "value",
    type: "string",
    description: "Valeur soumise dans un formulaire HTML.",
  },
];

const usageCode = `import { Checkbox } from "@brickslab./ui-web";
import { useState } from "react";

// Contrôlé
const [checked, setChecked] = useState(false);
<Checkbox checked={checked} onChange={setChecked} label="Option A" />

// Non-contrôlé
<Checkbox defaultChecked label="Option B" />

// Tailles
<Checkbox size="sm" label="Small" />
<Checkbox size="md" label="Medium" />
<Checkbox size="lg" label="Large" />

// Disabled
<Checkbox disabled label="Non disponible" />
<Checkbox disabled checked label="Sélectionné non modifiable" />

// Sans label
<Checkbox checked onChange={() => {}} />

// Label riche
<Checkbox
  label={<span>J'accepte les <a href="/cgu">conditions d'utilisation</a></span>}
  checked={accepted}
  onChange={setAccepted}
/>`;

export default function CheckboxPage() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(true);
  const [c, setC] = useState(false);

  const [feat1, setFeat1] = useState(true);
  const [feat2, setFeat2] = useState(false);
  const [feat3, setFeat3] = useState(true);
  const [feat4, setFeat4] = useState(false);

  const [accepted, setAccepted] = useState(false);

  return (
    <div>
      <ComponentHeader
        name="Checkbox"
        description="Case à cocher stylisée avec appearance:none et SVG background-image. Composant contrôlé — reçoit checked et onChange du parent. Supporte 3 tailles, état disabled et label React.ReactNode. Focus visible accessible."
      />

      {/* ── États ───────────────────────────────────────────────────── */}
      <SectionTitle>États</SectionTitle>
      <SubLabel>unchecked · checked · disabled unchecked · disabled checked</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <PropTag>unchecked</PropTag>
            <Checkbox label="Option" checked={false} onChange={() => {}} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <PropTag>checked</PropTag>
            <Checkbox label="Option" checked onChange={() => {}} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <PropTag>disabled</PropTag>
            <Checkbox label="Non disponible" disabled />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <PropTag>disabled checked</PropTag>
            <Checkbox label="Figé coché" checked disabled />
          </div>
        </div>
      </Preview>

      {/* ── Tailles ─────────────────────────────────────────────────── */}
      <SectionTitle>Tailles</SectionTitle>
      <SubLabel>sm 14px · md 16px · lg 20px</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <PropTag>sm</PropTag>
            <Checkbox size="sm" label="Small" checked onChange={() => {}} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <PropTag>md</PropTag>
            <Checkbox size="md" label="Medium" checked onChange={() => {}} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <PropTag>lg</PropTag>
            <Checkbox size="lg" label="Large" checked onChange={() => {}} />
          </div>
        </div>
      </Preview>

      {/* ── Sans label ──────────────────────────────────────────────── */}
      <SectionTitle>Sans label</SectionTitle>
      <SubLabel>case seule — utile dans des tableaux ou des listes</SubLabel>
      <Preview>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Checkbox checked={a} onChange={setA} />
          <Checkbox checked={b} onChange={setB} />
          <Checkbox checked={c} onChange={setC} />
        </div>
      </Preview>

      {/* ── Groupe contrôlé ─────────────────────────────────────────── */}
      <SectionTitle>Groupe contrôlé</SectionTitle>
      <SubLabel>plusieurs cases indépendantes gérées par useState</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Checkbox checked={feat1} onChange={setFeat1} label="Notifications par email" />
          <Checkbox checked={feat2} onChange={setFeat2} label="Notifications push" />
          <Checkbox checked={feat3} onChange={setFeat3} label="Récapitulatif hebdomadaire" />
          <Checkbox checked={feat4} onChange={setFeat4} label="Alertes de sécurité" disabled />
        </div>
      </Preview>

      {/* ── Label riche ─────────────────────────────────────────────── */}
      <SectionTitle>Label riche</SectionTitle>
      <SubLabel>label accepte React.ReactNode — liens, formatage</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Checkbox
            checked={accepted}
            onChange={setAccepted}
            label={
              <span>
                J'accepte les{" "}
                <a href="#" style={{ color: "var(--color-brand)", textDecoration: "underline" }}>
                  conditions d'utilisation
                </a>{" "}
                et la{" "}
                <a href="#" style={{ color: "var(--color-brand)", textDecoration: "underline" }}>
                  politique de confidentialité
                </a>
              </span>
            }
          />
          <Checkbox
            checked
            onChange={() => {}}
            label={
              <span>
                Envoyer des données anonymes pour{" "}
                <strong>améliorer le produit</strong>
              </span>
            }
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
