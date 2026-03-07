export type QuizTimerMode = "total" | "section";
export type QuizTimerExpireAction = "submit" | "lock" | "warn";

export interface QuizTimerProps {
  durationSec: number;
  mode?: QuizTimerMode;
  onExpire?: QuizTimerExpireAction;
  onExpireAction?: () => void;
  warnAtSec?: number;
  className?: string;
}
