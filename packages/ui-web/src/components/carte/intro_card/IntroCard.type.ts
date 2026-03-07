export interface IntroCardProps {
  title: string;
  description?: string;
  highlight?: string;
  cta?: {
    label: string;
    href: string;
  };
  background?: string;
}
