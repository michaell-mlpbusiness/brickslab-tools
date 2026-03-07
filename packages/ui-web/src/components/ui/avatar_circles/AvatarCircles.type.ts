import React from "react";

export interface AvatarCirclesProps {
  avatarUrls: {
    imageUrl: string;
    profileUrl?: string;
  }[];
  numPeople?: number;
  className?: string;
  size?: number;
  overlap?: number;
  max?: number;
  showTooltip?: boolean;
}
