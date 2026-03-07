import React, { useState, useEffect } from "react";
import { AnimatedListProps } from "./AnimatedList.type";

const animationStyles = `
  @keyframes bl-slideInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes bl-slideInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  [data-bl-animated-item] {
    opacity: 0;
    animation-fill-mode: forwards;
    will-change: opacity, transform;
  }
`;

export function AnimatedList({
  items,
  className = "",
  itemClassName = "",
  delay = 0,
  stagger = 150,
  duration = 600,
  direction = "up",
  loop = false,
  loopDelay = 2000,
  maxVisible,
  reducedMotion = "auto",
  onCycle,
}: AnimatedListProps) {
  const shouldReduceMotion =
    reducedMotion === "always" ||
    (reducedMotion === "auto" && typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  const visibleItems = maxVisible ? items.slice(0, maxVisible) : items;
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    if (!loop || shouldReduceMotion) return;
    const totalAnimationMs = delay + (visibleItems.length - 1) * stagger + duration;
    const cycleDuration = totalAnimationMs + loopDelay;
    const t = setTimeout(() => {
      setCycleKey((k) => k + 1);
      onCycle?.();
    }, cycleDuration);
    return () => clearTimeout(t);
  }, [loop, cycleKey, shouldReduceMotion, delay, stagger, duration, loopDelay, visibleItems.length, onCycle]);

  return (
    <>
      <style>{animationStyles}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }} className={className}>
        {visibleItems.map((item, index) => {
          const itemDelay = delay + index * stagger;
          const animationName = direction === "up" ? "bl-slideInUp" : "bl-slideInDown";

          return (
            <div
              key={`${cycleKey}-${index}`}
              data-bl-animated-item
              style={shouldReduceMotion ? {} : {
                animation: `${animationName} ${duration}ms ease-out forwards`,
                animationDelay: `${itemDelay}ms`,
              }}
              className={itemClassName}
            >
              {item}
            </div>
          );
        })}
      </div>
    </>
  );
}
