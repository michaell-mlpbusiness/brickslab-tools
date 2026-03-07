import React from "react";
import type { ConditionalLogicProps } from "./ConditionalLogic.type";
import type { LogicRule, LogicCondition, LogicOperator, LogicAction } from "../quiz.types";

const clStyles = `
[data-bl-cl] {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
[data-bl-cl-rule] {
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-md);
  background: var(--c-surface);
  overflow: hidden;
}
[data-bl-cl-rule-header] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: var(--c-surface-elevated);
  border-bottom: 1px solid var(--c-border);
  font-size: var(--fontsize-xs);
  font-weight: var(--fontweight-semibold);
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
[data-bl-cl-rule-body] {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
[data-bl-cl-row] {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
[data-bl-cl-label] {
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
  white-space: nowrap;
  min-width: 32px;
}
[data-bl-cl-select] {
  flex: 1;
  min-width: 120px;
  padding: 6px 10px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: var(--c-surface);
  color: var(--color-fg);
  font-size: var(--fontsize-sm);
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.15s ease;
}
[data-bl-cl-select]:focus {
  outline: none;
  border-color: var(--color-brand);
}
[data-bl-cl-input] {
  flex: 1;
  min-width: 80px;
  padding: 6px 10px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: var(--c-surface);
  color: var(--color-fg);
  font-size: var(--fontsize-sm);
  font-family: inherit;
  transition: border-color 0.15s ease;
}
[data-bl-cl-input]:focus {
  outline: none;
  border-color: var(--color-brand);
}
[data-bl-cl-btn] {
  padding: 5px 10px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: var(--c-surface);
  color: var(--color-fg);
  font-size: var(--fontsize-xs);
  cursor: pointer;
  white-space: nowrap;
  transition: border-color 0.15s ease, background 0.15s ease;
}
[data-bl-cl-btn]:hover {
  border-color: var(--color-brand);
  background: var(--c-brand-subtle);
}
[data-bl-cl-btn][data-danger] {
  color: #CC4A48;
}
[data-bl-cl-btn][data-danger]:hover {
  border-color: #CC4A48;
  background: color-mix(in srgb, #CC4A48 8%, transparent);
}
[data-bl-cl-add] {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 14px;
  border: 1.5px dashed var(--c-border);
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-muted);
  font-size: var(--fontsize-sm);
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease;
  width: 100%;
  text-align: left;
}
[data-bl-cl-add]:hover {
  border-color: var(--color-brand);
  color: var(--color-brand);
}
[data-bl-cl-divider] {
  font-size: var(--fontsize-xs);
  color: var(--color-muted);
  text-align: center;
  padding: 2px 0;
}
`;

const OPERATORS: { value: LogicOperator; label: string }[] = [
  { value: "eq", label: "equals" },
  { value: "neq", label: "not equals" },
  { value: "gt", label: "greater than" },
  { value: "gte", label: "≥" },
  { value: "lt", label: "less than" },
  { value: "lte", label: "≤" },
  { value: "contains", label: "contains" },
  { value: "answered", label: "is answered" },
];

