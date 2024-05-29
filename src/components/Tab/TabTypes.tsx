import type { ReactElement, ReactNode } from "react";

import type { MenuProps } from "components/Menu";
import type { IconNamesType } from "utils";

export interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
	id?: string;
	key?: string;
	children: ReactNode;
	disabled?: boolean;
	icon?: IconNamesType;
}

export interface TabLinkProps extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	disabled?: boolean;
	href: string;
	icon?: IconNamesType;
	id?: string;
}

export interface ClosableTabProps extends Omit<TabProps, "dir"> {
	onClose?: (index: number) => void;
}

export interface TabListProps extends React.HTMLAttributes<HTMLUListElement> {
	children: ReactElement<TabProps | TabLinkProps | ClosableTabProps>[];
}

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

export interface TabPanelsProps {
	children: ReactElement<TabPanelProps>[];
}
interface Oritentation {
	orientation?: "horizontal" | "vertical";
}

interface CommonTabsProps extends React.HTMLAttributes<HTMLDivElement> {
	defaultIndex?: number;
	index?: number;
	initialFocus?: boolean;
	children:
		| ReactElement<TabListProps>
		| [ReactElement<TabListProps>, ReactElement<TabPanelsProps>];
	onTabChange?: (index: number) => void;
	onTabPanelChange?: (index: number) => void;
}
export interface HorizontalTabsProps extends CommonTabsProps, Oritentation {
	orientation?: "horizontal";
	hasCarousel?: boolean;
	carouselDropdown?: ReactElement<MenuProps>;
	leftCarouselButtonAriaLabel?: string;
	rightCarouselButtonAriaLabel?: string;
}

export interface VerticalTabsProps extends CommonTabsProps, Oritentation {
	orientation: "vertical";
	scrollable?: boolean;
}

export type TabsProps = HorizontalTabsProps | VerticalTabsProps;
