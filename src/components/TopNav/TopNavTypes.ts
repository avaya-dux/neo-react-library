import { ButtonHTMLAttributes, ReactElement } from "react";

import { AgentCardProps } from "components/AgentCard";
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

export interface TopNavProps {
  logo: ReactElement<ImageProps | ImageLinkProps>;
  search?: ReactElement<
    Pick<
      TextInputProps,
      | "clearable"
      | "disabled"
      | "placeholder"
      | "value"
      | "startIcon"
      | "aria-label"
      | "onChange"
    >
  >;
  title?: string;
  sticky?: boolean;
  skipLabel?: string;
  skipHref?: string;
  buttons?: ReactElement<TopNavButtonProps>[];
  menuToggleBtn?: ReactElement<Partial<TopNavButtonProps>>;
  tabs?: ReactElement<TabProps>;
  userOptions?: ReactElement<AgentCardProps | TopNavAvatarProps>;
}

export interface TopNavSubComponents {
  Avatar: React.FC<TopNavAvatarProps>;
  Button: React.FC<TopNavButtonProps>;
}
