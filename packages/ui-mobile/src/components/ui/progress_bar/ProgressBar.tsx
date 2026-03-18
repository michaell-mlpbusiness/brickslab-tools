import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ProgressBarProps, ProgressBarColorScheme, ProgressBarSize } from './ProgressBar.type';
import { tokens } from '@/tokens';

const colorMap: Record<ProgressBarColorScheme, string> = {
  brand: tokens.colorBrand,
  green: tokens.colorSuccess,
  amber: tokens.colorWarning,
  red: tokens.colorError,
};

const trackColorMap: Record<ProgressBarColorScheme, string> = {
  brand: tokens.cBrandSubtle,
  green: tokens.cSuccessSubtle,
  amber: tokens.cWarningSubtle,
  red: tokens.cBrandSubtle,
};

const sizeMap: Record<ProgressBarSize, number> = {
  sm: 4,
  md: 8,
};

export function ProgressBar({
  value,
  max = 100,
  label,
  colorScheme = 'brand',
  size = 'md',
  showValue = false,
  animate = true,
  duration = 800,
  style: userStyle,
}: ProgressBarProps) {
  const clamped = Math.min(Math.max(value, 0), max);
  const percent = (clamped / max) * 100;
  const barColor = colorMap[colorScheme];
  const trackColor = trackColorMap[colorScheme];
  const height = sizeMap[size];

  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animate) {
      Animated.timing(animatedWidth, {
        toValue: percent,
        duration,
        useNativeDriver: false,
      }).start();
    } else {
      animatedWidth.setValue(percent);
    }
  }, [percent, animate, duration, animatedWidth]);

  const widthInterpolation = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, userStyle]}>
      {(label || showValue) && (
        <View style={styles.header}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showValue && <Text style={styles.value}>{Math.round(percent)}%</Text>}
        </View>
      )}
      <View
        style={[styles.track, { height, backgroundColor: trackColor }]}
        accessible
        accessibilityRole="progressbar"
        accessibilityValue={{ now: clamped, min: 0, max }}
        accessibilityLabel={label}
      >
        <Animated.View
          style={[
            styles.bar,
            { height, backgroundColor: barColor, width: widthInterpolation },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: tokens.space1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: tokens.fontsizeXs,
    color: tokens.colorMuted,
    fontWeight: '500' as TextStyle['fontWeight'],
  },
  value: {
    fontSize: tokens.fontsizeXs,
    color: tokens.colorMuted,
    fontWeight: '600' as TextStyle['fontWeight'],
    fontVariant: ['tabular-nums'],
  },
  track: {
    width: '100%',
    borderRadius: tokens.radiusFull,
    overflow: 'hidden' as ViewStyle['overflow'],
  },
  bar: {
    borderRadius: tokens.radiusFull,
  },
});
