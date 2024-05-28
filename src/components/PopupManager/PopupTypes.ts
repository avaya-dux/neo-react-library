import type { ReactElement } from "react";

import type { NotificationProps } from "components/Notification";
import type { IconNamesType } from "utils";

export type PopupPosition =
	| "top"
	| "top-right"
	| "top-left"
	| "bottom"
	| "bottom-right"
	| "bottom-left";

export type PopupId = string | number;

export interface PopupOptions {
	id?: PopupId;
	position?: PopupPosition;
}
export interface ToastOptions extends PopupOptions {
	duration?: number;
	message: string;
	icon?: IconNamesType;
	"aria-label"?: string;
}

export interface NotificationOptions extends PopupOptions {
	node: ReactElement<NotificationProps>;
	width?: string;
}
export type PopupState = {
	zIndex: number;
	positions: { [K in PopupPosition]: PopupOptions[] };
};
