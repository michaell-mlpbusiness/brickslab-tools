"use client";
import { useState } from "react";
import { MediaCarousel } from "@brickslab./ui-web";
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
    name: "items",
    type: "CarouselItem[]",
    required: true,
    description: "Tableau des slides du carrousel. Chaque item contient src, alt et une caption optionnelle.",
  },
  {
    name: "currentIndex",
    type: "number",
    required: true,
    description: "Index du slide actuellement affiché. Composant contrôlé.",
  },
  {
    name: "onNext",
    type: "() => void",
    required: true,
    description: "Callback déclenché pour passer au slide suivant.",
  },
  {
    name: "onPrev",
    type: "() => void",
    required: true,
    description: "Callback déclenché pour revenir au slide précédent.",
  },
  {
    name: "showDots",
    type: "boolean",
    description: "Affiche des indicateurs de position (points) en bas du carrousel.",
  },
];

const carouselItems = [
  { src: "https://picsum.photos/600/300?random=1", alt: "Image de démonstration 1", caption: "Première diapositive — paysage naturel" },
  { src: "https://picsum.photos/600/300?random=2", alt: "Image de démonstration 2", caption: "Deuxième diapositive — architecture" },
  { src: "https://picsum.photos/600/300?random=3", alt: "Image de démonstration 3", caption: "Troisième diapositive — abstrait" },
];

const usageCode = `import { MediaCarousel } from "@brickslab./ui-web";
import { useState } from "react";

const items = [
  { src: "https://picsum.photos/600/300?random=1", alt: "Slide 1", caption: "Première diapositive" },
  { src: "https://picsum.photos/600/300?random=2", alt: "Slide 2", caption: "Deuxième diapositive" },
  { src: "https://picsum.photos/600/300?random=3", alt: "Slide 3", caption: "Troisième diapositive" },
];

function Demo() {
  const [index, setIndex] = useState(0);

  return (
    <MediaCarousel
      items={items}
      currentIndex={index}
      onNext={() => setIndex((i) => (i + 1) % items.length)}
      onPrev={() => setIndex((i) => (i - 1 + items.length) % items.length)}
      showDots
    />
  );
}`;

export default function MediaCarouselPage() {
  const [index, setIndex] = useState(0);
  const [indexNoDots, setIndexNoDots] = useState(0);

  return (
    <div>
      <ComponentHeader
        name="MediaCarousel"
        description="Carrousel d'images contrôlé avec navigation précédent/suivant et indicateurs de position optionnels. L'index courant et les callbacks de navigation sont gérés par le parent."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>carrousel avec showDots — 3 items (interactif)</SubLabel>
      <Preview>
        <div style={{ width: "100%", maxWidth: 600 }}>
          <PropTag>{`currentIndex=${index} / ${carouselItems.length - 1}`}</PropTag>
          <div style={{ marginTop: 8 }}>
            <MediaCarousel
              items={carouselItems}
              currentIndex={index}
              onNext={() => setIndex((i) => (i + 1) % carouselItems.length)}
              onPrev={() => setIndex((i) => (i - 1 + carouselItems.length) % carouselItems.length)}
              showDots
            />
          </div>
        </div>
      </Preview>

      <SubLabel>sans dots</SubLabel>
      <Preview>
        <div style={{ width: "100%", maxWidth: 600 }}>
          <PropTag>{`showDots=false (par défaut), currentIndex=${indexNoDots}`}</PropTag>
          <div style={{ marginTop: 8 }}>
            <MediaCarousel
              items={carouselItems}
              currentIndex={indexNoDots}
              onNext={() => setIndexNoDots((i) => (i + 1) % carouselItems.length)}
              onPrev={() => setIndexNoDots((i) => (i - 1 + carouselItems.length) % carouselItems.length)}
            />
          </div>
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
