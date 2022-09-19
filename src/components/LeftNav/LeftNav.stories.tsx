import { Meta } from "@storybook/react/types-7-0";

import { LeftNav, LeftNavProps } from "./";

export default {
  title: "Components/Left Navigation",
  component: LeftNav,
} as Meta<LeftNavProps>;

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
);

export const CategoryGroups = () => (
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

export const CategoryGroupsWithIcons = () => (
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
