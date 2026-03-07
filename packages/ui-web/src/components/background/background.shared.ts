"use client";

import React, { useEffect, useState } from "react";

export type BackgroundQuality = "low" | "medium" | "high";
export type BackgroundMask = "none" | "radial" | "vignette";
export type BackgroundTheme = "light" | "dark" | "auto";
export type ReducedMotionSetting = "auto" | "always" | "never";

export const PREMIUM_PALETTE = ["#CC4A48", "#4ADE80", "#F59E0B"] as const;

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function clampRange(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function qualityWeight(quality: BackgroundQuality): number {
  if (quality === "low") return 0.55;
  if (quality === "medium") return 0.8;
  return 1;
}

export function qualityLayers(quality: BackgroundQuality, high: number, medium: number, low: number): number {
  if (quality === "low") return low;
  if (quality === "medium") return medium;
  return high;
}

export function alphaColor(color: string, alpha: number): string {
  const safeAlpha = clamp01(alpha);
  const hex = color.replace("#", "").trim();

  if (/^[0-9a-fA-F]{6}$/.test(hex)) {
    const r = Number.parseInt(hex.slice(0, 2), 16);
    const g = Number.parseInt(hex.slice(2, 4), 16);
    const b = Number.parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
  }

  if (/^[0-9a-fA-F]{3}$/.test(hex)) {
    const r = Number.parseInt(hex[0] + hex[0], 16);
    const g = Number.parseInt(hex[1] + hex[1], 16);
    const b = Number.parseInt(hex[2] + hex[2], 16);
    return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
  }

  if (color.startsWith("rgb(")) {
    const channels = color
      .replace("rgb(", "")
      .replace(")", "")
      .split(",")
      .map((channel) => channel.trim());

    if (channels.length === 3) {
      return `rgba(${channels.join(", ")}, ${safeAlpha})`;
    }
  }

  if (color.startsWith("rgba(")) {
    const channels = color
      .replace("rgba(", "")
      .replace(")", "")
      .split(",")
      .map((channel) => channel.trim());

    if (channels.length >= 3) {
      return `rgba(${channels[0]}, ${channels[1]}, ${channels[2]}, ${safeAlpha})`;
    }
  }

  return `color-mix(in srgb, ${color} ${Math.round(safeAlpha * 100)}%, transparent)`;
}

export function maskStyle(mask: BackgroundMask, strength = 0.46): React.CSSProperties | null {
  const safeStrength = clamp01(strength);

  if (mask === "radial") {
    return {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: `radial-gradient(circle at 50% 50%, transparent 24%, rgba(0, 0, 0, ${safeStrength}) 90%)`,
    };
  }

  if (mask === "vignette") {
    return {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: `radial-gradient(ellipse at 50% 50%, transparent 42%, rgba(0, 0, 0, ${safeStrength * 0.9}) 100%)`,
    };
  }

  return null;
}

export function useReducedMotionPreference(setting: ReducedMotionSetting = "auto"): boolean {
  const [reduced, setReduced] = useState(setting === "always");

  useEffect(() => {
    if (setting === "always") {
      setReduced(true);
      return;
    }

    if (setting === "never") {
      setReduced(false);
      return;
    }

    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      setReduced(false);
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(media.matches);

    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [setting]);

  return reduced;
}

export function normalizeUnitPoint(point: { x: number; y: number }): { x: number; y: number } {
  const x = point.x > 1 ? point.x / 100 : point.x;
  const y = point.y > 1 ? point.y / 100 : point.y;
  return {
    x: clampRange(x, 0, 1),
    y: clampRange(y, 0, 1),
  };
}

export function blendModeForTheme(theme: BackgroundTheme): React.CSSProperties["mixBlendMode"] {
  if (theme === "light") return "multiply";
  return "screen";
}
