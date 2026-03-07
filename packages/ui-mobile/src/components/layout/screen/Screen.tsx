import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, ViewStyle } from 'react-native';
import { ScreenProps } from './Screen.type';
import { tokens } from '@/tokens';

export function Screen({ children, scrollable = false, style: userStyle }: ScreenProps) {
  const content = scrollable ? (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scroll}>
      {children}
    </ScrollView>
  ) : (
    <View style={styles.content}>{children}</View>
  );

  return (
    <SafeAreaView style={[styles.container, userStyle]}>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colorBg,
  },
  content: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
});