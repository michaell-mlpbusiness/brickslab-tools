import type { QuizResult } from "../quiz.types";

export type QuizResultVariant = "compact" | "detailed";

export interface QuizResultSummaryProps {
  result: QuizResult;
  variant?: QuizResultVariant;
  showAnswers?: boolean;
  onRetake?: () => void;
  className?: string;
}
