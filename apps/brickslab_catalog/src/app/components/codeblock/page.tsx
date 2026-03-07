"use client";

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
    name: "code",
    type: "string",
    required: true,
    description: "Code source à afficher.",
  },
  {
    name: "language",
    type: "string",
    default: '"tsx"',
    description: "Langage affiché dans le header (ex. : tsx, ts, js, css, bash).",
  },
  {
    name: "variant",
    type: '"modern" | "simple"',
    default: '"modern"',
    description: "modern : header style éditeur avec dots, numéros de ligne et bouton copier. simple : version minimaliste avec badge langue flottant.",
  },
  {
    name: "filename",
    type: "string",
    required: false,
    description: "Nom de fichier affiché dans le header (variante modern uniquement). Remplace le langage si fourni.",
  },
];

const tsxExample = `import { Heading } from "@brickslab./ui-web";

export default function MyPage() {
  return (
    <div>
      <Heading title="Bienvenue" level={1} tone="brand" />
      <Heading title="Sous-titre" level={2} tone="muted" />
    </div>
  );
}`;

const cssExample = `/* Variables de tokens */
:root {
  --color-brand: #CC4A48;
  --color-fg: var(--color-fg);
  --radius-md: 8px;
}

.my-component {
  color: var(--color-brand);
  border-radius: var(--radius-md);
}`;

const bashExample = `# Installation
npm install @brickslab./ui-web

# Ou avec pnpm
pnpm add @brickslab./ui-web`;

const usageCode = `import { CodeBlock } from "@brickslab./ui-web";

// Variante moderne (défaut)
<CodeBlock code="const x = 1;" language="tsx" />

// Avec nom de fichier
<CodeBlock code={snippet} language="tsx" filename="Button.tsx" />

// Variante simple
<CodeBlock code="npm install @brickslab./ui-web" language="bash" variant="simple" />`;

export default function CodeBlockPage() {
  return (
    <div>
      <ComponentHeader
        name="CodeBlock"
        description="Bloc de code avec bouton de copie intégré. Deux variantes : modern (header style éditeur, numéros de ligne) et simple (badge flottant). Utilisé sur toutes les pages du catalog."
      />

      {/* ── Variante moderne ────────────────────────────────────────── */}
      <SectionTitle>Variante modern (défaut)</SectionTitle>

      <SubLabel>language="tsx"</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <CodeBlock code={tsxExample} language="tsx" />
        </div>
      </Preview>

      <SubLabel>Avec filename</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <CodeBlock code={tsxExample} language="tsx" filename="MyPage.tsx" />
        </div>
      </Preview>

      <SubLabel>language="css"</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <CodeBlock code={cssExample} language="css" />
        </div>
      </Preview>

      <SubLabel>language="bash"</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <CodeBlock code={bashExample} language="bash" />
        </div>
      </Preview>

      {/* ── Variante simple ─────────────────────────────────────────── */}
      <SectionTitle>Variante simple</SectionTitle>

      <SubLabel>variant="simple"</SubLabel>
      <Preview>
        <div style={{ width: "100%" }}>
          <CodeBlock code={tsxExample} language="tsx" variant="simple" />
        </div>
      </Preview>

      {/* ── Props ──────────────────────────────────────────────────── */}
      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      {/* ── Utilisation ────────────────────────────────────────────── */}
      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" filename="exemple.tsx" />
    </div>
  );
}
