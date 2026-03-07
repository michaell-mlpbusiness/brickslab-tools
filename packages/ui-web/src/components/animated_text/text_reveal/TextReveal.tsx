import React, { ElementType, useRef, useEffect, useState } from "react";
import type { TextRevealProps } from "./TextReveal.type";

const STYLES = `
@keyframes bl-tr-in{from{opacity:0;filter:blur(8px);transform:translateY(8px)}to{opacity:1;filter:blur(0);transform:translateY(0)}}
@keyframes bl-tr-in-noblur{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes bl-tr-in-noslide{from{opacity:0;filter:blur(8px)}to{opacity:1;filter:blur(0)}}
@keyframes bl-tr-in-plain{from{opacity:0}to{opacity:1}}
`;

function splitBy(text: string, by: string): string[] {
  if (by === "character") return text.split("");
  if (by === "line") return text.split("\n");
  return text.split(/(\s+)/);
}

function prefersReduced(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function TextReveal({
  children,
  as,
  className,
  by = "word",
  fade = true,
  blur = true,
  duration = 0.6,
  stagger = 0.04,
  startOnView = true,
  viewportMargin = "0px",
  threshold = 0.1,
  reducedMotion = "auto",
  onComplete,
  style,
}: TextRevealProps) {
  const Tag = (as ?? "p") as ElementType;
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(!startOnView);
  const skip =
    reducedMotion === "always" ||
    (reducedMotion === "auto" && prefersReduced());
  const segs = splitBy(children, by);

  useEffect(() => {
    if (!startOnView) {
      setActive(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= threshold) {
          setActive(true);
          obs.disconnect();
        }
      },
      { rootMargin: viewportMargin, threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [startOnView, viewportMargin, threshold]);

  useEffect(() => {
    if (!active) return;
    const total = ((segs.length - 1) * stagger + duration) * 1000;
    const t = setTimeout(() => onComplete?.(), total);
    return () => clearTimeout(t);
  }, [active]);

  const animName =
    blur && fade
      ? "bl-tr-in"
      : !blur && fade
      ? "bl-tr-in-noblur"
      : blur && !fade
      ? "bl-tr-in-noslide"
      : "bl-tr-in-plain";

  return (
    <>
      <style>{STYLES}</style>
      <Tag className={className} aria-label={children} style={style}>
        <span ref={ref} aria-hidden style={{ display: "contents" }}>
          {segs.map((seg, i) => (
            <span
              key={i}
              style={
                skip
                  ? { display: "inline-block" }
                  : active
                  ? {
                      display: "inline-block",
                      animation: `${animName} ${duration}s ease ${i * stagger}s forwards`,
                      opacity: 0,
                    }
                  : { display: "inline-block", opacity: 0 }
              }
            >
              {seg}
            </span>
          ))}
        </span>
      </Tag>
    </>
  );
}
