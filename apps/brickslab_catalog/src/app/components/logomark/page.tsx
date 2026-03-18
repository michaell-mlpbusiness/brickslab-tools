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

// --- Remplacer par les vrais assets ---
const DEMO_IMG_SRC = "https://i.pravatar.cc/150?img=47";
const DEMO_IMG_ALT = "BricksLab";

// ─── Props table ───────────────────────────────────────────────────────────────
const props: PropDef[] = [
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Contrôle les dimensions globales du composant.",
  },
  {
    name: "variant",
    type: '"full" | "icon" | "both"',
    default: '"full"',
    description:
      '"full" affiche uniquement le texte. "icon" affiche uniquement l\'icône. "both" combine icône + texte côte à côte.',
  },
  {
    name: "text",
    type: "string",
    default: "—",
    description:
      'Texte custom affiché en variant "full" ou "both". Si absent, rendu par défaut "BricksLab".',
  },
  {
    name: "shape",
    type: '"square" | "circle"',
    default: '"square"',
    description:
      'Forme du conteneur icône (DefaultIcon et CustomIcon). S\'applique en variant "icon" et "both".',
  },
  {
    name: "imgSrc",
    type: "string",
    default: "—",
    description:
      'URL de l\'image custom pour l\'icône. Si absent, rendu par défaut "B". S\'applique en variant "icon" et "both".',
  },
  {
    name: "imgAlt",
    type: "string",
    default: '"Logo"',
    description: "Texte alternatif de l'image. Requis si imgSrc est fourni (accessibilité).",
  },
];

// ─── Code blocks ───────────────────────────────────────────────────────────────
const codeVariantFull = `// Rendu texte par défaut
<LogoMark variant="full" size="sm" />
<LogoMark variant="full" size="md" />
<LogoMark variant="full" size="lg" />

// Texte custom
<LogoMark variant="full" size="md" text="MonProduit" />`;

const codeVariantIcon = `// Icône par défaut — shape square
<LogoMark variant="icon" size="sm" shape="square" />
<LogoMark variant="icon" size="md" shape="square" />
<LogoMark variant="icon" size="lg" shape="square" />

// Icône par défaut — shape circle
<LogoMark variant="icon" size="md" shape="circle" />

// Icône custom (image)
<LogoMark variant="icon" size="md" imgSrc="/assets/logo-icon.svg" imgAlt="BricksLab" shape="square" />
<LogoMark variant="icon" size="md" imgSrc="/assets/logo-icon.svg" imgAlt="BricksLab" shape="circle" />`;

