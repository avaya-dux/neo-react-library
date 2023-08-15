import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

export type ClosableActionProps = ButtonHTMLAttributes<HTMLButtonElement>;
export const ClosableAction = ({
  "aria-label": ariaLabel = "close notification",
  className,
  ...rest
}: ClosableActionProps) => {
  return (
    <div className="neo-notification__close">
      <button
        aria-label={ariaLabel}
        className={clsx("neo-icon-end", className)}
        {...rest}
      ></button>
    </div>
  );
};
