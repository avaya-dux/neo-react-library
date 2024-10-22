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
		<div className={clsx(className)} {...rest}>
			<button
				type="button"
				className="neo-btn neo-btn-secondary--info"
			>
				{label}
			</button>

			<div>{children}</div>
		</div>
	);
};

SubCategory.displayName = "SubCategory";
