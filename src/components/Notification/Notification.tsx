import clsx from "clsx";
import log from "loglevel";
import { Dispatch, isValidElement, MouseEventHandler, SetStateAction, useState } from "react";

import { ButtonAction, ClosableAction, ClosableActionProps, CounterAction } from "./Actions";
import { NotificationProps } from "./NotificationTypes";

const logger = log.getLogger("notification-logger");
logger.disableAll();
export { logger as notificationLogger };

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
      { children: "Alert", onClick: () => alert("Alert Clicked") },
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
  action,
  header,
  description,
  isElevated = false,
  ...rest
}: NotificationProps) => {
  const icon = "icon" in rest ? rest.icon : null;
  const [closed, setClosed] = useState(false);
  const internalAction = createAction(action, type, setClosed);
  return closed ? null : (
    <div
      className={clsx(
        "neo-notification",
        `neo-notification--${type}`,
        isElevated && "neo-notification__elevated"
      )}
      role="alert"
      aria-live="polite"
    >
      <div
        role="img"
        className={clsx("neo-notification__icon", icon && `neo-icon-${icon}`)}
        aria-label={`icon ${icon}`}
      />
      <div className="neo-notification__message">
        {header && <div className="neo-notification__title">{header}</div>}
        {description && (
          <div className="neo-notification__description">{description}</div>
        )}
      </div>
      {internalAction}
    </div>
  );
};

const createClickHandler = (
  setClosed: Dispatch<SetStateAction<boolean>>,
  callback?: MouseEventHandler<HTMLButtonElement>
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
export function createAction(
  action: NotificationProps["action"],
  type: NotificationProps["type"],
  setClosed: Dispatch<SetStateAction<boolean>>
) {
  let internalAction = null;
  if (isValidElement(action)) {
    internalAction = action;
  } else if (
    !(action && typeof action === "object" && action.constructor === Object)
  ) {
    const handler = createClickHandler(setClosed);
    internalAction = <ClosableAction onClick={handler} />;
  } else if ("count" in action) {
    internalAction = <CounterAction count={action.count} />;
  } else if ("buttons" in action) {
    internalAction = <ButtonAction buttons={action.buttons} type={type} />;
  } else {
    const { onClick, ...rest } = action as ClosableActionProps;
    const handler = createClickHandler(setClosed, onClick);
    internalAction = <ClosableAction onClick={handler} {...rest} />;
  }
  return internalAction;
}

Notification.displayName = "Notification";
