"use client";

import React from "react";
import { WarpBackground, type WarpBackgroundProps } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

export default function WarpBackgroundPage() {
  const props: PropDef[] = [
    {
      name: "intensity",
      type: "number",
      description: "Controls the amount of distortion applied (0-100)",
      default: "30",
    },
    {
      name: "speed",
      type: "number",
      description: "Animation speed in seconds",
      default: "8",
    },
    {
      name: "mask",
      type: '"none" | "radial"',
      description: "Apply radial gradient mask to edge",
      default: '"none"',
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Content to overlay on the background",
      default: "undefined",
    },
  ];

  const code = `import { WarpBackground } from "@brickslab./ui-web";

export function MyComponent() {
  return (
    <WarpBackground intensity={30} speed={8} mask="radial">
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-white">Warp Effect</h1>
      </div>
    </WarpBackground>
  );
}`;

  return (
    <div>
      <ComponentHeader
        name="WarpBackground"
        description="Animated skew and scale distortion effect with optional radial gradient mask"
      />

      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'black' }}>
          <WarpBackground intensity={30} speed={8} mask="radial">
            <div className="flex items-center justify-center h-full">
              <span className="text-white text-2xl font-bold">Warp Effect</span>
            </div>
          </WarpBackground>
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={code} language="tsx" />

      <SectionTitle>Variations</SectionTitle>

      <SubLabel>With Radial Mask</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'black' }}>
          <WarpBackground intensity={50} speed={6} mask="radial">
            <div className="flex items-center justify-center h-full">
              <span className="text-white text-2xl font-bold">Masked Warp</span>
            </div>
          </WarpBackground>
        </div>
      </Preview>

      <SubLabel>No Mask with High Intensity</SubLabel>
      <Preview>
        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'black' }}>
          <WarpBackground intensity={80} speed={4} mask="none">
            <div className="flex items-center justify-center h-full">
              <span className="text-white text-2xl font-bold">
                High Intensity
              </span>
            </div>
          </WarpBackground>
        </div>
      </Preview>
    </div>
  );
}
