import React, { ElementType } from "react";
import type { ShimmerBorderTextProps } from "./ShimmerBorderText.type";

const STYLES = `
@keyframes bl-sb-shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
[data-bl-sb-shimmer]{background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;position:absolute;inset:0;}
[data-bl-sb-shimmer][data-animate]{animation:bl-sb-shimmer var(--bl-sb-speed,2s) linear infinite;}
`;

function prefersReduced(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ShimmerBorderText({
  children,
  as,
  className,
  strokeWidth = 1,
  strokeColor = "var(--color-fg)",
  shimmerColor = "#FBFBFB",
  speed = 2,
  fillMode = "transparent",
  reducedMotion = "auto",
  style,
}: ShimmerBorderTextProps) {
  const Tag = (as ?? "span") as ElementType;
  const skip =
    reducedMotion === "always" ||
    (reducedMotion === "auto" && prefersReduced());

  return (
    <>
      <style>{STYLES}</style>
      <Tag
        className={className}
        style={{
          position: "relative",
          display: "inline-block",
          ...style,
        }}
      >
        {/* Base: stroke layer */}
        <span
          aria-hidden={fillMode === "transparent"}
          style={{
            display: "inline-block",
            WebkitTextStroke: `${strokeWidth}px ${strokeColor}`,
            color: fillMode === "solid" ? strokeColor : "transparent",
          }}
        >
          {children}
        </span>
        {/* Shimmer overlay */}
        {!skip && (
          <span
            data-bl-sb-shimmer=""
            data-animate=""
            aria-hidden
            style={
              {
                background: `linear-gradient(90deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
                "--bl-sb-speed": `${speed}s`,
              } as React.CSSProperties
            }
          >
            {children}
          </span>
        )}
      </Tag>
    </>
  );
}
