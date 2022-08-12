import { Meta, Story } from "@storybook/react/types-6-0";

import { AvatarChip, AvatarChipProps } from ".";

import { SmallAvatarProps, Avatar } from "../Avatar";

export default {
  title: "Components/Chips/Avatar Chip",
  component: AvatarChip,
} as Meta<AvatarChipProps>;

const Template: Story<AvatarChipProps> = (props: AvatarChipProps) => (
  <AvatarChip {...props} />
);

const smallAvatarProps: SmallAvatarProps = {
  label: "Jimmy Bob",
  size: "sm",
};
const smallAvatar = <Avatar {...smallAvatarProps} />;

export const Default = Template.bind({});
Default.args = {
  chiptype: "avatar",
  text: "Avatar Default",
  smallAvatar,
};

export const Success = Template.bind({});
Success.args = {
  chiptype: "avatar",
  variant: "success",
  text: "Avatar Success",
  smallAvatar,
};

export const Info = Template.bind({});
Info.args = {
  chiptype: "avatar",
  variant: "info",
  text: "Avatar Disabled Info",
  disabled: true,
  smallAvatar,
};

export const AlertWithTooltip = Template.bind({});
AlertWithTooltip.args = {
  chiptype: "avatar",
  variant: "alert",
  text: "Avatar Chip",
  disabled: true,
  tooltip: {
    label: "Avatar Disabled Alert Chip",
  },
  smallAvatar,
};

export const Warning = Template.bind({});
Warning.args = {
  chiptype: "avatar",
  variant: "warning",
  text: "Avatar Chip",
  smallAvatar,
};

export const TooltipTopLeft: Story<AvatarChipProps> = (
  props: AvatarChipProps
) => {
  return (
    <div
      style={{
        border: "solid black",
        height: "500px",
        width: "100%",
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
        <AvatarChip {...props} />
      </div>
    </div>
  );
};
TooltipTopLeft.args = {
  chiptype: "avatar",
  variant: "alert",
  text: "Avatar Chip",
  disabled: true,
  tooltip: {
    label: "Avatar Disabled Alert Chip",
    position: "top-left",
  },
  smallAvatar,
};
