import type { Meta, Story } from "@storybook/react";
import { type FormEvent, cloneElement, useState } from "react";

import {
	AgentCard,
	Avatar,
	Image,
	ImageLink,
	Menu,
	MenuButton,
	MenuItem,
	SideNavigation,
	SubMenu,
	Tab,
	TabLink,
	TabList,
	Tabs,
} from "components";

import { TopNav, type TopNavProps } from ".";
import fpo from "./logo-fpo.png";

export default {
	title: "Components/Top Navigation",
	component: TopNav,
} as Meta<TopNavProps>;

const Logo = (
	<a href="/" title="Logo Link">
		<Image src={fpo} isDecorativeOrBranding />
	</a>
);

const LinkLogo = (
	<ImageLink
		href="https://design.avayacloud.com"
		src={fpo}
		alt="Link to Avaya"
	/>
);

const Template: Story<TopNavProps> = (props: TopNavProps) => {
	return <TopNav {...props} />;
};

export const BasicImplementation = Template.bind({});
BasicImplementation.args = {
	logo: Logo,
};

export const NavigationToggle = Template.bind({});
NavigationToggle.args = {
	logo: LinkLogo,
	menuToggleBtn: <TopNav.IconButton aria-label="Toggle Menu" icon="menu" />,
};
NavigationToggle.decorators = [
	(Story, context) => {
		const [displaySideNav, setDisplaySideNav] = useState(false);

		const args = { ...context.args };

		const navMenuToggleWithHandler = cloneElement(args.menuToggleBtn!, {
			onClick: () => setDisplaySideNav(!displaySideNav),
		});

		return (
			<>
				<Story args={{ ...args, menuToggleBtn: navMenuToggleWithHandler }} />
				{displaySideNav && (
					<div
						className={
							displaySideNav
								? "neo-slide neo-slide--in-left neo-leftnav--collapsible"
								: "neo-leftnav--collapsible neo-slide neo-slide--out-left"
						}
						style={{ width: "15%" }}
					>
						<SideNavigation aria-label="Collapsible Navigation Menu">
							<SideNavigation.NavCategory icon="audio-on" label="Collapsed">
								<SideNavigation.LinkItem href="#first">
									First Item
								</SideNavigation.LinkItem>
								<SideNavigation.LinkItem href="#second">
									Second Item
								</SideNavigation.LinkItem>
							</SideNavigation.NavCategory>
							<SideNavigation.NavCategory expanded icon="call" label="Active">
								<SideNavigation.LinkItem href="#item1">
									Item 1
								</SideNavigation.LinkItem>
								<SideNavigation.LinkItem href="#item2" active>
									Active Item 2
								</SideNavigation.LinkItem>
								<SideNavigation.LinkItem href="#item3">
									Item 3
								</SideNavigation.LinkItem>
							</SideNavigation.NavCategory>
							<SideNavigation.NavCategory
								disabled
								icon="available"
								label="Disabled"
							>
								<SideNavigation.LinkItem href="#disabled1">
									First Item
								</SideNavigation.LinkItem>
								<SideNavigation.LinkItem href="#disabled2">
									Second Item
								</SideNavigation.LinkItem>
							</SideNavigation.NavCategory>
						</SideNavigation>
					</div>
				)}
			</>
		);
	},
];

export const TitleExample = Template.bind({});
TitleExample.args = {
	logo: Logo,
	title: "Product Name",
};

export const SearchExample = Template.bind({});
SearchExample.args = {
	logo: Logo,
	search: <TopNav.Search />,
	skipNav: (
		<TopNav.SkipNav href="#main-content">Skip To Main Content</TopNav.SkipNav>
	),
};
SearchExample.decorators = [
	(Story, context) => {
		const [searchString, setSearchString] = useState("");

		const captureSearchString = (e: FormEvent) => {
			setSearchString((e.target as HTMLInputElement).value);
		};

		const args = { ...context.args };

		const searchWithHandler = cloneElement(args.search!, {
			onChange: captureSearchString,
		});

		return (
			<>
				<Story args={{ ...args, search: searchWithHandler }} />
				<section id="main-content">
					You are searching for: {searchString}
				</section>
			</>
		);
	},
];

