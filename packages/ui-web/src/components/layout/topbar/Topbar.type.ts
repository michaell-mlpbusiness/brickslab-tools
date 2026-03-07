import { ReactNode } from "react";

export interface TopbarProps {
  logo?: ReactNode;
  title?: string;
  search?: ReactNode;
  actions?: ReactNode;
  height?: number;
  onBurgerClick?: () => void;
}
