export interface MenuTreeItem {
  label: string;
  href?: string;
  children?: MenuTreeItem[];
}

export interface MenuTreeProps {
  items: MenuTreeItem[];
  activePath?: string;
  level?: number;
}
