export type SocialPlatform = "github" | "twitter" | "linkedin" | "instagram" | "youtube";
export interface SocialLink {
  platform: SocialPlatform;
  href: string;
}
export interface SocialLinksProps {
  links: SocialLink[];
  size?: "sm" | "md" | "lg";
}
