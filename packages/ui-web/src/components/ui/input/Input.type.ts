import React from "react";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "password" | "number" | "search" | "url";
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: InputSize;
  fullWidth?: boolean;
  id?: string;
  name?: string;
  required?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
}
