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
