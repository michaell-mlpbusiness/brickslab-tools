import React from 'react';
import { View, ViewStyle } from 'react-native';
import { tokens } from '@/tokens';

export interface CardProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: keyof typeof tokens.space;
}

export function Card({
  children,
  style,
  variant = 'default',
  padding = 'md',
}: CardProps) {
  const cardStyle: ViewStyle = {
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.md,
    padding: tokens.space[padding],
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
        borderColor: tokens.colors.border,
      };
    default:
      return {};
  }
}