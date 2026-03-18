import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextStyle } from 'react-native';
import { AlertProps, AlertVariant } from './Alert.type';
import { tokens } from '@/tokens';

const variantMap = {
  info: {
    bg: tokens.cBrandSubtle,
    border: tokens.cBrandBorder,
    accent: tokens.colorBrand,
    icon: 'ℹ️',
  },
  success: {
    bg: tokens.cSuccessSubtle,
    border: tokens.cSuccessBorder,
    accent: tokens.colorSuccess,
    icon: '✅',
  },
  warning: {
    bg: tokens.cWarningSubtle,
    border: tokens.cWarningBorder,
    accent: tokens.colorWarning,
    icon: '⚠️',
  },
  error: {
    bg: tokens.cBrandSubtle,
    border: tokens.cBrandBorder,
    accent: tokens.colorError,
    icon: '❌',
  },
};

export function Alert({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  icon = true,
  fullWidth = false,
  style: userStyle,
}: AlertProps) {
  const config = variantMap[variant];

  return (
    <View
      style={[
        styles.alert,
        { backgroundColor: config.bg, borderColor: config.border },
        fullWidth && { width: '100%' },
        userStyle,
      ]}
    >
      {icon && <Text style={styles.icon}>{config.icon}</Text>}
      <View style={styles.content}>
        {title && <Text style={styles.title}>{title}</Text>}
        <Text style={styles.message}>{children}</Text>
      </View>
      {dismissible && onDismiss && (
        <TouchableOpacity onPress={onDismiss} style={styles.dismiss}>
          <Text style={styles.dismissText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  alert: {
    borderWidth: 1,
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
    fontWeight: '600' as TextStyle['fontWeight'],
    fontSize: tokens.fontsizeSm,
    color: tokens.colorFg,
    marginBottom: 4,
  },
  message: {
    fontSize: tokens.fontsizeSm,
    color: tokens.colorFg,
    lineHeight: 20,
  },
  dismiss: {
    padding: tokens.space1,
    borderRadius: tokens.radiusSm,
    marginLeft: tokens.space3,
  },
  dismissText: {
    fontSize: 14,
    color: tokens.colorFg,
    opacity: 0.6,
  },
});
