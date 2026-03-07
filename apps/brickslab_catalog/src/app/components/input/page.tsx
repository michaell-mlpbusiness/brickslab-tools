"use client";
import { useState } from "react";
import { Input } from "@brickslab./ui-web";
import { FiMail, FiLock, FiSearch, FiUser, FiAlertCircle, FiEye } from "react-icons/fi";
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
    description: "Valeur contrôlée du champ.",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    required: true,
    description: "Callback déclenché à chaque modification, reçoit la valeur string.",
  },
  {
    name: "type",
    type: '"text" | "email" | "password" | "number" | "search" | "url"',
    default: '"text"',
    description: "Type HTML natif du champ input.",
  },
  {
    name: "label",
    type: "string",
    description: "Label affiché au-dessus du champ, lié via htmlFor.",
  },
  {
    name: "placeholder",
    type: "string",
    description: "Texte indicatif affiché lorsque le champ est vide.",
  },
  {
    name: "helperText",
    type: "string",
    description: "Texte d'aide affiché sous le champ (en muted). Masqué si errorText est présent.",
  },
  {
    name: "errorText",
    type: "string",
    description: "Message d'erreur affiché sous le champ (en rouge). Active aussi la bordure rouge.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Désactive le champ (opacité 0.5, curseur not-allowed).",
  },
  {
    name: "readOnly",
    type: "boolean",
    default: "false",
    description: "Rend le champ en lecture seule.",
  },
  {
    name: "leftIcon",
    type: "React.ReactNode",
    description: "Icône positionnée à gauche à l'intérieur du champ.",
  },
  {
    name: "rightIcon",
    type: "React.ReactNode",
    description: "Icône positionnée à droite à l'intérieur du champ.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Taille du champ (hauteur, padding, taille de police).",
  },
  {
    name: "fullWidth",
    type: "boolean",
    default: "false",
    description: "Étire le champ à 100% de la largeur du conteneur.",
  },
  {
    name: "id",
    type: "string",
    description: "ID HTML du champ. Auto-généré via React.useId() si non fourni.",
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
  {
    name: "autoFocus",
    type: "boolean",
    default: "false",
    description: "Donne le focus au champ au montage.",
  },
  {
    name: "maxLength",
    type: "number",
    description: "Nombre maximum de caractères autorisés.",
  },
];

const usageCode = `import { Input } from "@brickslab./ui-web";
import { FiMail, FiSearch } from "react-icons/fi";

// Basique
<Input value={val} onChange={setVal} placeholder="Texte..." />

// Avec label et helper
<Input
  value={email}
  onChange={setEmail}
  label="Adresse e-mail"
  helperText="Nous ne partagerons jamais votre e-mail."
  type="email"
/>

// Erreur
<Input
  value={val}
  onChange={setVal}
  label="Nom d'utilisateur"
  errorText="Ce nom est déjà utilisé."
/>

// Avec icônes
<Input
  value={search}
  onChange={setSearch}
  leftIcon={<FiSearch />}
  placeholder="Rechercher..."
/>

// Tailles
<Input size="sm" value={v} onChange={setV} placeholder="sm" />
<Input size="md" value={v} onChange={setV} placeholder="md" />
<Input size="lg" value={v} onChange={setV} placeholder="lg" />

// Full width
<Input fullWidth value={v} onChange={setV} placeholder="Pleine largeur" />`;

