import type { Meta, StoryObj } from "@storybook/react";

import { LeftNav } from "./";

const meta: Meta<typeof LeftNav> = {
	component: LeftNav,
	title: "Components/Left Navigation",
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

const handleClick = (_id: string, url: string) => {
	window.open(url);
};
export const Default: StoryObj<{ currentUrl: string }> = {
	render: ({ currentUrl }) => (
		<LeftNav
			aria-label="Main Navigation"
			onNavigate={handleClick}
			currentUrl={currentUrl}
		>
			<LeftNav.TopLinkItem label="Active by default" href="#active" />
			<LeftNav.TopLinkItem label="Link 2" href="#test2" />
			<LeftNav.TopLinkItem
				label="Link with Icon Example"
				icon="address-book"
				href="#address-book"
			/>
			<LeftNav.TopLinkItem label="Disabled Link" disabled href="#disabled" />
			<LeftNav.TopLinkItem
				label="Disabled Link with Icon"
				icon="address-book"
				disabled
				href="#disabledicon"
			/>
		</LeftNav>
	),
};
