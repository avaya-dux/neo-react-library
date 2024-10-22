import type { HTMLAttributes, ReactElement } from "react";

import type { IconNamesType } from "utils";
import type { SideNavigationSubCategoryProps } from "./SubCategory";
import type { SideNavigationCategoryGroupProps } from "./CategoryGroup";

export interface SideNavigationTopLinkItemProps {
	label: string;
	href?: string;
	disabled?: boolean;
	icon?: IconNamesType;
	id?: string;
	className?: string;
}

export interface SideNavigationLinkItemProps
	extends HTMLAttributes<HTMLLIElement | HTMLAnchorElement> {
	children: string;
	active?: boolean;
	disabled?: boolean;
	href: string;
	parentHasIcon?: boolean;
}

export interface SideNavigationNavCategoryProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
	icon?: IconNamesType;
	expanded?: boolean;
	disabled?: boolean;
	active?: boolean;
	children?:
		| ReactElement<SideNavigationLinkItemProps>
		| ReactElement<SideNavigationLinkItemProps>[];
}

type EnforcedAccessibleLabel =
	| { "aria-label": string }
	| { "aria-labelledby": string };

export type SideNavigationProps = {
	currentUrl?: string;
	isActiveOverride?: boolean;
	onNavigate?: (id: string, url: string) => void;
	children?:
		| ReactElement<
				SideNavigationNavCategoryProps | SideNavigationTopLinkItemProps
		  >
		| ReactElement<
				SideNavigationNavCategoryProps | SideNavigationTopLinkItemProps
		  >[];
} & React.BaseHTMLAttributes<HTMLElement> &
	EnforcedAccessibleLabel;

export interface SideNavigationSubComponents {
	LinkItem: React.FC<SideNavigationLinkItemProps>;
	NavCategory: React.FC<SideNavigationNavCategoryProps>;
	TopLinkItem: React.FC<SideNavigationTopLinkItemProps>;
	SubCategory: React.FC<SideNavigationSubCategoryProps>;
	CategoryGroup: React.FC<SideNavigationCategoryGroupProps>;
}

export interface SideNavigationContextType {
	currentUrl: string;
	onSelectedLink?: (id: string, url: string) => void;
	isActiveOverride?: boolean;
	hasCustomOnNavigate?: boolean;
}
