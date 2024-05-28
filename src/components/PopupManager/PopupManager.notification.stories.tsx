import type { Meta, Story } from "@storybook/react";
import { useEffect, useRef, useState } from "react";

import {
	type EventNotificationProps,
	notificationLogger as logger,
	Notification,
} from "components/Notification";
import {
	type PopupId,
	PopupManager,
	type PopupPosition,
} from "components/PopupManager";

logger.disableAll();
type WithoutType = Omit<EventNotificationProps, "type">;
const EventTemplate: Story<WithoutType> = ({ ...rest }: WithoutType) => {
	const props = { type: "event", ...rest } as EventNotificationProps;
	return <Notification {...props} />;
};

export const PopCounterEvent = () => {
	const managerRef = useRef<PopupManager | null>(null);

	const notificationRef = useRef(
		<Notification
			type="event"
			icon="copy"
			header="Event"
			description="This is an event."
			actions={{ counter: { count: "00:00" } }}
		/>,
	);
	const popupRef = useRef<
		{ id: PopupId; position: PopupPosition } | undefined
	>();
	const [open, setOpen] = useState(false);
	useEffect(() => {
		logger.debug("open is ", open, "popup is ", popupRef.current);
		if (open) {
			if (managerRef.current) {
				popupRef.current = managerRef.current.notify({
					id: "event-counter",
					node: notificationRef.current,
					position: "bottom",
					width: "30%",
				});
				logger.debug(
					"after notify call: open is ",
					open,
					"popup is ",
					popupRef.current,
				);
			}
		} else {
			if (popupRef.current && managerRef.current) {
				managerRef.current.remove(
					popupRef.current.id,
					popupRef.current.position,
				);
			}
		}
	}, [open]);

	useEffect(() => {
		return () => {
			logger.debug("PopCounterEvent cleaning up ...");
			removeAll();
		};
	}, []);

	const removeAll = () => {
		logger.debug("PopCounterEvent removeAll ...");
		if (managerRef.current) {
			logger.debug("remove all...");
			managerRef.current.removeAll();
		}
	};

	const setZIndex = () => {
		if (managerRef.current) {
			managerRef.current.setZIndex(2000);
			alert("zindex changed");
		}
	};

	return (
		<>
			<PopupManager ref={managerRef} />
			<div>
				<button onClick={() => setOpen((prev) => !prev)}>Toggle</button>
			</div>
			<div>
				<button onClick={removeAll}>Remove All</button>
			</div>
			<div>
				<button onClick={setZIndex}>Change Z Index</button>
			</div>
		</>
	);
};

export const PopClosableEvent = () => {
	const managerRef = useRef<PopupManager | null>(null);
	const notificationRef = useRef(
		<Notification
			type="event"
			icon="copy"
			header="Placeholder text for the main header. By default the header text will be two lines of copy before it is truncated. Placeholder text for the main header. By default the header text will be two lines of copy before it is truncated."
			description="Body copy placeholder, single line of text before it is truncated. Body copy placeholder, single line of text before it is truncated. Body copy placeholder, single line of text before it is truncated."
			actions={{
				closable: {
					onClick: () => alert("closed"),
					"aria-label": "Click this button will close this notification",
				},
			}}
		/>,
	);
	const popupRef = useRef<
		{ id: PopupId; position: PopupPosition } | undefined
	>();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		logger.debug("open is ", open, "popup is ", popupRef.current);
		if (open) {
			if (managerRef.current) {
				popupRef.current = managerRef.current.notify({
					node: notificationRef.current,
					position: "bottom",
				});
				logger.debug(
					"after notify call: open is ",
					open,
					"popup is ",
					popupRef.current,
				);
			}
		} else {
			if (popupRef.current && managerRef.current) {
				managerRef.current.remove(
					popupRef.current.id,
					popupRef.current.position,
				);
			}
		}
	}, [open]);

	useEffect(() => {
		const current = managerRef.current;
		return () => {
			logger.debug("PopClosableEvent cleaning up ...");
			if (current) {
				logger.debug("remove all...");
				current.removeAll();
			}
		};
	}, [managerRef]);

	return (
		<>
			<PopupManager ref={managerRef} />
			<div>
				<button onClick={() => setOpen((prev) => !prev)}>Toggle</button>
			</div>
		</>
	);
};
export default {
	title: "Components/PopupManager/Notification",
	component: EventTemplate,
} as Meta<WithoutType>;
