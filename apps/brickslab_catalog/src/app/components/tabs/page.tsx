"use client";

import React, { useState } from "react";
import { Tabs, TabPanel } from "@brickslab./ui-web";
import { FiCode, FiEye, FiList, FiSettings, FiUser, FiStar } from "react-icons/fi";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  PropTag,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const tabsProps: PropDef[] = [
  {
    name: "tabs",
    type: "TabItem[]",
    required: true,
    description: "Liste des onglets — chaque item a value, label, icon? et disabled?.",
  },
  {
    name: "value",
    type: "string",
    required: true,
    description: "Valeur de l'onglet actif — contrôlé par le parent.",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    required: true,
    description: "Callback appelé avec la valeur de l'onglet cliqué.",
  },
  {
    name: "variant",
    type: '"underline" | "pills" | "boxed"',
    default: '"underline"',
    description: "Style visuel de la barre d'onglets.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Taille des onglets (typographie + padding).",
  },
  {
    name: "fullWidth",
    type: "boolean",
    default: "false",
    description: "Les onglets occupent toute la largeur disponible à parts égales.",
  },
];

const panelProps: PropDef[] = [
  {
    name: "value",
    type: "string",
    required: true,
    description: "Valeur de ce panneau.",
  },
  {
    name: "activeValue",
    type: "string",
    required: true,
    description: "Valeur de l'onglet actif — panneau rendu seulement si value === activeValue.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "Contenu du panneau.",
  },
];

const usageCode = `import { Tabs, TabPanel } from "@brickslab./ui-web";
import { useState } from "react";

const tabs = [
  { value: "apercu",  label: "Aperçu" },
  { value: "props",   label: "Props" },
  { value: "code",    label: "Code" },
];

const [active, setActive] = useState("apercu");

<Tabs tabs={tabs} value={active} onChange={setActive} />

<TabPanel value="apercu" activeValue={active}>
  <p>Contenu de l'aperçu</p>
</TabPanel>
<TabPanel value="props" activeValue={active}>
  <p>Contenu des props</p>
</TabPanel>
<TabPanel value="code" activeValue={active}>
  <p>Contenu du code</p>
</TabPanel>

// Variantes
<Tabs tabs={tabs} value={active} onChange={setActive} variant="pills" />
<Tabs tabs={tabs} value={active} onChange={setActive} variant="boxed" />

// Tailles
<Tabs tabs={tabs} value={active} onChange={setActive} size="sm" />
<Tabs tabs={tabs} value={active} onChange={setActive} size="lg" />

// Full width
<Tabs tabs={tabs} value={active} onChange={setActive} fullWidth />

// Avec icônes
import { FiEye, FiCode, FiList } from "react-icons/fi";
const tabsWithIcons = [
  { value: "apercu", label: "Aperçu", icon: <FiEye size={14} /> },
  { value: "code",   label: "Code",   icon: <FiCode size={14} /> },
  { value: "liste",  label: "Liste",  icon: <FiList size={14} /> },
];

// Tab désactivé
const tabs = [
  { value: "actif",    label: "Actif" },
  { value: "desactive", label: "Désactivé", disabled: true },
];`;

const panelStyle: React.CSSProperties = {
  padding: "16px 0",
  fontSize: "var(--fontsize-sm)",
  color: "var(--color-muted)",
  lineHeight: 1.6,
};

