import React, { useRef, useEffect, useState } from "react";
import type { NumberTickerProps } from "./NumberTicker.type";

function prefersReduced(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function fmt(
  n: number,
  decimalPlaces: number,
  locale: string | undefined,
  prefix: string,
  suffix: string,
  separator: boolean
): string {
  const rounded = parseFloat(n.toFixed(decimalPlaces));
  const formatted = separator
    ? new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(rounded)
    : rounded.toFixed(decimalPlaces);
  return `${prefix}${formatted}${suffix}`;
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  duration = 1.5,
  delay = 0,
  decimalPlaces = 0,
  locale,
  prefix = "",
  suffix = "",
  separator = false,
  startOnView = true,
  viewportMargin = "0px",
  reducedMotion = "auto",
  onComplete,
  ariaLabel,
  style,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(startValue);
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
      setCurrent(value);
      onComplete?.();
      return;
    }

    const from = direction === "down" ? value : startValue;
    const to = direction === "down" ? startValue : value;
    const startTs = performance.now() + delay * 1000;
    const durationMs = duration * 1000;
    let raf: number;

    function animate(now: number) {
      if (now < startTs) {
        raf = requestAnimationFrame(animate);
        return;
      }
      const elapsed = now - startTs;
      const t = Math.min(elapsed / durationMs, 1);
      setCurrent(from + (to - from) * easeOutCubic(t));
      if (t < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setCurrent(to);
        onComplete?.();
      }
    }

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [started, value, skip]);

  const label = fmt(current, decimalPlaces, locale, prefix, suffix, separator);

  return (
    <span
      ref={ref}
      aria-label={ariaLabel ?? label}
      style={{ display: "inline-block", fontVariantNumeric: "tabular-nums", ...style }}
    >
      {label}
    </span>
  );
}
