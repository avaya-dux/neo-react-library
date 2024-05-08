import type { IconNamesType } from "@avaya/neo-icons/neo-icon-names-type";
import clsx from "clsx";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import "./PanelTabs.css";

interface ITabsContext {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}
export const TabsContext = createContext<ITabsContext>({
  expanded: true,
  setExpanded: () => {},
});

export interface PanelTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const PanelTabs = ({ children, ...rest }: PanelTabsProps) => {
  const [expanded, setExpanded] = useState(true);

  const classNames = useMemo(
    () => clsx("neo-paneltabs", rest.className),
    [rest.className],
  );

  return (
    <TabsContext.Provider value={{ expanded, setExpanded }}>
      <div {...rest} className={classNames}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};
PanelTabs.displayName = "PanelTabs";

export const Panel = ({ children }: { children: ReactNode }) => {
  const { expanded } = useContext(TabsContext);

  return (
    <div
      className={clsx(
        "neo-paneltabs__panel",
        !expanded && "neo-paneltabs__panel--collapsed",
      )}
    >
      {children}
    </div>
  );
};
Panel.displayName = "PanelTabsPanel";

export const PanelContent = ({
  active,
  children,
}: {
  active: boolean;
  children: ReactNode;
}) => (
  <div className="neo-paneltabs__panel-content" hidden={!active}>
    {children}
  </div>
);
PanelContent.displayName = "PanelTabsPanelContent";

export interface TabsContainerProps {
  children: ReactNode;
  translations?: {
    expand: string;
    collapse: string;
  };
}
export const TabsContainer = ({
  children,
  translations,
}: TabsContainerProps) => {
  const { expanded, setExpanded } = useContext(TabsContext);

  return (
    <div className="neo-paneltabs__tabs">
      {children}

      <PanelTabs.TabItem
        aria-label={
          expanded
            ? translations?.collapse || "Collapse"
            : translations?.expand || "Expand"
        }
        icon="page-last"
        onClick={() => setExpanded(!expanded)}
        className={clsx(
          "neo-paneltabs__tabs-expand",
          !expanded && "neo-paneltabs__tabs-expand--invert",
        )}
      />
    </div>
  );
};
TabsContainer.displayName = "PanelTabsTabsContainer";

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
  const { expanded } = useContext(TabsContext);

  const classNames = useMemo(
    () =>
      clsx(
        "neo-paneltabs__tabs-item",
        "neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info",
        `neo-icon-${icon}`,
        active && expanded && "neo-paneltabs__tabs-item--active",
        badge && "neo-badge",
        className,
      ),
    [active, badge, className, expanded, icon],
  );

  return <button className={classNames} {...rest}></button>;
};
TabItem.displayName = "PanelTabsTabItem";

PanelTabs.Panel = Panel;
PanelTabs.PanelContent = PanelContent;
PanelTabs.TabsContainer = TabsContainer;
PanelTabs.TabItem = TabItem;
