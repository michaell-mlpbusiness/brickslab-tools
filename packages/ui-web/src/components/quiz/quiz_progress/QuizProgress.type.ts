export type QuizProgressMode = "steps" | "bar" | "ring";

export interface QuizProgressProps {
  current: number;
  total: number;
  mode?: QuizProgressMode;
  showLabel?: boolean;
  className?: string;
}
