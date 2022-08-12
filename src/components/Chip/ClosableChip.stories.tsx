import { Meta, Story } from "@storybook/react/types-6-0";

import { ClosableChip, ClosableChipProps } from "./";

export default {
  title: "Components/Chips/Closable Chip",
  component: ClosableChip,
} as Meta<ClosableChipProps>;

const Template: Story<ClosableChipProps> = (props: ClosableChipProps) => (
  <ClosableChip {...props} />
);

export const ClosableDefault = Template.bind({});
ClosableDefault.args = {
  chiptype: "closable",
  id: "default",
  text: "Closable Default",
  onClick: (e) => {
    e.preventDefault();
    console.log((e.target as HTMLElement).getAttribute("id"));
  },
};

export const ClosableSuccess = Template.bind({});
ClosableSuccess.args = {
  chiptype: "closable",
  id: "success",
  variant: "success",
  text: "Closable Disabled Success",
  disabled: true,
};

export const ClosableSuccessWithIcon = Template.bind({});
ClosableSuccessWithIcon.args = {
  chiptype: "closable",
  id: "success",
  variant: "success",
  text: "Closable Disabled Success",
  disabled: true,
  icon: "info",
};

export const ClosableInfo = Template.bind({});
ClosableInfo.args = {
  chiptype: "closable",
  id: "info",
  variant: "info",
  text: "Closable Info",
};

export const ClosableAlert = Template.bind({});
ClosableAlert.args = {
  chiptype: "closable",
  id: "alert",
  variant: "alert",
  text: "Closable Alert",
};

export const ClosableWarning = Template.bind({});
ClosableWarning.args = {
  chiptype: "closable",
  id: "warning",
  variant: "warning",
  text: "Closable Disabled Warning",
  disabled: true,
};

export const ClosableWarningWithTooltip = Template.bind({});
ClosableWarningWithTooltip.args = {
  chiptype: "closable",
  variant: "warning",
  text: "Closable Warning With Tooltip",
  tooltip: { label: "Warning" },
};
