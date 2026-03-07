import React, { ElementType, useRef, useEffect, useState } from "react";
import type { MagneticTextProps } from "./MagneticText.type";

function prefersReduced(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isTouchDevice(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;
}

export function MagneticText({
  children,
  as,
  className,
  strength = 0.4,
  radius = 120,
  friction = 0.15,
  trigger = "pointer",
  disabledOnTouch = true,
  reducedMotion = "auto",
  style,
}: MagneticTextProps) {
  const Tag = (as ?? "span") as ElementType;
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const skip =
    reducedMotion === "always" ||
    (reducedMotion === "auto" && prefersReduced()) ||
    (disabledOnTouch && isTouchDevice());

  useEffect(() => {
    if (skip || trigger !== "pointer") return;

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function loop() {
      setOffset((prev) => {
        const nx = lerp(prev.x, targetRef.current.x, friction);
        const ny = lerp(prev.y, targetRef.current.y, friction);
        if (Math.abs(nx - prev.x) < 0.01 && Math.abs(ny - prev.y) < 0.01) {
          return prev;
        }
        return { x: nx, y: ny };
      });
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    function onMouseMove(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius) {
        const factor = (1 - dist / radius) * strength;
        targetRef.current = { x: dx * factor, y: dy * factor };
      } else {
        targetRef.current = { x: 0, y: 0 };
      }
    }

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [skip, trigger, strength, radius, friction]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        transform: skip
          ? undefined
          : `translate(${offset.x}px, ${offset.y}px)`,
        willChange: skip ? undefined : "transform",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
