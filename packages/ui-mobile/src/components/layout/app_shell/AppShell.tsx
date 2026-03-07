import React from 'react';
import { SafeAreaView, View, StyleSheet, ViewStyle } from 'react-native';
import { AppShellProps } from './AppShell.type';
import { tokens } from '@/tokens';

export function AppShell({
  header,
  sidebar,
  footer,
  children,
  sidebarWidth = 232,
  headerHeight = 60,
  footerHeight = 60,
  style: userStyle,
}: AppShellProps) {
  return (
    <SafeAreaView style={[styles.container, userStyle]}>
      {header && <View style={[styles.header, { height: headerHeight }]}>{header}</View>}
      <View style={styles.content}>
        {sidebar && (
          <View style={[styles.sidebar, { width: sidebarWidth }]}>
            {sidebar}
          </View>
        )}
        <View style={styles.main}>
          {children}
        </View>
      </View>
      {footer && <View style={[styles.footer, { height: footerHeight }]}>{footer}</View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colorBg,
  },
  header: {
    backgroundColor: tokens.colorBg,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    backgroundColor: tokens.colorBg,
    borderRightWidth: 1,
    borderRightColor: tokens.colorMuted,
  },
  main: {
    flex: 1,
    padding: tokens.space6,
  },
  footer: {
    backgroundColor: tokens.colorBg,
    borderTopWidth: 1,
    borderTopColor: tokens.colorMuted,
  },
});