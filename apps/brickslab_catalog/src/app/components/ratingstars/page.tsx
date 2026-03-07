"use client";
import React, { useState } from "react";
import { RatingStars } from "@brickslab./ui-web";
import { ComponentHeader, SectionTitle, Preview } from "../../../catalog/PageSection";
import { PropsTable, CodeBlock, type PropDef } from "@brickslab./ui-web";

const props: PropDef[] = [
  { name: "value", type: "number", required: false, description: "Current rating value." },
  { name: "onChange", type: "(v: number) => void", required: true, description: "Called with the new rating." },
  { name: "max", type: "number", required: false, default: "5", description: "Total number of icons." },
  { name: "allowHalf", type: "boolean", required: false, default: "false", description: "Enables half-point precision." },
  { name: "icon", type: '"star" | "heart" | "bolt"', required: false, default: '"star"', description: "Icon type." },
  { name: "disabled", type: "boolean", required: false, default: "false", description: "Disables all interactions." },
];

export default function RatingStarsPage() {
  const [stars, setStars] = useState<number | undefined>();
  const [half, setHalf] = useState<number | undefined>();
  const [hearts, setHearts] = useState<number | undefined>();
  const [bolts, setBolts] = useState<number | undefined>();

  return (
    <main>
      <ComponentHeader name="RatingStars" description="Star, heart or bolt icon rating with optional half-point precision and hover preview." section="Quiz" />

      <SectionTitle>Stars (5)</SectionTitle>
      <Preview>
        <RatingStars value={stars} onChange={setStars} />
      </Preview>

      <SectionTitle>Stars with half precision</SectionTitle>
      <Preview>
        <RatingStars value={half} onChange={setHalf} allowHalf />
      </Preview>

      <SectionTitle>Hearts (7)</SectionTitle>
      <Preview>
        <RatingStars value={hearts} onChange={setHearts} icon="heart" max={7} />
      </Preview>

      <SectionTitle>Bolts</SectionTitle>
      <Preview>
        <RatingStars value={bolts} onChange={setBolts} icon="bolt" />
      </Preview>

      <SectionTitle>Props</SectionTitle>
      <PropsTable props={props} />

      <SectionTitle>Usage</SectionTitle>
      <CodeBlock language="tsx" code={`import { RatingStars } from "@brickslab./ui-web";

const [rating, setRating] = useState<number | undefined>();

<RatingStars
  value={rating}
  onChange={setRating}
  max={5}
  allowHalf
  icon="star"
/>`} />
    </main>
  );
}
