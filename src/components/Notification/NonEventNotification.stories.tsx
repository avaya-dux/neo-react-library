import { Meta, Story } from "@storybook/react/types-6-0";

import { NonEventNotificationProps, Notification } from "./";

const NonEventTemplate: Story<NonEventNotificationProps> = (props) => (
  <Notification {...props} />
);

export default {
  title: "Components/Notification",
  component: NonEventTemplate,
  argTypes: {
    type: {
      control: "select",
      options: ["success", "warning", "alert", "info"],
    },
  },
} as Meta<NonEventNotificationProps>;

export const Info = NonEventTemplate.bind({});
Info.args = {
  type: "info",
  header: "Info",
  description: "This is some info.",
  isElevated: false,
};

export const Success = NonEventTemplate.bind({});
Success.args = {
  type: "success",
  header: "Success",
  description: "You are successful.",
  isElevated: true,
};

export const Warning = NonEventTemplate.bind({});
Warning.args = {
  type: "warning",
  header: "Warning",
  description: "This is a warning.",
  isElevated: true,
};

export const Alert = NonEventTemplate.bind({});
Alert.args = {
  type: "alert",
  header: "Alert",
  description: "This is an alert.",
  isElevated: false,
};

export const AlertCloseAlert = NonEventTemplate.bind({});
AlertCloseAlert.args = {
  type: "alert",
  header: "Alert",
  description: "This is an alert.",
  action: {
    onClick: () => alert("closed"),
    "aria-label": "Click this button will close this notification",
  },
};

export const AlertCounter = NonEventTemplate.bind({});
AlertCounter.args = {
  type: "alert",
  header: "Alert",
  description: "This is an alert.",
  isElevated: false,
  action: { count: "00:00" },
};

export const AlertButtons = NonEventTemplate.bind({});
AlertButtons.args = {
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
};

const AlertCustomAction = NonEventTemplate.bind({});
AlertCustomAction.args = {
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
};
