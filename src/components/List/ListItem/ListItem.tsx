import clsx from "clsx";
import { Fragment, type ReactElement, type ReactNode } from "react";

import type { AvatarProps } from "components/Avatar";
import type { IconProps } from "components/Icon";
import { Tooltip, type TooltipPosition } from "components/Tooltip";

export interface ListItemProps {
	// biome-ignore lint/suspicious/noExplicitAny: we require maximum flexibility here
	actions?: ReactElement<any>[]; // TODO: fix this
	avatar?: ReactElement<AvatarProps>;
	children?: ReactNode;
	className?: string;
	icon?: ReactElement<IconProps>;
	showDivider?: boolean;
	tooltip?: string;
	tooltipPosition?: TooltipPosition;
}

/**
 * This component will typically be used as a child of the List component.
 */
export const ListItem = ({
	actions = [],
	avatar,
	children,
	className,
	icon,
	showDivider,
	tooltip,
	tooltipPosition = "auto",
}: ListItemProps) => {
	const avacon = avatar || icon;

	return (
		<li
			className={clsx(
				"neo-group-list__wrapper",
				showDivider && "neo-divider",
				className,
			)}
		>
			{tooltip ? (
				<Tooltip label={tooltip} position={tooltipPosition}>
					<div className="neo-group-list__item">{avacon}</div>
				</Tooltip>
			) : (
				<div className="neo-group-list__item">{avacon}</div>
			)}
			<div className="neo-group-list__item neo-group-list__item--middle">
				{children}
			</div>
			<div className="neo-group-list__item">
				{actions.map((action, index) => (
					<Fragment key={index}>{action}</Fragment>
				))}
			</div>
		</li>
	);
};
ListItem.displayName = "ListItem";
