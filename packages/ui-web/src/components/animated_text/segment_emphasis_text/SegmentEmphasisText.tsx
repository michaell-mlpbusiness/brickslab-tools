import React, { ElementType, useRef, useEffect, useState } from "react";
import type { SegmentEmphasisTextProps, SegmentHighlight } from "./SegmentEmphasisText.type";

const STYLES = `
@keyframes bl-se-raise{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
@keyframes bl-se-glow-in{from{text-shadow:none}to{text-shadow:0 0 8px currentColor}}
[data-bl-se-seg]{display:inline;}
[data-bl-se-seg][data-effect="raise"]{display:inline-block;opacity:0;}
[data-bl-se-seg][data-effect="raise"][data-active]{animation:bl-se-raise var(--bl-se-dur,0.4s) ease forwards;}
`;

function prefersReduced(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function findHighlight(word: string, highlights: SegmentHighlight[]): SegmentHighlight | null {
  for (const h of highlights) {
    if (h.match instanceof RegExp) {
      if (h.match.test(word)) return h;
    } else if (word.includes(h.match)) {
      return h;
    }
  }
  return null;
}

function effectStyle(effect?: string, color?: string): React.CSSProperties {
  if (effect === "glow") return { textShadow: `0 0 8px ${color ?? "currentColor"}` };
  if (effect === "underline") return { textDecoration: "underline", textDecorationColor: color ?? "currentColor" };
  if (effect === "gradient") return {
    background: `linear-gradient(90deg, ${color ?? "#CC4A48"}, #F59E0B)`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    display: "inline-block",
  };
  return {};
}

export function SegmentEmphasisText({
  children,
  as,
  className,
  highlights,
  by = "word",
  duration = 0.4,
  stagger = 0.05,
  startOnView = true,
  reducedMotion = "auto",
  style,
}: SegmentEmphasisTextProps) {
  const Tag = (as ?? "p") as ElementType;
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(!startOnView);
  const skip =
    reducedMotion === "always" ||
    (reducedMotion === "auto" && prefersReduced());

  useEffect(() => {
    if (!startOnView) { setActive(true); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setActive(true); obs.disconnect(); }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [startOnView]);

  const words = children.split(/(\s+)/);

  return (
    <>
      <style>{STYLES}</style>
      <Tag className={className} aria-label={children} style={style}>
        <span ref={ref} aria-hidden style={{ display: "contents" }}>
          {words.map((word, i) => {
            const hl = findHighlight(word, highlights);
            if (!hl) return <span key={i}>{word}</span>;

            const effect = hl.effect ?? "raise";
            const base = effectStyle(
              effect === "raise" || effect === "glow" ? effect : effect,
              undefined
            );

            return (
              <span
                key={i}
                data-bl-se-seg=""
                data-effect={effect}
                data-active={active ? "" : undefined}
                className={hl.className}
                style={{
                  ...base,
                  ...(skip
                    ? { display: "inline-block" }
                    : effect === "raise"
                    ? {
                        "--bl-se-dur": `${duration}s`,
                        animationDelay: `${i * stagger}s`,
                      }
                    : {}),
                } as React.CSSProperties}
              >
                {word}
              </span>
            );
          })}
        </span>
      </Tag>
    </>
  );
}
