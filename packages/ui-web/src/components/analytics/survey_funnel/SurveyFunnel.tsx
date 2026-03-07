import React from "react";
import type { SurveyFunnelProps } from "./SurveyFunnel.type";

const styles = `
[data-bl-survey-funnel] {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
[data-bl-sf-row] {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
[data-bl-sf-meta] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
[data-bl-sf-label] {
  font-size: var(--fontsize-sm);
  color: var(--color-fg);
  font-weight: var(--fontweight-medium);
}
[data-bl-sf-stats] {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
[data-bl-sf-count] {
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
  font-variant-numeric: tabular-nums;
}
[data-bl-sf-rate] {
  font-size: var(--fontsize-xs);
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 999px;
}
[data-bl-sf-track] {
  height: 8px;
  border-radius: 4px;
  background: var(--c-border);
  overflow: hidden;
  position: relative;
}
[data-bl-sf-fill-started] {
  position: absolute;
  top: 0; left: 0; bottom: 0;
  border-radius: 4px;
  background: color-mix(in srgb, var(--color-brand) 30%, transparent);
  transition: width 0.4s ease;
}
[data-bl-sf-fill-completed] {
  position: absolute;
  top: 0; left: 0; bottom: 0;
  border-radius: 4px;
  background: var(--color-brand);
  transition: width 0.4s ease;
}
[data-bl-sf-drop] {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 0 4px 0;
  font-size: 10px;
  color: var(--color-muted);
}
[data-bl-sf-drop-line] {
  flex: 1;
  height: 1px;
  background: var(--c-border);
  border-style: dashed;
}

/* Step mode */
[data-bl-survey-funnel][data-mode="step"] {
  flex-direction: row;
  align-items: flex-end;
  gap: 0;
}
[data-bl-sf-step-col] {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
[data-bl-sf-step-bar] {
  width: 100%;
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  background: var(--color-brand);
  transition: height 0.4s ease;
  min-height: 4px;
}
[data-bl-sf-step-label] {
  font-size: 10px;
  color: var(--color-muted);
  text-align: center;
  max-width: 80px;
  line-height: 1.3;
}
[data-bl-sf-step-count] {
  font-size: var(--fontsize-xs);
  font-weight: 700;
  color: var(--color-fg);
}
`;

function rateColor(rate: number): string {
  if (rate >= 0.75) return "#4ADE80";
  if (rate >= 0.5) return "#F59E0B";
  return "#CC4A48";
}

export function SurveyFunnel({ steps, mode = "bar", showRates = true }: SurveyFunnelProps) {
  const maxStarted = Math.max(...steps.map((s) => s.started), 1);

  if (mode === "step") {
    const maxVal = maxStarted;
    const BAR_MAX_H = 160;
    return (
      <>
        <style>{styles}</style>
        <div data-bl-survey-funnel data-mode="step">
          {steps.map((step) => {
            const h = Math.round((step.completed / maxVal) * BAR_MAX_H);
            const rate = step.started > 0 ? step.completed / step.started : 0;
            const color = rateColor(rate);
            return (
              <div key={step.id} data-bl-sf-step-col>
                <span data-bl-sf-step-count>{step.completed.toLocaleString()}</span>
                {showRates && (
                  <span style={{ fontSize: 10, fontWeight: 700, color }}>{Math.round(rate * 100)}%</span>
                )}
                <div data-bl-sf-step-bar style={{ height: h, background: color }} />
                <span data-bl-sf-step-label>{step.label}</span>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div data-bl-survey-funnel>
        {steps.map((step, idx) => {
          const startedPct = (step.started / maxStarted) * 100;
          const completedPct = (step.completed / maxStarted) * 100;
          const rate = step.started > 0 ? step.completed / step.started : 0;
          const color = rateColor(rate);
          const prevCompleted = idx > 0 ? steps[idx - 1].completed : step.started;
          const dropOff = prevCompleted - step.started;

          return (
            <React.Fragment key={step.id}>
              {idx > 0 && dropOff > 0 && (
                <div data-bl-sf-drop>
                  <div data-bl-sf-drop-line />
                  <span>↓ {dropOff.toLocaleString()} dropped</span>
                  <div data-bl-sf-drop-line />
                </div>
              )}
              <div data-bl-sf-row>
                <div data-bl-sf-meta>
                  <span data-bl-sf-label>{step.label}</span>
                  <div data-bl-sf-stats>
                    <span data-bl-sf-count>{step.completed.toLocaleString()} / {step.started.toLocaleString()}</span>
                    {showRates && (
                      <span data-bl-sf-rate style={{ color, background: `color-mix(in srgb, ${color} 12%, transparent)` }}>
                        {Math.round(rate * 100)}%
                      </span>
                    )}
                  </div>
                </div>
                <div data-bl-sf-track>
                  <div data-bl-sf-fill-started style={{ width: `${startedPct}%` }} />
                  <div data-bl-sf-fill-completed style={{ width: `${completedPct}%` }} />
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}
