"use client";
import { useState } from "react";
import { CopyButton } from "@brickslab./ui-web";
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
    name: "onCopy",
    type: "() => void",
    required: true,
    description: "Callback déclenché lorsque l&apos;utilisateur clique sur le bouton. Responsable de la logique de copie dans le presse-papier.",
  },
  {
    name: "copied",
    type: "boolean",
    default: "false",
    description: "État de confirmation de la copie. Quand true, le bouton affiche le label de confirmation.",
  },
  {
    name: "label",
    type: "string",
    default: '"Copier"',
    description: "Libellé affiché dans l&apos;état par défaut (avant la copie).",
  },
  {
    name: "copiedLabel",
    type: "string",
    default: '"Copié !"',
    description: "Libellé affiché dans l&apos;état de confirmation (après la copie).",
  },
];

const usageCode = `import { CopyButton } from "@brickslab./ui-web";
import { useState } from "react";

function Demo() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("Texte copié !");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CopyButton
      onCopy={handleCopy}
      copied={copied}
    />
  );
}

// Labels personnalisés
<CopyButton
  onCopy={handleCopy}
  copied={copied}
  label="Copier le code"
  copiedLabel="Code copié !"
/>`;

export default function CopyButtonPage() {
  const [copiedDemo, setCopiedDemo] = useState(false);
  const [copiedCustom, setCopiedCustom] = useState(false);

  const handleCopyDemo = () => {
    setCopiedDemo(true);
    setTimeout(() => setCopiedDemo(false), 2000);
  };

  const handleCopyCustom = () => {
    setCopiedCustom(true);
    setTimeout(() => setCopiedCustom(false), 2000);
  };

  return (
    <div>
      <ComponentHeader
        name="CopyButton"
        description="Bouton de copie dans le presse-papier avec retour visuel de confirmation. Le composant est contrôlé : l&apos;état copied et le callback onCopy sont gérés par le parent."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>état par défaut vs état copié</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`copied=false (défaut)`}</PropTag>
          <CopyButton onCopy={() => {}} copied={false} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`copied=true`}</PropTag>
          <CopyButton onCopy={() => {}} copied={true} />
        </div>
      </Preview>

      <SubLabel>démo interactive — cliquer pour basculer l&apos;état</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>labels par défaut</PropTag>
          <CopyButton onCopy={handleCopyDemo} copied={copiedDemo} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>labels personnalisés</PropTag>
          <CopyButton
            onCopy={handleCopyCustom}
            copied={copiedCustom}
            label="Copier le code"
            copiedLabel="Code copié !"
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
