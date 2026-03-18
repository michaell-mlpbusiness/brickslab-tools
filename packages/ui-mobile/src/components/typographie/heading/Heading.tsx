import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';
import { HeadingProps } from './Heading.type';
import { tokens } from '@/tokens';

const headingConfig: Record<NonNullable<HeadingProps['level']>, TextStyle> = {
  1: {
    fontSize: tokens.fontsize5xl,
    fontWeight: tokens.fontweightBlack as TextStyle['fontWeight'],
  },
  2: {
    fontSize: tokens.fontsize4xl,
    fontWeight: tokens.fontweightExtrabold as TextStyle['fontWeight'],
  },
  3: {
    fontSize: tokens.fontsize3xl,
    fontWeight: tokens.fontweightBold as TextStyle['fontWeight'],
  },
  4: {
    fontSize: tokens.fontsize2xl,
    fontWeight: tokens.fontweightSemibold as TextStyle['fontWeight'],
  },
  5: {
    fontSize: tokens.fontsizeXl,
    fontWeight: tokens.fontweightBold as TextStyle['fontWeight'],
  },
  6: {
    fontSize: tokens.fontsizeLg,
    fontWeight: tokens.fontweightMedium as TextStyle['fontWeight'],
  },
};

const getToneColor = (tone: string) => {
  return tone === 'muted' ? tokens.colorMuted : tokens.colorBrand;
};

export function Heading({
  title,
  level = 1,
  align = 'left',
  opacity = 1,
  blurPx = 0,
  tone = 'brand',
  style: userStyle,
}: HeadingProps) {
  const config = headingConfig[level];
  const color = getToneColor(tone);
  const safeOpacity = Math.min(Math.max(opacity, 0), 1);

  const textStyle: TextStyle = {
    ...config,
    color,
    textAlign: align,
    opacity: safeOpacity,
    margin: tokens.space2,
  };

  return (
    <RNText style={[textStyle, userStyle]}>
      {title}
    </RNText>
  );
}
