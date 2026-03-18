import React from "react";

export interface HeaderLink {
  key?: string | number;
  label: React.ReactNode;
  href: string;
  current?: boolean;
}

export interface HeaderBarProps {

  /** Element racine */
  as?: React.ElementType;

  /** Logo custom (image, svg...) */
  logo?: React.ReactNode;

  /** Lien du logo */
  logoHref?: string;

  /** Titre si aucun logo */
  title?: React.ReactNode;

  /** Navigation custom */
  nav?: React.ReactNode;

  /** Liste simple de liens */
  links?: HeaderLink[];

  /** Zone actions (CTA, boutons...) */
  actions?: React.ReactNode;

  /** Etat initial du menu mobile */
  defaultMenuOpen?: boolean;

  /** Callback toggle menu */
  onMenuToggle?: (open: boolean) => void;

  /** Customisation CSS */
  className?: string;

  /** Test id */
  "data-testid"?: string;
}