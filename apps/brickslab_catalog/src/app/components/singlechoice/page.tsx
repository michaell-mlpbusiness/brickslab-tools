"use client";
import React, { useState } from "react";
import { SingleChoice } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "value", type: "string", required: false, description: "Selected option id." },
  { name: "onChange", type: "(v: string) => void", required: true, description: "Called with the selected id (or the typed text when allowOther is active)." },
  { name: "options", type: "SingleChoiceOption[]", required: true, description: "Array of { id, label, description?, disabled? }." },
  { name: "variant", type: '"radio" | "card"', required: false, default: '"radio"', description: "Radio rows or card grid layout." },
  { name: "allowOther", type: "boolean", required: false, default: "false", description: "Adds a free-text «Other» option at the end." },
  { name: "otherLabel", type: "string", required: false, default: '"Other…"', description: "Placeholder/label for the other option." },
  { name: "disabled", type: "boolean", required: false, default: "false", description: "Disables all interactions." },
];

const options = [
  { id: "dev", label: "Developer", description: "I write code every day" },
  { id: "pm", label: "Product Manager", description: "I define the roadmap" },
  { id: "design", label: "Designer", description: "I craft the UX" },
];

export default function SingleChoicePage() {
  const [radio, setRadio] = useState<string | undefined>();
  const [card, setCard] = useState<string | undefined>();
  const [other, setOther] = useState<string | undefined>();

  return (
    <main>
      <ComponentHeader name="SingleChoice" description="Single-select question with radio or card variant and optional free-text other option." section="Quiz" />

      <SectionTitle>Radio variant</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 480 }}>
          <SingleChoice value={radio} onChange={setRadio} options={options} />
        </div>
      </Preview>

      <SectionTitle>Card variant</SectionTitle>
      <Preview>
        <SingleChoice value={card} onChange={setCard} options={options} variant="card" />
      </Preview>

      <SectionTitle>With «Other» option</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 480 }}>
          <SingleChoice value={other} onChange={setOther} options={options} allowOther />
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { SingleChoice } from "@brickslab./ui-web";

const [value, setValue] = useState<string | undefined>();

<SingleChoice
  value={value}
  onChange={setValue}
  options={[
    { id: "a", label: "Option A", description: "Description" },
    { id: "b", label: "Option B" },
  ]}
  variant="radio"
  allowOther
/>`} />
    </main>
  );
}
