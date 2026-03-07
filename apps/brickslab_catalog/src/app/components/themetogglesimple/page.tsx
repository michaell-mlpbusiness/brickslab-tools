"use client";

import { ThemeToggleSimple } from "@brickslab./ui-web";
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
    name: "mode",
    type: '"light" | "dark" | "system"',
    default: '"system"',
    description: "Initial theme mode.",
  },
  {
    name: "label",
    type: "string",
    description: "Custom label text. Defaults to mode name.",
  },
  {
    name: "onChange",
    type: '(mode: "light" | "dark" | "system") => void',
    description: "Callback when mode changes.",
  },
];

const usageCode = `import { ThemeToggleSimple } from "@brickslab./ui-web";

// Basic usage
<ThemeToggleSimple />

// Custom label
<ThemeToggleSimple label="Theme" />

// With callback
<ThemeToggleSimple
  onChange={(mode) => console.log("Theme:", mode)}
/>`;

export default function ThemeToggleSimplePage() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">(
    "system"
  );

  return (
    <div>
      <ComponentHeader
        name="ThemeToggleSimple"
        description="Simple, non-animated theme toggle for accessibility and performance. Cycles between light, dark, and system modes without animations."
      />

      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>Default (Shows current mode)</SubLabel>
      <Preview>
        <ThemeToggleSimple mode={theme} onChange={setTheme} />
      </Preview>

      <SubLabel>With Custom Label</SubLabel>
      <Preview>
        <ThemeToggleSimple mode="light" label="🌓 Switch Theme" />
      </Preview>

      <SubLabel>Light Mode Default</SubLabel>
      <Preview>
        <ThemeToggleSimple mode="light" />
      </Preview>

      <SubLabel>Dark Mode Default</SubLabel>
      <Preview>
        <ThemeToggleSimple mode="dark" />
      </Preview>

      <SectionTitle>Props Table</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />
    </div>
  );
}
