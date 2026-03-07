import React, { ElementType, useRef, useEffect, useState } from "react";
import type { TypingAnimationProps } from "./TypingAnimation.type";

const STYLES = `
@keyframes bl-typing-blink{0%,100%{opacity:1}50%{opacity:0}}
[data-bl-cursor]{display:inline-block;animation:bl-typing-blink var(--bl-cursor-speed,0.7s) step-end infinite;}
`;

function prefersReduced(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function TypingAnimation({
  text,
  words,
  as,
  className,
  typeSpeed = 60,
  deleteSpeed = 40,
  startDelay = 0,
  wordPause = 1500,
  loop = false,
  loopDelay = 500,
  showCursor = true,
  cursor = "line",
  cursorBlinkSpeed = 0.7,
  startOnView = false,
  viewportMargin = "0px",
  reducedMotion = "auto",
  onWordChange,
  onComplete,
  ariaLabel,
  style,
}: TypingAnimationProps) {
  const Tag = (as ?? "p") as ElementType;
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("");
  const [started, setStarted] = useState(!startOnView);
  const skip =
    reducedMotion === "always" ||
    (reducedMotion === "auto" && prefersReduced());

  const wordList = words ?? (text ? [text] : []);

  useEffect(() => {
    if (!startOnView) {
      setStarted(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { rootMargin: viewportMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [startOnView, viewportMargin]);

  useEffect(() => {
    if (!started || wordList.length === 0) return;
    if (skip) {
      setDisplay(wordList[wordList.length - 1]);
      return;
    }

    let wordIdx = 0;
    let charIdx = 0;
    let phase: "typing" | "pausing" | "deleting" = "typing";
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const currentWord = wordList[wordIdx];
      if (phase === "typing") {
        charIdx++;
        setDisplay(currentWord.slice(0, charIdx));
        if (charIdx === currentWord.length) {
          phase = "pausing";
          timer = setTimeout(tick, wordPause);
          return;
        }
        timer = setTimeout(tick, typeSpeed);
      } else if (phase === "pausing") {
        const isLast = wordIdx === wordList.length - 1;
        if (isLast && !loop) {
          onComplete?.();
          return;
        }
        phase = "deleting";
        timer = setTimeout(tick, deleteSpeed);
      } else {
        charIdx--;
        setDisplay(currentWord.slice(0, charIdx));
        if (charIdx === 0) {
          wordIdx = (wordIdx + 1) % wordList.length;
          onWordChange?.(wordIdx);
          phase = "typing";
          timer = setTimeout(tick, loopDelay);
          return;
        }
        timer = setTimeout(tick, deleteSpeed);
      }
    }

    timer = setTimeout(tick, startDelay);
    return () => clearTimeout(timer);
  }, [started, skip]);

  const cursorChar = cursor === "line" ? "|" : cursor === "block" ? "█" : "_";

  return (
    <>
      <style>{STYLES}</style>
      <Tag
        className={className}
        aria-label={ariaLabel ?? display}
        style={{ display: "inline-block", ...style }}
      >
        <span ref={ref} aria-hidden>
          {display}
        </span>
        {showCursor && (
          <span
            data-bl-cursor=""
            aria-hidden
            style={
              {
                "--bl-cursor-speed": `${cursorBlinkSpeed}s`,
                marginLeft: "1px",
              } as React.CSSProperties
            }
          >
            {cursorChar}
          </span>
        )}
      </Tag>
    </>
  );
}
