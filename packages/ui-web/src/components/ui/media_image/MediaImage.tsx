import React from "react";
import { MediaImageProps } from "./MediaImage.type";

export function MediaImage({
  src,
  alt,
  width,
  height,
  objectFit = "cover",
  borderRadius = "var(--radius-md)",
}: MediaImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        display: "block",
        maxWidth: "100%",
        width,
        height,
        objectFit,
        borderRadius,
      }}
    />
  );
}
