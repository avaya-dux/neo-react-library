import { IconNamesType } from "utils";

import { ButtonActionProps } from "./Actions/ButtonAction";
import { ClosableActionProps } from "./Actions/ClosableAction";
import { CounterActionProps } from "./Actions/CounterAction";

import { INotificationTranslations } from "./Helpers";

type ActionType = {
  actions?: {
    counter?: CounterActionProps;
    actionButtons?: ButtonActionProps;
    closable?: ClosableActionProps;
  };
};

type AtLeastOneProps =
  | { header: string; description?: string }
  | { header?: string; description: string };

type CommonProps = {
  showTimestamp?: boolean;
  isElevated?: boolean;
  isInline?: boolean;
  occurences?: number;
  locale?: string;
  translations?: INotificationTranslations;
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
