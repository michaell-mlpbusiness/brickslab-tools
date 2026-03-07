import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { BadgeProps, BadgeVariant, BadgeSize } from './Badge.type';
import { tokens } from '@/tokens';

const variantMap = {
  default: {
    bg: tokens.cSurfaceElevated,
    border: tokens.cBorder,
    color: tokens.colorFg,
  },
  info: {
    bg: tokens.cBrandSubtle,
    border: tokens.cBrandBorder,
    color: tokens.colorBrand,
  },
  success: {
    bg: tokens.cSuccessSubtle,
    border: tokens.cSuccessBorder,
    color: tokens.colorSuccess,
  },
  warning: {
    bg: tokens.cWarningSubtle,
    border: tokens.cWarningBorder,
    color: tokens.colorWarning,
  },
  error: {
    bg: tokens.cBrandSubtle,
    border: tokens.cBrandBorder,
    color: tokens.colorError,
  },
};

const sizeMap = {
  sm: { fontSize: tokens.fontsize2xs, paddingHorizontal: 6, paddingVertical: 1, dotSize: 6 },
  md: { fontSize: tokens.fontsizeXs, paddingHorizontal: 8, paddingVertical: 2, dotSize: 8 },
  lg: { fontSize: tokens.fontsizeXs, paddingHorizontal: 10, paddingVertical: 3, dotSize: 10 },
};

export function Badge({
  variant = 'default',
  size = 'md',
  children,
  dot = false,
  outlined = false,
  max,
  style: userStyle,
  textStyle: userTextStyle,
}: BadgeProps) {
  const { bg, border, color } = variantMap[variant];
  const { fontSize, paddingHorizontal, paddingVertical, dotSize } = sizeMap[size];

  let content: React.ReactNode = children;
  if (!dot && max !== undefined && typeof children === 'number' && children > max) {
    content = `${max}+`;
  }

  if (dot) {
    return (
      <View
        style={[
          styles.dot,
          { width: dotSize, height: dotSize, backgroundColor: outlined ? 'transparent' : color, borderColor: color },
          userStyle,
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.badge,
        {
          paddingHorizontal,
          paddingVertical,
          backgroundColor: outlined ? 'transparent' : bg,
          borderColor: border,
        },
        userStyle,
      ]}
    >
      <Text
        style={[
          styles.text,
          { fontSize, color },
          userTextStyle,
        ]}
      >
        {content}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderRadius: tokens.radiusFull,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  dot: {
    borderWidth: 1.5,
    borderRadius: 50,
  },
});