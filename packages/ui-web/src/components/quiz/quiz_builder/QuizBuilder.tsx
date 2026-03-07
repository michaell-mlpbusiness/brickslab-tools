import React from "react";
import type { QuizBuilderProps, QuizBuilderMode } from "./QuizBuilder.type";
import type { QuizSchema, QuizSectionSchema, Question, QuestionType } from "../quiz.types";

const builderStyles = `
[data-bl-quiz-builder] {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  font-family: inherit;
}
[data-bl-qb-toolbar] {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--c-border);
  background: var(--c-surface-elevated);
  flex-shrink: 0;
}
[data-bl-qb-title-input] {
  flex: 1;
  border: none;
  background: transparent;
  font-size: var(--fontsize-md);
  font-weight: var(--fontweight-semibold);
  color: var(--color-fg);
  font-family: inherit;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  transition: background 0.15s ease;
  min-width: 0;
}
[data-bl-qb-title-input]:hover,
[data-bl-qb-title-input]:focus {
  background: var(--c-surface);
  outline: none;
}
[data-bl-qb-mode-tabs] {
  display: flex;
  gap: 2px;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);
  padding: 2px;
}
[data-bl-qb-mode-tab] {
  padding: 4px 12px;
  border: none;
  border-radius: calc(var(--radius-sm) - 1px);
  background: transparent;
  color: var(--color-muted);
  font-size: var(--fontsize-xs);
  font-weight: var(--fontweight-medium);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
  font-family: inherit;
}
[data-bl-qb-mode-tab][data-active] {
  background: var(--color-brand);
  color: #FBFBFB;
}
[data-bl-qb-body] {
  display: flex;
  flex: 1;
  overflow: hidden;
}
[data-bl-qb-panel] {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
[data-bl-qb-panel][data-side="right"] {
  border-left: 1px solid var(--c-border);
  background: color-mix(in srgb, var(--c-surface-elevated) 40%, transparent);
}
[data-bl-qb-section] {
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-md);
  background: var(--c-surface);
  overflow: hidden;
}
[data-bl-qb-section-header] {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--c-surface-elevated);
  border-bottom: 1px solid var(--c-border);
}
[data-bl-qb-section-title-input] {
  flex: 1;
  border: none;
  background: transparent;
  font-size: var(--fontsize-sm);
  font-weight: var(--fontweight-semibold);
  color: var(--color-fg);
  font-family: inherit;
  padding: 2px 4px;
  border-radius: 3px;
  min-width: 0;
}
[data-bl-qb-section-title-input]:focus {
  outline: 2px solid var(--color-brand);
  outline-offset: 1px;
}
[data-bl-qb-section-body] {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
[data-bl-qb-question] {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: var(--c-surface-elevated);
  transition: border-color 0.15s ease;
}
[data-bl-qb-question]:hover {
  border-color: var(--color-brand);
}
[data-bl-qb-question-drag] {
  cursor: grab;
  color: var(--color-muted);
  flex-shrink: 0;
  padding-top: 2px;
}
[data-bl-qb-question-main] {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}
[data-bl-qb-question-row] {
  display: flex;
  align-items: center;
  gap: 8px;
}
[data-bl-qb-question-label-input] {
  flex: 1;
  border: none;
  background: transparent;
  font-size: var(--fontsize-sm);
  color: var(--color-fg);
  font-family: inherit;
  padding: 2px 4px;
  border-radius: 3px;
  min-width: 0;
}
[data-bl-qb-question-label-input]:focus {
  outline: 2px solid var(--color-brand);
  outline-offset: 1px;
}
[data-bl-qb-type-select] {
  padding: 3px 8px;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: var(--c-surface);
  color: var(--color-fg);
  font-size: var(--fontsize-xs);
  font-family: inherit;
  cursor: pointer;
  flex-shrink: 0;
}
[data-bl-qb-type-select]:focus {
  outline: none;
  border-color: var(--color-brand);
}
[data-bl-qb-icon-btn] {
  background: transparent;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: var(--color-muted);
  border-radius: 4px;
  flex-shrink: 0;
  transition: color 0.15s ease, background 0.15s ease;
}
[data-bl-qb-icon-btn]:hover {
  color: #CC4A48;
  background: color-mix(in srgb, #CC4A48 8%, transparent);
}
[data-bl-qb-add-question] {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1.5px dashed var(--c-border);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-muted);
  font-size: var(--fontsize-sm);
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease;
  font-family: inherit;
  width: 100%;
  text-align: left;
}
[data-bl-qb-add-question]:hover {
  border-color: var(--color-brand);
  color: var(--color-brand);
}
[data-bl-qb-add-section] {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border: 1.5px dashed var(--c-border);
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-muted);
  font-size: var(--fontsize-sm);
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease;
  font-family: inherit;
  width: 100%;
  text-align: left;
}
[data-bl-qb-add-section]:hover {
  border-color: var(--color-brand);
  color: var(--color-brand);
}
[data-bl-qb-preview-q] {
  padding: 16px;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: var(--c-surface);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
[data-bl-qb-preview-label] {
  font-size: var(--fontsize-sm);
  font-weight: var(--fontweight-semibold);
  color: var(--color-fg);
}
[data-bl-qb-preview-type] {
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
  border: 1px solid var(--c-border);
  border-radius: 4px;
  padding: 1px 6px;
  display: inline-flex;
  width: fit-content;
}
[data-bl-qb-status-bar] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-top: 1px solid var(--c-border);
  background: var(--c-surface-elevated);
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
  flex-shrink: 0;
}
[data-bl-qb-save-btn] {
  padding: 5px 14px;
  border: 1.5px solid var(--color-brand);
  border-radius: var(--radius-sm);
  background: var(--color-brand);
  color: #FBFBFB;
  font-size: var(--fontsize-xs);
  font-weight: var(--fontweight-medium);
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.15s ease;
}
[data-bl-qb-save-btn]:hover {
  opacity: 0.85;
}
[data-bl-qb-save-btn]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
`;

