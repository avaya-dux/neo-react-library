import clsx from "clsx";
import { Button } from "components/Button";
import { Menu, MenuButton, MenuItem, type MenuProps } from "components/Menu";
import type { MenuChildrenType } from "components/Menu/MenuTypes";
import { type DetailedHTMLProps, type HTMLAttributes, useMemo } from "react";
import type { IconNamesType } from "utils";

import "./SplitButton_shim.css";
import { verifyFirstMenuItem } from "./helper";
import { Icon } from "components";

/**
 * SplitButtonProps
 * @prop {MenuChildrenType} children - The menu items to display in the dropdown.
 * @prop {string} [className] - The class name to add to the component.
 * @prop {"sm" | "md"} [height] - The height of the SplitButton.
 * @prop {MenuProps} [menuProps] - The props to pass to the Menu component.
 * @prop {ButtonProps} buttonProps - The props to pass to the Button component.
 */
type AtLeastOneProps =
	| { text: string; ariaLabel?: string; icon?: IconNamesType }
	| { text?: string; ariaLabel: string; icon: IconNamesType };
type SplitButtonButtonProps = {
	variant?: "primary" | "secondary";
	onClick?: () => void;
} & AtLeastOneProps;

type SplitButtonMenuProps = Omit<
	MenuProps,
	"menuRootElement" | "children" | "itemAlignment"
> & { ariaLabel?: string };
/**
 * Props for SplitButton component
 * @param {SplitButtonButtonProps} buttonProps - The props to pass to the Button component.
 * @param {SplitButtonMenuProps} menuProps - The props to pass to the Menu component.
 * @param {MenuChildrenType} children - The menu items to display in the dropdown.
 * @param {string} [className] - The class name to add to the component.
 * @param {"sm" | "md"} [height] - The height of the SplitButton.
 * @param {boolean} [createFirstMenuItem] - Whether to create a default menu item that behaves like the button if button text and onClick are defined.
 */
export interface SplitButtonProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	buttonProps?: SplitButtonButtonProps;
	menuProps?: SplitButtonMenuProps;
	children: MenuChildrenType;
	height?: "sm" | "md";
	createFirstMenuItem?: boolean;
}

/**
 * SplitButton is a button that has a dropdown menu attached to it.
 * It is used to provide a primary action and secondary actions in a single component.
 * The primary action is a button that can have an icon and text.
 * The secondary actions are menu items that are displayed in a dropdown menu.  The first menu item
 * should be created to behave like the primary button.  If the button text and onClick are defined,
 * and @param createFirstMenuItem is true, a menu item will be created that behaves like the button.
 * Set @param createFirstMenuItem to false to manually generate this menu item to comply with this requirement.
 *
 * @param {SplitButtonProps} props
 * @example
 * <SplitButton
 *    buttonProps={{
 *      variant: "primary",
 *      text: "Primary Button",
 *      onClick: () => console.log("Primary Button Clicked"),
 *      icon: "settings",
 *    }}
 * >
 *   <MenuItem onClick={() => console.log("Menu Item 1 Clicked")}>Menu Item 1</MenuItem>
 *   <MenuItem onClick={() => console.log("Menu Item 2 Clicked")}>Menu Item 2</MenuItem>
 * </SplitButton>
 */
export const SplitButton = ({
	buttonProps: {
		variant = "primary",
		text: buttonText,
		ariaLabel: buttonAriaLabel,
		onClick,
		icon,
	} = {} as SplitButtonButtonProps,
	height = "md",
	createFirstMenuItem = true,
	className,
	menuProps: {
		ariaLabel: menuButtonAriaLabel,
		...restMenu
	} = {} as SplitButtonMenuProps,
	children,
	...rest
}: SplitButtonProps) => {
	if (!createFirstMenuItem) {
		verifyFirstMenuItem(buttonText, onClick, children);
	}

	// create the first menu item that behaves like a button
	const firstMenuItem = useMemo(
		() =>
			createFirstMenuItem && buttonText && onClick ? (
				<MenuItem onClick={() => onClick()}>
					{icon && (
						<Icon className="menu-item__icon" icon={icon} aria-label={icon} />
					)}
					{buttonText}
				</MenuItem>
			) : null,
		[buttonText, icon, onClick, createFirstMenuItem],
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
				height === "md" && "neo-splitbutton--medium-height",
				height === "sm" && "neo-splitbutton--small-height",
				variant === "secondary" && "neo-splitbutton--secondary",
			)}
			{...rest}
		>
			<Button
				onClick={onClick}
				variant={variant}
				icon={icon}
				aria-label={buttonAriaLabel || buttonText || "Button"}
				className="neo-splitbutton__button"
			>
				{buttonText}
			</Button>
			<Menu
				menuRootElement={
					<MenuButton
						variant={variant}
						aria-label={menuButtonAriaLabel || "Split Button Menu"}
					>
						<span />
					</MenuButton>
				}
				{...restMenu}
				itemAlignment="right"
				className="neo-splitbutton__menu"
			>
				{menuItems}
			</Menu>
		</div>
	);
};

SplitButton.displayName = "SplitButton";
