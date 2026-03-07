export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  onClear?: () => void;
  elevated?: boolean;
  variant?: "default" | "glass";
}
