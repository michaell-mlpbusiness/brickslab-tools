import React, { ElementType, useEffect, useRef, useState } from "react";
import type { WordRotateProps } from "./WordRotate.type";

const STYLES = `
@keyframes bl-wr-slide-in{from{opacity:0;transform:translateY(-100%)}to{opacity:1;transform:translateY(0)}}
@keyframes bl-wr-slide-out{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(100%)}}
@keyframes bl-wr-fade-in{from{opacity:0}to{opacity:1}}
@keyframes bl-wr-fade-out{from{opacity:1}to{opacity:0}}
@keyframes bl-wr-flip-in{from{opacity:0;transform:rotateX(-90deg)}to{opacity:1;transform:rotateX(0)}}
@keyframes bl-wr-flip-out{from{opacity:1;transform:rotateX(0)}to{opacity:0;transform:rotateX(90deg)}}
[data-bl-wr]{display:inline-block;overflow:hidden;vertical-align:bottom;}
[data-bl-wr-word]{display:inline-block;}
`;

function toEasing(e?: string | number[]): string {
  if (!e) return "ease";
  return typeof e === "string" ? e : `cubic-bezier(${e.join(",")})`;
}

function prefersReduced(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function WordRotate({
  words,
  as,
  className,
  interval = 2500,
  transition = "slide",
  duration = 0.4,
  easing,
  pauseOnHover = false,
  loop = true,
  reducedMotion = "auto",
  onChange,
  style,
}: WordRotateProps) {
  const Tag = (as ?? "span") as ElementType;
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const paused = useRef(false);
  const skip =
    reducedMotion === "always" ||
    (reducedMotion === "auto" && prefersReduced());
  const ease = toEasing(easing);
  const dur = duration * 1000;

  useEffect(() => {
    if (skip || words.length <= 1) return;

    let timer: ReturnType<typeof setTimeout>;

    function schedule() {
      timer = setTimeout(() => {
        if (paused.current) { schedule(); return; }
        setPhase("out");
        setTimeout(() => {
          setIdx((prev) => {
            const next = (prev + 1) % words.length;
            if (next === 0 && !loop) return prev;
            onChange?.(next);
            return next;
          });
          setPhase("in");
          schedule();
        }, dur);
      }, interval);
    }

    schedule();
    return () => clearTimeout(timer);
  }, [skip, words.length, interval, loop]);

  const animIn =
    transition === "fade"
      ? "bl-wr-fade-in"
      : transition === "flip"
      ? "bl-wr-flip-in"
      : "bl-wr-slide-in";

  const animOut =
    transition === "fade"
      ? "bl-wr-fade-out"
      : transition === "flip"
      ? "bl-wr-flip-out"
      : "bl-wr-slide-out";

  return (
    <>
      <style>{STYLES}</style>
      <Tag
        className={className}
        data-bl-wr=""
        style={style}
        onMouseEnter={() => { if (pauseOnHover) paused.current = true; }}
        onMouseLeave={() => { if (pauseOnHover) paused.current = false; }}
      >
        <span
          data-bl-wr-word=""
          style={
            skip
              ? {}
              : {
                  animation: `${phase === "in" ? animIn : animOut} ${duration}s ${ease} forwards`,
                }
          }
        >
          {words[idx]}
        </span>
      </Tag>
    </>
  );
}
