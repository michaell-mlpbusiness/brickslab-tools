import type { FilterState, FilterField, FilterPreset } from "../analytics.types";

export interface SegmentFilterBarProps {
  value: FilterState;
  onChange: (v: FilterState) => void;
  fields: FilterField[];
  presets?: FilterPreset[];
  className?: string;
}
