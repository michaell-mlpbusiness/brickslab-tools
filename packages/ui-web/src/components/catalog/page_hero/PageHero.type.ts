import React from "react";

export interface PageHeroStat {
  value: string | number;
  label: string;
  color?: string;
}

export interface PageHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  stats?: PageHeroStat[];
  children?: React.ReactNode;
}
