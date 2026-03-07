"use client";

import React from "react";
import { DotPattern } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

export default function DotPatternPage() {
  const props: PropDef[] = [
    {
      name: "dotWeight",
      type: '"\"very-thin\" | \"thin\" | \"medium\""',
      description: "Preset simple pour l'épaisseur des points",
      default: '"medium"',
    },
    {
      name: "dotSize",
      type: "number",
      description: "Taille custom des points (prioritaire sur dotWeight)",
      default: "undefined",
    },
    {
      name: "gap",
      type: "number",
      description: "Space between dots in pixels",
      default: "20",
    },
    {
      name: "offset",
      type: "number",
      description: "Initial offset of the dot pattern",
      default: "0",
    },
    {
      name: "opacity",
      type: "number",
      description: "Opacity of the dots (0-1)",
      default: "0.5",
    },
    {
      name: "color",
      type: "string",
      description: "Color of the dots",
      default: '"rgba(255, 255, 255, 0.5)"',
    },
  ];

  const code = `import { DotPattern } from "@brickslab./ui-web";

export function MyComponent() {
  return (
    <div className="relative w-full h-screen bg-white">
      <DotPattern dotWeight="thin" gap={20} opacity={0.3} />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold">Dot Pattern</h1>
      </div>
    </div>
  );
}`;

  return (
    <div>
      <ComponentHeader
        name="DotPattern"
        description="Static SVG dot matrix pattern with configurable dot size gap and opacity"
      />

      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'white' }}>
          <DotPattern dotWeight="thin" gap={20} opacity={0.3} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-900 text-2xl font-bold">Dots</span>
          </div>
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={code} language="tsx" />

      <SectionTitle>Variations</SectionTitle>

      <SubLabel>Points Très Fins</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#111827' }}>
          <DotPattern dotWeight="very-thin" gap={12} opacity={0.35} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Très fin</span>
          </div>
        </div>
      </Preview>

      <SubLabel>Points Fins</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
          <DotPattern dotWeight="thin" gap={18} opacity={0.25} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-900 text-2xl font-bold">Fin</span>
          </div>
        </div>
      </Preview>

      <SubLabel>Points Moyens</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
          <DotPattern dotWeight="medium" gap={24} opacity={0.25} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-900 text-2xl font-bold">Moyen</span>
          </div>
        </div>
      </Preview>
    </div>
  );
}
