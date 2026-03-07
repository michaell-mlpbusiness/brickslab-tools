"use client";

import { SocialLinks } from "@brickslab./ui-web";
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
    name: "links",
    type: "SocialLink[]",
    required: true,
    description: 'Liste des liens sociaux à afficher. Chaque item contient une plateforme ("github" | "twitter" | "linkedin" | "instagram" | "youtube") et un href.',
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Taille des icônes et des zones cliquables.",
  },
];

const usageCode = `import { SocialLinks } from "@brickslab./ui-web";

// Taille par défaut
<SocialLinks
  links={[
    { platform: "github",   href: "https://github.com/brickslab" },
    { platform: "twitter",  href: "https://twitter.com/brickslab" },
    { platform: "linkedin", href: "https://linkedin.com/company/brickslab" },
  ]}
/>

// Toutes les plateformes, taille sm
<SocialLinks
  size="sm"
  links={[
    { platform: "github",    href: "https://github.com/brickslab" },
    { platform: "twitter",   href: "https://twitter.com/brickslab" },
    { platform: "linkedin",  href: "https://linkedin.com/company/brickslab" },
    { platform: "instagram", href: "https://instagram.com/brickslab" },
    { platform: "youtube",   href: "https://youtube.com/@brickslab" },
  ]}
/>`;

const demoLinks = [
  { platform: "github" as const, href: "https://github.com/brickslab" },
  { platform: "twitter" as const, href: "https://twitter.com/brickslab" },
  { platform: "linkedin" as const, href: "https://linkedin.com/company/brickslab" },
];

export default function SocialLinksPage() {
  return (
    <div>
      <ComponentHeader
        name="SocialLinks"
        description="Groupe d'icônes de liens vers les réseaux sociaux. Supporte GitHub, Twitter, LinkedIn, Instagram et YouTube. Disponible en 3 tailles avec icônes accessibles."
      />

      {/* ── Aperçu ─────────────────────────────────────────────────── */}
      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>size</SubLabel>
      <Preview>
        {(["sm", "md", "lg"] as const).map((size) => (
          <div key={size} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <PropTag>{`size="${size}"`}</PropTag>
            <SocialLinks links={demoLinks} size={size} />
          </div>
        ))}
      </Preview>

      <SubLabel>toutes les plateformes — size: md</SubLabel>
      <Preview>
        <SocialLinks
          size="md"
          links={[
            { platform: "github", href: "https://github.com/brickslab" },
            { platform: "twitter", href: "https://twitter.com/brickslab" },
            { platform: "linkedin", href: "https://linkedin.com/company/brickslab" },
            { platform: "instagram", href: "https://instagram.com/brickslab" },
            { platform: "youtube", href: "https://youtube.com/@brickslab" },
          ]}
        />
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
