'use client';

import React, { useRef, useState } from "react";
import { Confetti } from "./Confetti";
import { ConfettiButtonProps } from "./ConfettiButton.type";

export function ConfettiButton({
  options,
  children,
  className = "",
  disabled = false,
  onClick,
}: ConfettiButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const originRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  const handleClick = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    originRef.current = options?.origin ?? (rect
      ? {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        }
      : { x: 0.5, y: 0.5 });

    setIsActive(true);
    onClick?.();

    setTimeout(() => setIsActive(false), 2500);
  };

  return (
    <>
      {isActive && <Confetti {...options} origin={originRef.current} />}
      <button
        ref={buttonRef}
        onClick={handleClick}
        disabled={disabled}
        style={{
          padding: "var(--space-3) var(--space-5)",
          fontSize: "var(--fontsize-sm)",
          fontWeight: "var(--fontweight-semibold)",
          color: "#FBFBFB",
          backgroundColor: "var(--color-brand)",
          border: "none",
          borderRadius: "var(--radius-sm)",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.6 : 1,
          transition: "all 0.2s ease",
        }}
        className={className}
      >
        {children}
      </button>
    </>
  );
}