const codeVariantBoth = `// Défaut icône + défaut texte
<LogoMark variant="both" size="md" />

// Image custom + texte par défaut
<LogoMark variant="both" size="md" imgSrc="/assets/logo-icon.svg" imgAlt="BricksLab" />

// Image custom + texte custom
<LogoMark variant="both" size="md" imgSrc="/assets/logo-icon.svg" imgAlt="BricksLab" text="MonProduit" />

// Shape circle
<LogoMark variant="both" size="md" imgSrc="/assets/logo-icon.svg" imgAlt="BricksLab" shape="circle" />`;

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function LogoMarkPage() {
  return (
    <div>
      <ComponentHeader
        name="LogoMark"
        description='Logo de marque disponible en trois variantes (full / icon / both), trois tailles et deux shapes. Chaque variante accepte un rendu par défaut ou un contenu custom via text / imgSrc.'
      />

      {/* ── variant="full" ──────────────────────────────────────────── */}
      <SectionTitle>variant="full"</SectionTitle>

      <SubLabel>Rendu par défaut — toutes les tailles</SubLabel>
      <Preview>
        {(["sm", "md", "lg"] as const).map((size) => (
          <div key={size} style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
            <PropTag>{`size="${size}"`}</PropTag>
            <LogoMark variant="full" size={size} />
          </div>
        ))}
      </Preview>

      <SubLabel>Texte custom — size: md</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`text="MonProduit"`}</PropTag>
          <LogoMark variant="full" size="md" text="MonProduit" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`text absent (défaut)`}</PropTag>
          <LogoMark variant="full" size="md" />
        </div>
      </Preview>

      {/* ── variant="icon" ──────────────────────────────────────────── */}
      <SectionTitle>variant="icon"</SectionTitle>

      <SubLabel>Icône par défaut — shape: square — toutes les tailles</SubLabel>
      <Preview>
        {(["sm", "md", "lg"] as const).map((size) => (
          <div key={size} style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
            <PropTag>{`size="${size}"`}</PropTag>
            <LogoMark variant="icon" size={size} shape="square" />
          </div>
        ))}
      </Preview>

      <SubLabel>Icône par défaut — shape: circle — toutes les tailles</SubLabel>
      <Preview>
        {(["sm", "md", "lg"] as const).map((size) => (
          <div key={size} style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
            <PropTag>{`size="${size}"`}</PropTag>
            <LogoMark variant="icon" size={size} shape="circle" />
          </div>
        ))}
      </Preview>

      <SubLabel>Comparaison square vs circle — size: md</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`shape="square"`}</PropTag>
          <LogoMark variant="icon" size="md" shape="square" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`shape="circle"`}</PropTag>
          <LogoMark variant="icon" size="md" shape="circle" />
        </div>
      </Preview>

      <SubLabel>Icône custom (imgSrc) — comparaison square vs circle — size: md</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`imgSrc + shape="square"`}</PropTag>
          <LogoMark variant="icon" size="md" imgSrc={DEMO_IMG_SRC} imgAlt={DEMO_IMG_ALT} shape="square" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`imgSrc + shape="circle"`}</PropTag>
          <LogoMark variant="icon" size="md" imgSrc={DEMO_IMG_SRC} imgAlt={DEMO_IMG_ALT} shape="circle" />
        </div>
      </Preview>

      {/* ── variant="both" ──────────────────────────────────────────── */}
      <SectionTitle>variant="both"</SectionTitle>

      <SubLabel>Rendu par défaut — toutes les tailles</SubLabel>
      <Preview>
        {(["sm", "md", "lg"] as const).map((size) => (
          <div key={size} style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
            <PropTag>{`size="${size}"`}</PropTag>
            <LogoMark variant="both" size={size} />
          </div>
        ))}
      </Preview>

      <SubLabel>Image custom + texte par défaut — size: md</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`imgSrc · shape="square"`}</PropTag>
          <LogoMark variant="both" size="md" imgSrc={DEMO_IMG_SRC} imgAlt={DEMO_IMG_ALT} shape="square" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`imgSrc · shape="circle"`}</PropTag>
          <LogoMark variant="both" size="md" imgSrc={DEMO_IMG_SRC} imgAlt={DEMO_IMG_ALT} shape="circle" />
        </div>
      </Preview>

      <SubLabel>Image custom + texte custom — size: md</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`imgSrc + text="MonProduit"`}</PropTag>
          <LogoMark variant="both" size="md" imgSrc={DEMO_IMG_SRC} imgAlt={DEMO_IMG_ALT} text="MonProduit" />
        </div>
      </Preview>

      <SubLabel>Matrice complète — variant="both" · size: md</SubLabel>
      <Preview>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`défaut icône + défaut texte`}</PropTag>
          <LogoMark variant="both" size="md" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`imgSrc + défaut texte`}</PropTag>
          <LogoMark variant="both" size="md" imgSrc={DEMO_IMG_SRC} imgAlt={DEMO_IMG_ALT} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`défaut icône + text custom`}</PropTag>
          <LogoMark variant="both" size="md" text="MonProduit" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PropTag>{`imgSrc + text custom`}</PropTag>
          <LogoMark variant="both" size="md" imgSrc={DEMO_IMG_SRC} imgAlt={DEMO_IMG_ALT} text="MonProduit" />
        </div>
      </Preview>

      {/* ── Props ──────────────────────────────────────────────────── */}
      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      {/* ── Utilisation ────────────────────────────────────────────── */}
      <SectionTitle>Utilisation — variant full</SectionTitle>
      <CodeBlock code={codeVariantFull} />

      <SectionTitle>Utilisation — variant icon</SectionTitle>
      <CodeBlock code={codeVariantIcon} />

      <SectionTitle>Utilisation — variant both</SectionTitle>
      <CodeBlock code={codeVariantBoth} />
    </div>
  );
}