import type { Meta } from "@storybook/react";
import { useEffect } from "react";

import { Button } from "components/Button";

import { removePopupManagerContainer, usePopup } from "components/PopupManager";
import { type NonEventNotificationProps, Notification } from "../..";

export default {
	title: "Components/Notification/Notify",
} as Meta<NonEventNotificationProps>;

export const Notify = () => {
	const { mounted, notify, remove } = usePopup("notify-me");

	useEffect(() => {
		return () => {
			removePopupManagerContainer();
		};
	}, []);

	function renderNotification() {
		const { id, position } = notify({
			node: (
				<Notification
					actions={{
						closable: {
							onClick: () => remove(id, position),
							"aria-label": "Click this button will close this notification",
						},
					}}
					type="alert"
					header="Alert"
					description="This is an alert."
					ariaLive="assertive"
				/>
			),
			width: "375px",
		});
	}

	return !mounted ? (
		<div>not ready</div>
	) : (
		<div>
			<Button
				data-testid="neo-button-notify"
				id="btn-notify"
				variant="primary"
				onClick={() => {
					renderNotification();
				}}
			>
				Notify Me
			</Button>
		</div>
	);
};
