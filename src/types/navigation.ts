export interface NavigationItem {
  href: string;
  label: string;
  isExternal?: boolean;
}

export interface ActionButton {
  label: string;
  variant: 'default' | 'outline' | 'ghost';
  href?: string;
  onClick?: () => void;
}

export interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface HeaderConfig {
  logo: Logo;
  navigationItems: NavigationItem[];
  actionButtons: ActionButton[];
  mobileMenuTitle: string;
  mobileMenuDescription: string;
} 