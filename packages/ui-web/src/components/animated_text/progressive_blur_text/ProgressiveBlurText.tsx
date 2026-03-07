import React, { ElementType, useRef, useEffect, useState } from "react";
import type { ProgressiveBlurTextProps } from "./ProgressiveBlurText.type";

function prefersReduced(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ProgressiveBlurText({
  children,
  as,
  className,
  maxBlur = 12,
  duration = 0.6,
  trigger = "view",
  startOnView = true,
  viewportMargin = "0px",
  reducedMotion = "auto",
  onComplete,
  style,
}: ProgressiveBlurTextProps) {
  const Tag = (as ?? "p") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(!startOnView && trigger === "view");
  const skip =
    reducedMotion === "always" ||
    (reducedMotion === "auto" && prefersReduced());

  useEffect(() => {
    if (!startOnView) {
      setActive(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { rootMargin: viewportMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [startOnView, viewportMargin]);

  useEffect(() => {
    if (!active) return;
    const words = children.split(/(\s+)/);
    const total = (words.length * 0.05 + duration) * 1000;
    const t = setTimeout(() => onComplete?.(), total);
    return () => clearTimeout(t);
  }, [active]);

  const words = children.split(/(\s+)/);

  return (
    <Tag ref={ref as any} className={className} aria-label={children} style={style}>
      <span aria-hidden style={{ display: "contents" }}>
        {words.map((word, i) => (
          <span
            key={i}
            style={
              skip
                ? { display: "inline-block" }
                : active
                ? {
                    display: "inline-block",
                    filter: "blur(0px)",
                    opacity: 1,
                    transition: `filter ${duration}s ease ${i * 0.05}s, opacity ${duration}s ease ${i * 0.05}s`,
                  }
                : {
                    display: "inline-block",
                    filter: `blur(${maxBlur}px)`,
                    opacity: 0,
                  }
            }
          >
            {word}
          </span>
        ))}
      </span>
    </Tag>
  );
}
