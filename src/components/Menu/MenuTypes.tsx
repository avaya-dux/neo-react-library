import type { Dispatch, ReactElement, SetStateAction } from "react";

import type { AvatarProps } from "components/Avatar";
import type { ButtonProps } from "components/Button";

export type MenuSeparatorProps = React.HTMLAttributes<HTMLHRElement>;

export type ActionType = "ENTER_SUB_MENU" | "ACTIVATE_MENU_ITEM" | "";
// TODO-737: disabled
export interface MenuItemProps
	extends React.AnchorHTMLAttributes<HTMLDivElement> {
	counter?: number;
	disabled?: boolean;
	hasFocus?: boolean;
	isActive?: boolean;
}
export interface SubMenuProps extends React.HTMLAttributes<HTMLDivElement> {
	menuRootElement: ReactElement<MenuItemProps>;
	children: ReactElement<MenuItemProps | SubMenuProps | MenuSeparatorProps>[];
	action?: ActionType;
	counter?: number;
}

export type MenuChildrenType = ReactElement<
	MenuItemProps | SubMenuProps | MenuSeparatorProps
>[];

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
	children: MenuChildrenType;
	closeOnBlur?: boolean; // if `true` (default), the menu will close when you click outside the menu list
	closeOnSelect?: boolean; // if `true` (default), the menu will close when a menu item is clicked
	defaultIsOpen?: boolean;
	itemAlignment?: "left" | "right";
	menuRootElement: ReactElement<ButtonProps | AvatarProps>;
	onMenuClose?: () => void;
	openOnHover?: boolean;
	positionToToggle?: "below" | "left" | "right";
}

export type MenuIndexesType = {
	index?: number;
	id?: string;
	length?: number;
}[];

export interface MenuContextType
	extends Required<Pick<MenuProps, "closeOnSelect">> {
	upwards: boolean;
	setRootMenuOpen: Dispatch<SetStateAction<boolean>>;
}
