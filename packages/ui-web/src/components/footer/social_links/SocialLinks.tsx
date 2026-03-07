import React from "react";
import { FiGithub, FiTwitter, FiLinkedin, FiInstagram, FiYoutube } from "react-icons/fi";
import { SocialLinksProps, SocialPlatform } from "./SocialLinks.type";

const iconMap: Record<SocialPlatform, React.ElementType> = {
  github: FiGithub,
  twitter: FiTwitter,
  linkedin: FiLinkedin,
  instagram: FiInstagram,
  youtube: FiYoutube,
};

const sizeMap: Record<NonNullable<SocialLinksProps["size"]>, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

export function SocialLinks({ links, size = "md" }: SocialLinksProps) {
  const iconSize = sizeMap[size];

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      {links.map((link) => {
        const Icon = iconMap[link.platform];
        return (
          <a
            key={link.platform}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.platform}
            style={{
              display: "flex",
              color: "var(--color-muted)",
              transition: "color 0.15s",
            }}
          >
            <Icon size={iconSize} />
          </a>
        );
      })}
    </div>
  );
}