export default function TabsPage() {
  const [underline, setUnderline] = useState("apercu");
  const [pills, setPills] = useState("apercu");
  const [boxed, setBoxed] = useState("apercu");

  const [sizeSm, setSizeSm] = useState("apercu");
  const [sizeMd, setSizeMd] = useState("apercu");
  const [sizeLg, setSizeLg] = useState("apercu");

  const [fw, setFw] = useState("apercu");
  const [icons, setIcons] = useState("apercu");
  const [disabled, setDisabled] = useState("actif");
  const [withContent, setWithContent] = useState("overview");

  const basicTabs = [
    { value: "apercu", label: "Aperçu" },
    { value: "props", label: "Props" },
    { value: "code", label: "Code" },
  ];

  const iconTabs = [
    { value: "apercu", label: "Aperçu", icon: <FiEye size={13} /> },
    { value: "code",   label: "Code",   icon: <FiCode size={13} /> },
    { value: "liste",  label: "Liste",  icon: <FiList size={13} /> },
  ];

  const disabledTabs = [
    { value: "actif",     label: "Actif" },
    { value: "inactif",   label: "Inactif", disabled: true },
    { value: "brouillon", label: "Brouillon" },
    { value: "archive",   label: "Archivé", disabled: true },
  ];

  const contentTabs = [
    { value: "overview",  label: "Vue d'ensemble", icon: <FiEye size={13} /> },
    { value: "activity",  label: "Activité",       icon: <FiList size={13} /> },
    { value: "members",   label: "Membres",        icon: <FiUser size={13} /> },
    { value: "settings",  label: "Réglages",       icon: <FiSettings size={13} /> },
  ];

  return (
    <div>
      <ComponentHeader
        name="Tabs / TabPanel"
        description="Barre d'onglets contrôlée — reçoit value et onChange du parent. 3 variantes visuelles (underline, pills, boxed), 3 tailles, support icônes, fullWidth et onglet disabled. TabPanel est un wrapper qui affiche son contenu uniquement quand value === activeValue."
      />

      {/* ── Aperçu ──────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>
      <SubLabel>variant underline (défaut) avec TabPanel</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <Tabs tabs={contentTabs} value={withContent} onChange={setWithContent} />
          <TabPanel value="overview" activeValue={withContent}>
            <div style={panelStyle}>Vue d'ensemble du projet — métriques, statut et dernières mises à jour.</div>
          </TabPanel>
          <TabPanel value="activity" activeValue={withContent}>
            <div style={panelStyle}>Historique des événements — commits, déploiements, alertes.</div>
          </TabPanel>
          <TabPanel value="members" activeValue={withContent}>
            <div style={panelStyle}>Gestion de l'équipe — rôles, permissions, invitations.</div>
          </TabPanel>
          <TabPanel value="settings" activeValue={withContent}>
            <div style={panelStyle}>Configuration du projet — notifications, intégrations, accès.</div>
          </TabPanel>
        </div>
      </Preview>

      {/* ── Variantes ───────────────────────────────────────────────── */}
      <SectionTitle>Variantes</SectionTitle>
      <SubLabel>underline · pills · boxed</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>underline</PropTag>
            <Tabs tabs={basicTabs} value={underline} onChange={setUnderline} variant="underline" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>pills</PropTag>
            <Tabs tabs={basicTabs} value={pills} onChange={setPills} variant="pills" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>boxed</PropTag>
            <Tabs tabs={basicTabs} value={boxed} onChange={setBoxed} variant="boxed" />
          </div>
        </div>
      </Preview>

      {/* ── Tailles ─────────────────────────────────────────────────── */}
      <SectionTitle>Tailles</SectionTitle>
      <SubLabel>sm · md (défaut) · lg</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>sm</PropTag>
            <Tabs tabs={basicTabs} value={sizeSm} onChange={setSizeSm} size="sm" variant="boxed" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>md</PropTag>
            <Tabs tabs={basicTabs} value={sizeMd} onChange={setSizeMd} size="md" variant="boxed" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>lg</PropTag>
            <Tabs tabs={basicTabs} value={sizeLg} onChange={setSizeLg} size="lg" variant="boxed" />
          </div>
        </div>
      </Preview>

      {/* ── Full Width ──────────────────────────────────────────────── */}
      <SectionTitle>Full Width</SectionTitle>
      <SubLabel>fullWidth — onglets répartis sur toute la largeur</SubLabel>
      <Preview>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
          <Tabs tabs={basicTabs} value={fw} onChange={setFw} fullWidth variant="underline" />
          <Tabs tabs={basicTabs} value={fw} onChange={setFw} fullWidth variant="boxed" />
        </div>
      </Preview>

      {/* ── Avec icônes ─────────────────────────────────────────────── */}
      <SectionTitle>Avec icônes</SectionTitle>
      <SubLabel>prop icon dans TabItem — accepte React.ReactNode</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
          <Tabs tabs={iconTabs} value={icons} onChange={setIcons} variant="underline" />
          <Tabs tabs={iconTabs} value={icons} onChange={setIcons} variant="pills" />
          <Tabs tabs={iconTabs} value={icons} onChange={setIcons} variant="boxed" />
        </div>
      </Preview>

      {/* ── Tab désactivé ───────────────────────────────────────────── */}
      <SectionTitle>Tab désactivé</SectionTitle>
      <SubLabel>disabled: true sur un TabItem — bloque le clic</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
          <Tabs tabs={disabledTabs} value={disabled} onChange={setDisabled} variant="underline" />
          <Tabs tabs={disabledTabs} value={disabled} onChange={setDisabled} variant="pills" />
        </div>
      </Preview>

      {/* ── Props Tabs ──────────────────────────────────────────────── */}
      <SectionTitle>Props — Tabs</SectionTitle>
      <PropsTable props={tabsProps} />

      {/* ── Props TabPanel ──────────────────────────────────────────── */}
      <SectionTitle>Props — TabPanel</SectionTitle>
      <PropsTable props={panelProps} />

      {/* ── Utilisation ────────────────────────────────────────────── */}
      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} />
    </div>
  );
}
