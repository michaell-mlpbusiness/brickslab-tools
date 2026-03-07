"use client";
import { useState } from "react";
import { Textarea } from "@brickslab./ui-web";
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
    name: "value",
    type: "string",
    required: true,
    description: "Valeur contrôlée du textarea.",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    required: true,
    description: "Callback déclenché à chaque frappe, reçoit la valeur string.",
  },
  {
    name: "label",
    type: "string",
    description: "Label affiché au-dessus du textarea, lié via htmlFor.",
  },
  {
    name: "placeholder",
    type: "string",
    description: "Texte indicatif affiché quand le textarea est vide.",
  },
  {
    name: "helperText",
    type: "string",
    description: "Texte d'aide affiché sous le textarea (en muted). Masqué si errorText est présent.",
  },
  {
    name: "errorText",
    type: "string",
    description: "Message d'erreur affiché sous le textarea (en rouge). Active aussi la bordure rouge.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Désactive le textarea (opacité 0.5, curseur not-allowed).",
  },
  {
    name: "readOnly",
    type: "boolean",
    default: "false",
    description: "Rend le textarea en lecture seule.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Taille du textarea (padding et taille de police).",
  },
  {
    name: "fullWidth",
    type: "boolean",
    default: "false",
    description: "Étire le textarea à 100% de la largeur du conteneur.",
  },
  {
    name: "rows",
    type: "number",
    default: "4",
    description: "Nombre de lignes visibles par défaut.",
  },
  {
    name: "maxLength",
    type: "number",
    description: "Longueur maximale. Active le compteur {length}/{maxLength} si fourni.",
  },
  {
    name: "resize",
    type: '"none" | "vertical" | "both"',
    default: '"vertical"',
    description: "Contrôle la poignée de redimensionnement CSS. Ignoré si autoResize est actif.",
  },
  {
    name: "autoResize",
    type: "boolean",
    default: "false",
    description: "Ajuste automatiquement la hauteur au contenu via scrollHeight.",
  },
  {
    name: "id",
    type: "string",
    description: "ID HTML du textarea. Auto-généré via React.useId() si non fourni.",
  },
  {
    name: "name",
    type: "string",
    description: "Nom du champ pour les formulaires HTML natifs.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    description: "Marque le champ comme requis (astérisque rouge sur le label).",
  },
];

const usageCode = `import { Textarea } from "@brickslab./ui-web";

// Basique
<Textarea value={text} onChange={setText} placeholder="Saisir un texte..." />

// Avec label et helper
<Textarea
  value={text}
  onChange={setText}
  label="Description"
  helperText="Décrivez votre projet en quelques lignes."
  rows={5}
/>

// Avec compteur
<Textarea
  value={text}
  onChange={setText}
  label="Bio"
  maxLength={200}
  placeholder="Parlez-nous de vous..."
/>

// AutoResize
<Textarea
  value={text}
  onChange={setText}
  autoResize
  placeholder="Ce textarea grandit avec votre texte..."
/>

// Erreur
<Textarea
  value={text}
  onChange={setText}
  label="Message"
  errorText="Ce champ est requis."
/>

// Tailles
<Textarea size="sm" value={text} onChange={setText} />
<Textarea size="md" value={text} onChange={setText} />
<Textarea size="lg" value={text} onChange={setText} />`;

