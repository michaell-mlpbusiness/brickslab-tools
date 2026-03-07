import React, { ElementType, useRef, useEffect, useState } from "react";
import type { GlowPulseTextProps } from "./GlowPulseText.type";

const STYLES = `
@keyframes bl-gp-pulse{0%,100%{text-shadow:var(--bl-gp-shadow-low)}50%{text-shadow:var(--bl-gp-shadow-high)}}
[data-bl-gp][data-pulse]{animation:bl-gp-pulse var(--bl-gp-rate,2s) ease-in-out infinite;}
`;

function prefersReduced(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function buildShadow(color: string, intensity: number, multiplier: number): string {
  const spread = intensity * multiplier;
  return `0 0 ${spread}px ${color}, 0 0 ${spread * 2}px ${color}`;
}

export function GlowPulseText({
  children,
  as,
  className,
  glowColor = "#CC4A48",
  intensity = 10,
  pulse = true,
  pulseRate = 2,
  trigger = "always",
  reducedMotion = "auto",
  style,
}: GlowPulseTextProps) {
  const Tag = (as ?? "span") as ElementType;
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(trigger === "always");
  const skip =
    reducedMotion === "always" ||
    (reducedMotion === "auto" && prefersReduced());

  useEffect(() => {
    if (trigger !== "view") return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [trigger]);

  const hoverHandlers =
    trigger === "hover"
      ? {
          onMouseEnter: () => setActive(true),
          onMouseLeave: () => setActive(false),
        }
      : {};

  const shadowLow = buildShadow(glowColor, intensity, 0.5);
  const shadowHigh = buildShadow(glowColor, intensity, 1.5);

  return (
    <>
      <style>{STYLES}</style>
      <Tag
        ref={ref}
        className={className}
        data-bl-gp=""
        data-pulse={pulse && active && !skip ? "" : undefined}
        style={
          {
            display: "inline-block",
            textShadow: !skip && active ? shadowLow : undefined,
            "--bl-gp-shadow-low": shadowLow,
            "--bl-gp-shadow-high": shadowHigh,
            "--bl-gp-rate": `${pulseRate}s`,
            ...style,
          } as React.CSSProperties
        }
        {...hoverHandlers}
      >
        {children}
      </Tag>
    </>
  );
}
