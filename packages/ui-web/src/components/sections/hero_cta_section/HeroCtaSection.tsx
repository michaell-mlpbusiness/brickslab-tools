import React from "react";
import { HeroCtaSectionProps } from "./HeroCtaSection.type";

// ─── Couche background video ──────────────────────────────────────────────────
function BgVideo({ src, poster }: { src: string; poster?: string }) {
  return (
    <video
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 0,
      }}
    />
  );
}

// ─── Couche background image ──────────────────────────────────────────────────
function BgImage({ src, alt }: { src: string; alt?: string }) {
  return (
    <div
      role="img"
      aria-label={alt ?? ""}
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 0,
      }}
    />
  );
}

// ─── Overlay de lisibilité ────────────────────────────────────────────────────
function Overlay({
  opacity,
  color,
}: {
  opacity: number;
  color: string;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: color,
        opacity,
        zIndex: 1,
      }}
    />
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────
export function HeroCtaSection({
  bg = "simple",
  src,
  alt,
  videoPoster,
  overlayOpacity = 0.45,
  overlayColor = "#000000",
  title,
  subtitle,
  ctaLabel,
  onCtaClick,
  secondaryLabel,
  onSecondaryClick,
  align,
  hoverEffect = false,
}: HeroCtaSectionProps) {
  const hasMedia = bg === "video" || bg === "image";

  // Couleurs du texte adaptées au fond
  const fgColor = hasMedia ? "#ffffff" : "var(--color-fg)";
  const mutedColor = hasMedia ? "rgba(255,255,255,0.75)" : "var(--color-muted)";

  const primaryBase: React.CSSProperties = {
    padding: "12px 28px",
    fontSize: 15,
    fontWeight: 600,
    background: "var(--color-brand)",
    color: "white",
    border: "none",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
  };

  const secondaryBase: React.CSSProperties = {
    padding: "12px 28px",
    fontSize: 15,
    fontWeight: 600,
    background: "transparent",
    color: fgColor,
    border: `1px solid ${hasMedia ? "rgba(255,255,255,0.5)" : "var(--c-border)"}`,
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
  };

  return (
    <section
      style={{
        position: "relative",
        padding: "80px 24px",
        textAlign: align ?? "center",
        overflow: "hidden",
      }}
    >
      {/* ── Couches media (conditionnelles) ── */}
      {bg === "video" && src && (
        <BgVideo src={src} poster={videoPoster} />
      )}
      {bg === "image" && src && (
        <BgImage src={src} alt={alt} />
      )}
      {hasMedia && (
        <Overlay opacity={overlayOpacity} color={overlayColor} />
      )}

      {/* ── Contenu (z-index au-dessus de l'overlay) ── */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <h1
          style={{
            fontSize: "var(--fontsize-5xl)",
            fontWeight: "var(--fontweight-black)",
            color: fgColor,
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            style={{
              fontSize: "var(--fontsize-2xl)",
              color: mutedColor,
              marginTop: 16,
              marginBottom: 0,
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>
        )}

        {(ctaLabel || secondaryLabel) && (
          <div
            style={{
              marginTop: 32,
              display: "inline-flex",
              gap: 12,
              flexWrap: "wrap",
              justifyContent:
                align === "left" ? "flex-start" : "center",
            }}
          >
            {ctaLabel && (
              <button
                onClick={onCtaClick}
                style={{
                  ...primaryBase,
                  ...(hoverEffect ? { transition: "filter 0.2s" } : {}),
                }}
                {...(hoverEffect
                  ? {
                      onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.filter = "brightness(0.9)";
                      },
                      onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.filter = "brightness(1)";
                      },
                    }
                  : {})}
              >
                {ctaLabel}
              </button>
            )}

            {secondaryLabel && (
              <button
                onClick={onSecondaryClick}
                style={{
                  ...secondaryBase,
                  ...(hoverEffect
                    ? { transition: "opacity 0.2s" }
                    : {}),
                }}
                {...(hoverEffect
                  ? {
                      onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.opacity = "0.8";
                      },
                      onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.opacity = "1";
                      },
                    }
                  : {})}
              >
                {secondaryLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}