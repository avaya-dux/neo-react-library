import { Meta } from "@storybook/react/types-7-0";

import { LeftNav, TopLinkItemProps } from "../";

export default {
  title: "Components/Left Navigation/Top Link Item",
  component: LeftNav.TopLinkItem,
} as Meta<TopLinkItemProps>;

const handleClick = (id: string, url: string) => {
  window.open(url);
};

export const Default = () => (
  <LeftNav
    aria-label="Main Navigation"
    onNavigate={handleClick}
    currentUrl="#active"
  >
    <LeftNav.TopLinkItem label="Active by default" href="#active" />
    <LeftNav.TopLinkItem label="Link to Google" href="http://google.com" />
    <LeftNav.TopLinkItem
      label="Link with Icon to Bing"
      icon="address-book"
      href="http://bing.com"
    />
    <LeftNav.TopLinkItem label="Disabled Link" disabled href="#disabled" />
    <LeftNav.TopLinkItem
      label="Disabled Link with Icon"
      icon="address-book"
      disabled
      href="#disabledicon"
    />
  </LeftNav>
);
