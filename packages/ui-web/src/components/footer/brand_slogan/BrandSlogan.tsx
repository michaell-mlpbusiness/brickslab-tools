import { BrandSloganProps } from "./BrandSlogan.type";
import React from "react";
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
          fontWeight: "var(--fontweight-light)",
          fontSize: "var(--fontsize-medium)",
        }}
      >
        {company}
      </span>
      <span
        style={{
          color: "var(--color-muted)",
          fontSize: "var(--fontsize-sm)",
        }}
      >
        {slogan}
      </span>
    </div>
  );
}
