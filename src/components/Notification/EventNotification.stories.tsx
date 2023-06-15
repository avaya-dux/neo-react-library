import { Meta, Story } from "@storybook/react";
import ReactStopwatch from "react-stopwatch";

import { IconNames } from "utils";

import {
  EventNotificationProps,
  notificationLogger as logger,
  Notification,
} from ".";

type WithoutType = Omit<EventNotificationProps, "type">;
const EventTemplate: Story<WithoutType> = ({ ...rest }: WithoutType) => {
  const props = { type: "event", ...rest } as EventNotificationProps;
  return <Notification {...props} />;
};

export const Event = EventTemplate.bind({});
Event.args = {
  icon: "copy",
  header: "Event",
  description: "This is an event.",
  isElevated: true,
};

export const EventCloseAlert = EventTemplate.bind({});
EventCloseAlert.args = {
  icon: "copy",
  header: "Event",
  description: "This is an event.",
  isElevated: true,
  action: { onClick: () => alert("closed") },
};
export const EventCounter = EventTemplate.bind({});
EventCounter.args = {
  icon: "copy",
  header: "Event",
  description: "This is an event.",
  isElevated: true,
  action: { count: "00:00" },
};

export const EventCounterUp = () => {
  return (
    <ReactStopwatch
      seconds={0}
      minutes={0}
      hours={0}
      limit="05:00"
      onCallback={() => logger.debug("Finish")}
      withLoop={true}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render={({ formatted }: { [key: string]: any }) => {
        return (
          <Notification
            type="event"
            icon="copy"
            header="Event"
            description="This is an event."
            action={{ count: `${formatted.substring(3)}` }}
          />
        );
      }}
    />
  );
};

export const EventButtons = EventTemplate.bind({});
EventButtons.args = {
  icon: "copy",
  header: "Event",
  description: "This is an event.",
  isElevated: true,
  action: {
    buttons: [
      { children: "Edit", onClick: () => alert("Edit Clicked") },
      { children: "Alert", onClick: () => alert("Alert Clicked") },
    ],
  },
};

const EventCustomAction = EventTemplate.bind({});
EventCustomAction.args = {
  icon: "copy",
  header: "Event",
  description: "This is an event.",
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

export default {
  title: "Components/Notification",
  component: EventTemplate,
  argTypes: {
    icon: {
      options: IconNames,
      control: { type: "select" },
    },
  },
} as Meta<WithoutType>;
