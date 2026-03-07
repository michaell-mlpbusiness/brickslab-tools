import React from "react";
import { TooltipProps } from "./Tooltip.type";

const tooltipStyles = `
  [data-bl-tooltip-content] {
    position: absolute;
    z-index: 9999;
    padding: var(--space-2) var(--space-3);
    font-size: var(--fontsize-xs);
    line-height: 1.4;
    color: var(--c-surface);
    background-color: var(--color-fg);
    border-radius: var(--radius-sm);
    white-space: normal;
    word-break: break-word;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s ease;
  }
  [data-bl-tooltip-wrapper]:hover [data-bl-tooltip-content] {
    opacity: 1;
  }
  [data-bl-tooltip-wrapper]:hover [data-bl-tooltip-content][data-delay="true"] {
    transition-delay: 0.3s;
  }

  [data-bl-tooltip-content][data-position="top"] {
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
  }
  [data-bl-tooltip-content][data-position="bottom"] {
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
  }
  [data-bl-tooltip-content][data-position="left"] {
    right: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);
  }
  [data-bl-tooltip-content][data-position="right"] {
    left: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);
  }

  [data-bl-tooltip-content]::after {
    content: "";
    position: absolute;
    border: 5px solid transparent;
  }
  [data-bl-tooltip-content][data-position="top"]::after {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-top-color: var(--color-fg);
  }
  [data-bl-tooltip-content][data-position="bottom"]::after {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-color: var(--color-fg);
  }
  [data-bl-tooltip-content][data-position="left"]::after {
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    border-left-color: var(--color-fg);
  }
  [data-bl-tooltip-content][data-position="right"]::after {
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    border-right-color: var(--color-fg);
  }
`;

export function Tooltip({
  content,
  children,
  position = "top",
  delay,
  maxWidth = 220,
  disabled = false,
}: TooltipProps) {
  return (
    <>
      <style>{tooltipStyles}</style>
      <div
        data-bl-tooltip-wrapper=""
        style={{ position: "relative", display: "inline-block" }}
      >
        {children}
        {!disabled && (
          <div
            data-bl-tooltip-content=""
            data-position={position}
            data-delay={delay ? "true" : undefined}
            role="tooltip"
            style={{ maxWidth }}
          >
            {content}
          </div>
        )}
      </div>
    </>
  );
}
