import clsx from "clsx";
import {
	type MouseEventHandler,
	useContext,
	useEffect,
	useId,
	useRef,
	useState,
} from "react";

import { SideNavigationContext } from "../SideNavigationContext";
import type { SideNavigationTopLinkItemProps } from "../SideNavigationTypes";

import "./TopLinkItem_shim.css";

/**
 * Is meant to be used as a top level link. Eg, one that is not nested.
 *
 * @example
 * <SideNavigation
    aria-label="Main Navigation"
    onNavigate={handleClick}
    currentUrl="#active"
  >
    <SideNavigation.TopLinkItem label="Active by default" href="#active" />
    <SideNavigation.TopLinkItem label="Link 2" href="#test2" />
  </SideNavigation>
 */
export const TopLinkItem = ({
	disabled,
	href = "",
	icon,
	id,
	label,
	className,
}: SideNavigationTopLinkItemProps) => {
	const generatedId = useId();
	id = id || generatedId;
	const ctx = useContext(SideNavigationContext);
	const [isActive, setIsActive] = useState(false);

	const anchorRef = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		!ctx.isActiveOverride
			? setIsActive(href === ctx.currentUrl)
			: setIsActive(false);
	}, [ctx.currentUrl, ctx.isActiveOverride, href]);

	// Ensure the link is visible in the viewport when it matches the current URL
	useEffect(() => {
		if (href === ctx.currentUrl) {
			anchorRef?.current?.scrollIntoView({ block: "nearest", inline: "start" });
		}
	}, [ctx.currentUrl, href]);

	const onClick: MouseEventHandler = (e) => {
		if (ctx.hasCustomOnNavigate) {
			e.preventDefault(); // Override anchor default behavior if a custom event handler is provided
		}
		ctx?.onSelectedLink?.(id as string, href);
	};

	return (
		<li className={className}>
			{disabled || !href ? (
				<button
					type="button"
					disabled={disabled}
					className="neo-sidenav-parent"
				>
					<span className={clsx(icon && `neo-icon-${icon}`)} />
					{label}
				</button>
			) : (
				<a
					href={href}
					ref={anchorRef}
					className={clsx("neo-sidenav-parent", isActive && "active")}
					onClick={onClick}
				>
					<span className={clsx(icon && `neo-icon-${icon}`)} />
					{label}
				</a>
			)}
		</li>
	);
};
TopLinkItem.displayName = "TopLinkItem";
