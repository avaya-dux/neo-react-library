import type { Meta, Story } from "@storybook/react";
import { useEffect, useRef } from "react";

import { Toast } from "components/Toast";
import { IconNames } from "utils";

import { PopupManager, type ToastOptions } from ".";
import { removePopupManagerContainer } from "./";
import { popupManagerLogger as logger } from "./PopupManager";

const PopupManagerToastTemplate: Story<ToastOptions> = (
	props: ToastOptions,
) => {
	const managerRef = useRef<PopupManager | null>(null);

	useEffect(() => {
		const current = managerRef.current;
		if (current) {
			current.toast(props);
		}
		return () => {
			logger.debug(props.id, "cleaning up ...");
			if (current) {
				logger.debug("remove all...");
				current.removeAll();
			}
		};
	}, [managerRef, props]);
	return <PopupManager ref={managerRef} />;
};

export default {
	title: "Components/PopupManager/Toast",
	component: PopupManagerToastTemplate,
	argTypes: {
		icon: {
			options: IconNames,
			control: { type: "select" },
		},
	},
} as Meta<ToastOptions>;

export const ToastMessageOnly = PopupManagerToastTemplate.bind({});
ToastMessageOnly.args = {
	message: "This is a toast: 5 seconds long, no icon",
	id: "toastWithoutIcon",
	position: "bottom-right",
	duration: 5000,
};

export const ToastWithIcon = PopupManagerToastTemplate.bind({});
ToastWithIcon.args = {
	message: "This is a toast: 5 seconds long, with an icon.",
	icon: "error",
	id: "toastWithIcon",
};

export const DefaultToast = () => {
	useEffect(() => {
		return () => {
			removePopupManagerContainer();
		};
	}, []);

	return (
		<Toast>Default Toast: positioned at top and center for 5 seconds</Toast>
	);
};

export const ToastsPositioning = () => {
	const managerRef = useRef<PopupManager | null>(null);
	useEffect(() => {
		const current = managerRef.current;
		return () => {
			logger.debug("ToastsPositioning cleaning up ...");
			if (current) {
				logger.debug("remove all...");
				current.removeAll();
			}
		};
	}, []);

	const duration = 5000;
	return (
		<>
			<PopupManager ref={managerRef} />
			<div
				style={{
					display: "flex",
					height: "calc(100vh - 100px)",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 33%)" }}>
					<button
						type="button"
						onClick={() =>
							managerRef.current?.toast({
								message: "Top-left Toast",
								duration,
								position: "top-left",
							})
						}
					>
						Open a Top Left Toast
					</button>
					<button
						type="button"
						onClick={() =>
							managerRef.current?.toast({
								message: "Top Toast",
								duration,
								position: "top",
								icon: "align-top",
							})
						}
					>
						Open a Top Center Toast
					</button>
					<button
						type="button"
						onClick={() =>
							managerRef.current?.toast({
								message: "Top-right Toast",
								duration,
								position: "top-right",
							})
						}
					>
						Open a Top Right Toast
					</button>
					<button
						type="button"
						onClick={() =>
							managerRef.current?.toast({
								message: "Bottom-left Toast",
								duration,
								position: "bottom-left",
							})
						}
					>
						Open a Bottom Left Toast
					</button>
					<button
						type="button"
						onClick={() =>
							managerRef.current?.toast({
								message: "Bottom Toast",
								duration,
								position: "bottom",
								icon: "align-bottom",
							})
						}
					>
						Open a Bottom Center Toast
					</button>
					<button
						type="button"
						onClick={() =>
							managerRef.current?.toast({
								message: "Bottom-right Toast",
								duration,
								position: "bottom-right",
							})
						}
					>
						Open a Bottom Right Toast
					</button>
				</div>
			</div>
		</>
	);
};
