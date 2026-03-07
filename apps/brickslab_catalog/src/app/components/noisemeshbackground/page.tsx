"use client";

import React from "react";
import { NoiseMeshBackground } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

export default function NoiseMeshBackgroundPage() {
  const props: PropDef[] = [
    {
      name: "colors",
      type: "string[]",
      description: "Array of colors for the gradient mesh",
      default: '["#FF6B6B", "#4ECDC4", "#45B7D1"]',
    },
    {
      name: "noise",
      type: "number",
      description: "Intensity of noise texture (0-1)",
      default: "0.4",
    },
    {
      name: "grainSize",
      type: "number",
      description: "Size of grain particles",
      default: "2",
    },
    {
      name: "animate",
      type: "boolean",
      description: "Enable animation",
      default: "true",
    },
    {
      name: "speed",
      type: "number",
      description: "Animation speed in seconds",
      default: "6",
    },
  ];

  const code = `import { NoiseMeshBackground } from "@brickslab./ui-web";

export function MyComponent() {
  return (
    <div className="relative w-full h-screen">
      <NoiseMeshBackground
        colors={["#FF6B6B", "#4ECDC4", "#45B7D1"]}
        noise={0.4}
        grainSize={2}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Noise Mesh</h1>
      </div>
    </div>
  );
}`;

  return (
    <div>
      <ComponentHeader
        name="NoiseMeshBackground"
        description="Gradient mesh with subtle noise and grain texture effect using canvas"
      />

      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden' }}>
          <NoiseMeshBackground
            colors={["#FF6B6B", "#4ECDC4", "#45B7D1"]}
            noise={0.4}
            grainSize={2}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Noise Mesh</span>
          </div>
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={code} language="tsx" />

      <SectionTitle>Variations</SectionTitle>

      <SubLabel>Warm Colors High Noise</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden' }}>
          <NoiseMeshBackground
            colors={["#FF6B6B", "#FFA500", "#FFD700"]}
            noise={0.7}
            grainSize={3}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Warm</span>
          </div>
        </div>
      </Preview>

      <SubLabel>Cool Colors Low Noise</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden' }}>
          <NoiseMeshBackground
            colors={["#1e3c72", "#2a5298", "#7aa8d1"]}
            noise={0.2}
            grainSize={1}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Cool</span>
          </div>
        </div>
      </Preview>
    </div>
  );
}
