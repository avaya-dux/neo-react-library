import clsx from "clsx";
import { useMemo, type DetailedHTMLProps, type HTMLAttributes } from "react";

import "./SplitButton_shim.css";
import { Button } from "components/Button";
import { Menu, MenuButton, MenuItem, type MenuProps } from "components/Menu";
import type { IconNamesType } from "utils";
import type { MenuChildrenType } from "components/Menu/MenuTypes";

export interface SplitButtonProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	buttonProps: {
		variant?: "primary" | "secondary";
		icon?: IconNamesType;
		text?: string;
		onClick?: () => void;
	};

	menuProps?: Omit<MenuProps, "menuRootElement" | "children">;
	children: MenuChildrenType;
	height?: "sm" | "md";
}

export const SplitButton = ({
	buttonProps: { variant = "primary", text: buttonText, onClick, icon } = {},
	height = "md",
	className,
	menuProps = {},
	children,
	...rest
}: SplitButtonProps) => {
	// create the first menu item that behaves like a button
	const firstMenuItem = useMemo(
		() =>
			buttonText && onClick ? (
				<MenuItem onClick={() => onClick()}>{buttonText}</MenuItem>
			) : null,
		[buttonText, onClick],
	);
	const menuItems = useMemo(() => {
		if (firstMenuItem) {
			return [firstMenuItem, ...children];
		}
		return children;
	}, [children, firstMenuItem]);
	return (
		<div
			className={clsx(
				"neo-splitbutton",
				className,
				height === "md" && "neo-splitbutton--midium-height",
				height === "sm" && "neo-splitbutton--small-height",
				variant === "secondary" && "neo-splitbutton--secondary",
			)}
			{...rest}
		>
			<Button
				onClick={onClick}
				variant={variant}
				icon={icon}
				className={clsx("neo-splitbutton__button")}
			>
				{buttonText}
			</Button>
			<Menu
                menuRootElement={<MenuButton variant={variant}><span/></MenuButton>}
                {...menuProps}
				itemAlignment="right"
				className={clsx("neo-splitbutton__menu")}
			>
				{menuItems}
			</Menu>
		</div>
	);
};

SplitButton.displayName = "SplitButton";
