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

import { SideNavigationContext } from "../SideNavigationContext";
import type { SideNavigationLinkItemProps } from "../SideNavigationTypes";

/**
 * Is meant to be used as a link that is nested under a `NavCategory`.
 *
 * @example
 * <SideNavigation.NavCategory icon="audio-on" label="Collapsed">
 *  <SideNavigation.LinkItem href="#first">First Item</SideNavigation.LinkItem>
 *  <SideNavigation.LinkItem href="#second">Second Item</SideNavigation.LinkItem>
 * </SideNavigation.NavCategory>
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
	groupName,

	...rest
}: SideNavigationLinkItemProps) => {
	const generatedId = useId();
	id = id || generatedId;
	const ctx = useContext(SideNavigationContext);
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
		ctx?.onSelectedLink?.(id as string, href);
	};

	const _handleKeyDown: KeyboardEventHandler = (
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
				ctx?.onSelectedLink?.(id as string, href);
				break;
		}
	};

	const formattedGroupName = groupName ? `${groupName} group` : "";

	return (
		<li {...rest} className={className}>
			{disabled ? (
				<Button
					disabled={disabled}
					ref={ref}
					variant="tertiary"
					style={itemStyle}
					tabIndex={tabIndex}
					aria-label={`${formattedGroupName}-group ${children}`}
				>
					{children}
				</Button>
			) : (
				<a
					href={href}
					aria-current={active}
					aria-label={`${formattedGroupName} ${children}`}
					onClick={handleOnClick}
					onFocus={onFocus}
					onMouseOver={onMouseOver}
					ref={ref}
					style={itemStyle}
					className={clsx("neo-sidenav-granchild", active && "active")}
				>
					{children}
				</a>
			)}
		</li>
	);
};
LinkItem.displayName = "LinkItem";
