import { HTMLAttributes, ReactElement } from "react";
import { TopLinkItemProps } from "./TopLinkItem";
import { IconNamesType } from "utils";

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
  onNavigate?: (id: string, url: string) => void;
  children?:
    | ReactElement<NavCategoryProps | TopLinkItemProps>
    | ReactElement<NavCategoryProps | TopLinkItemProps>[];
}

export interface NavigationContextType {
  currentUrl: string;
  onSelectedLink?: (id: string, url: string) => void;
}
