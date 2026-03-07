"use client";
import React, { useState } from "react";
import { DashboardGrid, KPITrendWidget, InsightCards, type WidgetLayout } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "items", type: "WidgetLayout[]", required: true, description: "Array of { id, component, colSpan?, rowSpan? }." },
  { name: "onLayoutChange", type: "(layout: WidgetLayout[]) => void", required: false, description: "Called with reordered items when drag completes." },
  { name: "cols", type: "number", required: false, default: "3", description: "Number of grid columns." },
  { name: "rowHeight", type: "number", required: false, description: "Fixed row height in pixels. Auto by default." },
  { name: "gap", type: "number", required: false, default: "16", description: "Gap between cells in pixels." },
  { name: "editable", type: "boolean", required: false, default: "false", description: "Shows drag handles for reordering." },
];

const Placeholder = ({ label, h = 120 }: { label: string; h?: number }) => (
  <div style={{ height: h, border: "1.5px solid var(--c-border)", borderRadius: "var(--radius-md)", background: "var(--c-surface-elevated)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-muted)", fontSize: "var(--fontsize-sm)" }}>
    {label}
  </div>
);

export default function DashboardGridPage() {
  const [items, setItems] = useState<WidgetLayout[]>([
    { id: "kpi1", component: <KPITrendWidget title="Completion rate" value={74} format="percent" delta={12} sparkline={[55, 60, 58, 65, 70, 74]} /> },
    { id: "kpi2", component: <KPITrendWidget title="NPS score" value={42} delta={-3} sparkline={[50, 48, 45, 44, 42]} /> },
    { id: "kpi3", component: <KPITrendWidget title="Responses" value={1284} delta={18} sparkline={[900, 1000, 1100, 1200, 1284]} /> },
    { id: "funnel", colSpan: 2, component: <Placeholder label="SurveyFunnel widget" h={180} /> },
    { id: "dist", component: <Placeholder label="DistributionChart widget" h={180} /> },
  ]);

  return (
    <main>
      <ComponentHeader name="DashboardGrid" description="Responsive CSS grid layout for widgets with optional drag-and-drop reorder in edit mode." section="Analytics" />
      <SectionTitle>3-column grid</SectionTitle>
      <Preview><DashboardGrid items={items} cols={3} gap={12} /></Preview>
      <SectionTitle>Editable (drag to reorder)</SectionTitle>
      <Preview><DashboardGrid items={items} onLayoutChange={setItems} cols={3} gap={12} editable /></Preview>
      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />
      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { DashboardGrid } from "@brickslab./ui-web";

<DashboardGrid
  items={[
    { id: "kpi", component: <KPITrendWidget title="NPS" value={42} /> },
    { id: "chart", colSpan: 2, component: <DistributionChart data={[...]} /> },
  ]}
  cols={3}
  gap={16}
  editable
  onLayoutChange={setItems}
/>`} />
    </main>
  );
}
