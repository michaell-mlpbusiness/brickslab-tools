import React, { ElementType, useRef, useEffect, useState } from "react";
import type { NoiseRevealTextProps } from "./NoiseRevealText.type";

function prefersReduced(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const FILTER_ID = "bl-noise-reveal";

export function NoiseRevealText({
  children,
  as,
  className,
  duration = 1.2,
  intensity = 20,
  noiseScale = 0.05,
  direction = "left",
  startOnView = true,
  viewportMargin = "0px",
  reducedMotion = "auto",
  onComplete,
  style,
}: NoiseRevealTextProps) {
  const Tag = (as ?? "p") as ElementType;
  const ref = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(!startOnView);
  const skip =
    reducedMotion === "always" ||
    (reducedMotion === "auto" && prefersReduced());

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
    if (!started) return;
    if (skip) {
      setProgress(1);
      onComplete?.();
      return;
    }

    const startTs = performance.now();
    const durationMs = duration * 1000;
    let raf: number;

    function animate(now: number) {
      const t = Math.min((now - startTs) / durationMs, 1);
      setProgress(t);
      if (t < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    }

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [started, skip]);

  const displacement = (1 - progress) * intensity;
  const clipValues = {
    left: `inset(0 ${(1 - progress) * 100}% 0 0)`,
    right: `inset(0 0 0 ${(1 - progress) * 100}%)`,
    up: `inset(0 0 ${(1 - progress) * 100}% 0)`,
    down: `inset(${(1 - progress) * 100}% 0 0 0)`,
  };

  const uid = `${FILTER_ID}-${direction}`;

  return (
    <Tag
      className={className}
      style={{ position: "relative", display: "inline-block", ...style }}
    >
      <svg
        aria-hidden
        style={{ position: "absolute", width: 0, height: 0 }}
      >
        <defs>
          <filter id={uid}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency={noiseScale}
              numOctaves={3}
              seed={2}
            />
            <feDisplacementMap
              in="SourceGraphic"
              scale={skip ? 0 : displacement}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <span
        ref={ref}
        aria-label={children}
        style={{
          display: "inline-block",
          filter: skip ? undefined : `url(#${uid})`,
          clipPath: skip ? undefined : clipValues[direction],
        }}
      >
        <span aria-hidden>{children}</span>
      </span>
    </Tag>
  );
}
