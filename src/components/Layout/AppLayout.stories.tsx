import { Meta } from "@storybook/react/types-7-0";
import { ReactNode } from "react";

import { AppLayout, AppLayoutProps } from "./";
import { LeftNav } from "components/LeftNav";
import { Widget } from "components/Widget";
import { Icon } from "components/Icon";

export default {
  title: "Components/AppLayout",
  component: AppLayout,
} as Meta<AppLayoutProps>;

const inverseDesktopAreas = `
  footer footer
  leftpanel main
  topheader topheader
`;

const leftNav: ReactNode = (
  <LeftNav
    aria-label="Integration Testing App Menu"
    currentUrl="http://active.com"
  >
    <LeftNav.TopLinkItem
      icon="interaction-details"
      label="Getting Started"
      href="/"
    />
    <LeftNav.TopLinkItem icon="user-add" label="Users" href="/users" />
    <LeftNav.TopLinkItem icon="awfos" label="SAML IDP" href="/idps" />
    <LeftNav.NavCategory icon="code-cloud" label="Demo Pages">
      <LeftNav.LinkItem href="/table"> Table Component </LeftNav.LinkItem>
      <LeftNav.LinkItem href="/form"> Form Component </LeftNav.LinkItem>
    </LeftNav.NavCategory>
  </LeftNav>
);

const emptyWidget: ReactNode = (
  <Widget empty>
    <Icon icon="settings" aria-label="settings" />
    <p>Header of widget window</p>
  </Widget>
);

export const Default = () => (
  <AppLayout
    // header={TopNavBar}
    leftPanel={leftNav}
    mainContent={emptyWidget}
    // rightPanel={emptyWidget}
    // footer={emptyWidget}
  />
);

export const HeaderAndContent = () => (
  <AppLayout
    header={emptyWidget}
    mainContent={emptyWidget}
  />
);

