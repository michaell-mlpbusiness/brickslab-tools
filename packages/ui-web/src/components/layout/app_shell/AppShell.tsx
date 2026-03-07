import React from "react";
import { AppShellProps } from "./AppShell.type";

export function AppShell({
  header,
  sidebar,
  footer,
  children,
  sidebarWidth,
  headerHeight,
  footerHeight,
}: AppShellProps) {
  const resolvedHeaderHeight = headerHeight ?? (header ? 60 : 0);
  const resolvedFooterHeight = footerHeight ?? (footer ? 60 : 0);
  const resolvedSidebarWidth = sidebarWidth ?? 232;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {header && <div>{header}</div>}
      <div
        style={{
          display: "flex",
          flex: 1,
          marginTop: header ? resolvedHeaderHeight : 0,
          marginBottom: footer ? resolvedFooterHeight : 0,
        }}
      >
        {sidebar && (
          <div style={{ width: resolvedSidebarWidth, flexShrink: 0 }}>{sidebar}</div>
        )}
        <main
          style={{
            flex: 1,
            padding: "24px",
            boxSizing: "border-box",
            minWidth: 0,
          }}
        >
          {children}
        </main>
      </div>
      {footer && <div style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>{footer}</div>}
    </div>
  );
}
