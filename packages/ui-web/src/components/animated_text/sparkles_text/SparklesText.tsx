import React, { ElementType, useEffect, useState } from "react";
import type { SparklesTextProps } from "./SparklesText.type";

const DEFAULT_COLORS = ["#CC4A48", "#F59E0B", "#4ADE80", "#FBFBFB"];

const STYLES = `
@keyframes bl-sp-float{0%{opacity:0;transform:scale(0) rotate(0deg)}30%{opacity:1}100%{opacity:0;transform:scale(1.2) rotate(180deg)}}
[data-bl-sp]{position:absolute;pointer-events:none;animation:bl-sp-float var(--bl-sp-dur,1.2s) ease-in-out forwards;}
`;

interface Sparkle {
  id: number;
  x: string;
  y: string;
  size: number;
  color: string;
  delay: number;
}

function randomSparkle(colors: string[], size: number, id: number): Sparkle {
  return {
    id,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: size * (0.5 + Math.random()),
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 1.5,
  };
}

function prefersReduced(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SparklesText({
  children,
  as,
  className,
  count = 8,
  size = 10,
  speed = 1.2,
  colors,
  area = "bounds",
  reducedMotion = "auto",
  style,
}: SparklesTextProps) {
  const Tag = (as ?? "span") as ElementType;
  const colorsArr = colors ?? DEFAULT_COLORS;
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const skip =
    reducedMotion === "always" ||
    (reducedMotion === "auto" && prefersReduced());

  useEffect(() => {
    if (skip) return;
    const initial = Array.from({ length: count }, (_, i) =>
      randomSparkle(colorsArr, size, i)
    );
    setSparkles(initial);

    const interval = setInterval(() => {
      setSparkles((prev) =>
        prev.map((sp) =>
          Math.random() < 0.3 ? randomSparkle(colorsArr, size, sp.id) : sp
        )
      );
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [skip, count, size, speed]);

  return (
    <>
      <style>{STYLES}</style>
      <Tag
        className={className}
        style={{ position: "relative", display: "inline-block", ...style }}
      >
        {!skip &&
          sparkles.map((sp) => (
            <span
              key={sp.id}
              data-bl-sp=""
              aria-hidden
              style={
                {
                  left: area === "bounds" ? sp.x : `${10 + Math.random() * 80}%`,
                  top: sp.y,
                  width: sp.size,
                  height: sp.size,
                  "--bl-sp-dur": `${speed}s`,
                  animationDelay: `${sp.delay}s`,
                } as React.CSSProperties
              }
            >
              <svg
                width={sp.size}
                height={sp.size}
                viewBox="0 0 10 10"
                fill={sp.color}
              >
                <polygon points="5,0 6,4 10,5 6,6 5,10 4,6 0,5 4,4" />
              </svg>
            </span>
          ))}
        {children}
      </Tag>
    </>
  );
}
