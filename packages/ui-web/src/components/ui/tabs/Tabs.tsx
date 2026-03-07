import React from "react";
import type { TabsProps, TabPanelProps, TabsVariant, TabsSize } from "./Tabs.type";

const tabsStyles = `
[data-bl-tab] {
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  flex-shrink: 0;
  transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;
  outline: none;
}
[data-bl-tab]:focus-visible {
  outline: var(--focus-ring);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
[data-bl-tab]:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ── underline ───────────────────────────────────────────────── */
[data-bl-tabs-variant="underline"] {
  border-bottom: 1px solid var(--c-border);
  gap: 2px;
}
[data-bl-tabs-variant="underline"] [data-bl-tab] {
  color: var(--color-muted);
  border-bottom: 2px solid transparent;
  border-radius: 0;
  margin-bottom: -1px;
}
[data-bl-tabs-variant="underline"] [data-bl-tab]:hover:not(:disabled) {
  color: var(--color-fg);
}
[data-bl-tabs-variant="underline"] [data-bl-tab][data-active] {
  color: var(--color-fg);
  border-bottom-color: var(--color-brand);
}

/* ── pills ───────────────────────────────────────────────────── */
[data-bl-tabs-variant="pills"] {
  gap: 4px;
}
[data-bl-tabs-variant="pills"] [data-bl-tab] {
  color: var(--color-muted);
  border-radius: var(--radius-sm);
}
[data-bl-tabs-variant="pills"] [data-bl-tab]:hover:not(:disabled) {
  background-color: var(--c-surface-elevated);
  color: var(--color-fg);
}
[data-bl-tabs-variant="pills"] [data-bl-tab][data-active] {
  background-color: var(--c-brand-subtle);
  color: var(--color-brand);
}

/* ── boxed ───────────────────────────────────────────────────── */
[data-bl-tabs-variant="boxed"] {
  background-color: var(--c-surface-elevated);
  padding: 4px;
  border-radius: var(--radius-md);
  gap: 4px;
}
[data-bl-tabs-variant="boxed"] [data-bl-tab] {
  color: var(--color-muted);
  border-radius: var(--radius-sm);
}
[data-bl-tabs-variant="boxed"] [data-bl-tab]:hover:not(:disabled) {
  color: var(--color-fg);
}
[data-bl-tabs-variant="boxed"] [data-bl-tab][data-active] {
  background-color: var(--c-surface);
  color: var(--color-fg);
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}
`;

const sizeMap: Record<TabsSize, { fontSize: string; paddingH: string; paddingV: string; fontWeight: number }> = {
  sm: { fontSize: "var(--fontsize-xs)",     paddingH: "var(--space-3)", paddingV: "var(--space-2)", fontWeight: 500 },
  md: { fontSize: "var(--fontsize-sm)",     paddingH: "var(--space-4)", paddingV: "var(--space-2)", fontWeight: 500 },
  lg: { fontSize: "var(--fontsize-medium)", paddingH: "var(--space-5)", paddingV: "var(--space-3)", fontWeight: 500 },
};

const activeWeightMap: Record<TabsVariant, number> = {
  underline: 600,
  pills: 600,
  boxed: 600,
};

export function Tabs({
  tabs,
  value,
  onChange,
  variant = "underline",
  size = "md",
  fullWidth = false,
}: TabsProps) {
  const { fontSize, paddingH, paddingV } = sizeMap[size];
  const activeWeight = activeWeightMap[variant];

  return (
    <>
      <style>{tabsStyles}</style>
      <div
        role="tablist"
        data-bl-tabs-variant={variant}
        style={{
          display: "flex",
          flexWrap: "nowrap",
          overflowX: "auto",
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.value === value;
          return (
            <button
              key={tab.value}
              role="tab"
              data-bl-tab
              data-active={isActive ? "" : undefined}
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && onChange(tab.value)}
              style={{
                fontSize,
                paddingTop: paddingV,
                paddingBottom: paddingV,
                paddingLeft: paddingH,
                paddingRight: paddingH,
                fontWeight: isActive ? activeWeight : 400,
                flex: fullWidth ? 1 : undefined,
                justifyContent: fullWidth ? "center" : undefined,
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>
    </>
  );
}

export function TabPanel({ value, activeValue, children }: TabPanelProps) {
  if (value !== activeValue) return null;
  return (
    <div role="tabpanel">
      {children}
    </div>
  );
}
