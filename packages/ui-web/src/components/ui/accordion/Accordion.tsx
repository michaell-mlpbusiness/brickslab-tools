import React from "react";
import { FiChevronDown } from "react-icons/fi";
import type { AccordionProps, AccordionItemProps, AccordionSize } from "./Accordion.type";

const accordionStyles = `
[data-bl-accordion] > summary {
  list-style: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  user-select: none;
  padding: var(--bl-acc-pv, 12px) var(--bl-acc-ph, 16px);
  font-size: var(--bl-acc-fs, var(--fontsize-sm));
  font-weight: 500;
  color: var(--color-fg);
  background-color: transparent;
  transition: background-color 0.15s ease;
  outline: none;
}
[data-bl-accordion] > summary::-webkit-details-marker {
  display: none;
}
[data-bl-accordion] > summary:focus-visible {
  outline: var(--focus-ring);
  outline-offset: -2px;
}
[data-bl-accordion]:not([data-disabled]) > summary:hover {
  background-color: var(--c-surface-elevated);
}
[data-bl-accordion][data-disabled] > summary {
  opacity: 0.45;
  cursor: not-allowed;
}
[data-bl-accordion-icon] {
  transition: transform 0.2s ease;
  flex-shrink: 0;
  color: var(--color-muted);
  display: flex;
  align-items: center;
}
[data-bl-accordion][open] [data-bl-accordion-icon] {
  transform: rotate(180deg);
}
[data-bl-accordion-content] {
  padding: 0 var(--bl-acc-ph, 16px) var(--bl-acc-pv, 12px);
  font-size: var(--bl-acc-fs, var(--fontsize-sm));
  color: var(--color-muted);
  line-height: 1.6;
  animation: bl-acc-open 0.18s ease;
}
@keyframes bl-acc-open {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── bordered ────────────────────────────────────────────────── */
[data-bl-accordion-group="bordered"] {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}
[data-bl-accordion-group="bordered"] [data-bl-accordion] + [data-bl-accordion] {
  border-top: 1px solid var(--c-border);
}

/* ── separated ───────────────────────────────────────────────── */
[data-bl-accordion-group="separated"] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
[data-bl-accordion-group="separated"] [data-bl-accordion] {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

/* ── ghost ───────────────────────────────────────────────────── */
[data-bl-accordion-group="ghost"] [data-bl-accordion] + [data-bl-accordion] {
  border-top: 1px solid var(--c-border);
}
`;

const sizeMap: Record<AccordionSize, { pv: string; ph: string; fs: string }> = {
  sm: { pv: "8px",  ph: "12px", fs: "var(--fontsize-xs)" },
  md: { pv: "12px", ph: "16px", fs: "var(--fontsize-sm)" },
  lg: { pv: "16px", ph: "20px", fs: "var(--fontsize-medium)" },
};

export function Accordion({
  children,
  variant = "bordered",
  size = "md",
}: AccordionProps) {
  const { pv, ph, fs } = sizeMap[size];

  return (
    <>
      <style>{accordionStyles}</style>
      <div
        data-bl-accordion-group={variant}
        style={{
          "--bl-acc-pv": pv,
          "--bl-acc-ph": ph,
          "--bl-acc-fs": fs,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </>
  );
}

export function AccordionItem({
  title,
  children,
  open,
  onToggle,
  disabled = false,
  icon,
}: AccordionItemProps) {
  const isControlled = open !== undefined;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (isControlled && onToggle) {
      e.preventDefault();
      onToggle(!open);
    }
  };

  return (
    <>
      <style>{accordionStyles}</style>
      <details
        data-bl-accordion
        data-disabled={disabled ? "" : undefined}
        {...(isControlled ? { open } : {})}
      >
        <summary onClick={handleClick}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flex: 1,
              minWidth: 0,
            }}
          >
            {icon && (
              <span
                style={{
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  color: "var(--color-muted)",
                }}
              >
                {icon}
              </span>
            )}
            <span>{title}</span>
          </span>
          <span data-bl-accordion-icon>
            <FiChevronDown size={16} />
          </span>
        </summary>
        <div data-bl-accordion-content>{children}</div>
      </details>
    </>
  );
}
