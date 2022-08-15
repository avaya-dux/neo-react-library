import { ComponentStory } from "@storybook/react";
import { Meta } from "@storybook/react/types-6-0";

import { IconButton, IconButtonProps } from "./IconButton";

export default {
  title: "Components/IconButton",
  component: IconButton,
  argTypes: {
    type: {
      control: { type: "select", options: ["button", "submit", "reset"] },
    },
  },
} as Meta<IconButtonProps>;

const Template: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
);

export const AriaLabel = Template.bind({});
AriaLabel.args = {
  shape: "square",
  icon: "settings",
  "aria-label": "test aria label prop",
};
export const AriaLabelWide = Template.bind({});
AriaLabelWide.args = {
  icon: "settings",
  "aria-label": "test aria label prop",
  size: "wide",
  shape: "square",
};

export const ShapeSquareAnimationSpinner = Template.bind({});
ShapeSquareAnimationSpinner.args = {
  shape: "square",
  icon: "settings",
  animation: "pulse",
  "aria-label": "test aria label prop",
};

export const IconInfoAnimationSpinner = Template.bind({});
IconInfoAnimationSpinner.args = {
  icon: "info",
  animation: "spinner",
  shape: "square",
};

export const ContactIcon = Template.bind({});
ContactIcon.args = {
  type: "button",
  icon: "contact",
  shape: "circle",
};

export const ShapeSquare = Template.bind({});
ShapeSquare.args = {
  shape: "square",
  icon: "settings",
  animation: "spinner",
  "aria-label": "Testing shape square",
};

export const ShapeCircle = Template.bind({});
ShapeCircle.args = {
  shape: "circle",
  icon: "error",
  animation: "pulse",
  "aria-label": "Testing shape circle",
};
