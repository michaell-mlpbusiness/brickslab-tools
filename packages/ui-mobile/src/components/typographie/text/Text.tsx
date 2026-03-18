import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';
import { TextProps } from './Text.type';
import { tokens } from '@/tokens';

const textConfig: Record<NonNullable<TextProps['variant']>, TextStyle> = {
  'body-sm': {
    fontSize: tokens.fontsizeMedium,
    fontWeight: tokens.fontweightMedium as TextStyle['fontWeight'],
  },
  'body-md': {
    fontSize: tokens.fontsizeXl,
    fontWeight: tokens.fontweightMedium as TextStyle['fontWeight'],
  },
  'body-lg': {
    fontSize: tokens.fontsize2xl,
    fontWeight: tokens.fontweightMedium as TextStyle['fontWeight'],
  },
  caption: {
    fontSize: tokens.fontsizeXs,
    fontWeight: tokens.fontweightLight as TextStyle['fontWeight'],
  },
};

const getToneColor = (tone: string) => {
  switch (tone) {
    case 'muted':
      return tokens.colorMuted;
    case 'brand':
      return tokens.colorBrand;
    default:
      return tokens.colorFg;
  }
};

export function Text({
  texte,
  variant = 'body-sm',
  align = 'left',
  tone = 'default',
  opacity,
  blurPx,
  style: userStyle,
}: TextProps) {
  const config = textConfig[variant] || textConfig['body-sm'];
  const color = getToneColor(tone);

  const textStyle: TextStyle = {
    ...config,
    color,
    textAlign: align,
    opacity,
    // Note: blur is not directly supported in RN Text, might need a wrapper View with blur
  };

  return (
    <RNText style={[textStyle, userStyle]}>
      {texte}
    </RNText>
  );
}
