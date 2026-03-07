import React from "react";
import { AnimatedStackProps } from "./AnimatedStack.type";

const stackStyles = `
  @keyframes bl-notifPop {
    0%   { opacity: 0; transform: translateY(-52px) scale(0.88); }
    60%  { opacity: 1; transform: translateY(5px) scale(1.02); }
    100% { opacity: 1; transform: translateY(0px) scale(1); }
  }
`;

export function AnimatedStack({
  items,
  className = "",
  itemClassName = "",
  maxVisible = 3,
  stackOffset = 10,
  scaleDecrement = 0.06,
  reducedMotion = "auto",
}: AnimatedStackProps) {
  const shouldReduceMotion =
    reducedMotion === "always" ||
    (reducedMotion === "auto" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  // Newest item = last in array = front of visual stack
  const visibleItems = items.slice(-maxVisible);
  const count = visibleItems.length;
  // Stable keys: offset by total items so new items always get a fresh key
  const startIdx = items.length - visibleItems.length;

  return (
    <>
      <style>{stackStyles}</style>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr" }}
        className={className}
      >
        {visibleItems.map((item, idx) => {
          // stackPos 0 = frontmost (newest), N = backmost (oldest)
          const stackPos = count - 1 - idx;
          const scale = 1 - stackPos * scaleDecrement;
          const translateY = stackPos * stackOffset;
          const isNew = stackPos === 0;

          return (
            <div
              key={startIdx + idx}
              style={{
                gridRow: 1,
                gridColumn: 1,
                zIndex: count - stackPos,
                transformOrigin: "top center",
                transform: `translateY(${translateY}px) scale(${scale})`,
                ...(shouldReduceMotion
                  ? {}
                  : {
                      transition: isNew
                        ? "none"
                        : "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                      animation: isNew
                        ? "bl-notifPop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) both"
                        : "none",
                    }),
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
