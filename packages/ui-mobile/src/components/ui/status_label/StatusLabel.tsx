import React from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';
import { StatusLabelProps, StatusVariant } from './StatusLabel.type';
import { tokens } from '@/tokens';

const statusConfig = {
  active: { icon: '✅', color: tokens.colorSuccess, defaultLabel: 'Active' },
  inactive: { icon: '❌', color: tokens.colorMuted, defaultLabel: 'Inactive' },
  pending: { icon: '⏳', color: tokens.colorWarning, defaultLabel: 'Pending' },
  error: { icon: '⚠️', color: tokens.colorError, defaultLabel: 'Error' },
};

export function StatusLabel({
  status,
  label,
  style: userStyle,
}: StatusLabelProps) {
  const config = statusConfig[status];
  const displayLabel = label ?? config.defaultLabel;

  return (
    <View style={[styles.container, userStyle]}>
      <Text style={styles.icon}>{config.icon}</Text>
      <Text style={[styles.label, { color: config.color }]}>
        {displayLabel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  icon: {
    fontSize: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '500' as TextStyle['fontWeight'],
  },
});
