import { HTMLAttributes, ReactElement } from "react";

import { IconNamesType } from "utils";

export interface TopLinkItemProps {
  label: string;
  href: string;
  disabled?: boolean;
  icon?: IconNamesType;
  id?: string;
  className?: string;
}

export interface LinkItemProps
  extends HTMLAttributes<HTMLLIElement | HTMLAnchorElement> {
  children: string;
  active?: boolean;
  disabled?: boolean;
  href: string;
  parentHasIcon?: boolean;
}
export interface NavCategoryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: IconNamesType;
  expanded?: boolean;
  disabled?: boolean;
  active?: boolean;
  children?: ReactElement<LinkItemProps> | ReactElement<LinkItemProps>[];
}
export interface LeftNavProps extends React.BaseHTMLAttributes<HTMLElement> {
  "aria-label": string;
  currentUrl?: string;
  isActiveOverride?: boolean;
  onNavigate?: (id: string, url: string) => void;
  children?:
    | ReactElement<NavCategoryProps | TopLinkItemProps>
    | ReactElement<NavCategoryProps | TopLinkItemProps>[];
}

export interface LeftNavSubComponents {
  LinkItem: React.FC<LinkItemProps>;
  NavCategory: React.FC<NavCategoryProps>;
  TopLinkItem: React.FC<TopLinkItemProps>;
}

export interface LeftNavContextType {
  currentUrl: string;
  onSelectedLink?: (id: string, url: string) => void;
  isActiveOverride?: boolean;
}