const ACTIONS: { value: LogicAction; label: string }[] = [
  { value: "show", label: "Show" },
  { value: "hide", label: "Hide" },
  { value: "jump", label: "Jump to" },
  { value: "score", label: "Add score" },
  { value: "branch", label: "Branch to" },
];

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function RuleRow({
  rule,
  questionsIndex,
  onUpdate,
  onRemove,
}: {
  rule: LogicRule;
  questionsIndex: { id: string; label: string; type: string }[];
  onUpdate: (r: LogicRule) => void;
  onRemove: () => void;
}) {
  const updateCondition = (idx: number, patch: Partial<LogicCondition>) => {
    const conditions = rule.conditions.map((c, i) =>
      i === idx ? { ...c, ...patch } : c
    );
    onUpdate({ ...rule, conditions });
  };

  const addCondition = () => {
    onUpdate({
      ...rule,
      conditions: [
        ...rule.conditions,
        { questionId: questionsIndex[0]?.id ?? "", operator: "eq" },
      ],
    });
  };

  const removeCondition = (idx: number) => {
    onUpdate({ ...rule, conditions: rule.conditions.filter((_, i) => i !== idx) });
  };

  return (
    <div data-bl-cl-rule>
      <div data-bl-cl-rule-header>
        <span>Rule</span>
        <button data-bl-cl-btn data-danger onClick={onRemove}>Remove</button>
      </div>
      <div data-bl-cl-rule-body>
        {rule.conditions.map((cond, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && (
              <div data-bl-cl-divider>
                <select
                  data-bl-cl-select
                  style={{ flex: "unset", minWidth: "unset", width: 60 }}
                  value={rule.conditionMode ?? "all"}
                  onChange={(e) =>
                    onUpdate({ ...rule, conditionMode: e.target.value as "all" | "any" })
                  }
                >
                  <option value="all">AND</option>
                  <option value="any">OR</option>
                </select>
              </div>
            )}
            <div data-bl-cl-row>
              <span data-bl-cl-label>IF</span>
              <select
                data-bl-cl-select
                value={cond.questionId}
                onChange={(e) => updateCondition(idx, { questionId: e.target.value })}
              >
                {questionsIndex.map((q) => (
                  <option key={q.id} value={q.id}>{q.label}</option>
                ))}
              </select>
              <select
                data-bl-cl-select
                value={cond.operator}
                onChange={(e) =>
                  updateCondition(idx, { operator: e.target.value as LogicOperator })
                }
              >
                {OPERATORS.map((op) => (
                  <option key={op.value} value={op.value}>{op.label}</option>
                ))}
              </select>
              {cond.operator !== "answered" && (
                <input
                  data-bl-cl-input
                  type="text"
                  placeholder="value"
                  value={String(cond.value ?? "")}
                  onChange={(e) => updateCondition(idx, { value: e.target.value })}
                />
              )}
              {rule.conditions.length > 1 && (
                <button
                  data-bl-cl-btn
                  data-danger
                  onClick={() => removeCondition(idx)}
                >
                  ×
                </button>
              )}
            </div>
          </React.Fragment>
        ))}

        <button data-bl-cl-btn onClick={addCondition}>+ condition</button>

        <div data-bl-cl-row>
          <span data-bl-cl-label>THEN</span>
          <select
            data-bl-cl-select
            value={rule.action}
            onChange={(e) => onUpdate({ ...rule, action: e.target.value as LogicAction })}
          >
            {ACTIONS.map((a) => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
          {(rule.action === "show" || rule.action === "hide" || rule.action === "jump" || rule.action === "branch") && (
            <select
              data-bl-cl-select
              value={rule.targetId ?? ""}
              onChange={(e) => onUpdate({ ...rule, targetId: e.target.value })}
            >
              <option value="">— select target —</option>
              {questionsIndex.map((q) => (
                <option key={q.id} value={q.id}>{q.label}</option>
              ))}
            </select>
          )}
          {rule.action === "score" && (
            <input
              data-bl-cl-input
              type="number"
              placeholder="points"
              value={rule.scoreValue ?? ""}
              onChange={(e) => onUpdate({ ...rule, scoreValue: Number(e.target.value) })}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export function ConditionalLogic({ rules, onChange, questionsIndex }: ConditionalLogicProps) {
  const addRule = () => {
    const newRule: LogicRule = {
      id: uid(),
      conditions: [{ questionId: questionsIndex[0]?.id ?? "", operator: "eq" }],
      conditionMode: "all",
      action: "show",
      targetId: questionsIndex[1]?.id,
    };
    onChange([...rules, newRule]);
  };

  const updateRule = (idx: number, updated: LogicRule) => {
    onChange(rules.map((r, i) => (i === idx ? updated : r)));
  };

  const removeRule = (idx: number) => {
    onChange(rules.filter((_, i) => i !== idx));
  };

  return (
    <>
      <style>{clStyles}</style>
      <div data-bl-cl>
        {rules.map((rule, idx) => (
          <RuleRow
            key={rule.id}
            rule={rule}
            questionsIndex={questionsIndex}
            onUpdate={(r) => updateRule(idx, r)}
            onRemove={() => removeRule(idx)}
          />
        ))}
        <button data-bl-cl-add onClick={addRule}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Add rule
        </button>
      </div>
    </>
  );
}
