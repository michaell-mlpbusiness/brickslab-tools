import React from "react";
import { SectionGalleryProps } from "./SectionGallery.type";

export function SectionGallery({ title, items, columns, gap }: SectionGalleryProps) {
  return (
    <div>
      {title && (
        <div
          style={{
            fontSize: "var(--fontsize-2xl)",
            fontWeight: "var(--fontweight-bold)",
            color: "var(--color-fg)",
            marginBottom: 20,
          }}
        >
          {title}
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns ?? 3}, 1fr)`,
          gap: gap ?? 20,
        }}
      >
        {items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
}
