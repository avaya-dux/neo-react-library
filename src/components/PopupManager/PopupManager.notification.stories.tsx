import { Meta, Story } from "@storybook/react/types-6-0";
import { PopupId, PopupManager, PopupPosition } from "components/PopupManager";
import { useEffect, useRef, useState } from "react";
import {
  EventNotificationProps,
  Notification,
  notificationLogger as logger,
} from "components/Notification";
logger.disableAll();
type WithoutType = Omit<EventNotificationProps, "type">;
const EventTemplate: Story<WithoutType> = ({ ...rest }: WithoutType) => {
  const props = { type: "event", ...rest } as EventNotificationProps;
  return <Notification {...props} />;
};

export const PopCounterEvent = () => {
  const managerRef = useRef<PopupManager | null>(null);

  const notificationRef = useRef(
    <Notification
      type="event"
      icon="copy"
      header="Event"
      description="This is an event."
      action={{ count: "00:00" }}
    />
  );
  const popupRef = useRef<
    { id: PopupId; position: PopupPosition } | undefined
  >();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    logger.debug("open is ", open, "popup is ", popupRef.current);
    if (open) {
      if (managerRef.current) {
        popupRef.current = managerRef.current.notify({
          id: "event-counter",
          node: notificationRef.current,
          position: "bottom",
        });
        logger.debug(
          "after notify call: open is ",
          open,
          "popup is ",
          popupRef.current
        );
      }
    } else {
      if (popupRef.current && managerRef.current) {
        managerRef.current.remove(
          popupRef.current.id,
          popupRef.current.position
        );
      }
    }
  }, [open]);

  useEffect(() => {
    return () => {
      logger.debug("PopCounterEvent cleaning up ...");
      removeAll();
    };
  }, []);

  const removeAll = () => {
    logger.debug("PopCounterEvent removeAll ...");
    if (managerRef.current) {
      logger.debug("remove all...");
      managerRef.current.removeAll();
    }
  };

  const setZIndex = () => {
    if (managerRef.current) {
      managerRef.current.setZIndex(2000);
      alert("zindex changed");
    }
  };

  return (
    <>
      <PopupManager ref={managerRef} />
      <div>
        <button onClick={() => setOpen((prev) => !prev)}>Toggle</button>
      </div>
      <div>
        <button onClick={removeAll}>Remove All</button>
      </div>
      <div>
        <button onClick={setZIndex}>Change Z Index</button>
      </div>
    </>
  );
};

export const PopClosableEvent = () => {
  const managerRef = useRef<PopupManager | null>(null);

  function onClick() {
    logger.debug("onClose called");
    setOpen(false);
  }
  const notificationRef = useRef(
    <Notification
      type="event"
      icon="copy"
      header="Event"
      description="This is an event."
      action={{ onClick }}
    />
  );
  const popupRef = useRef<
    { id: PopupId; position: PopupPosition } | undefined
  >();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    logger.debug("open is ", open, "popup is ", popupRef.current);
    if (open) {
      if (managerRef.current) {
        popupRef.current = managerRef.current.notify({
          node: notificationRef.current,
          position: "bottom",
        });
        logger.debug(
          "after notify call: open is ",
          open,
          "popup is ",
          popupRef.current
        );
      }
    } else {
      if (popupRef.current && managerRef.current) {
        managerRef.current.remove(
          popupRef.current.id,
          popupRef.current.position
        );
      }
    }
  }, [open]);

  useEffect(() => {
    return () => {
      logger.debug("PopClosableEvent cleaning up ...");
      if (managerRef.current) {
        logger.debug("remove all...");
        managerRef.current.removeAll();
      }
    };
  }, [managerRef]);

  return (
    <>
      <PopupManager ref={managerRef} />
      <div>
        <button onClick={() => setOpen((prev) => !prev)}>Toggle</button>
      </div>
    </>
  );
};
export default {
  title: "Components/PopupManager/Notification",
  component: EventTemplate,
} as Meta<WithoutType>;
