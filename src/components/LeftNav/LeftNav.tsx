import { type FC, useCallback, useId, useState } from "react";
import { RovingTabIndexProvider } from "react-roving-tabindex";

import { handleAccessbilityError } from "utils";

import { LeftNavContext } from "./LeftNavContext";
import type {
	LeftNavContextType,
	LeftNavProps,
	LeftNavSubComponents,
} from "./LeftNavTypes";
import { LinkItem } from "./LinkItem";
import { NavCategory } from "./NavCategory";
import { TopLinkItem } from "./TopLinkItem";

/**
 * DEPRECATED: Please use <code>SideNavigation</code>
 */
export const LeftNav: FC<LeftNavProps> & LeftNavSubComponents = ({
	children,
	currentUrl = "",
	onNavigate,
	isActiveOverride,
	"aria-label": ariaLabel = "Left Navigation",
	...rest
}: LeftNavProps) => {
	// NOTE: this is for non-TS users
	if (!ariaLabel && !rest["aria-labelledby"]) {
		handleAccessbilityError(
			"An `aria-label` or `aria-labelledby` value is required for screen readers to identify the navigation component",
		);
	}

	const [curUrl, setCurUrl] = useState(currentUrl);

	const navId = useId();

	const handleSelectedLink = useCallback(
		(id: string, url: string) => {
			setCurUrl(url);

			if (onNavigate) {
				onNavigate(id, url);
			}
		},
		[onNavigate],
	);

	const navContext: LeftNavContextType = {
		currentUrl: curUrl,
		onSelectedLink: handleSelectedLink,
		isActiveOverride,
		hasCustomOnNavigate: !!onNavigate,
	};

	return (
		<RovingTabIndexProvider
			options={{ direction: "vertical", focusOnClick: true }}
		>
			<LeftNavContext.Provider value={navContext}>
				<div id={navId} className="neo-leftnav--wrapper">
					<nav className="neo-leftnav" aria-label={ariaLabel} {...rest}>
						<ul className="neo-leftnav__nav">{children}</ul>
					</nav>
				</div>
			</LeftNavContext.Provider>
		</RovingTabIndexProvider>
	);
};

LeftNav.displayName = "LeftNav";
LeftNav.LinkItem = LinkItem;
LeftNav.NavCategory = NavCategory;
LeftNav.TopLinkItem = TopLinkItem;
