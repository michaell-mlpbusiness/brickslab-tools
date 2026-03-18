import React from 'react';
import { View, ViewStyle } from 'react-native';
import { tokens } from '@/tokens';

const paddingMap = {
  sm: tokens.space3,
  md: tokens.space4,
  lg: tokens.space5,
} as const;

export interface CardProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: keyof typeof paddingMap;
}

export function Card({
  children,
  style,
  variant = 'default',
  padding = 'md',
}: CardProps) {
  const cardStyle: ViewStyle = {
    backgroundColor: tokens.colorBg,
    borderRadius: tokens.radiusMd,
    padding: paddingMap[padding],
    ...getVariantStyle(variant),
    ...style,
  };

  return <View style={cardStyle}>{children}</View>;
}

function getVariantStyle(variant: CardProps['variant']): ViewStyle {
  switch (variant) {
    case 'elevated':
      return {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      };
    case 'outlined':
      return {
        borderWidth: 1,
        borderColor: tokens.cBorder,
      };
    default:
      return {};
  }
}
