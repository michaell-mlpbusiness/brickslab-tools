import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

export type HeaderBarProps = {
  logo?: string | React.ReactNode;
  logoHeight?: number | string;
  logoAlt?: string;
  title?: string;
  titleSize?: number | string;
  titleMobileSize?: number | string;
  navigation?: React.ReactNode;
  actions?: React.ReactNode;

  navPosition?: "left" | "center" | "right";

  backgroundColor?: string;
  blur?: boolean;
  withBorder?: boolean;

  mobileBreakpoint?: number;

  className?: string;
  style?: React.CSSProperties;
};

function cx(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(" ");
}

function toCssLength(value?: number | string) {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "number") return `${value}px`;
  return value;
}

function unwrapMobileStack(node: React.ReactNode): React.ReactNode {
  if (!React.isValidElement(node)) return node;

  const element = node as React.ReactElement<any, any>;

  if (element.type === React.Fragment) {
    return element.props.children;
  }

  if (typeof element.type === "string" && (element.type === "div" || element.type === "span")) {
    const allowedProps = new Set(["children", "style", "className"]);
    const props = (element.props ?? {}) as Record<string, unknown>;
    const extraKeys = Object.keys(props).filter((k) => !allowedProps.has(k));
    if (extraKeys.length === 0) return (props.children as React.ReactNode) ?? null;
  }

  return node;
}

function isFullyTransparentColor(value: string) {
  const v = value.trim().toLowerCase();
  if (v === "transparent") return true;
  if (/^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0(?:\.0+)?\s*\)$/.test(v)) {
    return true;
  }
  if (/^hsla\(\s*[-\d.]+\s*,\s*[-\d.]+%\s*,\s*[-\d.]+%\s*,\s*0(?:\.0+)?\s*\)$/.test(v)) {
    return true;
  }
  return false;
}

const BLUR_FALLBACK_CSS = `
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .brick-hb.brick-hb--blur {
    background-color: var(--brick-hb-bg-fallback) !important;
  }
}
`;

const MIX_BG_60 = "color-mix(in srgb, var(--color-bg) 60%, transparent)";
const MIX_BG_92 = "color-mix(in srgb, var(--color-bg) 92%, transparent)";
const MIX_BG_55 = "color-mix(in srgb, var(--color-bg) 55%, transparent)";
const MIX_BG_95 = "color-mix(in srgb, var(--color-bg) 95%, transparent)";
const MIX_FG_08 = "color-mix(in srgb, var(--color-fg) 8%, transparent)";
const MIX_FG_10 = "color-mix(in srgb, var(--color-fg) 10%, transparent)";
const MIX_FG_22 = "color-mix(in srgb, var(--color-fg) 22%, transparent)";
const MIX_FG_35 = "color-mix(in srgb, var(--color-fg) 35%, transparent)";
const MIX_FG_92 = "color-mix(in srgb, var(--color-fg) 92%, transparent)";
const MIX_BRAND_18 = "color-mix(in srgb, var(--color-brand) 18%, transparent)";

