import type { IconNamesType } from "@avaya/neo-icons/neo-icon-names-type";
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

export interface TabItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  icon: IconNamesType;
  active?: boolean;
  badge?: boolean;
}
export const TabItem = ({
  active = false,
  badge = false,
  className,
  icon,
  ...rest
}: TabItemProps) => {
  const classNames = useMemo(
    () =>
      clsx(
        "neo-paneltabs__tabs-item",
        "neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info",
        `neo-icon-${icon}`,
        active && "neo-paneltabs__tabs-item--active",
        badge && "neo-badge",
        className,
      ),
    [active, badge, className, icon],
  );

  return <button className={classNames} {...rest}></button>;
};
TabItem.displayName = "TabItem";

PanelTabs.TabItem = TabItem;
