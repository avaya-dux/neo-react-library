import log from "loglevel";
import { Dispatch, MouseEvent, SetStateAction } from "react";

import { InternalTabProps } from "../InternalTabTypes";

import { activateAnotherTabAndPanel } from "./Helper";

const logger = log.getLogger("tab-mouse-helper");
logger.disableAll();

export const handleCloseElementMouseClickEvent = (
  e: MouseEvent,
  tabs: InternalTabProps[],
  tabIndex: number,
  activeTabIndex: number,
  setActiveTabIndex: Dispatch<SetStateAction<number>>,
  setActivePanelIndex: Dispatch<SetStateAction<number>>
) => {
  e.stopPropagation();
  logger.debug("hanlding mouse click event on tab close element");
  if (tabIndex > activeTabIndex) {
    logger.debug(`do nothing`);
  } else if (tabIndex < activeTabIndex) {
    const newActiveIndex = activeTabIndex - 1;
    setActiveTabIndex(newActiveIndex);
    setActivePanelIndex(newActiveIndex);
  } else {
    activateAnotherTabAndPanel(
      tabs,
      activeTabIndex,
      setActiveTabIndex,
      setActivePanelIndex
    );
  }
  e.preventDefault();
};
