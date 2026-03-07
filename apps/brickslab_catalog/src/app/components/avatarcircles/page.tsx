"use client";

import { AvatarCircles } from "@brickslab./ui-web";
import {
  ComponentHeader,
  SectionTitle,
  SubLabel,
  PropTag,
  Preview,
} from "../../../catalog/PageSection";
import { PropsTable, type PropDef } from "../../../catalog/PropsTable";
import { CodeBlock } from "../../../catalog/CodeBlock";

const props: PropDef[] = [
  {
    name: "avatarUrls",
    type: 'array: { imageUrl, profileUrl? }[]',
    required: true,
    description: "Array of avatar objects with image URL and optional profile link.",
  },
  {
    name: "size",
    type: "number",
    default: "40",
    description: "Avatar diameter in pixels.",
  },
  {
    name: "overlap",
    type: "number",
    default: "10",
    description: "Overlap between stacked avatars in pixels.",
  },
  {
    name: "max",
    type: "number",
    default: "5",
    description: "Maximum number of avatars to show. Remaining count shown as +N badge.",
  },
  {
    name: "numPeople",
    type: "number",
    description: "Total people count to display as label (e.g., '42 people').",
  },
  {
    name: "showTooltip",
    type: "boolean",
    default: "false",
    description: "Show avatar URL as tooltip on hover.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS class for custom styling.",
  },
];

const usageCode = `import { AvatarCircles } from "@brickslab./ui-web";

const avatars = [
  { imageUrl: "https://i.pravatar.cc/150?u=1" },
  { imageUrl: "https://i.pravatar.cc/150?u=2" },
  { imageUrl: "https://i.pravatar.cc/150?u=3" },
];

// Basic usage
<AvatarCircles avatarUrls={avatars} />

// With people count
<AvatarCircles 
  avatarUrls={avatars} 
  numPeople={42}
  max={5}
/>

// Custom size and overlap
<AvatarCircles 
  avatarUrls={avatars}
  size={50}
  overlap={15}
/>

// With profile links
<AvatarCircles 
  avatarUrls={[
    { imageUrl: "...", profileUrl: "/profile/user1" },
    { imageUrl: "...", profileUrl: "/profile/user2" }
  ]}
/>`;

export default function AvatarCirclesPage() {
  return (
    <div>
      <ComponentHeader
        name="AvatarCircles"
        description="Stacked avatar circles component with overlap and counter badge. Shows a maximum number of avatars with a +N indicator for remaining users. Perfect for team displays, collaborators, and user groups."
      />

      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>Basic Stack (3 avatars)</SubLabel>
      <Preview>
        <AvatarCircles
          avatarUrls={[
            { imageUrl: "https://i.pravatar.cc/150?u=user1" },
            { imageUrl: "https://i.pravatar.cc/150?u=user2" },
            { imageUrl: "https://i.pravatar.cc/150?u=user3" },
          ]}
        />
      </Preview>

      <SubLabel>With People Count Label</SubLabel>
      <Preview>
        <AvatarCircles
          avatarUrls={[
            { imageUrl: "https://i.pravatar.cc/150?u=user1" },
            { imageUrl: "https://i.pravatar.cc/150?u=user2" },
            { imageUrl: "https://i.pravatar.cc/150?u=user3" },
            { imageUrl: "https://i.pravatar.cc/150?u=user4" },
          ]}
          numPeople={42}
        />
      </Preview>

      <SubLabel>Max 4 with +N Badge</SubLabel>
      <Preview>
        <AvatarCircles
          avatarUrls={[
            { imageUrl: "https://i.pravatar.cc/150?u=user1" },
            { imageUrl: "https://i.pravatar.cc/150?u=user2" },
            { imageUrl: "https://i.pravatar.cc/150?u=user3" },
            { imageUrl: "https://i.pravatar.cc/150?u=user4" },
            { imageUrl: "https://i.pravatar.cc/150?u=user5" },
            { imageUrl: "https://i.pravatar.cc/150?u=user6" },
          ]}
          max={4}
          numPeople={18}
        />
      </Preview>

      <SubLabel>Larger Size (60px) with Custom Overlap</SubLabel>
      <Preview>
        <AvatarCircles
          avatarUrls={[
            { imageUrl: "https://i.pravatar.cc/150?u=user1" },
            { imageUrl: "https://i.pravatar.cc/150?u=user2" },
            { imageUrl: "https://i.pravatar.cc/150?u=user3" },
          ]}
          size={60}
          overlap={15}
        />
      </Preview>

      <SubLabel>With Clickable Profile Links</SubLabel>
      <Preview>
        <AvatarCircles
          avatarUrls={[
            { imageUrl: "https://i.pravatar.cc/150?u=user1", profileUrl: "/profile/1" },
            { imageUrl: "https://i.pravatar.cc/150?u=user2", profileUrl: "/profile/2" },
            { imageUrl: "https://i.pravatar.cc/150?u=user3", profileUrl: "/profile/3" },
          ]}
        />
      </Preview>

      <SectionTitle>Props Table</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />
    </div>
  );
}