export const ButtonsExample = () => {
	return (
		<TopNav logo={Logo}>
			<TopNav.LinkButton href="/whats-new">Link</TopNav.LinkButton>

			<TopNav.LinkButton href="/whats-new" active>
				Active Link
			</TopNav.LinkButton>

			<TopNav.LinkButton href="/whats-new" disabled>
				Disabled Link
			</TopNav.LinkButton>

			<TopNav.LinkButton href="/whats-new" active disabled>
				Active Disabled Link
			</TopNav.LinkButton>

			<TopNav.IconButton icon="settings" aria-label="Settings" badge="12" />

			<TopNav.IconButton icon="settings" aria-label="Settings" active />

			<TopNav.IconButton icon="settings" aria-label="Settings" disabled />

			<TopNav.IconButton
				icon="settings"
				aria-label="Settings"
				active
				disabled
			/>
		</TopNav>
	);
};

export const AvatarExample = Template.bind({});
AvatarExample.args = {
	logo: Logo,
	children: (
		<>
			<TopNav.IconButton icon="info" aria-label="Info" active />
			<TopNav.IconButton icon="settings" aria-label="Settings" />

			<TopNav.Avatar
				avatar={<Avatar initials="MD" />}
				dropdown={
					<Menu
						itemAlignment="right"
						menuRootElement={
							<MenuButton onClick={() => console.log("Functional Menu opened")}>
								Functional Menu
							</MenuButton>
						}
					>
						<MenuItem>Item1</MenuItem>
						<SubMenu menuRootElement={<MenuItem>Sub Menu</MenuItem>}>
							<MenuItem>Sub Item1</MenuItem>
							<MenuItem>Sub Item2</MenuItem>
						</SubMenu>
						<MenuItem>Item3</MenuItem>
					</Menu>
				}
			/>
		</>
	),
};

export const TabsExample = () => {
	const [activeTabPanelIndex, setActiveTabPanelIndex] = useState(0);
	const contentToToggle = ["Tab 1 content", "Tab 2 content", "Tab 3 content"];

	return (
		<>
			<TopNav logo={Logo}>
				<Tabs onTabPanelChange={setActiveTabPanelIndex}>
					<TabList>
						<Tab id="tab1">Tab1</Tab>
						<Tab id="tab2">Tab2</Tab>
						<Tab id="tab3">Tab3</Tab>
						<TabLink id="tab4" href="http://kagi.com">
							Tab4
						</TabLink>
					</TabList>
				</Tabs>
			</TopNav>

			<p style={{ marginTop: "30px" }}>
				{contentToToggle[activeTabPanelIndex]}
			</p>
		</>
	);
};

