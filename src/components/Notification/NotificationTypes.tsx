import type { IconNamesType } from "utils";

import type { ButtonActionProps } from "./Actions/ButtonAction";
import type { ClosableActionProps } from "./Actions/ClosableAction";
import type { CounterActionProps } from "./Actions/CounterAction";

import type { INotificationTranslations } from "./Helpers";

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
	ariaLive?: React.AriaAttributes["aria-live"];
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
