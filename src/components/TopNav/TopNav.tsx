import clsx from "clsx";

import {
  TopNavAvatar,
  TopNavButton,
  TopNavSearch,
  TopNavSkipNav,
} from "./helpers";
import { TopNavProps } from "./TopNavTypes";

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
 * <TopNav
    logo={<Image isDecorativeOrBranding src="link/to/image.png"/>}
    skipNav={<TopNav.SkipNav href="#main-content">Skip To Main Content</TopNav.SkipNav>}
  >
    <TopNav.Button href="/components">Components</TopNav.Button>
    <TopNav.Button icon="settings" aria-label="Settings" key="settings" />
  </TopNav>
 *
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
  tabs,
  title,
}: TopNavProps) => {
  return (
    <nav className={clsx("neo-navbar", sticky && "neo-navbar--sticky")}>
      <div className="neo-nav--left">
        {skipNav}

        {menuToggleBtn}

        {logo}

        {title && <h1 className="nav-title">{title}</h1>}
      </div>

      <div className="neo-nav">
        {tabs}

        {children}

        {search}
      </div>
    </nav>
  );
};
TopNav.displayName = "TopNav";
TopNav.Avatar = TopNavAvatar;
TopNav.Button = TopNavButton;
TopNav.Search = TopNavSearch;
TopNav.SkipNav = TopNavSkipNav;