export default function InputPage() {
  const [basic, setBasic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [sm, setSm] = useState("");
  const [md, setMd] = useState("");
  const [lg, setLg] = useState("");
  const [withError, setWithError] = useState("valeur invalide");
  const [labelHelper, setLabelHelper] = useState("");
  const [required, setRequired] = useState("");
  const [fullW, setFullW] = useState("");
  const [number, setNumber] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div>
      <ComponentHeader
        name="Input"
        description="Champ de saisie contrôlé et généraliste avec support des labels, icônes gauche/droite, textes d'aide et d'erreur, 3 tailles et plusieurs types HTML. Hover et focus gérés via CSS natif sans 'use client'."
      />

      {/* ── Aperçu ──────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>
      <SubLabel>champ basique avec placeholder</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
          <Input value={basic} onChange={setBasic} placeholder="Entrez du texte..." />
          <Input
            value={email}
            onChange={setEmail}
            type="email"
            leftIcon={<FiMail />}
            placeholder="adresse@exemple.com"
          />
          <Input
            value={password}
            onChange={setPassword}
            type="password"
            leftIcon={<FiLock />}
            rightIcon={<FiEye />}
            placeholder="Mot de passe"
          />
        </div>
      </Preview>

      {/* ── Tailles ─────────────────────────────────────────────────── */}
      <SectionTitle>Tailles</SectionTitle>
      <SubLabel>sm (28px) · md (38px) · lg (44px)</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            <PropTag>sm</PropTag>
            <Input size="sm" value={sm} onChange={setSm} placeholder="Petit" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            <PropTag>md</PropTag>
            <Input size="md" value={md} onChange={setMd} placeholder="Moyen" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            <PropTag>lg</PropTag>
            <Input size="lg" value={lg} onChange={setLg} placeholder="Grand" />
          </div>
        </div>
      </Preview>

      {/* ── Avec icônes ─────────────────────────────────────────────── */}
      <SectionTitle>Avec icônes</SectionTitle>
      <SubLabel>leftIcon · rightIcon · les deux</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>leftIcon</PropTag>
            <Input
              value={search}
              onChange={setSearch}
              leftIcon={<FiSearch />}
              placeholder="Rechercher..."
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>rightIcon</PropTag>
            <Input
              value={email}
              onChange={setEmail}
              rightIcon={<FiMail />}
              placeholder="E-mail"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>leftIcon + rightIcon</PropTag>
            <Input
              value={password}
              onChange={setPassword}
              leftIcon={<FiLock />}
              rightIcon={<FiEye />}
              type="password"
              placeholder="Mot de passe"
            />
          </div>
        </div>
      </Preview>

      {/* ── États ───────────────────────────────────────────────────── */}
      <SectionTitle>États</SectionTitle>
      <SubLabel>error · disabled · readOnly</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>error</PropTag>
            <Input
              value={withError}
              onChange={setWithError}
              leftIcon={<FiAlertCircle />}
              errorText="Ce nom d'utilisateur est déjà pris."
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>disabled</PropTag>
            <Input
              value="Valeur désactivée"
              onChange={() => {}}
              disabled
              placeholder="Désactivé"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>readOnly</PropTag>
            <Input
              value="Valeur en lecture seule"
              onChange={() => {}}
              readOnly
            />
          </div>
        </div>
      </Preview>

      {/* ── Label + helper ──────────────────────────────────────────── */}
      <SectionTitle>Label et texte d'aide</SectionTitle>
      <SubLabel>label · helperText · required (astérisque)</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
          <Input
            value={labelHelper}
            onChange={setLabelHelper}
            label="Adresse e-mail"
            helperText="Nous ne partagerons jamais votre e-mail."
            type="email"
            placeholder="adresse@exemple.com"
          />
          <Input
            value={required}
            onChange={setRequired}
            label="Nom d'utilisateur"
            required
            leftIcon={<FiUser />}
            placeholder="jean_dupont"
          />
        </div>
      </Preview>

      {/* ── Types ───────────────────────────────────────────────────── */}
      <SectionTitle>Types HTML</SectionTitle>
      <SubLabel>text · email · password · number · search · url</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
          <Input value={email} onChange={setEmail} type="email" label="email" placeholder="adresse@exemple.com" />
          <Input value={number} onChange={setNumber} type="number" label="number" placeholder="42" />
          <Input value={url} onChange={setUrl} type="url" label="url" placeholder="https://exemple.com" />
        </div>
      </Preview>

      {/* ── Full Width ───────────────────────────────────────────────── */}
      <SectionTitle>Pleine largeur</SectionTitle>
      <SubLabel>fullWidth — s'étire à 100% du conteneur</SubLabel>
      <Preview>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
          <Input
            fullWidth
            value={fullW}
            onChange={setFullW}
            label="Nom complet"
            placeholder="Jean Dupont"
            leftIcon={<FiUser />}
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