export default function TextareaPage() {
  const [basic, setBasic] = useState("");
  const [sm, setSm] = useState("Exemple sm");
  const [md, setMd] = useState("Exemple md");
  const [lg, setLg] = useState("Exemple lg");
  const [rows2, setRows2] = useState("2 lignes");
  const [rows6, setRows6] = useState("6 lignes");
  const [autoResize, setAutoResize] = useState("Tapez pour voir le textarea grandir...");
  const [counter, setCounter] = useState("Avec compteur");
  const [withError, setWithError] = useState("");
  const [disabled, setDisabled] = useState("Valeur désactivée");
  const [readOnly, setReadOnly] = useState("Lecture seule");
  const [labelHelper, setLabelHelper] = useState("");
  const [required, setRequired] = useState("");
  const [fullW, setFullW] = useState("");
  const [resizeNone, setResizeNone] = useState("Pas de redimensionnement");
  const [resizeBoth, setResizeBoth] = useState("Redimensionnable dans les deux sens");

  return (
    <div>
      <ComponentHeader
        name="Textarea"
        description="Champ texte multi-lignes contrôlé. Supporte label, placeholder, textes d'aide et d'erreur, 3 tailles, compteur de caractères et autoResize. Aucun 'use client' dans ui-web — le composant est entièrement contrôlé via props."
      />

      {/* ── Aperçu ──────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>
      <SubLabel>textarea basique · placeholder</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>basique</PropTag>
            <Textarea
              value={basic}
              onChange={setBasic}
              placeholder="Saisir un texte..."
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>avec label</PropTag>
            <Textarea
              value={labelHelper}
              onChange={setLabelHelper}
              label="Description"
              placeholder="Décrivez votre projet..."
            />
          </div>
        </div>
      </Preview>

      {/* ── Tailles ─────────────────────────────────────────────────── */}
      <SectionTitle>Tailles</SectionTitle>
      <SubLabel>sm · md · lg</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>sm</PropTag>
            <Textarea size="sm" value={sm} onChange={setSm} rows={3} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>md</PropTag>
            <Textarea size="md" value={md} onChange={setMd} rows={3} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>lg</PropTag>
            <Textarea size="lg" value={lg} onChange={setLg} rows={3} />
          </div>
        </div>
      </Preview>

      {/* ── Rows ────────────────────────────────────────────────────── */}
      <SectionTitle>Rows</SectionTitle>
      <SubLabel>rows=2 · rows=6</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>rows=2</PropTag>
            <Textarea value={rows2} onChange={setRows2} rows={2} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>rows=6</PropTag>
            <Textarea value={rows6} onChange={setRows6} rows={6} />
          </div>
        </div>
      </Preview>

      {/* ── AutoResize ──────────────────────────────────────────────── */}
      <SectionTitle>AutoResize</SectionTitle>
      <SubLabel>grandit avec le contenu, ne rétrécit pas sous rows</SubLabel>
      <Preview>
        <div style={{ width: 360 }}>
          <Textarea
            value={autoResize}
            onChange={setAutoResize}
            autoResize
            label="Message"
            placeholder="Ce textarea grandit avec votre texte..."
            helperText="Ajoutez des lignes pour voir l'expansion automatique."
          />
        </div>
      </Preview>

      {/* ── Compteur ────────────────────────────────────────────────── */}
      <SectionTitle>Compteur de caractères</SectionTitle>
      <SubLabel>maxLength active le compteur — rouge à la limite</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-start" }}>
          <div style={{ width: 300 }}>
            <Textarea
              value={counter}
              onChange={setCounter}
              label="Bio"
              maxLength={100}
              placeholder="Parlez-nous de vous..."
              helperText="Maximum 100 caractères."
            />
          </div>
          <div style={{ width: 300 }}>
            <Textarea
              value={counter}
              onChange={setCounter}
              label="Sans helper"
              maxLength={100}
            />
          </div>
        </div>
      </Preview>

      {/* ── États ───────────────────────────────────────────────────── */}
      <SectionTitle>États</SectionTitle>
      <SubLabel>error · disabled · readOnly</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>error</PropTag>
            <Textarea
              value={withError}
              onChange={setWithError}
              label="Message"
              errorText="Ce champ est requis."
              placeholder="Saisir un message..."
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>disabled</PropTag>
            <Textarea
              value={disabled}
              onChange={setDisabled}
              label="Champ désactivé"
              disabled
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>readOnly</PropTag>
            <Textarea
              value={readOnly}
              onChange={setReadOnly}
              label="Lecture seule"
              readOnly
            />
          </div>
        </div>
      </Preview>

      {/* ── Resize ──────────────────────────────────────────────────── */}
      <SectionTitle>Redimensionnement</SectionTitle>
      <SubLabel>resize="none" · resize="vertical" (défaut) · resize="both"</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>none</PropTag>
            <Textarea value={resizeNone} onChange={setResizeNone} resize="none" rows={3} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>vertical (défaut)</PropTag>
            <Textarea value={basic} onChange={setBasic} resize="vertical" rows={3} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>both</PropTag>
            <Textarea value={resizeBoth} onChange={setResizeBoth} resize="both" rows={3} />
          </div>
        </div>
      </Preview>

      {/* ── Label + helper ──────────────────────────────────────────── */}
      <SectionTitle>Label et texte d'aide</SectionTitle>
      <SubLabel>label · helperText · required (astérisque)</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}>
          <Textarea
            value={labelHelper}
            onChange={setLabelHelper}
            label="Description du projet"
            helperText="Décrivez votre projet en quelques phrases."
            placeholder="Mon projet consiste à..."
          />
          <Textarea
            value={required}
            onChange={setRequired}
            label="Commentaire"
            required
            placeholder="Votre commentaire est obligatoire..."
          />
        </div>
      </Preview>

      {/* ── Full Width ───────────────────────────────────────────────── */}
      <SectionTitle>Pleine largeur</SectionTitle>
      <SubLabel>fullWidth — s'étire à 100% du conteneur</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <Textarea
            fullWidth
            value={fullW}
            onChange={setFullW}
            label="Message"
            placeholder="Votre message..."
            helperText="Ce textarea occupe toute la largeur disponible."
            rows={4}
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
