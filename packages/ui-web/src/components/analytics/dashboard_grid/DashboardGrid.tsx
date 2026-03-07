import React from "react";
import type { DashboardGridProps } from "./DashboardGrid.type";
import type { WidgetLayout } from "../analytics.types";

const styles = `
[data-bl-dashboard-grid] {
  display: grid;
  width: 100%;
}
[data-bl-dg-item] {
  position: relative;
  min-height: 0;
  transition: box-shadow 0.15s ease, opacity 0.15s ease;
}
[data-bl-dg-item][data-dragging] {
  opacity: 0.4;
}
[data-bl-dg-item][data-over] {
  outline: 2px dashed var(--color-brand);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}
[data-bl-dg-drag-handle] {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);
  cursor: grab;
  color: var(--color-muted);
  opacity: 0;
  transition: opacity 0.15s ease;
}
[data-bl-dg-item]:hover [data-bl-dg-drag-handle] {
  opacity: 1;
}
[data-bl-dg-drag-handle]:active {
  cursor: grabbing;
}
`;

export function DashboardGrid({
  items,
  onLayoutChange,
  cols = 3,
  rowHeight,
  gap = 16,
  editable = false,
}: DashboardGridProps) {
  const [dragIdx, setDragIdx] = React.useState<number | null>(null);
  const [overIdx, setOverIdx] = React.useState<number | null>(null);

  const reorder = (from: number, to: number) => {
    if (!onLayoutChange || from === to) return;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onLayoutChange(next);
  };

  return (
    <>
      <style>{styles}</style>
      <div
        data-bl-dashboard-grid
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap,
          gridAutoRows: rowHeight ? `${rowHeight}px` : undefined,
        }}
      >
        {items.map((item, idx) => (
          <div
            key={item.id}
            data-bl-dg-item
            data-dragging={editable && dragIdx === idx ? "" : undefined}
            data-over={editable && overIdx === idx && dragIdx !== idx ? "" : undefined}
            style={{
              gridColumn: item.colSpan ? `span ${item.colSpan}` : undefined,
              gridRow: item.rowSpan ? `span ${item.rowSpan}` : undefined,
            }}
            draggable={editable}
            onDragStart={() => setDragIdx(idx)}
            onDragEnter={() => setOverIdx(idx)}
            onDragOver={(e) => { e.preventDefault(); setOverIdx(idx); }}
            onDrop={(e) => {
              e.preventDefault();
              if (dragIdx !== null) reorder(dragIdx, idx);
              setDragIdx(null); setOverIdx(null);
            }}
            onDragEnd={() => { setDragIdx(null); setOverIdx(null); }}
          >
            {editable && (
              <div data-bl-dg-drag-handle aria-hidden>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="3.5" cy="3" r="1" fill="currentColor" />
                  <circle cx="8.5" cy="3" r="1" fill="currentColor" />
                  <circle cx="3.5" cy="6" r="1" fill="currentColor" />
                  <circle cx="8.5" cy="6" r="1" fill="currentColor" />
                  <circle cx="3.5" cy="9" r="1" fill="currentColor" />
                  <circle cx="8.5" cy="9" r="1" fill="currentColor" />
                </svg>
              </div>
            )}
            {item.component}
          </div>
        ))}
      </div>
    </>
  );
}
