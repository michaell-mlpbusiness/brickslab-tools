import React, { ElementType, useState } from "react";
import type { KineticUnderlineTextProps } from "./KineticUnderlineText.type";

function toEasing(e?: string | number[]): string {
  if (!e) return "ease";
  return typeof e === "string" ? e : `cubic-bezier(${e.join(",")})`;
}

function prefersReduced(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function KineticUnderlineText({
  children,
  as,
  className,
  underlineClassName,
  thickness = 2,
  offset = 2,
  duration = 0.3,
  easing,
  trigger = "hover",
  reducedMotion = "auto",
  style,
}: KineticUnderlineTextProps) {
  const Tag = (as ?? "span") as ElementType;
  const [active, setActive] = useState(false);
  const skip =
    reducedMotion === "always" ||
    (reducedMotion === "auto" && prefersReduced());
  const ease = toEasing(easing);

  const eventHandlers =
    trigger === "hover"
      ? {
          onMouseEnter: () => setActive(true),
          onMouseLeave: () => setActive(false),
        }
      : trigger === "focus"
      ? {
          onFocus: () => setActive(true),
          onBlur: () => setActive(false),
        }
      : trigger === "active"
      ? {
          onMouseDown: () => setActive(true),
          onMouseUp: () => setActive(false),
        }
      : {};

  return (
    <Tag
      className={className}
      style={{
        display: "inline-block",
        position: "relative",
        paddingBottom: thickness + offset,
        ...style,
      }}
      {...eventHandlers}
    >
      {children}
      <span
        className={underlineClassName}
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: skip || active ? 0 : "50%",
          width: skip || active ? "100%" : 0,
          height: thickness,
          background: "currentColor",
          transition: skip
            ? undefined
            : `left ${duration}s ${ease}, width ${duration}s ${ease}`,
          borderRadius: thickness,
        }}
      />
    </Tag>
  );
}
