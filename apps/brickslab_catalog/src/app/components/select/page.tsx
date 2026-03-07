"use client";
import { useState } from "react";
import { Select, type SelectOption } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  PropTag,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const fruitOptions: SelectOption[] = [
  { value: "apple", label: "Pomme" },
  { value: "banana", label: "Banane" },
  { value: "cherry", label: "Cerise" },
  { value: "grape", label: "Raisin" },
];

const countryOptions: SelectOption[] = [
  { value: "fr", label: "France" },
  { value: "de", label: "Allemagne" },
  { value: "es", label: "Espagne" },
  { value: "it", label: "Italie" },
  { value: "pt", label: "Portugal", disabled: true },
];

const roleOptions: SelectOption[] = [
  { value: "admin", label: "Administrateur" },
  { value: "editor", label: "Éditeur" },
  { value: "viewer", label: "Lecteur" },
];

const props: PropDef[] = [
  {
    name: "value",
    type: "string",
    required: true,
    description: "Valeur contrôlée du select.",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    required: true,
    description: "Callback déclenché à la sélection, reçoit la valeur string de l'option.",
  },
  {
    name: "options",
    type: "SelectOption[]",
    required: true,
    description: "Liste des options : { value, label, disabled? }.",
  },
  {
    name: "label",
    type: "string",
    description: "Label affiché au-dessus du select, lié via htmlFor.",
  },
  {
    name: "placeholder",
    type: "string",
    description: "Option grisée initiale affichée quand aucune valeur n'est sélectionnée (value = \"\").",
  },
  {
    name: "helperText",
    type: "string",
    description: "Texte d'aide affiché sous le select (en muted). Masqué si errorText est présent.",
  },
  {
    name: "errorText",
    type: "string",
    description: "Message d'erreur affiché sous le select (en rouge). Active aussi la bordure rouge.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Désactive le select (opacité 0.5, curseur not-allowed).",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Taille du select (hauteur, padding, taille de police).",
  },
  {
    name: "fullWidth",
    type: "boolean",
    default: "false",
    description: "Étire le select à 100% de la largeur du conteneur.",
  },
  {
    name: "id",
    type: "string",
    description: "ID HTML du select. Auto-généré via React.useId() si non fourni.",
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

const usageCode = `import { Select, type SelectOption } from "@brickslab./ui-web";

const options: SelectOption[] = [
  { value: "apple", label: "Pomme" },
  { value: "banana", label: "Banane" },
  { value: "cherry", label: "Cerise" },
];

// Basique
<Select value={val} onChange={setVal} options={options} />

// Avec placeholder
<Select
  value={val}
  onChange={setVal}
  options={options}
  placeholder="Choisir un fruit..."
/>

// Avec label et helper
<Select
  value={country}
  onChange={setCountry}
  options={countryOptions}
  label="Pays"
  helperText="Sélectionnez votre pays de résidence."
/>

// Erreur
<Select
  value={role}
  onChange={setRole}
  options={roleOptions}
  label="Rôle"
  errorText="Ce rôle n'est pas disponible."
/>

// Tailles
<Select size="sm" value={v} onChange={setV} options={options} />
<Select size="md" value={v} onChange={setV} options={options} />
<Select size="lg" value={v} onChange={setV} options={options} />

// Full width
<Select fullWidth value={v} onChange={setV} options={options} label="Pays" />`;

export default function SelectPage() {
  const [basic, setBasic] = useState("");
  const [withPlaceholder, setWithPlaceholder] = useState("");
  const [sm, setSm] = useState("apple");
  const [md, setMd] = useState("apple");
  const [lg, setLg] = useState("apple");
  const [withError, setWithError] = useState("");
  const [labelHelper, setLabelHelper] = useState("");
  const [required, setRequired] = useState("");
  const [fullW, setFullW] = useState("");
  const [country, setCountry] = useState("fr");

  return (
    <div>
      <ComponentHeader
        name="Select"
        description="Select natif contrôlé avec apparence personnalisée via appearance: none et chevron FiChevronDown. Supporte label, placeholder, textes d'aide et d'erreur, 3 tailles, options désactivées. Accessibilité et keyboard natifs, sans 'use client' dans ui-web."
      />

      {/* ── Aperçu ──────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>
      <SubLabel>select basique · avec placeholder</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>sans placeholder</PropTag>
            <Select value={basic} onChange={setBasic} options={fruitOptions} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>avec placeholder</PropTag>
            <Select
              value={withPlaceholder}
              onChange={setWithPlaceholder}
              options={fruitOptions}
              placeholder="Choisir un fruit..."
            />
          </div>
        </div>
      </Preview>

      {/* ── Tailles ─────────────────────────────────────────────────── */}
      <SectionTitle>Tailles</SectionTitle>
      <SubLabel>sm (28px) · md (38px) · lg (44px)</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            <PropTag>sm</PropTag>
            <Select size="sm" value={sm} onChange={setSm} options={fruitOptions} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            <PropTag>md</PropTag>
            <Select size="md" value={md} onChange={setMd} options={fruitOptions} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            <PropTag>lg</PropTag>
            <Select size="lg" value={lg} onChange={setLg} options={fruitOptions} />
          </div>
        </div>
      </Preview>

      {/* ── Placeholder ─────────────────────────────────────────────── */}
      <SectionTitle>Placeholder</SectionTitle>
      <SubLabel>option grisée initiale, visible quand value === ""</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
          <Select
            value={withPlaceholder}
            onChange={setWithPlaceholder}
            options={countryOptions}
            placeholder="Sélectionner un pays..."
            label="Pays de résidence"
          />
        </div>
      </Preview>

      {/* ── États ───────────────────────────────────────────────────── */}
      <SectionTitle>États</SectionTitle>
      <SubLabel>error · disabled · option disabled</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>error</PropTag>
            <Select
              value={withError}
              onChange={setWithError}
              options={roleOptions}
              placeholder="Choisir un rôle..."
              errorText="Vous devez sélectionner un rôle."
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>disabled</PropTag>
            <Select
              value="apple"
              onChange={() => {}}
              options={fruitOptions}
              disabled
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>option disabled (Portugal)</PropTag>
            <Select
              value={country}
              onChange={setCountry}
              options={countryOptions}
              label="Pays"
              helperText="Portugal désactivé dans la liste."
            />
          </div>
        </div>
      </Preview>

      {/* ── Label + helper ──────────────────────────────────────────── */}
      <SectionTitle>Label et texte d'aide</SectionTitle>
      <SubLabel>label · helperText · required (astérisque)</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
          <Select
            value={labelHelper}
            onChange={setLabelHelper}
            options={roleOptions}
            label="Rôle utilisateur"
            helperText="Le rôle détermine les permissions accordées."
            placeholder="Choisir un rôle..."
          />
          <Select
            value={required}
            onChange={setRequired}
            options={fruitOptions}
            label="Fruit préféré"
            required
            placeholder="Choisir un fruit..."
          />
        </div>
      </Preview>

      {/* ── Full Width ───────────────────────────────────────────────── */}
      <SectionTitle>Pleine largeur</SectionTitle>
      <SubLabel>fullWidth — s'étire à 100% du conteneur</SubLabel>
      <Preview>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
          <Select
            fullWidth
            value={fullW}
            onChange={setFullW}
            options={countryOptions}
            label="Pays"
            placeholder="Sélectionner un pays..."
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
