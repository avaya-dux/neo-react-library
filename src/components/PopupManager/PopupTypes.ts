import { NotificationProps } from "components/Notification";
import { ReactElement } from "react";
import { IconNamesType } from "utils";

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
}
export type PopupState = {
  zIndex: number;
  // eslint-disable-next-line no-unused-vars
  positions: { [K in PopupPosition]: PopupOptions[] };
};
