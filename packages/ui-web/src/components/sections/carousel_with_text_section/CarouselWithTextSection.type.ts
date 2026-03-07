import React from "react";

export interface CarouselWithTextSectionProps {
  title: string;
  description?: string;
  carousel: React.ReactNode;
  actions?: React.ReactNode;
  imageLeft?: boolean;
  variant?: 'default' | 'overlay';
}
