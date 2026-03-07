import React, { ElementType, useRef, useEffect, useState } from "react";
import type { TextHighlighterProps } from "./TextHighlighter.type";

const STYLES = `
@keyframes bl-th-draw{from{stroke-dashoffset:var(--bl-th-len)}to{stroke-dashoffset:0}}
@keyframes bl-th-fill{from{opacity:0}to{opacity:1}}
[data-bl-th-svg]{position:absolute;inset:0;overflow:visible;pointer-events:none;}
[data-bl-th-path]{fill:none;stroke-linecap:round;stroke-linejoin:round;}
[data-bl-th-path][data-animate]{animation:bl-th-draw var(--bl-th-dur,0.6s) ease forwards;}
[data-bl-th-rect]{fill-opacity:0;}
[data-bl-th-rect][data-animate]{animation:bl-th-fill var(--bl-th-dur,0.6s) ease forwards;fill-opacity:0.25;}
`;

function prefersReduced(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function TextHighlighter({
  children,
  as,
  className,
  color = "#F59E0B",
  action = "underline",
  strokeWidth = 3,
  padding = 4,
  duration = 0.6,
  iterations = 1,
  multiline = false,
  trigger = "view",
  startOnView = true,
  viewportMargin = "0px",
  reducedMotion = "auto",
  onComplete,
  style,
}: TextHighlighterProps) {
  const Tag = (as ?? "span") as ElementType;
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(trigger === "manual" || (!startOnView && trigger === "view"));
  const skip =
    reducedMotion === "always" ||
    (reducedMotion === "auto" && prefersReduced());

  useEffect(() => {
    if (trigger === "manual") return;
    if (trigger === "hover") return;

    if (trigger === "view") {
      if (!startOnView) { setActive(true); return; }
      const el = ref.current;
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) { setActive(true); obs.disconnect(); }
        },
        { rootMargin: viewportMargin }
      );
      obs.observe(el);
      return () => obs.disconnect();
    }
  }, [trigger, startOnView, viewportMargin]);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => onComplete?.(), duration * 1000 * iterations);
    return () => clearTimeout(t);
  }, [active]);

  const hoverHandlers =
    trigger === "hover"
      ? {
          onMouseEnter: () => setActive(true),
          onMouseLeave: () => setActive(false),
        }
      : {};

  const svgPath = (() => {
    const p = padding;
    const sw = strokeWidth;
    if (action === "underline")
      return `M ${-p} ${sw / 2} L calc(100% + ${p}px) ${sw / 2}`;
    if (action === "strike")
      return `M ${-p} 0 L calc(100% + ${p}px) 0`;
    if (action === "box")
      return `M ${-p} ${-p} H calc(100% + ${p}px) V calc(100% + ${p}px) H ${-p} Z`;
    if (action === "circle")
      return `M calc(50%) ${-p} a 1 0.3 0 1 1 0 calc(100% + ${p * 2}px) a 1 0.3 0 1 1 0 calc(-100% - ${p * 2}px)`;
    return "";
  })();

  const isShape = action === "box" || action === "circle";

  return (
    <>
      <style>{STYLES}</style>
      <Tag
        className={className}
        ref={ref}
        style={{ position: "relative", display: "inline-block", ...style }}
        {...hoverHandlers}
      >
        {children}
        {action !== "highlight" && !skip && (
          <svg data-bl-th-svg="" aria-hidden>
            <path
              data-bl-th-path=""
              data-animate={active ? "" : undefined}
              d={isShape ? svgPath : svgPath}
              stroke={color}
              strokeWidth={strokeWidth}
              style={
                {
                  "--bl-th-dur": `${duration}s`,
                  "--bl-th-len": "9999",
                  strokeDasharray: 9999,
                  strokeDashoffset: active ? 0 : 9999,
                  transition: !active ? undefined : `stroke-dashoffset ${duration}s ease`,
                } as React.CSSProperties
              }
            />
          </svg>
        )}
        {action === "highlight" && (
          <span
            aria-hidden
            style={{
              position: "absolute",
              inset: `-${padding}px`,
              background: color,
              opacity: skip ? 0.25 : active ? 0.25 : 0,
              transition: `opacity ${duration}s ease`,
              borderRadius: 2,
              zIndex: -1,
            }}
          />
        )}
      </Tag>
    </>
  );
}
