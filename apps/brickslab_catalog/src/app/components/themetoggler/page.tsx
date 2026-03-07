"use client";

import { ThemeToggler } from "@brickslab./ui-web";
import { useState } from "react";
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
    name: "className",
    type: "string",
    description: "Additional CSS class.",
  },
  {
    name: "duration",
    type: "number",
    default: "500",
    description: "Animation transition duration in ms.",
  },
  {
    name: "mode",
    type: '"light" | "dark" | "system"',
    default: '"system"',
    description: "Initial theme mode.",
  },
  {
    name: "onChange",
    type: '(mode: "light" | "dark" | "system") => void',
    description: "Callback when mode changes.",
  },
  {
    name: "reducedMotion",
    type: '"auto" | "always" | "never"',
    default: '"auto"',
    description: "Respect prefers-reduced-motion.",
  },
];

const usageCode = `import { ThemeToggler } from "@brickslab./ui-web";

// Basic usage
<ThemeToggler />

// With callback
<ThemeToggler
  onChange={(mode) => console.log("Theme changed to:", mode)}
/>

// Custom duration
<ThemeToggler duration={800} />`;

export default function ThemeTogglerPage() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">(
    "system"
  );

  return (
    <div>
      <ComponentHeader
        name="ThemeToggler"
        description="Animated theme toggle component for switching between light, dark, and system modes. Features smooth rotation animation and emoji icons."
      />

      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>Default (System mode)</SubLabel>
      <Preview>
        <ThemeToggler mode={theme} onChange={setTheme} />
      </Preview>

      <SubLabel>Starting in Light Mode</SubLabel>
      <Preview>
        <ThemeToggler mode="light" />
      </Preview>

      <SubLabel>With Custom Animation Duration</SubLabel>
      <Preview>
        <ThemeToggler duration={300} />
      </Preview>

      <SectionTitle>Props Table</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />
    </div>
  );
}
