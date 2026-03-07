"use client";
import React, { useState } from "react";
import { ResponseTable, type ResponseRow, type ColumnDef, type FilterDef } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "rows", type: "ResponseRow[]", required: true, description: "Array of data rows — each must have an id field." },
  { name: "columns", type: "ColumnDef[]", required: true, description: "Column definitions: { id, label, type?, width?, sortable? }." },
  { name: "pagination", type: "{ page, pageSize, total }", required: false, description: "Pagination state. Shows pagination UI when total > pageSize." },
  { name: "onPageChange", type: "(page: number) => void", required: false, description: "Called when the user navigates to a different page." },
  { name: "filters", type: "FilterDef[]", required: false, description: "Filter definitions — renders a text input per filter above the table." },
  { name: "onExport", type: '(format: "csv" | "xlsx") => void', required: false, description: "Shows CSV/XLSX export buttons when provided." },
];

const columns: ColumnDef[] = [
  { id: "respondent", label: "Respondent", sortable: true },
  { id: "role", label: "Role", sortable: true },
  { id: "score", label: "Score", type: "number", sortable: true },
  { id: "submittedAt", label: "Submitted", type: "date", sortable: true },
];

const filters: FilterDef[] = [
  { id: "respondent", label: "Respondent", type: "text" },
  { id: "role", label: "Role", type: "text" },
];

const rows: ResponseRow[] = Array.from({ length: 12 }, (_, i) => ({
  id: `r${i + 1}`,
  respondent: `User ${i + 1}`,
  role: ["Developer", "Designer", "PM"][i % 3],
  score: Math.floor(Math.random() * 40) + 60,
  submittedAt: new Date(Date.now() - i * 86400000).toLocaleDateString(),
}));

export default function ResponseTablePage() {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const pageRows = rows.slice((page - 1) * pageSize, page * pageSize);

  return (
    <main>
      <ComponentHeader name="ResponseTable" description="Admin response table with client-side sort, filter, pagination, and CSV/XLSX export." section="Quiz" />

      <SectionTitle>With filters, pagination and export</SectionTitle>
      <Preview>
        <ResponseTable
          rows={pageRows}
          columns={columns}
          filters={filters}
          pagination={{ page, pageSize, total: rows.length }}
          onPageChange={setPage}
          onExport={(fmt) => alert(`Export as ${fmt}`)}
        />
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { ResponseTable } from "@brickslab./ui-web";

<ResponseTable
  rows={responses}
  columns={[
    { id: "name", label: "Name", sortable: true },
    { id: "score", label: "Score", type: "number", sortable: true },
  ]}
  pagination={{ page, pageSize: 20, total: responses.length }}
  onPageChange={setPage}
  onExport={(format) => downloadFile(format)}
/>`} />
    </main>
  );
}
