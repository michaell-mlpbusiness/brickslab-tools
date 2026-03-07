export interface NPSLabels {
  left?: string;
  right?: string;
}

export interface NPSQuestionProps {
  value?: number;
  onChange: (v: number) => void;
  labels?: NPSLabels;
  showBuckets?: boolean;
  disabled?: boolean;
  className?: string;
}
