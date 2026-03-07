import React from "react";
import { MediaCarouselProps } from "./MediaCarousel.type";

export function MediaCarousel({
  items,
  currentIndex,
  onNext,
  onPrev,
  showDots,
}: MediaCarouselProps) {
  const currentItem = items[currentIndex];

  const buttonStyle: React.CSSProperties = {
    background: "rgba(0,0,0,0.5)",
    color: "white",
    border: "none",
    borderRadius: "var(--radius-sm)",
    padding: "var(--space-2) var(--space-3)",
    fontSize: "var(--fontsize-lg)",
    cursor: "pointer",
  };

  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: "var(--radius-md)" }}>
      {currentItem && (
        <img
          src={currentItem.src}
          alt={currentItem.alt}
          style={{ width: "100%", objectFit: "cover", display: "block" }}
        />
      )}
      <button
        onClick={onPrev}
        aria-label="Previous"
        style={{
          ...buttonStyle,
          position: "absolute",
          left: "var(--space-3)",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        ‹
      </button>
      <button
        onClick={onNext}
        aria-label="Next"
        style={{
          ...buttonStyle,
          position: "absolute",
          right: "var(--space-3)",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        ›
      </button>
      {currentItem?.caption && (
        <div
          style={{
            fontSize: "var(--fontsize-xs)",
            color: "var(--color-muted)",
            textAlign: "center",
            padding: "var(--space-2) 0",
          }}
        >
          {currentItem.caption}
        </div>
      )}
      {showDots && items.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "var(--space-2)",
            padding: "var(--space-3) 0 var(--space-1)",
          }}
        >
          {items.map((_, index) => (
            <div
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: index === currentIndex ? "var(--color-brand)" : "var(--c-border)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
