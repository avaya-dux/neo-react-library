import clsx from "clsx";
import {
	type KeyboardEvent,
	type KeyboardEventHandler,
	type MouseEventHandler,
	useContext,
	useEffect,
	useId,
	useRef,
	useState,
} from "react";
import { useFocusEffect, useRovingTabIndex } from "react-roving-tabindex";

import { Button } from "components/Button";
import { Keys } from "utils";

import { LeftNavContext } from "../LeftNavContext";
import type { LinkItemProps } from "../LeftNavTypes";

/**
 * Is meant to be used as a link that is nested under a `NavCategory`.
 *
 * @example
 * <LeftNav.NavCategory icon="audio-on" label="Collapsed">
 *  <LeftNav.LinkItem href="#first">First Item</LeftNav.LinkItem>
 *  <LeftNav.LinkItem href="#second">Second Item</LeftNav.LinkItem>
 * </LeftNav.NavCategory>
 */
export const LinkItem = ({
	active = false,
	children,
	className,
	disabled = false,
	href,
	id,
	onFocus,
	onMouseOver,
	parentHasIcon,

	...rest
}: LinkItemProps) => {
	const generatedId = useId();
	id = id || generatedId;
	const ctx = useContext(LeftNavContext);
	const [itemStyle, setItemStyle] = useState({ padding: "8px 28px 8px 20px" });

	const ref = useRef(null);
	const [tabIndex, isActive, handleKeyIndex, handleClick] = useRovingTabIndex(
		ref,
		disabled,
	);
	useFocusEffect(isActive, ref);

	useEffect(() => {
		let leftPadding = "20px";

		if (disabled) {
			leftPadding = parentHasIcon ? "72px" : "40px";
		} else if (parentHasIcon) {
			leftPadding = "52px";
		}
		const itemStyle = { padding: `8px 28px 8px ${leftPadding}` };
		setItemStyle(itemStyle);
	}, [disabled, parentHasIcon]);

	const handleOnClick: MouseEventHandler = (e) => {
		if (ctx.hasCustomOnNavigate) {
			e.preventDefault(); // Override anchor default behavior if a custom event handler is provided
		}
		handleClick();
		ctx?.onSelectedLink && ctx.onSelectedLink(id as string, href);
	};

	const handleKeyDown: KeyboardEventHandler = (
		event: KeyboardEvent<HTMLButtonElement>,
	) => {
		if (event.key !== Keys.TAB) {
			event.stopPropagation();
			event.preventDefault();
		}

		handleKeyIndex(event);

		if (disabled) return;

		switch (event.key) {
			case Keys.SPACE:
			case Keys.ENTER:
				ctx?.onSelectedLink && ctx.onSelectedLink(id as string, href);
				break;
		}
	};

	return (
		<li
			{...rest}
			className={clsx(
				"neo-leftnav__sub",
				active && "neo-leftnav__sub--active",
				className,
			)}
		>
			{disabled ? (
				<Button
					disabled={disabled}
					ref={ref}
					variant="tertiary"
					style={itemStyle}
					tabIndex={tabIndex}
				>
					{children}
				</Button>
			) : (
				<a
					href={href}
					onClick={handleOnClick}
					onFocus={onFocus}
					onMouseOver={onMouseOver}
					onKeyDown={handleKeyDown}
					ref={ref}
					style={itemStyle}
					tabIndex={tabIndex}
				>
					{children}
				</a>
			)}
		</li>
	);
};
LinkItem.displayName = "LinkItem";
