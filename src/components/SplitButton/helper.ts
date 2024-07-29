import { MenuItem } from "components/Menu";
import { Children, type ReactNode, isValidElement } from "react";
import { reactNodeToString } from "utils";

export const verifyFirstMenuItem = (
	buttonText?: string,
	onClick?: () => void,
	children?: ReactNode,
) => {
	if (!children || Children.count(children) === 0) {
		throw new Error(
			"The first menu item must be provided if createFirstMenuItem is false.",
		);
	}

	const firstChild = Children.toArray(children)[0];
	if (!isValidElement(firstChild) || firstChild.type !== MenuItem) {
		throw new Error(
			"The first menu item must be a valid MenuItem if createFirstMenuItem is false.",
		);
	}

	const { onClick: menuOnClick, children: menuChildren } = firstChild.props;
	if (buttonText && reactNodeToString(menuChildren) !== buttonText) {
		throw new Error(
			"The first menu item text must match the button text if createFirstMenuItem is false.",
		);
	}

	if (onClick && menuOnClick !== onClick) {
		throw new Error(
			"The first menu item onClick handler must match the button onClick handler if createFirstMenuItem is false.",
		);
	}
};
