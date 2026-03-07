import React from "react";
import { PropDef, PropsTableProps } from "./PropsTable.type";

const th: React.CSSProperties = {
  padding: "var(--space-2) var(--space-4)",
  textAlign: "left",
  fontSize: "var(--fontsize-xs)",
  fontWeight: "var(--fontweight-semibold)",
  color: "var(--color-muted)",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  borderBottom: "1px solid var(--c-border)",
  whiteSpace: "nowrap",
};

const td: React.CSSProperties = {
  padding: "var(--space-2) var(--space-4)",
  fontSize: "var(--fontsize-xs)",
  color: "var(--color-fg)",
  borderBottom: "1px solid var(--c-border)",
  verticalAlign: "top",
};

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        fontFamily: "var(--font-mono), ui-monospace, monospace",
        fontSize: "var(--fontsize-xs)",
        color: "var(--color-brand)",
        background: "var(--c-brand-subtle)",
        borderRadius: "var(--space-1-5)",
        padding: "var(--space-1) var(--space-1-5)",
      }}
    >
      {children}
    </code>
  );
}

function inferNameFromHeading(): string | null {
  if (typeof document === "undefined") return null;
  const heading = document.querySelector("h1");
  if (!heading?.textContent) return null;
  const value = heading.textContent.trim();
  return value.length > 0 ? value : null;
}

function inferValueFromType(type: string): string {
  const unionLiteral = type.match(/"([^"]+)"/);
  if (unionLiteral?.[1]) return `="${unionLiteral[1]}"`;
  if (type.includes("string")) return '="..."';
  if (type.includes("number")) return "={0}";
  if (type.includes("boolean")) return "={true}";
  if (type.includes("ReactNode")) return "={<span>...</span>}";
  if (type.includes("[]")) return "={[]}";
  return "={...}";
}

function formatPropValue(prop: PropDef): string {
  const d = prop.default?.trim();
  if (!d) return inferValueFromType(prop.type);
  if (d === "true" || d === "false") return `={${d}}`;
  if (/^-?\d+(\.\d+)?$/.test(d)) return `={${d}}`;
  if (
    (d.startsWith('"') && d.endsWith('"')) ||
    (d.startsWith("'") && d.endsWith("'"))
  ) {
    return `=${d}`;
  }
  return `={${d}}`;
}

function buildOverrideSnippet(
  componentName: string,
  props: PropDef[],
  previewLimit: number
): string {
  const previewProps = props.slice(0, previewLimit);
  const lines = [
    `<${componentName}`,
    ...previewProps.map((prop) => `  ${prop.name}${formatPropValue(prop)}`),
  ];

  if (props.length > previewLimit) {
    lines.push(`  // +${props.length - previewLimit} autres props disponibles`);
  }

  lines.push("/>");
  return lines.join("\n");
}

const TEXT_COMPONENT_NAME_HINTS = [
  "text",
  "heading",
  "typography",
  "aurora",
  "sparkle",
  "typing",
  "word",
  "noise",
  "gradient",
  "underline",
  "shimmer",
  "glow",
  "magnetic",
  "segment",
  "ticker",
];

const HEADER_COMPONENT_NAME_HINTS = [
  "header",
  "hero",
  "slogan",
  "headline",
];

const TEXT_CONTENT_PROP_HINTS = [
  "text",
  "texte",
  "title",
  "content",
  "label",
  "word",
  "words",
  "children",
];

const HEADER_CONTENT_PROP_HINTS = ["title", "subtitle", "eyebrow", "description"];

function parseUnionLiterals(type: string): string[] {
  const matches = type.match(/"([^"]+)"/g);
  if (!matches) return [];
  return matches.map((raw) => raw.slice(1, -1));
}

function findProp(props: PropDef[], aliases: string[]): PropDef | undefined {
  const aliasSet = new Set(aliases.map((alias) => alias.toLowerCase()));
  return props.find((prop) => aliasSet.has(prop.name.toLowerCase()));
}

function pickUnionLiteral(prop: PropDef, preferred: string[]): string | null {
  const values = parseUnionLiterals(prop.type);
  if (values.length === 0) return null;
  for (const pref of preferred) {
    const found = values.find((value) => value.toLowerCase() === pref.toLowerCase());
    if (found) return found;
  }
  return values[0];
}

