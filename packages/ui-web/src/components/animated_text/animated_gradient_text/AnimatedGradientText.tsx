import React, { ElementType } from "react";
import type { AnimatedGradientTextProps } from "./AnimatedGradientText.type";

const DEFAULT_STOPS = ["#CC4A48", "#F59E0B", "#4ADE80", "#60A5FA"];

const STYLES = `
@keyframes bl-agt-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes bl-agt-pulse{0%,100%{filter:saturate(1) brightness(1)}50%{filter:saturate(1.5) brightness(1.2)}}
`;

const ANIM_MAP: Record<string, string> = {
  shift: "bl-agt-shift",
  rotate: "bl-agt-shift",
  pulse: "bl-agt-pulse",
};

function prefersReduced(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AnimatedGradientText({
  children,
  as,
  className,
  colorStops,
  speed = 4,
  angle = 90,
  mode = "linear",
  animate = "shift",
  reducedMotion = "auto",
  style,
}: AnimatedGradientTextProps) {
  const Tag = (as ?? "span") as ElementType;
  const stops = colorStops ?? DEFAULT_STOPS;
  const skip =
    reducedMotion === "always" ||
    (reducedMotion === "auto" && prefersReduced());

  const gradient =
    mode === "radial"
      ? `radial-gradient(circle, ${stops.join(", ")})`
      : `linear-gradient(${angle}deg, ${stops.join(", ")})`;

  return (
    <>
      <style>{STYLES}</style>
      <Tag
        className={className}
        style={{
          background: gradient,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
          backgroundSize: "300% 300%",
          display: "inline-block",
          animation: skip
            ? undefined
            : `${ANIM_MAP[animate] ?? "bl-agt-shift"} ${speed}s ease infinite`,
          ...style,
        }}
      >
        {children}
      </Tag>
    </>
  );
}
