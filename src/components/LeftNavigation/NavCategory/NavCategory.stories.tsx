import { Meta, Story } from "@storybook/react/types-6-0";

import { LeftNavigation } from "../LeftNavigation";
import { NavCategoryProps } from "../LeftNavigationTypes";
import { LinkItem } from "../LinkItem";
import { NavCategory } from "./NavCategory";

export default {
  title: "Components/Left Navigation/Nav Category",
  component: NavCategory,
} as Meta<NavCategoryProps>;

export const TextOnly: Story<NavCategoryProps> = () => (
  <LeftNavigation aria-label="Text only Nav" currentUrl="http://active.com">
    <NavCategory expanded={true} label="Text Only Category">
      <LinkItem href="http://first.com"> First Item </LinkItem>
      <LinkItem href="http://active.com"> Active Item </LinkItem>
      <LinkItem href="http://third.com"> Third Item </LinkItem>
      <LinkItem href="http://avaya.com" disabled>
        Disabled Item
      </LinkItem>
    </NavCategory>
    <NavCategory label="Collapsed">
      <LinkItem href="http://link.com"> Link1 </LinkItem>
      <LinkItem href="http://dup.com"> Duplicate Link </LinkItem>
      <LinkItem href="http://dup.com"> Duplicate Link </LinkItem>
    </NavCategory>
    <NavCategory disabled label="Disabled Category">
      <LinkItem href="http://avaya.com"> First Item </LinkItem>
      <LinkItem href="http://avaya.com"> Second Item </LinkItem>
    </NavCategory>
  </LeftNavigation>
);

export const WithIcons: Story<NavCategoryProps> = () => (
  <LeftNavigation aria-label="Nav with Icons" currentUrl="http://active.com">
    <NavCategory icon="audio-on" label="Collapsed">
      <LinkItem href="http://first.com"> First Item </LinkItem>
      <LinkItem href="http://dup.com"> Duplicate Link </LinkItem>
      <LinkItem href="http://dup.com"> Duplicate Link</LinkItem>
      <LinkItem href="http://fourth.com"> Fourth Item </LinkItem>
    </NavCategory>
    <NavCategory expanded icon="call" label="Active">
      <LinkItem href="http://item1.com"> Item 1 </LinkItem>
      <LinkItem href="http://active.com"> Active Item </LinkItem>
      <LinkItem href="http://disabled.com" disabled>
        Disabled Item
      </LinkItem>
      <LinkItem href="http://item3.com"> Item 3</LinkItem>
    </NavCategory>
    <NavCategory disabled icon="available" label="Disabled Category">
      <LinkItem href="http://link.com"> Link </LinkItem>
      <LinkItem href="http://link2.com"> Link 2</LinkItem>
    </NavCategory>
  </LeftNavigation>
);

export const TestApp: Story<NavCategoryProps> = () => (
  <LeftNavigation
    aria-label="Integration Testing App Menu"
    currentUrl="http://active.com"
  >
    <NavCategory icon="interaction-details" label="Interactivity">
      <LinkItem href="http://first.com"> Address Book </LinkItem>
      <LinkItem href="http://dup.com"> Email Client </LinkItem>
      <LinkItem href="http://dup.com"> Manage Accounts</LinkItem>
      <LinkItem href="http://fourth.com"> Photo Gallery </LinkItem>
      <LinkItem href="http://fourth.com"> Notification Center </LinkItem>
    </NavCategory>
    <NavCategory icon="code-cloud" label="API Testing">
      <LinkItem href="http://item1.com"> Table </LinkItem>
      <LinkItem href="http://active.com"> Select / Menus </LinkItem>
      <LinkItem href="http://disabled.com">Forms</LinkItem>
    </NavCategory>
    <NavCategory icon="layout-custom" label="Form Factor">
      <LinkItem href="http://link.com"> Desktop </LinkItem>
      <LinkItem href="http://link2.com"> Mobile</LinkItem>
      <LinkItem href="http://link2.com"> Layouts</LinkItem>
    </NavCategory>
    <NavCategory icon="chat-ready" label="Localization">
      <LinkItem href="http://strings.com"> Strings </LinkItem>
      <LinkItem href="http://dates.com"> Dates</LinkItem>
      <LinkItem href="http://bidi.com"> Bi-directional</LinkItem>
    </NavCategory>
  </LeftNavigation>
);
