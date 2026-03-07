export interface TopNavItem {
  label: string;
  href: string;
}

export interface TopNavProps {
  items: TopNavItem[];
  activePath?: string;
}
