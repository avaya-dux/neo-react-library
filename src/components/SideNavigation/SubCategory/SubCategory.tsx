import clsx from "clsx";
import type { FC, ReactNode } from "react";

export interface SideNavigationSubCategoryProps {
	children: ReactNode;
	className?: string;
	label: string;
}

export const SubCategory: FC<SideNavigationSubCategoryProps> = ({
	children,
	className,
	label,
	...rest
}) => {
	return (
		<li className={clsx("neo-nav-sub-category", className)} {...rest}>
			<button type="button" className="neo-btn">
				{label}
			</button>

			<ul>{children}</ul>
		</li>
	);
};

SubCategory.displayName = "SubCategory";
