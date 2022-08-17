import clsx from "clsx";
import { ActionProps } from "./WidgetTypes";

export const Action = ({ children, className, ...rest }: ActionProps) => {
  return (
    <div className={clsx("neo-widget__header-right", className)} {...rest}>
      {children}
    </div>
  );
};
