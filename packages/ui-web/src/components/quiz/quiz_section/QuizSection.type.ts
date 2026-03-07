import React from "react";

export interface QuizSectionProps {
  id: string;
  title: string;
  description?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  required?: boolean;
  helperText?: string;
  children: React.ReactNode;
  className?: string;
}
