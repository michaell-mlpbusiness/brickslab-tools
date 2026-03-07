"use client";

import React from "react";
import { GridPattern } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

export default function GridPatternPage() {
  const props: PropDef[] = [
    {
      name: "contrastMode",
      type: '"\"custom\" | \"black-on-white\" | \"white-on-black\""',
      description: "Preset de contraste simple (noir/blanc inversable)",
      default: '"custom"',
    },
    {
      name: "lineStyle",
      type: '"\"solid\" | \"dashed\""',
      description: "Style de trait recommandé (plein ou pointillé)",
      default: '"solid"',
    },
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
      name: "dashed",
      type: "boolean",
      description: "Use dashed lines instead of solid",
      default: "false",
    },
    {
      name: "color",
      type: "string",
      description: "Color of the grid lines",
      default: '"rgba(0, 0, 0, 0.1)"',
    },
    {
      name: "mask",
      type: '"none" | "radial"',
      description: "Apply radial gradient mask",
      default: '"none"',
    },
  ];

  const code = `import { GridPattern } from "@brickslab./ui-web";

export function MyComponent() {
  return (
    <div className="relative w-full h-screen bg-white">
      <GridPattern
        contrastMode="black-on-white"
        lineStyle="solid"
        size={40}
        strokeWidth={1}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold">Grid Pattern</h1>
      </div>
    </div>
  );
}`;

  return (
    <div>
      <ComponentHeader
        name="GridPattern"
        description="Static SVG grid lines with solid or dashed variants and optional radial mask"
      />

      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'white' }}>
          <GridPattern contrastMode="black-on-white" lineStyle="solid" size={40} strokeWidth={1} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-900 text-2xl font-bold">Grid</span>
          </div>
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={code} language="tsx" />

      <SectionTitle>Variations</SectionTitle>

      <SubLabel>Noir sur Blanc (Pointillés)</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f9fafb' }}>
          <GridPattern contrastMode="black-on-white" lineStyle="dashed" size={40} strokeWidth={1} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-900 text-2xl font-bold">Black / White dashed</span>
          </div>
        </div>
      </Preview>

      <SubLabel>Blanc sur Noir (Trait Plein)</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#111827' }}>
          <GridPattern contrastMode="white-on-black" lineStyle="solid" size={46} strokeWidth={1.25} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">White / Black solid</span>
          </div>
        </div>
      </Preview>

      <SubLabel>Blanc sur Noir (Pointillés)</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#111827' }}>
          <GridPattern contrastMode="white-on-black" lineStyle="dashed" size={46} strokeWidth={1.25} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">White / Black dashed</span>
          </div>
        </div>
      </Preview>
    </div>
  );
}
