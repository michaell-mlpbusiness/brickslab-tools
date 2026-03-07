export interface FooterLegalLink {
  label: string;
  href: string;
}
export interface FooterLegalProps {
  copyright?: string;
  year?: number;
  links?: FooterLegalLink[];
}
