export interface ThemeToggleProps {
  onThemeChange?: (theme: "light" | "dark") => void;
  lightLabel?: string;
  darkLabel?: string;
  storageKey?: string;
}
