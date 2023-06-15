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
  },
};

export const Success: Story = {
  args: {
    type: "success",
    header: "Success",
    description: "You are successful.",
    isElevated: true,
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    header: "Warning",
    description: "This is a warning.",
    isElevated: true,
  },
};

export const Alert: Story = {
  args: {
    type: "alert",
    header: "Alert",
    description: "This is an alert.",
    isElevated: false,
  },
};

export const AlertCloseAlert: Story = {
  args: {
    type: "alert",
    header: "Alert",
    description: "This is an alert.",
    action: {
      onClick: () => alert("closed"),
      "aria-label": "Click this button will close this notification",
    },
  },
};

export const AlertCounter: Story = {
  args: {
    type: "alert",
    header: "Alert",
    description: "This is an alert.",
    isElevated: false,
    action: { count: "00:00" },
  },
};

export const AlertButtons: Story = {
  args: {
    type: "alert",
    header: "Alert",
    description: "This is an alert.",
    isElevated: false,
    action: {
      buttons: [
        { children: "Edit", onClick: () => alert("Edit Clicked") },
        { children: "Alert", onClick: () => alert("Alert Clicked") },
      ],
    },
  },
};

export const AlertCustomAction: Story = {
  args: {
    type: "alert",
    header: "Alert",
    description: "This is an alert.",
    isElevated: true,
    action: (
      <div>
        <h4>List</h4>
        <ul>
          <li>one</li>
          <li>two</li>
        </ul>
      </div>
    ),
  },
};
