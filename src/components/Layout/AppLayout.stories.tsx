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

const headerWidget: ReactNode = (
  <Widget empty>
    <Icon icon="settings" aria-label="settings" />
    <p>Header Widget</p>
  </Widget>
);

const leftPanelWidget: ReactNode = (
  <Widget empty>
    <Icon icon="settings" aria-label="settings" />
    <p>Left Pane Widget</p>
  </Widget>
);

const rightPanelWidget: ReactNode = (
  <Widget empty>
    <Icon icon="settings" aria-label="settings" />
    <p>Right Pane Widget</p>
  </Widget>
);

const mainContentWidget: ReactNode = (
  <Widget empty>
    <Icon icon="settings" aria-label="settings" />
    <p>Main Content Widget</p>
  </Widget>
);

const footerWidget: ReactNode = (
  <Widget empty>
    <Icon icon="settings" aria-label="settings" />
    <p>Footer Widget</p>
  </Widget>
);

export const Default = () => (
  <AppLayout
    header={headerWidget}
    leftPanel={leftPanelWidget}
    mainContent={mainContentWidget}
    rightPanel={rightPanelWidget}
    footer={footerWidget}
  />
);

export const HeaderAndContent = () => (
  <AppLayout header={headerWidget} mainContent={mainContentWidget} />
);

export const LeftPanelAndContent = () => (
  <AppLayout leftPanel={leftPanelWidget} mainContent={mainContentWidget} />
);

export const FooterAndContent = () => (
  <AppLayout footer={footerWidget} mainContent={mainContentWidget} />
);

export const RightPanelAndContent = () => (
  <AppLayout rightPanel={rightPanelWidget} mainContent={mainContentWidget} />
);

export const LeftNavHeaderAndContent = () => (
  <AppLayout
    header={headerWidget}
    leftPanel={leftNav}
    mainContent={mainContentWidget}
  />
);
