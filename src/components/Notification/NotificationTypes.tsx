import { ReactElement } from "react";

import { IconNamesType } from "utils";

import { ButtonActionProps } from "./Actions/ButtonAction";
import { ClosableActionProps } from "./Actions/ClosableAction";
import { CounterActionProps } from "./Actions/CounterAction";

type ActionType = {
  action?:
    | ClosableActionProps
    | CounterActionProps
    | ButtonActionProps
    | ReactElement;
};
type AtLeastOneProps =
  | { header: string; description?: string }
  | { header?: string; description: string };

type CommonProps = {
  isElevated?: boolean;
} & AtLeastOneProps &
  ActionType;

export type NonEventNotificationProps = CommonProps & {
  type: "success" | "warning" | "alert" | "info";
};

export type EventNotificationProps = CommonProps & {
  type: "event";
  icon: IconNamesType;
};

export type NotificationProps =
  | NonEventNotificationProps
  | EventNotificationProps;
