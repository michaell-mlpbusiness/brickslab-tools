import React from "react";

export interface ThemeToggleSimpleProps {
  className?: string;
  mode?: "light" | "dark" | "system";
  onChange?: (mode: "light" | "dark" | "system") => void;
  label?: string;
}
