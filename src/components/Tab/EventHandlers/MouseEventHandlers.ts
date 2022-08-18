import log from "loglevel";
import { Dispatch, MouseEvent, RefObject, SetStateAction } from "react";

import { isAriaDisabled } from "utils";

import { InternalTabProps } from "../InternalTabTypes";
import {
  activateAnotherTabAndPanel,
  enableLeftButton,
  enableRightButton,
  extractProperties,
  moveNextTabToLeftAmount,
  movePreviousTabToRightAmount,
} from "./Helper";

const logger = log.getLogger("tab-mouse-event-handler");
logger.disableAll();

export { logger as tabMouseEventHandlerLogger };
export const handleMouseClickEvent = (
  e: MouseEvent,
  tabs: InternalTabProps[],
  setActiveTabIndex: Dispatch<SetStateAction<number>>,
  setActivePanelIndex: Dispatch<SetStateAction<number>>
) => {
  e.stopPropagation();
  logger.debug("hanlding mouse click event on tab");
  const target = e.target as HTMLElement;
  const id = target.getAttribute("id");
  const disabled = isAriaDisabled(target);
  logger.debug(
    `mouse event target id = ${id} and disabled = ${disabled} and ${
      id && !disabled
    }`
  );
  if (id && !disabled) {
    logger.debug(`set ${id} to active`);
    const index = tabs.findIndex((tab) => tab.id === id);
    setActiveTabIndex(index);
    setActivePanelIndex(index);
  }
  e.preventDefault();
};

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
export const handleLeftCarouselMouseClickEvent = (
  e: MouseEvent,
  scrollRef: RefObject<HTMLDivElement>,
  tabRefs: RefObject<HTMLLIElement>[],
  setLeftCarouselButtonEnabled: Dispatch<SetStateAction<boolean>>,
  setRightCarouselButtonEnabled: Dispatch<SetStateAction<boolean>>
) => {
  e.stopPropagation();
  const { scrollLeft, scrollWidth, visibleWidth, tabWidths } =
    extractProperties(scrollRef, tabRefs);
  const amount = movePreviousTabToRightAmount(
    scrollLeft,
    scrollWidth,
    visibleWidth,
    tabWidths
  );
  logger.debug(`amount to move right is ${amount}`);
  if (amount !== 0) {
    scrollAndUpdateButtons(
      -amount,
      scrollRef,
      tabRefs,
      setLeftCarouselButtonEnabled,
      setRightCarouselButtonEnabled
    );
  }
};
function scrollAndUpdateButtons(
  amount: number,
  scrollRef: RefObject<HTMLDivElement>,
  tabRefs: RefObject<HTMLLIElement>[],
  setLeftCarouselButtonEnabled: Dispatch<SetStateAction<boolean>>,
  setRightCarouselButtonEnabled: Dispatch<SetStateAction<boolean>>
) {
  logger.debug("before scroll: ", scrollRef.current?.scrollLeft);
  scrollRef.current?.scrollBy({ left: amount });
  const enabledLeft = enableLeftButton(scrollRef, tabRefs);
  const enabledRight = enableRightButton(scrollRef, tabRefs);
  logger.debug(
    "after scroll: ",
    scrollRef.current?.scrollLeft,
    "left enabled: ",
    enabledLeft,
    "right enabled: ",
    enabledRight
  );
  setLeftCarouselButtonEnabled(enabledLeft);
  setRightCarouselButtonEnabled(enabledRight);
}
export const handleRightCarouselMouseClickEvent = (
  e: MouseEvent,
  scrollRef: RefObject<HTMLDivElement>,
  tabRefs: RefObject<HTMLLIElement>[],
  setLeftCarouselButtonEnabled: Dispatch<SetStateAction<boolean>>,
  setRightCarouselButtonEnabled: Dispatch<SetStateAction<boolean>>
) => {
  e.stopPropagation();
  const { scrollLeft, scrollWidth, visibleWidth, tabWidths } =
    extractProperties(scrollRef, tabRefs);
  const amount = moveNextTabToLeftAmount(
    scrollLeft,
    scrollWidth,
    visibleWidth,
    tabWidths
  );
  logger.debug(`amount to move left is ${amount}`);
  if (amount !== 0) {
    scrollAndUpdateButtons(
      amount,
      scrollRef,
      tabRefs,
      setLeftCarouselButtonEnabled,
      setRightCarouselButtonEnabled
    );
  }
};
