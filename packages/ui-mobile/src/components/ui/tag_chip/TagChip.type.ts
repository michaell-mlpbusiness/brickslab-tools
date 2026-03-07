import { ViewStyle, TextStyle } from 'react-native';

export interface TagChipProps {
  label: string;
  variant?: 'default' | 'brand' | 'muted';
  size?: 'sm' | 'md';
  style?: ViewStyle;
  textStyle?: TextStyle;
}