import React, { ElementType, useRef, useEffect, useState } from "react";
import type { VariableFontWarpTextProps, FontAxes } from "./VariableFontWarpText.type";

function prefersReduced(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function buildVariationSettings(axes: FontAxes, active: boolean): string {
  const parts: string[] = [];
  if (axes.wght) parts.push(`"wght" ${active ? axes.wght[1] : axes.wght[0]}`);
  if (axes.wdth) parts.push(`"wdth" ${active ? axes.wdth[1] : axes.wdth[0]}`);
  if (axes.slnt) parts.push(`"slnt" ${active ? axes.slnt[1] : axes.slnt[0]}`);
  return parts.join(", ") || "normal";
}

function toEasing(e?: string | number[]): string {
  if (!e) return "ease";
  return typeof e === "string" ? e : `cubic-bezier(${e.join(",")})`;
}

export function VariableFontWarpText({
  children,
  as,
  className,
  axes = { wght: [400, 700], wdth: [75, 125] },
  trigger = "hover",
  duration = 0.4,
  easing,
  clamp = true,
  reducedMotion = "auto",
  style,
}: VariableFontWarpTextProps) {
  const Tag = (as ?? "span") as ElementType;
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);
  const skip =
    reducedMotion === "always" ||
    (reducedMotion === "auto" && prefersReduced());
  const ease = toEasing(easing);

  useEffect(() => {
    if (trigger !== "view" && trigger !== "scroll") return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          if (trigger === "view") obs.disconnect();
        } else if (trigger === "scroll") {
          setActive(false);
        }
      },
      { threshold: 0.5 }
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

  const variationSettings = skip ? "normal" : buildVariationSettings(axes, active);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        fontVariationSettings: variationSettings,
        transition: skip
          ? undefined
          : `font-variation-settings ${duration}s ${ease}`,
        ...style,
      }}
      {...hoverHandlers}
    >
      {children}
    </Tag>
  );
}
