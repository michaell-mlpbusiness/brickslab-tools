"use client";

import React, { useState } from "react";
import { Accordion, AccordionItem } from "@brickslab./ui-web";
import { FiInfo, FiCode, FiPackage, FiShield, FiZap, FiSettings } from "react-icons/fi";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  PropTag,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const accordionProps: PropDef[] = [
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "Éléments AccordionItem enfants.",
  },
  {
    name: "variant",
    type: '"bordered" | "separated" | "ghost"',
    default: '"bordered"',
    description: "Style visuel du groupe d'accordéons.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Taille appliquée à tous les items via CSS custom properties.",
  },
];

const itemProps: PropDef[] = [
  {
    name: "title",
    type: "React.ReactNode",
    required: true,
    description: "Contenu du déclencheur — texte ou JSX.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "Contenu du panneau révélé.",
  },
  {
    name: "open",
    type: "boolean",
    description: "État ouvert — contrôlé par le parent. Sans cette prop, comportement natif <details>.",
  },
  {
    name: "onToggle",
    type: "(open: boolean) => void",
    description: "Callback appelé avec le nouvel état. Requis si open est fourni.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Bloque l'interaction — empêche ouverture et fermeture.",
  },
  {
    name: "icon",
    type: "React.ReactNode",
    description: "Icône optionnelle affichée à gauche du titre.",
  },
];

const usageCode = `import { Accordion, AccordionItem } from "@brickslab./ui-web";
import { useState } from "react";

// Non-contrôlé (natif <details>)
<Accordion>
  <AccordionItem title="Question 1">Réponse 1</AccordionItem>
  <AccordionItem title="Question 2">Réponse 2</AccordionItem>
</Accordion>

// Contrôlé — exclusif (un seul ouvert à la fois)
const [open, setOpen] = useState<string | null>("q1");
const toggle = (id: string) => (isOpen: boolean) =>
  setOpen(isOpen ? id : null);

<Accordion variant="bordered">
  <AccordionItem title="Q1" open={open === "q1"} onToggle={toggle("q1")}>
    Réponse 1
  </AccordionItem>
  <AccordionItem title="Q2" open={open === "q2"} onToggle={toggle("q2")}>
    Réponse 2
  </AccordionItem>
</Accordion>

// Variantes
<Accordion variant="separated">...</Accordion>
<Accordion variant="ghost">...</Accordion>

// Tailles
<Accordion size="sm">...</Accordion>
<Accordion size="lg">...</Accordion>

// Avec icônes
import { FiInfo } from "react-icons/fi";
<AccordionItem title="Aide" icon={<FiInfo size={14} />}>...</AccordionItem>

// Disabled
<AccordionItem title="Indisponible" disabled>...</AccordionItem>`;

const faqItems = [
  {
    id: "q1",
    title: "Comment installer la librairie ?",
    content: "Utilisez pnpm add @brickslab./ui-web dans votre projet. Assurez-vous d'avoir React 18+ et les design tokens configurés dans votre CSS global.",
  },
  {
    id: "q2",
    title: "Les composants sont-ils accessibles ?",
    content: "Oui — chaque composant respecte les attributs ARIA (role, aria-selected, aria-label…) et le focus-visible est visible sur tous les éléments interactifs.",
  },
  {
    id: "q3",
    title: "Peut-on utiliser les composants en dark mode ?",
    content: "Absolument. Tous les styles utilisent des design tokens CSS (var(--color-fg), var(--c-surface)…) qui s'adaptent automatiquement selon le thème actif.",
  },
  {
    id: "q4",
    title: "Y a-t-il des dépendances requises ?",
    content: "Seulement React 18+ et react-icons. Aucune librairie CSS externe n'est requise — les styles sont injectés via des balises <style>.",
  },
];

