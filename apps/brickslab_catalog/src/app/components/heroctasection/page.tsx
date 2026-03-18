"use client";
import { HeroCtaSection } from "@brickslab./ui-web"
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

// ─── Assets de preview ────────────────────────────────────────────────────────
// Remplacer par vos propres assets en production
const PREVIEW_IMAGE_URL =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80";
const PREVIEW_VIDEO_URL =
  "https://www.w3schools.com/html/mov_bbb.mp4";
const PREVIEW_VIDEO_POSTER =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80";

// ─── Props table ──────────────────────────────────────────────────────────────
const props: PropDef[] = [
  // ── Background variant ──
  {
    name: "bg",
    type: '"simple" | "video" | "image"',
    default: '"simple"',
    description:
      'Variant de fond. "simple" = pas de media. "image" = image plein-cadre avec overlay. "video" = vidéo en boucle avec overlay.',
  },
  {
    name: "src",
    type: "string",
    description:
      'URL de la ressource media. Requis si bg="image" ou bg="video".',
  },
  {
    name: "alt",
    type: "string",
    description: 'Texte alternatif de l\'image de fond (accessibilité). Utilisé si bg="image".',
  },
  {
    name: "videoPoster",
    type: "string",
    description:
      "Image affichée avant le chargement de la vidéo (attribut poster du tag video).",
  },
  {
    name: "overlayOpacity",
    type: "number",
    default: "0.45",
    description:
      "Opacité de l'overlay sombre appliqué sur le media (0 à 1). Permet de garantir la lisibilité du texte.",
  },
  {
    name: "overlayColor",
    type: "string",
    default: '"#000000"',
    description: "Couleur de l'overlay appliqué sur le media.",
  },
  // ── Contenu ──
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
    default: "false",
    description:
      "Active un effet visuel au survol des boutons (brillance sur le CTA, opacity sur le secondaire).",
  },
];

// ─── Code d'usage ─────────────────────────────────────────────────────────────
const usageCode = `"use client";
import { HeroCtaSection } from "@brickslab./ui-web";

// bg="simple" — défaut, fond neutre
<HeroCtaSection
  title="Build faster. Ship smarter."
  subtitle="BricksLab vous fournit les briques pour construire des interfaces modernes."
  ctaLabel="Démarrer gratuitement"
  onCtaClick={() => router.push("/signup")}
  secondaryLabel="Voir la documentation"
  onSecondaryClick={() => router.push("/docs")}
  hoverEffect
/>

// bg="image" — image plein-cadre avec overlay
<HeroCtaSection
  bg="image"
  src="/assets/hero-bg.jpg"
  alt="Vue panoramique de montagne"
  overlayOpacity={0.5}
  title="Découvrez notre univers"
  subtitle="Une expérience visuelle immersive."
  ctaLabel="Explorer"
  onCtaClick={() => router.push("/explore")}
  hoverEffect
/>

// bg="video" — vidéo en boucle avec overlay
<HeroCtaSection
  bg="video"
  src="/assets/hero-loop.mp4"
  videoPoster="/assets/hero-poster.jpg"
  overlayOpacity={0.4}
  overlayColor="#0b1220"
  title="Le futur commence ici"
  subtitle="Plateforme nouvelle génération."
  ctaLabel="Démarrer"
  onCtaClick={() => router.push("/start")}
  secondaryLabel="En savoir plus"
  onSecondaryClick={() => router.push("/about")}
  hoverEffect
/>`;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HeroCtaSectionPage() {
  return (
    <div>
      <ComponentHeader
        name="HeroCtaSection"
        description="Section hero avec titre, sous-titre et boutons d'action. Trois variants de fond disponibles : simple (défaut), image plein-cadre, ou vidéo en boucle. Un overlay configurable garantit la lisibilité du texte sur les variants media."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      {/* 1. Simple — défaut */}
      <SubLabel>{`bg="simple" (défaut) — align="center" avec CTA et action secondaire`}</SubLabel>
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
            hoverEffect
          />
        </div>
      </Preview>

      {/* 2. Simple — align left */}
      <SubLabel>{`bg="simple" — align="left"`}</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <HeroCtaSection
            title="Des composants prêts pour la production"
            subtitle="Intégrez rapidement des composants testés, accessibles et personnalisables via des tokens CSS."
            ctaLabel="Explorer les composants"
            onCtaClick={() => alert("Explorer cliqué !")}
            align="left"
            hoverEffect
          />
        </div>
      </Preview>

      {/* 3. Simple — sans actions */}
      <SubLabel>{`bg="simple" — sans actions secondaires`}</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <HeroCtaSection
            title="Bienvenue sur BricksLab"
            subtitle="La bibliothèque UI pour les équipes qui construisent vite."
            ctaLabel="Commencer"
            onCtaClick={() => alert("Commencer !")}
            hoverEffect
          />
        </div>
      </Preview>

      {/* 4. Image */}
      <SubLabel>{`bg="image" — image plein-cadre avec overlay (overlayOpacity=0.5)`}</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <HeroCtaSection
            bg="image"
            src={PREVIEW_IMAGE_URL}
            alt="Vue panoramique de montagne enneigée"
            overlayOpacity={0.5}
            title="Découvrez notre univers"
            subtitle="Une expérience visuelle immersive pour vos utilisateurs."
            ctaLabel="Explorer"
            onCtaClick={() => alert("Explorer cliqué !")}
            secondaryLabel="En savoir plus"
            onSecondaryClick={() => alert("En savoir plus cliqué !")}
            hoverEffect
          />
        </div>
      </Preview>

      {/* 5. Vidéo */}
      <SubLabel>{`bg="video" — vidéo en boucle avec overlay (overlayColor="#0b1220", overlayOpacity=0.6)`}</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <HeroCtaSection
            bg="video"
            src={PREVIEW_VIDEO_URL}
            videoPoster={PREVIEW_VIDEO_POSTER}
            overlayOpacity={0.6}
            overlayColor="#0b1220"
            title="Le futur commence ici"
            subtitle="Plateforme nouvelle génération pour les équipes ambitieuses."
            ctaLabel="Démarrer"
            onCtaClick={() => alert("Démarrer cliqué !")}
            secondaryLabel="Voir la démo"
            onSecondaryClick={() => alert("Démo cliquée !")}
            hoverEffect
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