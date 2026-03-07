"use client";

import React from "react";
import { StripedPattern } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

export default function StripedPatternPage() {
  const props: PropDef[] = [
    {
      name: "angle",
      type: "number",
      description: "Angle of stripes in degrees",
      default: "45",
    },
    {
      name: "stripeWidth",
      type: "number",
      description: "Width of each stripe in pixels",
      default: "10",
    },
    {
      name: "animate",
      type: "boolean",
      description: "Enable scroll animation",
      default: "false",
    },
    {
      name: "speed",
      type: "number",
      description: "Animation speed in seconds",
      default: "8",
    },
    {
      name: "gap",
      type: "number",
      description: "Gap between stripes",
      default: "10",
    },
  ];

  const code = `import { StripedPattern } from "@brickslab./ui-web";

export function MyComponent() {
  return (
    <div className="relative w-full h-screen bg-white">
      <StripedPattern angle={45} stripeWidth={10} animate speed={8} />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold">Stripes</h1>
      </div>
    </div>
  );
}`;

  return (
    <div>
      <ComponentHeader
        name="StripedPattern"
        description="Diagonal stripes with optional scroll animation and customizable angle and width"
      />

      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'white' }}>
          <StripedPattern angle={45} stripeWidth={10} animate speed={8} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-900 text-2xl font-bold">Animated Stripes</span>
          </div>
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={code} language="tsx" />

      <SectionTitle>Variations</SectionTitle>

      <SubLabel>Static Stripes</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f9fafb' }}>
          <StripedPattern angle={45} stripeWidth={15} animate={false} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-900 text-2xl font-bold">Static</span>
          </div>
        </div>
      </Preview>

      <SubLabel>Vertical Stripes</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#111827' }}>
          <StripedPattern angle={0} stripeWidth={20} animate speed={6} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Vertical</span>
          </div>
        </div>
      </Preview>
    </div>
  );
}
