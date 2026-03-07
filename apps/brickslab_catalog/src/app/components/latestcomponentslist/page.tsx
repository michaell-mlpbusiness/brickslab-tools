"use client";

import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";
import { LatestComponentsList } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "items", type: "Array<{label:string;href?:string;section?:string;type?:'web'|'mobile'}>", required: true, description: "Composants affichés (libellé, lien, section, type)." },
];

const usageCode = `import { LatestComponentsList } from "@brickslab./ui-web";

<LatestComponentsList
  items={[
    { label: "TextCard", href: "/components/textcard", section: "Cards", type: "web" },
    { label: "SearchBar", href: "/components/searchbar", section: "Navigation", type: "web" },
  ]} 
/>`;

export default function LatestComponentsListPage() {
  return (
    <div>
      <ComponentHeader
        name="LatestComponentsList"
        description="Liste affichant les derniers composants ajoutés au catalogue. Idéal pour le dashboard d'accueil." 
      />

      <SectionTitle>Aperçu</SectionTitle>
      <SubLabel>Exemple des 5 derniers composants</SubLabel>
      <Preview>
        <div style={{ padding: 16, maxWidth: 520 }}>
          <LatestComponentsList
            items={[
              { label: "TextCard", href: "/components/textcard", section: "Cards", type: "web" },
              { label: "SearchBar", href: "/components/searchbar", section: "Navigation", type: "web" },
              { label: "FooterBar", href: "/components/footerbar", section: "Layout & Shell", type: "web" },
              { label: "HeroCtaSection", href: "/components/heroctasection", section: "Sections", type: "web" },
              { label: "CarouselWithTextSection", href: "/components/carouselwithtextsection", section: "Sections", type: "web" },
            ]}
          />
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Utilisation</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />
    </div>
  );
}
