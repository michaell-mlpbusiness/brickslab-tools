import type { QuizSchema, ValidationResult } from "../quiz.types";

export type QuizBuilderMode = "builder" | "preview" | "split";

export interface QuizBuilderProps {
  value: QuizSchema;
  onChange: (v: QuizSchema) => void;
  mode?: QuizBuilderMode;
  locale?: string;
  readOnly?: boolean;
  autosave?: boolean;
  onAutosave?: (v: QuizSchema) => Promise<void>;
  validate?: (v: QuizSchema) => ValidationResult;
  className?: string;
}
