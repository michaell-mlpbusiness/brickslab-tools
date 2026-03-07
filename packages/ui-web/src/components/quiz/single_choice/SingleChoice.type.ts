export interface SingleChoiceOption {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export type SingleChoiceVariant = "radio" | "card";

export interface SingleChoiceProps {
  value?: string;
  onChange: (v: string) => void;
  options: SingleChoiceOption[];
  variant?: SingleChoiceVariant;
  allowOther?: boolean;
  otherLabel?: string;
  disabled?: boolean;
  className?: string;
}
