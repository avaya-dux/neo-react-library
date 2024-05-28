import clsx from "clsx";
import {
	Children,
	cloneElement,
	type FunctionComponent,
	type KeyboardEvent,
	type KeyboardEventHandler,
	type MouseEvent,
	type MouseEventHandler,
	useContext,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";
import { useFocusEffect, useRovingTabIndex } from "react-roving-tabindex";

import { getIconClass, Keys } from "utils";

import { LeftNavContext } from "../LeftNavContext";
import type { NavCategoryProps } from "../LeftNavTypes";

const LEFTNAV_CATEGORY_STYLE = "neo-leftnav__main";

function getItemClassNames(
	expanded: boolean,
	active: boolean,
	disabled: boolean,
) {
	const classNames = clsx(
		LEFTNAV_CATEGORY_STYLE,
		expanded && "neo-leftnav__main--expand",
		active && "neo-leftnav__main--active",
		disabled && "neo-leftnav__disabled",
	);

	return classNames;
}

/**
 * Is meant to wrap an array of `LinkItem`.
 *
 * @example
 * <LeftNav.NavCategory icon="audio-on" label="Collapsed">
    <LeftNav.LinkItem href="#first">First Item</LeftNav.LinkItem>
    <LeftNav.LinkItem href="#second">Second Item</LeftNav.LinkItem>
  </LeftNav.NavCategory>
 *
 * @see https://design.avayacloud.com/components/web/list-web
 */
export const NavCategory = ({
	id,
	children = [],
	label,
	icon,
	className,
	expanded = false,
	disabled = false,
	// active = false, // BUG: definied by never used
	...rest
}: NavCategoryProps) => {
	const generatedId = useId();
	id = id || generatedId;
	const listClass = "neo-leftnav__nav";
	const [isExpanded, setIsExpanded] = useState(expanded);
	const [navItemClass, setNavItemClass] = useState(LEFTNAV_CATEGORY_STYLE);
	const [iconClass, setIconClass] = useState("");
	const [childIsActive, setChildIsActive] = useState(false);

	const ref = useRef(null);
	const [tabIndex, isActive, handleKeyIndex, handleClick] = useRovingTabIndex(
		ref,
		disabled,
	);
	useFocusEffect(isActive, ref);

	const ctx = useContext(LeftNavContext);

	useEffect(() => {
		const active = childIsActive;
		const itemStyle = getItemClassNames(isExpanded, active, disabled);
		setNavItemClass(itemStyle);
	}, [isExpanded, isActive, disabled, childIsActive]);

	useEffect(() => {
		const iconStyles = getIconClass(icon);
		setIconClass(iconStyles);
	}, [icon]);

	useEffect(() => {
		let hasActiveLinks = false;
		Children.map(children, (child) => {
			hasActiveLinks = hasActiveLinks || child.props.href === ctx.currentUrl;
		});
		setChildIsActive(hasActiveLinks);
	}, [ctx.currentUrl, children]);

	const handleOnClick: MouseEventHandler = (event: MouseEvent) => {
		event.stopPropagation();
		handleClick();
		setIsExpanded(!isExpanded);
	};

	const handleKeyDown: KeyboardEventHandler = (
		event: KeyboardEvent<HTMLButtonElement>,
	) => {
		handleKeyIndex(event);
		if (event.key !== Keys.TAB) {
			event.stopPropagation();
			event.preventDefault();
		}

		if (!disabled) {
			switch (event.key) {
				case Keys.SPACE:
				case Keys.ENTER:
					setIsExpanded(!isExpanded);
					break;
				case Keys.LEFT:
					setIsExpanded(false);
					break;
				case Keys.RIGHT:
					setIsExpanded(true);
					break;
			}
		}
	};

	const linkItems = useMemo(() => {
		return Children.map(children, (child, index) => {
			const childTypeName = (child.type as FunctionComponent).name;
			const key = `${childTypeName}-${index}`;
			const isDisabled = !isExpanded || disabled || !!child.props.disabled;
			const parentHasIcon = !!icon;

			return cloneElement(child, {
				active: child.props.href === ctx.currentUrl,
				disabled: isDisabled,
				key: child.key || key,
				id: child.props.id || key,
				parentHasIcon,
			});
		});
	}, [isExpanded, disabled, ctx.currentUrl, children, icon]);

	return (
		<li id={id} className={navItemClass}>
			<button
				className={clsx(
					"neo-leftnav__category expandable",
					"neo-btn-secondary--info",
					"neo-btn",
					icon && iconClass,
					className,
				)}
				ref={ref}
				tabIndex={tabIndex}
				disabled={disabled}
				onClick={handleOnClick}
				onKeyDown={handleKeyDown}
				aria-label={label}
				{...rest}
			>
				{label}
			</button>
			<ul className={listClass}>{linkItems}</ul>
		</li>
	);
};
NavCategory.displayName = "NavCategory";
