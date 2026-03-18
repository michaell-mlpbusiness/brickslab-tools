"use client";

import { StarRating } from "@brickslab./ui-web";
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
    name: "value",
    type: "number",
    required: true,
    description:
      "Valeur de note affichée. Les demi-valeurs sont supportées et rendues visuellement.",
  },
  {
    name: "max",
    type: "number",
    default: "5",
    description:
      "Nombre total d'étoiles affichées dans le composant.",
  },
  {
    name: "size",
    type: "number",
    default: "14",
    description:
      "Taille en pixels de chaque icône étoile.",
  },
];

const usageCode = `import { StarRating } from "@brickslab./ui-web";

<StarRating value={4.5} />

<StarRating value={3} max={5} size={18} />`;

export default function StarRatingPage() {
  return (
    <div>
      <ComponentHeader
        name="StarRating"
        section="Cards"
        description="Affichage de note en étoiles en lecture seule, avec support des demi-étoiles et taille configurable."
      />

      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>Valeurs entières</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <StarRating value={5} />
          <StarRating value={3} />
          <StarRating value={1} />
        </div>
      </Preview>

      <SubLabel>Demi-étoiles</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <StarRating value={4.5} />
          <StarRating value={2.5} />
        </div>
      </Preview>

      <SubLabel>Taille personnalisée</SubLabel>
      <Preview>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <StarRating value={4} size={14} />
          <StarRating value={4} size={20} />
          <StarRating value={4} size={28} />
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} />
    </div>
  );
}
