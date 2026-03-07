import { TextStyle } from 'react-native';

export interface TextProps {
  texte: string;
  variant?: 'body-sm' | 'body-md' | 'body-lg' | 'caption';
  align?: 'left' | 'center' | 'right';
  tone?: 'default' | 'muted' | 'brand';
  opacity?: number;
  blurPx?: number;
  style?: TextStyle;
}