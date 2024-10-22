import clsx from "clsx";
import type { ReactNode } from "react";

export interface SideNavigationCategoryGroupProps {
	children: ReactNode;
	className?: string;
	label: string;
}

export const CategoryGroup = ({
	children,
	className,
	label,
}: SideNavigationCategoryGroupProps) => {
	return (
		<li className={clsx("neo-nav-category-group", className)}>
			<div>{label}</div>

			<ul>{children}</ul>
		</li>
	);
};
CategoryGroup.displayName = "CategoryGroup";
