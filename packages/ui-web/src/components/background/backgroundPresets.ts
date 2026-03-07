/**
 * Background Premium Presets
 * Recommended values for common use cases
 */

export const BACKGROUND_PRESETS = {
  /**
   * SUBTLE: Minimal motion, professional appearance
   * Best for: Primary backgrounds, documentation, minimal distraction
   * Perf: Low cost (60fps on mobile without filters)
   */
  subtle: {
    intensity: 0.3,
    speed: 0.8,
    quality: "medium" as const,
    mask: "vignette" as const,
    interactive: false,
    theme: "auto" as const,
    reducedMotion: "auto" as const,
    blur: 30,
    opacity: 0.25,
    grainSize: 0.8,
  },

  /**
   * HERO: Premium, captivating visuals
   * Best for: Landing pages, hero sections, hero banners
   * Perf: Medium cost (60fps on desktop, adaptive on mobile via quality)
   */
  hero: {
    intensity: 0.7,
    speed: 1.2,
    quality: "high" as const,
    mask: "radial" as const,
    interactive: true,
    theme: "auto" as const,
    reducedMotion: "auto" as const,
    blur: 60,
    opacity: 0.5,
    grainSize: 1.2,
  },

  /**
   * LUXURY: Deep premium ambience with smooth motion
   * Best for: Product hero, marketing pages, premium sections
   * Perf: Medium/High cost depending on quality
   */
  luxury: {
    intensity: 0.82,
    speed: 0.95,
    quality: "high" as const,
    mask: "vignette" as const,
    interactive: true,
    theme: "auto" as const,
    reducedMotion: "auto" as const,
    blur: 74,
    opacity: 0.42,
    grainSize: 1.1,
  },
};

/**
 * Quality Degradation Levels
 * Auto-selected based on device capabilities
 */
export const QUALITY_SETTINGS = {
  high: {
    filters: true,
    blur: 1.0,
    animations: true,
    grain: true,
  },
  medium: {
    filters: false,
    blur: 0.6,
    animations: true,
    grain: false,
  },
  low: {
    filters: false,
    blur: 0.0,
    animations: false,
    grain: false,
  },
};

/**
 * Helper to detect quality preference
 */
export function detectQualityPreference(): "high" | "medium" | "low" {
  if (typeof window === "undefined") return "high";

  // Check for low-power device
  if ((navigator as any).deviceMemory && (navigator as any).deviceMemory < 4) {
    return "low";
  }

  // Check for reduced motion preference
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(prefers-contrast: more)").matches
  ) {
    return "low";
  }

  // Check for dark mode on potentially low-power device
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "medium";
  }

  return "high";
}

/**
 * Merge preset with custom overrides
 */
export function mergePreset(
  preset: typeof BACKGROUND_PRESETS.subtle,
  overrides?: Partial<typeof BACKGROUND_PRESETS.subtle>
) {
  return { ...preset, ...overrides };
}
