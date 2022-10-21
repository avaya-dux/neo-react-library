import { Dispatch, ReactNode, SetStateAction } from "react";

import { IconNamesType } from "utils";

import { TabPanelProps } from "./TabTypes";

export interface InternalTabProps extends React.HTMLAttributes<HTMLLIElement> {
  id: string;
  name: ReactNode;
  disabled: boolean;
  content: TabPanelProps;
  href?: string;
  icon?: IconNamesType;
  closable?: boolean;
  onClose?: (index: number) => void;
}

export interface InteractiveTabProps {
  tabIndex: number;
  vertical: boolean;
  active: boolean;
  focus: boolean;
  tabs: InternalTabProps[];
  activeTabIndex: number;
  setActiveTabIndex: Dispatch<SetStateAction<number>>;
  setActivePanelIndex: Dispatch<SetStateAction<number>>;
  setFocus: Dispatch<SetStateAction<boolean>>;
}