export default function AccordionPage() {
  const [exclusive, setExclusive] = useState<string | null>("q1");
  const toggle = (id: string) => (isOpen: boolean) =>
    setExclusive(isOpen ? id : null);

  return (
    <div>
      <ComponentHeader
        name="Accordion / AccordionItem"
        description="Composant de disclosure basé sur l'élément natif <details>/<summary>. Fonctionne sans JavaScript en mode non-contrôlé. Mode contrôlé (open + onToggle) pour la logique exclusive ou orchestrée. Animation fade+slide via @keyframes. 3 variantes, 3 tailles, support icônes et disabled."
      />

      {/* ── Aperçu ──────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>
      <SubLabel>variant bordered (défaut) — comportement natif &lt;details&gt;</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <Accordion>
            {faqItems.map((item) => (
              <AccordionItem key={item.id} title={item.title}>
                {item.content}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Preview>

      {/* ── Exclusif contrôlé ───────────────────────────────────────── */}
      <SectionTitle>Mode exclusif contrôlé</SectionTitle>
      <SubLabel>un seul item ouvert à la fois — géré par useState</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <Accordion>
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                title={item.title}
                open={exclusive === item.id}
                onToggle={toggle(item.id)}
              >
                {item.content}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Preview>

      {/* ── Variantes ───────────────────────────────────────────────── */}
      <SectionTitle>Variantes</SectionTitle>
      <SubLabel>bordered · separated · ghost</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 28, width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>bordered</PropTag>
            <Accordion variant="bordered">
              <AccordionItem title="Item A">Contenu de l'item A — variante bordered.</AccordionItem>
              <AccordionItem title="Item B">Contenu de l'item B — variante bordered.</AccordionItem>
              <AccordionItem title="Item C">Contenu de l'item C — variante bordered.</AccordionItem>
            </Accordion>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>separated</PropTag>
            <Accordion variant="separated">
              <AccordionItem title="Item A">Contenu de l'item A — variante separated.</AccordionItem>
              <AccordionItem title="Item B">Contenu de l'item B — variante separated.</AccordionItem>
              <AccordionItem title="Item C">Contenu de l'item C — variante separated.</AccordionItem>
            </Accordion>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>ghost</PropTag>
            <Accordion variant="ghost">
              <AccordionItem title="Item A">Contenu de l'item A — variante ghost.</AccordionItem>
              <AccordionItem title="Item B">Contenu de l'item B — variante ghost.</AccordionItem>
              <AccordionItem title="Item C">Contenu de l'item C — variante ghost.</AccordionItem>
            </Accordion>
          </div>
        </div>
      </Preview>

      {/* ── Tailles ─────────────────────────────────────────────────── */}
      <SectionTitle>Tailles</SectionTitle>
      <SubLabel>sm · md (défaut) · lg — typographie + padding via CSS custom properties</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
          {(["sm", "md", "lg"] as const).map((s) => (
            <div key={s} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <PropTag>{s}</PropTag>
              <Accordion size={s} variant="bordered">
                <AccordionItem title="Titre de l'item">
                  Contenu de l'accordéon en taille {s}.
                </AccordionItem>
                <AccordionItem title="Autre item">
                  Un second item pour montrer l'espacement.
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </Preview>

      {/* ── Avec icônes ─────────────────────────────────────────────── */}
      <SectionTitle>Avec icônes</SectionTitle>
      <SubLabel>prop icon — icône à gauche du titre</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <Accordion variant="separated">
            <AccordionItem title="Introduction" icon={<FiInfo size={14} />}>
              Présentation générale du projet et de ses objectifs.
            </AccordionItem>
            <AccordionItem title="Installation" icon={<FiCode size={14} />}>
              Guide d'installation et de configuration initiale.
            </AccordionItem>
            <AccordionItem title="Composants" icon={<FiPackage size={14} />}>
              Catalogue complet des composants disponibles.
            </AccordionItem>
            <AccordionItem title="Sécurité" icon={<FiShield size={14} />}>
              Bonnes pratiques et recommandations de sécurité.
            </AccordionItem>
            <AccordionItem title="Performance" icon={<FiZap size={14} />}>
              Optimisations et conseils de performance.
            </AccordionItem>
            <AccordionItem title="Configuration" icon={<FiSettings size={14} />}>
              Options avancées et personnalisation.
            </AccordionItem>
          </Accordion>
        </div>
      </Preview>

      {/* ── Disabled ────────────────────────────────────────────────── */}
      <SectionTitle>Disabled</SectionTitle>
      <SubLabel>disabled — bloque l'interaction sur un item spécifique</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <Accordion>
            <AccordionItem title="Item disponible">
              Cet item est interactif et peut être ouvert.
            </AccordionItem>
            <AccordionItem title="Item désactivé" disabled>
              Ce contenu n'est pas accessible.
            </AccordionItem>
            <AccordionItem title="Autre item disponible">
              Ce dernier item fonctionne normalement.
            </AccordionItem>
          </Accordion>
        </div>
      </Preview>

      {/* ── Props Accordion ─────────────────────────────────────────── */}
      <SectionTitle>Props — Accordion</SectionTitle>
      <PropsTable props={accordionProps} />

      {/* ── Props AccordionItem ─────────────────────────────────────── */}
      <SectionTitle>Props — AccordionItem</SectionTitle>
      <PropsTable props={itemProps} />

      {/* ── Utilisation ────────────────────────────────────────────── */}
      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} />
    </div>
  );
}
