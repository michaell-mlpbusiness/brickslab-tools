import React from "react";
import { ToggleSwitchProps } from "./ToggleSwitch.type";

export function ToggleSwitch({ checked, onChange, label, disabled }: ToggleSwitchProps) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />
      <div
        style={{
          position: "relative",
          width: 40,
          height: 22,
          borderRadius: 11,
          background: checked ? "var(--color-brand)" : "var(--c-border)",
          transition: "background 0.2s",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "var(--c-surface)",
            top: 3,
            left: checked ? 21 : 3,
            transition: "left 0.2s",
          }}
        />
      </div>
      {label && (
        <span style={{ fontSize: "var(--fontsize-sm)", color: "var(--color-fg)" }}>{label}</span>
      )}
    </label>
  );
}
