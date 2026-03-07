export interface LinkListItem {
  label: string;
  href: string;
  description?: string;
}
export interface LinkListProps {
  links: LinkListItem[];
  title?: string;
}
