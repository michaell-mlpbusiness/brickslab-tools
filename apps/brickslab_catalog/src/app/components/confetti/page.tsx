"use client";

import { Confetti } from "@brickslab./ui-web";
import { useState } from "react";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  PropTag,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  {
    name: "particleCount",
    type: "number",
    default: "50",
    description: "Number of particles to generate.",
  },
  {
    name: "angle",
    type: "number",
    default: "90",
    description: "Launch angle in degrees.",
  },
  {
    name: "spread",
    type: "number",
    default: "45",
    description: "Spread range in degrees.",
  },
  {
    name: "startVelocity",
    type: "number",
    default: "45",
    description: "Initial particle velocity.",
  },
  {
    name: "decay",
    type: "number",
    default: "0.9",
    description: "Velocity decay factor per frame.",
  },
  {
    name: "gravity",
    type: "number",
    default: "1",
    description: "Gravitational pull per frame.",
  },
  {
    name: "colors",
    type: "string[]",
    default: '["#CC4A48", "#4ADE80", "#FBFBFB"]',
    description: "Array of particle colors.",
  },
  {
    name: "ticks",
    type: "number",
    default: "200",
    description: "Total animation duration in ticks.",
  },
];

const usageCode = `import { Confetti } from "@brickslab./ui-web";
import { useState } from "react";

export function MyComponent() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      {isActive && <Confetti particleCount={100} angle={90} spread={60} />}
      <button onClick={() => setIsActive(true)}>
        Trigger Confetti
      </button>
    </>
  );
}`;

export default function ConfettiPage() {
  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <div>
      <ComponentHeader
        name="Confetti"
        description="Canvas-based confetti animation effect with customizable particles, colors, physics, and shapes. Perfect for celebrations, milestones, and success states."
      />

      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>Default Confetti (Center burst)</SubLabel>
      <Preview>
        <div style={{ position: "relative", height: "300px", overflow: "hidden" }}>
          {showConfetti && (
            <Confetti
              particleCount={80}
              angle={90}
              spread={60}
              colors={["#CC4A48", "#4ADE80", "#FBFBFB"]}
            />
          )}
          <button
            onClick={() => {
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 2500);
            }}
            style={{
              padding: "var(--space-3) var(--space-5)",
              fontSize: "var(--fontsize-sm)",
              fontWeight: "var(--fontweight-semibold)",
              backgroundColor: "var(--color-brand)",
              color: "#FBFBFB",
              border: "none",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
            }}
          >
            🎉 Trigger Confetti
          </button>
        </div>
      </Preview>

      <SectionTitle>Props Table</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />
    </div>
  );
}
