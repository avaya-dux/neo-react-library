import clsx from "clsx";
import log from "loglevel";
import {
	type Dispatch,
	type MouseEventHandler,
	type SetStateAction,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import { Badge } from "components/Badge";
import { Tooltip } from "components/Tooltip";

import {
	ButtonAction,
	ClosableAction,
	type ClosableActionProps,
	CounterAction,
} from "./Actions";
import { defaultTranslations } from "./Helpers";
import type { NotificationProps } from "./NotificationTypes";

const logger = log.getLogger("notification-logger");
logger.disableAll();
export { logger as notificationLogger };

import "./notification_shim.css";
import { IconButton } from "components/IconButton";

/**
 * Notifications are used to communicate with users,
 * providing real time feedback on high level and
 * priority items requiring immediate attention.
 *
 * @example
<Notification type="success" description="Successful action completed" />
 *
<Notification
  type="success"
  header="Success"
  description="Successful action completed"
/>
 *
<Notification
  type="event"
  icon="info"
  description="For event Notifications, you should pass in your own icon"
/>
 *
<Notification
  type="event"
  icon="info"
  header="Alternate Options"
  description="You can override the default action with your own"
  actions: {
    closable: {
      onClick: () => alert("closed"),
      "aria-label": "Click this button will close this notification",
    },
    actionButtons: {
      buttons: [
        { children: "Edit", onClick: () => alert("Edit Clicked") },
        { children: "Alert", onClick: () => alert("Alert Clicked") },
      ],
    },
    counter: { count: "00:00" },
  },
/>
 *
<Notification
  type="info"
  header="Timer Notification"
  description="You can pass a 'count' action to display a timer, but you must increment the timer yourself"
  actions={ counter: { count: "00:00" } }
/>
 *
 * @see https://design.avayacloud.com/components/web/notifications-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-notification
 */
export const Notification = ({
	type,
	actions,
	header = "",
	description = "",
	showTimestamp = true,
	isElevated = false,
	isInline = false,
	occurences = 0,
	locale = "en-US",
	translations,
	...rest
}: NotificationProps) => {
	const icon = "icon" in rest ? rest.icon : null;
	const [closed, setClosed] = useState(false);
	const internalActions = createActions(
		actions,
		type,
		setClosed,
		translations?.closeAction,
	);

	const currentTime = Date.now();
	const timestamp = new Intl.DateTimeFormat(locale, {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	}).format(currentTime);

	const notificationRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
	const descriptionRef = useRef<HTMLDivElement>(null);

	const notificationTranslations = useMemo(() => {
		return {
			...defaultTranslations,
			...translations,
		};
	}, [translations]);

	const [width, setWidth] = useState("");

	const [isTruncated, setIsTruncated] = useState(true);
	const [needsTruncation, setNeedsTruncation] = useState(false);

	useEffect(() => {
		const headerSize = getTextSize(header, true);

		const descriptionSize = getTextSize(description, false);

		handleNotificationTextTruncation(
			notificationRef,
			descriptionRef,
			headerRef,
			descriptionSize,
			headerSize,
			setNeedsTruncation,
			setWidth,
		);

		if (typeof window !== "undefined") {
			window.addEventListener("resize", () =>
				handleNotificationTextTruncation(
					notificationRef,
					descriptionRef,
					headerRef,
					descriptionSize,
					headerSize,
					setNeedsTruncation,
					setWidth,
				),
			);
		}
		return () => {
			window.removeEventListener("resize", () =>
				handleNotificationTextTruncation(
					notificationRef,
					descriptionRef,
					headerRef,
					descriptionSize,
					headerSize,
					setNeedsTruncation,
					setWidth,
				),
			);
		};
	}, [header, description]);

	return closed ? null : (
		<div
			className={clsx(
				"neo-notification",
				`neo-notification--${type}`,
				isElevated && "neo-notification__elevated",
			)}
			role="alert"
			aria-live="polite"
		>
			<div
				role="img"
				className={clsx("neo-notification__icon", icon && `neo-icon-${icon}`)}
				aria-label={clsx(notificationTranslations.icon, icon && icon)}
			/>
			<div className="neo-notification__message" ref={notificationRef}>
				<div className="neo-notification__message__wrapper">
					{showTimestamp && (
						<p className="neo-notification__timestamp neo-body-small neo-semibold">
							{timestamp}
						</p>
					)}

					{occurences > 1 && (
						<Tooltip label={clsx(notificationTranslations.badge, occurences)}>
							<Badge
								data={occurences.toString()}
								aria-label={clsx(notificationTranslations.badge, occurences)}
							/>
						</Tooltip>
					)}
					{!isInline && needsTruncation && (
						<IconButton
							className={clsx(
								"neo-notification__button",
								!isTruncated && "neo-notification__button--pressed",
							)}
							variant="tertiary"
							icon="chevron-down"
							aria-label={notificationTranslations.textTruncation}
							onClick={() => setIsTruncated(!isTruncated)}
						/>
					)}
				</div>

				{header && (
					<div
						className={clsx(
							"neo-notification__title",
							isTruncated &&
								"neo-notification__text--truncated neo-notification__title--truncated",
						)}
						ref={headerRef}
						style={isTruncated ? { width } : {}}
					>
						{header}
					</div>
				)}
				{description && (
					<div
						className={clsx(
							"neo-notification__description",
							isTruncated &&
								"neo-notification__text--truncated neo-notification__description--truncated",
						)}
						style={isTruncated ? { width } : {}}
						ref={descriptionRef}
					>
						{description}
					</div>
				)}
				{!isInline && (
					<div className="neo-notification__actions--multiline">
						{internalActions.counterAction}
						{internalActions.buttonAction}
					</div>
				)}
			</div>
			<div className="neo-notification__actions">
				{isInline && internalActions.counterAction}
				{isInline && internalActions.buttonAction}
				{internalActions.closableAction}
			</div>
		</div>
	);
};

const createClickHandler = (
	setClosed: Dispatch<SetStateAction<boolean>>,
	callback?: MouseEventHandler<HTMLButtonElement>,
) => {
	return (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		event.preventDefault();
		setClosed(true);
		if (callback) {
			callback(event);
		}
	};
};
export function createActions(
	actions: NotificationProps["actions"],
	type: NotificationProps["type"],
	setClosed: Dispatch<SetStateAction<boolean>>,
	closeButtonLabel?: string,
) {
	let closableAction = null;
	let counterAction = null;
	let buttonAction = null;

	if (actions) {
		if (actions.closable) {
			const { onClick, ...rest } = actions.closable as ClosableActionProps;
			const handler = createClickHandler(setClosed, onClick);
			closableAction = (
				<ClosableAction
					onClick={handler}
					aria-label={closeButtonLabel}
					{...rest}
				/>
			);
		}

		if (actions.counter) {
			const countToPass = actions.counter.count;

			counterAction = <CounterAction count={countToPass} />;
		}

		if (actions.actionButtons) {
			const buttonsToPass = actions.actionButtons.buttons;

			buttonAction = <ButtonAction buttons={buttonsToPass} type={type} />;
		}
	}

	return { counterAction, buttonAction, closableAction };
}

function getTextSize(text: string, isHeader: boolean) {
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");

	let textWidth = 0;

	if (context) {
		context.font = `${isHeader ? "600" : "400"} 14px sans-serif`;
		textWidth = context.measureText(text).width;
	}

	return textWidth;
}

function handleNotificationTextTruncation(
	notificationRef: React.RefObject<HTMLDivElement>,
	descriptionRef: React.RefObject<HTMLDivElement>,
	headerRef: React.RefObject<HTMLDivElement>,
	descriptionSize: number,
	headerSize: number,
	setNeedsTruncation: Dispatch<SetStateAction<boolean>>,
	setWidth: Dispatch<SetStateAction<string>>,
) {
	let headerOffsetWidth = 0;
	let descriptionOffsetWidth = 0;

	let leftoverHeaderText = 0;
	let leftoverDescriptionText = 0;

	if (descriptionRef?.current) {
		descriptionOffsetWidth = descriptionRef.current.offsetWidth;

		leftoverDescriptionText = descriptionSize - descriptionOffsetWidth;
	}

	if (headerRef?.current) {
		headerOffsetWidth = headerRef.current.offsetWidth;

		leftoverHeaderText = headerSize - headerOffsetWidth;
	}

	if (
		leftoverHeaderText > headerOffsetWidth ||
		leftoverDescriptionText > descriptionOffsetWidth
	) {
		setNeedsTruncation(true);
	} else {
		setNeedsTruncation(false);
	}

	if (notificationRef.current) {
		setWidth(`${notificationRef.current.offsetWidth.toString()}px`);
	}
}

Notification.displayName = "Notification";