function buildContentPropLine(prop: PropDef): string {
  if (prop.type.includes("string[]")) {
    return `${prop.name}={["Votre", "texte"]}`;
  }
  if (prop.type.includes("ReactNode")) {
    return `${prop.name}={<span>Votre texte</span>}`;
  }
  if (prop.type.includes("number")) {
    return `${prop.name}={1}`;
  }
  return `${prop.name}="Votre texte"`;
}

function isTextLikeComponent(componentName: string, props: PropDef[]): boolean {
  const lowerName = componentName.toLowerCase();
  if (TEXT_COMPONENT_NAME_HINTS.some((hint) => lowerName.includes(hint))) {
    return true;
  }

  const hasTextContentProp = props.some((prop) =>
    TEXT_CONTENT_PROP_HINTS.includes(prop.name.toLowerCase())
  );
  const hasTextStyleProp = props.some((prop) =>
    ["tone", "color", "textColor", "fontSize", "level"].includes(
      prop.name.toLowerCase()
    )
  );

  return hasTextContentProp && hasTextStyleProp;
}

function isHeaderLikeComponent(componentName: string, props: PropDef[]): boolean {
  const lowerName = componentName.toLowerCase();
  if (HEADER_COMPONENT_NAME_HINTS.some((hint) => lowerName.includes(hint))) {
    return true;
  }

  const hasTitle = props.some((prop) => prop.name.toLowerCase() === "title");
  const hasHeaderSecondaryContent = props.some((prop) =>
    ["subtitle", "eyebrow", "description"].includes(prop.name.toLowerCase())
  );
  const hasHeaderLayoutControl = props.some((prop) =>
    ["align", "variant"].includes(prop.name.toLowerCase())
  );

  return hasTitle && (hasHeaderSecondaryContent || hasHeaderLayoutControl);
}

function buildTextOverrideSnippet(componentName: string, props: PropDef[]): string {
  const lines: string[] = [];
  const componentLines: string[] = [];
  const wrapperStyleParts: string[] = [];
  const styleEntries: string[] = [];

  const contentProp = props.find((prop) =>
    TEXT_CONTENT_PROP_HINTS.includes(prop.name.toLowerCase())
  );
  if (contentProp && contentProp.name.toLowerCase() !== "children") {
    componentLines.push(buildContentPropLine(contentProp));
  }

  const styleProp = findProp(props, ["style"]);
  const sizeProp = findProp(props, ["size", "fontSize"]);
  const levelProp = findProp(props, ["level"]);
  const variantProp = findProp(props, ["variant"]);
  const colorProp = findProp(props, ["color", "textColor"]);
  const toneProp = findProp(props, ["tone"]);

  if (sizeProp) {
    const preferredSize = pickUnionLiteral(sizeProp, [
      "body-lg",
      "lg",
      "xl",
      "2xl",
      "body-md",
      "md",
      "body-sm",
      "sm",
      "caption",
    ]);
    if (preferredSize) {
      componentLines.push(`${sizeProp.name}="${preferredSize}"`);
    } else if (sizeProp.type.includes("number")) {
      componentLines.push(`${sizeProp.name}={20}`);
    } else {
      componentLines.push(`${sizeProp.name}="var(--fontsize-lg)"`);
    }
  } else if (levelProp) {
    componentLines.push(`${levelProp.name}={2}`);
  } else if (variantProp) {
    const preferredVariant = pickUnionLiteral(variantProp, [
      "body-lg",
      "lg",
      "xl",
      "h2",
      "title",
      "default",
    ]);
    if (preferredVariant) {
      componentLines.push(`${variantProp.name}="${preferredVariant}"`);
    } else if (styleProp) {
      styleEntries.push('fontSize: "var(--fontsize-lg)"');
    } else {
      wrapperStyleParts.push('fontSize: "var(--fontsize-lg)"');
    }
  } else if (styleProp) {
    styleEntries.push('fontSize: "var(--fontsize-lg)"');
  } else {
    wrapperStyleParts.push('fontSize: "var(--fontsize-lg)"');
  }

  if (colorProp) {
    const preferredColor = pickUnionLiteral(colorProp, [
      "brand",
      "primary",
      "accent",
      "default",
    ]);
    if (preferredColor) {
      componentLines.push(`${colorProp.name}="${preferredColor}"`);
    } else {
      componentLines.push(`${colorProp.name}="var(--color-brand)"`);
    }
  } else if (toneProp) {
    const preferredTone = pickUnionLiteral(toneProp, [
      "brand",
      "default",
      "muted",
    ]);
    if (preferredTone) {
      componentLines.push(`${toneProp.name}="${preferredTone}"`);
    } else {
      componentLines.push(`${toneProp.name}="brand"`);
    }
  } else if (styleProp) {
    styleEntries.push('color: "var(--color-brand)"');
  } else {
    wrapperStyleParts.push('color: "var(--color-brand)"');
  }

  if (styleEntries.length > 0) {
    componentLines.push(`style={{ ${styleEntries.join(", ")} }}`);
  }

  if (wrapperStyleParts.length > 0) {
    lines.push(`<div style={{ ${wrapperStyleParts.join(", ")} }}>`);
    lines.push(`  <${componentName}`);
    if (componentLines.length > 0) {
      lines.push(...componentLines.map((line) => `    ${line}`));
    }
    lines.push("  />");
    lines.push("</div>");
    return lines.join("\n");
  }

  lines.push(`<${componentName}`);
  if (componentLines.length > 0) {
    lines.push(...componentLines.map((line) => `  ${line}`));
  }
  lines.push("/>");
  return lines.join("\n");
}

