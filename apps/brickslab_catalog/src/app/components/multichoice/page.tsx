"use client";
import React, { useState } from "react";
import { MultiChoice } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "value", type: "string[]", required: true, description: "Array of selected option ids." },
  { name: "onChange", type: "(v: string[]) => void", required: true, description: "Called with updated selection array." },
  { name: "options", type: "MultiChoiceOption[]", required: true, description: "Array of { id, label, disabled? }." },
  { name: "variant", type: '"checkbox" | "tag"', required: false, default: '"checkbox"', description: "Checkbox rows or tag pill layout." },
  { name: "maxSelected", type: "number", required: false, description: "Maximum number of selectable options." },
  { name: "minSelected", type: "number", required: false, description: "Minimum required selections (for validation)." },
  { name: "disabled", type: "boolean", required: false, default: "false", description: "Disables all interactions." },
];

const options = [
  { id: "ux", label: "UX Design" },
  { id: "perf", label: "Performance" },
  { id: "a11y", label: "Accessibility" },
  { id: "dx", label: "Developer experience" },
  { id: "docs", label: "Documentation" },
];

export default function MultiChoicePage() {
  const [checkbox, setCheckbox] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [limited, setLimited] = useState<string[]>([]);

  return (
    <main>
      <ComponentHeader name="MultiChoice" description="Multi-select question with checkbox or tag variant and configurable min/max selection." section="Quiz" />

      <SectionTitle>Checkbox variant</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 480 }}>
          <MultiChoice value={checkbox} onChange={setCheckbox} options={options} />
        </div>
      </Preview>

      <SectionTitle>Tag variant</SectionTitle>
      <Preview>
        <MultiChoice value={tags} onChange={setTags} options={options} variant="tag" />
      </Preview>

      <SectionTitle>Max 2 selections</SectionTitle>
      <Preview>
        <MultiChoice value={limited} onChange={setLimited} options={options} variant="tag" maxSelected={2} />
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { MultiChoice } from "@brickslab./ui-web";

const [value, setValue] = useState<string[]>([]);

<MultiChoice
  value={value}
  onChange={setValue}
  options={[
    { id: "a", label: "Option A" },
    { id: "b", label: "Option B" },
  ]}
  variant="tag"
  maxSelected={3}
/>`} />
    </main>
  );
}
