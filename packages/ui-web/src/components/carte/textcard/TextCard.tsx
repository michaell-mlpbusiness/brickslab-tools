import React from "react";
import { Text } from "../../typographie/text/Text";
import { TextCardProps } from "./Textcard.type";

export function TextCard({
  cardtitle,
  texte,
  variant = "default",
  opacity,
  blurPx,
  width,
  height,
}: TextCardProps) {

  // Valeurs finales calculées selon variant
  let bgOpacity = 0;
  let bgBlur = 0;

  switch (variant) {
    case "opaque":
      bgOpacity = opacity ?? 0.5;
      break;

    case "blurred":
      bgOpacity = opacity ?? 0.3; // léger fond sinon le blur ne se voit pas
      bgBlur = blurPx ?? 6;
      break;

    default:
      bgOpacity = 0;
      bgBlur = 0;
  }

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        borderRadius: "var(--radius-md)",
        padding: "var(--padding-sm)",
        overflow: "hidden",
      }}
      className="card-hover"
    >
      {/* Background layer uniquement si nécessaire */}
      {(bgOpacity > 0 || bgBlur > 0) && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--color-bg)",
            opacity: bgOpacity,
            backdropFilter: bgBlur ? `blur(${bgBlur}px)` : undefined,
            WebkitBackdropFilter: bgBlur ? `blur(${bgBlur}px)` : undefined,
            zIndex: 0,
          }}
        />
      )}

      {/* Content layer */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {cardtitle ? (
          <>
            <Text texte={cardtitle} variant="body-lg" align="center" tone="brand"/>
            <Text texte={texte} variant="body-md" align="center" tone="muted"/>
          </>
        ) : (
            <Text texte={texte} variant="body-md" align="center" tone="muted"/>
        )}
      </div>
    </div>
  );
}