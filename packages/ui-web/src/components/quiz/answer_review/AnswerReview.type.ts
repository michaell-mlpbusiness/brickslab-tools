import type { Question, AnswerMap, CorrectionMap } from "../quiz.types";

export type AnswerReviewMode = "review" | "correction";

export interface AnswerReviewProps {
  questions: Question[];
  answers: AnswerMap;
  corrections?: CorrectionMap;
  mode?: AnswerReviewMode;
  className?: string;
}
