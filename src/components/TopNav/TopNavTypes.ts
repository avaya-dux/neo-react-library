import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";

import { AvatarProps } from "components/Avatar";
import { ImageProps } from "components/Image";
import { ImageLinkProps } from "components/ImageLink";
import { MenuProps } from "components/Menu";
import { TabProps } from "components/Tab";
import { TextInputProps } from "components/TextInput";
import { IconNamesType } from "utils";

export interface TopNavAvatarProps {
  avatar: ReactElement<Omit<AvatarProps, "size" | "border" | "status">>;
  dropdown?: ReactElement<MenuProps>;
}

export interface TopNavButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  active?: boolean;
  badge?: string;
  icon?: IconNamesType;
  handleClick?: () => Promise<void> | void;
}

export interface TopNavSkipNavProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children?: ReactNode;
}

export interface TopNavProps {
  logo: ReactElement<ImageProps | ImageLinkProps>;
  children?: ReactNode;
  menuToggleBtn?: ReactElement<Partial<TopNavButtonProps>>;
  search?: ReactElement<TextInputProps>;
  skipNav?: ReactElement<TopNavSkipNavProps>;
  sticky?: boolean;
  tabs?: ReactElement<TabProps>;
  title?: string;
}

export interface TopNavSubComponents {
  Avatar: React.FC<TopNavAvatarProps>;
  Button: React.FC<TopNavButtonProps>;
  Search: React.FC<TextInputProps>;
  SkipNav: React.FC<TopNavSkipNavProps>;
}
