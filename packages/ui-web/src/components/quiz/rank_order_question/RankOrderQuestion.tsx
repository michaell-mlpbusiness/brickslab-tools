import React from "react";
import type { RankOrderQuestionProps } from "./RankOrderQuestion.type";

const styles = `
[data-bl-rank-order] {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
[data-bl-ro-item] {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: var(--c-surface);
  cursor: grab;
  user-select: none;
  transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
}
[data-bl-ro-item]:active {
  cursor: grabbing;
}
[data-bl-ro-item][data-dragging] {
  opacity: 0.4;
}
[data-bl-ro-item][data-over] {
  border-color: var(--color-brand);
  background: var(--c-brand-subtle);
  box-shadow: 0 0 0 2px var(--c-brand-border);
}
[data-bl-ro-item][data-disabled] {
  cursor: not-allowed;
  opacity: 0.55;
}
[data-bl-ro-rank] {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--c-surface-elevated);
  border: 1px solid var(--c-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: var(--color-muted);
  flex-shrink: 0;
}
[data-bl-ro-drag-handle] {
  color: var(--color-muted);
  flex-shrink: 0;
}
[data-bl-ro-label] {
  font-size: var(--fontsize-sm);
  color: var(--color-fg);
  flex: 1;
}
[data-bl-ro-arrows] {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-shrink: 0;
}
[data-bl-ro-arrow] {
  background: transparent;
  border: none;
  padding: 2px 4px;
  cursor: pointer;
  color: var(--color-muted);
  border-radius: 3px;
  line-height: 1;
  font-size: 10px;
  transition: color 0.1s ease, background 0.1s ease;
}
[data-bl-ro-arrow]:hover:not(:disabled) {
  color: var(--color-brand);
  background: var(--c-brand-subtle);
}
[data-bl-ro-arrow]:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
`;

export function RankOrderQuestion({
  value,
  onChange,
  options,
  maxRank,
  disabled = false,
}: RankOrderQuestionProps) {
  const [dragIdx, setDragIdx] = React.useState<number | null>(null);
  const [overIdx, setOverIdx] = React.useState<number | null>(null);

  // Build ordered list: items in value order, then remaining
  const ordered = React.useMemo(() => {
    const ranked = value
      .map((id) => options.find((o) => o.id === id))
      .filter(Boolean) as typeof options;
    const rest = options.filter((o) => !value.includes(o.id));
    return [...ranked, ...rest].slice(0, maxRank ?? options.length);
  }, [value, options, maxRank]);

  const reorder = (from: number, to: number) => {
    const next = [...value];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  const move = (idx: number, dir: -1 | 1) => {
    const list = ordered.map((o) => o.id);
    const current = list.findIndex((id) => id === ordered[idx].id);
    const target = current + dir;
    if (target < 0 || target >= list.length) return;
    const next = [...list];
    [next[current], next[target]] = [next[target], next[current]];
    onChange(next);
  };

  return (
    <>
      <style>{styles}</style>
      <div data-bl-rank-order>
        {ordered.map((opt, idx) => (
          <div
            key={opt.id}
            data-bl-ro-item
            data-dragging={dragIdx === idx ? "" : undefined}
            data-over={overIdx === idx && dragIdx !== idx ? "" : undefined}
            data-disabled={disabled ? "" : undefined}
            draggable={!disabled}
            onDragStart={() => { setDragIdx(idx); }}
            onDragEnter={() => setOverIdx(idx)}
            onDragOver={(e) => { e.preventDefault(); setOverIdx(idx); }}
            onDrop={(e) => {
              e.preventDefault();
              if (dragIdx !== null && dragIdx !== idx) reorder(dragIdx, idx);
              setDragIdx(null);
              setOverIdx(null);
            }}
            onDragEnd={() => { setDragIdx(null); setOverIdx(null); }}
          >
            <div data-bl-ro-drag-handle aria-hidden>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="4" cy="3" r="1.2" fill="currentColor" />
                <circle cx="10" cy="3" r="1.2" fill="currentColor" />
                <circle cx="4" cy="7" r="1.2" fill="currentColor" />
                <circle cx="10" cy="7" r="1.2" fill="currentColor" />
                <circle cx="4" cy="11" r="1.2" fill="currentColor" />
                <circle cx="10" cy="11" r="1.2" fill="currentColor" />
              </svg>
            </div>
            <div data-bl-ro-rank>{idx + 1}</div>
            <span data-bl-ro-label>{opt.label}</span>
            <div data-bl-ro-arrows>
              <button
                data-bl-ro-arrow
                aria-label="Move up"
                disabled={disabled || idx === 0}
                onClick={() => move(idx, -1)}
              >▲</button>
              <button
                data-bl-ro-arrow
                aria-label="Move down"
                disabled={disabled || idx === ordered.length - 1}
                onClick={() => move(idx, 1)}
              >▼</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
