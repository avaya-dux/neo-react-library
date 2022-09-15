import { Meta, Story } from "@storybook/react/types-6-0";

import { LeftNav } from "../LeftNav";
import { NavCategoryProps } from "../LeftNavTypes";

export default {
  title: "Components/Left Navigation/Nav Category",
  component: LeftNav.NavCategory,
} as Meta<NavCategoryProps>;

export const TextOnly: Story<NavCategoryProps> = () => (
  <LeftNav aria-label="Text only Nav" currentUrl="http://active.com">
    <LeftNav.NavCategory expanded={true} label="Text Only Category">
      <LeftNav.LinkItem href="http://first.com"> First Item </LeftNav.LinkItem>
      <LeftNav.LinkItem href="http://active.com">Active Item</LeftNav.LinkItem>
      <LeftNav.LinkItem href="http://third.com"> Third Item </LeftNav.LinkItem>
      <LeftNav.LinkItem href="http://avaya.com" disabled>
        Disabled Item
      </LeftNav.LinkItem>
    </LeftNav.NavCategory>
    <LeftNav.NavCategory label="Collapsed">
      <LeftNav.LinkItem href="http://link.com"> Link1 </LeftNav.LinkItem>
      <LeftNav.LinkItem href="http://dup.com">Duplicate Link</LeftNav.LinkItem>
      <LeftNav.LinkItem href="http://dup.com">Duplicate Link</LeftNav.LinkItem>
    </LeftNav.NavCategory>
    <LeftNav.NavCategory disabled label="Disabled Category">
      <LeftNav.LinkItem href="http://avaya.com"> First Item </LeftNav.LinkItem>
      <LeftNav.LinkItem href="http://avaya.com"> Second Item </LeftNav.LinkItem>
    </LeftNav.NavCategory>
  </LeftNav>
);

export const WithIcons: Story<NavCategoryProps> = () => (
  <LeftNav aria-label="Nav with Icons" currentUrl="http://active.com">
    <LeftNav.NavCategory icon="audio-on" label="Collapsed">
      <LeftNav.LinkItem href="http://first.com"> First Item </LeftNav.LinkItem>
      <LeftNav.LinkItem href="http://dup.com">Duplicate Link</LeftNav.LinkItem>
      <LeftNav.LinkItem href="http://dup.com"> Duplicate Link</LeftNav.LinkItem>
      <LeftNav.LinkItem href="http://fourth.com">Fourth Item</LeftNav.LinkItem>
    </LeftNav.NavCategory>
    <LeftNav.NavCategory expanded icon="call" label="Active">
      <LeftNav.LinkItem href="http://item1.com"> Item 1 </LeftNav.LinkItem>
      <LeftNav.LinkItem href="http://active.com">Active Item</LeftNav.LinkItem>
      <LeftNav.LinkItem href="http://disabled.com" disabled>
        Disabled Item
      </LeftNav.LinkItem>
      <LeftNav.LinkItem href="http://item3.com"> Item 3</LeftNav.LinkItem>
    </LeftNav.NavCategory>
    <LeftNav.NavCategory disabled icon="available" label="Disabled Category">
      <LeftNav.LinkItem href="http://link.com"> Link </LeftNav.LinkItem>
      <LeftNav.LinkItem href="http://link2.com"> Link 2</LeftNav.LinkItem>
    </LeftNav.NavCategory>
  </LeftNav>
);

export const TestApp: Story<NavCategoryProps> = () => (
  <LeftNav
    aria-label="Integration Testing App Menu"
    currentUrl="http://active.com"
  >
    <LeftNav.NavCategory icon="interaction-details" label="Interactivity">
      <LeftNav.LinkItem href="http://first.com">Address Book</LeftNav.LinkItem>
      <LeftNav.LinkItem href="http://dup.com"> Email Client </LeftNav.LinkItem>
      <LeftNav.LinkItem href="http://dup.com">Manage Accounts</LeftNav.LinkItem>
      <LeftNav.LinkItem href="http://fourth.com">
        Photo Gallery
      </LeftNav.LinkItem>
      <LeftNav.LinkItem href="http://fourth.com">
        Notification Center
      </LeftNav.LinkItem>
    </LeftNav.NavCategory>
    <LeftNav.NavCategory icon="code-cloud" label="API Testing">
      <LeftNav.LinkItem href="http://item1.com"> Table </LeftNav.LinkItem>
      <LeftNav.LinkItem href="http://active.com">
        Select / Menus
      </LeftNav.LinkItem>
      <LeftNav.LinkItem href="http://disabled.com">Forms</LeftNav.LinkItem>
    </LeftNav.NavCategory>
    <LeftNav.NavCategory icon="layout-custom" label="Form Factor">
      <LeftNav.LinkItem href="http://link.com"> Desktop </LeftNav.LinkItem>
      <LeftNav.LinkItem href="http://link2.com"> Mobile</LeftNav.LinkItem>
      <LeftNav.LinkItem href="http://link2.com"> Layouts</LeftNav.LinkItem>
    </LeftNav.NavCategory>
    <LeftNav.NavCategory icon="chat-ready" label="Localization">
      <LeftNav.LinkItem href="http://strings.com"> Strings </LeftNav.LinkItem>
      <LeftNav.LinkItem href="http://dates.com"> Dates</LeftNav.LinkItem>
      <LeftNav.LinkItem href="http://bidi.com">Bi-directional</LeftNav.LinkItem>
    </LeftNav.NavCategory>
  </LeftNav>
);
