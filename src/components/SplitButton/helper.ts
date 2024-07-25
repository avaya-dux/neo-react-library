import { MenuItem } from "components/Menu";
import { Children, type ReactNode, isValidElement } from "react";
import { reactNodeToString } from "utils";

export const verifyFirstMenuItem = (
	buttonText?: string,
	onClick?: () => void,
	children?: ReactNode,
) => {
	if (Children.count(children) === 0) {
		throw new Error(
			"If createFirstMenuItem is false, the first menu item must be provided.",
		);
	}
	const firstChild = Children.toArray(children)[0];
	if (!isValidElement(firstChild) || firstChild.type !== MenuItem) {
		throw new Error(
			"If createFirstMenuItem is false, the first menu item must be a MenuItem.",
		);
	}
	const { onClick: menuOnClick, children: menuChildren } = firstChild.props;
	if (!!buttonText && reactNodeToString(menuChildren) !== buttonText) {
		throw new Error(
			"If createFirstMenuItem is false, the first menu item should have the same text as the button.",
		);
	}
	if (!onClick || menuOnClick !== onClick) {
		throw new Error(
			"If createFirstMenuItem is false, the first menu item should have the same onClick handler.",
		);
	}
};
