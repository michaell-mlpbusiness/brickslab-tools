export interface RangeSliderQuestionProps {
  value?: number | [number, number];
  onChange: (v: number | [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  range?: boolean;
  showValue?: boolean;
  disabled?: boolean;
  className?: string;
}
