import {
	SideNavigation,
	type SideNavigationProps,
} from "components/SideNavigation";

/**
 * DEPRECATED: Please use `SideNavigation`
 */
export const LeftNav = (props: SideNavigationProps) => {
	return <SideNavigation {...props} />;
};

LeftNav.displayName = "LeftNav";