const QUESTION_TYPES: { value: QuestionType; label: string }[] = [
  { value: "single", label: "Single choice" },
  { value: "multi", label: "Multi choice" },
  { value: "scale", label: "Scale / Likert" },
  { value: "rating", label: "Rating stars" },
  { value: "nps", label: "NPS (0–10)" },
  { value: "range", label: "Range slider" },
  { value: "text", label: "Free text" },
  { value: "matrix", label: "Matrix" },
  { value: "rank", label: "Rank order" },
  { value: "date", label: "Date" },
  { value: "file", label: "File upload" },
];

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function BuilderPanel({
  schema,
  onChange,
  readOnly,
}: {
  schema: QuizSchema;
  onChange: (v: QuizSchema) => void;
  readOnly?: boolean;
}) {
  const updateSection = (sIdx: number, patch: Partial<QuizSectionSchema>) => {
    const sections = schema.sections.map((s, i) =>
      i === sIdx ? { ...s, ...patch } : s
    );
    onChange({ ...schema, sections });
  };

  const removeSection = (sIdx: number) => {
    onChange({ ...schema, sections: schema.sections.filter((_, i) => i !== sIdx) });
  };

  const addSection = () => {
    const newSection: QuizSectionSchema = {
      id: uid(),
      title: "New section",
      questions: [],
    };
    onChange({ ...schema, sections: [...schema.sections, newSection] });
  };

  const updateQuestion = (sIdx: number, qIdx: number, patch: Partial<Question>) => {
    const questions = schema.sections[sIdx].questions.map((q, i) =>
      i === qIdx ? { ...q, ...patch } : q
    );
    updateSection(sIdx, { questions });
  };

  const addQuestion = (sIdx: number) => {
    const newQ: Question = {
      id: uid(),
      type: "single",
      label: "New question",
    };
    updateSection(sIdx, { questions: [...schema.sections[sIdx].questions, newQ] });
  };

  const removeQuestion = (sIdx: number, qIdx: number) => {
    updateSection(sIdx, {
      questions: schema.sections[sIdx].questions.filter((_, i) => i !== qIdx),
    });
  };

  return (
    <div data-bl-qb-panel>
      {schema.sections.map((section, sIdx) => (
        <div key={section.id} data-bl-qb-section>
          <div data-bl-qb-section-header>
            <input
              data-bl-qb-section-title-input
              value={section.title}
              readOnly={readOnly}
              placeholder="Section title"
              onChange={(e) => updateSection(sIdx, { title: e.target.value })}
            />
            {!readOnly && (
              <button
                data-bl-qb-icon-btn
                title="Remove section"
                onClick={() => removeSection(sIdx)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
          <div data-bl-qb-section-body>
            {section.questions.map((q, qIdx) => (
              <div key={q.id} data-bl-qb-question>
                <div data-bl-qb-question-drag aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="4" cy="4" r="1.2" fill="currentColor" />
                    <circle cx="10" cy="4" r="1.2" fill="currentColor" />
                    <circle cx="4" cy="7" r="1.2" fill="currentColor" />
                    <circle cx="10" cy="7" r="1.2" fill="currentColor" />
                    <circle cx="4" cy="10" r="1.2" fill="currentColor" />
                    <circle cx="10" cy="10" r="1.2" fill="currentColor" />
                  </svg>
                </div>
                <div data-bl-qb-question-main>
                  <div data-bl-qb-question-row>
                    <input
                      data-bl-qb-question-label-input
                      value={q.label}
                      readOnly={readOnly}
                      placeholder="Question label"
                      onChange={(e) => updateQuestion(sIdx, qIdx, { label: e.target.value })}
                    />
                    <select
                      data-bl-qb-type-select
                      value={q.type}
                      disabled={readOnly}
                      onChange={(e) =>
                        updateQuestion(sIdx, qIdx, { type: e.target.value as QuestionType })
                      }
                    >
                      {QUESTION_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                    {!readOnly && (
                      <button
                        data-bl-qb-icon-btn
                        title="Remove question"
                        onClick={() => removeQuestion(sIdx, qIdx)}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {!readOnly && (
              <button data-bl-qb-add-question onClick={() => addQuestion(sIdx)}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Add question
              </button>
            )}
          </div>
        </div>
      ))}
      {!readOnly && (
        <button data-bl-qb-add-section onClick={addSection}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Add section
        </button>
      )}
    </div>
  );
}

function PreviewPanel({ schema }: { schema: QuizSchema }) {
  return (
    <div data-bl-qb-panel data-side="right">
      {schema.sections.map((section) => (
        <div key={section.id}>
          <div style={{ fontWeight: "var(--fontweight-semibold)", fontSize: "var(--fontsize-sm)", color: "var(--color-fg)", marginBottom: 8 }}>
            {section.title}
          </div>
          {section.questions.map((q) => (
            <div key={q.id} data-bl-qb-preview-q style={{ marginBottom: 8 }}>
              <span data-bl-qb-preview-label>{q.label}</span>
              <span data-bl-qb-preview-type>{q.type}</span>
            </div>
          ))}
        </div>
      ))}
      {schema.sections.length === 0 && (
        <div style={{ textAlign: "center", color: "var(--color-muted)", fontSize: "var(--fontsize-sm)", padding: "40px 0" }}>
          No sections yet
        </div>
      )}
    </div>
  );
}

export function QuizBuilder({
  value,
  onChange,
  mode = "builder",
  readOnly = false,
  autosave = false,
  onAutosave,
  validate,
}: QuizBuilderProps) {
  const [currentMode, setCurrentMode] = React.useState<QuizBuilderMode>(mode);
  const [saveState, setSaveState] = React.useState<"idle" | "saving">("idle");

  const totalQuestions = value.sections.reduce((acc, s) => acc + s.questions.length, 0);
  const validation = validate ? validate(value) : null;

  const handleSave = async () => {
    if (!onAutosave) return;
    setSaveState("saving");
    try {
      await onAutosave(value);
    } finally {
      setSaveState("idle");
    }
  };

  // Autosave on change
  React.useEffect(() => {
    if (!autosave || !onAutosave) return;
    const t = setTimeout(() => handleSave(), 1500);
    return () => clearTimeout(t);
  }, [value]);

  const modes: QuizBuilderMode[] = ["builder", "preview", "split"];

  return (
    <>
      <style>{builderStyles}</style>
      <div data-bl-quiz-builder>
        {/* Toolbar */}
        <div data-bl-qb-toolbar>
          <input
            data-bl-qb-title-input
            value={value.title}
            readOnly={readOnly}
            placeholder="Quiz title"
            onChange={(e) => onChange({ ...value, title: e.target.value })}
          />
          <div data-bl-qb-mode-tabs role="tablist">
            {modes.map((m) => (
              <button
                key={m}
                data-bl-qb-mode-tab
                data-active={currentMode === m ? "" : undefined}
                role="tab"
                aria-selected={currentMode === m}
                onClick={() => setCurrentMode(m)}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>
          {onAutosave && (
            <button
              data-bl-qb-save-btn
              disabled={saveState === "saving"}
              onClick={handleSave}
            >
              {saveState === "saving" ? "Saving…" : "Save"}
            </button>
          )}
        </div>

        {/* Body */}
        <div data-bl-qb-body>
          {(currentMode === "builder" || currentMode === "split") && (
            <BuilderPanel schema={value} onChange={onChange} readOnly={readOnly} />
          )}
          {(currentMode === "preview" || currentMode === "split") && (
            <PreviewPanel schema={value} />
          )}
        </div>

        {/* Status bar */}
        <div data-bl-qb-status-bar>
          <span>
            {value.sections.length} section{value.sections.length !== 1 ? "s" : ""} · {totalQuestions} question{totalQuestions !== 1 ? "s" : ""}
          </span>
          {validation && !validation.valid && (
            <span style={{ color: "#CC4A48" }}>
              {validation.errors.length} error{validation.errors.length !== 1 ? "s" : ""}
            </span>
          )}
          {validation && validation.valid && (
            <span style={{ color: "#4ADE80" }}>Valid</span>
          )}
        </div>
      </div>
    </>
  );
}
