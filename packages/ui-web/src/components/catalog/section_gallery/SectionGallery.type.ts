import React from "react";

export interface SectionGalleryProps {
  title?: string;
  items: React.ReactNode[];
  columns?: 1 | 2 | 3 | 4;
  gap?: number;
}
