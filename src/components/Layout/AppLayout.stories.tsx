import type { Meta } from "@storybook/react";
import type { ReactNode } from "react";

import { Icon } from "components/Icon";
import { SideNavigation } from "components/SideNavigation";
import { Widget } from "components/Widget";
import { AppLayout, type AppLayoutProps } from "./";

export default {
	title: "Components/AppLayout",
	component: AppLayout,
} as Meta<AppLayoutProps>;

const sideNav: ReactNode = (
	<SideNavigation
		aria-label="Integration Testing App Menu"
		currentUrl="http://active.com"
	>
		<SideNavigation.TopLinkItem
			icon="interaction-details"
			label="Getting Started"
			href="/"
		/>
		<SideNavigation.TopLinkItem icon="user-add" label="Users" href="/users" />
		<SideNavigation.TopLinkItem icon="awfos" label="SAML IDP" href="/idps" />
		<SideNavigation.NavCategory icon="code-cloud" label="Demo Pages">
			<SideNavigation.LinkItem href="/table">
				Table Component
			</SideNavigation.LinkItem>
			<SideNavigation.LinkItem href="/form">
				Form Component
			</SideNavigation.LinkItem>
		</SideNavigation.NavCategory>
	</SideNavigation>
);

const headerWidget: ReactNode = (
	<Widget empty>
		<Icon icon="settings" aria-label="settings" />
		<p>Header Widget</p>
	</Widget>
);

const leftPanelWidget: ReactNode = (
	<Widget empty>
		<Icon icon="settings" aria-label="settings" />
		<p>Left Pane Widget</p>
	</Widget>
);

const rightPanelWidget: ReactNode = (
	<Widget empty>
		<Icon icon="settings" aria-label="settings" />
		<p>Right Pane Widget</p>
	</Widget>
);

const mainContentWidget: ReactNode = (
	<Widget empty>
		<Icon icon="settings" aria-label="settings" />
		<p>Main Content Widget</p>
	</Widget>
);

const footerWidget: ReactNode = (
	<Widget empty>
		<Icon icon="settings" aria-label="settings" />
		<p>Footer Widget</p>
	</Widget>
);

export const Default = () => (
	<AppLayout
		header={headerWidget}
		leftPanel={leftPanelWidget}
		mainContent={mainContentWidget}
		rightPanel={rightPanelWidget}
		footer={footerWidget}
	/>
);

export const HeaderAndContent = () => (
	<AppLayout header={headerWidget} mainContent={mainContentWidget} />
);

export const LeftPanelAndContent = () => (
	<AppLayout leftPanel={leftPanelWidget} mainContent={mainContentWidget} />
);

export const FooterAndContent = () => (
	<AppLayout footer={footerWidget} mainContent={mainContentWidget} />
);

export const RightPanelAndContent = () => (
	<AppLayout rightPanel={rightPanelWidget} mainContent={mainContentWidget} />
);

export const SideNavHeaderAndContent = () => (
	<AppLayout
		header={headerWidget}
		leftPanel={sideNav}
		mainContent={mainContentWidget}
	/>
);
