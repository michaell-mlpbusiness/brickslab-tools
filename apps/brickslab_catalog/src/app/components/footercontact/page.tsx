"use client";

import { FooterContact } from "@brickslab./ui-web";
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
    name: "email",
    type: "string",
    description: "Adresse e-mail de contact. Affichée avec un lien mailto.",
  },
  {
    name: "phone",
    type: "string",
    description: "Numéro de téléphone de contact. Affiché avec un lien tel.",
  },
  {
    name: "address",
    type: "string",
    description: "Adresse postale. Affichée en texte brut.",
  },
  {
    name: "title",
    type: "string",
    default: '"Contact"',
    description: "Titre de la section de contact.",
  },
];

const usageCode = `import { FooterContact } from "@brickslab./ui-web";

// Tous les champs renseignés
<FooterContact
  title="Nous contacter"
  email="hello@brickslab.io"
  phone="+33 1 23 45 67 89"
  address="12 rue de la Paix, 75001 Paris, France"
/>

// Email seul
<FooterContact
  email="support@brickslab.io"
/>

// Titre personnalisé
<FooterContact
  title="Support"
  email="support@brickslab.io"
  phone="+33 9 87 65 43 21"
/>`;

export default function FooterContactPage() {
  return (
    <div>
      <ComponentHeader
        name="FooterContact"
        description="Section de contact pour footer affichant l'email, le téléphone et l'adresse postale. Chaque champ est optionnel et génère automatiquement les liens appropriés (mailto, tel)."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>tous les champs renseignés</SubLabel>
      <Preview>
        <FooterContact
          title="Nous contacter"
          email="hello@brickslab.io"
          phone="+33 1 23 45 67 89"
          address="12 rue de la Paix, 75001 Paris, France"
        />
      </Preview>

      <SubLabel>champs partiels</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>email + phone seulement</PropTag>
          <FooterContact
            email="support@brickslab.io"
            phone="+33 9 87 65 43 21"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>email seul</PropTag>
          <FooterContact
            title="Support"
            email="support@brickslab.io"
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
