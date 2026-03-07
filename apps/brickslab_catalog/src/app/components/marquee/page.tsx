"use client";

import { Marquee } from "@brickslab./ui-web";
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
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "Content to scroll infinitely.",
  },
  {
    name: "reverse",
    type: "boolean",
    default: "false",
    description: "Reverse scroll direction.",
  },
  {
    name: "pauseOnHover",
    type: "boolean",
    default: "false",
    description: "Pause animation on hover.",
  },
  {
    name: "vertical",
    type: "boolean",
    default: "false",
    description: "Scroll vertically instead of horizontally.",
  },
  {
    name: "repeat",
    type: "number",
    default: "3",
    description: "Number of times to repeat content.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS class for custom styling.",
  },
];

const usageCode = `import { Marquee } from "@brickslab./ui-web";

// Basic horizontal scroll
<Marquee>
  <div style={{ padding: "0 20px" }}>Sliding text content...</div>
</Marquee>

// Pause on hover
<Marquee pauseOnHover>
  <span style={{ marginRight: "40px" }}>⭐ Feature 1</span>
</Marquee>

// Reverse direction
<Marquee reverse>
  <span>Reversed content →</span>
</Marquee>

// Vertical scroll
<Marquee vertical style={{ height: "200px" }}>
  <div style={{ padding: "20px 0" }}>Vertical item 1</div>
</Marquee>`;

export default function MarqueePage() {
  return (
    <div>
      <ComponentHeader
        name="Marquee"
        description="Infinite scroll component for horizontal or vertical marquee effects. Automatically repeats content with smooth CSS animation. Perfect for displaying logos, testimonials, or scrolling text."
      />

      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>Basic Horizontal Marquee</SubLabel>
      <Preview>
        <div style={{ width: "100%", overflow: "hidden", borderRadius: "var(--radius-md)", border: "1px solid var(--c-border)" }}>
          <Marquee repeat={2}>
            <div
              style={{
                padding: "var(--space-4) var(--space-6)",
                fontSize: "var(--fontsize-sm)",
                fontWeight: "var(--fontweight-semibold)",
                whiteSpace: "nowrap",
                color: "var(--color-brand)",
              }}
            >
              ⭐ Smooth scrolling animation • Never stops • Great for logos • Perfect for testimonials •
            </div>
          </Marquee>
        </div>
      </Preview>

      <SubLabel>With Pause on Hover</SubLabel>
      <Preview>
        <div style={{ width: "100%", overflow: "hidden", borderRadius: "var(--radius-md)", border: "1px solid var(--c-border)" }}>
          <Marquee pauseOnHover repeat={2}>
            <div
              style={{
                padding: "var(--space-4) var(--space-6)",
                fontSize: "var(--fontsize-sm)",
                whiteSpace: "nowrap",
              }}
            >
              Hover to pause • Perfect for interactive demos • Resume on mouse leave •
            </div>
          </Marquee>
        </div>
      </Preview>

      <SubLabel>Reverse Direction</SubLabel>
      <Preview>
        <div style={{ width: "100%", overflow: "hidden", borderRadius: "var(--radius-md)", border: "1px solid var(--c-border)" }}>
          <Marquee reverse repeat={2}>
            <div
              style={{
                padding: "var(--space-4) var(--space-6)",
                fontSize: "var(--fontsize-sm)",
                whiteSpace: "nowrap",
                color: "var(--color-muted)",
              }}
            >
              ← Scrolling right to left • Reverse animation • Alternative direction •
            </div>
          </Marquee>
        </div>
      </Preview>

      <SubLabel>Vertical Marquee</SubLabel>
      <Preview>
        <div
          style={{
            width: "100%",
            height: "200px",
            overflow: "hidden",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--c-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Marquee vertical repeat={3}>
            <div
              style={{
                padding: "var(--space-6) var(--space-4)",
                textAlign: "center",
                fontSize: "var(--fontsize-sm)",
              }}
            >
              📱 Vertical • Scrolling ↓ • News Feed
            </div>
          </Marquee>
        </div>
      </Preview>

      <SectionTitle>Props Table</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />
    </div>
  );
}
