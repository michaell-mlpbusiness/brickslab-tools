import React from "react";

export type QuestionStatus = "default" | "success" | "warning" | "error";

export interface QuestionCardProps {
  id: string;
  label: string;
  description?: string;
  required?: boolean;
  points?: number;
  status?: QuestionStatus;
  error?: string;
  hint?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}