export const StickyTopNav: Story<TopNavProps> = () => {
	return (
		<>
			<TopNav logo={Logo} sticky />
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
				egestas orci sit amet mi dapibus condimentum. Etiam placerat facilisis
				velit in congue. Donec ut commodo augue, quis hendrerit lorem. Etiam ac
				pulvinar magna. Etiam vel eros euismod, imperdiet sem sit amet,
				ultricies nisl. Duis consectetur vitae sapien et blandit. Cras vel
				eleifend justo. In interdum aliquam diam ut porta. Lorem ipsum dolor sit
				amet, consectetur adipiscing elit. Integer turpis eros, dignissim non
				elit eget, mollis dapibus massa. Maecenas ultricies vulputate lacinia.
				Vestibulum blandit leo erat, eget semper eros rhoncus ac. Proin quis
				purus quis magna dignissim sollicitudin eu auctor mauris. Mauris quis
				purus sed mauris commodo viverra. Vivamus porttitor consequat facilisis.
				Aenean dignissim tortor ac dapibus sollicitudin. Duis tempor sapien in
				ante eleifend ornare. Praesent viverra lectus vitae nunc semper viverra.
				Nunc sit amet tincidunt dolor. Aliquam consectetur nunc eget pharetra
				molestie. Integer molestie sollicitudin dapibus. Nulla facilisi. Integer
				congue bibendum urna ut pretium. Nulla vitae bibendum purus. Integer dui
				ligula, varius nec porttitor malesuada, fringilla id ante. Nunc sagittis
				luctus enim, eu vestibulum ante egestas quis. Nam ut porttitor metus,
				nec sodales velit. Fusce et est fringilla, convallis diam fermentum,
				auctor libero. Maecenas interdum neque quis quam tempus, quis facilisis
				odio pellentesque. Vivamus mattis ante a accumsan gravida. Nullam
				volutpat pulvinar feugiat. Sed bibendum erat velit, sagittis tempor eros
				condimentum ut. Suspendisse feugiat nec odio at maximus. Integer nec
				ligula ac felis porttitor consequat et id nisl. Donec vulputate massa
				massa, nec lobortis magna lobortis vitae. Pellentesque pharetra
				tincidunt libero, ac porta eros sagittis sed. Proin porttitor id purus
				eu rhoncus. Vestibulum pellentesque orci eget euismod blandit. Aenean
				nec quam eu lectus vulputate tincidunt. Aenean dictum in urna sit amet
				malesuada. Integer at mauris vel purus pellentesque volutpat at nec
				tellus. Cras at pulvinar felis. Proin vel leo in ex porta porta ut sed
				nisi. Etiam volutpat metus risus, et vestibulum magna malesuada semper.
				In condimentum elit felis, at auctor lectus elementum sit amet. Sed
				vehicula tellus enim, facilisis mollis turpis imperdiet ac. Morbi et
				odio at ipsum ullamcorper mollis. Sed vestibulum, mauris vitae hendrerit
				eleifend, nisl arcu imperdiet ex, ut bibendum eros urna quis orci.
				Maecenas urna libero, condimentum id dignissim id, semper sed velit.
				Duis sodales est eu mauris ma
			</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
				egestas orci sit amet mi dapibus condimentum. Etiam placerat facilisis
				velit in congue. Donec ut commodo augue, quis hendrerit lorem. Etiam ac
				pulvinar magna. Etiam vel eros euismod, imperdiet sem sit amet,
				ultricies nisl. Duis consectetur vitae sapien et blandit. Cras vel
				eleifend justo. In interdum aliquam diam ut porta. Lorem ipsum dolor sit
				amet, consectetur adipiscing elit. Integer turpis eros, dignissim non
				elit eget, mollis dapibus massa. Maecenas ultricies vulputate lacinia.
				Vestibulum blandit leo erat, eget semper eros rhoncus ac. Proin quis
				purus quis magna dignissim sollicitudin eu auctor mauris. Mauris quis
				purus sed mauris commodo viverra. Vivamus porttitor consequat facilisis.
				Aenean dignissim tortor ac dapibus sollicitudin. Duis tempor sapien in
				ante eleifend ornare. Praesent viverra lectus vitae nunc semper viverra.
				Nunc sit amet tincidunt dolor. Aliquam consectetur nunc eget pharetra
				molestie. Integer molestie sollicitudin dapibus. Nulla facilisi. Integer
				congue bibendum urna ut pretium. Nulla vitae bibendum purus. Integer dui
				ligula, varius nec porttitor malesuada, fringilla id ante. Nunc sagittis
				luctus enim, eu vestibulum ante egestas quis. Nam ut porttitor metus,
				nec sodales velit. Fusce et est fringilla, convallis diam fermentum,
				auctor libero. Maecenas interdum neque quis quam tempus, quis facilisis
				odio pellentesque. Vivamus mattis ante a accumsan gravida. Nullam
				volutpat pulvinar feugiat. Sed bibendum erat velit, sagittis tempor eros
				condimentum ut. Suspendisse feugiat nec odio at maximus. Integer nec
				ligula ac felis porttitor consequat et id nisl. Donec vulputate massa
				massa, nec lobortis magna lobortis vitae. Pellentesque pharetra
				tincidunt libero, ac porta eros sagittis sed. Proin porttitor id purus
				eu rhoncus. Vestibulum pellentesque orci eget euismod blandit. Aenean
				nec quam eu lectus vulputate tincidunt. Aenean dictum in urna sit amet
				malesuada. Integer at mauris vel purus pellentesque volutpat at nec
				tellus. Cras at pulvinar felis. Proin vel leo in ex porta porta ut sed
				nisi. Etiam volutpat metus risus, et vestibulum magna malesuada semper.
				In condimentum elit felis, at auctor lectus elementum sit amet. Sed
				vehicula tellus enim, facilisis mollis turpis imperdiet ac. Morbi et
				odio at ipsum ullamcorper mollis. Sed vestibulum, mauris vitae hendrerit
				eleifend, nisl arcu imperdiet ex, ut bibendum eros urna quis orci.
				Maecenas urna libero, condimentum id dignissim id, semper sed velit.
				Duis sodales est eu mauris ma
			</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
				egestas orci sit amet mi dapibus condimentum. Etiam placerat facilisis
				velit in congue. Donec ut commodo augue, quis hendrerit lorem. Etiam ac
				pulvinar magna. Etiam vel eros euismod, imperdiet sem sit amet,
				ultricies nisl. Duis consectetur vitae sapien et blandit. Cras vel
				eleifend justo. In interdum aliquam diam ut porta. Lorem ipsum dolor sit
				amet, consectetur adipiscing elit. Integer turpis eros, dignissim non
				elit eget, mollis dapibus massa. Maecenas ultricies vulputate lacinia.
				Vestibulum blandit leo erat, eget semper eros rhoncus ac. Proin quis
				purus quis magna dignissim sollicitudin eu auctor mauris. Mauris quis
				purus sed mauris commodo viverra. Vivamus porttitor consequat facilisis.
				Aenean dignissim tortor ac dapibus sollicitudin. Duis tempor sapien in
				ante eleifend ornare. Praesent viverra lectus vitae nunc semper viverra.
				Nunc sit amet tincidunt dolor. Aliquam consectetur nunc eget pharetra
				molestie. Integer molestie sollicitudin dapibus. Nulla facilisi. Integer
				congue bibendum urna ut pretium. Nulla vitae bibendum purus. Integer dui
				ligula, varius nec porttitor malesuada, fringilla id ante. Nunc sagittis
				luctus enim, eu vestibulum ante egestas quis. Nam ut porttitor metus,
				nec sodales velit. Fusce et est fringilla, convallis diam fermentum,
				auctor libero. Maecenas interdum neque quis quam tempus, quis facilisis
				odio pellentesque. Vivamus mattis ante a accumsan gravida. Nullam
				volutpat pulvinar feugiat. Sed bibendum erat velit, sagittis tempor eros
				condimentum ut. Suspendisse feugiat nec odio at maximus. Integer nec
				ligula ac felis porttitor consequat et id nisl. Donec vulputate massa
				massa, nec lobortis magna lobortis vitae. Pellentesque pharetra
				tincidunt libero, ac porta eros sagittis sed. Proin porttitor id purus
				eu rhoncus. Vestibulum pellentesque orci eget euismod blandit. Aenean
				nec quam eu lectus vulputate tincidunt. Aenean dictum in urna sit amet
				malesuada. Integer at mauris vel purus pellentesque volutpat at nec
				tellus. Cras at pulvinar felis. Proin vel leo in ex porta porta ut sed
				nisi. Etiam volutpat metus risus, et vestibulum magna malesuada semper.
				In condimentum elit felis, at auctor lectus elementum sit amet. Sed
				vehicula tellus enim, facilisis mollis turpis imperdiet ac. Morbi et
				odio at ipsum ullamcorper mollis. Sed vestibulum, mauris vitae hendrerit
				eleifend, nisl arcu imperdiet ex, ut bibendum eros urna quis orci.
				Maecenas urna libero, condimentum id dignissim id, semper sed velit.
				Duis sodales est eu mauris ma
			</p>
		</>
	);
};

