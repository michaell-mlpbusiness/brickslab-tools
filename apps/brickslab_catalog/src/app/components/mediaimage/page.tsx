"use client";

import { MediaImage } from "@brickslab./ui-web";
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
    name: "src",
    type: "string",
    required: true,
    description: "URL de l'image à afficher.",
  },
  {
    name: "alt",
    type: "string",
    required: true,
    description: "Texte alternatif pour l'accessibilité (attribut alt).",
  },
  {
    name: "width",
    type: "number | string",
    description: "Largeur de l'image. Accepte une valeur en pixels (number) ou une valeur CSS (string).",
  },
  {
    name: "height",
    type: "number | string",
    description: "Hauteur de l'image. Accepte une valeur en pixels (number) ou une valeur CSS (string).",
  },
  {
    name: "objectFit",
    type: '"cover" | "contain" | "fill" | "none"',
    default: '"cover"',
    description: "Mode de redimensionnement de l'image dans son conteneur.",
  },
  {
    name: "borderRadius",
    type: "string",
    default: '"var(--radius-md)"',
    description: "Rayon de bordure de l'image. Accepte toute valeur CSS valide.",
  },
];

const usageCode = `import { MediaImage } from "@brickslab./ui-web";

// Image simple
<MediaImage
  src="https://picsum.photos/400/300"
  alt="Image de démonstration"
  width={400}
  height={300}
/>

// objectFit: contain (pour logos ou images avec fond transparent)
<MediaImage
  src="https://picsum.photos/400/300?random=2"
  alt="Image en contain"
  width={400}
  height={200}
  objectFit="contain"
/>

// Coins arrondis personnalisés
<MediaImage
  src="https://picsum.photos/400/300?random=3"
  alt="Image avec coins ronds"
  width={400}
  height={300}
  borderRadius="var(--radius-xl)"
/>

// Image pleine largeur
<MediaImage
  src="https://picsum.photos/800/400?random=4"
  alt="Bannière"
  width="100%"
  height={200}
  objectFit="cover"
/>`;

export default function MediaImagePage() {
  return (
    <div>
      <ComponentHeader
        name="MediaImage"
        description="Composant d'image avec contrôle du redimensionnement (objectFit), du rayon de bordure et des dimensions. Adapté aux vignettes, bannières, avatars et galeries."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>objectFit</SubLabel>
      <Preview>
        {(["cover", "contain", "fill"] as const).map((fit) => (
          <div key={fit} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>{`objectFit="${fit}"`}</PropTag>
            <MediaImage
              src={`https://picsum.photos/400/300?random=${fit}`}
              alt={`Démonstration objectFit ${fit}`}
              width={200}
              height={140}
              objectFit={fit}
            />
          </div>
        ))}
      </Preview>

      <SubLabel>borderRadius</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`borderRadius="var(--radius-md)" (défaut)`}</PropTag>
          <MediaImage
            src="https://picsum.photos/300/200?random=10"
            alt="Coins arrondis medium"
            width={200}
            height={140}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`borderRadius="var(--radius-xl)"`}</PropTag>
          <MediaImage
            src="https://picsum.photos/300/200?random=11"
            alt="Coins très arrondis"
            width={200}
            height={140}
            borderRadius="var(--radius-xl)"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`borderRadius="50%"`}</PropTag>
          <MediaImage
            src="https://picsum.photos/300/300?random=12"
            alt="Image circulaire"
            width={140}
            height={140}
            borderRadius="50%"
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
