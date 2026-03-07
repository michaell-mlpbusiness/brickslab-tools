export interface FooterLinksItem {
  label: string;
  href: string;
}
export interface FooterLinksProps {
  title?: string;
  links: FooterLinksItem[];
}
