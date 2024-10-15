import type { Meta, StoryObj } from "@storybook/react";

import { Image } from "components/Image";
import { TopNav } from "components/TopNav";
import { SideNavigation } from "./";

const meta: Meta<typeof SideNavigation> = {
	component: SideNavigation,
	title: "Components/Side Navigation",
	args: {
		"aria-label": "Side Navigation",
		currentUrl: "#home",
	},
	argTypes: {
		// no useful controls to add to stories
		"aria-label": { table: { disable: true } },
		currentUrl: { table: { disable: true } },
		onNavigate: { table: { disable: true } },
		isActiveOverride: { table: { disable: true } },
	},
};
export default meta;

type Story = StoryObj<{ ariaLabel: string; currentUrl: string }>;

export const Default: Story = {
	render: ({ currentUrl }) => (
		<main>
			<h2>With and Without Icons</h2>

			<p style={{ marginBottom: "1rem" }}>
				Side Navigation is a vertical navigation component that allows users to
				navigate between different sections of a website or application. The top
				level items must either all have icons, or no icons.
			</p>

			<p style={{ marginBottom: "1rem" }}>
				IMPORTANT: The links in the Side Nav are actual links. If you select one
				it will take you to a new page.
			</p>

			<TopNav
				logo={
					<a href="/" title="Logo Link">
						<Image
							isDecorativeOrBranding
							src="/src/components/TopNav/logo-full-light.svg"
						/>
					</a>
				}
			/>

			<section
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<SideNavigation
					aria-label="left aligned side navigation"
					currentUrl={currentUrl}
				>
					<SideNavigation.TopLinkItem label="Home" icon="home" href="#home" />
					<SideNavigation.TopLinkItem
						label="Dashboard"
						icon="dashboard"
						href="#dashboard"
					/>
					<SideNavigation.TopLinkItem
						label="Advanced"
						icon="settings"
						href="#address-book"
					/>
					<SideNavigation.TopLinkItem label="Admin" icon="user" disabled />
				</SideNavigation>

				<SideNavigation
					aria-label="right aligned side navigation"
					currentUrl={currentUrl}
					dir="rtl"
				>
					<SideNavigation.TopLinkItem label="Home" href="#home" />
					<SideNavigation.TopLinkItem label="Dashboard" href="#dashboard" />
					<SideNavigation.TopLinkItem label="Advanced" href="#address-book" />
					<SideNavigation.TopLinkItem label="Admin" disabled />
				</SideNavigation>
			</section>
		</main>
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
