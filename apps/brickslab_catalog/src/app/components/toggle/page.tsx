"use client";
import { useState } from "react";
import { ToggleSwitch } from "@brickslab./ui-web";
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
    required: true,
    description: "État coché/non coché du toggle. Composant contrôlé.",
  },
  {
    name: "onChange",
    type: "(checked: boolean) => void",
    required: true,
    description: "Callback déclenché lors du changement d'état. Reçoit la nouvelle valeur booléenne.",
  },
  {
    name: "label",
    type: "string",
    description: "Libellé associé au toggle pour l'accessibilité et l'affichage.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Désactive l'interaction avec le toggle.",
  },
];

const usageCode = `import { ToggleSwitch } from "@brickslab./ui-web";
import { useState } from "react";

function Demo() {
  const [enabled, setEnabled] = useState(false);

  return (
    <ToggleSwitch
      checked={enabled}
      onChange={setEnabled}
      label="Notifications"
    />
  );
}

// État désactivé
<ToggleSwitch
  checked={false}
  onChange={() => {}}
  label="Option désactivée"
  disabled
/>`;

export default function TogglePage() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [n1, setN1] = useState(true);
  const [n2, setN2] = useState(false);
  const [n3, setN3] = useState(true);

  return (
    <div>
      <ComponentHeader
        name="ToggleSwitch"
        description="Interrupteur à bascule pour activer/désactiver une option. Composant contrôlé : l'état checked et le callback onChange sont gérés par le parent. Supporte un label et un état désactivé."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>états checked et unchecked — interactifs</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`checked=${checked1}`}</PropTag>
          <ToggleSwitch
            checked={checked1}
            onChange={setChecked1}
            label="Notifications"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`checked=${checked2}`}</PropTag>
          <ToggleSwitch
            checked={checked2}
            onChange={setChecked2}
            label="Mode sombre"
          />
        </div>
      </Preview>

      {/* ── État disabled ───────────────────────────────────────────── */}
      <SectionTitle>État disabled</SectionTitle>
      <SubLabel>disabled + checked=false · disabled + checked=true</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>disabled + unchecked</PropTag>
          <ToggleSwitch
            checked={false}
            onChange={() => {}}
            label="Fonctionnalité désactivée"
            disabled
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>disabled + checked</PropTag>
          <ToggleSwitch
            checked={true}
            onChange={() => {}}
            label="Toujours activé (verrouillé)"
            disabled
          />
        </div>
      </Preview>

      {/* ── Sans label ──────────────────────────────────────────────── */}
      <SectionTitle>Sans label</SectionTitle>
      <SubLabel>toggle seul — utile dans des tableaux ou formulaires compacts</SubLabel>
      <Preview>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <ToggleSwitch checked={checked1} onChange={setChecked1} />
          <ToggleSwitch checked={checked2} onChange={setChecked2} />
          <ToggleSwitch checked={false} onChange={() => {}} disabled />
        </div>
      </Preview>

      {/* ── Groupe contrôlé ─────────────────────────────────────────── */}
      <SectionTitle>Groupe contrôlé</SectionTitle>
      <SubLabel>plusieurs toggles indépendants gérés par useState</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <ToggleSwitch checked={n1} onChange={setN1} label="Notifications par email" />
          <ToggleSwitch checked={n2} onChange={setN2} label="Notifications push" />
          <ToggleSwitch checked={n3} onChange={setN3} label="Récapitulatif hebdomadaire" />
          <ToggleSwitch checked={false} onChange={() => {}} label="Alertes de sécurité" disabled />
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
