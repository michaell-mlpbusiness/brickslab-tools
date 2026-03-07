"use client";
import React, { useState } from "react";
import { FreeTextQuestion } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "value", type: "string", required: false, description: "Current text value." },
  { name: "onChange", type: "(v: string) => void", required: true, description: "Called on every keystroke." },
  { name: "multiline", type: "boolean", required: false, default: "false", description: "Renders a resizable textarea instead of an input." },
  { name: "minLength", type: "number", required: false, description: "Shows a min length hint below the input." },
  { name: "maxLength", type: "number", required: false, description: "Native maxLength attribute + counter if showCount is true." },
  { name: "placeholder", type: "string", required: false, description: "Placeholder text." },
  { name: "showCount", type: "boolean", required: false, default: "false", description: "Shows character counter below the input." },
  { name: "disabled", type: "boolean", required: false, default: "false", description: "Disables the input." },
];

export default function FreeTextQuestionPage() {
  const [short, setShort] = useState("");
  const [long, setLong] = useState("");
  const [counted, setCounted] = useState("");

  return (
    <main>
      <ComponentHeader name="FreeTextQuestion" description="Single-line or multiline text input with character counter and min/max length validation." section="Quiz" />

      <SectionTitle>Single line</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 480 }}>
          <FreeTextQuestion value={short} onChange={setShort} placeholder="Your answer…" />
        </div>
      </Preview>

      <SectionTitle>Multiline with counter</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 480 }}>
          <FreeTextQuestion value={long} onChange={setLong} multiline placeholder="Describe your experience…" maxLength={300} showCount />
        </div>
      </Preview>

      <SectionTitle>With min length hint</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 480 }}>
          <FreeTextQuestion value={counted} onChange={setCounted} multiline placeholder="Write at least 50 characters…" minLength={50} showCount />
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { FreeTextQuestion } from "@brickslab./ui-web";

const [value, setValue] = useState("");

<FreeTextQuestion
  value={value}
  onChange={setValue}
  multiline
  placeholder="Describe your experience…"
  maxLength={500}
  showCount
/>`} />
    </main>
  );
}
