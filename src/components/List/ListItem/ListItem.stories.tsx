import { Meta, Story } from "@storybook/react/types-6-0";

import { Avatar, Icon, IconButton, Switch } from "components";
import { List } from "components/List";

import { ListItem, ListItemProps, ListSection, ListSectionProps } from ".";

export default {
  title: "Components/List Item",
  component: ListItem,
} as Meta<ListItemProps>;

const avGeneric = <Avatar variant="generic" id="avtar-generic" />;

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

const iconBtnTransferCall = (
  <IconButton
    aria-label="transfer call"
    data-testid="neo-button-transfer"
    id="btn-transfer-call"
    icon="call-transfer"
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

const timeAndBadge = (
  <div className="vertical">
    <p className="neo-body-small">6:02 PM</p>
    <div>
      <span className="neo-badge" data-badge="9"></span>
    </div>
  </div>
);

const basicSwitch = <Switch aria-label="Activate" defaultChecked />;

// Specific ListItem scenarios

export const ListItemTextOnly: Story<ListItemProps> = (
  props: ListItemProps
) => (
  <List itemType="ListItem">
    <ListItem {...props}>First item, text Only</ListItem>

    <ListItem {...props}>Second item, text only</ListItem>
  </List>
);

export const ListItemTooltipAndDivider: Story<ListItemProps> = (
  props: ListItemProps
) => (
  <List itemType="ListItem">
    <ListItem
      tooltip="Tooltip with auto position"
      showDivider
      avatar={avGeneric}
      actions={[iconBtnCall]}
      {...props}
    >
      ListItem with Tooltip and divider below and action button
    </ListItem>
    <ListItem icon={iconStar} actions={[timeAndBadge]} {...props}>
      <div className="vertical">
        Myron Hart
        <p className="neo-body-small">I sent an email to you regarding</p>
      </div>
    </ListItem>
  </List>
);

// Specific List Section scenarios
export const ListSectionTextOnly: Story<ListSectionProps> = (
  props: ListSectionProps
) => (
  <List itemType="ListSection">
    <ListSection {...props}>First item</ListSection>

    <ListSection {...props}>Second item</ListSection>
  </List>
);

export const ListSectionTextOnlyWithHover: Story<ListSectionProps> = (
  props: ListSectionProps
) => (
  <List itemType="ListSection">
    <ListSection hover {...props}>
      First item
    </ListSection>

    <ListSection hover {...props}>
      Second item
    </ListSection>
  </List>
);

export const ListSectionTextWithIconAndHover: Story<ListSectionProps> = (
  props: ListSectionProps
) => (
  <List itemType="ListSection">
    <ListSection icon={iconChat} hover {...props}>
      First item with chat icon
    </ListSection>

    <ListSection icon={iconStar} hover {...props}>
      Second item with star icon
    </ListSection>
  </List>
);

export const ListSectionTextWithIconAndHoverAndSwitch: Story<
  ListSectionProps
> = (props: ListSectionProps) => (
  <List itemType="ListSection">
    <ListSection icon={iconChat} actions={[basicSwitch]} hover {...props}>
      First item with chat icon and switch
    </ListSection>

    <ListSection icon={iconStar} hover {...props}>
      Second item with star icon
    </ListSection>
  </List>
);

export const ListSectionTextWithIconAndHoverAndIconButton: Story<
  ListSectionProps
> = (props: ListSectionProps) => (
  <List itemType="ListSection">
    <ListSection
      icon={iconChat}
      actions={[iconBtnTransferCall]}
      hover
      {...props}
    >
      First item with chat icon and transfer call button
    </ListSection>

    <ListSection icon={iconStar} hover {...props}>
      Second item with star icon
    </ListSection>
  </List>
);
