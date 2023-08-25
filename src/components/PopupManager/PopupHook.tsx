import log from "loglevel";
import { createRef, useCallback, useEffect, useState } from "react";
import * as ReactDOMClient from "react-dom/client";

import { PopupManager } from "./PopupManager";
import { NotificationOptions, PopupId, PopupPosition, ToastOptions } from "./PopupTypes";

const logger = log.getLogger("popup-hook-logger");
logger.disableAll();
export { logger as popupHookLogger };
const managerRef = createRef<PopupManager>();
export const containerId = "global-hook-neo-popup-manager-container";
export const repeatCheck = (getter: () => boolean, callback: () => void) => {
  const intervalId = setInterval(() => {
    const value = getter();
    logger.debug("checking: ready =", value);
    if (value) {
      clearInterval(intervalId);
      callback();
    }
  }, 100);
};
export const [createContainer, removePopupManagerContainer, getReady] = (() => {
  let ready = false;
  const getReady = () => ready;
  const createContainer = (callback: () => void) => {
    logger.debug("ready=", ready);
    let container = document.getElementById(containerId);
    if (container !== null) {
      logger.debug("container exists");
      if (ready) {
        callback();
        return;
      }
      repeatCheck(getReady, callback);
      return;
    }
    container = createDivWithId(containerId);
    logger.debug("container created");
    const root = ReactDOMClient.createRoot(container);
    const CallbackWrapper = ({ callback }: { callback: () => void }) => {
      return (
        <div ref={callback}>
          <PopupManager ref={managerRef}></PopupManager>
        </div>
      );
    };

    const legacyCallBack = () => {
      logger.debug("global popup manager is mounted...");
      ready = true;
      callback();
    };
    root.render(<CallbackWrapper callback={legacyCallBack} />);
  };
  const removePopupManagerContainer = () => {
    logger.debug("global popup hook: removing container");
    const container = document.getElementById(containerId);
    if (container) {
      document.body.removeChild(container);
    }
    ready = false;
  };
  return [createContainer, removePopupManagerContainer, getReady];
})();

export const createDivWithId = (id: string) => {
  const container = document.createElement("div");
  container.setAttribute("id", id);
  document.body.appendChild(container);
  return container;
};

export const toastInit: PopupManager["toast"] = (
  toastOptions: ToastOptions,
) => {
  logger.error(
    "You called 'toast', before popup manager is ready, with",
    toastOptions,
  );
  return { id: -1, position: "top" };
};
export const notifyInit: PopupManager["notify"] = (
  notificationOptions: NotificationOptions,
) => {
  logger.error(
    "You called 'notify', before popup manager is ready, with",
    notificationOptions,
  );
  return { id: -1, position: "top" };
};

export const removeInit: PopupManager["remove"] = (
  id: PopupId,
  position: PopupPosition,
) => {
  logger.error(
    "You called 'remove', before popup manager is ready, with",
    id,
    position,
  );
};

export const removeAllInit: PopupManager["removeAll"] = () => {
  logger.error("You called 'removeAll', before popup manager is ready");
};
export const usePopup = (traceId?: string) => {
  logger.debug("enter usePopup", traceId);
  const [mounted, setMounted] = useState(false);
  const [toast, settoast] = useState<PopupManager["toast"]>(() => toastInit);
  const [notify, setnotify] = useState<PopupManager["notify"]>(
    () => notifyInit,
  );
  const [remove, setremove] = useState<PopupManager["remove"]>(
    () => removeInit,
  );
  const [removeAll, setremoveAll] = useState<PopupManager["removeAll"]>(
    () => removeAllInit,
  );
  const callback = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    settoast(() => managerRef.current!.toast);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setnotify(() => managerRef.current!.notify);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setremove(() => managerRef.current!.remove);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setremoveAll(() => managerRef.current!.removeAll);
    setMounted(true);
  }, [settoast, setnotify, setremove, setremoveAll, setMounted]);

  useEffect(() => {
    createContainer(callback);
  }, [callback]);

  return {
    mounted,
    managerRef,
    toast,
    notify,
    remove,
    removeAll,
  };
};
