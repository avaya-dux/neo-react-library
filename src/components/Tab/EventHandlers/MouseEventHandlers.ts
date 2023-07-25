import log from "loglevel";
import { Dispatch, MouseEvent, RefObject, SetStateAction } from "react";

import { isAriaDisabled } from "utils";

import { InternalTabProps } from "../InternalTabTypes";
import {
  enableLeftButton,
  enableRightButton,
  extractProperties,
  moveNextTabToLeftAmount,
  movePreviousTabToRightAmount,
} from "./Helper";

import { handleCloseElementMouseClickEvent } from "./MouseHelper";
const logger = log.getLogger("tab-mouse-event-handler");
logger.disableAll();

export { logger as tabMouseEventHandlerLogger };
export const handleMouseClickEvent = (
  e: MouseEvent,
  tabs: InternalTabProps[],
  tabIndex: number,
  activeTabIndex: number,
  setActiveTabIndex: Dispatch<SetStateAction<number>>,
  setActivePanelIndex: Dispatch<SetStateAction<number>>,
  onClose: (index: number) => void,
) => {
  e.stopPropagation();
  e.preventDefault();
  logger.debug("hanlding mouse click event on tab");
  const currentTarget = e.currentTarget as HTMLElement;
  const currentId = currentTarget.getAttribute("id");
  const currentDisabled = isAriaDisabled(currentTarget);

  const target = e.target as HTMLElement;
  const id = target.getAttribute("id");

  logger.debug({ currentId, id, currentDisabled });

  if (currentDisabled) {
    return;
  }

  if (currentId === id) {
    logger.debug(`set ${id} to active`);
    setActiveTabIndex(tabIndex);
    setActivePanelIndex(tabIndex);
  } else {
    handleCloseElementMouseClickEvent(
      e,
      tabs,
      tabIndex,
      activeTabIndex,
      setActiveTabIndex,
      setActivePanelIndex,
    );
    onClose(tabIndex);
  }
};

export const handleLeftCarouselMouseClickEvent = (
  e: MouseEvent,
  scrollRef: RefObject<HTMLDivElement>,
  tabRefs: RefObject<HTMLDivElement>[],
  setLeftCarouselButtonEnabled: Dispatch<SetStateAction<boolean>>,
  setRightCarouselButtonEnabled: Dispatch<SetStateAction<boolean>>,
) => {
  e.stopPropagation();
  const { scrollLeft, scrollWidth, visibleWidth, tabWidths } =
    extractProperties(scrollRef, tabRefs);
  const amount = movePreviousTabToRightAmount(
    scrollLeft,
    scrollWidth,
    visibleWidth,
    tabWidths,
  );
  logger.debug(`amount to move right is ${amount}`);
  if (amount !== 0) {
    scrollAndUpdateButtons(
      -amount,
      scrollRef,
      tabRefs,
      setLeftCarouselButtonEnabled,
      setRightCarouselButtonEnabled,
    );
  } else {
    setLeftCarouselButtonEnabled(false);
  }
};
function scrollAndUpdateButtons(
  amount: number,
  scrollRef: RefObject<HTMLDivElement>,
  tabRefs: RefObject<HTMLDivElement>[],
  setLeftCarouselButtonEnabled: Dispatch<SetStateAction<boolean>>,
  setRightCarouselButtonEnabled: Dispatch<SetStateAction<boolean>>,
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
    enabledRight,
  );
  setLeftCarouselButtonEnabled(enabledLeft);
  setRightCarouselButtonEnabled(enabledRight);
}
export const handleRightCarouselMouseClickEvent = (
  e: MouseEvent,
  scrollRef: RefObject<HTMLDivElement>,
  tabRefs: RefObject<HTMLDivElement>[],
  setLeftCarouselButtonEnabled: Dispatch<SetStateAction<boolean>>,
  setRightCarouselButtonEnabled: Dispatch<SetStateAction<boolean>>,
) => {
  e.stopPropagation();
  const { scrollLeft, scrollWidth, visibleWidth, tabWidths } =
    extractProperties(scrollRef, tabRefs);
  const amount = moveNextTabToLeftAmount(
    scrollLeft,
    scrollWidth,
    visibleWidth,
    tabWidths,
  );
  logger.debug(`amount to move left is ${amount}`);
  if (amount !== 0) {
    scrollAndUpdateButtons(
      amount,
      scrollRef,
      tabRefs,
      setLeftCarouselButtonEnabled,
      setRightCarouselButtonEnabled,
    );
  } else {
    setRightCarouselButtonEnabled(false);
  }
};
