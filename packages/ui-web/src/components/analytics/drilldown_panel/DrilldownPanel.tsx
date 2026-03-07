import React from "react";
import type { DrilldownPanelProps } from "./DrilldownPanel.type";

const styles = `
[data-bl-drilldown-overlay] {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  backdrop-filter: blur(2px);
  z-index: 48;
  transition: opacity 0.2s ease;
}
[data-bl-drilldown-overlay][data-closed] {
  opacity: 0;
  pointer-events: none;
}
[data-bl-drilldown-panel] {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(520px, 95vw);
  background: var(--c-surface);
  border-left: 1.5px solid var(--c-border);
  z-index: 49;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: -4px 0 24px rgba(0,0,0,0.1);
}
[data-bl-drilldown-panel][data-closed] {
  transform: translateX(100%);
}
[data-bl-dp-header] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--c-border);
  flex-shrink: 0;
}
[data-bl-dp-title] {
  font-size: var(--fontsize-md);
  font-weight: var(--fontweight-semibold);
  color: var(--color-fg);
}
[data-bl-dp-close] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: none;
  background: transparent;
  border-radius: var(--radius-sm);
  color: var(--color-muted);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}
[data-bl-dp-close]:hover {
  background: var(--c-surface-elevated);
  color: var(--color-fg);
}
[data-bl-dp-body] {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}
`;

export function DrilldownPanel({ open, onOpenChange, title, children }: DrilldownPanelProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onOpenChange(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <style>{styles}</style>
      <div
        data-bl-drilldown-overlay
        data-closed={!open ? "" : undefined}
        aria-hidden="true"
        onClick={() => onOpenChange(false)}
      />
      <aside
        data-bl-drilldown-panel
        data-closed={!open ? "" : undefined}
        role="complementary"
        aria-label={title ?? "Details"}
        aria-hidden={!open}
      >
        <div data-bl-dp-header>
          <span data-bl-dp-title>{title ?? "Details"}</span>
          <button
            data-bl-dp-close
            aria-label="Close panel"
            onClick={() => onOpenChange(false)}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div data-bl-dp-body>{children}</div>
      </aside>
    </>
  );
}
