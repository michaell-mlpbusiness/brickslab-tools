import React from "react";
import { SocialPostCardProps } from "./SocialPostCard.type";

const cardStyles = `
  [data-bl-social-card] {
    transition: all 0.3s ease;
  }
  [data-bl-social-card][data-variant="glass"] {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  [data-bl-social-card][data-variant="solid"] {
    background: var(--c-surface);
    border: 1px solid var(--c-border);
  }
  [data-bl-social-card]:hover {
    transform: translateY(-2px);
  }
`;

export function SocialPostCard({
  platform = "custom",
  author,
  content,
  date,
  media = [],
  metrics,
  href,
  className = "",
  variant = "solid",
  reducedMotion = "auto",
}: SocialPostCardProps) {
  const shouldReduceMotion =
    reducedMotion === "always" ||
    (reducedMotion === "auto" && typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  const Component = href ? "a" : "div";
  const platformIcons: Record<string, string> = {
    x: "𝕏",
    linkedin: "in",
    custom: "◆",
  };

  const dateStr = date
    ? typeof date === "string"
      ? date
      : date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : undefined;

  return (
    <>
      <style>{cardStyles}</style>
      <Component
        data-bl-social-card
        data-variant={variant}
        href={href}
        style={{
          display: "block",
          padding: "var(--space-4)",
          borderRadius: "var(--radius-md)",
          cursor: href ? "pointer" : "default",
          textDecoration: "none",
          color: "inherit",
          ...(shouldReduceMotion ? { transition: "none" } : {}),
        }}
        className={className}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "var(--space-3)", gap: "var(--space-3)" }}>
          {author.avatarUrl && (
            <img
              src={author.avatarUrl}
              alt={author.name}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              <strong style={{ color: "var(--color-fg)", fontSize: "var(--fontsize-sm)" }}>{author.name}</strong>
              {author.handle && (
                <span style={{ color: "var(--color-muted)", fontSize: "var(--fontsize-xs)" }}>@{author.handle}</span>
              )}
            </div>
            {dateStr && (
              <span style={{ color: "var(--color-muted)", fontSize: "var(--fontsize-xs)", display: "block", marginTop: "var(--space-1)" }}>
                {dateStr}
              </span>
            )}
          </div>
          <span style={{ color: "var(--color-muted)", fontSize: "var(--fontsize-sm)" }}>{platformIcons[platform]}</span>
        </div>

        {/* Content */}
        <p
          style={{
            margin: "0 0 var(--space-3) 0",
            fontSize: "var(--fontsize-sm)",
            lineHeight: 1.6,
            color: "var(--color-fg)",
            wordBreak: "break-word",
          }}
        >
          {content}
        </p>

        {/* Media */}
        {media.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: media.length === 1 ? "1fr" : "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "var(--space-2)",
              marginBottom: "var(--space-3)",
              borderRadius: "var(--radius-sm)",
              overflow: "hidden",
            }}
          >
            {media.map((m, i) => (
              <div
                key={i}
                style={{
                  aspectRatio: "16 / 9",
                  backgroundColor: "var(--c-surface)",
                  borderRadius: "var(--radius-sm)",
                  overflow: "hidden",
                }}
              >
                {m.type === "image" && (
                  <img
                    src={m.src}
                    alt={m.alt || "Media"}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                )}
                {m.type === "video" && (
                  <video
                    src={m.src}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    controls
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Metrics */}
        {metrics && (
          <div
            style={{
              display: "flex",
              gap: "var(--space-4)",
              paddingTop: "var(--space-3)",
              borderTop: "1px solid var(--c-border)",
              fontSize: "var(--fontsize-xs)",
              color: "var(--color-muted)",
            }}
          >
            {metrics.replies !== undefined && (
              <span>
                <strong>{metrics.replies}</strong> replies
              </span>
            )}
            {metrics.reposts !== undefined && (
              <span>
                <strong>{metrics.reposts}</strong> reposts
              </span>
            )}
            {metrics.likes !== undefined && (
              <span>
                <strong>{metrics.likes}</strong> likes
              </span>
            )}
          </div>
        )}
      </Component>
    </>
  );
}
