"use client";

import { AnimatedList } from "@brickslab./ui-web";
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
    name: "items",
    type: "React.ReactNode[]",
    required: true,
    description: "Array of items to display and animate.",
  },
  {
    name: "delay",
    type: "number",
    default: "0",
    description: "Initial delay before animation starts (ms).",
  },
  {
    name: "stagger",
    type: "number",
    default: "150",
    description: "Delay between each item animation (ms).",
  },
  {
    name: "duration",
    type: "number",
    default: "600",
    description: "Duration of each item animation (ms).",
  },
  {
    name: "direction",
    type: '"up" | "down"',
    default: '"up"',
    description: 'Animation direction: "up" (slide from bottom), "down" (slide from top).',
  },
  {
    name: "maxVisible",
    type: "number",
    description: "Limit number of visible items.",
  },
  {
    name: "className",
    type: "string",
    description: "Container CSS class.",
  },
  {
    name: "itemClassName",
    type: "string",
    description: "CSS class for each item.",
  },
];

const usageCode = `import { AnimatedList } from "@brickslab./ui-web";

const items = [
  <div>Item 1</div>,
  <div>Item 2</div>,
  <div>Item 3</div>,
];

// Default (slide up, staggered)
<AnimatedList items={items} />

// Custom stagger
<AnimatedList items={items} stagger={300} duration={800} />

// Slide down
<AnimatedList items={items} direction="down" />

// Max visible items
<AnimatedList items={items} maxVisible={3} />`;

export default function AnimatedListPage() {
  return (
    <div>
      <ComponentHeader
        name="AnimatedList"
        description="Displays an array of items with staggered sequential animations. Each item slides in with customizable timing, direction, and easing. Perfect for lists, notifications, and entry effects."
      />

      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>Default (Slide Up, 150ms stagger)</SubLabel>
      <Preview>
        <AnimatedList
          items={[
            <div
              style={{
                padding: "var(--space-3)",
                backgroundColor: "var(--c-surface)",
                borderRadius: "var(--radius-sm)",
                borderLeft: "3px solid var(--color-brand)",
                fontSize: "var(--fontsize-sm)",
              }}
            >
              ✓ Item 1 - Animated in
            </div>,
            <div
              style={{
                padding: "var(--space-3)",
                backgroundColor: "var(--c-surface)",
                borderRadius: "var(--radius-sm)",
                borderLeft: "3px solid var(--color-brand)",
                fontSize: "var(--fontsize-sm)",
              }}
            >
              ✓ Item 2 - Smooth transition
            </div>,
            <div
              style={{
                padding: "var(--space-3)",
                backgroundColor: "var(--c-surface)",
                borderRadius: "var(--radius-sm)",
                borderLeft: "3px solid var(--color-brand)",
                fontSize: "var(--fontsize-sm)",
              }}
            >
              ✓ Item 3 - Sequential timing
            </div>,
          ]}
          stagger={150}
          duration={600}
        />
      </Preview>

      <SubLabel>Slide Down with Longer Stagger</SubLabel>
      <Preview>
        <AnimatedList
          items={[
            <div
              style={{
                padding: "var(--space-3)",
                backgroundColor: "var(--c-surface-elevated)",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--fontsize-sm)",
              }}
            >
              → Sliding down from top
            </div>,
            <div
              style={{
                padding: "var(--space-3)",
                backgroundColor: "var(--c-surface-elevated)",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--fontsize-sm)",
              }}
            >
              → With 300ms stagger delay
            </div>,
            <div
              style={{
                padding: "var(--space-3)",
                backgroundColor: "var(--c-surface-elevated)",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--fontsize-sm)",
              }}
            >
              → Slower sequential effect
            </div>,
          ]}
          direction="down"
          stagger={300}
          duration={500}
        />
      </Preview>

      <SubLabel>Max Visible Items (3 of 5)</SubLabel>
      <Preview>
        <AnimatedList
          items={[
            <div style={{ padding: "var(--space-3)", fontSize: "var(--fontsize-sm)" }}>Shown 1/5</div>,
            <div style={{ padding: "var(--space-3)", fontSize: "var(--fontsize-sm)" }}>Shown 2/5</div>,
            <div style={{ padding: "var(--space-3)", fontSize: "var(--fontsize-sm)" }}>Shown 3/5</div>,
            <div style={{ padding: "var(--space-3)", fontSize: "var(--fontsize-sm)" }}>Hidden 4/5</div>,
            <div style={{ padding: "var(--space-3)", fontSize: "var(--fontsize-sm)" }}>Hidden 5/5</div>,
          ]}
          maxVisible={3}
          stagger={100}
        />
      </Preview>

      <SectionTitle>Props Table</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />
    </div>
  );
}