function buildHeaderOverrideSnippet(componentName: string, props: PropDef[]): string {
  const componentLines: string[] = [];
  const titleProp = findProp(props, ["title"]);
  const subtitleProp = findProp(props, ["subtitle", "description"]);
  const eyebrowProp = findProp(props, ["eyebrow", "label"]);
  const alignProp = findProp(props, ["align"]);
  const variantProp = findProp(props, ["variant"]);

  if (titleProp) {
    componentLines.push(`${titleProp.name}="Votre titre"`);
  }
  if (subtitleProp) {
    componentLines.push(`${subtitleProp.name}="Votre sous-titre"`);
  }
  if (eyebrowProp) {
    componentLines.push(`${eyebrowProp.name}="Catégorie"`);
  }
  if (alignProp) {
    const alignValue = pickUnionLiteral(alignProp, ["left", "center", "right"]);
    if (alignValue) {
      componentLines.push(`${alignProp.name}="${alignValue}"`);
    }
  }
  if (variantProp) {
    const variantValue = pickUnionLiteral(variantProp, [
      "default",
      "compact",
      "hero",
    ]);
    if (variantValue) {
      componentLines.push(`${variantProp.name}="${variantValue}"`);
    }
  }

  const lines: string[] = [
    "<div",
    "  style={{",
    '    "--fontsize-3xl": "2.25rem",',
    '    "--fontsize-xl": "1.125rem",',
    '    "--color-fg": "#111827",',
    '    "--color-muted": "#4B5563",',
    '    "--color-brand": "#CC4A48",',
    "  } as React.CSSProperties}",
    ">",
    `  <${componentName}`,
    ...componentLines.map((line) => `    ${line}`),
    "  />",
    "</div>",
  ];

  return lines.join("\n");
}

