import React from "react";

export interface DrilldownPanelProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title?: string;
  context?: unknown;
  children: React.ReactNode;
  className?: string;
}
