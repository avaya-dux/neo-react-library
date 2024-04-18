import clsx from "clsx";
import { ReactNode, useMemo } from "react";

import "./IconMenu.css";

export interface CommonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const IconMenu = ({ children, ...rest }: CommonProps) => {
  const classNames = useMemo(
    () => clsx("neo-iconmenu", rest.className),
    [rest.className],
  );

  return (
    <div {...rest} className={classNames}>
      {children}
    </div>
  );
};
IconMenu.displayName = "IconMenu";

export const Heading = ({ children, ...rest }: CommonProps) => {
  const classNames = useMemo(
    () => clsx("neo-iconmenu__heading", rest.className),
    [rest.className],
  );

  return (
    <div {...rest} className={classNames}>
      {children}
    </div>
  );
};
Heading.displayName = "IconMenuHeading";

IconMenu.Heading = Heading;
