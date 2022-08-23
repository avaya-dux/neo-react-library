import { Meta } from "@storybook/react/types-7-0";

import { LeftNavigation } from "../LeftNavigation";
import { TopLinkItem, TopLinkItemProps } from "./TopLinkItem";

export default {
  title: "Components/Left Navigation/Top Link Item",
  component: TopLinkItem,
} as Meta<TopLinkItemProps>;
const handleClick = (id: string, url: string) => {
  window.open(url);
};
export const Default = () => (
  <LeftNavigation
    aria-label="Main Navigation"
    onNavigate={handleClick}
    currentUrl="#active"
  >
    <TopLinkItem label="Active by default" href="#active" />
    <TopLinkItem label="Link to Google" href="http://google.com" />
    <TopLinkItem
      label="Link with Icon to Bing"
      icon="address-book"
      href="http://bing.com"
    />
    <TopLinkItem label="Disabled Link" disabled href="#disabled" />
    <TopLinkItem
      label="Disabled Link with Icon"
      icon="address-book"
      disabled
      href="#disabledicon"
    />
  </LeftNavigation>
);
