import React from "react";

export interface ComponentDetailPanelProps {
  name: string;
  description?: string;
  preview?: React.ReactNode;
  code?: string;
  badge?: string;
}
