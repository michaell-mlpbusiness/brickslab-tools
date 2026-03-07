"use client";

import { BentoGrid, BentoCard } from "@brickslab./ui-web";
import { FiZap, FiCode, FiLayout, FiClock, FiStar, FiShield } from "react-icons/fi";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const gridProps: PropDef[] = [
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "Child elements (typically BentoCard components).",
  },
  {
    name: "columns",
    type: "number | \"auto\"",
    default: '"auto"',
    description: 'Number of columns. "auto" uses auto-fit with minWidth minimum.',
  },
  {
    name: "minWidth",
    type: "number | string",
    default: "250",
    description: 'Minimum card width in auto mode. E.g. 200 → "200px", or "15rem".',
  },
  {
    name: "gap",
    type: "number | string",
    default: "var(--space-4)",
    description: "Gap between grid items. Accepts CSS tokens or pixel values.",
  },
  {
    name: "dense",
    type: "boolean",
    default: "false",
    description: "Enable CSS Grid dense packing to fill gaps automatically.",
  },
  {
    name: "autoRows",
    type: "string",
    default: '"auto"',
    description: "CSS value for grid-auto-rows. E.g. \"180px\", \"1fr\", \"minmax(120px, auto)\".",
  },
  {
    name: "style",
    type: "React.CSSProperties",
    description: "Inline styles merged onto the grid container.",
  },
  {
    name: "as",
    type: "React.ElementType",
    default: '"div"',
    description: "HTML element or component to render as.",
  },
  {
    name: "reducedMotion",
    type: '"auto" | "always" | "never"',
    default: '"auto"',
    description: "Controls motion reduction. Propagated to child BentoCards via context.",
  },
];

const cardProps: PropDef[] = [
  { name: "name", type: "string", required: true, description: "Card title." },
  { name: "description", type: "string", description: "Card body text." },
  { name: "Icon", type: "React.ElementType", description: "Icon component (e.g. from react-icons)." },
  { name: "colSpan", type: "number", description: "Number of grid columns this card spans." },
  { name: "rowSpan", type: "number", description: "Number of grid rows this card spans." },
  { name: "hoverEffect", type: '"lift" | "glow" | "none"', default: '"none"', description: "Hover animation." },
  { name: "href", type: "string", description: "Makes the card a link." },
  { name: "cta", type: "string", description: "Call-to-action label shown at bottom." },
  { name: "background", type: "React.ReactNode", description: "Decorative background layer." },
  { name: "interactive", type: "boolean", default: "false", description: "Adds pointer cursor." },
  { name: "style", type: "React.CSSProperties", description: "Inline styles merged onto the card." },
  { name: "reducedMotion", type: '"auto" | "always" | "never"', description: "Per-card override. Inherits from BentoGrid context if omitted." },
];

const usageCode = `import { BentoGrid, BentoCard } from "@brickslab./ui-web";
import { FiZap, FiCode, FiLayout } from "react-icons/fi";

<BentoGrid columns={3} autoRows="180px" gap="var(--space-4)" dense>
  {/* Hero card — spans 2 cols × 2 rows */}
  <BentoCard
    name="Performance"
    description="Lightning-fast components, zero runtime overhead."
    Icon={FiZap}
    colSpan={2}
    rowSpan={2}
    hoverEffect="lift"
  />
  {/* Regular cards */}
  <BentoCard name="Clean Code" Icon={FiCode} hoverEffect="lift" />
  <BentoCard name="Design System" Icon={FiLayout} hoverEffect="lift" />
  {/* Banner — spans full width */}
  <BentoCard
    name="Open Source"
    description="Free forever."
    colSpan={3}
    hoverEffect="glow"
  />
</BentoGrid>`;

export default function BentoGridPage() {
  return (
    <div>
      <ComponentHeader
        name="BentoGrid"
        description="CSS Grid layout component for bento-style interfaces. Cards span multiple columns and rows to create rich, asymmetric layouts. Propagates reduced-motion preference to all children via context."
      />

      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>Bento layout — 3 colonnes, cellules asymétriques</SubLabel>
      <Preview>
        <BentoGrid columns={3} autoRows="180px" gap="var(--space-4)" dense>
          <BentoCard
            name="Performance"
            description="Lightning-fast components with zero runtime overhead and tree-shakable exports."
            Icon={FiZap}
            colSpan={2}
            rowSpan={2}
            hoverEffect="lift"
          />
          <BentoCard
            name="Type-safe"
            description="Full TypeScript support."
            Icon={FiShield}
            hoverEffect="lift"
          />
          <BentoCard
            name="Design tokens"
            description="Consistent visual language."
            Icon={FiStar}
            hoverEffect="lift"
          />
          <BentoCard
            name="Open Source"
            description="Free forever — MIT license."
            colSpan={3}
            hoverEffect="glow"
          />
        </BentoGrid>
      </Preview>

      <SubLabel>Dense packing — cartes de hauteurs variées</SubLabel>
      <Preview>
        <BentoGrid columns={4} autoRows="140px" gap="var(--space-3)" dense>
          <BentoCard name="Layout" Icon={FiLayout} hoverEffect="lift" />
          <BentoCard name="Speed" Icon={FiClock} rowSpan={2} hoverEffect="lift" />
          <BentoCard name="Code" Icon={FiCode} colSpan={2} hoverEffect="lift" />
          <BentoCard name="Zap" Icon={FiZap} colSpan={2} rowSpan={2} hoverEffect="glow" />
          <BentoCard name="Shield" Icon={FiShield} hoverEffect="lift" />
          <BentoCard name="Star" Icon={FiStar} hoverEffect="lift" />
        </BentoGrid>
      </Preview>

      <SubLabel>Auto-responsive — colonnes fluides</SubLabel>
      <Preview>
        <BentoGrid columns="auto" minWidth={200} gap="var(--space-4)">
          <BentoCard name="Performance" description="Optimized bundle" Icon={FiZap} hoverEffect="lift" />
          <BentoCard name="Code" description="Clean APIs" Icon={FiCode} hoverEffect="lift" />
          <BentoCard name="Layout" description="Flexible grid" Icon={FiLayout} hoverEffect="lift" />
          <BentoCard name="Speed" description="Fast renders" Icon={FiClock} hoverEffect="lift" />
        </BentoGrid>
      </Preview>

      <SectionTitle>BentoGrid Props</SectionTitle>
      <PropsTable props={gridProps} />

      <SectionTitle>BentoCard Props</SectionTitle>
      <PropsTable props={cardProps} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />
    </div>
  );
}
