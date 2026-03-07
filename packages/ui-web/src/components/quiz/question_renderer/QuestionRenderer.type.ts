import type { Question, Answer } from "../quiz.types";

export type QuestionLayout = "stack" | "inline" | "grid";

export interface QuestionRendererProps {
  question: Question;
  value: Answer;
  onChange: (answer: Answer) => void;
  disabled?: boolean;
  showValidation?: boolean;
  layout?: QuestionLayout;
  className?: string;
}
