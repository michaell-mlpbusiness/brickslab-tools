"use client";

import React from "react";
import { RetroGrid } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

export default function RetroGridPage() {
  const props: PropDef[] = [
    {
      name: "perspective",
      type: "number",
      description: "3D perspective distance",
      default: "1200",
    },
    {
      name: "lineThickness",
      type: "number",
      description: "Width of grid lines",
      default: "1",
    },
    {
      name: "glow",
      type: "boolean",
      description: "Apply glowing effect to lines",
      default: "false",
    },
    {
      name: "speed",
      type: "number",
      description: "Animation speed in seconds",
      default: "8",
    },
  ];

  const code = `import { RetroGrid } from "@brickslab./ui-web";

export function MyComponent() {
  return (
    <div className="relative w-full h-screen bg-black">
      <RetroGrid perspective={1200} lineThickness={1} glow speed={8} />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Synthwave Grid</h1>
      </div>
    </div>
  );
}`;

  return (
    <div>
      <ComponentHeader
        name="RetroGrid"
        description="Perspective 3D synthwave-style grid with perspective zoom animation and optional glow"
      />

      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'black' }}>
          <RetroGrid perspective={1200} lineThickness={1} glow speed={8} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Synthwave</span>
          </div>
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={code} language="tsx" />

      <SectionTitle>Variations</SectionTitle>

      <SubLabel>No Glow Effect</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'black' }}>
          <RetroGrid perspective={1200} lineThickness={1} glow={false} speed={8} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Clean Retro</span>
          </div>
        </div>
      </Preview>

      <SubLabel>Close Perspective</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'black' }}>
          <RetroGrid perspective={600} lineThickness={1.5} glow speed={6} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Close View</span>
          </div>
        </div>
      </Preview>
    </div>
  );
}
