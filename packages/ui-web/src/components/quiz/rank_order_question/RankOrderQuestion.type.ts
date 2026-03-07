export interface RankOption {
  id: string;
  label: string;
}

export interface RankOrderQuestionProps {
  value: string[];
  onChange: (v: string[]) => void;
  options: RankOption[];
  maxRank?: number;
  disabled?: boolean;
  className?: string;
}
