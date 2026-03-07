import React from "react";
import { BentoCardProps } from "./BentoCard.type";
import { BentoGridContext } from "../../layout/bento_grid/BentoGrid";

const hoverStyles = `
  [data-bl-bento-card] { transition: all 0.3s ease; }
  [data-bl-bento-card][data-hover="lift"]:hover:not(:disabled) { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15); }
  [data-bl-bento-card][data-hover="glow"]:hover:not(:disabled) { box-shadow: 0 0 20px rgba(var(--color-brand-rgb, 0, 0, 0), 0.3); }
`;

function resolveReducedMotion(
  prop: "auto" | "always" | "never" | undefined,
  fromContext: boolean,
): boolean {
  if (prop === undefined) return fromContext;
  if (prop === "always") return true;
  if (prop === "never") return false;
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function BentoCard({
  name,
  description,
  Icon,
  href,
  cta,
  background,
  className = "",
  style,
  as: Component = "div",
  onClick,
  target = "_self",
  rel,
  interactive = false,
  hoverEffect = "none",
  reducedMotion,
  colSpan,
  rowSpan,
}: BentoCardProps) {
  const ctx = React.useContext(BentoGridContext);
  const shouldReduceMotion = resolveReducedMotion(reducedMotion, ctx.reducedMotion);
  const effectiveHoverEffect = shouldReduceMotion ? "none" : hoverEffect;

  const Tag = href ? "a" : Component;

  const baseStyles: React.CSSProperties = {
    position: "relative",
    padding: "var(--space-6)",
    backgroundColor: "var(--c-surface)",
    border: "1px solid var(--c-border)",
    borderRadius: "var(--radius-md)",
    cursor: interactive ? "pointer" : "default",
    overflow: "hidden",
    ...(colSpan !== undefined && { gridColumn: `span ${colSpan}` }),
    ...(rowSpan !== undefined && { gridRow: `span ${rowSpan}` }),
    ...style,
  };

  const extraProps: Record<string, unknown> = href
    ? { href, target, rel }
    : { onClick };

  return (
    <>
      <style>{hoverStyles}</style>
      <Tag
        data-bl-bento-card
        data-hover={effectiveHoverEffect}
        style={baseStyles}
        className={className}
        {...extraProps}
      >
        {background && <div style={{ position: "absolute", inset: 0, opacity: 0.5 }}>{background}</div>}
        <div style={{ position: "relative", zIndex: 1 }}>
          {Icon && <Icon style={{ width: "32px", height: "32px", marginBottom: "var(--space-3)" }} />}
          <h3
            style={{
              margin: "0 0 var(--space-2) 0",
              fontSize: "var(--fontsize-lg)",
              fontWeight: "var(--fontweight-semibold)",
              color: "var(--color-fg)",
            }}
          >
            {name}
          </h3>
          {description && (
            <p
              style={{
                margin: "0 0 var(--space-3) 0",
                fontSize: "var(--fontsize-sm)",
                color: "var(--color-muted)",
                lineHeight: 1.5,
              }}
            >
              {description}
            </p>
          )}
          {cta && (
            <span
              style={{
                display: "inline-block",
                fontSize: "var(--fontsize-sm)",
                fontWeight: "var(--fontweight-semibold)",
                color: "var(--color-brand)",
              }}
            >
              {cta} →
            </span>
          )}
        </div>
      </Tag>
    </>
  );
}
