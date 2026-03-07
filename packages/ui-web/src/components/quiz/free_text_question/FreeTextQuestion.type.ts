export interface FreeTextQuestionProps {
  value?: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  showCount?: boolean;
  disabled?: boolean;
  className?: string;
}
