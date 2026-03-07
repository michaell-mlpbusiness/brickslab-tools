export interface BurgerMenuSection {
  title: string;
  items: BurgerMenuItemType[];
}

export interface BurgerMenuItemType {
  label: string;
  href: string;
  onClick?: () => void;
}

export interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  sections: BurgerMenuSection[];
  activePath?: string;
  width?: number;
}
