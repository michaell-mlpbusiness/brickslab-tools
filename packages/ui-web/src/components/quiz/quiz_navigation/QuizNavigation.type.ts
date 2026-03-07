export interface QuizNavSummaryItem {
  id: string;
  label: string;
  completed?: boolean;
}

export interface QuizNavigationProps {
  canNext?: boolean;
  canPrev?: boolean;
  onNext: () => void;
  onPrev: () => void;
  onJump?: (id: string) => void;
  showSummary?: boolean;
  summaryItems?: QuizNavSummaryItem[];
  className?: string;
}
