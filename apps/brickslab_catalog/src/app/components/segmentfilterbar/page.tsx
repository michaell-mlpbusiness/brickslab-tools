"use client";
import React, { useState } from "react";
import { SegmentFilterBar, type FilterState } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "value", type: "FilterState", required: true, description: "Current filter state — Record<fieldId, string | string[] | null>." },
  { name: "onChange", type: "(v: FilterState) => void", required: true, description: "Called on every field change." },
  { name: "fields", type: "FilterField[]", required: true, description: "Field definitions: { id, label, type, options? }." },
  { name: "presets", type: "FilterPreset[]", required: false, description: "Quick preset buttons that apply a fixed filter state." },
];

const fields = [
  { id: "dateFrom", label: "From", type: "date" as const },
  { id: "segment", label: "Segment", type: "select" as const, options: [{ id: "all", label: "All" }, { id: "new", label: "New users" }, { id: "returning", label: "Returning" }] },
  { id: "tags", label: "Tags", type: "tag" as const, options: [{ id: "mobile", label: "Mobile" }, { id: "desktop", label: "Desktop" }, { id: "tablet", label: "Tablet" }] },
];

const presets = [
  { id: "last7", label: "Last 7 days", value: { segment: null, tags: null } },
  { id: "mobile", label: "Mobile only", value: { segment: null, tags: ["mobile"] } },
];

export default function SegmentFilterBarPage() {
  const [filters, setFilters] = useState<FilterState>({});

  return (
    <main>
      <ComponentHeader name="SegmentFilterBar" description="Dashboard filter bar with text, select, date, and tag fields, presets, and clear all." section="Analytics" />
      <SectionTitle>With presets and tag field</SectionTitle>
      <Preview>
        <div style={{ width: "100%" }}>
          <SegmentFilterBar value={filters} onChange={setFilters} fields={fields} presets={presets} />
          {Object.keys(filters).length > 0 && (
            <pre style={{ marginTop: 12, fontSize: 12, color: "var(--color-muted)" }}>{JSON.stringify(filters, null, 2)}</pre>
          )}
        </div>
      </Preview>
      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />
      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { SegmentFilterBar, type FilterState } from "@brickslab./ui-web";

const [filters, setFilters] = useState<FilterState>({});

<SegmentFilterBar
  value={filters}
  onChange={setFilters}
  fields={[
    { id: "segment", label: "Segment", type: "select", options: [...] },
    { id: "tags", label: "Tags", type: "tag", options: [...] },
  ]}
  presets={[
    { id: "mobile", label: "Mobile only", value: { tags: ["mobile"] } },
  ]}
/>`} />
    </main>
  );
}
