import { Meta, Story } from "@storybook/react/types-6-0";

import { BasicChip, BasicChipProps } from "./";

export default {
  title: "Components/Chips/Basic Chip",
  component: BasicChip,
} as Meta<BasicChipProps>;

const Template: Story<BasicChipProps> = (props: BasicChipProps) => (
  <BasicChip {...props} />
);

export const Default = Template.bind({});
Default.args = {
  chiptype: "basic",
  text: "Basic Default",
};

export const Success = Template.bind({});
Success.args = {
  chiptype: "basic",
  variant: "success",
  text: "Basic Success",
};

export const Info = Template.bind({});
Info.args = {
  chiptype: "basic",
  variant: "info",
  text: "Basic Disabled Right to Left Info",
  disabled: true,
  dir: "rtl",
};

export const AlertWithTooltip = Template.bind({});
AlertWithTooltip.args = {
  chiptype: "basic",
  variant: "alert",
  text: "Basic Chip",
  disabled: true,
  tooltip: {
    label: "Basic Disabled Alert Chip",
  },
};

export const Warning = Template.bind({});
Warning.args = {
  chiptype: "basic",
  variant: "warning",
  text: "Basic Chip",
};

export const TooltipTopLeft: Story<BasicChipProps> = (
  props: BasicChipProps
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
        <BasicChip {...props} />
      </div>
    </div>
  );
};
TooltipTopLeft.args = {
  chiptype: "basic",
  variant: "alert",
  text: "Basic Chip",
  disabled: true,
  tooltip: {
    label: "Basic Disabled Alert Chip",
    position: "top-left",
  },
};
