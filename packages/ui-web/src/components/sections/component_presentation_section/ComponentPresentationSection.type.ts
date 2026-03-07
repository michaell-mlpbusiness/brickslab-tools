import React from "react";

export interface ComponentPresentationSectionProps {
  name: string;
  description: string;
  preview: React.ReactNode;
  children?: React.ReactNode;
}
