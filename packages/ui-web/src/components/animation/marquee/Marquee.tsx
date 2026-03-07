import React from "react";
import { MarqueeProps } from "./Marquee.type";

const marqueeStyles = `
  @keyframes bl-marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes bl-marquee-reverse {
    from { transform: translateX(-50%); }
    to   { transform: translateX(0); }
  }
  @keyframes bl-marquee-vertical {
    from { transform: translateY(0); }
    to   { transform: translateY(-50%); }
  }
  @keyframes bl-marquee-vertical-reverse {
    from { transform: translateY(-50%); }
    to   { transform: translateY(0); }
  }
  [data-bl-marquee][data-pause="true"]:hover [data-bl-marquee-inner] {
    animation-play-state: paused;
  }
  @media (prefers-reduced-motion: reduce) {
    [data-bl-marquee-inner] { animation: none !important; }
  }
`;

export function Marquee({
  children,
  className = "",
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  speed = 20,
  fadeEdges = false,
}: MarqueeProps) {
  const animationName = vertical
    ? reverse ? "bl-marquee-vertical-reverse" : "bl-marquee-vertical"
    : reverse ? "bl-marquee-reverse" : "bl-marquee";

  const group = Array.from({ length: repeat }, (_, i) => (
    <React.Fragment key={i}>{children}</React.Fragment>
  ));

  const innerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: vertical ? "column" : "row",
    flexShrink: 0,
    animationName,
    animationDuration: `${speed}s`,
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    willChange: "transform",
  };

  const fadeStyle: React.CSSProperties = fadeEdges
    ? vertical
      ? { maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }
      : { maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }
    : {};

  return (
    <>
      <style>{marqueeStyles}</style>
      <div
        data-bl-marquee
        data-pause={pauseOnHover}
        style={{
          overflow: "hidden",
          ...(vertical ? { height: "100%" } : { width: "100%" }),
          ...fadeStyle,
        }}
        className={className}
      >
        {/* Two identical groups: animate -50% of total = -100% of one group → seamless loop */}
        <div data-bl-marquee-inner style={innerStyle}>
          <div style={{ display: "flex", flexDirection: vertical ? "column" : "row", flexShrink: 0 }}>
            {group}
          </div>
          <div aria-hidden style={{ display: "flex", flexDirection: vertical ? "column" : "row", flexShrink: 0 }}>
            {group}
          </div>
        </div>
      </div>
    </>
  );
}
