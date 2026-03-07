"use client";

import React from "react";
import { LightRaysBackground } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

export default function LightRaysBackgroundPage() {
  const props: PropDef[] = [
    {
      name: "rayCount",
      type: "number",
      description: "Number of light rays to render",
      default: "5",
    },
    {
      name: "speed",
      type: "number",
      description: "Animation speed in seconds",
      default: "6",
    },
    {
      name: "blur",
      type: "number",
      description: "Blur amount of the rays",
      default: "30",
    },
    {
      name: "opacity",
      type: "number",
      description: "Opacity of the rays (0-1)",
      default: "0.6",
    },
    {
      name: "color",
      type: "string",
      description: "Base color of the rays",
      default: '"rgba(255, 255, 255, 0.8)"',
    },
  ];

  const code = `import { LightRaysBackground } from "@brickslab./ui-web";

export function MyComponent() {
  return (
    <div className="relative w-full h-screen bg-black">
      <LightRaysBackground 
        rayCount={5} 
        speed={6} 
        blur={30} 
        opacity={0.6} 
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">God Rays</h1>
      </div>
    </div>
  );
}`;

  return (
    <div>
      <ComponentHeader
        name="LightRaysBackground"
        description="God rays light beams flowing downward with configurable ray count speed and opacity"
      />

      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'black' }}>
          <LightRaysBackground rayCount={5} speed={6} blur={30} opacity={0.6} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">God Rays</span>
          </div>
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={code} language="tsx" />

      <SectionTitle>Variations</SectionTitle>

      <SubLabel>Many Thin Rays</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#0f172a' }}>
          <LightRaysBackground rayCount={8} speed={8} blur={20} opacity={0.4} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Thin Rays</span>
          </div>
        </div>
      </Preview>

      <SubLabel>Few Wide Rays</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundImage: 'linear-gradient(to bottom, #111827, #000000)' }}>
          <LightRaysBackground rayCount={3} speed={5} blur={50} opacity={0.8} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Wide Rays</span>
          </div>
        </div>
      </Preview>
    </div>
  );
}