export function PropsTable({
  props,
  componentName,
  showOverrideGuide = true,
  overridePreviewLimit = 8,
}: PropsTableProps) {
  const [inferredName, setInferredName] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (componentName) return;
    setInferredName(inferNameFromHeading());
  }, [componentName]);

  const resolvedComponentName = componentName || inferredName || "MyComponent";
  const overrideSnippet = React.useMemo(
    () => buildOverrideSnippet(resolvedComponentName, props, overridePreviewLimit),
    [resolvedComponentName, props, overridePreviewLimit]
  );
  const isTextLike = React.useMemo(
    () => isTextLikeComponent(resolvedComponentName, props),
    [resolvedComponentName, props]
  );
  const isHeaderLike = React.useMemo(
    () => isHeaderLikeComponent(resolvedComponentName, props),
    [resolvedComponentName, props]
  );
  const textOverrideSnippet = React.useMemo(() => {
    if (!isTextLike) return "";
    return buildTextOverrideSnippet(resolvedComponentName, props);
  }, [isTextLike, resolvedComponentName, props]);
  const headerOverrideSnippet = React.useMemo(() => {
    if (!isHeaderLike || isTextLike) return "";
    return buildHeaderOverrideSnippet(resolvedComponentName, props);
  }, [isHeaderLike, isTextLike, resolvedComponentName, props]);

  return (
    <div style={{ display: "grid", gap: "var(--space-3)" }}>
      <div
        style={{
          overflowX: "auto",
          border: "1px solid var(--c-border)",
          borderRadius: "var(--radius-md)",
        }}
      >
        <table style={{ width: "100%", minWidth: 600, borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "var(--c-surface)" }}>
            <tr>
              <th style={{ ...th, minWidth: 100 }}>Prop</th>
              <th style={{ ...th, minWidth: 120 }}>Type</th>
              <th style={{ ...th, minWidth: 80 }}>Défaut</th>
              <th style={{ ...th, minWidth: 60 }}>Requis</th>
              <th style={{ ...th, width: "100%", minWidth: 160 }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {props.map((p, i) => (
              <tr
                key={p.name}
                style={{
                  backgroundColor:
                    i % 2 === 0 ? "transparent" : "var(--c-table-row-alt)",
                }}
              >
                <td style={td}>
                  <Code>{p.name}</Code>
                </td>
                <td style={{ ...td, color: "var(--color-muted)" }}>
                  <Code>{p.type}</Code>
                </td>
                <td style={td}>
                  {p.default ? (
                    <Code>{p.default}</Code>
                  ) : (
                    <span style={{ color: "var(--color-muted)" }}>—</span>
                  )}
                </td>
                <td style={{ ...td, textAlign: "center" }}>
                  {p.required ? (
                    <span style={{ color: "var(--color-error)", fontWeight: "var(--fontweight-semibold)" }}>✓</span>
                  ) : (
                    <span style={{ color: "var(--color-muted)" }}>—</span>
                  )}
                </td>
                <td style={{ ...td, color: "var(--color-muted)", lineHeight: 1.5 }}>
                  {p.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showOverrideGuide && props.length > 0 && (
        <div
          style={{
            border: "1px solid var(--c-border)",
            borderRadius: "var(--radius-md)",
            background: "var(--c-surface)",
            padding: "var(--space-3)",
            display: "grid",
            gap: "var(--space-3)",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "var(--fontsize-xs)",
                fontWeight: "var(--fontweight-semibold)",
                color: "var(--color-fg)",
                marginBottom: "var(--space-2)",
              }}
            >
              Override rapide
            </div>
            <p
              style={{
                margin: 0,
                color: "var(--color-muted)",
                fontSize: "var(--fontsize-xs)",
                lineHeight: 1.5,
              }}
            >
              Tous les paramètres listés dans cette table sont overrideables via les props.
              Utilisez ce squelette comme point de départ.
            </p>
          </div>

          <pre
            style={{
              margin: 0,
              overflowX: "auto",
              border: "1px solid var(--c-border)",
              borderRadius: "var(--radius-sm)",
              background: "var(--c-surface-elevated)",
              padding: "var(--space-3)",
              fontSize: "var(--fontsize-xs)",
              color: "var(--color-fg)",
              lineHeight: 1.6,
              fontFamily: "var(--font-mono), ui-monospace, monospace",
            }}
          >
            {overrideSnippet}
          </pre>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-2)",
            }}
          >
            {props.map((prop) => (
              <Code key={prop.name}>{prop.name}</Code>
            ))}
          </div>

          {(isTextLike || isHeaderLike) && (
            <div
              style={{
                borderTop: "1px solid var(--c-border)",
                paddingTop: "var(--space-3)",
                display: "grid",
                gap: "var(--space-2)",
              }}
            >
              <div
                style={{
                  fontSize: "var(--fontsize-xs)",
                  fontWeight: "var(--fontweight-semibold)",
                  color: "var(--color-fg)",
                }}
              >
                {isTextLike
                  ? "Override texte: taille + couleur"
                  : "Override titre/sous-titre: taille + couleur"}
              </div>
              <p
                style={{
                  margin: 0,
                  color: "var(--color-muted)",
                  fontSize: "var(--fontsize-xs)",
                  lineHeight: 1.5,
                }}
              >
                {isTextLike
                  ? "Exemple cible pour personnaliser la taille et la couleur du texte avec les props disponibles sur ce composant."
                  : "Exemple cible pour personnaliser la taille et la couleur via les variables CSS (tokens) autour du composant."}
              </p>
              <pre
                style={{
                  margin: 0,
                  overflowX: "auto",
                  border: "1px solid var(--c-border)",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--c-surface-elevated)",
                  padding: "var(--space-3)",
                  fontSize: "var(--fontsize-xs)",
                  color: "var(--color-fg)",
                  lineHeight: 1.6,
                  fontFamily: "var(--font-mono), ui-monospace, monospace",
                }}
              >
                {isTextLike ? textOverrideSnippet : headerOverrideSnippet}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
