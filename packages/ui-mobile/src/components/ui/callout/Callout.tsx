import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { CalloutProps, CalloutVariant } from './Callout.type';
import { tokens } from '@/tokens';

const variantMap = {
  info: {
    bg: tokens.cBrandSubtle,
    border: tokens.cBrandBorder,
    accent: tokens.colorBrand,
    icon: 'ℹ️',
    defaultTitle: 'Info',
  },
  warning: {
    bg: tokens.cWarningSubtle,
    border: tokens.cWarningBorder,
    accent: tokens.colorWarning,
    icon: '⚠️',
    defaultTitle: 'Attention',
  },
  tip: {
    bg: tokens.cSuccessSubtle,
    border: tokens.cSuccessBorder,
    accent: tokens.colorSuccess,
    icon: '💡',
    defaultTitle: 'Astuce',
  },
  danger: {
    bg: tokens.cBrandSubtle,
    border: tokens.cBrandBorder,
    accent: tokens.colorError,
    icon: '🚨',
    defaultTitle: 'Danger',
  },
};

export function Callout({
  variant = 'info',
  title,
  children,
  style: userStyle,
}: CalloutProps) {
  const config = variantMap[variant];
  const displayTitle = title ?? config.defaultTitle;

  return (
    <View style={[styles.callout, { backgroundColor: config.bg, borderColor: config.border }, userStyle]}>
      <Text style={styles.icon}>{config.icon}</Text>
      <View style={styles.content}>
        <Text style={[styles.title, { color: config.accent }]}>
          {displayTitle}
        </Text>
        {children && (
          <Text style={styles.body}>
            {children}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  callout: {
    borderWidth: 1,
    borderLeftWidth: 3,
    borderRadius: tokens.radiusMd,
    padding: tokens.space3,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    fontSize: 16,
    marginRight: tokens.space3,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: tokens.fontsizeSm,
    fontWeight: '600',
    marginBottom: children ? tokens.space1 : 0,
  },
  body: {
    fontSize: tokens.fontsizeSm,
    color: tokens.colorFg,
    lineHeight: 20,
  },
});