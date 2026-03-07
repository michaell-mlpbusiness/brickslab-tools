import React from "react";
import { BrandSloganProps } from "./BrandSlogan.type";

export function BrandSlogan({
  slogan = "Build faster. Ship smarter.",
  company = "BricksLab",
}: BrandSloganProps) {
  return (
    <div
      style={{
        fontFamily: "var(--font-brand), Montserrat, sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <span
        style={{
          color: "var(--color-brand)",
          fontWeight: 700,
          fontSize: "1em",
        }}
      >
        {company}
      </span>
      <span
        style={{
          color: "var(--color-muted)",
          fontSize: "0.85em",
        }}
      >
        {slogan}
      </span>
    </div>
  );
}
