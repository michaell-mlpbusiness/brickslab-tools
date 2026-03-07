export interface SidebarNavItem {
  label: string;
  href: string;
}

export interface SidebarNavSection {
  title: string;
  items: SidebarNavItem[];
}

export interface SidebarNavProps {
  sections: SidebarNavSection[];
  activePath?: string;
  width?: number | string;
}
