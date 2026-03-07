import React from "react";

export type TabsVariant = "underline" | "pills" | "boxed";
export type TabsSize = "sm" | "md" | "lg";

export interface TabItem {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
  variant?: TabsVariant;
  size?: TabsSize;
  fullWidth?: boolean;
}

export interface TabPanelProps {
  value: string;
  activeValue: string;
  children: React.ReactNode;
}
