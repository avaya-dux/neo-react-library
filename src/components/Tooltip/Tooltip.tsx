import clsx from "clsx";
import {
	Children,
	cloneElement,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";

import { Keys, isString } from "utils";

import type { TooltipProps } from "./TooltipTypes";
import {
	getIdealTooltipPosition,
	getMultilineClassName,
	translatePositionToCSSName,
} from "./helpers";

/**
 * Wraps any text or element and shows a tooltip when that text/element is hovered.
 *
 * @param label Text displayed in the tooltip
 * @param children Text || JSX.Element || JSX.Element[]
 * @param position Position of the tooltip, defaults to "auto"
 *
 * @example
 * <Tooltip label="example text">text</Tooltip>
 *
 * @example
 * <Tooltip label="example text" position="top">text</Tooltip>
 *
 * @example
 * <Tooltip label="example text"><span>text</span></Tooltip>
 *
 * @see https://design.avayacloud.com/components/web/tooltip-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-tooltip
 */
export const Tooltip = ({
	arrow = true,
	children,
	className,
	label,
	multiline,
	position = "auto",
	tooltipDivProps,

	...rest
}: TooltipProps) => {
	const generatedId = useId();
	const tooltipId = tooltipDivProps?.id || generatedId;
	const tooltipContainerRef = useRef(null);

	const [tooltipPosition, setTooltipPosition] = useState("");
	useEffect(() => {
		setTooltipPosition(
			position === "auto"
				? getIdealTooltipPosition(
						{
							height: document.lastElementChild?.clientHeight || 0,
							width: document.lastElementChild?.clientWidth || 0,
						},
						label,
						tooltipContainerRef.current,
					)
				: translatePositionToCSSName(position),
		);
	}, [label, position]);

	const multilineClassName = useMemo(
		() => getMultilineClassName(multiline),
		[multiline],
	);

	const wrappedChildren = useMemo(() => {
		const shouldWrap = isString(children) || Children.count(children) > 1;
		if (shouldWrap) {
			return <div aria-describedby={tooltipId}>{children}</div>;
		}

		const child = Children.only(children) as React.ReactElement;
		return cloneElement(child, { "aria-describedby": tooltipId });
	}, [children, tooltipId]);

	const [allowTooltip, setAllowTooltip] = useState(true);
	const setAllowTooltipTrue = useCallback(() => setAllowTooltip(true), []);
	const onKeyUp = useCallback((e: { key: string }) => {
		if (e.key === Keys.ESC) {
			setAllowTooltip(false);
		}
	}, []);

	useEffect(() => {
		document.addEventListener("keyup", onKeyUp, false);

		return () => {
			document.removeEventListener("keyup", onKeyUp, false);
		};
	}, [onKeyUp]);

	return (
		<div
			{...rest}
			ref={tooltipContainerRef}
			onFocus={setAllowTooltipTrue}
			onMouseOver={setAllowTooltipTrue}
			className={clsx(
				`neo-tooltip neo-tooltip--${tooltipPosition}`,
				allowTooltip && "neo-tooltip--onhover",
				className,
			)}
		>
			{wrappedChildren}

			<div
				{...tooltipDivProps}
				id={tooltipId}
				role="tooltip"
				className={clsx(
					"neo-tooltip__content",
					multilineClassName,
					tooltipDivProps?.className,
				)}
			>
				{arrow && <div className="neo-arrow" />}
				{label}
			</div>
		</div>
	);
};

Tooltip.displayName = "Tooltip";
