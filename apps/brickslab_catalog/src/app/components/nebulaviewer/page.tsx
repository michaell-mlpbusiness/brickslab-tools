"use client";

import { useState } from "react";
import { NebulaViewer, type NebulaModelOption } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  PropTag,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

// ---------------------------------------------------------------------------
// Données de démo
// ---------------------------------------------------------------------------

const sampleModels: NebulaModelOption[] = [
  {
    src: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    color: "#7C3AED",
  },
  {
    src: "https://modelviewer.dev/shared-assets/models/RobotExpressive.glb",
    color: "#0EA5E9",
  },
];

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

const props: PropDef[] = [
  {
    name: "models",
    type: "NebulaModelOption[]",
    required: true,
    description: "Liste des modèles 3D disponibles (.glb). Chaque entrée contient src (URL) et color (couleur du sélecteur).",
  },
  {
    name: "title",
    type: "string",
    default: '"Nebula"',
    description: "Titre principal affiché dans le panneau texte.",
  },
  {
    name: "description",
    type: "string",
    default: '"Découvrez vos modèles 3D..."',
    description: "Texte descriptif affiché sous le titre.",
  },
  {
    name: "ctaLabel",
    type: "string",
    default: '"Découvrir"',
    description: "Libellé du lien d'appel à l'action.",
  },
  {
    name: "ctaLink",
    type: "string",
    default: '"#"',
    description: "URL cible du lien CTA.",
  },
  {
    name: "isRotating",
    type: "boolean",
    default: "true",
    description: "Contrôle la rotation automatique du modèle. À gérer en externe avec onRotateChange.",
  },
  {
    name: "onRotateChange",
    type: "(rotating: boolean) => void",
    description: "Callback déclenché quand l'utilisateur clique sur le bouton pause/lecture.",
  },
  {
    name: "selectedModel",
    type: "string",
    description: "URL du modèle actif (src). À gérer en externe avec onModelChange.",
  },
  {
    name: "onModelChange",
    type: "(src: string) => void",
    description: "Callback déclenché quand l'utilisateur sélectionne un modèle via les pastilles.",
  },
  {
    name: "viewerWidth",
    type: "string",
    default: '"650px"',
    description: "Largeur du container du viewer.",
  },
  {
    name: "haloSize",
    type: "string",
    default: '"500px"',
    description: "Taille du halo lumineux en arrière-plan.",
  },
  {
    name: "showPauseButton",
    type: "boolean",
    default: "true",
    description: "Affiche ou masque le bouton pause/lecture.",
  },
  {
    name: "className",
    type: "string",
    description: "Classe CSS additionnelle sur le wrapper racine.",
  },
];

// ---------------------------------------------------------------------------
// Usage
// ---------------------------------------------------------------------------

const usageCode = `import { NebulaViewer, type NebulaModelOption } from "@brickslab./ui-web";
import { useState } from "react";

const models: NebulaModelOption[] = [
  { src: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",      color: "#7C3AED" },
  { src: "https://modelviewer.dev/shared-assets/models/RobotExpressive.glb", color: "#0EA5E9" },
];

export default function Page() {
  const [isRotating, setIsRotating]       = useState(true);
  const [selectedModel, setSelectedModel] = useState(models[0].src);

  return (
    <NebulaViewer
      title="Nebula"
      description="Découvrez vos modèles 3D dans une expérience immersive et fluide."
      ctaLabel="Découvrir"
      ctaLink="#"
      models={models}
      isRotating={isRotating}
      onRotateChange={setIsRotating}
      selectedModel={selectedModel}
      onModelChange={setSelectedModel}
    />
  );
}`;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function NebulaViewerPage() {
  const [isRotating, setIsRotating] = useState(true);
  const [selectedModel, setSelectedModel] = useState(sampleModels[0].src);

  return (
    <div>
      <ComponentHeader
        name="NebulaViewer"
        section="Animation"
        description="Viewer 3D basé sur &lt;model-viewer&gt; avec halo lumineux, sélecteur de modèles par pastilles colorées et rotation automatique pause/lecture. Le runtime model-viewer est chargé globalement par le catalogue."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>Viewer interactif — rotation et sélection de modèles (contrôle externe)</SubLabel>
      <Preview
        background="linear-gradient(135deg, rgba(255,255,255,0.95), rgba(245,245,245,0.85))"
        style={{ padding: 0, overflow: "visible" }}
      >
        <div style={{ width: "100%" }}>
          <NebulaViewer
            title="Nebula"
            description="Découvrez vos modèles 3D dans une expérience immersive et fluide."
            ctaLabel="Découvrir"
            ctaLink="#"
            models={sampleModels}
            isRotating={isRotating}
            onRotateChange={setIsRotating}
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
        </div>
      </Preview>

      <SubLabel>showPauseButton=false · viewerWidth / haloSize personnalisés</SubLabel>
      <Preview
        background="linear-gradient(135deg, rgba(255,255,255,0.95), rgba(245,245,245,0.85))"
        style={{ padding: 0, overflow: "visible" }}
      >
        <div style={{ width: "100%" }}>
          <NebulaViewer
            title="Sans bouton pause"
            description="Le contrôle de rotation est masqué."
            ctaLabel="Explorer"
            ctaLink="#"
            models={sampleModels}
            isRotating
            viewerWidth="450px"
            haloSize="360px"
            showPauseButton={false}
          />
        </div>
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
