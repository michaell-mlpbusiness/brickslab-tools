import React from "react";

export type CalloutVariant = "info" | "warning" | "tip" | "danger";

export interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children?: React.ReactNode;
}
