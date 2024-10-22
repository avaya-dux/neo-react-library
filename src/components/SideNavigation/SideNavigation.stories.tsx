import type { Meta, StoryObj } from "@storybook/react";

import clsx from "clsx";
import { Image } from "components/Image";
import { TopNav } from "components/TopNav";
import { SideNavigation } from "./";

const meta: Meta<typeof SideNavigation> = {
	component: SideNavigation,
	title: "Components/Side Navigation",
	args: {},
	argTypes: {
		// no useful controls to add to stories
		"aria-label": { table: { disable: true } },
		currentUrl: { table: { disable: true } },
		onNavigate: { table: { disable: true } },
		isActiveOverride: { table: { disable: true } },
	},
};
export default meta;

type Story = StoryObj<{
	dir: "ltr" | "rtl";
	mode: "neo-light" | "neo-dark";
	showIcons: boolean;
}>;

export const Default: Story = {
	args: {
		dir: "ltr",
		mode: "neo-light",
		showIcons: true,
	},
	argTypes: {
		dir: {
			control: "radio",
			options: ["ltr", "rtl"],
			description: "These are props for the story, not the component.",
			table: { category: "Story Props" },
		},
		mode: {
			control: "radio",
			options: ["neo-light", "neo-dark"],
			description: "These are props for the story, not the component.",
			table: { category: "Story Props" },
		},
		showIcons: {
			control: "boolean",
			description: "These are props for the story, not the component.",
			table: { category: "Story Props" },
		},
	},
	render: ({ dir, mode, showIcons }) => {
		return (
			<main>
				<h2>Default Example</h2>

				<p style={{ marginBottom: "1rem" }}>
					The side navigation bar is used to display the secondary navigation
					elements of an application. These include a list of links that can be
					used to move between sections or pages within the application or the
					site.
				</p>

				<p style={{ marginBottom: "1rem" }}>
					The top level items must either all have icons, or no icons.
				</p>

				<p style={{ marginBottom: "1rem" }}>
					<b>IMPORTANT</b>: The links in the Side Nav are actual links. If you
					select one it will take you to a new page.
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

				<section dir={dir} className={clsx("neo-global-colors", mode)}>
					<SideNavigation aria-label="side navigation">
						<SideNavigation.TopLinkItem
							label="Home"
							icon={showIcons ? "home" : undefined}
							href="#home"
						/>
						<SideNavigation.TopLinkItem
							label="Dashboard"
							icon={showIcons ? "dashboard" : undefined}
							href="#dashboard"
						/>
						<SideNavigation.TopLinkItem
							label="Advanced"
							icon={showIcons ? "settings" : undefined}
							href="#address-book"
						/>
						<SideNavigation.TopLinkItem
							label="Admin"
							icon={showIcons ? "user" : undefined}
							disabled
						/>
					</SideNavigation>
				</section>
			</main>
		);
	},
};

export const MultipleLevels: Story = {
	...Default,
	render: ({ dir, mode, showIcons }) => {
		return (
			<main>
				<h2>Multiple Levels Example</h2>

				<p style={{ marginBottom: "1rem" }}>
					The Side Navigation supports up to three levels of navigation as well
					as grouping links into categories. Note that you may only assign icons
					to the top level items.
				</p>

				<p style={{ marginBottom: "1rem" }}>
					<b>WIP</b>: grouping/categories
				</p>

				<p style={{ marginBottom: "1rem" }}>
					<b>WIP</b>: third level
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

				<section dir={dir} className={clsx("neo-global-colors", mode)}>
					<SideNavigation aria-label="side navigation">
						<SideNavigation.TopLinkItem
							label="Home"
							icon={showIcons ? "home" : undefined}
							href="#home"
						/>

						<SideNavigation.TopLinkItem
							label="Dashboard"
							icon={showIcons ? "dashboard" : undefined}
							href="#dashboard"
						/>

						<SideNavigation.NavCategory
							label="Advanced"
							icon={showIcons ? "settings" : undefined}
						>
							<SideNavigation.CategoryGroup label="Settings">
								<SideNavigation.LinkItem href="#applications">
									Applications
								</SideNavigation.LinkItem>

								<SideNavigation.SubCategory label="Actions">
									<SideNavigation.LinkItem href="#name">
										Name
									</SideNavigation.LinkItem>

									<SideNavigation.LinkItem href="#parameters">
										Parameters
									</SideNavigation.LinkItem>
								</SideNavigation.SubCategory>
							</SideNavigation.CategoryGroup>

							<SideNavigation.CategoryGroup label="Reports">
								<SideNavigation.LinkItem href="#geography">
									Geography
								</SideNavigation.LinkItem>

								<SideNavigation.LinkItem href="#devices">
									Devices
								</SideNavigation.LinkItem>

								<SideNavigation.LinkItem href="#depth-chart">
									Depth Chart
								</SideNavigation.LinkItem>
							</SideNavigation.CategoryGroup>
						</SideNavigation.NavCategory>

						<SideNavigation.TopLinkItem
							label="Contact Center"
							icon={showIcons ? "address-book" : undefined}
							href="#contact-center"
						/>

						<SideNavigation.TopLinkItem
							label="Admin"
							icon={showIcons ? "user" : undefined}
							disabled
						/>
					</SideNavigation>
				</section>
			</main>
		);
	},
};
