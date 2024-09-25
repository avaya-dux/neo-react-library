import type { SideNavigationProps } from "components/SideNavigation";

import { SideNavigation } from "components/SideNavigation";
import { LinkItem } from "components/SideNavigation/LinkItem";
import { NavCategory } from "components/SideNavigation/NavCategory";
import { TopLinkItem } from "components/SideNavigation/TopLinkItem";

/**
 * DEPRECATED: Please use `SideNavigation`
 */
export const LeftNav = (props: SideNavigationProps) => {
	return <SideNavigation {...props} />;
};

LeftNav.displayName = "LeftNav";
LeftNav.LinkItem = LinkItem;
LeftNav.NavCategory = NavCategory;
LeftNav.TopLinkItem = TopLinkItem;
