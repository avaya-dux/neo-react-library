import log from "loglevel";
import { FC, useEffect, useMemo, useRef } from "react";
import { ToastOptions, usePopup } from "components/PopupManager";
const logger = log.getLogger("toast-logger");
logger.disableAll();
export { logger as toastLogger };
export interface ToastProps extends Omit<ToastOptions, "message"> {
  children: string;
}
export const Toast: FC<ToastProps> = (props) => {
  const { children, ...rest } = props;
  const options: ToastOptions = useMemo(() => {
    return {
      ...rest,
      message: children,
    };
  }, [props]);

  const { mounted, toast, remove } = usePopup(options.message);
  const toastRef = useRef<ReturnType<typeof toast>>();

  useEffect(() => {
    if (mounted) {
      logger.debug("creating toast");
      toastRef.current = toast(options);
    }
    return () => {
      if (toastRef.current) {
        logger.debug("removing toast");
        remove(toastRef.current.id, toastRef.current.position);
      }
    };
  }, [mounted, options]);
  return null;
};
