import { ViewStyle, TextStyle } from 'react-native';

export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps {
  value: string;
  onChangeText: (value: string) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  editable?: boolean;
  size?: TextareaSize;
  fullWidth?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  style?: ViewStyle;
  inputStyle?: TextStyle;
}