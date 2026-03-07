"use client";
import React, { useState } from "react";
import { RankOrderQuestion } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "value", type: "string[]", required: true, description: "Ordered array of option ids." },
  { name: "onChange", type: "(v: string[]) => void", required: true, description: "Called with the reordered ids array." },
  { name: "options", type: "RankOption[]", required: true, description: "Array of { id, label } options." },
  { name: "maxRank", type: "number", required: false, description: "Limits the number of items shown (top N)." },
  { name: "disabled", type: "boolean", required: false, default: "false", description: "Disables drag and arrow buttons." },
];

const options = [
  { id: "price", label: "Price" },
  { id: "quality", label: "Quality" },
  { id: "speed", label: "Delivery speed" },
  { id: "support", label: "Customer support" },
  { id: "brand", label: "Brand reputation" },
];

export default function RankOrderQuestionPage() {
  const [order, setOrder] = useState<string[]>(options.map((o) => o.id));
  const [top3, setTop3] = useState<string[]>(options.map((o) => o.id));

  return (
    <main>
      <ComponentHeader name="RankOrderQuestion" description="Drag-and-drop rank ordering list with arrow fallback and position badges." section="Quiz" />

      <SectionTitle>Full list</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 480 }}>
          <RankOrderQuestion value={order} onChange={setOrder} options={options} />
        </div>
      </Preview>

      <SectionTitle>Top 3 only</SectionTitle>
      <Preview>
        <div style={{ maxWidth: 480 }}>
          <RankOrderQuestion value={top3} onChange={setTop3} options={options} maxRank={3} />
        </div>
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { RankOrderQuestion } from "@brickslab./ui-web";

const [order, setOrder] = useState(["a", "b", "c"]);

<RankOrderQuestion
  value={order}
  onChange={setOrder}
  options={[
    { id: "a", label: "Feature A" },
    { id: "b", label: "Feature B" },
    { id: "c", label: "Feature C" },
  ]}
/>`} />
    </main>
  );
}
