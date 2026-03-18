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
  imageUrl,
  imageAlt = "",
}: TextCardProps) {

  // --- Variante bgImg ---
  if (variant === "bgImg") {
    return (
      /*
       * article : semantique de contenu autonome
       * tabIndex={0} : rend la carte focusable au clavier -> declenche :focus-within
       * aria-label : expose le contenu textuel aux lecteurs d'ecran
       *              (le contenu visuel etant cache par defaut)
       */
      <article
        className="cardBgImg"
        style={{ width, height }}
        tabIndex={0}
        aria-label={[cardtitle, texte].filter(Boolean).join(" - ")}
      >
        {imageUrl && (
          /*
           * alt="" : image decorative, le sens est porte par aria-label
           * aria-hidden="true" : evite la double lecture par les AT
           */
          <img
            src={imageUrl}
            alt={imageAlt}
            aria-hidden="true"
            className="bgImage"
          />
        )}

        {/*
         * aria-hidden="true" : le contenu est deja expose via aria-label sur l'article
         * Evite la double lecture (aria-label + contenu DOM)
         */}
        <div className="overlay" aria-hidden="true">
          <div className="overlayContent">
            {cardtitle && (
              <Text texte={cardtitle} variant="body-md" align="center" tone="default" />
            )}
            <Text texte={texte} variant="body-sm" align="center" tone="muted" />
          </div>
        </div>
      </article>
    );
  }

  // --- Variantes existantes inchangees (default, opaque, blurred) ---
  let bgOpacity = 0;
  let bgBlur = 0;

  switch (variant) {
    case "opaque":
      bgOpacity = opacity ?? 0.5;
      break;
    case "blurred":
      bgOpacity = opacity ?? 0.3;
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
      <div style={{ position: "relative", zIndex: 1 }}>
        {cardtitle ? (
          <>
            <Text texte={cardtitle} variant="body-md" align="center" tone="default" />
            <Text texte={texte} variant="body-sm" align="center" tone="muted" />
          </>
        ) : (
          <Text texte={texte} variant="body-sm" align="center" tone="muted" />
        )}
      </div>
    </div>
  );
}