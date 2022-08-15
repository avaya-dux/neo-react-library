import { ReactNode, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import FocusLock from "react-focus-lock";

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

export const BasicModal = ({
  children,
  closeButtonLabel = "Close",
  onClose,
  open,
  title,
  ...rest
}: BasicModalProps) => {
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
      <div id="neo-modal-example" className="neo-modal--active">
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
            <Button variant="secondary" data-dismiss="modal" onClick={onClose}>
              {closeButtonLabel}
            </Button>
            {buttons}
          </div>
        </div>
      </div>
    </FocusLock>
  );
  return open ? ReactDOM.createPortal(modal, document.body) : null;
};
