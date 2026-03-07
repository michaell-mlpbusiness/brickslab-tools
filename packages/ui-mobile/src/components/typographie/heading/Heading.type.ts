import { TextStyle } from 'react-native';

export interface HeadingProps {
  title: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  align?: 'left' | 'center' | 'right';
  opacity?: number;
  blurPx?: number;
  tone?: 'brand' | 'muted';
  style?: TextStyle;
}