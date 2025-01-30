import type { SideNavigationNavGroupProps } from "../SideNavigationTypes";

/**
 * Is meant to be used to group related link items into groups. Eg, one that is not nested.
 *
 * @example
 * <SideNavigation
    aria-label="Main Navigation"
    onNavigate={handleClick}
    currentUrl="#active"
  >
    <SideNavigation.NavCategory
     label="Advanced"
	 icon={showIcons ? "settings" : undefined}
	>
		<SideNavigation.NavGroup groupName="Settings" />

		<SideNavigation.LinkItem href="#applications">Applications</SideNavigation.LinkItem>

		<SideNavigation.LinkItem href="#name">Name</SideNavigation.LinkItem>
    </SideNavigation.NavCategory>
  </SideNavigation>
 */

export const NavGroup = ({ groupName }: SideNavigationNavGroupProps) => {
	return <li className="neo-sidenav-category">{groupName}</li>;
};

NavGroup.displayName = "NavGroup";
