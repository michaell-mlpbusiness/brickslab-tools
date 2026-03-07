"use client";

import { LocationMap } from "@brickslab./ui-web";
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
    name: "lat",
    type: "number",
    required: true,
    description: "Latitude du lieu à afficher.",
  },
  {
    name: "lng",
    type: "number",
    required: true,
    description: "Longitude du lieu à afficher.",
  },
  {
    name: "zoom",
    type: "number",
    default: "13",
    description: "Niveau de zoom (1 à 19).",
  },
  {
    name: "width",
    type: "number | string",
    default: '"100%"',
    description: "Largeur du composant (nombre en px ou valeur CSS).",
  },
  {
    name: "height",
    type: "number | string",
    default: "320",
    description: "Hauteur de la carte (nombre en px ou valeur CSS).",
  },
  {
    name: "title",
    type: "string",
    default: '"Location map"',
    description: "Titre d'accessibilité appliqué à l'iframe.",
  },
  {
    name: "placeLabel",
    type: "string",
    description: "Libellé affiché sous la carte (ex: nom de lieu).",
  },
  {
    name: "borderRadius",
    type: "string",
    default: '"var(--radius-md)"',
    description: "Rayon de bordure du conteneur carte.",
  },
  {
    name: "showOpenStreetMapLink",
    type: "boolean",
    default: "true",
    description: "Affiche un lien d'ouverture vers OpenStreetMap.",
  },
];

const usageCode = `import { LocationMap } from "@brickslab./ui-web";

export function ContactSection() {
  return (
    <LocationMap
      lat={48.85837}
      lng={2.294481}
      zoom={15}
      height={360}
      placeLabel="Tour Eiffel, Paris"
      title="Carte de localisation de la Tour Eiffel"
    />
  );
}`;

export default function LocationMapPage() {
  return (
    <div>
      <ComponentHeader
        name="LocationMap"
        description="Composant de carte pour afficher la localisation d'un lieu à partir de coordonnées GPS, avec intégration OpenStreetMap."
      />

      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>Paris - Tour Eiffel</SubLabel>
      <Preview>
        <LocationMap
          lat={48.85837}
          lng={2.294481}
          zoom={15}
          height={360}
          placeLabel="Tour Eiffel, Paris"
          title="Carte de localisation de la Tour Eiffel"
        />
      </Preview>

      <SubLabel>New York - Times Square</SubLabel>
      <Preview>
        <LocationMap
          lat={40.758}
          lng={-73.9855}
          zoom={14}
          height={300}
          placeLabel="Times Square, New York"
          title="Carte de localisation de Times Square"
        />
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} />
    </div>
  );
}
