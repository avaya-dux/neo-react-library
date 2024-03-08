import clsx from "clsx";
import { useId } from "react";

import { handleAccessbilityError, useIsInitialRender } from "utils";

import "./Sheet_shim.css";
import { Button } from "components/Button";
import { IconButton } from "components/IconButton";

type EnforcedAccessibleLabel =
  | {
      title: string | JSX.Element;
      actions?: JSX.Element[];
      "aria-label"?: string;
      "aria-labelledby"?: string;
    }
  | {
      title?: string | JSX.Element;
      "aria-label": string;
      "aria-labelledby"?: string;
    }
  | {
      title?: string | JSX.Element;
      "aria-label"?: string;
      "aria-labelledby": string;
    };

interface BaseSheetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  children?: React.ReactNode;
  id?: string;
  onBack?: () => void;
  onClose?: () => void;
  open?: boolean;
  slide?: boolean;
}

export type SheetProps = BaseSheetProps & EnforcedAccessibleLabel;

/**
 * This component is used as a container of components that are dismisable.
 *
 * @example
 * <Sheet open={isOpen} slide={true} title="Mini Form">
 *  <Form>
 *   <TextInput />
 *   <TextInput />
 *  </Form>
 * </Sheet>
 *
 * @see https://design.avayacloud.com/components/web/sheet-web
 */
export const Sheet = ({
  children,
  className,
  id,
  open = true,
  slide = true,
  title,
  onBack,
  onClose,

  ...rest
}: SheetProps) => {
  const generatedId = useId();
  id = id || generatedId;
  const initialRender = useIsInitialRender();
  const buttons = "actions" in rest ? rest.actions : null;

  if (!(title || rest["aria-label"] || rest["aria-labelledby"])) {
    handleAccessbilityError(
      "Sheet must have an have an accessible name. Please add a `title`, `aria-label`, or `aria-labelledby` prop.",
    );
  } else if (!title && buttons) {
    handleAccessbilityError(
      "If you add buttons, you must also provide a title",
    );
  } else if (!title && !buttons) {
    return (
      <BasicSheet
        children={children}
        className={className}
        onBack={onBack}
        onClose={onClose}
        open={open}
        id={id}
        initialRender={initialRender}
        slide={slide}
        {...rest}
      ></BasicSheet>
    );
  }

  return (
    <div
      aria-labelledby={id}
      role="dialog"
      className={clsx(
        "neo-sheet",
        slide && "neo-slide",
        slide && open && "sheet-horizontal-slide-in-shim",
        slide && !open && "sheet-horizontal-slide-out-shim",
        !open && (initialRender || !slide) && "neo-display-none",
        className,
      )}
      {...rest}
    >
      <div className="neo-sheet__header">
        <div className="neo-sheet__header--left" id={id}>
          {title}
        </div>

        <div className="neo-sheet__header--right">{buttons}</div>
      </div>

      {children}
    </div>
  );
};

const BasicSheet = ({
  children,
  className,
  initialRender,
  onBack,
  onClose,
  open,
  slide,
  ...rest
}: {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  initialRender: boolean;
  onBack?: () => void;
  onClose?: () => void;
  open: boolean;
  slide: boolean;
}) => {
  return (
    <div
      role="dialog"
      className={clsx(
        "neo-sheet",
        slide && "neo-slide",
        slide && open && "sheet-horizontal-slide-in-shim",
        slide && !open && "sheet-horizontal-slide-out-shim",
        !open && (initialRender || !slide) && "neo-display-none",
        className,
      )}
      {...rest}
    >
      <div className="neo-sheet__header">
        <div className="neo-sheet__header--left">
          {onBack !== undefined && (
            <IconButton
              onClick={onBack}
              variant="tertiary"
              shape="square"
              aria-label="back" // TODO: localize this aria-lable
              icon="chevron-left"
              className="neo-sheet-icon-chevron-left"
            />
          )}
        </div>

        <div className="neo-sheet__header--right">
          {onClose !== undefined && (
            <IconButton
              onClick={onClose}
              variant="tertiary"
              shape="square"
              aria-label="close"
              icon="close"
              className="neo-sheet-icon-close"
            />
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

Sheet.displayName = "Sheet";
