import clsx from "clsx";
import {
	Children,
	cloneElement,
	type HTMLAttributes,
	type ReactElement,
} from "react";

import type { ChipProps } from "./Chip";

export interface ChipsContainerProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactElement<ChipProps> | ReactElement<ChipProps>[];
}

/**
 * Used to wrap a set of Chip components
 *
 * @example
 * <ChipsContainer>
 *  <Chip>default</Chip>
 *  <Chip variant="alert" icon="warning-filled">alert chip</Chip>
 * </ChipsContainer>
 *
 * @see https://design.avayacloud.com/components/web/chip-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-chips
 */
export const ChipsContainer = ({
	className,
	children,
	...rest
}: ChipsContainerProps) => (
	<div className={clsx("neo-chips", className)} {...rest}>
		{Children.map(children, (child, index) =>
			cloneElement(child, {
				key: index,
				className: clsx(child.props.className, "neo-chips__item"),
			}),
		)}
	</div>
);

ChipsContainer.displayName = "ChipsContainer";
