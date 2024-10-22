import type { FC } from "react";
import { useCallback, useId, useState } from "react";
import { RovingTabIndexProvider } from "react-roving-tabindex";

import { handleAccessbilityError } from "utils";

import { LinkItem } from "./LinkItem";
import { NavCategory } from "./NavCategory";
import { SideNavigationContext } from "./SideNavigationContext";
import type {
	SideNavigationContextType,
	SideNavigationProps,
	SideNavigationSubComponents,
} from "./SideNavigationTypes";
import { SubCategory } from "./SubCategory";
import { CategoryGroup } from "./CategoryGroup";
import { TopLinkItem } from "./TopLinkItem";

import "./SideNavigation_shim.css";

/**
 * The side navigation bar is used to display the secondary navigation elements
 * of an application. These include a list of links that can be used to move
 * between sections or pages within the application or the site.
 *
 * @example
 * <SideNavigation aria-label="Collapsible Navigation Menu">
    <SideNavigation.NavCategory icon="audio-on" label="Collapsed">
      <SideNavigation.LinkItem href="#first">First Item</SideNavigation.LinkItem>
      <SideNavigation.LinkItem href="#second">Second Item</SideNavigation.LinkItem>
    </SideNavigation.NavCategory>
    <SideNavigation.NavCategory expanded icon="call" label="Active">
      <SideNavigation.LinkItem href="#item1">Item 1</SideNavigation.LinkItem>
      <SideNavigation.LinkItem href="#item2" active>
        Active Item 2
      </SideNavigation.LinkItem>
      <SideNavigation.LinkItem href="#item3"> Item 3</SideNavigation.LinkItem>
    </SideNavigation.NavCategory>
    <SideNavigation.NavCategory disabled icon="available" label="Disabled">
      <SideNavigation.LinkItem href="#disabled1">First Item</SideNavigation.LinkItem>
      <SideNavigation.LinkItem href="#disabled2">Second Item</SideNavigation.LinkItem>
    </SideNavigation.NavCategory>
  </SideNavigation>

 * @see https://design.avaya.com/components/side-navigation
 */
export const SideNavigation: FC<SideNavigationProps> &
	SideNavigationSubComponents = ({
	children,
	currentUrl = "",
	onNavigate,
	isActiveOverride,
	"aria-label": ariaLabel = "Side Navigation",
	...rest
}: SideNavigationProps) => {
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

	const navContext: SideNavigationContextType = {
		currentUrl: curUrl,
		onSelectedLink: handleSelectedLink,
		isActiveOverride,
		hasCustomOnNavigate: !!onNavigate,
	};

	return (
		<RovingTabIndexProvider
			options={{ direction: "vertical", focusOnClick: true }}
		>
			<SideNavigationContext.Provider value={navContext}>
				<div id={navId} className="neo-leftnav--wrapper">
					<nav className="neo-leftnav" aria-label={ariaLabel} {...rest}>
						<ul className="neo-leftnav__nav">{children}</ul>
					</nav>
				</div>
			</SideNavigationContext.Provider>
		</RovingTabIndexProvider>
	);
};

SideNavigation.displayName = "SideNavigation";
SideNavigation.LinkItem = LinkItem;
SideNavigation.SubCategory = SubCategory;
SideNavigation.CategoryGroup = CategoryGroup;
SideNavigation.NavCategory = NavCategory;
SideNavigation.TopLinkItem = TopLinkItem;
