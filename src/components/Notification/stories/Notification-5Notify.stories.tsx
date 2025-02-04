import type { Meta } from "@storybook/react";
import { useEffect } from "react";

import { Button } from "components/Button";

import { removePopupManagerContainer, usePopup } from "components/PopupManager";
import { type NonEventNotificationProps, Notification } from "../..";

export default {
	title: "Components/Notification/Notify",
} as Meta<NonEventNotificationProps>;

export const Notify = () => {
	const { mounted, notify } = usePopup("notify-me");

	useEffect(() => {
		return () => {
			removePopupManagerContainer();
		};
	}, []);

	return !mounted ? (
		<div>not ready</div>
	) : (
		<div>
			<Button
				data-testid="neo-button-notify"
				id="btn-notify"
				variant="primary"
				onClick={() => {
					notify({
						node: (
							<Notification
								type="alert"
								header="Alert"
								description="This is an alert."
							/>
						),
						width: "375px",
					});
				}}
			>
				Notify Me
			</Button>
		</div>
	);
};

// notify = (options: NotificationOptions) => {
//     logger.debug("notify in popup manager called with ", options.id);
//     PopupManager.counter += 1;
//     const id = options.id ?? PopupManager.counter;
//     const position = options.position ?? "top";
//     const notification = {
//         id,
//         node: options.node,
//         position,
//         width: options.width,
//     };
//     logger.debug(
//         `notify: state before update at ${position} is `,
//         this.state.positions[position],
//     );
//     this.addPopup(position, notification);
//     logger.debug("notify returns ", { id, position });
//     return { id, position };
// };
