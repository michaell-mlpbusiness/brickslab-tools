"use client";
import React, { useState } from "react";
import { QuizTimer } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "durationSec", type: "number", required: true, description: "Total countdown duration in seconds." },
  { name: "mode", type: '"total" | "section"', required: false, default: '"total"', description: "Shows a «section» label when in per-section mode." },
  { name: "onExpire", type: '"submit" | "lock" | "warn"', required: false, default: '"warn"', description: "Behaviour hint when time runs out." },
  { name: "onExpireAction", type: "() => void", required: false, description: "Callback fired when the countdown reaches 0." },
  { name: "warnAtSec", type: "number", required: false, description: "Seconds remaining at which the warn state activates. Defaults to 20% of durationSec." },
];

export default function QuizTimerPage() {
  return (
    <main>
      <ComponentHeader name="QuizTimer" description="Countdown timer with warn and expire states and optional auto-submit callback." section="Quiz" />

      <SectionTitle>Normal (60s)</SectionTitle>
      <Preview>
        <QuizTimer key="t1" durationSec={60} />
      </Preview>

      <SectionTitle>Warn state (10s)</SectionTitle>
      <Preview>
        <QuizTimer key="t2" durationSec={10} warnAtSec={10} />
      </Preview>

      <SectionTitle>Section mode (30s)</SectionTitle>
      <Preview>
        <QuizTimer key="t3" durationSec={30} mode="section" />
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { QuizTimer } from "@brickslab./ui-web";

<QuizTimer
  durationSec={300}
  warnAtSec={60}
  onExpire="submit"
  onExpireAction={() => handleSubmit()}
/>`} />
    </main>
  );
}
