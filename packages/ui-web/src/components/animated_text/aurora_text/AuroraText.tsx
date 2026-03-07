import React, { ElementType } from "react";
import type { AuroraTextProps } from "./AuroraText.type";

const DEFAULT_COLORS = ["#CC4A48", "#F59E0B", "#4ADE80", "#60A5FA"];

const STYLES = `
@keyframes bl-aurora{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
`;

function prefersReduced(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AuroraText({
  children,
  as,
  className,
  colors,
  speed = 4,
  angle = 135,
  intensity = 1,
  blendMode = "normal",
  reducedMotion = "auto",
  style,
}: AuroraTextProps) {
  const Tag = (as ?? "span") as ElementType;
  const stops = colors ?? DEFAULT_COLORS;
  const skip =
    reducedMotion === "always" ||
    (reducedMotion === "auto" && prefersReduced());

  const gradient = `linear-gradient(${angle}deg, ${stops.join(", ")})`;

  return (
    <>
      <style>{STYLES}</style>
      <Tag
        className={className}
        style={
          {
            background: gradient,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            backgroundSize: "300% 300%",
            display: "inline-block",
            animation: skip ? undefined : `bl-aurora ${speed}s ease infinite`,
            opacity: intensity,
            mixBlendMode: blendMode,
            ...style,
          } as React.CSSProperties
        }
      >
        {children}
      </Tag>
    </>
  );
}
