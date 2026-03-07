export interface MultiChoiceOption {
  id: string;
  label: string;
  disabled?: boolean;
}

export type MultiChoiceVariant = "checkbox" | "tag";

export interface MultiChoiceProps {
  value: string[];
  onChange: (v: string[]) => void;
  options: MultiChoiceOption[];
  variant?: MultiChoiceVariant;
  maxSelected?: number;
  minSelected?: number;
  disabled?: boolean;
  className?: string;
}
