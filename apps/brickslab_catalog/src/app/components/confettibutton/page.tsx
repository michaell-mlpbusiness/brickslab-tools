"use client";

import { ConfettiButton } from "@brickslab./ui-web";
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
    name: "children",
    type: "React.ReactNode",
    description: "Button label or content.",
  },
  {
    name: "options",
    type: "Partial<ConfettiProps>",
    description: "Configuration for confetti animation.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disable the button.",
  },
  {
    name: "onClick",
    type: "() => void",
    description: "Callback triggered on click.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS class.",
  },
];

const usageCode = `import { ConfettiButton } from "@brickslab./ui-web";

// Basic usage
<ConfettiButton>Celebrate!</ConfettiButton>

// Custom confetti
<ConfettiButton
  options={{
    particleCount: 150,
    angle: 45,
    spread: 90,
    colors: ["#CC4A48", "#4ADE80"],
  }}
>
  Success!
</ConfettiButton>

// With callback
<ConfettiButton onClick={() => console.log("Clicked!")}>
  Click me
</ConfettiButton>`;

export default function ConfettiButtonPage() {
  return (
    <div>
      <ComponentHeader
        name="ConfettiButton"
        description="Interactive button that triggers confetti animation on click. Combines the Confetti component with a button for easy celebration triggers."
      />

      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>Default ConfettiButton</SubLabel>
      <Preview>
        <ConfettiButton>🎉 Celebrate</ConfettiButton>
      </Preview>

      <SubLabel>With Custom Confetti Options</SubLabel>
      <Preview>
        <ConfettiButton
          options={{
            particleCount: 120,
            angle: 90,
            spread: 75,
            colors: ["#CC4A48", "#F59E0B", "#4ADE80"],
          }}
        >
          ✨ Success!
        </ConfettiButton>
      </Preview>

      <SubLabel>Multiple Variants</SubLabel>
      <Preview>
        <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
          <ConfettiButton
            options={{ particleCount: 50, colors: ["#CC4A48"] }}
          >
            Red Burst
          </ConfettiButton>
          <ConfettiButton
            options={{ particleCount: 80, colors: ["#4ADE80"] }}
          >
            Green Burst
          </ConfettiButton>
          <ConfettiButton
            options={{ particleCount: 100, spread: 120, angle: 45 }}
          >
            Wide Spread
          </ConfettiButton>
        </div>
      </Preview>

      <SectionTitle>Props Table</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />
    </div>
  );
}
