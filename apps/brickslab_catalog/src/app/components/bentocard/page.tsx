"use client";

import { BentoCard } from "@brickslab./ui-web";
import { FiArrowRight, FiStar, FiCode, FiZap } from "react-icons/fi";
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
    name: "name",
    type: "string",
    required: true,
    description: "Card title/heading.",
  },
  {
    name: "description",
    type: "string",
    description: "Optional extended description text.",
  },
  {
    name: "Icon",
    type: "React.ElementType",
    description: "Optional icon component to display at the top.",
  },
  {
    name: "href",
    type: "string",
    description: "If provided, renders as a link element with this href.",
  },
  {
    name: "cta",
    type: "string",
    description: "Call-to-action text (e.g., 'Learn more'). Shows arrow suffix.",
  },
  {
    name: "hoverEffect",
    type: '"lift" | "glow" | "none"',
    default: '"none"',
    description: 'Hover animation: "lift" (translateY), "glow" (box-shadow), "none" (no animation).',
  },
  {
    name: "interactive",
    type: "boolean",
    default: "false",
    description: "Enable interactive cursor feedback.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS class for custom styling.",
  },
];

const usageCode = `import { BentoCard } from "@brickslab./ui-web";
import { FiCode } from "react-icons/fi";

// Basic card
<BentoCard name="Development" description="Build faster" />

// With icon and link
<BentoCard
  name="Documentation"
  description="Learn the basics"
  Icon={FiCode}
  href="/docs"
  cta="Read"
/>

// With hover effect
<BentoCard
  name="Feature"
  Icon={FiStar}
  hoverEffect="lift"
  interactive
/>

// Interactive callback
<BentoCard
  name="Action"
  onClick={() => console.log("clicked")}
  hoverEffect="glow"
  interactive
/>`;

export default function BentoCardPage() {
  return (
    <div>
      <ComponentHeader
        name="BentoCard"
        description="Feature card component for bento grids with optional icon, description, CTA, and hover effects. Renders as link or div based on props. Perfect for showcasing features."
      />

      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>No hover effect (default)</SubLabel>
      <Preview>
        <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 250px" }}>
            <BentoCard
              name="Simple Card"
              description="Just a title and description"
              Icon={FiCode}
            />
          </div>
          <div style={{ flex: "1 1 250px" }}>
            <BentoCard name="No Description" Icon={FiStar} />
          </div>
        </div>
      </Preview>

      <SubLabel>With hover="lift" effect</SubLabel>
      <Preview>
        <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 250px" }}>
            <BentoCard
              name="Lift Effect"
              description="Hovers up smoothly"
              Icon={FiArrowRight}
              hoverEffect="lift"
            />
          </div>
          <div style={{ flex: "1 1 250px" }}>
            <BentoCard
              name="With CTA"
              description="Interactive card"
              Icon={FiCode}
              cta="Explore"
              hoverEffect="lift"
              interactive
            />
          </div>
        </div>
      </Preview>

      <SubLabel>With hover="glow" effect</SubLabel>
      <Preview>
        <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 250px" }}>
            <BentoCard
              name="Glow Effect"
              description="Emits subtle glow"
              Icon={FiZap}
              hoverEffect="glow"
            />
          </div>
          <div style={{ flex: "1 1 250px" }}>
            <BentoCard
              name="Linked Card"
              href="/components/bentocard"
              description="Click to navigate"
              cta="Visit"
              Icon={FiArrowRight}
              hoverEffect="glow"
            />
          </div>
        </div>
      </Preview>

      <SectionTitle>Props Table</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />
    </div>
  );
}
