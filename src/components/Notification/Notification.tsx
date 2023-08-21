import clsx from "clsx";
import log from "loglevel";
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { Badge } from "components/Badge";

import {
  ButtonAction,
  ClosableAction,
  ClosableActionProps,
  CounterAction,
} from "./Actions";
import { NotificationProps } from "./NotificationTypes";

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
  action={{
    buttons: [
      { children: "Edit", onClick: () => alert("Edit Clicked") },
    ],
  }}
/>
 *
<Notification
  type="info"
  header="Timer Notification"
  description="You can pass a 'count' action to display a timer, but you must increment the timer yourself"
  action={{ count: "12:34:56" }}
/>
 *
 * @see https://design.avayacloud.com/components/web/notifications-web
 * @see https://neo-react-library-storybook.netlify.app/?path=/story/components-notification
 */
export const Notification = ({
  type,
  actions,
  header,
  description,
  isElevated = false,
  isInline = true,
  occurences = 0,
  locale = navigator?.languages[0] ?? "en-US",
  ...rest
}: NotificationProps) => {
  const icon = "icon" in rest ? rest.icon : null;
  const [closed, setClosed] = useState(false);
  const internalActions = createActions(actions, type, setClosed);

  const currentTime = Date.now();
  const timestamp = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(currentTime);

  const notificationRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState("");

  useEffect(() => {
    if (notificationRef.current)
      setWidth(`${notificationRef.current.offsetWidth.toString()}px`);
  }, [notificationRef]);

  const [isTruncated, setIsTruncated] = useState(true);

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
        aria-label={clsx("icon", icon && icon)}
      />
      <div className="neo-notification__message" ref={notificationRef}>
        <div className="neo-notification__message__wrapper">
          <p className="neo-notification__timestamp neo-body-small neo-semibold">
            {timestamp}
          </p>

          {occurences > 1 && (
            <Badge
              data={occurences.toString()}
              aria-label={`Badge representing ${occurences}`}
            />
          )}
          {!isInline && (
            <IconButton
              className={clsx(
                "neo-notification__button",
                !isTruncated && "neo-notification__button--pressed",
              )}
              variant="tertiary"
              icon="chevron-down"
              aria-label="expand/collapse"
              onClick={() => setIsTruncated(!isTruncated)}
            ></IconButton>
          )}
        </div>

        {header && (
          <div
            className={clsx(
              "neo-notification__title",
              isTruncated &&
                "neo-notification__text--truncated neo-notification__title--truncated",
            )}
            ref={titleRef}
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
) {
  let closableAction = null;
  let counterAction = null;
  let buttonAction = null;

  if (actions) {
    if (actions.closable) {
      const { onClick, ...rest } = actions.closable as ClosableActionProps;
      const handler = createClickHandler(setClosed, onClick);
      closableAction = <ClosableAction onClick={handler} {...rest} />;
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

Notification.displayName = "Notification";
