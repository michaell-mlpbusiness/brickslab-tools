"use client";

import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";
import { KpiCard } from "@brickslab./ui-web";
import { FiAward, FiZap, FiLayers } from "react-icons/fi";

const props: PropDef[] = [
  { name: "label", type: "string", required: true, description: "Titre principal du KPI." },
  { name: "value", type: "string", required: true, description: "Valeur principale affichée en grand." },
  { name: "helper", type: "string", description: "Texte secondaire affiché sous la valeur." },
  { name: "eyebrow", type: "string", description: "Petit label uppercase au-dessus du titre. Utile pour catégoriser le KPI (ex. : « Audit qualité · 7 axes »)." },
  { name: "icon", type: "ReactNode", description: "Icône affichée dans un badge brand en haut à droite de la carte." },
  { name: "suffix", type: "string", description: "Texte accolé à la valeur (ex. : « /100 », « % »). Agrandit aussi la taille de la valeur." },
  { name: "progress", type: "number", description: "Valeur 0-100 pour afficher une ProgressBar sous la valeur. Masquée si loading est true." },
  { name: "loading", type: "boolean", description: "Masque la ProgressBar pendant le chargement des données." },
  { name: "animate", type: "boolean", description: "Active NumberTicker sur la valeur (doit être numérique). L'animation se déclenche à l'entrée dans le viewport." },
  { name: "colorScheme", type: '"auto" | "brand" | "green" | "amber" | "red"', description: 'Couleur appliquée à la valeur et à la ProgressBar. "auto" choisit automatiquement selon progress : vert ≥80, amber 60-79, rouge <60.' },
];

const usageCode = `import { KpiCard } from "@brickslab./ui-web";
import { FiAward } from "react-icons/fi";

// Carte simple
<KpiCard label="Tests verts" value="94%" helper="Suite unitaire" />

// Carte animée avec colorScheme auto
<KpiCard
  eyebrow="Audit qualité · 7 axes"
  label="Score moyen"
  icon={<FiAward size={14} />}
  value="87"
  suffix="/100"
  progress={87}
  helper="41 tests × 47 composants"
  animate
  colorScheme="auto"
/>`;

export default function KpiCardPage() {
  return (
    <div>
      <ComponentHeader
        name="KpiCard"
        description="Petit bloc affichant un indicateur de performance clé (label, valeur et aide). Utilisé dans le dashboard d'accueil."
      />

      <SectionTitle>Aperçu</SectionTitle>
      <SubLabel>Cartes simples</SubLabel>
      <Preview>
        <div style={{ display: "flex", gap: 24, padding: 16, flexWrap: "wrap" }}>
          <KpiCard label="Tests verts" value="94%" helper="Moyenne des suites" />
          <KpiCard label="Nouveaux" value="5" helper="Ce mois" />
          <KpiCard label="Sections" value="12" helper="Prêtes" />
        </div>
      </Preview>

      <SubLabel>animate + colorScheme="auto" (vert ≥80, amber 60-79, rouge &lt;60)</SubLabel>
      <Preview>
        <div style={{ display: "flex", gap: 24, padding: 16, flexWrap: "wrap" }}>
          <KpiCard
            eyebrow="Audit qualité · 7 axes"
            label="Score moyen"
            icon={<FiAward size={14} />}
            value="87"
            suffix="/100"
            progress={87}
            helper="41 tests × 47 composants"
            animate
            colorScheme="auto"
          />
          <KpiCard
            eyebrow="Couverture"
            label="Tests passants"
            icon={<FiZap size={14} />}
            value="68"
            suffix="/100"
            progress={68}
            helper="Score intermédiaire"
            animate
            colorScheme="auto"
          />
          <KpiCard
            eyebrow="A11y"
            label="Accessibilité"
            icon={<FiLayers size={14} />}
            value="42"
            suffix="/100"
            progress={42}
            helper="À améliorer"
            animate
            colorScheme="auto"
          />
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />
    </div>
  );
}
