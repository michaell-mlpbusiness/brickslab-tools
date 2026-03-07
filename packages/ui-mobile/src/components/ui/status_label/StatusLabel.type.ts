import { ViewStyle } from 'react-native';

export type StatusVariant = 'active' | 'inactive' | 'pending' | 'error';

export interface StatusLabelProps {
  status: StatusVariant;
  label?: string;
  style?: ViewStyle;
}