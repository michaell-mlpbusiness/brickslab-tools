import React from "react";

export type CheckboxSize = "sm" | "md" | "lg";

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  size?: CheckboxSize;
  id?: string;
  name?: string;
  value?: string;
}
