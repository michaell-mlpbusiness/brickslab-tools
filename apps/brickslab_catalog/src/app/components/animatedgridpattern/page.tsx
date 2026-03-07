"use client";

import React from "react";
import { AnimatedGridPattern } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

export default function AnimatedGridPatternPage() {
  const props: PropDef[] = [
    {
      name: "size",
      type: "number",
      description: "Grid cell size in pixels",
      default: "40",
    },
    {
      name: "strokeWidth",
      type: "number",
      description: "Width of grid lines",
      default: "1",
    },
    {
      name: "speed",
      type: "number",
      description: "Animation speed in seconds",
      default: "8",
    },
    {
      name: "color",
      type: "string",
      description: "Color of the grid lines",
      default: '"rgba(255, 255, 255, 0.1)"',
    },
  ];

  const code = `import { AnimatedGridPattern } from "@brickslab./ui-web";

export function MyComponent() {
  return (
    <div className="relative w-full h-screen bg-black">
      <AnimatedGridPattern size={40} strokeWidth={1} speed={8} />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Flow Grid</h1>
      </div>
    </div>
  );
}`;

  return (
    <div>
      <ComponentHeader
        name="AnimatedGridPattern"
        description="Grid lines moving downward creating a continuous flow effect"
      />

      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'black' }}>
          <AnimatedGridPattern size={40} strokeWidth={1} speed={8} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Flow Grid</span>
          </div>
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={code} language="tsx" />

      <SectionTitle>Variations</SectionTitle>

      <SubLabel>Fine Grid with Fast Movement</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'black' }}>
          <AnimatedGridPattern size={20} strokeWidth={0.5} speed={3} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Fast Flow</span>
          </div>
        </div>
      </Preview>

      <SubLabel>Thick Lines Slow Movement</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#111827' }}>
          <AnimatedGridPattern size={60} strokeWidth={2} speed={12} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Slow Flow</span>
          </div>
        </div>
      </Preview>
    </div>
  );
}
