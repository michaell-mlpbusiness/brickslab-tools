import React, { ElementType, useRef, useEffect, useState } from "react";
import type { TextAnimateProps } from "./TextAnimate.type";

const STYLES = `
@keyframes bl-ta-fade{from{opacity:0}to{opacity:1}}
@keyframes bl-ta-blur{from{opacity:0;filter:blur(12px)}to{opacity:1;filter:blur(0)}}
@keyframes bl-ta-slide{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes bl-ta-scale{from{opacity:0;transform:scale(0.85)}to{opacity:1;transform:scale(1)}}
@keyframes bl-ta-rise{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
`;

const PRESETS: Record<string, string> = {
  fade: "bl-ta-fade", blur: "bl-ta-blur", slide: "bl-ta-slide",
  scale: "bl-ta-scale", rise: "bl-ta-rise",
};

function splitBy(text: string, by: string): string[] {
  if (by === "character") return text.split("");
  if (by === "word") return text.split(/(\s+)/);
  if (by === "line") return text.split("\n");
  return [text];
}

function toEasing(e?: string | number[]): string {
  if (!e) return "ease";
  return typeof e === "string" ? e : `cubic-bezier(${e.join(",")})`;
}

function prefersReduced(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function TextAnimate({
  children,
  as,
  by = "word",
  className,
  segmentClassName,
  preset = "fade",
  delay = 0,
  stagger = 0.05,
  duration = 0.5,
  easing,
  startOnView = false,
  once = true,
  viewportMargin = "0px",
  reducedMotion = "auto",
  onStart,
  onComplete,
  id,
  ariaLabel,
  style,
}: TextAnimateProps) {
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
        if (e.isIntersecting) {
          setActive(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setActive(false);
        }
      },
      { rootMargin: viewportMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [startOnView, once, viewportMargin]);

  useEffect(() => {
    if (!active) return;
    onStart?.();
    if (skip) {
      onComplete?.();
      return;
    }
    const total = (delay + (segs.length - 1) * stagger + duration) * 1000;
    const t = setTimeout(() => onComplete?.(), total);
    return () => clearTimeout(t);
  }, [active]);

  const anim = PRESETS[preset] ?? "bl-ta-fade";
  const ease = toEasing(easing);

  return (
    <>
      <style>{STYLES}</style>
      <Tag id={id} className={className} aria-label={ariaLabel ?? children} style={style}>
        <span ref={ref} aria-hidden style={{ display: "contents" }}>
          {segs.map((seg, i) => (
            <span
              key={i}
              className={segmentClassName}
              style={
                skip
                  ? { display: "inline-block" }
                  : active
                  ? {
                      display: "inline-block",
                      animation: `${anim} ${duration}s ${ease} ${delay + i * stagger}s forwards`,
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
