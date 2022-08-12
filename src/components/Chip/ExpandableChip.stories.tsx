import { Meta, Story } from "@storybook/react/types-6-0";

import { ExpandableChip, ExpandableChipProps } from "./ExpandableChip";

export default {
  title: "Components/Chips/Expandable Chip",
  component: ExpandableChip,
} as Meta<ExpandableChipProps>;

const Template: Story<ExpandableChipProps> = (props: ExpandableChipProps) => (
  <ExpandableChip {...props} />
);

export const Default = Template.bind({});
Default.args = {
  chiptype: "expandable",
  text: "Expandable Default",
};

export const Success = Template.bind({});
Success.args = {
  chiptype: "expandable",
  variant: "success",
  text: "Expandable Success",
};

export const Info = Template.bind({});
Info.args = {
  chiptype: "expandable",
  variant: "info",
  text: "Expandable Disabled Right to Left Info",
  disabled: true,
};

export const InfoWithIcon = Template.bind({});
InfoWithIcon.args = {
  chiptype: "expandable",
  variant: "info",
  text: "Expandable Disabled Right to Left Info",
  disabled: true,
  icon: "settings",
};

export const AlertWithTooltip = Template.bind({});
AlertWithTooltip.args = {
  variant: "alert",
  text: "Expandable Chip",
  disabled: true,
  tooltip: {
    label: "Expandable Disabled Alert Chip",
  },
};

export const Warning = Template.bind({});
Warning.args = {
  variant: "warning",
  text: "Expandable Chip",
};

export const TooltipTopLeft: Story<ExpandableChipProps> = (
  props: ExpandableChipProps
) => {
  return (
    <div
      style={{
        border: "solid black",
        height: "500px",
        padding: "3px",
      }}
    >
      <div
        style={{
          position: "relative",
          top: "200px",
          left: "200px",
          padding: "3px",
        }}
      >
        <ExpandableChip {...props} />
      </div>
    </div>
  );
};
TooltipTopLeft.args = {
  chiptype: "expandable",
  variant: "alert",
  text: "Expandable Chip",
  disabled: true,
  tooltip: {
    label: "Expandable Disabled Alert Chip",
    position: "top-left",
  },
};