export const AgentCardExample = () => {
	return (
		<TopNav logo={Logo}>
			<AgentCard
				agentName="Bob Boberson"
				agentStatus="connected"
				avatar={<Avatar />}
			/>
		</TopNav>
	);
};

export const DesignPortalExample = () => (
	<TopNav logo={Logo} search={<TopNav.Search />}>
		<TopNav.LinkButton href="/whats-new">Link</TopNav.LinkButton>

		<TopNav.LinkButton href="/active" active>
			Active
		</TopNav.LinkButton>

		<TopNav.LinkButton href="/active" disabled active>
			Disabled Active
		</TopNav.LinkButton>

		<TopNav.LinkButton href="/active" disabled>
			Disabled
		</TopNav.LinkButton>
	</TopNav>
);

export const IconButtonDropdownExample = () => (
	<TopNav logo={Logo} search={<TopNav.Search />}>
		<Menu
			itemAlignment="right"
			menuRootElement={
				<TopNav.IconButton
					className="neo-dropdown__link-header"
					icon="agents"
					aria-label="agents"
				/>
			}
		>
			<MenuItem>Item1</MenuItem>
			<SubMenu menuRootElement={<MenuItem>Sub Menu</MenuItem>}>
				<MenuItem>Sub Item1</MenuItem>
				<MenuItem>Sub Item2</MenuItem>
			</SubMenu>
			<MenuItem>Item3</MenuItem>
		</Menu>
		<TopNav.IconButton icon="settings" aria-label="Settings" />
		<TopNav.IconButton
			icon="notifications-on"
			aria-label="notifications"
			badge="2"
		/>
	</TopNav>
);
