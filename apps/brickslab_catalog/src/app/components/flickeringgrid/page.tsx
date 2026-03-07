"use client";

import React from "react";
import { FlickeringGrid, type FlickeringGridProps } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

export default function FlickeringGridPage() {
  const props: PropDef[] = [
    {
      name: "cellSize",
      type: "number",
      description: "Size of each grid cell in pixels",
      default: "50",
    },
    {
      name: "color",
      type: "string",
      description: "Color of the grid cells",
      default: '"rgba(255, 255, 255, 0.1)"',
    },
    {
      name: "flickerRate",
      type: "number",
      description: "Speed of the flicker animation (lower = faster)",
      default: "0.5",
    },
    {
      name: "rounded",
      type: "boolean",
      description: "Apply border-radius to cells",
      default: "false",
    },
    {
      name: "opacity",
      type: "number",
      description: "Opacity of the grid (0-1)",
      default: "0.5",
    },
  ];

  const code = `import { FlickeringGrid } from "@brickslab./ui-web";

export function MyComponent() {
  return (
    <div className="relative w-full h-screen">
      <FlickeringGrid cellSize={50} color="rgba(255, 255, 255, 0.1)" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Flickering Grid</h1>
      </div>
    </div>
  );
}`;

  return (
    <div>
      <ComponentHeader
        name="FlickeringGrid"
        description="SVG grid cells with flicker animation and customizable cell size and color"
      />

      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'black' }}>
          <FlickeringGrid cellSize={50} color="rgba(255, 255, 255, 0.1)" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              Flickering Grid
            </span>
          </div>
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={code} language="tsx" />

      <SectionTitle>Variations</SectionTitle>

      <SubLabel>Small Cell Size</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'black' }}>
          <FlickeringGrid
            cellSize={25}
            color="rgba(255, 255, 255, 0.15)"
            rounded
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Fine Grid</span>
          </div>
        </div>
      </Preview>

      <SubLabel>Colored Flicker</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#111827' }}>
          <FlickeringGrid
            cellSize={60}
            color="rgba(100, 200, 255, 0.2)"
            flickerRate={0.3}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Blue Grid</span>
          </div>
        </div>
      </Preview>
    </div>
  );
}
