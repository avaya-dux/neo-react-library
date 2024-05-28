import type { Meta, Story } from "@storybook/react";
import ReactStopwatch from "react-stopwatch";

import { IconNames } from "utils";

import {
	type EventNotificationProps,
	Notification,
	notificationLogger as logger,
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
	isInline: true,
	actions: {
		closable: {
			onClick: () => alert("closed"),
			"aria-label": "Click this button will close this notification",
		},
	},
};

export const EventCloseAlert = EventTemplate.bind({});
EventCloseAlert.args = {
	icon: "copy",
	header: "Event",
	description: "This is an event.",
	isElevated: true,
	actions: {
		closable: {
			onClick: () => alert("closed"),
			"aria-label": "Click this button will close this notification",
		},
	},
};

export const EventCounter = EventTemplate.bind({});
EventCounter.args = {
	icon: "copy",
	header: "Event",
	description: "This is an event.",
	isElevated: true,
	actions: { counter: { count: "00:00" } },
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
			// biome-ignore lint/suspicious/noExplicitAny: we require maximum flexibility here
			render={({ formatted }: { [key: string]: any }) => {
				return (
					<Notification
						type="event"
						icon="copy"
						header="Event"
						description="This is an event."
						actions={{ counter: { count: `${formatted.substring(3)}` } }}
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
	actions: {
		actionButtons: {
			buttons: [
				{ children: "Edit", onClick: () => alert("Edit Clicked") },
				{ children: "Alert", onClick: () => alert("Alert Clicked") },
			],
		},
	},
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