export function HeaderBar({
  logo,
  logoHeight,
  logoAlt,
  title,
  titleSize,
  titleMobileSize,
  navigation,
  actions,
  navPosition = "left",
  backgroundColor,
  blur = false,
  withBorder = false,
  mobileBreakpoint = 768,
  className,
  style
}: HeaderBarProps) {
  const menuId = React.useId();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const closeMobileMenu = React.useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = React.useCallback(() => {
    setMobileMenuOpen((v) => !v);
  }, []);

  React.useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMobileMenu, mobileMenuOpen]);

  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const body = document.body;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = prevOverflow;
    };
  }, [mobileMenuOpen]);

  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const mq = window.matchMedia(`(min-width: ${mobileBreakpoint + 1}px)`);
    const onChange = () => {
      if (mq.matches) closeMobileMenu();
    };
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [closeMobileMenu, mobileBreakpoint, mobileMenuOpen]);

  const defaultBg = blur ? MIX_BG_60 : "var(--color-bg)";
  const defaultFallbackBg = MIX_BG_92;
  const resolvedBg = backgroundColor ?? defaultBg;
  const resolvedFallbackBg =
    blur && backgroundColor && isFullyTransparentColor(backgroundColor)
      ? defaultFallbackBg
      : backgroundColor ?? (blur ? defaultFallbackBg : resolvedBg);

  const resolvedLogoHeight = toCssLength(logoHeight);
  const resolvedTitleSize = toCssLength(titleSize);
  const resolvedTitleMobileSize = toCssLength(titleMobileSize);

  const rootStyle = {
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "var(--brick-hb-bg)",
    borderBottom: withBorder ? `var(--border-xm) solid ${MIX_FG_08}` : undefined,
    ...(blur
      ? ({
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)"
      } satisfies React.CSSProperties)
      : null),
    ["--brick-hb-bg" as never]: resolvedBg,
    ["--brick-hb-bg-fallback" as never]: resolvedFallbackBg,
    ["--brick-hb-logo-height" as never]: resolvedLogoHeight,
    ["--brick-hb-title-size" as never]: resolvedTitleSize,
    ["--brick-hb-title-size-mobile" as never]: resolvedTitleMobileSize,
    ...style
  } satisfies React.CSSProperties;

  const responsiveCss = `
@media (max-width: ${mobileBreakpoint}px) {
  .brick-hb__inner {
    padding: 10px 12px !important;
    gap: 12px !important;
    min-height: 52px !important;
  }

  .brick-hb__desktopNav,
  .brick-hb__desktopActions {
    display: none !important;
  }
  .brick-hb__burger {
    display: inline-flex !important;
  }
}

@media (max-width: ${Math.min(420, mobileBreakpoint)}px) {
  .brick-hb__title {
    display: none !important;
  }
}

.brick-hb__desktopNav {
  min-width: 0;
}

.brick-hb__desktopNav > * {
  min-width: 0;
}
`;

  const mobileMenuCss = `
.brick-hb__mobileNav,
.brick-hb__mobileActions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.brick-hb__mobileActions > * {
  min-width: 0;
}

.brick-hb__mobileNav nav,
.brick-hb__mobileNav > nav,
.brick-hb__mobileNav > * {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}

.brick-hb__mobileNav a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
  text-decoration: none;
  color: inherit;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  background: transparent;
  transition: transform 180ms ease, background 180ms ease, opacity 180ms ease;
  will-change: transform;
}

.brick-hb__mobileNav a:hover {
  background: ${MIX_BG_55};
  transform: translateX(2px);
  opacity: 1;
}

.brick-hb__mobileNav a:active {
  transform: translateX(1px) scale(0.99);
}
`;

  const innerStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    minHeight: 56,
    padding: "12px 16px",
    gap: 16
  };

  const leftStyle: React.CSSProperties = {
    flex: "1 1 0",
    display: "flex",
    alignItems: "center",
    gap: 16,
    minWidth: 0
  };

  const centerStyle: React.CSSProperties = {
    flex: "0 1 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 0
  };

  const rightStyle: React.CSSProperties = {
    flex: "1 1 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 16,
    minWidth: 0
  };

  const brandStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    minWidth: 0
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "var(--brick-hb-title-size, var(--fontsize-medium))",
    fontWeight: 650,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };

  const logoNode =
    typeof logo === "string" ? (
      <img
        src={logo}
        alt={logoAlt ?? title ?? "Logo"}
        style={{
          height: "var(--brick-hb-logo-height, 28px)",
          width: "auto",
          display: "block"
        }}
      />
    ) : (
      logo
    );

  const leftNavigation =
    navPosition === "left" && navigation ? (
      <div
        role="navigation"
        aria-label="Primary"
        className="brick-hb__desktopNav"
        style={{ display: "flex", minWidth: 0 }}
      >
        {navigation}
      </div>
    ) : null;

  const rightNavigation =
    navPosition === "right" && navigation ? (
      <div
        role="navigation"
        aria-label="Primary"
        className="brick-hb__desktopNav"
        style={{ display: "flex", minWidth: 0 }}
      >
        {navigation}
      </div>
    ) : null;

  const centerNavigation =
    navPosition === "center" && navigation ? (
      <div
        className="brick-hb__desktopNav"
        style={{
          display: "flex",
          justifyContent: "center",
          minWidth: 0
        }}
      >
        <div role="navigation" aria-label="Primary" style={{ minWidth: 0 }}>
          {navigation}
        </div>
      </div>
    ) : null;

  const hasMobileMenu = Boolean(navigation || actions);
  const burgerLineStyle: React.CSSProperties = {
    width: 20,
    height: 2,
    borderRadius: "var(--radius-full)",
    background: "currentColor",
    display: "block",
    willChange: "transform, opacity"
  };

  return (
    <header
      className={cx("brick-hb", blur && "brick-hb--blur", className)}
      style={rootStyle}
    >
      <style>
        {blur ? BLUR_FALLBACK_CSS : ""}
        {responsiveCss}
        {mobileMenuCss}
      </style>

      <div className="brick-hb__inner" style={innerStyle}>
        <div style={leftStyle}>
          {logoNode || title ? (
            <div style={brandStyle}>
              {logoNode ? <div style={{ flex: "0 0 auto" }}>{logoNode}</div> : null}
              {title ? (
                <div className="brick-hb__title" style={titleStyle}>
                  {title}
                </div>
              ) : null}
            </div>
          ) : null}

          {leftNavigation}
        </div>

        {centerNavigation ? <div style={centerStyle}>{centerNavigation}</div> : null}

        <div style={rightStyle}>
          {rightNavigation}
          {actions ? (
            <div
              className="brick-hb__desktopActions"
              style={{ display: "inline-flex", alignItems: "center", gap: 12 }}
            >
              {actions}
            </div>
          ) : null}

          {hasMobileMenu ? (
            <motion.button
              type="button"
              className="brick-hb__burger"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls={menuId}
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 600, damping: 32 }}
              style={{
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                border: `var(--border-xm) solid ${MIX_FG_08}`,
                borderRadius: "var(--radius-md)",
                background: blur ? MIX_BG_55 : MIX_BG_95,
                color: MIX_FG_92,
                cursor: "pointer",
                padding: 0,
                willChange: "transform"
              }}
            >
              <span style={{ display: "inline-flex", flexDirection: "column", gap: 4 }}>
                <motion.span
                  style={burgerLineStyle}
                  animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 720, damping: 40 }}
                />
                <motion.span
                  style={burgerLineStyle}
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.12, ease: "easeOut" }}
                />
                <motion.span
                  style={burgerLineStyle}
                  animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 720, damping: 40 }}
                />
              </span>
            </motion.button>
          ) : null}
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={closeMobileMenu}
              style={{
                position: "fixed",
                inset: 0,
                background: MIX_FG_35,
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                willChange: "opacity",
                zIndex: 1000
              }}
            />

            <motion.aside
              key="panel"
              id={menuId}
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, x: 34, rotate: 2, scale: 0.965 }}
              animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, x: 34, rotate: 2, scale: 0.98 }}
              transition={{
                opacity: { duration: 0.16, ease: "easeOut" },
                x: { type: "spring", stiffness: 520, damping: 38, mass: 0.85 },
                scale: { type: "spring", stiffness: 520, damping: 38, mass: 0.85 },
                rotate: { type: "spring", stiffness: 520, damping: 38, mass: 0.85 }
              }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "min(360px, 92vw)",
                backgroundColor: blur ? resolvedFallbackBg : resolvedBg,
                backgroundImage: `radial-gradient(120% 120% at 8% 0%, ${MIX_BRAND_18}, transparent 55%)`,
                borderLeft: `var(--border-xm) solid ${MIX_FG_10}`,
                boxShadow: `0 18px 60px ${MIX_FG_22}`,
                zIndex: 1001,
                display: "flex",
                flexDirection: "column",
                ...(blur
                  ? ({
                    backdropFilter: "blur(12px) saturate(1.2)",
                    WebkitBackdropFilter: "blur(12px) saturate(1.2)"
                  } satisfies React.CSSProperties)
                  : null),
                willChange: "transform, opacity"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  borderBottom: `var(--border-xm) solid ${MIX_FG_08}`
                }}
              >
                {logoNode || title ? (
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                    {logoNode ? <div style={{ flex: "0 0 auto" }}>{logoNode}</div> : null}
                    {title ? (
                      <div
                        style={{
                          ...titleStyle,
                          fontSize: "var(--brick-hb-title-size-mobile, var(--fontsize-sm))",
                          maxWidth: 220
                        }}
                      >
                        {title}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div style={{ fontSize: "var(--fontsize-sm)", fontWeight: 650 }}>Menu</div>
                )}

                <motion.button
                  type="button"
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 600, damping: 34 }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "var(--radius-md)",
                    border: `var(--border-xm) solid ${MIX_FG_08}`,
                    background: MIX_BG_60,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: MIX_FG_92,
                    fontSize: "var(--fontsize-medium)",
                    lineHeight: 1,
                    willChange: "transform"
                  }}
                >
                  ×
                </motion.button>
              </div>

              <div
                style={{
                  padding: "14px 16px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  overflow: "auto"
                }}
              >
                {navigation ? (
                  <div className="brick-hb__mobileNav" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {navigation}
                  </div>
                ) : null}

                {actions ? (
                  <div className="brick-hb__mobileActions" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {unwrapMobileStack(actions)}
                  </div>
                ) : null}
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
