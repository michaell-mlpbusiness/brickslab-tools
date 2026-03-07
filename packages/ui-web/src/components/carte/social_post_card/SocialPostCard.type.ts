import React from "react";

export interface SocialPostCardProps {
  platform?: "x" | "linkedin" | "custom";
  author: {
    name: string;
    handle?: string;
    avatarUrl?: string;
    url?: string;
  };
  content: string;
  date?: string | Date;
  media?: {
    type: "image" | "video";
    src: string;
    alt?: string;
  }[];
  metrics?: {
    likes?: number;
    reposts?: number;
    replies?: number;
  };
  href?: string;
  className?: string;
  variant?: "glass" | "solid";
  reducedMotion?: "auto" | "always" | "never";
}
