import React from "react";
import { ConfettiProps } from "./Confetti.type";

export interface ConfettiButtonProps {
  options?: Partial<ConfettiProps>;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}
