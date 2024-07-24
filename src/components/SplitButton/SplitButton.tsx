import clsx from "clsx";
import { Button } from "components/Button";
import { Menu, MenuButton, MenuItem, type MenuProps } from "components/Menu";
import type { MenuChildrenType } from "components/Menu/MenuTypes";
import { type DetailedHTMLProps, type HTMLAttributes, useMemo } from "react";
import type { IconNamesType } from "utils";

import "./SplitButton_shim.css";

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
export interface SplitButtonProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	buttonProps?: SplitButtonButtonProps;
	menuProps?: SplitButtonMenuProps;
	children: MenuChildrenType;
	height?: "sm" | "md";
}

/**
 * SplitButton is a button that has a dropdown menu attached to it.
 * It is used to provide a primary action and secondary actions in a single component.
 * The primary action is a button that can have an icon and text.
 * The secondary actions are menu items that are displayed in a dropdown menu.
 * The SplitButton is used to save space in the UI and provide a clean user experience.
 * The SplitButton is used in the Neo design system.
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
	className,
	menuProps: {
		ariaLabel: menuButtonAriaLabel,
		...restMenu
	} = {} as SplitButtonMenuProps,
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
				className={clsx("neo-splitbutton__button")}
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
				className={clsx("neo-splitbutton__menu")}
			>
				{menuItems}
			</Menu>
		</div>
	);
};

SplitButton.displayName = "SplitButton";
