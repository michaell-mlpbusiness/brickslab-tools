import React, { ElementType, useRef, useEffect, useState, useCallback } from "react";
import type { HyperTextProps } from "./HyperText.type";

const DEFAULT_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&".split("");

function prefersReduced(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scramble(target: string, progress: number, charset: string[]): string {
  return target
    .split("")
    .map((char, i) => {
      if (char === " ") return " ";
      if (i < Math.floor(progress * target.length)) return char;
      return charset[Math.floor(Math.random() * charset.length)];
    })
    .join("");
}

export function HyperText({
  children,
  as,
  className,
  duration = 0.8,
  delay = 0,
  intensity = 1,
  characterSet,
  trigger = "hover",
  startOnView = false,
  viewportMargin = "0px",
  reducedMotion = "auto",
  onComplete,
  style,
}: HyperTextProps) {
  const Tag = (as ?? "span") as ElementType;
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(children);
  const rafRef = useRef<number>(0);
  const skip =
    reducedMotion === "always" ||
    (reducedMotion === "auto" && prefersReduced());
  const charset = characterSet ?? DEFAULT_CHARSET;

  const runScramble = useCallback(() => {
    if (skip) { setDisplay(children); onComplete?.(); return; }
    const durationMs = duration * 1000;
    const start = performance.now() + delay * 1000;

    function frame(now: number) {
      if (now < start) { rafRef.current = requestAnimationFrame(frame); return; }
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      setDisplay(scramble(children, progress, charset));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        setDisplay(children);
        onComplete?.();
      }
    }
    rafRef.current = requestAnimationFrame(frame);
  }, [children, duration, delay, skip, charset]);

  useEffect(() => {
    if (trigger === "auto") {
      runScramble();
    } else if (trigger === "view" || startOnView) {
      const el = ref.current;
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) { runScramble(); obs.disconnect(); }
        },
        { rootMargin: viewportMargin }
      );
      obs.observe(el);
      return () => obs.disconnect();
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, startOnView, viewportMargin, runScramble]);

  const handlers =
    trigger === "hover"
      ? { onMouseEnter: runScramble }
      : trigger === "tap"
      ? { onClick: runScramble }
      : {};

  return (
    <Tag
      ref={ref}
      className={className}
      aria-label={children}
      style={{ display: "inline-block", fontVariantNumeric: "tabular-nums", ...style }}
      {...handlers}
    >
      <span aria-hidden>{display}</span>
    </Tag>
  );
}
