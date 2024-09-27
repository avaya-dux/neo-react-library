import type { Meta, StoryObj } from "@storybook/react";

import { SideNavigation } from "./";

const meta: Meta<typeof SideNavigation> = {
	component: SideNavigation,
	title: "Components/Side Navigation",
	args: {
		"aria-label": "Side Navigation",
		currentUrl: "#active",
	},
	argTypes: {
		// disable all but `currentUrl` prop
		"aria-label": { table: { disable: true } },
		onNavigate: { table: { disable: true } },
		isActiveOverride: { table: { disable: true } },
	},
};
export default meta;

type Story = StoryObj<{ currentUrl: string }>;
const handleClick = (_id: string, url: string) => {
	window.open(url);
};

export const Default: Story = {
	render: ({ currentUrl }) => (
		<SideNavigation
			aria-label="Main Navigation"
			onNavigate={handleClick}
			currentUrl={currentUrl}
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
	),
};

export const CategoryGroups: Story = {
	args: {
		currentUrl: "http://active.com",
	},
	render: ({ currentUrl }) => (
		<SideNavigation aria-label="Text only Nav" currentUrl={currentUrl}>
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
	),
};

export const CategoryGroupsWithIcons: Story = {
	args: {
		currentUrl: "http://active.com",
	},
	render: ({ currentUrl }) => (
		<SideNavigation
			aria-label="Integration Testing App Menu"
			currentUrl={currentUrl}
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
	),
};

export const DoesNotConflictWithOtherNavs: Story = {
	render: ({ currentUrl }) => (
		<div>
			<SideNavigation aria-label="Main Navigation" currentUrl={currentUrl}>
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
	),
};
