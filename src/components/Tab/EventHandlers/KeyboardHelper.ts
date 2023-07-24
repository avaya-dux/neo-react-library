import log from "loglevel";
import { Dispatch, SetStateAction } from "react";

import { InternalTabProps } from "../InternalTabTypes";

const logger = log.getLogger("tab-event-handler-keyboard-helper");

export function getNextTabIndex(
  tabs: InternalTabProps[],
  activeTabIndex: number,
) {
  logger.debug("calling getNextTabIndex with activeTabIndex=", activeTabIndex);
  let nextIndex = activeTabIndex + 1;
  while (nextIndex <= tabs.length - 1) {
    if (tabs[nextIndex].disabled) {
      nextIndex++;
    } else {
      return nextIndex;
    }
  }
  return activeTabIndex;
}
export function getPreviousTabIndex(
  tabs: InternalTabProps[],
  activeTabIndex: number,
) {
  let previousIndex = activeTabIndex - 1;
  while (previousIndex >= 0) {
    if (tabs[previousIndex].disabled) {
      previousIndex--;
    } else {
      return previousIndex;
    }
  }
  return activeTabIndex;
}

export function activatePreviousTab(
  tabs: InternalTabProps[],
  activeTabIndex: number,
  setActiveTabIndex: Dispatch<SetStateAction<number>>,
  setActivePanelIndex?: Dispatch<SetStateAction<number>>,
): boolean {
  logger.debug("activatePreviousTab");
  const previousIndex = getPreviousTabIndex(tabs, activeTabIndex);
  if (previousIndex < activeTabIndex) {
    setActiveTabIndex(previousIndex);
    if (setActivePanelIndex) {
      setActivePanelIndex(previousIndex);
    }
    return true;
  } else {
    logger.debug(`did not find previous tab index to activate`);
    return false;
  }
}

export const isTabLink = (
  tabs: InternalTabProps[],
  activeTabIndex: number,
): boolean => {
  const tab = tabs[activeTabIndex];
  return !!tab.href;
};
