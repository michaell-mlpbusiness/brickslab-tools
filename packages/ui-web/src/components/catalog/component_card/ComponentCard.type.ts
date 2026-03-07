import React from "react";

export interface ComponentCardProps {
  label: string;
  section: string;
  description: string;
  href: string;
  type?: "web" | "mobile";
  preview?: React.ReactNode;
  isNew?: boolean;
}
