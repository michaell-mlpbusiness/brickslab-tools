import React from "react";
import type { ResponseTableProps } from "./ResponseTable.type";

const styles = `
[data-bl-response-table] {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: var(--fontsize-sm);
}
[data-bl-rt-toolbar] {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
[data-bl-rt-filter] {
  padding: 7px 12px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: var(--c-surface);
  color: var(--color-fg);
  font-size: var(--fontsize-sm);
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s ease;
  min-width: 140px;
}
[data-bl-rt-filter]:focus {
  border-color: var(--color-brand);
}
[data-bl-rt-spacer] { flex: 1; }
[data-bl-rt-export-btn] {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: var(--c-surface);
  color: var(--color-fg);
  font-size: var(--fontsize-sm);
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;
  white-space: nowrap;
}
[data-bl-rt-export-btn]:hover {
  border-color: var(--color-brand);
  background: var(--c-brand-subtle);
}
[data-bl-rt-wrap] {
  overflow-x: auto;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
}
[data-bl-rt-table] {
  width: 100%;
  border-collapse: collapse;
  min-width: 400px;
}
[data-bl-rt-table] th {
  padding: 10px 14px;
  text-align: left;
  font-size: var(--fontsize-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-muted);
  background: var(--c-surface-elevated);
  border-bottom: 1px solid var(--c-border);
  white-space: nowrap;
  user-select: none;
}
[data-bl-rt-table] th[data-sortable] {
  cursor: pointer;
}
[data-bl-rt-table] th[data-sortable]:hover {
  color: var(--color-brand);
}
[data-bl-rt-table] td {
  padding: 10px 14px;
  border-bottom: 1px solid var(--c-border);
  color: var(--color-fg);
  vertical-align: middle;
}
[data-bl-rt-table] tr:last-child td {
  border-bottom: none;
}
[data-bl-rt-table] tr:hover td {
  background: var(--c-surface-elevated);
}
[data-bl-rt-empty] {
  text-align: center;
  padding: 40px;
  color: var(--color-muted);
  font-size: var(--fontsize-sm);
}
[data-bl-rt-pagination] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}
[data-bl-rt-page-info] {
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
}
[data-bl-rt-page-btns] {
  display: flex;
  gap: 4px;
}
[data-bl-rt-page-btn] {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: var(--c-surface);
  color: var(--color-fg);
  font-size: var(--fontsize-xs);
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;
}
[data-bl-rt-page-btn]:hover:not(:disabled) {
  border-color: var(--color-brand);
  background: var(--c-brand-subtle);
}
[data-bl-rt-page-btn][data-active] {
  border-color: var(--color-brand);
  background: var(--color-brand);
  color: #FBFBFB;
}
[data-bl-rt-page-btn]:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
`;

export function ResponseTable({
  rows,
  columns,
  pagination,
  onPageChange,
  filters,
  onExport,
}: ResponseTableProps) {
  const [sortCol, setSortCol] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc");
  const [filterValues, setFilterValues] = React.useState<Record<string, string>>({});

  const toggleSort = (colId: string) => {
    if (sortCol === colId) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortCol(colId);
      setSortDir("asc");
    }
  };

  const filtered = rows.filter((row) =>
    Object.entries(filterValues).every(([fid, fval]) => {
      if (!fval) return true;
      const cell = row[fid];
      return String(cell ?? "").toLowerCase().includes(fval.toLowerCase());
    })
  );

  const sorted = sortCol
    ? [...filtered].sort((a, b) => {
        const av = String(a[sortCol] ?? "");
        const bv = String(b[sortCol] ?? "");
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      })
    : filtered;

  const totalPages = pagination ? Math.ceil(pagination.total / pagination.pageSize) : 1;
  const currentPage = pagination?.page ?? 1;

  return (
    <>
      <style>{styles}</style>
      <div data-bl-response-table>
        {/* Toolbar */}
        {(filters?.length || onExport) && (
          <div data-bl-rt-toolbar>
            {filters?.map((f) => (
              <input
                key={f.id}
                data-bl-rt-filter
                type="text"
                placeholder={`Filter ${f.label}…`}
                value={filterValues[f.id] ?? ""}
                onChange={(e) =>
                  setFilterValues((v) => ({ ...v, [f.id]: e.target.value }))
                }
              />
            ))}
            <div data-bl-rt-spacer />
            {onExport && (
              <>
                <button data-bl-rt-export-btn onClick={() => onExport("csv")}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M6.5 2v7M4 7l2.5 2.5L9 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 10.5h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  CSV
                </button>
                <button data-bl-rt-export-btn onClick={() => onExport("xlsx")}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M6.5 2v7M4 7l2.5 2.5L9 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 10.5h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  XLSX
                </button>
              </>
            )}
          </div>
        )}

        {/* Table */}
        <div data-bl-rt-wrap>
          <table data-bl-rt-table>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.id}
                    data-sortable={col.sortable ? "" : undefined}
                    style={{ width: col.width ?? undefined }}
                    onClick={() => col.sortable && toggleSort(col.id)}
                  >
                    {col.label}
                    {col.sortable && sortCol === col.id && (
                      <span style={{ marginLeft: 4 }}>{sortDir === "asc" ? "↑" : "↓"}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} data-bl-rt-empty>No responses found</td>
                </tr>
              ) : (
                sorted.map((row) => (
                  <tr key={row.id}>
                    {columns.map((col) => (
                      <td key={col.id}>{String(row[col.id] ?? "—")}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && totalPages > 1 && (
          <div data-bl-rt-pagination>
            <span data-bl-rt-page-info>
              {(currentPage - 1) * pagination.pageSize + 1}–
              {Math.min(currentPage * pagination.pageSize, pagination.total)} of {pagination.total}
            </span>
            <div data-bl-rt-page-btns>
              <button
                data-bl-rt-page-btn
                disabled={currentPage <= 1}
                onClick={() => onPageChange?.(currentPage - 1)}
                aria-label="Previous page"
              >
                ‹
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const p = i + 1;
                return (
                  <button
                    key={p}
                    data-bl-rt-page-btn
                    data-active={p === currentPage ? "" : undefined}
                    onClick={() => onPageChange?.(p)}
                  >
                    {p}
                  </button>
                );
              })}
              <button
                data-bl-rt-page-btn
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange?.(currentPage + 1)}
                aria-label="Next page"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
