import React from "react";
import { HeadingProps } from "./Heading.type";

// Mapping for styling heading depending on the level
const heading_config: Record<
  1 | 2 | 3 | 4 | 5 | 6,
  {
    tag: React.ElementType;
    size: string;
    weight: string | number;
  }
> = {
    1: {
        tag: "h1",
        size: "var(--fontsize-5xl)",
        weight: "var(--fontweight-black)"
    },
    2: {
        tag: "h2",
        size: "var(--fontsize-4xl)",
        weight: "var(--fontweight-extrabold)"
    },
    3: {
        tag: "h3",
        size: "var(--fontsize-3xl)",
        weight: "var(--fontweight-bold)"
    },
    4: {
        tag: "h4",
        size: "var(--fontsize-2xl)",
        weight: "var(--fontweight-semibold)"
    },
    5: {
        tag: "h5",
        size: "var(--fontsize-xl)",
        weight: "var(--fontweight-bold)"
    },
    6: {
        tag: "h6",
        size: "var(--fontsize-lg)",
        weight: "var(--fontweight-medium)"
    }
};

export function Heading({
  title,
  level = 1,
  align = "left",
  opacity = 1,
  blurPx = 0,
  tone = "brand",
}: HeadingProps) {
  const { tag: Tag, size, weight } = heading_config[level];
  const safeOpacity = Math.min(Math.max(opacity, 0), 1);
  const safeBlur = Math.min(Math.max(blurPx, 0), 10);

  const toneColor =
    tone === "muted"
      ? "var(--color-muted)"
      : "var(--color-brand)";

  return (
    <Tag
      style={{
        textAlign: align,
        opacity: safeOpacity,
        filter: `blur(${safeBlur}px)`,
        margin: "var(--space-2)",
        fontSize: size, // Depending on level (heading_config)
        fontWeight: weight, // Depending on level (heading_config)
        color: toneColor,
      }}
    > 
      {title}
    </Tag>
  );
}
