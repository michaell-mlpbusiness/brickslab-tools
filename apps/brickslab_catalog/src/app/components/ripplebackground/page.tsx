"use client";

import React from "react";
import { RippleBackground } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

export default function RippleBackgroundPage() {
  const props: PropDef[] = [
    {
      name: "amplitude",
      type: "number",
      description: "Height of the ripple waves",
      default: "100",
    },
    {
      name: "frequency",
      type: "number",
      description: "Number of ripple rings",
      default: "5",
    },
    {
      name: "center",
      type: "{ x: number; y: number }",
      description: "Center position of ripples (0-100 for both x and y)",
      default: "{ x: 50, y: 50 }",
    },
    {
      name: "speed",
      type: "number",
      description: "Animation speed in seconds",
      default: "6",
    },
  ];

  const code = `import { RippleBackground } from "@brickslab./ui-web";

export function MyComponent() {
  return (
    <div className="relative w-full h-screen">
      <RippleBackground amplitude={100} frequency={5} centerX={50} centerY={50} />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Ripple Effect</h1>
      </div>
    </div>
  );
}`;

  return (
    <div>
      <ComponentHeader
        name="RippleBackground"
        description="Concentric ripple rings expanding from center with customizable frequency and amplitude"
      />

      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundImage: 'linear-gradient(to bottom right, #581c87, #000000)' }}>
          <RippleBackground amplitude={100} frequency={5} center={{ x: 50, y: 50 }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Ripple</span>
          </div>
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={code} language="tsx" />

      <SectionTitle>Variations</SectionTitle>

      <SubLabel>Offset Center</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundImage: 'linear-gradient(to bottom right, #1e3a8a, #000000)' }}>
          <RippleBackground amplitude={100} frequency={5} center={{ x: 75, y: 25 }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Off-Center</span>
          </div>
        </div>
      </Preview>

      <SubLabel>Dense Ripples</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundImage: 'linear-gradient(to bottom right, #312e81, #000000)' }}>
          <RippleBackground amplitude={50} frequency={12} center={{ x: 50, y: 50 }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Dense</span>
          </div>
        </div>
      </Preview>
    </div>
  );
}
