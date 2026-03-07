import React from "react";
import { CarouselWithTextSectionProps } from "./CarouselWithTextSection.type";

export function CarouselWithTextSection({
  title,
  description,
  carousel,
  actions,
  imageLeft,
  variant = 'default',
}: CarouselWithTextSectionProps) {
  if (variant === 'overlay') {
    return (
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: 400,
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: imageLeft ? "flex-end" : "flex-start",
        }}
      >
        {/* Carousel background */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
          {carousel}
        </div>

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: imageLeft
              ? "linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.6) 100%)"
              : "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, transparent 50%)",
          }}
        />

        {/* Text content overlay */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 480,
            padding: "var(--space-15) var(--space-10)",
            color: "white",
            textAlign: imageLeft ? "right" : "left",
          }}
        >
          <h2
            style={{
              fontSize: "var(--fontsize-3xl)",
              fontWeight: "var(--fontweight-bold)",
              color: "white",
              margin: 0,
            }}
          >
            {title}
          </h2>
          {description && (
            <p
              style={{
                fontSize: "var(--fontsize-xl)",
                color: "rgba(255, 255, 255, 0.9)",
                lineHeight: 1.65,
                marginTop: "var(--space-3)",
                marginBottom: 0,
              }}
            >
              {description}
            </p>
          )}
          {actions && <div style={{ marginTop: "var(--space-6)" }}>{actions}</div>}
        </div>
      </section>
    );
  }

  // Default layout
  return (
    <section style={{ padding: "var(--space-15) var(--space-6)" }}>
      <div
        style={{
          display: "flex",
          gap: "var(--space-12)",
          alignItems: "center",
          flexDirection: imageLeft ? "row" : "row-reverse",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>{carousel}</div>
        <div style={{ flex: 1, maxWidth: 480 }}>
          <h2
            style={{
              fontSize: "var(--fontsize-3xl)",
              fontWeight: "var(--fontweight-bold)",
              color: "var(--color-fg)",
              margin: 0,
            }}
          >
            {title}
          </h2>
          {description && (
            <p
              style={{
                fontSize: "var(--fontsize-xl)",
                color: "var(--color-muted)",
                lineHeight: 1.65,
                marginTop: "var(--space-3)",
                marginBottom: 0,
              }}
            >
              {description}
            </p>
          )}
          {actions && <div style={{ marginTop: "var(--space-6)" }}>{actions}</div>}
        </div>
      </div>
    </section>
  );
}
