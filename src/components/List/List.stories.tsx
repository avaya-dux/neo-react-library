import { Meta, Story } from "@storybook/react";

import { Avatar, Icon, IconButton, Switch, Tooltip } from "components";
import { ListItem, ListSection } from "components/List/ListItem";

import { List, ListProps } from ".";

export default {
  title: "Components/List",
  component: List,
} as Meta<ListProps>;

const avatarJB = <Avatar initials="JB" id="avtar-jb" />;
const avatarBD = <Avatar initials="BD" id="avtar-bd" />;

const iconBtnCall = (
  <IconButton
    aria-label="call"
    data-testid="neo-button-call"
    id="btn-call"
    icon="call"
    shape="circle"
    variant="tertiary"
  />
);

const iconBtnCall2 = (
  <IconButton
    aria-label="call"
    data-testid="neo-button-call2"
    id="btn-call2"
    icon="call"
    shape="circle"
    variant="tertiary"
  />
);

const iconBtnVideoOn = (
  <IconButton
    aria-label="video on"
    data-testid="neo-button-video-on"
    id="btn-video-on"
    icon="video-on"
    shape="circle"
    variant="tertiary"
  />
);

const iconBtnTransferCall = (
  <Tooltip label="Transfer call">
    <IconButton
      aria-label="transfer call"
      data-testid="neo-button-transfer"
      id="btn-transfer-call"
      icon="call-transfer"
      shape="circle"
      variant="tertiary"
    />
  </Tooltip>
);

const iconBtnAddCall = (
  <IconButton
    aria-label="add call"
    data-testid="neo-button-add-call"
    id="btn-add-call"
    icon="call-add"
    shape="circle"
    variant="tertiary"
  />
);

const iconStar = (
  <Icon
    role="img"
    aria-label="star icon"
    data-testid="neo-icon-star"
    id="icon-star"
    icon="star"
  />
);
const iconChat = (
  <Icon
    role="img"
    aria-label="chat icon"
    data-testid="neo-icon-chat"
    id="icon-chat"
    icon="chat"
  />
);

const iconSettings = (
  <Icon
    role="img"
    aria-label="settings icon"
    data-testid="neo-icon-settings"
    id="icon-settings"
    icon="settings"
  />
);

const threeLineText = (
  <div className="vertical">
    <p className="neo-icon-star-filled star-color">Brent Davidson</p>
    <p className="neo-body-small neo-icon-call-outbound">2020-10-15 10:33 AM</p>
    <p className="neo-body-small">01:59:24</p>
  </div>
);

const verticalCounter = (
  <div className="vertical">
    <p className="neo-body-small">22:30</p>
    <p className="neo-body-small">30 min</p>
  </div>
);

const twoLineText = (
  <div className="vertical">
    Devices Design System Weekly
    <p className="neo-body-small">Devices Innovation</p>
  </div>
);

const timeAndBadge = (
  <div className="vertical">
    <p className="neo-body-small">6:02 PM</p>
    <div>
      <span className="neo-badge" data-badge="9"></span>
    </div>
  </div>
);

export const PortalListItemExamples: Story<ListProps> = (props: ListProps) => (
  <List itemType="ListItem">
    <ListItem
      tooltip="Joanne Barnett"
      showDivider
      avatar={avatarJB}
      actions={[iconBtnCall]}
      {...props}
    >
      Joan Barnett
    </ListItem>
    <ListItem showDivider {...props}>
      {verticalCounter}
      {twoLineText}
    </ListItem>
    <ListItem actions={[iconBtnTransferCall, iconBtnAddCall]} {...props}>
      <div className="vertical">
        Roy George
        <p className="neo-body-small">1-555-555-5555</p>
      </div>
    </ListItem>
    <ListItem
      showDivider
      tooltip="Tooltip shown on top position"
      avatar={avatarBD}
      actions={[iconBtnCall2, iconBtnVideoOn]}
      {...props}
    >
      {threeLineText}
      {twoLineText}
    </ListItem>
    <ListItem icon={iconStar} actions={[timeAndBadge]} {...props}>
      <div className="vertical">
        Myron Hart
        <p className="neo-body-small">I sent an email to you regarding</p>
      </div>
    </ListItem>
  </List>
);

const basicSwitch = <Switch aria-label="Activate" defaultChecked />;

export const PortalListSectionsExamples: Story<ListProps> = (
  props: ListProps,
) => (
  <List itemType="ListSection">
    <ListSection tooltip="This is a list section" icon={iconChat} {...props}>
      ListSection with chat icon and tooltip
    </ListSection>

    <ListSection icon={iconStar} actions={[basicSwitch]} {...props}>
      ListSection with star icon and switch
    </ListSection>

    <ListSection
      icon={iconSettings}
      actions={[iconBtnTransferCall, iconBtnAddCall]}
      {...props}
    >
      ListSection with settings icon and two IconButtons
    </ListSection>

    <ListSection actions={[basicSwitch]} {...props}>
      ListSection with switch
    </ListSection>
  </List>
);
