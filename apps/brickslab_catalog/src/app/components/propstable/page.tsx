"use client";

import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  PropTag,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

// PropDef fields documented using PropsTable itself (meta-documentation)
const propsTableProps: PropDef[] = [
  {
    name: "props",
    type: "PropDef[]",
    required: true,
    description: "Tableau de définitions de props à afficher dans le tableau de documentation.",
  },
];

const propDefFields: PropDef[] = [
  {
    name: "name",
    type: "string",
    required: true,
    description: "Nom de la prop.",
  },
  {
    name: "type",
    type: "string",
    required: true,
    description: "Type TypeScript de la prop (ex. : string, number, boolean, ReactNode...).",
  },
  {
    name: "required",
    type: "boolean",
    description: "Indique si la prop est obligatoire. Si false ou absent, la prop est optionnelle.",
  },
  {
    name: "default",
    type: "string",
    description: "Valeur par défaut de la prop. Doit être une chaîne représentant la valeur (ex. : '\"left\"', 'false', '0').",
  },
  {
    name: "description",
    type: "string",
    description: "Description de la prop et de son comportement.",
  },
];

const usageCode = `import { PropsTable, type PropDef } from "../../../catalog/PropsTable";

const props: PropDef[] = [
  {
    name: "title",
    type: "string",
    required: true,
    description: "Titre principal du composant.",
  },
  {
    name: "align",
    type: '"left" | "center" | "right"',
    default: '"left"',
    description: "Alignement du contenu.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Désactive le composant.",
  },
];

<PropsTable props={props} />`;

export default function PropsTablePage() {
  return (
    <div>
      <ComponentHeader
        name="PropsTable"
        description="Tableau de documentation des props d'un composant. Utilisé sur toutes les pages du catalog pour présenter les APIs de composants de façon standardisée. Cette page est une méta-documentation : PropsTable documente ses propres props."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>PropsTable documentant ses propres props</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <PropsTable props={propsTableProps} />
        </div>
      </Preview>

      <SubLabel>structure de PropDef — les champs disponibles</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <PropsTable props={propDefFields} />
        </div>
      </Preview>

      <SubLabel>exemple avec différents types de props</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <PropsTable
            props={[
              { name: "title", type: "string", required: true, description: "Titre principal du composant." },
              { name: "align", type: '"left" | "center" | "right"', default: '"left"', description: "Alignement du contenu." },
              { name: "count", type: "number", default: "0", description: "Compteur numérique." },
              { name: "disabled", type: "boolean", default: "false", description: "Désactive le composant." },
              { name: "children", type: "ReactNode", description: "Contenu enfant du composant." },
              { name: "onChange", type: "(value: string) => void", description: "Callback déclenché lors d'un changement de valeur." },
            ]}
          />
        </div>
      </Preview>

      {/* ── Props ──────────────────────────────────────────────────── */}
      <SectionTitle>Props</SectionTitle>
      <PropsTable props={propsTableProps} />

      {/* ── Utilisation ────────────────────────────────────────────── */}
      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} />
    </div>
  );
}
