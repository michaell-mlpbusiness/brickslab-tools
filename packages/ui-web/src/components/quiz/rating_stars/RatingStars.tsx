import React from "react";
import type { RatingStarsProps, RatingIcon } from "./RatingStars.type";

const styles = `
[data-bl-rating-stars] {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
[data-bl-rs-icon] {
  cursor: pointer;
  color: var(--c-border);
  transition: color 0.1s ease, transform 0.1s ease;
  user-select: none;
  line-height: 1;
}
[data-bl-rs-icon][data-active] {
  color: #F59E0B;
}
[data-bl-rs-icon][data-half] {
  position: relative;
}
[data-bl-rs-icon]:hover:not([data-disabled]) {
  transform: scale(1.15);
}
[data-bl-rs-icon][data-disabled] {
  cursor: not-allowed;
  opacity: 0.55;
}
`;

const ICONS: Record<RatingIcon, (filled: boolean) => React.ReactNode> = {
  star: (filled) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinejoin="round" />
    </svg>
  ),
  heart: (filled) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinejoin="round" />
    </svg>
  ),
  bolt: (filled) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  ),
};

export function RatingStars({
  value,
  onChange,
  max = 5,
  allowHalf = false,
  icon = "star",
  disabled = false,
}: RatingStarsProps) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  const display = hovered ?? value ?? 0;

  const handleClick = (idx: number, isHalf: boolean) => {
    if (disabled) return;
    onChange(isHalf ? idx - 0.5 : idx);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>, idx: number) => {
    if (!allowHalf) {
      setHovered(idx);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const half = e.clientX - rect.left < rect.width / 2;
    setHovered(half ? idx - 0.5 : idx);
  };

  return (
    <>
      <style>{styles}</style>
      <div
        data-bl-rating-stars
        role="radiogroup"
        aria-label={`Rating out of ${max}`}
        onMouseLeave={() => setHovered(null)}
      >
        {Array.from({ length: max }, (_, i) => {
          const idx = i + 1;
          const filled = display >= idx;
          const halfFilled = !filled && allowHalf && display >= idx - 0.5;
          return (
            <span
              key={idx}
              data-bl-rs-icon
              data-active={filled || halfFilled ? "" : undefined}
              data-disabled={disabled ? "" : undefined}
              role="radio"
              aria-checked={value === idx || (allowHalf && value === idx - 0.5)}
              aria-label={`${allowHalf && hovered === idx - 0.5 ? idx - 0.5 : idx} out of ${max}`}
              tabIndex={disabled ? -1 : 0}
              onMouseMove={(e) => !disabled && handleMouseMove(e, idx)}
              onClick={(e) => {
                if (disabled) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const half = allowHalf && e.clientX - rect.left < rect.width / 2;
                handleClick(idx, half);
              }}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !disabled) {
                  e.preventDefault();
                  onChange(idx);
                }
              }}
              style={{ color: filled || halfFilled ? "#F59E0B" : undefined }}
            >
              {ICONS[icon](filled)}
            </span>
          );
        })}
      </div>
    </>
  );
}
