import { Meta, StoryObj } from "@storybook/react";

import { Notification } from "./";

const meta: Meta<typeof Notification> = {
  title: "Components/Notification",
  component: Notification,
  argTypes: {
    type: {
      control: "select",
      options: ["success", "warning", "alert", "info"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Notification>;

export const Info: Story = {
  args: {
    type: "info",
    header: "Info",
    description: "This is some info.",
    isElevated: false,
    isInline: true,
  },
};

export const Success: Story = {
  args: {
    type: "success",
    header: "Success",
    description: "You are successful.",
    isElevated: true,
    isInline: true,
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    header: "Warning",
    description: "This is a warning.",
    isElevated: true,
    isInline: true,
  },
};

export const Alert: Story = {
  args: {
    type: "alert",
    header: "Alert",
    description: "This is an alert.",
    isElevated: false,
    isInline: true,
  },
};

export const AlertCloseAlert: Story = {
  args: {
    type: "alert",
    header: "Alert",
    description: "This is an alert.",
    isInline: true,
    actions: {
      closable: {
        onClick: () => alert("closed"),
        "aria-label": "Click this button will close this notification",
      },
    },
  },
};

export const AlertCounter: Story = {
  args: {
    type: "alert",
    header:
      "Placeholder text for the main header. By default the header text will be two lines of copy before it is truncated. Placeholder text for the main header. By default the header text will be two lines of copy before it is truncated.",
    description:
      "Body copy placeholder, single line of text before it is truncated. Body copy placeholder, single line of text before it is truncated. Body copy placeholder, single line of text before it is truncated.",
    isElevated: false,
    occurences: 4,
    actions: {
      closable: {
        onClick: () => alert("closed"),
        "aria-label": "Click this button will close this notification",
      },
      actionButtons: {
        buttons: [
          { children: "Edit", onClick: () => alert("Edit Clicked") },
          { children: "Alert", onClick: () => alert("Alert Clicked") },
        ],
      },
      counter: { count: "00:00" },
    },
  },
};

export const AlertButtonsCounter: Story = {
  args: {
    type: "alert",
    header: "Alert",
    description: "This is an alert.",
    isElevated: false,
    actions: {
      actionButtons: {
        buttons: [
          { children: "Edit", onClick: () => alert("Edit Clicked") },
          { children: "Alert", onClick: () => alert("Alert Clicked") },
        ],
      },
      counter: { count: "00:00" },
    },
  },
};

export const AlertButtonsCounterClosable: Story = {
  args: {
    type: "alert",
    header: "Alert",
    description: "This is an alert.",
    isElevated: false,
    actions: {
      closable: {
        onClick: () => alert("closed"),
        "aria-label": "Click this button will close this notification",
      },
      actionButtons: {
        buttons: [
          { children: "Edit", onClick: () => alert("Edit Clicked") },
          { children: "Alert", onClick: () => alert("Alert Clicked") },
        ],
      },
      counter: { count: "00:00" },
    },
  },
};
