import React from "react";

export interface AppShellProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  sidebarWidth?: number;
  headerHeight?: number;
  footerHeight?: number;
}
