import { Meta } from "@storybook/react/types-7-0";

import { LeftNavigation } from "../LeftNavigation";
import { TopLinkItem, TopLinkItemProps } from "./TopLinkItem";

export default {
  title: "Components/Left Navigation/Top Link Item",
  component: TopLinkItem,
} as Meta<TopLinkItemProps>;
const handleClick = (id: string, url: string) => {
  alert(`clicked on the item with id: ${id}, url: ${url}`);
};
export const Default = () => (
  <LeftNavigation
    aria-label="Main Navigation"
    onNavigate={handleClick}
    currentUrl=""
  >
    <TopLinkItem label="Normal Link" href="#" />
    <TopLinkItem active label="Active Link" href="#" />
    <TopLinkItem label="Normal Link with Icon" icon="address-book" href="#" />
    <TopLinkItem
      active
      label="Active Link with Icon"
      icon="address-book"
      href="#"
    />
    <TopLinkItem label="Disabled Link" disabled href="#" />
    <TopLinkItem
      label="Disabled Link with Icon"
      icon="address-book"
      disabled
      href="#"
    />
  </LeftNavigation>
);
