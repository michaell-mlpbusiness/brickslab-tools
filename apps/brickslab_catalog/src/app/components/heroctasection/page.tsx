"use client";
import { HeroCtaSection } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  {
    name: "title",
    type: "string",
    required: true,
    description: "Titre principal de la section hero.",
  },
  {
    name: "subtitle",
    type: "string",
    description: "Sous-titre ou description courte affichée sous le titre.",
  },
  {
    name: "ctaLabel",
    type: "string",
    description: "Libellé du bouton d'action principal (CTA).",
  },
  {
    name: "onCtaClick",
    type: "() => void",
    description: "Callback déclenché lors du clic sur le bouton CTA principal.",
  },
  {
    name: "secondaryLabel",
    type: "string",
    description: "Libellé de l'action secondaire optionnelle.",
  },
  {
    name: "onSecondaryClick",
    type: "() => void",
    description: "Callback déclenché lors du clic sur l'action secondaire.",
  },
  {
    name: "align",
    type: '"left" | "center"',
    default: '"center"',
    description: "Alignement horizontal du contenu de la section hero.",
  },
  {
    name: "hoverEffect",
    type: "boolean",
    description: "Si vrai, applique un petit effet visuel au survol des boutons (brillance/opacity).",
  },
];

const usageCode = `"use client";
import { HeroCtaSection } from "@brickslab./ui-web";

// Centré (défaut)
<HeroCtaSection
  title="Build faster. Ship smarter."
  subtitle="BricksLab vous fournit les briques pour construire des interfaces modernes et performantes."
  ctaLabel="Démarrer gratuitement"
  onCtaClick={() => router.push("/signup")}
  secondaryLabel="Voir la documentation"
  onSecondaryClick={() => router.push("/docs")}
  hoverEffect={true}
/>

// Aligné à gauche
<HeroCtaSection
  title="Des composants prêts pour la production"
  subtitle="Intégrez rapidement des composants testés et accessibles."
  ctaLabel="Explorer les composants"
  onCtaClick={() => router.push("/components")}
  align="left"
/>`;

export default function HeroCtaSectionPage() {
  return (
    <div>
      <ComponentHeader
        name="HeroCtaSection"
        description="Section hero avec titre, sous-titre et boutons d'action. Disponible en variante centrée ou alignée à gauche. Les callbacks onCtaClick et onSecondaryClick permettent une gestion flexible des actions."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>{`align="center" (défaut) — avec CTA et action secondaire`}</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <HeroCtaSection
            title="Build faster. Ship smarter."
            subtitle="BricksLab vous fournit les briques pour construire des interfaces modernes et performantes en un temps record."
            ctaLabel="Démarrer gratuitement"
            onCtaClick={() => alert("CTA cliqué !")}
            secondaryLabel="Voir la documentation"
            onSecondaryClick={() => alert("Action secondaire !")}
            align="center"
            hoverEffect={true}
          />
        </div>
      </Preview>

      <SubLabel>{`align="left"`}</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <HeroCtaSection
            title="Des composants prêts pour la production"
            subtitle="Intégrez rapidement des composants testés, accessibles et personnalisables via des tokens CSS."
            ctaLabel="Explorer les composants"
            onCtaClick={() => alert("Explorer cliqué !")}
            align="left"
            hoverEffect={true}
          />
        </div>
      </Preview>

      <SubLabel>sans actions secondaires</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <HeroCtaSection
            title="Bienvenue sur BricksLab"
            subtitle="La bibliothèque UI pour les équipes qui construisent vite."
            ctaLabel="Commencer"
            onCtaClick={() => alert("Commencer !")}
            hoverEffect={true}
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
