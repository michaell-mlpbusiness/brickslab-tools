import React from "react";
import { FiCheckCircle, FiXCircle, FiClock, FiAlertCircle } from "react-icons/fi";
import { StatusLabelProps, StatusVariant } from "./StatusLabel.type";

const statusConfig: Record<
  StatusVariant,
  { icon: React.ElementType; color: string; defaultLabel: string }
> = {
  active: { icon: FiCheckCircle, color: "var(--color-success)", defaultLabel: "Active" },
  inactive: { icon: FiXCircle, color: "var(--color-muted)", defaultLabel: "Inactive" },
  pending: { icon: FiClock, color: "var(--color-warning)", defaultLabel: "Pending" },
  error: { icon: FiAlertCircle, color: "var(--color-error)", defaultLabel: "Error" },
};

export function StatusLabel({ status, label }: StatusLabelProps) {
  const { icon: Icon, color, defaultLabel } = statusConfig[status];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 13,
        fontWeight: 500,
        color,
      }}
    >
      <Icon size={14} />
      {label ?? defaultLabel}
    </span>
  );
}
