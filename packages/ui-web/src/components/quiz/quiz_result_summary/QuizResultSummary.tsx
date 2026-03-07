import React from "react";
import type { QuizResultSummaryProps } from "./QuizResultSummary.type";

const styles = `
[data-bl-quiz-result] {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-md);
  background: var(--c-surface);
}
[data-bl-qr-score-row] {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}
[data-bl-qr-ring] {
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
[data-bl-qr-ring-label] {
  position: absolute;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-fg);
  text-align: center;
  line-height: 1.2;
}
[data-bl-qr-ring-pct] {
  font-size: 18px;
  font-weight: 800;
  display: block;
}
[data-bl-qr-score-info] {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
[data-bl-qr-score-main] {
  font-size: var(--fontsize-xl);
  font-weight: 800;
  color: var(--color-fg);
  line-height: 1;
}
[data-bl-qr-score-sub] {
  font-size: var(--fontsize-sm);
  color: var(--color-muted);
}
[data-bl-qr-time] {
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}
[data-bl-qr-badges] {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
[data-bl-qr-badge] {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border: 1.5px solid var(--c-brand-border);
  border-radius: 999px;
  background: var(--c-brand-subtle);
  font-size: var(--fontsize-xs);
  font-weight: var(--fontweight-semibold);
  color: var(--color-brand);
}
[data-bl-qr-recs] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
[data-bl-qr-rec] {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 14px;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: var(--c-surface-elevated);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s ease;
}
[data-bl-qr-rec]:hover {
  border-color: var(--color-brand);
}
[data-bl-qr-rec-label] {
  font-size: var(--fontsize-sm);
  font-weight: var(--fontweight-medium);
  color: var(--color-fg);
}
[data-bl-qr-rec-desc] {
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
}
[data-bl-qr-section-title] {
  font-size: var(--fontsize-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-muted);
  opacity: 0.7;
}
[data-bl-qr-retake] {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-fg);
  font-size: var(--fontsize-sm);
  font-weight: var(--fontweight-medium);
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;
  align-self: flex-start;
}
[data-bl-qr-retake]:hover {
  border-color: var(--color-brand);
  background: var(--c-brand-subtle);
}
`;

const RING_SIZE = 72;
const STROKE = 5;
const R = (RING_SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * R;

function fmtTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

export function QuizResultSummary({
  result,
  variant = "compact",
  onRetake,
}: QuizResultSummaryProps) {
  const pct = result.percent ?? (result.maxScore && result.score !== undefined
    ? Math.round((result.score / result.maxScore) * 100)
    : undefined);
  const offset = pct !== undefined ? CIRC * (1 - pct / 100) : CIRC;

  return (
    <>
      <style>{styles}</style>
      <div data-bl-quiz-result>
        {/* Score */}
        <div data-bl-qr-score-row>
          {pct !== undefined && (
            <div data-bl-qr-ring>
              <svg width={RING_SIZE} height={RING_SIZE}>
                <circle cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={R} fill="none" stroke="var(--c-border)" strokeWidth={STROKE} />
                <circle
                  cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={R}
                  fill="none"
                  stroke={pct >= 70 ? "#4ADE80" : pct >= 40 ? "#F59E0B" : "#CC4A48"}
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={offset}
                  transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
                />
              </svg>
              <div data-bl-qr-ring-label>
                <span data-bl-qr-ring-pct>{pct}%</span>
              </div>
            </div>
          )}
          <div data-bl-qr-score-info>
            {result.score !== undefined && (
              <div data-bl-qr-score-main>
                {result.score}{result.maxScore !== undefined ? `/${result.maxScore}` : ""} pts
              </div>
            )}
            {result.timeSpent !== undefined && (
              <div data-bl-qr-time>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M6 3.5V6l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                Completed in {fmtTime(result.timeSpent)}
              </div>
            )}
            {result.completedAt && (
              <div data-bl-qr-score-sub>
                {new Date(result.completedAt).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>

        {/* Badges */}
        {result.badges && result.badges.length > 0 && (
          <div>
            <div data-bl-qr-section-title style={{ marginBottom: 8 }}>Achievements</div>
            <div data-bl-qr-badges>
              {result.badges.map((b) => (
                <div key={b.id} data-bl-qr-badge>
                  {b.icon && <span>{b.icon}</span>}
                  {b.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations — detailed only */}
        {variant === "detailed" && result.recommendations && result.recommendations.length > 0 && (
          <div>
            <div data-bl-qr-section-title style={{ marginBottom: 8 }}>Recommendations</div>
            <div data-bl-qr-recs>
              {result.recommendations.map((rec, i) => (
                rec.href ? (
                  <a key={i} data-bl-qr-rec href={rec.href} target="_blank" rel="noopener noreferrer">
                    <span data-bl-qr-rec-label>{rec.label}</span>
                    {rec.description && <span data-bl-qr-rec-desc>{rec.description}</span>}
                  </a>
                ) : (
                  <div key={i} data-bl-qr-rec>
                    <span data-bl-qr-rec-label>{rec.label}</span>
                    {rec.description && <span data-bl-qr-rec-desc>{rec.description}</span>}
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {onRetake && (
          <button data-bl-qr-retake onClick={onRetake}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5A4.5 4.5 0 1 1 6.5 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M2 3.5v3h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Retake quiz
          </button>
        )}
      </div>
    </>
  );
}
