import { ComponentStory } from "@storybook/react";
import { Meta } from "@storybook/react/types-6-0";

import { Icon, IconProps } from ".";

export default {
  title: "Components/Icon",
  component: Icon,
} as Meta<IconProps>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const CustomClassName = Template.bind({});
CustomClassName.args = {
  icon: "save",
  size: "sm",
  "aria-label": "Testing size xs",
  className: "btn-icon-test another-class",
};

export const StandardIconSM = Template.bind({});
StandardIconSM.args = {
  icon: "info",
  size: "sm",
  "aria-label": "Testing size sm",
};

export const StandardIconLG = Template.bind({});
StandardIconLG.args = {
  icon: "info",
  size: "lg",
  "aria-label": "Testing size lg",
};

export const LargeChatIcon = Template.bind({});
LargeChatIcon.args = {
  icon: "chat",
  size: "lg",
  "aria-label": "Testing icon chat",
};

export const testBaseHTMLAttributes = Template.bind({});
// TODO Bug https://jira.forge.avaya.com/browse/NEO-651
testBaseHTMLAttributes.args = {
  tabIndex: 0,
  icon: "save",
  "aria-label": "Testing icon chat",
};

export const AriaLabelMissing = Template.bind({});
AriaLabelMissing.args = {
  icon: "settings",
  size: "lg",
};

export const AvailableStatus = Template.bind({});
AvailableStatus.args = {
  icon: "call",
  status: "available",
  size: "lg",
  "aria-label": "Testing status available",
};

export const AwayStatus = Template.bind({});
AwayStatus.args = {
  icon: "call",
  status: "away",
  size: "lg",
  "aria-label": "Testing status away",
};
