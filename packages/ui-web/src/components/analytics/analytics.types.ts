import React from "react";

// ── Filters ────────────────────────────────────────────────────────────────────

export type FilterFieldType = "text" | "select" | "date" | "daterange" | "tag";

export interface FilterFieldOption {
  id: string;
  label: string;
}

export interface FilterField {
  id: string;
  label: string;
  type: FilterFieldType;
  options?: FilterFieldOption[];
}

export type FilterState = Record<string, string | string[] | null>;

export interface FilterPreset {
  id: string;
  label: string;
  value: FilterState;
}

// ── Dashboard grid ─────────────────────────────────────────────────────────────

export interface WidgetLayout {
  id: string;
  colSpan?: number;
  rowSpan?: number;
  component: React.ReactNode;
}

// ── Charts ─────────────────────────────────────────────────────────────────────

export interface DistributionDataPoint {
  label: string;
  value: number;
  series?: Record<string, number>;
}

export interface TrendPoint {
  x: string | Date;
  y: number;
}

export interface TrendSeries {
  name: string;
  points: TrendPoint[];
}

// ── KPI ───────────────────────────────────────────────────────────────────────

export type KPIFormat = "number" | "percent" | "currency" | "time";
export type TrendDirection = "up" | "down" | "flat";

export type AnomalyLevel = "info" | "warn" | "critical";
