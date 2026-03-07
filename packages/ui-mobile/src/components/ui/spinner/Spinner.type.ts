import { ViewStyle } from 'react-native';

export type SpinnerSize = 'small' | 'large';
export type SpinnerVariant = 'default' | 'brand' | 'success' | 'warning' | 'error' | 'white';

export interface SpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  label?: string;
  style?: ViewStyle;
}