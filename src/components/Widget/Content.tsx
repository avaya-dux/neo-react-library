import clsx from "clsx";
import { useContext } from "react";
import { WidgetContext } from "./WidgetContext";
import { ContentProps } from "./WidgetTypes";

export const Content = ({
  children,
  className,
  asText = true,
  ...rest
}: ContentProps) => {
  const { loading, empty, disabled } = useContext(WidgetContext);
  return (
    <div
      className={clsx(
        "neo-widget__body neo-widget__body",
        loading && "neo-widget__body--loading",
        disabled && "neo-widget__body-disabled",
        className
      )}
      {...rest}
    >
      {loading ? (
        <p className={clsx("neo-widget__message")}>{children}</p>
      ) : empty ? (
        <div className="neo-empty-state">
          <p className="neo-icon-info">This widget has no content</p>
        </div>
      ) : asText ? (
        <p
          className={clsx(
            "neo-widget__message",
            disabled && "neo-widget__message-disabled"
          )}
        >
          {children}
        </p>
      ) : (
        children
      )}
    </div>
  );
};
