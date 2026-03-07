import { ViewStyle } from 'react-native';

export interface ToggleSwitchProps {
  checked: boolean;
  onValueChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  style?: ViewStyle;
}