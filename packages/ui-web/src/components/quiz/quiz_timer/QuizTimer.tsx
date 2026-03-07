import React from "react";
import type { QuizTimerProps } from "./QuizTimer.type";

const styles = `
[data-bl-quiz-timer] {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: var(--c-surface);
  font-size: var(--fontsize-sm);
  font-weight: var(--fontweight-semibold);
  color: var(--color-fg);
  font-variant-numeric: tabular-nums;
  transition: border-color 0.2s ease, color 0.2s ease;
}
[data-bl-quiz-timer][data-warn] {
  border-color: #F59E0B;
  color: #F59E0B;
}
[data-bl-quiz-timer][data-expired] {
  border-color: #CC4A48;
  color: #CC4A48;
}
[data-bl-qt-icon] {
  flex-shrink: 0;
  opacity: 0.7;
}
[data-bl-qt-mode] {
  font-size: var(--fontsize-xs);
  font-weight: 400;
  color: var(--color-muted);
  margin-left: 2px;
}
`;

function fmt(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function QuizTimer({
  durationSec,
  mode = "total",
  onExpire = "warn",
  onExpireAction,
  warnAtSec,
}: QuizTimerProps) {
  const [remaining, setRemaining] = React.useState(durationSec);
  const [expired, setExpired] = React.useState(false);

  React.useEffect(() => {
    setRemaining(durationSec);
    setExpired(false);
  }, [durationSec]);

  React.useEffect(() => {
    if (expired) return;
    if (remaining <= 0) {
      setExpired(true);
      onExpireAction?.();
      return;
    }
    const id = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(id);
  }, [remaining, expired]);

  const warnThreshold = warnAtSec ?? Math.floor(durationSec * 0.2);
  const isWarn = !expired && remaining <= warnThreshold;

  return (
    <>
      <style>{styles}</style>
      <div
        data-bl-quiz-timer
        data-warn={isWarn && !expired ? "" : undefined}
        data-expired={expired ? "" : undefined}
        role="timer"
        aria-live="polite"
        aria-label={`Time remaining: ${fmt(remaining)}`}
      >
        <svg data-bl-qt-icon width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M7 4.5V7l1.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        {expired ? "00:00" : fmt(remaining)}
        {mode === "section" && <span data-bl-qt-mode>section</span>}
      </div>
    </>
  );
}
