export interface FunnelStep {
  id: string;
  label: string;
  started: number;
  completed: number;
}

export type FunnelMode = "bar" | "step";

export interface SurveyFunnelProps {
  steps: FunnelStep[];
  mode?: FunnelMode;
  showRates?: boolean;
  className?: string;
}
