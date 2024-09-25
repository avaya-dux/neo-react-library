import type { Meta } from "@storybook/react";

import { SideNavigation, type SideNavigationProps } from "./";

export default {
	title: "Components/Side Navigation",
	component: SideNavigation,
} as Meta<SideNavigationProps>;

const handleClick = (_id: string, url: string) => {
	window.open(url);
};

export const Default = () => (
	<SideNavigation
		aria-label="Main Navigation"
		onNavigate={handleClick}
		currentUrl="#active"
	>
		<SideNavigation.TopLinkItem label="Active by default" href="#active" />
		<SideNavigation.TopLinkItem label="Link 2" href="#test2" />
		<SideNavigation.TopLinkItem
			label="Link with Icon Example"
			icon="address-book"
			href="#address-book"
		/>
		<SideNavigation.TopLinkItem
			label="Disabled Link"
			disabled
			href="#disabled"
		/>
		<SideNavigation.TopLinkItem
			label="Disabled Link with Icon"
			icon="address-book"
			disabled
			href="#disabledicon"
		/>
	</SideNavigation>
);

export const CategoryGroups = () => (
	<SideNavigation aria-label="Text only Nav" currentUrl="http://active.com">
		<SideNavigation.NavCategory expanded={true} label="Text Only Category">
			<SideNavigation.LinkItem href="http://first.com">
				First Item
			</SideNavigation.LinkItem>
			<SideNavigation.LinkItem href="http://active.com">
				Active Item
			</SideNavigation.LinkItem>
			<SideNavigation.LinkItem href="http://third.com">
				Third Item
			</SideNavigation.LinkItem>
			<SideNavigation.LinkItem href="http://avaya.com" disabled>
				Disabled Item
			</SideNavigation.LinkItem>
		</SideNavigation.NavCategory>
		<SideNavigation.NavCategory label="Collapsed">
			<SideNavigation.LinkItem href="http://link.com">
				Link1
			</SideNavigation.LinkItem>
			<SideNavigation.LinkItem href="http://dup.com">
				Duplicate Link
			</SideNavigation.LinkItem>
			<SideNavigation.LinkItem href="http://dup.com">
				Duplicate Link
			</SideNavigation.LinkItem>
		</SideNavigation.NavCategory>
		<SideNavigation.NavCategory disabled label="Disabled Category">
			<SideNavigation.LinkItem href="http://avaya.com">
				First Item
			</SideNavigation.LinkItem>
			<SideNavigation.LinkItem href="http://avaya.com">
				Second Item
			</SideNavigation.LinkItem>
		</SideNavigation.NavCategory>
	</SideNavigation>
);

export const CategoryGroupsWithIcons = () => (
	<SideNavigation
		aria-label="Integration Testing App Menu"
		currentUrl="http://active.com"
	>
		<SideNavigation.NavCategory
			icon="interaction-details"
			label="Interactivity"
		>
			<SideNavigation.LinkItem href="http://first.com">
				Address Book
			</SideNavigation.LinkItem>
			<SideNavigation.LinkItem href="http://dup.com">
				Email Client
			</SideNavigation.LinkItem>
			<SideNavigation.LinkItem href="http://dup.com">
				Manage Accounts
			</SideNavigation.LinkItem>
			<SideNavigation.LinkItem href="http://fourth.com">
				Photo Gallery
			</SideNavigation.LinkItem>
			<SideNavigation.LinkItem href="http://fourth.com">
				Notification Center
			</SideNavigation.LinkItem>
		</SideNavigation.NavCategory>
		<SideNavigation.NavCategory icon="code-cloud" label="API Testing">
			<SideNavigation.LinkItem href="http://item1.com">
				Table
			</SideNavigation.LinkItem>
			<SideNavigation.LinkItem href="http://active.com">
				Select / Menus
			</SideNavigation.LinkItem>
			<SideNavigation.LinkItem href="http://disabled.com">
				Forms
			</SideNavigation.LinkItem>
		</SideNavigation.NavCategory>
		<SideNavigation.NavCategory icon="layout-custom" label="Form Factor">
			<SideNavigation.LinkItem href="http://link.com">
				Desktop
			</SideNavigation.LinkItem>
			<SideNavigation.LinkItem href="http://link2.com">
				Mobile
			</SideNavigation.LinkItem>
			<SideNavigation.LinkItem href="http://link2.com">
				Layouts
			</SideNavigation.LinkItem>
		</SideNavigation.NavCategory>
		<SideNavigation.NavCategory icon="chat-ready" label="Localization">
			<SideNavigation.LinkItem href="http://strings.com">
				Strings
			</SideNavigation.LinkItem>
			<SideNavigation.LinkItem href="http://dates.com">
				Dates
			</SideNavigation.LinkItem>
			<SideNavigation.LinkItem href="http://bidi.com">
				Bi-directional
			</SideNavigation.LinkItem>
		</SideNavigation.NavCategory>
	</SideNavigation>
);

export const DoesNotConflictWithOtherNavs = () => (
	<div>
		<SideNavigation aria-label="Main Navigation">
			<SideNavigation.TopLinkItem label="Active by default" href="#active" />
			<SideNavigation.TopLinkItem label="Link 2" href="#test2" />
			<SideNavigation.TopLinkItem label="Link 3" href="#test3" />
		</SideNavigation>

		<nav>
			<ul>
				<li>
					<a href="#test">Test</a>
				</li>
				<li>
					<a href="#test2">Test2</a>
				</li>
				<li>
					<a href="#test3">Test3</a>
				</li>
			</ul>
		</nav>
	</div>
);
