"use client";

import { Testimonial } from "@brickslab./ui-web";
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
    name: "userName",
    type: "string",
    required: true,
    description:
      "Nom de l'auteur du témoignage. Affiché via le composant Text avec la variante body-md et le ton brand.",
  },
  {
    name: "comment",
    type: "string",
    required: true,
    description:
      "Corps du témoignage. Affiché via le composant Text avec la variante body-sm et le ton default.",
  },
  {
    name: "rating",
    type: "number",
    required: true,
    description: "Note sur 5. Passée au composant StarRating.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description:
      "Taille du LogoMark et de la typographie. Propagée au composant LogoMark interne.",
  },
  {
    name: "imgSrc",
    type: "string",
    description:
      "URL de l'image du logo. Si absent, le LogoMark affiche le rendu par défaut (cercle avec la lettre B).",
  },
  {
    name: "imgAlt",
    type: "string",
    description:
      'Texte alternatif de l\'image. Défaut : "Logo de {userName}". Ignoré si imgSrc est absent.',
  },
];

const usageCode = `import { Testimonial } from "@brickslab./ui-web";

// Rendu par défaut — logo par défaut, taille md
<Testimonial
  userName="Alice Martin"
  comment="Une expérience vraiment remarquable. Je recommande sans hésiter."
  rating={5}
/>

// Taille sm
<Testimonial
  userName="Bob Dupont"
  comment="Correct dans l'ensemble, quelques améliorations possibles."
  rating={3}
  size="sm"
/>

// Taille lg
<Testimonial
  userName="Carol Lee"
  comment="La qualité est au rendez-vous. L'équipe est très réactive."
  rating={4}
  size="lg"
/>

// Logo personnalisé avec imgSrc
<Testimonial
  userName="David Morel"
  comment="Intégration parfaite dans notre workflow existant."
  rating={5}
  imgSrc="/images/david-avatar.png"
  imgAlt="Photo de David Morel"
/>

// Note partielle
<Testimonial
  userName="Emma Blanc"
  comment="Bon produit mais la documentation peut être améliorée."
  rating={2}
/>`;

export default function TestimonialPage() {
  return (
    <div>
      <ComponentHeader
        name="Testimonial"
        section="Carte"
        description="Carte de témoignage composée d'un LogoMark circulaire, du nom de l'auteur, d'une note en étoiles et d'un commentaire. Le logo affiche le rendu par défaut si aucun imgSrc n'est fourni. Compose LogoMark, StarRating et Text en interne."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>Tailles — logo par défaut</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`size="sm"`}</PropTag>
          <Testimonial
            userName="Alice Martin"
            comment="Une expérience vraiment remarquable. Je recommande sans hésiter."
            rating={5}
            size="sm"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`size="md" (défaut)`}</PropTag>
          <Testimonial
            userName="Alice Martin"
            comment="Une expérience vraiment remarquable. Je recommande sans hésiter."
            rating={5}
            size="md"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`size="lg"`}</PropTag>
          <Testimonial
            userName="Alice Martin"
            comment="Une expérience vraiment remarquable. Je recommande sans hésiter."
            rating={5}
            size="lg"
          />
        </div>
      </Preview>

      <SubLabel>Variations de rating</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>rating=5</PropTag>
          <Testimonial
            userName="Bob Dupont"
            comment="Parfait sur tous les points. Rien à redire."
            rating={5}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>rating=3</PropTag>
          <Testimonial
            userName="Carol Lee"
            comment="Correct dans l'ensemble, quelques améliorations possibles."
            rating={3}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>rating=1</PropTag>
          <Testimonial
            userName="David Morel"
            comment="En dessous de mes attentes, service client peu réactif."
            rating={1}
          />
        </div>
      </Preview>

      <SubLabel>Avec imgSrc personnalisé</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>imgSrc fourni</PropTag>
          <Testimonial
            userName="Emma Blanc"
            comment="Intégration parfaite dans notre workflow existant. L'équipe est très réactive."
            rating={4.5}
            imgSrc="https://i.pravatar.cc/150?img=47"
            imgAlt="Photo de Emma Blanc"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>imgSrc absent (défaut)</PropTag>
          <Testimonial
            userName="Emma Blanc"
            comment="Intégration parfaite dans notre workflow existant. L'équipe est très réactive."
            rating={4}
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