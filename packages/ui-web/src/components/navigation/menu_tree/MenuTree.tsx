import React from "react";
import { MenuTreeProps, MenuTreeItem } from "./MenuTree.type";

function MenuTreeNode({
  item,
  activePath,
  level,
}: {
  item: MenuTreeItem;
  activePath?: string;
  level: number;
}) {
  const isActive = item.href !== undefined && item.href === activePath;

  return (
    <div>
      {item.href ? (
        <a
          href={item.href}
          style={{
            display: "block",
            paddingLeft: level * 12,
            paddingTop: "var(--space-1-5)",
            paddingBottom: "var(--space-1-5)",
            fontSize: "var(--fontsize-xs)",
            color: isActive ? "var(--color-brand)" : "var(--color-muted)",
            fontWeight: isActive ? "var(--fontweight-semibold)" : "var(--fontweight-normal)",
            textDecoration: "none",
            transition: "color 0.15s",
          }}
        >
          {item.label}
        </a>
      ) : (
        <span
          style={{
            display: "block",
            paddingLeft: level * 12,
            paddingTop: "var(--space-1-5)",
            paddingBottom: "var(--space-1-5)",
            fontSize: "var(--fontsize-xs)",
            color: "var(--color-muted)",
            fontWeight: "var(--fontweight-normal)",
          }}
        >
          {item.label}
        </span>
      )}
      {item.children && item.children.length > 0 && (
        <div>
          {item.children.map((child, index) => (
            <MenuTreeNode
              key={`${child.label}-${index}`}
              item={child}
              activePath={activePath}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function MenuTree({ items, activePath, level = 0 }: MenuTreeProps) {
  return (
    <div>
      {items.map((item, index) => (
        <MenuTreeNode
          key={`${item.label}-${index}`}
          item={item}
          activePath={activePath}
          level={level}
        />
      ))}
    </div>
  );
}
