import clsx from "clsx";

export interface MenuItemButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
}

export const MenuItemButton = ({
	className,
	children,
	...rest
}: MenuItemButtonProps) => {
	const classes = clsx("neo-dropdown__link", className);
	return (
		<button {...rest} className={classes} type="button" role="menuitem">
			{children}
		</button>
	);
};
