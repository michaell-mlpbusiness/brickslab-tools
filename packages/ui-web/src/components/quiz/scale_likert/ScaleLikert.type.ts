export interface ScaleLikertProps {
  value?: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  minLabel?: string;
  maxLabel?: string;
  showTicks?: boolean;
  disabled?: boolean;
  className?: string;
}
