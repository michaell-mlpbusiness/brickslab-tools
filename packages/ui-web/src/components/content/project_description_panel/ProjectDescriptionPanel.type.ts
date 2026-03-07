export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectDescriptionPanelProps {
  title: string;
  description: string;
  tags?: string[];
  links?: ProjectLink[];
}
