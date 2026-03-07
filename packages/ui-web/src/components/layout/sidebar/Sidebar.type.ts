export interface SidebarItem {
  label: string;
  href: string;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export interface SidebarProps {
  sections: SidebarSection[];
  activePath?: string;
  width?: number;
  topOffset?: number;
}
