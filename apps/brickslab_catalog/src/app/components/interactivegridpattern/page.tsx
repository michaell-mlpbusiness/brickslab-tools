"use client";

import React from "react";
import { InteractiveGridPattern } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

export default function InteractiveGridPatternPage() {
  const props: PropDef[] = [
    {
      name: "cellSize",
      type: "number",
      description: "Size of each grid cell in pixels",
      default: "20",
    },
    {
      name: "radius",
      type: "number",
      description: "Influence radius of mouse position",
      default: "100",
    },
    {
      name: "intensity",
      type: "number",
      description: "Strength of the heat effect (0-1)",
      default: "0.8",
    },
  ];

  const code = `import { InteractiveGridPattern } from "@brickslab./ui-web";

export function MyComponent() {
  return (
    <div className="relative w-full h-screen">
      <InteractiveGridPattern cellSize={20} radius={100} intensity={0.8} />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Interactive Mouseover</h1>
      </div>
    </div>
  );
}`;

  return (
    <div>
      <ComponentHeader
        name="InteractiveGridPattern"
        description="Canvas-based mouse-responsive grid heat effect with customizable cell size and influence radius"
      />

      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'black' }}>
          <InteractiveGridPattern cellSize={20} radius={100} intensity={0.8} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-white text-2xl font-bold">Move your mouse</span>
          </div>
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={code} language="tsx" />

      <SectionTitle>Variations</SectionTitle>

      <SubLabel>Large Cells Low Intensity</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'black' }}>
          <InteractiveGridPattern cellSize={40} radius={150} intensity={0.4} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-white text-2xl font-bold">Large Cells</span>
          </div>
        </div>
      </Preview>

      <SubLabel>Fine Grid High Intensity</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#111827' }}>
          <InteractiveGridPattern cellSize={10} radius={80} intensity={1} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-white text-2xl font-bold">Fine & Intense</span>
          </div>
        </div>
      </Preview>
    </div>
  );
}
