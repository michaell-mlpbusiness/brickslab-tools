"use client";

import { SocialPostCard } from "@brickslab./ui-web";
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
    name: "author",
    type: 'object: { name, handle?, avatarUrl?, url? }',
    required: true,
    description: "Author information including name, optional handle, avatar, and profile URL.",
  },
  {
    name: "content",
    type: "string",
    required: true,
    description: "Post content/text.",
  },
  {
    name: "platform",
    type: '"x" | "linkedin" | "custom"',
    default: '"custom"',
    description: 'Social platform indicator. Determines icon display.',
  },
  {
    name: "date",
    type: "string | Date",
    description: "Post date (auto-formatted if Date object).",
  },
  {
    name: "media",
    type: "array: { type, src, alt? }[]",
    description: "Array of images or videos attached to post.",
  },
  {
    name: "metrics",
    type: "object: { likes?, reposts?, replies? }",
    description: "Engagement metrics displayed at bottom.",
  },
  {
    name: "href",
    type: "string",
    description: "Link to original post. Renders as anchor if provided.",
  },
  {
    name: "variant",
    type: '"glass" | "solid"',
    default: '"solid"',
    description: 'Styling variant: glassmorphism or solid background.',
  },
];

const usageCode = `import { SocialPostCard } from "@brickslab./ui-web";

// X/Twitter style post
<SocialPostCard
  platform="x"
  author={{ name: "John Doe", handle: "johndoe" }}
  content="Building amazing products with React!"
  date={new Date()}
  metrics={{ likes: 234, reposts: 45, replies: 12 }}
  href="https://twitter.com/..."
/>

// LinkedIn style
<SocialPostCard
  platform="linkedin"
  author={{ name: "Jane Smith", avatarUrl: "/avatar.jpg" }}
  content="Excited to announce..."
  variant="solid"
/>

// With media
<SocialPostCard
  author={{ name: "Designer" }}
  content="Check out the new design:"
  media={[{ type: "image", src: "/design.jpg", alt: "Design" }]}
  variant="glass"
/>`;

export default function SocialPostCardPage() {
  return (
    <div>
      <ComponentHeader
        name="SocialPostCard"
        description="Data-driven social media post card component. Supports X, LinkedIn, and custom platforms with optional media, metrics, and glassmorphism variant. Perfect for testimonials, posts, and social feeds."
      />

      <SectionTitle>Aperçu</SectionTitle>

      <SubLabel>X/Twitter Style</SubLabel>
      <Preview>
        <div style={{ maxWidth: "500px" }}>
          <SocialPostCard
            platform="x"
            author={{
              name: "Alex Rivera",
              handle: "alexrivera",
              avatarUrl: "https://i.pravatar.cc/150?u=alex",
            }}
            content="Just shipped a new design system component library! It's been months in the making and I'm really proud of what we've built. 🚀"
            date={new Date("2024-03-05")}
            metrics={{ likes: 1234, reposts: 456, replies: 789 }}
            variant="solid"
          />
        </div>
      </Preview>

      <SubLabel>LinkedIn Style with Custom Platform</SubLabel>
      <Preview>
        <div style={{ maxWidth: "500px" }}>
          <SocialPostCard
            platform="linkedin"
            author={{
              name: "Sofia Martinez",
              handle: "sofiamartinez",
              avatarUrl: "https://i.pravatar.cc/150?u=sofia",
            }}
            content="Thrilled to share that our team just completed Phase 2 of our component library refactoring. The improvements in performance and DX are significant!"
            date={new Date("2024-03-04")}
            metrics={{ likes: 567, reposts: 89, replies: 234 }}
            variant="solid"
          />
        </div>
      </Preview>

      <SubLabel>Glassmorphism Variant</SubLabel>
      <Preview>
        <div
          style={{
            maxWidth: "500px",
            backgroundImage: "linear-gradient(135deg, var(--color-brand), #4ADE80)",
            padding: "var(--space-8)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          <SocialPostCard
            platform="custom"
            author={{
              name: "Creative Dev",
              avatarUrl: "https://i.pravatar.cc/150?u=creative",
            }}
            content="The glassmorphism effect looks stunning over colorful backgrounds. Perfect for hero sections!"
            date={new Date()}
            metrics={{ likes: 345, reposts: 67, replies: 123 }}
            variant="glass"
          />
        </div>
      </Preview>

      <SubLabel>Compact (No Metrics)</SubLabel>
      <Preview>
        <div style={{ maxWidth: "500px" }}>
          <SocialPostCard
            author={{
              name: "Minimal UI",
              handle: "minimalui",
            }}
            content="Simple post without engagement metrics. Great for portfolios and testimonials."
            variant="solid"
          />
        </div>
      </Preview>

      <SectionTitle>Props Table</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock code={usageCode} language="tsx" />
    </div>
  );
}
