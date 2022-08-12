import { Meta, Story } from "@storybook/react/types-6-0";

import { IconChip, IconChipProps } from "./";

export default {
  title: "Components/Chips/Icon Chip",
  component: IconChip,
} as Meta<IconChipProps>;

const Template: Story<IconChipProps> = (props: IconChipProps) => (
  <IconChip {...props} />
);

export const DefaultWithIcon = Template.bind({});
DefaultWithIcon.args = {
  chiptype: "icon",
  icon: "info",
  text: "Icon Default LTR Info",
  dir: "ltr",
};

export const SuccessWithIconAndTooltip = Template.bind({});
SuccessWithIconAndTooltip.args = {
  chiptype: "icon",
  variant: "success",
  icon: "link",
  text: "Success Disabled RTL with Link Icon",
  disabled: true,
  dir: "rtl",
  tooltip: { label: "Success", position: "top-left" },
};

export const InfoWithIcon = Template.bind({});
InfoWithIcon.args = {
  chiptype: "icon",
  variant: "info",
  icon: "info",
  text: "Info with Info Icon",
};

export const AlertWithIcon = Template.bind({});
AlertWithIcon.args = {
  chiptype: "icon",
  variant: "alert",
  icon: "info",
  text: "Alert with Info Icon",
};

export const WarningWithIconOnRight = Template.bind({});
WarningWithIconOnRight.args = {
  chiptype: "icon",
  variant: "warning",
  icon: "info",
  dir: "rtl",
  text: "Warning with Info Icon",
};
