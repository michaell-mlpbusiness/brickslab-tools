import React from "react";

// ── Question types ─────────────────────────────────────────────────────────────

export type QuestionType =
  | "single"
  | "multi"
  | "scale"
  | "rating"
  | "nps"
  | "range"
  | "text"
  | "matrix"
  | "rank"
  | "date"
  | "file";

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  label: string;
  description?: string;
  required?: boolean;
  points?: number;
  hint?: string;
  options?: QuestionOption[];
  // type-specific config
  min?: number;
  max?: number;
  step?: number;
  minLabel?: string;
  maxLabel?: string;
  maxLength?: number;
  minLength?: number;
  multiline?: boolean;
  rows?: { id: string; label: string }[];
  cols?: { id: string; label: string }[];
  maxSelected?: number;
  minSelected?: number;
  maxRank?: number;
  allowHalf?: boolean;
  range?: boolean;
  unit?: string;
}

export type Answer =
  | string
  | string[]
  | number
  | number[]
  | Record<string, string | number>
  | null;

// ── Section ────────────────────────────────────────────────────────────────────

export interface QuizSectionSchema {
  id: string;
  title: string;
  description?: string;
  required?: boolean;
  helperText?: string;
  questions: Question[];
}

// ── Logic ──────────────────────────────────────────────────────────────────────

export type LogicOperator = "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "contains" | "answered";

export type LogicAction = "show" | "hide" | "jump" | "score" | "branch";

export interface LogicCondition {
  questionId: string;
  operator: LogicOperator;
  value?: Answer;
}

export interface LogicRule {
  id: string;
  conditions: LogicCondition[];
  conditionMode?: "all" | "any";
  action: LogicAction;
  targetId?: string;
  scoreValue?: number;
}

// ── Quiz schema ────────────────────────────────────────────────────────────────

export interface ValidationResult {
  valid: boolean;
  errors: { path: string; message: string }[];
}

export interface QuizSchema {
  id: string;
  title: string;
  description?: string;
  sections: QuizSectionSchema[];
  logic?: LogicRule[];
  locale?: string;
}

// ── Result ─────────────────────────────────────────────────────────────────────

export interface QuizBadge {
  id: string;
  label: string;
  icon?: string;
}

export interface QuizRecommendation {
  label: string;
  description?: string;
  href?: string;
}

export interface QuizResult {
  score?: number;
  maxScore?: number;
  percent?: number;
  timeSpent?: number;
  badges?: QuizBadge[];
  recommendations?: QuizRecommendation[];
  completedAt?: Date | string;
}

// ── Review ─────────────────────────────────────────────────────────────────────

export type AnswerMap = Record<string, Answer>;

export interface Correction {
  correct: boolean;
  correctAnswer?: Answer;
  feedback?: string;
  points?: number;
}

export type CorrectionMap = Record<string, Correction>;

// ── Response table ─────────────────────────────────────────────────────────────

export interface ResponseRow {
  id: string;
  [key: string]: unknown;
}

export interface ColumnDef {
  id: string;
  label: string;
  type?: "text" | "number" | "date" | "badge";
  width?: number;
  sortable?: boolean;
}

export interface FilterDef {
  id: string;
  label: string;
  type: "text" | "select" | "date" | "number";
  options?: { id: string; label: string }[];
}
