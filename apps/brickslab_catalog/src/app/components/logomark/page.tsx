"use client";

import { LogoMark } from "@brickslab./ui-web";
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
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Taille du logo. Contrôle les dimensions globales du composant.",
  },
  {
    name: "variant",
    type: '"full" | "icon"',
    default: '"full"',
    description: '"full" affiche le logo complet avec le nom de marque. "icon" affiche uniquement le symbole/icône.',
  },
];

const usageCode = `import { LogoMark } from "@brickslab./ui-web";

// Variante full (défaut) — toutes les tailles
<LogoMark size="sm" variant="full" />
<LogoMark size="md" variant="full" />
<LogoMark size="lg" variant="full" />

// Variante icon uniquement
<LogoMark size="sm" variant="icon" />
<LogoMark size="md" variant="icon" />
<LogoMark size="lg" variant="icon" />`;

export default function LogoMarkPage() {
  return (
    <div>
      <ComponentHeader
        name="LogoMark"
        description="Logo de marque BricksLab disponible en deux variantes (full / icon) et trois tailles. Utilisé dans les headers, footers et écrans de chargement."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>{`variant="full" — toutes les tailles`}</SubLabel>
      <Preview>
        {(["sm", "md", "lg"] as const).map((size) => (
          <div key={size} style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
            <PropTag>{`size="${size}"`}</PropTag>
            <LogoMark size={size} variant="full" />
          </div>
        ))}
      </Preview>

      <SubLabel>{`variant="icon" — toutes les tailles`}</SubLabel>
      <Preview>
        {(["sm", "md", "lg"] as const).map((size) => (
          <div key={size} style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
            <PropTag>{`size="${size}"`}</PropTag>
            <LogoMark size={size} variant="icon" />
          </div>
        ))}
      </Preview>

      <SubLabel>comparaison full vs icon — size: md</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`variant="full"`}</PropTag>
          <LogoMark size="md" variant="full" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`variant="icon"`}</PropTag>
          <LogoMark size="md" variant="icon" />
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
