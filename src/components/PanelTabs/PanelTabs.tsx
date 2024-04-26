import clsx from "clsx";
import { ReactNode, useMemo } from "react";

import "./PanelTabs.css";

export interface PanelTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const PanelTabs = ({ children, ...rest }: PanelTabsProps) => {
  const classNames = useMemo(
    () => clsx("neo-paneltabs", rest.className),
    [rest.className],
  );

  return (
    <div {...rest} className={classNames}>
      {children}
    </div>
  );
};
PanelTabs.displayName = "PanelTabs";
