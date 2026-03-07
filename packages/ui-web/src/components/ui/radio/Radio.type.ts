import React from "react";

export type RadioSize = "sm" | "md" | "lg";

export interface RadioProps {
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  label?: React.ReactNode;
  name?: string;
  disabled?: boolean;
  size?: RadioSize;
  id?: string;
}

export interface RadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  direction?: "vertical" | "horizontal";
  gap?: number;
}
