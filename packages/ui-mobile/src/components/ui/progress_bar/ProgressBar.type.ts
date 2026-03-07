import { ViewStyle } from 'react-native';

export type ProgressBarColorScheme = 'brand' | 'green' | 'amber' | 'red';
export type ProgressBarSize = 'sm' | 'md';

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  colorScheme?: ProgressBarColorScheme;
  size?: ProgressBarSize;
  showValue?: boolean;
  animate?: boolean;
  duration?: number;
  style?: ViewStyle;
}