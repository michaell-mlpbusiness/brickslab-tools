export type QuizSubmitBarState = "idle" | "saving" | "submitting" | "success" | "error";

export interface QuizSubmitBarProps {
  onSaveDraft?: () => Promise<void>;
  onSubmit: () => Promise<void>;
  onReset?: () => void;
  state?: QuizSubmitBarState;
  error?: string;
  className?: string;
}
