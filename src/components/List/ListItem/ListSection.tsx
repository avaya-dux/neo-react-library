import clsx from "clsx";
import {
	type CSSProperties,
	Fragment,
	type FunctionComponent,
	type ReactElement,
	type ReactNode,
} from "react";

import type { AvatarProps } from "components/Avatar";
import type { IconProps } from "components/Icon";
import { Tooltip, type TooltipPosition } from "components/Tooltip";

export interface ListSectionProps {
	// biome-ignore lint/suspicious/noExplicitAny: we require maximum flexibility here
	actions?: ReactElement<any>[]; // TODO: fix this
	avatar?: ReactElement<AvatarProps>;
	children?: ReactNode;
	className?: string;
	hover?: boolean;
	icon?: ReactElement<IconProps>;
	style?: CSSProperties;
	tooltip?: string;
	tooltipPosition?: TooltipPosition;
}

/**
 * This component will typically be used as a child of the List component.
 */
export const ListSection: FunctionComponent<ListSectionProps> = ({
	avatar,
	actions = [],
	icon,
	children,
	className,
	hover,
	style,
	tooltip,
	tooltipPosition = "bottom-right", // TODO-NEO-690 // remove this line to default to "auto" once 690 is completed
}) => {
	const avacon = avatar || icon;

	return (
		<li
			className={clsx(
				"neo-group-list--actions__item",
				hover && "neo-group-list--actions__item--clickable",
				className,
			)}
			style={style}
		>
			<div className="neo-group-list__actions--left">
				{tooltip ? (
					<Tooltip label={tooltip} position={tooltipPosition}>
						{!!avacon && avacon}
					</Tooltip>
				) : (
					<Fragment key="avacon">{!!avacon && avacon}</Fragment>
				)}
				{children}
			</div>

			<div className="neo-group-list__actions--right">
				{actions.map((action, index) => (
					<Fragment key={index}>{action}</Fragment>
				))}
			</div>
		</li>
	);
};
