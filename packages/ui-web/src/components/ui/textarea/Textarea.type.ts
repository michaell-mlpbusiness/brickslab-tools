import React from "react";

export type TextareaSize = "sm" | "md" | "lg";
export type TextareaResize = "none" | "vertical" | "both";

export interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  size?: TextareaSize;
  fullWidth?: boolean;
  id?: string;
  name?: string;
  required?: boolean;
  rows?: number;
  maxLength?: number;
  resize?: TextareaResize;
  autoResize?: boolean;
}
