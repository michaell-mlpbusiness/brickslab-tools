"use client";

import React from "react";
import { GlassAuroraBackground } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

export default function GlassAuroraBackgroundPage() {
  const props: PropDef[] = [
    {
      name: "colors",
      type: "string[]",
      description: "Array of colors for the aurora gradient",
      default: '["#FF00FF", "#00FFFF", "#00FF00"]',
    },
    {
      name: "blur",
      type: "number",
      description: "Glassmorphism blur amount (px)",
      default: "10",
    },
    {
      name: "intensity",
      type: "number",
      description: "Intensity of the aurora animation (0-1)",
      default: "0.8",
    },
    {
      name: "border",
      type: "boolean",
      description: "Show glassmorphic border",
      default: "true",
    },
  ];

  const code = `import { GlassAuroraBackground } from "@brickslab./ui-web";

export function MyComponent() {
  return (
    <div className="relative w-full h-screen bg-black">
      <GlassAuroraBackground
        colors={["#FF00FF", "#00FFFF", "#00FF00"]}
        blur={10}
        intensity={0.8}
        border
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Glass Aurora</h1>
      </div>
    </div>
  );
}`;

  return (
    <div>
      <ComponentHeader
        name="GlassAuroraBackground"
        description="Glassmorphism with animated aurora gradient effect and backdrop blur"
      />

      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'black' }}>
          <GlassAuroraBackground
            colors={["#FF00FF", "#00FFFF", "#00FF00"]}
            blur={10}
            intensity={0.8}
            border
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Glass Aurora</span>
          </div>
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={code} language="tsx" />

      <SectionTitle>Variations</SectionTitle>

      <SubLabel>Soft Glow Without Border</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#111827' }}>
          <GlassAuroraBackground
            colors={["#FF69B4", "#FFB6C1", "#FFC0CB"]}
            blur={20}
            intensity={0.5}
            border={false}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Soft Aurora</span>
          </div>
        </div>
      </Preview>

      <SubLabel>Intense Electric Colors</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'black' }}>
          <GlassAuroraBackground
            colors={["#00FF00", "#FF0080", "#0080FF"]}
            blur={15}
            intensity={1}
            border
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Electric</span>
          </div>
        </div>
      </Preview>
    </div>
  );
}
