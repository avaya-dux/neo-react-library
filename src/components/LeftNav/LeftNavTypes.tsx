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

type EnforcedAccessibleLabel =
  | { "aria-label": string }
  | { "aria-labelledby": string };

export type LeftNavProps = {
  currentUrl?: string;
  isActiveOverride?: boolean;
  onNavigate?: (id: string, url: string) => void;
  children?:
    | ReactElement<NavCategoryProps | TopLinkItemProps>
    | ReactElement<NavCategoryProps | TopLinkItemProps>[];
} & React.BaseHTMLAttributes<HTMLElement> &
  EnforcedAccessibleLabel;

export interface LeftNavSubComponents {
  LinkItem: React.FC<LinkItemProps>;
  NavCategory: React.FC<NavCategoryProps>;
  TopLinkItem: React.FC<TopLinkItemProps>;
}

export interface LeftNavContextType {
  currentUrl: string;
  onSelectedLink?: (id: string, url: string) => void;
  isActiveOverride?: boolean;
  hasCustomOnNavigate?: boolean;
}
