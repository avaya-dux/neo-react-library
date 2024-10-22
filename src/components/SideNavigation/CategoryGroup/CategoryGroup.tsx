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
		<div className={clsx("neo-nav-category-group", className)}>
			<div>{label}</div>

			<div>{children}</div>
		</div>
	);
};
CategoryGroup.displayName = "CategoryGroup";
