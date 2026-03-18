import React from "react";

export interface StarRatingProps {
  value: number;
  max?: number;
  size?: number;
}

const STAR_PATH =
  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

export function StarRating({ value, max = 5, size = 14 }: StarRatingProps) {
  const uid = React.useId();
  const clamped = Math.min(Math.max(value, 0), max);
  const rounded = Math.round(clamped * 2) / 2;

  return (
    <div
      role="img"
      aria-label={`${rounded} étoile${rounded > 1 ? "s" : ""} sur ${max}`}
      style={{
        display: "inline-flex",
        gap: "var(--space-1)",
        alignItems: "center",
      }}
    >
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.floor(rounded);
        const half = !filled && i < rounded;
        const gradientId = `${uid}-half-star-${i}`;

        return (
          <svg
            key={i}
            aria-hidden="true"
            focusable="false"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            overflow="visible"
          >
            {half && (
              <defs>
                <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="50%" stopColor="var(--color-brand)" />
                  <stop
                    offset="50%"
                    stopColor="var(--color-surface-empty, #d1d5db)"
                  />
                </linearGradient>
              </defs>
            )}
            <path
              d={STAR_PATH}
              fill={
                filled
                  ? "var(--color-brand)"
                  : half
                  ? `url(#${gradientId})`
                  : "var(--color-surface-empty, #d1d5db)"
              }
              stroke={
                filled || half
                  ? "var(--color-brand)"
                  : "var(--color-surface-border, #e5e7eb)"
              }
              strokeWidth={0.75}
              strokeLinejoin="round"
            />
          </svg>
        );
      })}
    </div>
  );
}
