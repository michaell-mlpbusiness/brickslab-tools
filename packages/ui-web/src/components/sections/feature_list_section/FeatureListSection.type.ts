import React from "react";

export interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface FeatureListSectionProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
}
