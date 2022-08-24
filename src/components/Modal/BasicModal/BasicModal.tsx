import { ReactNode, useCallback, useEffect, forwardRef, useId } from "react";
import ReactDOM from "react-dom";
import FocusLock from "react-focus-lock";
import clsx from "clsx";

import { Button, ButtonProps } from "components/Button";

import "./BasicModal_shim.css";

export interface BasicModalProps extends ButtonProps {
  actions?: JSX.Element[];
  children?: ReactNode;
  closeButtonLabel?: string;
  onClose: () => void;
  open: boolean;
  title: string;
}

export const BasicModal = forwardRef(
  (
    {
      className,
      children,
      closeButtonLabel = "Close",
      onClose,
      open,
      title,
      id = useId(),
      ...rest
    }: BasicModalProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const buttons = "actions" in rest ? rest.actions : null;

    const onKeyDown = useCallback(
      (e: { key: string }) => {
        if (e.key === "Escape" && open) {
          onClose();
        }
      },
      [open]
    );

    useEffect(() => {
      document.addEventListener("keyup", onKeyDown, false);
      return () => {
        document.removeEventListener("keyup", onKeyDown, false);
      };
    }, [open]);

    const modal = (
      <FocusLock>
        <div id={id} className={clsx("neo-modal--active", className)}>
          <div className="neo-modal__background"></div>
          <div
            className="neo-modal__content"
            aria-modal="true"
            aria-labelledby={title}
            role="dialog"
          >
            <div className="neo-modal__header">
              <h4>{title}</h4>
            </div>
            <div className="neo-modal__body">
              <div className="neo-modal__message">{children}</div>
            </div>
            <div className="neo-modal__footer">
              <Button
                variant="secondary"
                data-dismiss="modal"
                onClick={onClose}
                ref={ref}
              >
                {closeButtonLabel}
              </Button>
              {buttons}
            </div>
          </div>
        </div>
      </FocusLock>
    );
    return open ? ReactDOM.createPortal(modal, document.body) : null;
  }
);

BasicModal.displayName = "Basic Modal";
