"use client";

import React from "react";
import { CodeBlock as UiCodeBlock } from "@brickslab./ui-web";

type LegacyCodeBlockProps = {
  language?: string;
  title?: string;
  children?: React.ReactNode;
};

type ModernCodeBlockProps = {
  code?: string;
  filename?: string;
  variant?: "modern" | "simple";
};

type CodeBlockProps = LegacyCodeBlockProps & ModernCodeBlockProps;

/**
 * Compatibility wrapper for catalog pages:
 * - legacy API: <CodeBlock title>...</CodeBlock>
 * - modern API: <CodeBlock code filename />
 */
export function CodeBlock({
  code,
  children,
  title,
  filename,
  language,
  variant,
}: CodeBlockProps) {
  const resolvedCode =
    code ??
    (typeof children === "string" || typeof children === "number"
      ? String(children)
      : "");

  return (
    <UiCodeBlock
      code={resolvedCode}
      language={language}
      filename={filename ?? title}
      variant={variant}
    />
  );
}
