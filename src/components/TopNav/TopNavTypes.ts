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
import { TextInputProps } from "components/TextInput";
import { IconNamesType } from "utils";

export interface TopNavAvatarProps {
	avatar: ReactElement<Omit<AvatarProps, "size" | "border" | "status">>;
	dropdown?: ReactElement<MenuProps>;
}

export interface TopNavIconButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	"aria-label": string;
	active?: boolean;
	badge?: string;
	disabled?: boolean;
	icon?: IconNamesType;
}

export interface TopNavLinkButtonProps
	extends AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	active?: boolean;
	disabled?: boolean;
}

export interface TopNavSkipNavProps
	extends AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	children?: ReactNode;
}

export interface TopNavProps {
	logo: ReactElement<ImageProps | ImageLinkProps>;
	children?: ReactNode;
	menuToggleBtn?: ReactElement<Partial<TopNavIconButtonProps>>;
	search?: ReactElement<TextInputProps>;
	skipNav?: ReactElement<TopNavSkipNavProps>;
	sticky?: boolean;
	title?: string;
}

export interface TopNavSubComponents {
	Avatar: React.FC<TopNavAvatarProps>;
	IconButton: React.FC<TopNavIconButtonProps>;
	LinkButton: React.FC<TopNavLinkButtonProps>;
	Search: React.FC<TextInputProps>;
	SkipNav: React.FC<TopNavSkipNavProps>;
}
