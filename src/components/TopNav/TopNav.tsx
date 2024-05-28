import clsx from "clsx";

import {
	TopNavAvatar,
	TopNavIconButton,
	TopNavLinkButton,
	TopNavSearch,
	TopNavSkipNav,
} from "./helpers";
import type { TopNavProps } from "./TopNavTypes";

import "./TopNav_shim.css";

/**
 * TopNav is used to orient users, and to access different areas within an interface.
 *
 * @example
 * <TopNav
    logo={<Image isDecorativeOrBranding src="link/to/image.png"/>}
    skipNav={<TopNav.SkipNav href="#main-content">Skip To Main Content</TopNav.SkipNav>}
    title="Product Name"
  />
 *
 * <TopNav logo={<Image isDecorativeOrBranding src="link/to/image.png"/>}>
    <TopNav.LinkButton active href="/components">Link</TopNav.LinkButton>
    <TopNav.IconButton icon="settings" aria-label="Settings" />
  </TopNav>
 *
 * <TopNav
    logo={<Image isDecorativeOrBranding src="link/to/image.png"/>}
    search={<TopNav.Search onChange={handleChange} />}
    title="Product Name"
  />
 * @see https://design.avayacloud.com/components/web/navbar-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-top-navigation
 */
export const TopNav = ({
	children,
	logo,
	menuToggleBtn,
	search,
	skipNav,
	sticky,
	title,
}: TopNavProps) => {
	return (
		<nav className={clsx("neo-navbar", sticky && "neo-navbar--sticky")}>
			<div className="neo-nav--left">
				{skipNav}

				{menuToggleBtn}

				{logo}

				{title && <h1 className="neo-nav-title">{title}</h1>}
			</div>

			<div className="neo-nav">{children}</div>

			<div className="neo-nav--right">{search}</div>
		</nav>
	);
};
TopNav.displayName = "TopNav";
TopNav.Avatar = TopNavAvatar;
TopNav.IconButton = TopNavIconButton;
TopNav.LinkButton = TopNavLinkButton;
TopNav.Search = TopNavSearch;
TopNav.SkipNav = TopNavSkipNav;
