"use client";

import { SignatureDetails, type DetailItem } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

const props: PropDef[] = [
  {
    name: "details",
    type: "DetailItem[]",
    required: true,
    description: "Liste des cartes à afficher. Chaque entrée contient id, image (URL), title et description.",
  },
  {
    name: "title",
    type: "string",
    default: '"Détails Signature"',
    description: "Titre de la section affiché en grand format centré.",
  },
  {
    name: "subtitle",
    type: "string",
    default: '"Chaque pièce est définie..."',
    description: "Sous-titre de la section.",
  },
  {
    name: "columns",
    type: "1 | 2 | 3 | 4",
    default: "4",
    description: "Nombre de colonnes de la grille CSS.",
  },
  {
    name: "cardRadius",
    type: "string",
    default: '"4px"',
    description: "Border-radius des cartes (valeur CSS).",
  },
  {
    name: "sectionPadding",
    type: "string",
    default: '"8rem 0"',
    description: "Padding vertical de la section (valeur CSS).",
  },
  {
    name: "overlayColor",
    type: "string",
    default: '"rgba(20,20,20,0.9)"',
    description: "Couleur du dégradé overlay affiché au survol des cartes.",
  },
  {
    name: "imageAspectRatio",
    type: "string",
    default: '"3/4"',
    description: 'Ratio largeur/hauteur des images (ex: "1/1", "16/9", "3/4").',
  },
  {
    name: "className",
    type: "string",
    description: "Classe CSS additionnelle sur le wrapper racine.",
  },
];

// ---------------------------------------------------------------------------
// Données de démo
// ---------------------------------------------------------------------------

const sampleDetails: DetailItem[] = [
  {
    id: 1,
    image: "https://picsum.photos/seed/brickslab-signature-1/900/1200",
    title: "Assemblage précis",
    description: "Des ajustements invisibles et une finition impeccable, pièce après pièce.",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/brickslab-signature-2/900/1200",
    title: "Matériaux nobles",
    description: "Bois, métal, textile : sélection rigoureuse pour un rendu durable et premium.",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/brickslab-signature-3/900/1200",
    title: "Détails signature",
    description: "Micro-textures, chanfreins, coutures : les détails racontent l'histoire de l'objet.",
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/brickslab-signature-4/900/1200",
    title: "Contraste maîtrisé",
    description: "Lumière, ombre et matières : un équilibre qui rend chaque pièce unique.",
  },
];

// ---------------------------------------------------------------------------
// Usage
// ---------------------------------------------------------------------------

const usageCode = `import { SignatureDetails, type DetailItem } from "@brickslab./ui-web";

const details: DetailItem[] = [
  { id: 1, image: "https://picsum.photos/900/1200?1", title: "Assemblage",  description: "..." },
  { id: 2, image: "https://picsum.photos/900/1200?2", title: "Matériaux",   description: "..." },
  { id: 3, image: "https://picsum.photos/900/1200?3", title: "Finition",    description: "..." },
  { id: 4, image: "https://picsum.photos/900/1200?4", title: "Contraste",   description: "..." },
];

// 4 colonnes (défaut)
<SignatureDetails
  title="Détails Signature"
  subtitle="Chaque pièce est définie par un savoir-faire méticuleux."
  details={details}
  columns={4}
  cardRadius="10px"
  sectionPadding="56px 0"
/>

// 2 colonnes, format carré
<SignatureDetails
  details={details}
  columns={2}
  imageAspectRatio="4/5"
  overlayColor="rgba(10,10,10,0.92)"
  sectionPadding="48px 0"
/>`;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SignatureDetailsPage() {
  return (
    <div>
      <ComponentHeader
        name="SignatureDetails"
        section="Animation"
        description="Section en grille avec images, zoom au survol et overlay descriptif animé (framer-motion). Idéal pour présenter des détails produit, une collection ou des éléments de marque."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>columns=4 · overlay au survol</SubLabel>
      <Preview style={{ padding: 0, width: "100%" }}>
        <SignatureDetails
          details={sampleDetails}
          columns={4}
          cardRadius="10px"
          sectionPadding="56px 0"
        />
      </Preview>

      <SubLabel>columns=2 · imageAspectRatio="4/5"</SubLabel>
      <Preview style={{ padding: 0, width: "100%" }}>
        <SignatureDetails
          details={sampleDetails}
          columns={2}
          cardRadius="12px"
          overlayColor="rgba(10,10,10,0.92)"
          sectionPadding="48px 0"
          imageAspectRatio="4/5"
        />
      </Preview>

      {/* ── Props ──────────────────────────────────────────────────── */}
      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      {/* ── Utilisation ────────────────────────────────────────────── */}
      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />
    </div>
  );
}
